'use client'

import Link from 'next/link'
import type { UserProfile } from '@/types'

interface ProfileDetailsProps {
  profile: UserProfile
}

export default function ProfileDetails({ profile }: ProfileDetailsProps) {
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
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="card mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            {profile.metadata.profile_image ? (
              <img
                src={`${profile.metadata.profile_image.imgix_url}?w=320&h=320&fit=crop&auto=format,compress`}
                alt={profile.metadata.display_name}
                width="160"
                height="160"
                className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover shadow-xl border-4 border-white"
              />
            ) : (
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-600 flex items-center justify-center text-white font-bold text-4xl shadow-xl">
                {profile.metadata.display_name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {profile.metadata.display_name}
            </h1>
            
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
              </svg>
              <span className="text-xl text-gray-700 font-semibold">
                {profile.metadata.job_title}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 4h1m4 0h1M9 16h1m4 0h1" />
              </svg>
              <span className="text-lg text-gray-600">
                {profile.metadata.company}
              </span>
            </div>

            <div className="flex flex-wrap gap-3 mb-4">
              <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${getBadgeGradient('default')} text-white`}>
                {profile.metadata.experience_level.value}
              </div>
              
              {profile.metadata.available_for_matching && (
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-700 font-medium">Available for matching</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-gray-600 mb-6">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{profile.metadata.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* About Section */}
          <div className="card">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">About</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {profile.metadata.bio}
            </p>
          </div>

          {/* Topics of Interest */}
          {profile.metadata.topics_of_interest && 
           Array.isArray(profile.metadata.topics_of_interest) &&
           profile.metadata.topics_of_interest.length > 0 && (
            <div className="card">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Topics of Interest</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.metadata.topics_of_interest.map((topic: any, index: number) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${getBadgeGradient(topic.metadata?.category?.value || '')} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white font-semibold text-lg">
                          {(topic.metadata?.topic_name || topic.title).charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {topic.metadata?.topic_name || topic.title}
                        </h3>
                        {topic.metadata?.description && (
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {topic.metadata.description}
                          </p>
                        )}
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getBadgeGradient(topic.metadata?.category?.value || '')} text-white mt-2`}>
                          {topic.metadata?.category?.value || 'General'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Contact Information */}
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Connect</h3>
            <div className="space-y-3">
              {profile.metadata.linkedin_url && (
                <a
                  href={profile.metadata.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="text-blue-700 font-medium">LinkedIn Profile</span>
                </a>
              )}

              {profile.metadata.zoom_link && (
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.3 15.8L4.5 12l3.8-3.8 1.4 1.4L7.3 12l2.4 2.4L8.3 15.8zM15.7 8.2L19.5 12l-3.8 3.8-1.4-1.4L16.7 12l-2.4-2.4L15.7 8.2zM8 12c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4S8 14.2 8 12z"/>
                    </svg>
                    <span className="text-purple-700 font-medium">Personal Zoom Room</span>
                  </div>
                  <a
                    href={profile.metadata.zoom_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-purple-600 hover:text-purple-800 underline break-all"
                  >
                    {profile.metadata.zoom_link}
                  </a>
                  <p className="text-xs text-purple-600 mt-1">
                    This will be used for coffee chat meetings
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Professional Details */}
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Experience Level:</span>
                <span className="font-medium text-gray-900">
                  {profile.metadata.experience_level.value}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Company:</span>
                <span className="font-medium text-gray-900">
                  {profile.metadata.company}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Location:</span>
                <span className="font-medium text-gray-900">
                  {profile.metadata.location}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Matching Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  profile.metadata.available_for_matching
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {profile.metadata.available_for_matching ? 'Available' : 'Not Available'}
                </span>
              </div>
            </div>
          </div>

          {/* Coffee Chat CTA */}
          <div className="card bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="text-center">
              <div className="text-4xl mb-3">☕</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Interested in connecting?
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Both users need to be available for matching to be paired for a coffee chat.
              </p>
              {profile.metadata.available_for_matching ? (
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 text-green-700 font-medium">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    Available for matching
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 text-sm">
                  This user is not currently available for matching
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}