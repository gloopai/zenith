import { resolveSiteOriginFromEnv } from '~~/shared/site-origin'

/** Absolute Sitemap URL required by spec; avoids Lighthouse "invalid robots.txt". */
export default defineEventHandler((event) => {
  const base = resolveSiteOriginFromEnv()
  const body = `User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return body
})
