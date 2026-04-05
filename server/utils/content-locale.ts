import type { H3Event } from 'h3'
import { getQuery } from 'h3'
import { I18N_LOCALES } from '~~/shared/i18n-public'

const ALLOWED = new Set<string>(I18N_LOCALES as unknown as string[])

export function getRequestContentLocale(event: H3Event): string {
  const q = getQuery(event).locale
  const raw = typeof q === 'string' ? q.trim() : Array.isArray(q) ? String(q[0] ?? '').trim() : ''
  if (raw && ALLOWED.has(raw)) return raw
  return 'en'
}
