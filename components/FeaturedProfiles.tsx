import Link from 'next/link'
import ProfileCard from '@/components/ProfileCard'
import type { UserProfile } from '@/types'

interface FeaturedProfilesProps {
  profiles: UserProfile[]
}

export default function FeaturedProfiles({ profiles }: FeaturedProfilesProps) {
  if (!profiles || profiles.length === 0) {
    return null
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Featured Professionals
          </h2>
          <p className="text-gray-600">
            Connect with experienced sales professionals in our community
          </p>
        </div>
        
        <Link 
          href="/profiles" 
          className="text-primary hover:text-primary/80 font-medium transition-colors"
        >
          View All Profiles →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
    </section>
  )
}