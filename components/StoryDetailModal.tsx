'use client'

import { useState, useEffect } from 'react'
import { Story } from '@/types/perigon'
import { formatTimeAgo, getHotBadgeIntensity, cn } from '@/lib/utils'
import { TrendingUp, Clock, Globe, X, ExternalLink, Share2, Bookmark } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface StoryDetailModalProps {
  story: Story | null
  isOpen: boolean
  onClose: () => void
  cardRect?: DOMRect
}

export function StoryDetailModal({ story, isOpen, onClose, cardRect }: StoryDetailModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!mounted || !story) return null

  const hotIntensity = getHotBadgeIntensity(story.articleCount)
  const hotBadgeColors = {
    low: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    medium: 'bg-orange-100 text-orange-800 border-orange-200',
    high: 'bg-red-100 text-red-800 border-red-200'
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      x: cardRect ? cardRect.left + cardRect.width / 2 - window.innerWidth / 2 : 0,
      y: cardRect ? cardRect.top + cardRect.height / 2 - window.innerHeight / 2 : 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.5
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      x: cardRect ? cardRect.left + cardRect.width / 2 - window.innerWidth / 2 : 0,
      y: cardRect ? cardRect.top + cardRect.height / 2 - window.innerHeight / 2 : 0,
      transition: {
        duration: 0.3
      }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          <motion.div
            className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-slate-200">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border",
                    hotBadgeColors[hotIntensity]
                  )}>
                    <TrendingUp className="w-4 h-4 mr-2" />
                    {story.articleCount} articles
                  </div>
                  
                  <div className="flex items-center text-slate-500 text-sm">
                    <Clock className="w-4 h-4 mr-2" />
                    {formatTimeAgo(story.updatedAt)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <Share2 className="w-5 h-5 text-slate-600" />
                  </button>
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <Bookmark className="w-5 h-5 text-slate-600" />
                  </button>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <h1 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">
                  {story.name}
                </h1>

                <div className="flex flex-wrap gap-2 mb-6">
                  {story.categories.map((category) => (
                    <span
                      key={category}
                      className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full capitalize"
                    >
                      {category}
                    </span>
                  ))}
                </div>

                <div className="prose prose-slate max-w-none mb-8">
                  <p className="text-lg text-slate-700 leading-relaxed">
                    {story.summary}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h3 className="font-semibold text-slate-900 mb-2 flex items-center">
                      <Globe className="w-4 h-4 mr-2" />
                      Geographic Coverage
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {story.countries.map((country) => (
                        <span
                          key={country}
                          className="px-2 py-1 bg-white text-slate-600 text-xs rounded border"
                        >
                          {country}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4">
                    <h3 className="font-semibold text-slate-900 mb-2">
                      Key Topics
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {story.topics.slice(0, 6).map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-1 bg-white text-slate-600 text-xs rounded border"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-6">
                  <h3 className="font-semibold text-slate-900 mb-4">
                    Related Articles ({story.articles.length})
                  </h3>
                  <div className="space-y-4">
                    {story.articles.slice(0, 5).map((article) => (
                      <div
                        key={article.id}
                        className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                      >
                        {article.imageUrl && (
                          <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-slate-900 mb-1 line-clamp-2">
                            {article.title}
                          </h4>
                          <p className="text-sm text-slate-600 mb-2 line-clamp-2">
                            {article.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-500">
                              {article.source.name}
                            </span>
                            <a
                              href={article.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-blue-600 hover:text-blue-700 text-xs font-medium"
                            >
                              Read article <ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
