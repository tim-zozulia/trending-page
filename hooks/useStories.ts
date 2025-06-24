import { useState, useEffect, useCallback, useMemo } from 'react'
import { Story } from '@/types/perigon'
import { perigonAPI, FetchStoriesParams } from '@/lib/perigon'

interface UseStoriesOptions extends FetchStoriesParams {
  autoRefresh?: boolean
  refreshInterval?: number
}

function generateRandomStory(): Story {
  const topics = [
    'Breaking: Tech Innovation Breakthrough',
    'Global Markets React to Policy Changes',
    'Climate Action Summit Results',
    'Space Mission Achieves New Milestone',
    'Healthcare Technology Advancement',
    'Renewable Energy Investment Surge'
  ]
  
  const categories = [
    ['technology', 'business'],
    ['politics', 'business'],
    ['environment', 'politics'],
    ['science', 'technology'],
    ['health', 'technology'],
    ['environment', 'business']
  ]
  
  const countryGroups = [
    ['US', 'CA'],
    ['UK', 'EU'],
    ['DE', 'FR'],
    ['JP', 'CN'],
    ['US', 'UK', 'DE'],
    ['CN', 'RU']
  ]
  
  const randomIndex = Math.floor(Math.random() * topics.length)
  
  return {
    clusterId: `live-${Date.now()}`,
    name: topics[randomIndex],
    summary: `Live update: ${topics[randomIndex]} with developing coverage and analysis.`,
    summaryReference: ['live-ref'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    initializedAt: new Date().toISOString(),
    articleCount: Math.floor(Math.random() * 20) + 5,
    articles: [],
    categories: categories[randomIndex],
    topics: ['breaking news', 'live updates'],
    countries: countryGroups[randomIndex],
    languages: ['en']
  }
}

export function useStories(options: UseStoriesOptions = {}) {
  const [allStories, setAllStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasInitialFetch, setHasInitialFetch] = useState(false)

  const { autoRefresh = false, refreshInterval = 30000, ...fetchParams } = options

  const fetchStories = useCallback(async () => {
    if (hasInitialFetch) return // Prevent multiple fetches
    
    try {
      setLoading(true)
      setError(null)
      const data = await perigonAPI.fetchStories({}) // Fetch all stories without filters
      setAllStories(data)
      setHasInitialFetch(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stories')
      setHasInitialFetch(true)
    } finally {
      setLoading(false)
    }
  }, [hasInitialFetch])

  const filteredStories = useMemo(() => {
    let filtered = allStories

    if (fetchParams.category) {
      filtered = filtered.filter(story => 
        story.categories.some(cat => 
          cat.toLowerCase().includes(fetchParams.category!.toLowerCase())
        )
      )
    }

    if (fetchParams.country && fetchParams.country !== 'All') {
      filtered = filtered.filter(story =>
        story.countries.includes(fetchParams.country!)
      )
    }

    if (fetchParams.query) {
      const query = fetchParams.query.toLowerCase()
      filtered = filtered.filter(story =>
        story.name.toLowerCase().includes(query) ||
        story.summary.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [allStories, fetchParams.category, fetchParams.country, fetchParams.query])

  const refetch = useCallback(() => {
    setHasInitialFetch(false)
    fetchStories()
  }, [fetchStories])

  useEffect(() => {
    fetchStories()
  }, [fetchStories])

  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      setAllStories(prevStories => {
        const updatedStories = prevStories.map(story => ({
          ...story,
          articleCount: story.articleCount + Math.floor(Math.random() * 3),
          updatedAt: new Date().toISOString()
        }))
        
        if (Math.random() < 0.3) {
          const newStory = generateRandomStory()
          return [newStory, ...updatedStories].slice(0, 8)
        }
        
        return updatedStories
      })
    }, refreshInterval)
    return () => clearInterval(interval)
  }, [autoRefresh, refreshInterval])

  return {
    stories: filteredStories,
    loading,
    error,
    refetch
  }
}
