import matter from 'gray-matter'
import { marked } from 'marked'
import type { NewsArticle, NewsListItem } from '~~/shared/types/site'
import { listSiteNewsMdFiles, readSiteNewsFile, siteNewsAssetExists } from './site-assets'

function parseFrontmatterSlug(data: Record<string, unknown>, fallback: string): string {
  const s = data.slug
  if (typeof s === 'string' && s.trim()) return s.trim()
  return fallback
}

function isBaseNewsFile(key: string): boolean {
  return key.endsWith('.md') && !key.includes('/')
}

export async function listBaseNewsFileNames(): Promise<string[]> {
  const keys = await listSiteNewsMdFiles()
  return keys.filter(isBaseNewsFile).sort()
}

async function resolveNewsAssetPath(baseFileName: string, locale: string): Promise<string | null> {
  if (locale === 'zh-CN') {
    return (await siteNewsAssetExists(baseFileName)) ? baseFileName : null
  }
  const localized = `locales/${locale}/${baseFileName}`
  if (await siteNewsAssetExists(localized)) return localized
  if (locale !== 'en') {
    const enOnly = `locales/en/${baseFileName}`
    if (await siteNewsAssetExists(enOnly)) return enOnly
  }
  return (await siteNewsAssetExists(baseFileName)) ? baseFileName : null
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
    const rawPeek = await readSiteNewsFile(baseName)
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
