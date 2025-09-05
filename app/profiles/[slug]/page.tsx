// app/profiles/[slug]/page.tsx
import { notFound } from 'next/navigation'
import ProfileDetails from '@/components/ProfileDetails'
import { getUserProfile } from '@/lib/cosmic'

interface ProfilePageProps {
  params: Promise<{ slug: string }>
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  // IMPORTANT: In Next.js 15+, params are now Promises and MUST be awaited
  const { slug } = await params
  
  const profile = await getUserProfile(slug)
  
  if (!profile) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProfileDetails profile={profile} />
    </div>
  )
}

export async function generateMetadata({ params }: ProfilePageProps) {
  const { slug } = await params
  const profile = await getUserProfile(slug)
  
  if (!profile) {
    return {
      title: 'Profile Not Found',
    }
  }

  return {
    title: `${profile.metadata.display_name} - Coffee for Closers`,
    description: profile.metadata.bio,
  }
}