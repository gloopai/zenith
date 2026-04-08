import { readSiteDataJson } from './site-assets'
import type { ToolSeoExtraLocaleBlock } from '~~/shared/types/site'

type ToolSeoExtrasFile = Record<string, Partial<Record<string, ToolSeoExtraLocaleBlock>>>

let cache: ToolSeoExtrasFile | null = null

async function load(): Promise<ToolSeoExtrasFile> {
  if (cache) return cache
  cache = await readSiteDataJson<ToolSeoExtrasFile>('tool-seo-extras.json')
  return cache
}

export async function getToolSeoExtra(slug: string, locale: string): Promise<ToolSeoExtraLocaleBlock | null> {
  const data = await load()
  const row = data[slug]
  if (!row) return null
  const block = row[locale] ?? row.en ?? row['zh-CN']
  if (!block) return null
  return {
    ...block,
    checklistItems: block.checklistItems ?? [],
    gscParagraphs: block.gscParagraphs ?? [],
  }
}
