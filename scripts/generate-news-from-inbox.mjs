/**
 * 使用 OpenAI 兼容 Chat Completions API，将 content/inbox 某一批次的 JSON 草稿生成
 * content/news/locales/zh-CN/*.md（可发布结构，但仍建议你通读后再 commit）。
 *
 * 环境变量（可配在仓库根 .env；本脚本会尝试加载未注入的键）：
 *   通义千问（优先）：DASHSCOPE_API_KEY — 阿里云百炼 DashScope API Key
 *     → 默认 base https://dashscope.aliyuncs.com/compatible-mode/v1
 *     → 默认模型 qwen-plus（可用 NEWS_GEN_MODEL 改为 qwen-turbo、qwen-max 等）
 *     国际区可设 DASHSCOPE_COMPAT_BASE=https://dashscope-intl.aliyuncs.com/compatible-mode/v1
 *   其它 OpenAI 兼容：NEWS_GEN_API_KEY 或 OPENAI_API_KEY，NEWS_GEN_BASE_URL（默认 OpenAI 官方）
 *   若同时配置了 DashScope 与 OpenAI，默认走 DashScope；要强开 OpenAI 可设 NEWS_GEN_PROVIDER=openai
 *
 * 用法：
 *   node scripts/generate-news-from-inbox.mjs
 *   node scripts/generate-news-from-inbox.mjs --run=content/inbox/runs/2026-04-08--224405
 *   node scripts/generate-news-from-inbox.mjs --limit=3
 *   node scripts/generate-news-from-inbox.mjs --dry-run
 *   node scripts/generate-news-from-inbox.mjs --force   # 覆盖已存在的 md
 *
 * 合规：生成稿基于公开摘要，请核对事实与版权；勿无审稿直接上线重要声明类内容。
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const LAST_RUN = path.join(root, 'content/inbox/.last-run.json')
const RUNS_DIR = path.join(root, 'content/inbox/runs')
const OUT_DIR = path.join(root, 'content/news/locales/zh-CN')

function loadDotEnv() {
  const p = path.join(root, '.env')
  if (!fs.existsSync(p)) return
  for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue
    const i = t.indexOf('=')
    if (i === -1) continue
    const k = t.slice(0, i).trim()
    let v = t.slice(i + 1).trim()
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1)
    }
    if (process.env[k] === undefined) process.env[k] = v
  }
}

function parseArgs(argv) {
  let run = null
  let limit = Infinity
  let dryRun = false
  let force = false
  for (const a of argv) {
    if (a === '--dry-run') dryRun = true
    else if (a === '--force') force = true
    else if (a.startsWith('--run=')) run = a.slice('--run='.length)
    else if (a.startsWith('--limit=')) {
      const n = parseInt(a.slice('--limit='.length), 10)
      if (Number.isFinite(n) && n > 0) limit = n
    }
  }
  return { run, limit, dryRun, force }
}

function resolveRunDir(explicit) {
  if (explicit) {
    const abs = path.isAbsolute(explicit) ? explicit : path.join(root, explicit)
    if (fs.existsSync(abs) && fs.statSync(abs).isDirectory()) return abs
    console.error('Invalid --run directory:', explicit)
    process.exit(1)
  }
  if (fs.existsSync(LAST_RUN)) {
    try {
      const j = JSON.parse(fs.readFileSync(LAST_RUN, 'utf8'))
      const handoff = typeof j.handoff === 'string' ? j.handoff : ''
      if (handoff) {
        const dir = path.join(root, path.dirname(handoff))
        if (fs.existsSync(dir)) return dir
      }
    } catch {
      /* fall through */
    }
  }
  if (!fs.existsSync(RUNS_DIR)) {
    console.error('No runs under', path.relative(root, RUNS_DIR))
    process.exit(1)
  }
  const dirs = fs
    .readdirSync(RUNS_DIR)
    .map((name) => path.join(RUNS_DIR, name))
    .filter((p) => fs.statSync(p).isDirectory())
    .sort((a, b) => path.basename(b).localeCompare(path.basename(a)))
  if (!dirs.length) {
    console.error('No run folders found.')
    process.exit(1)
  }
  return dirs[0]
}

