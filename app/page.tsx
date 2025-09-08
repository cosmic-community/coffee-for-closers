import Hero from '@/components/Hero'
import TopicCategories from '@/components/TopicCategories'
import FeaturedProfiles from '@/components/FeaturedProfiles'
import UpcomingChats from '@/components/UpcomingChats'
import { getTopics, getUserProfiles, getCoffeeChats } from '@/lib/cosmic'

export default async function HomePage() {
  try {
    // Fetch data for all components
    const [topics, profiles, chats] = await Promise.all([
      getTopics(),
      getUserProfiles(),
      getCoffeeChats()
    ])

    return (
      <div className="min-h-screen">
        <Hero />
        <div className="relative z-10 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <TopicCategories topics={topics} />
            <FeaturedProfiles profiles={profiles} />
            <UpcomingChats chats={chats} />
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error loading homepage data:', error)
    
    // Return page with empty arrays as fallback
    return (
      <div className="min-h-screen">
        <Hero />
        <div className="relative z-10 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <TopicCategories topics={[]} />
            <FeaturedProfiles profiles={[]} />
            <UpcomingChats chats={[]} />
          </div>
        </div>
      </div>
    )
  }
}