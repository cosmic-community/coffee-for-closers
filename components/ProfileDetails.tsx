import type { UserProfile } from '@/types'

interface ProfileDetailsProps {
  profile: UserProfile
}

export default function ProfileDetails({ profile }: ProfileDetailsProps) {
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
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="card">
        <div className="flex items-start gap-6">
          {profile.metadata.profile_image && (
            <img
              src={`${profile.metadata.profile_image.imgix_url}?w=240&h=240&fit=crop&auto=format,compress`}
              alt={profile.metadata.display_name}
              width="120"
              height="120"
              className="w-30 h-30 rounded-xl object-cover"
            />
          )}
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {profile.metadata.display_name}
                </h1>
                <p className="text-lg text-gray-600 mb-1">
                  {profile.metadata.job_title}
                </p>
                <p className="text-md text-gray-500">
                  {profile.metadata.company}
                </p>
              </div>
              
              <span className="badge bg-gray-100 text-gray-800">
                {profile.metadata.experience_level.value}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <span>📍</span>
                <span>{profile.metadata.location}</span>
              </div>
              
              {profile.metadata.available_for_matching && (
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Available for matching</span>
                </div>
              )}
            </div>

            {profile.metadata.linkedin_url && (
              <div>
                <a
                  href={profile.metadata.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  LinkedIn Profile →
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          About
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {profile.metadata.bio}
        </p>
      </div>

      {/* Topics of Interest */}
      {profile.metadata.topics_of_interest && 
       Array.isArray(profile.metadata.topics_of_interest) && 
       profile.metadata.topics_of_interest.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Topics of Interest
          </h2>
          
          <div className="grid gap-4">
            {profile.metadata.topics_of_interest.map((topic: any, index: number) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <span className={`badge ${getBadgeClass(topic.metadata?.category?.value || '')}`}>
                  {topic.metadata?.category?.value || 'General'}
                </span>
                
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">
                    {topic.metadata?.topic_name || topic.title}
                  </h3>
                  {topic.metadata?.description && (
                    <p className="text-sm text-gray-600">
                      {topic.metadata.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Coffee Chat CTA */}
      {profile.metadata.available_for_matching && (
        <div className="card bg-primary/5 border-primary/20">
          <div className="text-center py-6">
            <div className="text-4xl mb-3">☕</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Ready to Connect?
            </h3>
            <p className="text-gray-600 mb-4">
              Start a conversation with {profile.metadata.display_name.split(' ')[0]} over coffee
            </p>
            <button className="btn-primary">
              Schedule Coffee Chat
            </button>
          </div>
        </div>
      )}
    </div>
  )
}