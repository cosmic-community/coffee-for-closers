import ProfileCard from '@/components/ProfileCard'
import type { UserProfile } from '@/types'

interface ProfileGridProps {
  profiles: UserProfile[]
}

export default function ProfileGrid({ profiles }: ProfileGridProps) {
  if (!profiles || profiles.length === 0) {
    return (
      <div className="card text-center py-12">
        <div className="text-6xl mb-4">👥</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No profiles found
        </h3>
        <p className="text-gray-600">
          Try adjusting your filters or check back later for new members.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          Showing {profiles.length} profile{profiles.length !== 1 ? 's' : ''}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
    </div>
  )
}