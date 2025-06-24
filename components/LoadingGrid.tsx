'use client'

import React from 'react'

export function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 animate-pulse"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full w-20 animate-pulse"></div>
            <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-16 animate-pulse"></div>
          </div>
          
          <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-3/4 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-full mb-1 animate-pulse"></div>
          <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-2/3 mb-4 animate-pulse"></div>
          
          <div className="flex gap-2 mb-4">
            <div className="h-5 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-16 animate-pulse"></div>
            <div className="h-5 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-20 animate-pulse"></div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-24 animate-pulse"></div>
            <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-20 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  )
}
