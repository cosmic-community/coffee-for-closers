import Link from 'next/link'
import type { UserProfile } from '@/types'

interface ProfileCardProps {
  profile: UserProfile
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const getBadgeClass = (category: string) => {
    switch (category) {
      case 'Sales Methodology':
        return 'badge-methodology'
      case 'Industry Focus':
        return 'badge-industry'
      case 'Tools & Technology':
        return 'badge-tools'
      case 'Career Development':
        return 'badge-career'
      default:
        return 'badge-methodology'
    }
  }

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        {profile.metadata.profile_image && (
          <img
            src={`${profile.metadata.profile_image.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
            alt={profile.metadata.display_name}
            width="60"
            height="60"
            className="w-15 h-15 rounded-full object-cover"
          />
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {profile.metadata.display_name}
              </h3>
              <p className="text-sm text-gray-600">
                {profile.metadata.job_title} at {profile.metadata.company}
              </p>
            </div>
            
            <span className="badge bg-gray-100 text-gray-800 ml-2 flex-shrink-0">
              {profile.metadata.experience_level.value}
            </span>
          </div>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {profile.metadata.bio}
          </p>

          <div className="flex flex-wrap gap-1 mb-4">
            {profile.metadata.topics_of_interest && 
             Array.isArray(profile.metadata.topics_of_interest) &&
             profile.metadata.topics_of_interest.slice(0, 2).map((topic: any, index: number) => (
              <span 
                key={index}
                className={`badge ${getBadgeClass(topic.metadata?.category?.value || '')}`}
              >
                {topic.metadata?.topic_name || topic.title}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              📍 {profile.metadata.location}
            </span>
            
            <Link 
              href={`/profiles/${profile.slug}`}
              className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
            >
              View Profile →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}