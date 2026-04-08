import { readSiteDataJson } from './site-assets'
import { readTaxonomy, localizeCategoryLabel } from './taxonomy-store'
import type { CategoryEntityDef, CategoryEntityLocaleBlock } from '~~/shared/types/site'

interface CategoryEntitiesFile {
  entities: CategoryEntityDef[]
}

let cache: CategoryEntityDef[] | null = null

async function readAll(): Promise<CategoryEntityDef[]> {
  if (cache) return cache
  const f = await readSiteDataJson<CategoryEntitiesFile>('category-entities.json')
  cache = Array.isArray(f.entities) ? f.entities : []
  return cache
}

export async function listCategoryEntities(): Promise<CategoryEntityDef[]> {
  return readAll()
}

export async function getCategoryEntityBySlug(slug: string): Promise<CategoryEntityDef | undefined> {
  const list = await readAll()
  return list.find((e) => e.slug === slug)
}

export async function getCategorySlugByCanonicalKey(key: string): Promise<string | undefined> {
  const list = await readAll()
  return list.find((e) => e.canonicalKey === key)?.slug
}

export function pickCategoryLocaleBlock(
  entity: CategoryEntityDef,
  locale: string,
): CategoryEntityLocaleBlock | null {
  const direct = entity.locales[locale]
  if (direct?.title && direct.description && direct.intro) return direct
  const en = entity.locales.en
  if (en?.title && en.description && en.intro) return en
  const zhcn = entity.locales['zh-CN']
  if (zhcn?.title && zhcn.description && zhcn.intro) return zhcn
  return direct ?? en ?? zhcn ?? null
}

/** When JSON lacks a locale, build minimal metadata from taxonomy. */
export async function resolveCategoryCopy(
  entity: CategoryEntityDef,
  locale: string,
): Promise<CategoryEntityLocaleBlock> {
  const tax = await readTaxonomy()
  const label = localizeCategoryLabel(entity.canonicalKey, locale, tax)
  const picked = pickCategoryLocaleBlock(entity, locale)
  if (picked) {
    return {
      ...picked,
      gscBlocks: picked.gscBlocks ?? [],
    }
  }
  return {
    title: `${label} · Plunget`,
    description: `${label} — curated AI tools with neutral summaries and official links.`,
    intro: '',
    gscBlocks: [],
  }
}
