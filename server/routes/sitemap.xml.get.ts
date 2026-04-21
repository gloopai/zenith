<<<<<<< Updated upstream
import { readOpenclawSkillsLocalized } from '../utils/openclaw-skills-store'
=======
import { readOpenclawSkillsDatasetUpdatedAt, readOpenclawSkillsLocalized } from '../utils/openclaw-skills-store'
import { readMcpServersDatasetUpdatedAt, readMcpServersLocalized } from '../utils/mcp-servers-store'
>>>>>>> Stashed changes
import { readToolsLocalized } from '../utils/tools-store'
import { listNewsMeta } from '../utils/news-store'
import { I18N_DEFAULT_LOCALE, I18N_LOCALES, localePathPrefix } from '~~/shared/i18n-public'

const SITE_ORIGIN = 'https://plunget.com'

export default defineEventHandler(async (event) => {
  const base = SITE_ORIGIN

  const tools = await readToolsLocalized('zh-CN')
  const news = await listNewsMeta('zh-CN')
  const openclawSkills = await readOpenclawSkillsLocalized('zh-CN')
<<<<<<< Updated upstream
=======
  const openclawDataset = (await readOpenclawSkillsDatasetUpdatedAt()) ?? catalogFallback
  const mcpServers = await readMcpServersLocalized('zh-CN')
  const mcpDataset = (await readMcpServersDatasetUpdatedAt()) ?? catalogFallback
>>>>>>> Stashed changes

  const urls: string[] = []

  for (const code of I18N_LOCALES) {
    const p = localePathPrefix(code)
    const home = code === I18N_DEFAULT_LOCALE ? `${base}/` : `${base}${p}`
<<<<<<< Updated upstream
    urls.push(home, `${base}${p}/nav`, `${base}${p}/news`, `${base}${p}/openclaw`)
=======
    entries.push({ loc: home, priority: '1.0', lastmod: catalogFallback })
    entries.push({ loc: `${base}${p}/nav`, priority: '0.9', lastmod: catalogFallback })
    entries.push({ loc: `${base}${p}/news`, priority: '0.85', lastmod: newsIndexLastmod })
    entries.push({ loc: `${base}${p}/openclaw`, priority: '0.85', lastmod: openclawDataset })
    entries.push({ loc: `${base}${p}/mcp`, priority: '0.85', lastmod: mcpDataset })
    entries.push({ loc: `${base}${p}/cluster`, priority: '0.88', lastmod: clusterIndexLastmod })
>>>>>>> Stashed changes
  }

  for (const code of I18N_LOCALES) {
    const p = localePathPrefix(code)
    for (const t of tools) {
      urls.push(`${base}${p}/nav/${encodeURIComponent(t.slug)}`)
    }
    for (const n of news) {
      urls.push(`${base}${p}/news/${encodeURIComponent(n.slug)}`)
    }
    for (const s of openclawSkills) {
<<<<<<< Updated upstream
      urls.push(`${base}${p}/openclaw/${encodeURIComponent(s.slug)}`)
=======
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
>>>>>>> Stashed changes
    }
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (loc) => `  <url>
    <loc>${escapeXml(loc)}</loc>
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
