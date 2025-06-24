'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, Calendar, Globe, Settings, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AdvancedFiltersProps {
  isOpen: boolean
  onClose: () => void
  onFiltersChange: (filters: any) => void
}

export function AdvancedFilters({ isOpen, onClose, onFiltersChange }: AdvancedFiltersProps) {
  const [dateRange, setDateRange] = useState('24h')
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [sourceTypes, setSourceTypes] = useState<string[]>(['all'])
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)

  const dateRangeOptions = [
    { value: '1h', label: 'Last Hour' },
    { value: '6h', label: 'Last 6 Hours' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last Week' },
    { value: '30d', label: 'Last Month' }
  ]

  const countries = [
    { code: 'US', name: 'United States' },
    { code: 'UK', name: 'United Kingdom' },
    { code: 'CA', name: 'Canada' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'JP', name: 'Japan' },
    { code: 'CN', name: 'China' },
    { code: 'RU', name: 'Russia' },
    { code: 'EU', name: 'European Union' }
  ]

  const sourceTypeOptions = [
    { value: 'all', label: 'All Sources' },
    { value: 'news', label: 'News Sites' },
    { value: 'blogs', label: 'Blogs' },
    { value: 'aggregators', label: 'Aggregators' },
    { value: 'social', label: 'Social Media' }
  ]

  const handleCountryToggle = (countryCode: string) => {
    const newSelection = selectedCountries.includes(countryCode)
      ? selectedCountries.filter(c => c !== countryCode)
      : [...selectedCountries, countryCode]
    setSelectedCountries(newSelection)
    onFiltersChange({ countries: newSelection, dateRange, sourceTypes })
  }

  const handleSourceTypeChange = (sourceType: string) => {
    const newSelection = sourceType === 'all' 
      ? ['all'] 
      : sourceTypes.includes(sourceType)
        ? sourceTypes.filter(s => s !== sourceType && s !== 'all')
        : [...sourceTypes.filter(s => s !== 'all'), sourceType]
    setSourceTypes(newSelection)
    onFiltersChange({ countries: selectedCountries, dateRange, sourceTypes: newSelection })
  }

  const handleDateRangeChange = (range: string) => {
    setDateRange(range)
    onFiltersChange({ countries: selectedCountries, dateRange: range, sourceTypes })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-y-0 right-0 w-80 bg-white shadow-2xl z-50 border-l border-slate-200"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="p-6 h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <motion.h3 
                  className="text-lg font-semibold flex items-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Filter className="w-5 h-5 mr-2 text-blue-500" />
                  Advanced Filters
                </motion.h3>
                <motion.button 
                  onClick={onClose} 
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
              
              {/* Date Range Picker */}
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm font-medium mb-3 flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-green-500" />
                  Time Range
                </label>
                <div className="space-y-2">
                  {dateRangeOptions.map((option) => (
                    <motion.button
                      key={option.value}
                      onClick={() => handleDateRangeChange(option.value)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg text-sm transition-all",
                        dateRange === option.value
                          ? "bg-blue-100 text-blue-700 border border-blue-200"
                          : "hover:bg-slate-50 border border-transparent"
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
              
              {/* Country Multi-select */}
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-medium mb-3 flex items-center">
                  <Globe className="w-4 h-4 mr-2 text-purple-500" />
                  Countries ({selectedCountries.length} selected)
                </label>
                <motion.button
                  onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  whileHover={{ scale: 1.01 }}
                >
                  <span className="text-sm">
                    {selectedCountries.length === 0 
                      ? 'Select countries...' 
                      : `${selectedCountries.length} countries selected`}
                  </span>
                  <motion.div
                    animate={{ rotate: isCountryDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </motion.button>
                <AnimatePresence>
                  {isCountryDropdownOpen && (
                    <motion.div
                      className="mt-2 border border-slate-200 rounded-lg bg-white shadow-lg max-h-48 overflow-y-auto"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {countries.map((country) => (
                        <motion.button
                          key={country.code}
                          onClick={() => handleCountryToggle(country.code)}
                          className={cn(
                            "w-full text-left px-3 py-2 text-sm hover:bg-slate-50 transition-colors flex items-center",
                            selectedCountries.includes(country.code) && "bg-blue-50 text-blue-700"
                          )}
                          whileHover={{ backgroundColor: '#f8fafc' }}
                        >
                          <div className={cn(
                            "w-4 h-4 rounded border-2 mr-3 flex items-center justify-center",
                            selectedCountries.includes(country.code)
                              ? "bg-blue-500 border-blue-500"
                              : "border-slate-300"
                          )}>
                            {selectedCountries.includes(country.code) && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-2 h-2 bg-white rounded-sm"
                              />
                            )}
                          </div>
                          <span className="font-mono text-xs mr-2">{country.code}</span>
                          {country.name}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              
              {/* Source Type Filter */}
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium mb-3 flex items-center">
                  <Settings className="w-4 h-4 mr-2 text-orange-500" />
                  Source Types
                </label>
                <div className="space-y-2">
                  {sourceTypeOptions.map((option) => (
                    <motion.button
                      key={option.value}
                      onClick={() => handleSourceTypeChange(option.value)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center",
                        sourceTypes.includes(option.value)
                          ? "bg-orange-100 text-orange-700 border border-orange-200"
                          : "hover:bg-slate-50 border border-transparent"
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={cn(
                        "w-3 h-3 rounded-full mr-3",
                        sourceTypes.includes(option.value)
                          ? "bg-orange-500"
                          : "bg-slate-300"
                      )} />
                      {option.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Clear All Button */}
              <motion.button
                onClick={() => {
                  setSelectedCountries([])
                  setSourceTypes(['all'])
                  setDateRange('24h')
                  onFiltersChange({ countries: [], dateRange: '24h', sourceTypes: ['all'] })
                }}
                className="w-full px-4 py-2 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Clear All Filters
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
