'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface CategoryFiltersProps {
  categories: string[]
  selected: string
  onSelect: (category: string) => void
}

export function CategoryFilters({ categories, selected, onSelect }: CategoryFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform-gpu",
            "hover:scale-105 hover:shadow-md",
            selected === category
              ? "bg-blue-500 text-white shadow-lg scale-105"
              : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
