import ProfileGrid from '@/components/ProfileGrid'
import ExperienceFilter from '@/components/ExperienceFilter'
import { getUserProfiles } from '@/lib/cosmic'

export default async function ProfilesPage() {
  const profiles = await getUserProfiles()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Sales Professionals
        </h1>
        <p className="text-gray-600 text-lg">
          Connect with {profiles.length} sales professionals ready for coffee chats
        </p>
      </div>

      <div className="mb-8">
        <ExperienceFilter />
      </div>

      <ProfileGrid profiles={profiles} />
    </div>
  )
}