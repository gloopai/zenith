import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import matter from 'gray-matter'
import { marked } from 'marked'
import type { NewsArticle, NewsListItem } from '~~/shared/types/site'
import { getNewsDir } from './paths'

function parseFrontmatterSlug(data: Record<string, unknown>, fallback: string): string {
  const s = data.slug
  if (typeof s === 'string' && s.trim()) return s.trim()
  return fallback
}

export async function listNewsMeta(): Promise<NewsListItem[]> {
  const dir = getNewsDir()
  let files: string[] = []
  try {
    files = await readdir(dir)
  } catch {
    return []
  }

  const mdFiles = files.filter((f) => f.endsWith('.md'))
  const items: NewsListItem[] = []

  for (const file of mdFiles) {
    const raw = await readFile(join(dir, file), 'utf-8')
    const { data } = matter(raw)
    const d = data as Record<string, unknown>
    const slug = parseFrontmatterSlug(d, file.replace(/\.md$/i, ''))
    const title = typeof d.title === 'string' ? d.title : slug
    const description = typeof d.description === 'string' ? d.description : ''
    const date = typeof d.date === 'string' ? d.date : ''
    items.push({ slug, title, description, date })
  }

  items.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
  return items
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | null> {
  const dir = getNewsDir()
  const files = await readdir(dir).catch(() => [] as string[])
  const mdFiles = files.filter((f) => f.endsWith('.md'))

  for (const file of mdFiles) {
    const raw = await readFile(join(dir, file), 'utf-8')
    const { data, content } = matter(raw)
    const d = data as Record<string, unknown>
    const fileSlug = parseFrontmatterSlug(d, file.replace(/\.md$/i, ''))
    if (fileSlug !== slug) continue

    const title = typeof d.title === 'string' ? d.title : fileSlug
    const description = typeof d.description === 'string' ? d.description : ''
    const date = typeof d.date === 'string' ? d.date : ''
    const html = await marked.parse(content.trim() || '')
    return { slug: fileSlug, title, description, date, html }
  }

  return null
}
