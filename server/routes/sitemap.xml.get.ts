import { readTools } from '../utils/tools-store'
import { listNewsMeta } from '../utils/news-store'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const base =
    (config.public?.siteUrl as string | undefined)?.replace(/\/$/, '') ||
    `${getRequestURL(event).origin}`

  const tools = await readTools()
  const news = await listNewsMeta()

  const urls: string[] = [`${base}/`, `${base}/nav`, `${base}/news`]

  for (const t of tools) {
    urls.push(`${base}/nav/${encodeURIComponent(t.slug)}`)
  }
  for (const n of news) {
    urls.push(`${base}/news/${encodeURIComponent(n.slug)}`)
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
