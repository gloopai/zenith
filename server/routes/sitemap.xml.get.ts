import { readOpenclawSkills } from '../utils/openclaw-skills-store'
import { readTools } from '../utils/tools-store'
import { listNewsMeta } from '../utils/news-store'

const SITE_ORIGIN = 'https://plunget.com'

export default defineEventHandler(async (event) => {
  const base = SITE_ORIGIN

  const tools = await readTools()
  const news = await listNewsMeta()
  const openclawSkills = await readOpenclawSkills()

  const urls: string[] = [`${base}/`, `${base}/nav`, `${base}/news`, `${base}/openclaw`]

  for (const t of tools) {
    urls.push(`${base}/nav/${encodeURIComponent(t.slug)}`)
  }
  for (const n of news) {
    urls.push(`${base}/news/${encodeURIComponent(n.slug)}`)
  }
  for (const s of openclawSkills) {
    urls.push(`${base}/openclaw/${encodeURIComponent(s.slug)}`)
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
