/** Locale codes used in URLs (prefix_except_default: default locale has no prefix). */
export const I18N_DEFAULT_LOCALE = 'en'

export const I18N_LOCALES = ['en', 'zh-CN', 'zh-TW', 'ja', 'ko', 'ru', 'hi', 'es'] as const

/** Autonym for each locale — used in language switcher (not translated with site UI). */
export const LOCALE_NATIVE_LABELS = {
  en: 'English',
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  ja: '日本語',
  ko: '한국어',
  ru: 'Русский',
  hi: 'हिन्दी',
  es: 'Español',
} as const satisfies Record<(typeof I18N_LOCALES)[number], string>

export function localePathPrefix(code: string): string {
  if (code === I18N_DEFAULT_LOCALE) return ''
  return `/${code}`
}
