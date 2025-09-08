import Hero from '@/components/Hero'
import FeaturedProfiles from '@/components/FeaturedProfiles'
import TopicCategories from '@/components/TopicCategories'
import UpcomingChats from '@/components/UpcomingChats'

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProfiles />
      <TopicCategories />
      <UpcomingChats />
    </>
  )
}