function listItemJsonPaths(runDir) {
  const manifestPath = path.join(runDir, 'manifest.json')
  if (fs.existsSync(manifestPath)) {
    const m = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
    const items = Array.isArray(m.items) ? m.items : []
    return items.map((it) => path.join(root, it.json)).filter((p) => fs.existsSync(p))
  }
  const itemsDir = path.join(runDir, 'items')
  if (!fs.existsSync(itemsDir)) return []
  return fs
    .readdirSync(itemsDir)
    .filter((f) => f.endsWith('.json'))
    .sort()
    .map((f) => path.join(itemsDir, f))
}

function parseSuggestedFile(rec) {
  const name =
    typeof rec.suggestedFilename === 'string' ? rec.suggestedFilename.trim() : ''
  if (!name.endsWith('.md')) return null
  const base = name.replace(/\.md$/i, '')
  const m = base.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/)
  if (!m) return null
  return { date: m[1], slug: base, filename: name }
}

function stripCodeFence(s) {
  let t = s.trim()
  if (t.startsWith('```')) {
    t = t.replace(/^```(?:markdown|md)?\s*\n?/i, '')
    t = t.replace(/\n?```\s*$/i, '')
  }
  return t.trim()
}

const SYSTEM = `你是 Plunget 资讯频道的编辑。根据给定的外文标题、链接与摘要，写一篇**原创中文**短讯：语气中立、偏实践与导航站读者（AI 工具、开发者、产品使用者），避免标题党与夸张承诺。
硬性要求：
- 全文用简体中文。
- 禁止整句英译中照搬；事实可写，句式须重写。产品名、公司名、版本号可保留英文。
- 输出**仅**一篇完整 Markdown 文件：必须以 YAML frontmatter 开头。
- frontmatter 四个字段：title、description、date、slug。其中 date 为 YYYY-MM-DD，slug 须与用户在消息里提供的 slug 完全一致。
- 正文用 2～4 个小节（##），段落简练；最后一节可简要写「对读者的意义」或「可关注的点」。
- 文末单独一行用 Markdown 链接指向「参考 / 原文」，使用用户提供的 URL。
- 不要杜撰「已发布」「已上线」等未在摘要中出现的时间点；不确定时写「据报」或弱化处理。`

function resolveLlmConfig() {
  const forceOpenAI = (process.env.NEWS_GEN_PROVIDER || '').toLowerCase() === 'openai'
  if (process.env.DASHSCOPE_API_KEY && !forceOpenAI) {
    const base = (
      process.env.NEWS_GEN_BASE_URL ||
      process.env.DASHSCOPE_COMPAT_BASE ||
      'https://dashscope.aliyuncs.com/compatible-mode/v1'
    ).replace(/\/$/, '')
    return {
      provider: 'dashscope-qwen',
      base,
      key: process.env.DASHSCOPE_API_KEY,
      model: process.env.NEWS_GEN_MODEL || 'qwen-plus',
    }
  }
  const key = process.env.NEWS_GEN_API_KEY || process.env.OPENAI_API_KEY
  if (!key) {
    throw new Error(
      '缺少 DASHSCOPE_API_KEY（通义千问 / 百炼）或 NEWS_GEN_API_KEY / OPENAI_API_KEY（可在 .env 配置）',
    )
  }
  return {
    provider: 'openai-compatible',
    base: (process.env.NEWS_GEN_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, ''),
    key,
    model: process.env.NEWS_GEN_MODEL || 'gpt-4o-mini',
  }
}

