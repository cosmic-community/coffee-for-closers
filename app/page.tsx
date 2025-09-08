import { getTopics, getCoffeeChats } from '@/lib/cosmic'
import Hero from '@/components/Hero'
import TopicCategories from '@/components/TopicCategories'
import UpcomingChats from '@/components/UpcomingChats'
import FeaturedProfiles from '@/components/FeaturedProfiles'

export default async function HomePage() {
  // Fetch data server-side
  const [topics, chats] = await Promise.all([
    getTopics(),
    getCoffeeChats()
  ])

  return (
    <div className="min-h-screen">
      <Hero />
      <TopicCategories topics={topics} />
      <UpcomingChats chats={chats} />
      <FeaturedProfiles />
    </div>
  )
}