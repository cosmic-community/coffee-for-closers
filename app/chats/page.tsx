import ChatList from '@/components/ChatList'
import ChatStats from '@/components/ChatStats'
import { getCoffeeChats } from '@/lib/cosmic'

export default async function ChatsPage() {
  const chats = await getCoffeeChats()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Coffee Chats
        </h1>
        <p className="text-gray-600 text-lg">
          Manage your networking sessions and track your progress
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <ChatStats chats={chats} />
        </div>
        
        <div className="lg:col-span-3">
          <ChatList chats={chats} />
        </div>
      </div>
    </div>
  )
}