import type { McpServer } from '~~/shared/types/site'
import { readSiteDataJson } from './site-assets'
import { readMergedJsonOverlays } from './i18n-overlays'
import { readTaxonomy, localizeCategoryLabel, type TaxonomyFile } from './taxonomy-store'

interface McpServersFile {
  servers: McpServer[]
  _meta?: { updatedAt?: string }
}

function applyServerPatches(
  base: McpServer,
  locale: string,
  overlay: Record<string, Record<string, unknown>>,
  tax: TaxonomyFile,
): McpServer {
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

export async function readMcpServersDatasetUpdatedAt(): Promise<string | undefined> {
  const parsed = await readSiteDataJson<McpServersFile>('mcp-servers.json')
  const v = parsed._meta?.updatedAt
  return typeof v === 'string' && v ? v : undefined
}

export async function readMcpServersLocalized(locale: string): Promise<McpServer[]> {
  const parsed = await readSiteDataJson<McpServersFile>('mcp-servers.json')
  const list = Array.isArray(parsed.servers) ? parsed.servers : []
  const overlay = await readMergedJsonOverlays('mcp-overlays', locale)
  const tax = await readTaxonomy()
  return list.map((s) => applyServerPatches(s, locale, overlay, tax))
}

export function getMcpServerBySlug(servers: McpServer[], slug: string): McpServer | undefined {
  return servers.find((s) => s.slug === slug)
}
