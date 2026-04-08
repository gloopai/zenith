/**
 * 每日（或按需）从 RSS 2.0 拉取条目，写入 content/inbox/runs/...，
 * 并生成 CURSOR-HANDOFF.md，便于交给 Cursor / AI 按本站规范改写后入库存稿。
 *
 * 使用前在 data/content-ingest.config.json 配置 feeds。
 * 运行: node scripts/daily-content-ingest.mjs
 *      npm run content:ingest
 *
 * 法律与礼仪：仅抓取允许聚合的来源；正文用于「摘要 + 重写」勿原样搬运；遵守各站 ToS。
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const CONFIG_PATH = path.join(root, 'data/content-ingest.config.json')
const STATE_PATH = path.join(root, 'content/inbox/.ingest-state.json')
const RUNS_DIR = path.join(root, 'content/inbox/runs')

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'))
}

function loadState() {
  try {
    const s = readJson(STATE_PATH)
    return s && typeof s.seen === 'object' ? s : { seen: {} }
  } catch {
    return { seen: {} }
  }
}

function saveState(state) {
  fs.mkdirSync(path.dirname(STATE_PATH), { recursive: true })
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2) + '\n', 'utf8')
}

function stripCdata(s) {
  const t = s.trim()
  if (t.startsWith('<![CDATA[')) return t.slice(9).replace(/\]\]>$/, '').trim()
  return t
}

function stripHtml(s) {
  return stripCdata(s)
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function decodeXmlEntities(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
}

function extractTag(block, tag) {
  const re = new RegExp(`<${tag.replace(/:/g, ':')}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag.replace(/:/g, ':')}>`, 'i')
  const m = block.match(re)
  if (!m) return ''
  return decodeXmlEntities(stripHtml(m[1]))
}

function parseRssItems(xml) {
  const items = []
  const re = /<item\b[^>]*>([\s\S]*?)<\/item>/gi
  let m
  while ((m = re.exec(xml)) !== null) {
    const block = m[1]
    const title = extractTag(block, 'title')
    const link = extractTag(block, 'link')
    let guid = extractTag(block, 'guid')
    const pubDate = extractTag(block, 'pubDate')
    const description =
      extractTag(block, 'description') || extractTag(block, 'content:encoded') || extractTag(block, 'summary')
    if (!link && !guid) continue
    if (!guid) guid = link
    items.push({
      kind: 'rss',
      title: title || '(no title)',
      link,
      guid,
      pubDate,
      summary: description.slice(0, 8000),
    })
  }
  return items
}

function hashKey(item) {
  return item.guid || item.link
}

function slugFromItem(item, index) {
  const d = item.pubDate ? new Date(item.pubDate) : new Date()
  const dateStr = Number.isNaN(d.getTime()) ? new Date().toISOString().slice(0, 10) : d.toISOString().slice(0, 10)
  const fromTitle = item.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48)
  const tail = fromTitle || String(index).padStart(2, '0')
  return `${dateStr}-${tail}`
}

async function fetchFeed(url, userAgent) {
  const res = await fetch(url, {
    headers: { 'user-agent': userAgent, accept: 'application/rss+xml, application/xml, text/xml, */*' },
    signal: AbortSignal.timeout(25000),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.text()
}

