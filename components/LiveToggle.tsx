'use client'

import { cn } from '@/lib/utils'
import { Radio } from 'lucide-react'

interface LiveToggleProps {
  isLive: boolean
  onToggle: (isLive: boolean) => void
}

export function LiveToggle({ isLive, onToggle }: LiveToggleProps) {
  return (
    <button
      onClick={() => onToggle(!isLive)}
      className={cn(
        "inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
        "border-2",
        isLive
          ? "bg-green-500 text-white border-green-500 shadow-lg"
          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
      )}
    >
      <Radio 
        className={cn(
          "w-3 h-3 mr-2",
          isLive && "animate-pulse"
        )} 
      />
      {isLive ? 'LIVE' : 'Live Mode'}
    </button>
  )
}
