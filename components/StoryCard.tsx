'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
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
  const [isHovered, setIsHovered] = useState(false)
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
    <motion.div 
      className={cn(
        "bg-white rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden",
        "group cursor-pointer transform-gpu"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={handleCardClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{
        scale: 1.02,
        rotateX: 2,
        rotateY: 2,
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10 backdrop-blur-sm opacity-0"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div 
        className="absolute inset-0 shadow-2xl rounded-2xl opacity-0"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-3">
          <motion.div className={cn(
            "inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border relative",
            "hot-badge",
            hotBadgeColors[hotIntensity]
          )}>
            <motion.span
              animate={{ 
                scale: hotIntensity === 'high' ? [1, 1.2, 1] : [1, 1.1, 1],
                rotate: hotIntensity === 'high' ? [0, 5, -5, 0] : 0
              }}
              transition={{ 
                repeat: Infinity, 
                duration: hotIntensity === 'high' ? 1.5 : 2,
                ease: "easeInOut"
              }}
              className="mr-1"
            >
              🔥
            </motion.span>
            <TrendingUp className="w-3 h-3 mr-1" />
            {story.articleCount} articles
            {hotIntensity === 'high' && (
              <motion.span
                className="absolute -top-1 -right-1 text-xs"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                ✨
              </motion.span>
            )}
          </motion.div>
          
          <div className="flex items-center text-slate-500 text-xs">
            <Clock className="w-3 h-3 mr-1" />
            {formatTimeAgo(story.updatedAt)}
          </div>
        </div>

        <motion.h3 
          className="font-bold text-lg text-slate-900 mb-2 transition-colors"
          animate={{ color: isHovered ? '#2563eb' : '#0f172a' }}
          transition={{ duration: 0.3 }}
        >
          {story.name}
        </motion.h3>

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
    </motion.div>
  )
}
