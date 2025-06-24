'use client'

import { Story } from '@/types/perigon'
import { StoryCard } from './StoryCard'
import { LoadingGrid } from './LoadingGrid'
import { ErrorState } from './ErrorState'

interface StoryGridProps {
  stories: Story[]
  loading: boolean
  error: string | null
  onRetry: () => void
}

export function StoryGrid({ stories, loading, error, onRetry }: StoryGridProps) {
  if (loading) {
    return <LoadingGrid />
  }

  if (error) {
    return <ErrorState error={error} onRetry={onRetry} />
  }

  if (!stories.length) {
    return (
      <div className="text-center py-12">
        <div className="text-slate-400 text-lg">No trending stories found</div>
        <p className="text-slate-500 mt-2">Try adjusting your filters or search terms</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stories.map((story, index) => (
        <StoryCard 
          key={story.clusterId} 
          story={story} 
          index={index}
        />
      ))}
    </div>
  )
}
