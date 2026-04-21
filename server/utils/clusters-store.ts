import type { ClusterDetail, ClusterSummary, McpServer, Tool } from '~~/shared/types/site'
import { readSiteDataJson } from './site-assets'
import { readToolsLocalized, getToolBySlug } from './tools-store'
import { readMcpServersLocalized, getMcpServerBySlug } from './mcp-servers-store'

const FALLBACK_LOCALE = 'en'

interface ClusterLocaleCopy {
  title: string
  description: string
  intro: string
}

interface ClusterDef {
  slug: string
  updatedAt?: string
  toolSlugs: string[]
  /** Optional: MCP server slugs (see data/mcp-servers.json) attached to this cluster. */
  mcpServerSlugs?: string[]
  locales: Partial<Record<string, ClusterLocaleCopy>>
}

interface ClustersFile {
  clusters: ClusterDef[]
}

function pickClusterCopy(def: ClusterDef, locale: string): ClusterLocaleCopy {
  const fromLocale = def.locales[locale]
  if (fromLocale?.title && fromLocale.description && fromLocale.intro) return fromLocale
  const en = def.locales[FALLBACK_LOCALE]
  if (en?.title && en.description && en.intro) return en
  const first = Object.values(def.locales).find((c) => c?.title && c?.description && c?.intro)
  if (first) return first
  return { title: def.slug, description: '', intro: '' }
}

export async function listClusterDefs(): Promise<ClusterDef[]> {
  const raw = await readSiteDataJson<ClustersFile>('clusters.json')
  return Array.isArray(raw.clusters) ? raw.clusters : []
}

export async function listClustersLocalized(locale: string): Promise<ClusterSummary[]> {
  const defs = await listClusterDefs()
  return defs.map((d) => {
    const c = pickClusterCopy(d, locale)
    return {
      slug: d.slug,
      title: c.title,
      description: c.description,
      updatedAt: d.updatedAt,
      toolCount: d.toolSlugs.length + (d.mcpServerSlugs?.length ?? 0),
    }
  })
}

export async function readClusterDetail(slug: string, locale: string): Promise<ClusterDetail | null> {
  const defs = await listClusterDefs()
  const def = defs.find((d) => d.slug === slug)
  if (!def) return null
  const c = pickClusterCopy(def, locale)
  const toolsAll = await readToolsLocalized(locale)
  const tools: Tool[] = []
  for (const s of def.toolSlugs) {
    const t = getToolBySlug(toolsAll, s)
    if (t) tools.push(t)
  }
  const mcpServers: McpServer[] = []
  if (def.mcpServerSlugs?.length) {
    const allMcp = await readMcpServersLocalized(locale)
    for (const s of def.mcpServerSlugs) {
      const m = getMcpServerBySlug(allMcp, s)
      if (m) mcpServers.push(m)
    }
  }
  const totalCount = def.toolSlugs.length + (def.mcpServerSlugs?.length ?? 0)
  return {
    slug: def.slug,
    title: c.title,
    description: c.description,
    updatedAt: def.updatedAt,
    toolCount: totalCount,
    intro: c.intro,
    tools,
    mcpServers,
  }
}

export async function maxClusterUpdatedAt(): Promise<string | undefined> {
  const defs = await listClusterDefs()
  const dates = defs.map((d) => d.updatedAt).filter((x): x is string => Boolean(x))
  return dates.length ? dates.sort().at(-1) : undefined
}
