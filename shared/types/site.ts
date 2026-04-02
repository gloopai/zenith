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
