'use client'

import React from 'react'
import { Globe } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GeographicFilterProps {
  countries: string[]
  selected: string
  onSelect: (country: string) => void
}

export function GeographicFilter({ countries, selected, onSelect }: GeographicFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-slate-600" />
      <select
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
        className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="All">All Countries</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  )
}
