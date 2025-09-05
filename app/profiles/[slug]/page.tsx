// app/profiles/[slug]/page.tsx
import { getUserProfile } from '@/lib/cosmic'
import ProfileDetails from '@/components/ProfileDetails'
import { notFound } from 'next/navigation'

interface ProfilePageProps {
  params: Promise<{ slug: string }>
}

export default async function ProfilePage({ params }: ProfilePageProps) {
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