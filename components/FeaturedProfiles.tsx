'use client'

import Link from 'next/link'
import ProfileCard from './ProfileCard'
import type { UserProfile } from '@/types'

interface FeaturedProfilesProps {
  profiles: UserProfile[]
}

export default function FeaturedProfiles({ profiles }: FeaturedProfilesProps) {
  // Show first 3 profiles as featured
  const featuredProfiles = profiles.slice(0, 3)

  return (
    <section className="py-20 relative">
      {/* Background Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full opacity-20 floating-element"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full opacity-20 floating-element-delayed"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Featured Professionals
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Connect with experienced sales professionals from top companies
          </p>
          
          {/* Community indicator */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-3 rounded-full border border-blue-100">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-pink-400 to-red-400 rounded-full border-2 border-white"></div>
              <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border-2 border-white"></div>
              <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-400 rounded-full border-2 border-white"></div>
            </div>
            <span className="text-sm font-semibold text-gray-700">Community</span>
          </div>
        </div>

        {featuredProfiles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredProfiles.map((profile, index) => (
                <div 
                  key={profile.id}
                  className={`transform ${index % 2 === 0 ? 'lg:-rotate-1' : 'lg:rotate-1'} hover:rotate-0 transition-transform duration-300`}
                >
                  <ProfileCard profile={profile} />
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/profiles"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <span>View All Profiles</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">👥</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No profiles available
            </h3>
            <p className="text-gray-600">
              Check back soon for amazing sales professionals
            </p>
          </div>
        )}
      </div>
    </section>
  )
}