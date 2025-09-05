'use client'

import { useState, useEffect } from 'react'
import ProfileGrid from '@/components/ProfileGrid'
import ExperienceFilter from '@/components/ExperienceFilter'
import type { UserProfile } from '@/types'

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState<UserProfile[]>([])
  const [filteredProfiles, setFilteredProfiles] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProfiles() {
      try {
        const response = await fetch('/api/profiles')
        const data = await response.json()
        setProfiles(data)
        setFilteredProfiles(data)
      } catch (error) {
        console.error('Failed to fetch profiles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfiles()
  }, [])

  const handleFilterChange = (level: string) => {
    if (level === 'all') {
      setFilteredProfiles(profiles)
    } else {
      const filtered = profiles.filter(profile => 
        profile.metadata.experience_level.key === level
      )
      setFilteredProfiles(filtered)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4 w-64"></div>
          <div className="h-4 bg-gray-200 rounded mb-8 w-96"></div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-48 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Sales Professionals
        </h1>
        <p className="text-gray-600 text-lg">
          Connect with sales professionals and expand your network
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <ExperienceFilter onFilterChange={handleFilterChange} />
        </div>
        
        <div className="lg:col-span-3">
          <ProfileGrid profiles={filteredProfiles} />
        </div>
      </div>
    </div>
  )
}