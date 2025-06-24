'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { TrendingTicker } from '@/components/TrendingTicker'
import { CategoryFilters } from '@/components/CategoryFilters'
import { StoryGrid } from '@/components/StoryGrid'
import { LiveToggle } from '@/components/LiveToggle'
import { SearchBar } from '@/components/SearchBar'
import { StoryDetailModal } from '@/components/StoryDetailModal'
import { GeographicFilter } from '@/components/GeographicFilter'
import { MiniGlobe } from '@/components/MiniGlobe'
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
  const [selectedCountry, setSelectedCountry] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLiveMode, setIsLiveMode] = useState(false)
  const [selectedStory, setSelectedStory] = useState<Story | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [cardRect, setCardRect] = useState<DOMRect | null>(null)
  
  const { stories, loading, error, refetch } = useStories({
    category: selectedCategory === 'All' ? undefined : selectedCategory.toLowerCase(),
    country: selectedCountry,
    query: searchQuery,
    autoRefresh: isLiveMode
  })

  const availableCountries = useMemo(() => {
    const countries = new Set<string>()
    stories.forEach(story => {
      story.countries.forEach(country => countries.add(country))
    })
    return Array.from(countries).sort()
  }, [stories])

  const handleCardClick = useCallback((story: Story, event: React.MouseEvent) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
    setCardRect(rect)
    setSelectedStory(story)
    setIsModalOpen(true)
  }, [])

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false)
    setSelectedStory(null)
    setCardRect(null)
  }, [])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isModalOpen) {
        handleModalClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isModalOpen, handleModalClose])

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
              <GeographicFilter
                countries={availableCountries}
                selected={selectedCountry}
                onSelect={setSelectedCountry}
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
        <div className="flex gap-8">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="text-lg font-semibold text-slate-700">
                {selectedCountry !== 'All' ? `Stories from ${selectedCountry}` : 'All Stories'}
              </div>
              {isLiveMode && (
                <div className="flex items-center gap-2 text-green-600 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Live Updates Active
                </div>
              )}
            </div>
            <StoryGrid 
              stories={stories}
              loading={loading}
              error={error}
              onRetry={refetch}
              onCardClick={handleCardClick}
            />
          </div>
          <div className="hidden lg:block w-64">
            <div className="sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Story Distribution</h3>
              <MiniGlobe
                stories={stories}
                onCountryClick={setSelectedCountry}
                selectedCountry={selectedCountry === 'All' ? undefined : selectedCountry}
              />
              <div className="mt-4 text-sm text-slate-600">
                <p className="mb-2">Countries with stories:</p>
                <div className="flex flex-wrap gap-1">
                  {availableCountries.map(country => (
                    <button
                      key={country}
                      onClick={() => setSelectedCountry(country)}
                      className={`px-2 py-1 rounded text-xs ${
                        selectedCountry === country
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {country}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <StoryDetailModal
        story={selectedStory}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        cardRect={cardRect || undefined}
      />
    </div>
  )
}
