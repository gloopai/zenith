import type { Tool } from '~~/shared/types/site'
import { readSiteDataJson } from './site-assets'
import { readMergedJsonOverlays } from './i18n-overlays'
import { readTaxonomy, localizeCategoryLabel, type TaxonomyFile } from './taxonomy-store'

interface ToolsFile {
  meta?: { catalogUpdatedAt?: string }
  tools: Tool[]
}

export function resolveToolCategoryKey(base: Tool, overlay: Record<string, Record<string, unknown>>): string {
  const patch = overlay[base.slug]
  return typeof patch?.category === 'string' && patch.category ? patch.category : base.category
}

function applyToolPatches(base: Tool, locale: string, overlay: Record<string, Record<string, unknown>>, tax: TaxonomyFile): Tool {
  const patch = overlay[base.slug]
  const name = typeof patch?.name === 'string' && patch.name ? patch.name : base.name
  const description =
    typeof patch?.description === 'string' && patch.description ? patch.description : base.description
  const categoryKey = typeof patch?.category === 'string' && patch.category ? patch.category : base.category
  const tags = Array.isArray(patch?.tags) ? (patch.tags as string[]) : base.tags

  return {
    ...base,
    name,
    description,
    category: localizeCategoryLabel(categoryKey, locale, tax),
    tags,
  }
}

export async function readToolsLocalized(locale: string): Promise<Tool[]> {
  const parsed = await readSiteDataJson<ToolsFile>('tools.json')
  const list = Array.isArray(parsed.tools) ? parsed.tools : []
  const overlay = await readMergedJsonOverlays('tool-overlays', locale)
  const tax = await readTaxonomy()
  return list.map((t) => applyToolPatches(t, locale, overlay, tax))
}

export async function readToolsWithCategoryKeys(
  locale: string,
): Promise<Array<{ tool: Tool; categoryKey: string }>> {
  const parsed = await readSiteDataJson<ToolsFile>('tools.json')
  const list = Array.isArray(parsed.tools) ? parsed.tools : []
  const overlay = await readMergedJsonOverlays('tool-overlays', locale)
  const tax = await readTaxonomy()
  return list.map((t) => ({
    tool: applyToolPatches(t, locale, overlay, tax),
    categoryKey: resolveToolCategoryKey(t, overlay),
  }))
}

export function getToolBySlug(tools: Tool[], slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug)
}
