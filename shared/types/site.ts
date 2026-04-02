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
