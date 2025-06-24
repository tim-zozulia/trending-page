import { useState, useEffect, useCallback, useMemo } from 'react'
import { Story } from '@/types/perigon'
import { perigonAPI, FetchStoriesParams } from '@/lib/perigon'

interface UseStoriesOptions extends FetchStoriesParams {
  autoRefresh?: boolean
  refreshInterval?: number
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

    if (fetchParams.query) {
      const query = fetchParams.query.toLowerCase()
      filtered = filtered.filter(story =>
        story.name.toLowerCase().includes(query) ||
        story.summary.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [allStories, fetchParams.category, fetchParams.query])

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
      setHasInitialFetch(false)
      fetchStories()
    }, refreshInterval)
    return () => clearInterval(interval)
  }, [autoRefresh, refreshInterval, fetchStories])

  return {
    stories: filteredStories,
    loading,
    error,
    refetch
  }
}
