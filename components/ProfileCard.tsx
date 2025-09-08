'use client'

import Link from 'next/link'
import type { UserProfile } from '@/types'

interface ProfileCardProps {
  profile: UserProfile
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const getBadgeGradient = (category: string) => {
    switch (category) {
      case 'Sales Methodology':
        return 'from-blue-400 to-blue-600'
      case 'Industry Focus':
        return 'from-green-400 to-green-600'
      case 'Tools & Technology':
        return 'from-purple-400 to-purple-600'
      case 'Career Development':
        return 'from-orange-400 to-orange-600'
      default:
        return 'from-gray-400 to-gray-600'
    }
  }

  return (
    <div className="card group cursor-pointer">
      <div className="flex items-start gap-4 mb-6">
        {profile.metadata.profile_image ? (
          <img
            src={`${profile.metadata.profile_image.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
            alt={profile.metadata.display_name}
            width="80"
            height="80"
            className="w-20 h-20 rounded-2xl object-cover shadow-lg border-4 border-white"
          />
        ) : (
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
            {profile.metadata.display_name.charAt(0).toUpperCase()}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-xl text-gray-900 mb-1 truncate group-hover:text-blue-600 transition-colors duration-200">
            {profile.metadata.display_name}
          </h3>
          
          <div className="flex items-center gap-1 mb-2">
            <span className="text-sm text-gray-600">
              {profile.metadata.job_title}
            </span>
          </div>

          <div className="flex items-center gap-1 mb-3">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 4h1m4 0h1M9 16h1m4 0h1" />
            </svg>
            <span className="text-sm text-gray-500 truncate">
              {profile.metadata.company}
            </span>
          </div>

          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getBadgeGradient('default')} text-white`}>
            {profile.metadata.experience_level.value}
          </div>
        </div>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
        {profile.metadata.bio}
      </p>

      {profile.metadata.topics_of_interest && 
       Array.isArray(profile.metadata.topics_of_interest) &&
       profile.metadata.topics_of_interest.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {profile.metadata.topics_of_interest.slice(0, 2).map((topic: any, index: number) => (
            <span
              key={index}
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getBadgeGradient(topic.metadata?.category?.value || '')} text-white`}
            >
              {topic.metadata?.topic_name || topic.title}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="truncate">{profile.metadata.location}</span>
        </div>
        
        {profile.metadata.available_for_matching && (
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-600 font-medium">Available</span>
          </div>
        )}
      </div>

      <Link
        href={`/profiles/${profile.slug}`}
        className="absolute inset-0 z-10"
      >
        <span className="sr-only">View {profile.metadata.display_name}'s profile</span>
      </Link>
    </div>
  )
}