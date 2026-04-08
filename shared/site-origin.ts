/** Canonical public origin (no trailing slash). Used by sitemap and fallbacks. */
export function resolveSiteOriginFromEnv(): string {
  const raw =
    (typeof process !== 'undefined' && process.env && process.env.NUXT_PUBLIC_SITE_URL) || 'https://plunget.com'
  return raw.replace(/\/$/, '')
}
