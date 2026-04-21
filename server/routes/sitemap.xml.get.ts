import { readOpenclawSkillsDatasetUpdatedAt, readOpenclawSkillsLocalized } from '../utils/openclaw-skills-store'
import { readMcpServersDatasetUpdatedAt, readMcpServersLocalized } from '../utils/mcp-servers-store'
import { readToolsLocalized } from '../utils/tools-store'
import { listNewsMeta } from '../utils/news-store'
import { listClusterDefs, maxClusterUpdatedAt } from '../utils/clusters-store'
import { readSiteDataJson } from '../utils/site-assets'
import { listCategoryEntities } from '../utils/category-entities-store'
import { I18N_DEFAULT_LOCALE, I18N_LOCALES, localePathPrefix } from '~~/shared/i18n-public'
import { resolveSiteOriginFromEnv } from '~~/shared/site-origin'
import type { Tool } from '~~/shared/types/site'

type UrlEntry = { loc: string; priority: string; lastmod: string }

interface ToolsFileRaw {
  meta?: { catalogUpdatedAt?: string }
  tools: Tool[]
}

function maxIsoDate(dates: (string | undefined)[]): string {
  const xs = dates.filter((x): x is string => typeof x === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(x))
  if (!xs.length) return new Date().toISOString().slice(0, 10)
  return xs.sort().at(-1)!
}

export default defineEventHandler(async (event) => {
  const base = resolveSiteOriginFromEnv()
  const today = new Date().toISOString().slice(0, 10)

  const rawTools = await readSiteDataJson<ToolsFileRaw>('tools.json')
  const catalogFallback = rawTools.meta?.catalogUpdatedAt ?? today
  const toolLastmodBySlug = new Map<string, string>()
  for (const t of rawTools.tools ?? []) {
    toolLastmodBySlug.set(t.slug, t.updatedAt ?? catalogFallback)
  }

  const tools = await readToolsLocalized('zh-CN')
  const news = await listNewsMeta('zh-CN')
  const openclawSkills = await readOpenclawSkillsLocalized('zh-CN')
  const openclawDataset = (await readOpenclawSkillsDatasetUpdatedAt()) ?? catalogFallback
  const mcpServers = await readMcpServersLocalized('zh-CN')
  const mcpDataset = (await readMcpServersDatasetUpdatedAt()) ?? catalogFallback

  const clusters = await listClusterDefs()
  const clusterIndexLastmod = maxIsoDate([await maxClusterUpdatedAt(), catalogFallback])
  const categoryEntities = await listCategoryEntities()

  const newsDates = news.map((n) => n.date)
  const newsIndexLastmod = newsDates.length ? maxIsoDate(newsDates) : catalogFallback

  const entries: UrlEntry[] = []

  for (const code of I18N_LOCALES) {
    const p = localePathPrefix(code)
    const home = code === I18N_DEFAULT_LOCALE ? `${base}/` : `${base}${p}`
    entries.push({ loc: home, priority: '1.0', lastmod: catalogFallback })
    entries.push({ loc: `${base}${p}/nav`, priority: '0.9', lastmod: catalogFallback })
    entries.push({ loc: `${base}${p}/news`, priority: '0.85', lastmod: newsIndexLastmod })
    entries.push({ loc: `${base}${p}/openclaw`, priority: '0.85', lastmod: openclawDataset })
    entries.push({ loc: `${base}${p}/mcp`, priority: '0.85', lastmod: mcpDataset })
    entries.push({ loc: `${base}${p}/cluster`, priority: '0.88', lastmod: clusterIndexLastmod })
  }

  for (const code of I18N_LOCALES) {
    const p = localePathPrefix(code)
    for (const t of tools) {
      entries.push({
        loc: `${base}${p}/nav/${encodeURIComponent(t.slug)}`,
        priority: '0.7',
        lastmod: toolLastmodBySlug.get(t.slug) ?? catalogFallback,
      })
    }
    for (const n of news) {
      entries.push({
        loc: `${base}${p}/news/${encodeURIComponent(n.slug)}`,
        priority: '0.65',
        lastmod: /^\d{4}-\d{2}-\d{2}$/.test(n.date) ? n.date : catalogFallback,
      })
    }
    for (const s of openclawSkills) {
      entries.push({
        loc: `${base}${p}/openclaw/${encodeURIComponent(s.slug)}`,
        priority: '0.65',
        lastmod: openclawDataset,
      })
    }
    for (const s of mcpServers) {
      entries.push({
        loc: `${base}${p}/mcp/${encodeURIComponent(s.slug)}`,
        priority: '0.65',
        lastmod: mcpDataset,
      })
    }
    for (const c of clusters) {
      const toolDates = c.toolSlugs.map((slug) => toolLastmodBySlug.get(slug))
      const lastmod = maxIsoDate([c.updatedAt, ...toolDates, catalogFallback])
      entries.push({
        loc: `${base}${p}/cluster/${encodeURIComponent(c.slug)}`,
        priority: '0.72',
        lastmod,
      })
    }
    for (const ce of categoryEntities) {
      entries.push({
        loc: `${base}${p}/nav/category/${encodeURIComponent(ce.slug)}`,
        priority: '0.74',
        lastmod: maxIsoDate([ce.updatedAt, catalogFallback]),
      })
    }
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    ({ loc, priority, lastmod }) => `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${escapeXml(lastmod)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return body
})

function escapeXml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}
