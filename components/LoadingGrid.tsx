'use client'

import React from 'react'
import { motion } from 'framer-motion'

export function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer"></div>
          
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
        </motion.div>
      ))}
    </div>
  )
}
