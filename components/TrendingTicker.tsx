'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Story } from '@/types/perigon'
import { formatTimeAgo } from '@/lib/utils'

interface TrendingTickerProps {
  stories: Story[]
}

export function TrendingTicker({ stories }: TrendingTickerProps) {
  if (!stories.length) return null

  return (
    <div className="bg-gradient-to-r from-red-500 via-orange-500 to-red-600 text-white py-3 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
      <div className="flex items-center relative">
        <motion.div 
          className="flex-shrink-0 px-4 font-bold text-sm flex items-center"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="mr-2"
          >
            🔥
          </motion.span>
          TRENDING NOW
          <motion.div
            className="w-2 h-2 bg-green-400 rounded-full ml-2"
            animate={{ 
              scale: [1, 1.3, 1], 
              opacity: [1, 0.7, 1] 
            }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </motion.div>
        <div className="flex-1 overflow-hidden">
          <motion.div 
            className="ticker-content flex items-center space-x-12 whitespace-nowrap"
            animate={{ x: [0, -2000] }}
            transition={{ 
              repeat: Infinity, 
              duration: 40, 
              ease: "linear" 
            }}
          >
            {[...stories, ...stories].map((story, index) => (
              <motion.div 
                key={`${story.clusterId}-${index}`} 
                className="flex items-center space-x-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                <motion.div
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{ 
                    scale: [1, 1.2, 1], 
                    opacity: [1, 0.8, 1] 
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2,
                    delay: index * 0.3 
                  }}
                />
                <span className="font-medium">{story.name}</span>
                <span className="text-white/80 text-sm">
                  ({story.articleCount} articles)
                </span>
                <span className="text-white/60 text-xs">
                  {formatTimeAgo(story.updatedAt)}
                </span>
                <motion.div
                  className="w-8 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"
                  animate={{ scaleX: [0.5, 1, 0.5] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 3,
                    delay: index * 0.5 
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
