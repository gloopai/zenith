import { readSiteDataJsonOptional } from './site-assets'

export interface TaxonomyFile {
  categories: Record<string, Partial<Record<string, string>>>
}

let taxonomyCache: TaxonomyFile | null = null

export async function readTaxonomy(): Promise<TaxonomyFile> {
  if (taxonomyCache) return taxonomyCache
  const t = await readSiteDataJsonOptional<TaxonomyFile>('i18n/taxonomy.json')
  taxonomyCache = t ?? { categories: {} }
  return taxonomyCache
}

export function localizeCategoryLabel(source: string, locale: string, tax: TaxonomyFile): string {
  const row = tax.categories[source]
  if (!row) return source
  const v = row[locale]
  return typeof v === 'string' && v.length > 0 ? v : source
}
