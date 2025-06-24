'use client'

import { Story } from '@/types/perigon'
import { formatTimeAgo } from '@/lib/utils'

interface TrendingTickerProps {
  stories: Story[]
}

export function TrendingTicker({ stories }: TrendingTickerProps) {
  if (!stories.length) return null

  return (
    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 overflow-hidden">
      <div className="flex items-center">
        <div className="flex-shrink-0 px-4 font-bold text-sm">
          🔥 TRENDING NOW
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="ticker-content flex items-center space-x-8 whitespace-nowrap">
            {stories.map((story, index) => (
              <div key={`${story.clusterId}-${index}`} className="flex items-center space-x-2">
                <span className="font-medium">{story.name}</span>
                <span className="text-white/80 text-sm">
                  ({story.articleCount} articles)
                </span>
                <span className="text-white/60 text-xs">
                  {formatTimeAgo(story.updatedAt)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
