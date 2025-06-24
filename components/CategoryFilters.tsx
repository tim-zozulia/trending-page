'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CategoryFiltersProps {
  categories: string[]
  selected: string
  onSelect: (category: string) => void
}

export function CategoryFilters({ categories, selected, onSelect }: CategoryFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3 mt-4">
      {categories.map((category, index) => (
        <motion.button
          key={category}
          onClick={() => onSelect(category)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform-gpu relative overflow-hidden",
            selected === category
              ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
              : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300"
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          whileHover={{ 
            scale: 1.05, 
            y: -2,
            transition: { duration: 0.2 }
          }}
          whileTap={{ 
            scale: 0.95,
            transition: { duration: 0.1 }
          }}
        >
          {selected === category && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
              layoutId="activeCategory"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{category}</span>
          {selected === category && (
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  )
}
