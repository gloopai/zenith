export interface Tool {
  slug: string
  name: string
  description: string
  url: string
  category: string
  tags?: string[]
  featured?: boolean
  /** ISO date YYYY-MM-DD — tool copy or pricing last reviewed; falls back to catalog meta in sitemap */
  updatedAt?: string
}

export interface NewsListItem {
  slug: string
  title: string
  description: string
  date: string
}

/** GET /api/news — always includes items + total; page fields when paginated */
export interface NewsListResponse {
  items: NewsListItem[]
  total: number
  page?: number
  pageSize?: number
  totalPages?: number
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
