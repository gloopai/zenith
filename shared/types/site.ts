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
