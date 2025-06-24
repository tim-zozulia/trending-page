'use client'

import { useState, useEffect } from 'react'
import { TrendingTicker } from '@/components/TrendingTicker'
import { CategoryFilters } from '@/components/CategoryFilters'
import { StoryGrid } from '@/components/StoryGrid'
import { LiveToggle } from '@/components/LiveToggle'
import { SearchBar } from '@/components/SearchBar'
import { useStories } from '@/hooks/useStories'
import { Story } from '@/types/perigon'

const CATEGORIES = [
  'All',
  'Politics',
  'Technology',
  'Business',
  'Sports',
  'Entertainment',
  'Health',
  'Science'
]

export default function TrendingPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLiveMode, setIsLiveMode] = useState(false)
  
  const { stories, loading, error, refetch } = useStories({
    category: selectedCategory === 'All' ? undefined : selectedCategory.toLowerCase(),
    query: searchQuery,
    autoRefresh: isLiveMode
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <TrendingTicker stories={stories.slice(0, 5)} />
        
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <h1 className="text-2xl font-bold text-slate-900">
                🔥 Trending Stories
              </h1>
              <LiveToggle 
                isLive={isLiveMode} 
                onToggle={setIsLiveMode}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <SearchBar 
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search trending stories..."
              />
            </div>
          </div>
          
          <CategoryFilters
            categories={CATEGORIES}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <StoryGrid 
          stories={stories}
          loading={loading}
          error={error}
          onRetry={refetch}
        />
      </main>
    </div>
  )
}