async function callChat(userPayload, cfg) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${cfg.key}`,
  }
  const referer = process.env.OPENROUTER_SITE_URL || process.env.NEWS_GEN_REFERER
  if (referer) {
    headers.Referer = referer
    headers['X-Title'] = 'Plunget news-gen'
  }
  const res = await fetch(`${cfg.base}/chat/completions`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: cfg.model,
      temperature: 0.45,
      max_tokens: 3200,
      messages: [
        { role: 'system', content: SYSTEM },
        { role: 'user', content: userPayload },
      ],
    }),
    signal: AbortSignal.timeout(120_000),
  })
  if (!res.ok) {
    const t = await res.text()
    throw new Error(`Chat API ${res.status}: ${t.slice(0, 800)}`)
  }
  const j = await res.json()
  const text = j.choices?.[0]?.message?.content
  if (typeof text !== 'string' || !text.trim()) throw new Error('模型返回为空')
  return text
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function main() {
  loadDotEnv()
  const { run: runArg, limit, dryRun, force } = parseArgs(process.argv.slice(2))
  const runDir = resolveRunDir(runArg)
  const paths = listItemJsonPaths(runDir).slice(0, Number.isFinite(limit) ? limit : undefined)

  let llm = null
  if (!dryRun) {
    llm = resolveLlmConfig()
    console.log(`[news-gen] LLM: ${llm.provider} / ${llm.model}`)
  }

  console.log(`[news-gen] 运行目录: ${path.relative(root, runDir)}`)
  console.log(`[news-gen] 待处理条目: ${paths.length}${dryRun ? '（dry-run）' : ''}`)

  if (!paths.length) {
    console.log('无 items，退出。')
    process.exit(0)
  }

  let ok = 0
  let skipped = 0
  let failed = 0

  for (let i = 0; i < paths.length; i++) {
    const p = paths[i]
    let rec
    try {
      rec = JSON.parse(fs.readFileSync(p, 'utf8'))
    } catch (e) {
      console.warn('[news-gen] 跳过（JSON 损坏）', p, e)
      failed++
      continue
    }
    const meta = parseSuggestedFile(rec)
    if (!meta) {
      console.warn('[news-gen] 跳过（无 suggestedFilename）', path.basename(p))
      failed++
      continue
    }
    const outPath = path.join(OUT_DIR, meta.filename)
    if (fs.existsSync(outPath) && !force) {
      console.log(`[news-gen] 已存在，跳过: ${meta.filename}`)
      skipped++
      continue
    }

    const userMsg = [
      `slug（必须与 frontmatter 中 slug 一致）: ${meta.slug}`,
      `date（必须与 frontmatter 中 date 一致）: ${meta.date}`,
      `参考标题: ${rec.title || ''}`,
      `链接: ${rec.link || ''}`,
      `来源订阅标签: ${rec.sourceFeed || ''}`,
      `摘要（仅供事实参考，勿照抄英文句子）:\n${(rec.summary || '').slice(0, 6000)}`,
    ].join('\n')

    if (dryRun) {
      console.log('\n--- dry-run ---\n', userMsg.slice(0, 500), '…')
      ok++
      continue
    }

    console.log(`[news-gen] (${i + 1}/${paths.length}) 生成中… ${meta.filename}`)
    let raw
    try {
      raw = await callChat(userMsg, llm)
    } catch (e) {
      console.error('[news-gen]   ↳ API 失败:', e.message)
      failed++
      continue
    }
    const cleaned = stripCodeFence(raw)
    let parsed
    try {
      parsed = matter(cleaned)
    } catch (e) {
      console.error('[news-gen]   ↳ frontmatter 解析失败:', e.message)
      failed++
      continue
    }
    const data = { ...(parsed.data || {}) }
    data.title = typeof data.title === 'string' ? data.title.trim() : rec.title
    data.description = typeof data.description === 'string' ? data.description.trim() : ''
    data.date = meta.date
    data.slug = meta.slug
    if (!data.title || !data.description) {
      console.error('[news-gen]   ↳ 缺 title/description，跳过写入')
      failed++
      continue
    }

    const out = matter.stringify(parsed.content.trim(), data).trim() + '\n'
    fs.mkdirSync(OUT_DIR, { recursive: true })
    fs.writeFileSync(outPath, out, 'utf8')
    console.log(`[news-gen]   ↳ 已写入 ${path.relative(root, outPath)}`)
    ok++
    await sleep(400)
  }

  console.log(
    `\n[news-gen] 完成：成功 ${ok}，跳过已存在 ${skipped}，失败/跳过 ${failed}。英文列表需 locales/en 或 news-articles 流水线时请自行补齐。`,
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
