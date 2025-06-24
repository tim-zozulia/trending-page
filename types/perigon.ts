export interface Article {
  id: string
  title: string
  description: string
  content: string
  url: string
  imageUrl?: string
  publishedAt: string
  source: {
    name: string
    domain: string
  }
  country: string
  language: string
  categories: string[]
  topics: string[]
}

export interface Story {
  clusterId: string
  name: string
  summary: string
  summaryReference: string[]
  createdAt: string
  updatedAt: string
  initializedAt: string
  articleCount: number
  articles: Article[]
  categories: string[]
  topics: string[]
  countries: string[]
  languages: string[]
}

export interface PerigonResponse {
  status: number
  totalArticles: number
  page: number
  totalPages: number
  articles: Story[]
}

export interface ApiError {
  message: string
  status?: number
}
