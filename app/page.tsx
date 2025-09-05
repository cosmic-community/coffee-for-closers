import Hero from '@/components/Hero'
import FeaturedProfiles from '@/components/FeaturedProfiles'
import TopicCategories from '@/components/TopicCategories'
import UpcomingChats from '@/components/UpcomingChats'
import { getUserProfiles, getTopics, getUpcomingChats } from '@/lib/cosmic'

export default async function HomePage() {
  const [profiles, topics, upcomingChats] = await Promise.all([
    getUserProfiles(),
    getTopics(),
    getUpcomingChats()
  ])

  return (
    <div className="space-y-16">
      <Hero />
      
      <section className="container mx-auto px-4">
        <FeaturedProfiles profiles={profiles.slice(0, 3)} />
      </section>
      
      <section className="container mx-auto px-4">
        <TopicCategories topics={topics} />
      </section>
      
      {upcomingChats.length > 0 && (
        <section className="container mx-auto px-4">
          <UpcomingChats chats={upcomingChats.slice(0, 3)} />
        </section>
      )}
    </div>
  )
}