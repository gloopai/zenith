import { readOpenclawSkillsLocalized } from '../utils/openclaw-skills-store'
import { readToolsLocalized } from '../utils/tools-store'
import { listNewsMeta } from '../utils/news-store'
import { I18N_LOCALES, localePathPrefix } from '~~/shared/i18n-public'

const SITE_ORIGIN = 'https://plunget.com'

export default defineEventHandler(async (event) => {
  const base = SITE_ORIGIN

  const tools = await readToolsLocalized('zh-CN')
  const news = await listNewsMeta('zh-CN')
  const openclawSkills = await readOpenclawSkillsLocalized('zh-CN')

  const urls: string[] = []

  for (const code of I18N_LOCALES) {
    const p = localePathPrefix(code)
    const home = code === I18N_DEFAULT_LOCALE ? `${base}/` : `${base}${p}`
    urls.push(home, `${base}${p}/nav`, `${base}${p}/news`, `${base}${p}/openclaw`)
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
      urls.push(`${base}${p}/openclaw/${encodeURIComponent(s.slug)}`)
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