function stampDir() {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}--${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`
}

async function main() {
  console.warn(
    '[content-ingest] 仅将抓取结果作为编辑草稿；请改写为原创表述并核对版权与事实，勿直接张贴抓取正文。',
  )

  if (!fs.existsSync(CONFIG_PATH)) {
    console.error('Missing', CONFIG_PATH)
    process.exit(1)
  }

  const config = readJson(CONFIG_PATH)
  const feeds = Array.isArray(config.feeds) ? config.feeds : []
  const defaults = config.defaults || {}
  const userAgent =
    typeof defaults.userAgent === 'string' && defaults.userAgent ? defaults.userAgent : 'Plunget-IngestBot/1.0'
  const defaultMax = typeof defaults.maxItems === 'number' && defaults.maxItems > 0 ? defaults.maxItems : 12

  const activeFeeds = feeds.filter((f) => typeof f.url === 'string' && f.url.trim())

  if (!activeFeeds.length) {
    console.log('No feeds configured. Add entries to data/content-ingest.config.json, e.g.:')
    console.log(
      JSON.stringify(
        {
          feeds: [{ url: 'https://example.com/feed.xml', label: '示例', maxItems: 10 }],
          defaults: { maxItems: 12, userAgent: 'Plunget-IngestBot/1.0 (editorial)' },
        },
        null,
        2,
      ),
    )
    process.exit(0)
  }

  console.log(
    `[content-ingest] 已配置 ${activeFeeds.length} 个 RSS 源，将依次拉取（每个源最多等待约 25s，全部跑完前请稍候）…`,
  )

  const state = loadState()
  const runId = stampDir()
  const outDir = path.join(RUNS_DIR, runId)
  const itemsDir = path.join(outDir, 'items')
  fs.mkdirSync(itemsDir, { recursive: true })

  const manifest = {
    runAt: new Date().toISOString(),
    runId,
    newCount: 0,
    skippedKnown: 0,
    errors: [],
    items: [],
  }

  let idx = 0
  let feedOrdinal = 0

  for (const feed of feeds) {
    const url = typeof feed.url === 'string' ? feed.url.trim() : ''
    if (!url) continue
    feedOrdinal += 1
    const label = typeof feed.label === 'string' ? feed.label : url
    const maxItems =
      typeof feed.maxItems === 'number' && feed.maxItems > 0 ? feed.maxItems : defaultMax

    const started = Date.now()
    console.log(`[content-ingest] (${feedOrdinal}/${activeFeeds.length}) 拉取：${label}`)

    let xml
    try {
      xml = await fetchFeed(url, userAgent)
    } catch (e) {
      manifest.errors.push({ feed: label, url, message: String(e?.message || e) })
      console.warn(`[content-ingest]   ↳ 失败：${String(e?.message || e)}`)
      continue
    }

    const ms = Date.now() - started
    const parsed = parseRssItems(xml)
    console.log(`[content-ingest]   ↳ 完成 ${ms}ms，解析到 ${parsed.length} 条 <item>`)
    let taken = 0
    for (const item of parsed) {
      if (taken >= maxItems) break
      const key = hashKey(item)
      if (!key) continue
      if (state.seen[key]) {
        manifest.skippedKnown += 1
        continue
      }

      idx += 1
      taken += 1
      const fileBase = `${String(idx).padStart(2, '0')}-${slugFromItem(item, idx)}`
      const jsonPath = path.join(itemsDir, `${fileBase}.json`)
      const record = {
        ...item,
        sourceFeed: label,
        sourceUrl: url,
        ingestedAt: new Date().toISOString(),
        suggestedFilename: `${slugFromItem(item, idx)}.md`,
      }
      fs.writeFileSync(jsonPath, JSON.stringify(record, null, 2) + '\n', 'utf8')
      state.seen[key] = record.ingestedAt

      manifest.items.push({
        id: fileBase,
        json: path.relative(root, jsonPath).replace(/\\/g, '/'),
        title: item.title,
        link: item.link,
        sourceFeed: label,
      })
      manifest.newCount += 1
    }
  }

  console.log(
    `[content-ingest] 全部源已处理：新增 ${manifest.newCount} 条、跳过已见 ${manifest.skippedKnown} 条、拉取错误 ${manifest.errors.length} 条。正在写入…`,
  )

  fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8')
  saveState(state)

  const handoffPath = path.join(outDir, 'CURSOR-HANDOFF.md')
  const handoff = buildHandoffMarkdown({ runId, manifest, outDir: path.relative(root, outDir).replace(/\\/g, '/') })
  fs.writeFileSync(handoffPath, handoff, 'utf8')

  const lastRunPath = path.join(root, 'content/inbox/.last-run.json')
  fs.writeFileSync(
    lastRunPath,
    JSON.stringify(
      {
        runId,
        handoff: path.relative(root, handoffPath).replace(/\\/g, '/'),
        runAt: manifest.runAt,
        newCount: manifest.newCount,
      },
      null,
      2,
    ) + '\n',
    'utf8',
  )

  console.log(`Run ${runId}: ${manifest.newCount} new item(s) → ${path.relative(root, outDir)}`)
  if (manifest.errors.length) console.log('Feed errors:', manifest.errors.length)
  console.log('Open:', path.relative(root, handoffPath))
}

function buildHandoffMarkdown({ runId, manifest, outDir }) {
  const lines = [
    `# 内容接入交接：${runId}`,
    ``,
    `本目录由 \`npm run content:ingest\` 生成，**抓取稿非最终稿**。请在 Cursor 里打开本文件与本目录下 \`items/*.json\`，按 Plunget 资讯规范改写。`,
    ``,
    `## 本批统计`,
    ``,
    `- 新增进箱：${manifest.newCount}`,
    `- 跳过（已见过 link/guid）：${manifest.skippedKnown}`,
    `- 拉取错误：${manifest.errors.length}`,
    ``,
  ]

  if (manifest.errors.length) {
    lines.push(`### 拉取错误`, ``)
    for (const e of manifest.errors) {
      lines.push(`- **${e.feed}**: ${e.message} (\`${e.url}\`)`)
    }
    lines.push(``)
  }

  lines.push(`## 待处理条目`, ``)
  if (!manifest.items.length) {
    lines.push(`（本批无新条目；可能均已去重或全部源失败。）`, ``)
  } else {
    for (const it of manifest.items) {
      lines.push(`1. [\`${it.id}\`](./items/${it.id}.json) — ${it.title}`)
      lines.push(`   - 来源：${it.sourceFeed}`)
      lines.push(`   - 原文：${it.link}`)
      lines.push(``)
    }
  }

  lines.push(
    `## 请 AI / 编辑执行（整改清单）`,
    ``,
    `1. **改写**：用原创中文重写观点与结构，可引用事实但勿整段复制英文源；语气中立、符合本站「导航 / 实践」定位。`,
    `2. **事实**：日期、产品名、版本等请自行二次核对原文与官网。`,
    `3. **Frontmatter**：成稿保存为 \`content/news/locales/zh-CN/YYYY-MM-DD-slug.md\`，包含 \`title\` / \`description\` / \`date\` / \`slug\`（与现有一致）。`,
    `4. **多语言**：英文列表需对应文件 \`content/news/locales/en/\` 同名 \`.md\`，或按你们既有 \`scripts/lib/news-articles-*.mjs\` + \`npm run content:news-locales\` 流程补齐。`,
    `5. **发布后**：建议保留本批 \`runs/\` 作为记录；若需减体积可只做离线归档成稿与 \`manifest.json\` 后删除该批 \`items/\`。去重状态在 \`content/inbox/.ingest-state.json\`（勿删，除非你刻意允许旧链接再次进箱）。`,
    `6. **合规**：不确定版权时勿上架；可只写「一手短评 + 链接」而非全文摘要。`,
    ``,
    `## 复用提示词（可复制到 Cursor）`,
    ``,
    `\`\`\`text`,
    `请读取 content/inbox/runs/${runId}/ 下 manifest.json 与各 items/*.json，`,
    `按 Plunget 资讯风格输出 zh-CN 的 Markdown 成稿（含 YAML frontmatter），`,
    `不要抄袭原文句式；适当加入与站内工具/OpenClaw/导航主题相关的自然内链（若适用）。`,
    `把每个条目对应写成单独文件路径建议写在回复里，由我确认后再写入仓库。`,
    `\`\`\``,
    ``,
  )

  return lines.join('\n')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
