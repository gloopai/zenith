/** Locale codes used in URLs (prefix_except_default: default locale has no prefix). */
export const I18N_DEFAULT_LOCALE = 'en'

export const I18N_LOCALES = ['en', 'zh-CN', 'zh-TW', 'ja', 'ko', 'ru', 'hi', 'es'] as const

export function localePathPrefix(code: string): string {
  if (code === I18N_DEFAULT_LOCALE) return ''
  return `/${code}`
}
