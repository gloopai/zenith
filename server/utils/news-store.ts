import matter from 'gray-matter'
import { marked } from 'marked'
import type { NewsArticle, NewsListItem } from '~~/shared/types/site'
import { I18N_LOCALES } from '~~/shared/i18n-public'
import { listSiteNewsMdFiles, readSiteNewsFile, siteNewsAssetExists } from './site-assets'

function parseFrontmatterSlug(data: Record<string, unknown>, fallback: string): string {
  const s = data.slug
  if (typeof s === 'string' && s.trim()) return s.trim()
  return fallback
}

/** Normalize storage keys (e.g. Windows) and return `article.md` basename if under locales/{any}/. */
function basenameFromLocaleFileKey(key: string): string | null {
  const norm = key.replace(/\\/g, '/')
  const m = norm.match(/^locales\/[^/]+\/([^/]+\.md)$/)
  return m ? m[1] : null
}

/** True for legacy root-level `article.md` (no slash). */
function isLegacyRootNewsFile(key: string): boolean {
  const norm = key.replace(/\\/g, '/')
  return norm.endsWith('.md') && !norm.includes('/')
}

export async function listBaseNewsFileNames(): Promise<string[]> {
  const keys = await listSiteNewsMdFiles()
  const basenames = new Set<string>()
  for (const k of keys) {
    const fromLocale = basenameFromLocaleFileKey(k)
    if (fromLocale) basenames.add(fromLocale)
    else if (isLegacyRootNewsFile(k)) basenames.add(k.replace(/\\/g, '/'))
  }
  return [...basenames].sort()
}

async function resolveNewsAssetPath(baseFileName: string, locale: string): Promise<string | null> {
  const inLocale = `locales/${locale}/${baseFileName}`
  if (await siteNewsAssetExists(inLocale)) return inLocale

  // Canonical UI locales: never fall back to another language (avoids mixed-language lists).
  if (locale === 'en' || locale === 'zh-CN') return null

  const enPath = `locales/en/${baseFileName}`
  if (await siteNewsAssetExists(enPath)) return enPath

  const zhPath = `locales/zh-CN/${baseFileName}`
  if (await siteNewsAssetExists(zhPath)) return zhPath

  if (await siteNewsAssetExists(baseFileName)) return baseFileName

  return null
}

async function readCanonicalPeekRaw(baseFileName: string): Promise<string | null> {
  const prioritized = [`locales/zh-CN/${baseFileName}`, `locales/en/${baseFileName}`, baseFileName]
  for (const p of prioritized) {
    if (await siteNewsAssetExists(p)) return readSiteNewsFile(p)
  }
  for (const code of I18N_LOCALES) {
    if (code === 'zh-CN' || code === 'en') continue
    const p = `locales/${code}/${baseFileName}`
    if (await siteNewsAssetExists(p)) return readSiteNewsFile(p)
  }
  return null
}

export async function listNewsMeta(locale: string): Promise<NewsListItem[]> {
  const baseNames = await listBaseNewsFileNames()
  const items: NewsListItem[] = []

  for (const baseName of baseNames) {
    const path = await resolveNewsAssetPath(baseName, locale)
    if (!path) continue
    const raw = await readSiteNewsFile(path)
    const { data } = matter(raw)
    const d = data as Record<string, unknown>
    const slug = parseFrontmatterSlug(d, baseName.replace(/\.md$/i, ''))
    const title = typeof d.title === 'string' ? d.title : slug
    const description = typeof d.description === 'string' ? d.description : ''
    const date = typeof d.date === 'string' ? d.date : ''
    items.push({ slug, title, description, date })
  }

  items.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
  return items
}

export async function getNewsBySlug(slug: string, locale: string): Promise<NewsArticle | null> {
  const baseNames = await listBaseNewsFileNames()

  for (const baseName of baseNames) {
    const rawPeek = await readCanonicalPeekRaw(baseName)
    if (!rawPeek) continue
    const { data: peekData } = matter(rawPeek)
    const peekD = peekData as Record<string, unknown>
    const fileSlug = parseFrontmatterSlug(peekD, baseName.replace(/\.md$/i, ''))
    if (fileSlug !== slug) continue

    const path = await resolveNewsAssetPath(baseName, locale)
    if (!path) return null
    const raw = await readSiteNewsFile(path)
    const { data, content } = matter(raw)
    const d = data as Record<string, unknown>
    const title = typeof d.title === 'string' ? d.title : slug
    const description = typeof d.description === 'string' ? d.description : ''
    const date = typeof d.date === 'string' ? d.date : ''
    const html = await marked.parse(content.trim() || '')
    return { slug, title, description, date, html }
  }

  return null
}
