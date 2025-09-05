'use client'

import { useState } from 'react'

interface ExperienceFilterProps {
  onFilterChange: (level: string) => void
}

export default function ExperienceFilter({ onFilterChange }: ExperienceFilterProps) {
  const [selectedLevel, setSelectedLevel] = useState<string>('all')

  const experienceLevels = [
    { key: 'all', label: 'All Levels' },
    { key: 'junior', label: 'Junior (0-2 years)' },
    { key: 'mid', label: 'Mid-level (3-5 years)' },
    { key: 'senior', label: 'Senior (6-10 years)' },
    { key: 'executive', label: 'Executive (10+ years)' }
  ]

  const handleFilterChange = (level: string) => {
    setSelectedLevel(level)
    onFilterChange(level)
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Experience Level
      </h3>
      
      <div className="space-y-2">
        {experienceLevels.map((level) => (
          <button
            key={level.key}
            onClick={() => handleFilterChange(level.key)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              selectedLevel === level.key
                ? 'bg-primary/10 text-primary font-medium'
                : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            {level.label}
          </button>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="text-xs text-gray-500 space-y-1">
          <div className="flex items-center justify-between">
            <span>Junior</span>
            <span>🌱</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Mid-level</span>
            <span>🌿</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Senior</span>
            <span>🌳</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Executive</span>
            <span>🏆</span>
          </div>
        </div>
      </div>
    </div>
  )
}