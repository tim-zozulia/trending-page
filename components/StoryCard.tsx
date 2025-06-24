'use client'

import { useState } from 'react'
import { Story } from '@/types/perigon'
import { formatTimeAgo, getHotBadgeIntensity, truncateText, cn } from '@/lib/utils'
import { TrendingUp, Clock, Globe, ChevronDown, ChevronUp } from 'lucide-react'

interface StoryCardProps {
  story: Story
  index: number
  onCardClick?: (story: Story, event: React.MouseEvent) => void
}

export function StoryCard({ story, index, onCardClick }: StoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const hotIntensity = getHotBadgeIntensity(story.articleCount)

  const hotBadgeColors = {
    low: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    medium: 'bg-orange-100 text-orange-800 border-orange-200',
    high: 'bg-red-100 text-red-800 border-red-200'
  }

  const handleCardClick = (event: React.MouseEvent) => {
    if (onCardClick) {
      onCardClick(story, event)
    }
  }

  return (
    <div 
      className={cn(
        "bg-white rounded-xl shadow-sm border border-slate-200",
        "hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300",
        "group cursor-pointer transform-gpu"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={handleCardClick}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className={cn(
            "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border",
            "hot-badge",
            hotBadgeColors[hotIntensity]
          )}>
            <TrendingUp className="w-3 h-3 mr-1" />
            {story.articleCount} articles
          </div>
          
          <div className="flex items-center text-slate-500 text-xs">
            <Clock className="w-3 h-3 mr-1" />
            {formatTimeAgo(story.updatedAt)}
          </div>
        </div>

        <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
          {story.name}
        </h3>

        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          {isExpanded ? story.summary : truncateText(story.summary, 120)}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {story.categories.slice(0, 3).map((category) => (
            <span
              key={category}
              className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md capitalize"
            >
              {category}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-slate-500 text-xs">
            <Globe className="w-3 h-3 mr-1" />
            {story.countries.slice(0, 3).join(', ')}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsExpanded(!isExpanded)
            }}
            className="flex items-center text-blue-500 text-xs font-medium hover:text-blue-600 transition-colors"
          >
            {isExpanded ? (
              <>
                Show less <ChevronUp className="w-3 h-3 ml-1" />
              </>
            ) : (
              <>
                Read more <ChevronDown className="w-3 h-3 ml-1" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
