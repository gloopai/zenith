import type { H3Event } from 'h3'
import { getQuery } from 'h3'
import { I18N_DEFAULT_LOCALE, I18N_LOCALES } from '~~/shared/i18n-public'

const ALLOWED = new Set<string>(I18N_LOCALES as unknown as string[])

/**
 * Reads `?locale=` only. Do not use i18n cookies here: a missing query would otherwise
 * serve the wrong language while the Nuxt route is another locale (mixed-language lists).
 */
export function getRequestContentLocale(event: H3Event): string {
  const q = getQuery(event).locale
  const raw = typeof q === 'string' ? q.trim() : Array.isArray(q) ? String(q[0] ?? '').trim() : ''
  if (raw && ALLOWED.has(raw)) return raw
  return I18N_DEFAULT_LOCALE
}
