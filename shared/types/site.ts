export interface Tool {
  slug: string
  name: string
  description: string
  url: string
  category: string
  tags?: string[]
  featured?: boolean
}

export interface NewsListItem {
  slug: string
  title: string
  description: string
  date: string
}

export interface NewsArticle extends NewsListItem {
  html: string
}

/** OpenClaw AgentSkills 条目（官方仓库 skills/ 或自定义示例） */
export interface OpenClawSkill {
  slug: string
  name: string
  description: string
  url: string
  category: string
  tags?: string[]
  featured?: boolean
  /** 官方仓库内置为 true；教程/自定义示例为 false */
  official?: boolean
}

/** Model Context Protocol server directory entry. */
export interface McpServer {
  slug: string
  name: string
  description: string
  url: string
  category: string
  tags?: string[]
  featured?: boolean
  /** Official = vendor-published or in modelcontextprotocol/servers; community forks are false. */
  official?: boolean
  /** Typical transport: stdio | http | sse | ws. Free-form to track future additions. */
  transport?: string
  /** Quick-start install command (npx/uvx/docker/etc.) or link-style hint. */
  install?: string
  /** Publisher of the server (Anthropic, Cloudflare, Stripe, community, etc.). */
  vendor?: string
}

export interface ClusterSummary {
  slug: string
  title: string
  description: string
  updatedAt?: string
  toolCount: number
}

export interface ClusterDetail extends ClusterSummary {
  intro: string
  tools: Tool[]
  /** Optional curated MCP servers attached to the cluster (rendered after tools). */
  mcpServers?: McpServer[]
}

/** Extra editorial SEO blocks for tool detail (locale-keyed in data/tool-seo-extras.json). */
export interface ToolSeoExtraLocaleBlock {
  suitableFor?: string
  notIdealFor?: string
  compareHint?: string
  checklistItems?: string[]
  /** Fill from Search Console: high-impression queries that need on-page answers. */
  gscParagraphs?: { heading: string; body: string }[]
}

export interface CategoryEntityLocaleBlock {
  title: string
  description: string
  intro: string
  gscBlocks?: { heading: string; body: string }[]
}

export interface CategoryEntityDef {
  /** Must match `category` in tools.json (and taxonomy root keys). */
  canonicalKey: string
  slug: string
  updatedAt: string
  locales: Partial<Record<string, CategoryEntityLocaleBlock>>
}

export interface ToolDetailResponse {
  tool: Tool
  categorySlug: string | null
  related: Tool[]
  seoExtra: ToolSeoExtraLocaleBlock | null
}

export interface CategoryDetailResponse {
  slug: string
  canonicalKey: string
  updatedAt: string
  title: string
  description: string
  intro: string
  gscBlocks: { heading: string; body: string }[]
  tools: Tool[]
}

export interface NavCategoryListItem {
  slug: string
  label: string
  count: number
}
