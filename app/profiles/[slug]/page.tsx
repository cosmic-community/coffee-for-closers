// app/profiles/[slug]/page.tsx
import { notFound } from 'next/navigation'
import ProfileDetails from '@/components/ProfileDetails'
import WelcomeBanner from '@/components/WelcomeBanner'
import { getUserProfile } from '@/lib/cosmic'

interface ProfilePageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ welcome?: string }>
}

export default async function ProfilePage({ params, searchParams }: ProfilePageProps) {
  const { slug } = await params
  const { welcome } = await searchParams
  
  const profile = await getUserProfile(slug)

  if (!profile) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {welcome === 'true' && <WelcomeBanner />}
      
      <div className="container mx-auto px-4 py-8">
        <ProfileDetails profile={profile} />
      </div>
    </div>
  )
}