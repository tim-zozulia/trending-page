import { PerigonResponse, Story, ApiError } from '@/types/perigon'

const API_BASE_URL = process.env.NEXT_PUBLIC_PERIGON_API_URL || 'https://api.perigon.io/v1'
const API_KEY = process.env.NEXT_PUBLIC_PERIGON_API_KEY

export interface FetchStoriesParams {
  category?: string
  country?: string
  query?: string
  sortBy?: 'date' | 'relevance'
  from?: string
  to?: string
  page?: number
  size?: number
}

export class PerigonAPI {
  private apiKey: string

  constructor(apiKey?: string) {
    this.apiKey = apiKey || API_KEY || ''
    if (!this.apiKey) {
      console.warn('Perigon API key not found. Using mock data.')
    }
  }

  async fetchStories(params: FetchStoriesParams = {}): Promise<Story[]> {
    if (!this.apiKey) {
      return this.getMockStories()
    }

    try {
      const searchParams = new URLSearchParams()
      
      if (params.category) searchParams.append('category', params.category)
      if (params.country) searchParams.append('country', params.country)
      if (params.query) searchParams.append('q', params.query)
      if (params.sortBy) searchParams.append('sortBy', params.sortBy)
      if (params.from) searchParams.append('from', params.from)
      if (params.to) searchParams.append('to', params.to)
      
      searchParams.append('page', (params.page || 1).toString())
      searchParams.append('size', (params.size || 20).toString())
      searchParams.append('apiKey', this.apiKey)

      const response = await fetch(`${API_BASE_URL}/stories/all?${searchParams}`)
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`)
      }

      const data: PerigonResponse = await response.json()
      return data.articles || []
    } catch (error) {
      console.error('Error fetching stories:', error)
      return this.getMockStories()
    }
  }

  private getMockStories(): Story[] {
    return [
      {
        clusterId: 'mock-1',
        name: 'AI Revolution in Healthcare',
        summary: 'Breakthrough AI technologies are transforming medical diagnosis and treatment, with new applications showing remarkable accuracy in detecting diseases.',
        summaryReference: ['ref1', 'ref2'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        initializedAt: new Date().toISOString(),
        articleCount: 15,
        articles: [],
        categories: ['technology', 'health'],
        topics: ['artificial intelligence', 'healthcare', 'medical technology'],
        countries: ['US', 'UK', 'CA'],
        languages: ['en']
      },
      {
        clusterId: 'mock-2',
        name: 'Global Climate Summit Outcomes',
        summary: 'World leaders reach unprecedented agreements on carbon reduction targets and renewable energy investments at the latest climate summit.',
        summaryReference: ['ref3', 'ref4'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        initializedAt: new Date().toISOString(),
        articleCount: 23,
        articles: [],
        categories: ['politics', 'environment'],
        topics: ['climate change', 'renewable energy', 'international relations'],
        countries: ['US', 'DE', 'FR', 'JP'],
        languages: ['en']
      },
      {
        clusterId: 'mock-3',
        name: 'Tech Giants Quarterly Earnings',
        summary: 'Major technology companies report mixed quarterly results, with AI investments driving growth while traditional sectors face challenges.',
        summaryReference: ['ref5', 'ref6'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        initializedAt: new Date().toISOString(),
        articleCount: 31,
        articles: [],
        categories: ['business', 'technology'],
        topics: ['earnings', 'artificial intelligence', 'stock market'],
        countries: ['US'],
        languages: ['en']
      },
      {
        clusterId: 'mock-4',
        name: 'Space Exploration Milestone',
        summary: 'Historic space mission achieves new records in deep space exploration, opening possibilities for future interplanetary travel.',
        summaryReference: ['ref7', 'ref8'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        initializedAt: new Date().toISOString(),
        articleCount: 18,
        articles: [],
        categories: ['science', 'technology'],
        topics: ['space exploration', 'nasa', 'space technology'],
        countries: ['US', 'RU', 'CN'],
        languages: ['en']
      },
      {
        clusterId: 'mock-5',
        name: 'Renewable Energy Breakthrough',
        summary: 'Scientists develop revolutionary solar panel technology that could dramatically reduce the cost of renewable energy worldwide.',
        summaryReference: ['ref9', 'ref10'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        initializedAt: new Date().toISOString(),
        articleCount: 12,
        articles: [],
        categories: ['science', 'environment'],
        topics: ['renewable energy', 'solar power', 'clean technology'],
        countries: ['DE', 'CN', 'US'],
        languages: ['en']
      },
      {
        clusterId: 'mock-6',
        name: 'Global Economic Outlook',
        summary: 'Economic analysts predict significant shifts in global markets as emerging technologies reshape traditional industries.',
        summaryReference: ['ref11', 'ref12'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        initializedAt: new Date().toISOString(),
        articleCount: 27,
        articles: [],
        categories: ['business', 'politics'],
        topics: ['economy', 'market trends', 'global finance'],
        countries: ['US', 'CN', 'EU'],
        languages: ['en']
      }
    ]
  }
}

export const perigonAPI = new PerigonAPI()
