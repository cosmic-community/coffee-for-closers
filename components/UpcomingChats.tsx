import Link from 'next/link'
import type { CoffeeChat } from '@/types'

interface UpcomingChatsProps {
  chats: CoffeeChat[]
}

export default function UpcomingChats({ chats }: UpcomingChatsProps) {
  if (!chats || chats.length === 0) {
    return null
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Upcoming Coffee Chats
          </h2>
          <p className="text-gray-600">
            Connect with sales professionals and expand your network
          </p>
        </div>
        
        <Link 
          href="/chats"
          className="text-primary hover:text-primary/80 font-medium transition-colors"
        >
          View all chats →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chats.map((chat) => (
          <div key={chat.id} className="card">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex -space-x-2">
                {chat.metadata.participant_1?.metadata?.profile_image && (
                  <img
                    src={`${chat.metadata.participant_1.metadata.profile_image.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                    alt={chat.metadata.participant_1.metadata.display_name}
                    width="48"
                    height="48"
                    className="w-12 h-12 rounded-full border-2 border-white object-cover"
                  />
                )}
                {chat.metadata.participant_2?.metadata?.profile_image && (
                  <img
                    src={`${chat.metadata.participant_2.metadata.profile_image.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                    alt={chat.metadata.participant_2.metadata.display_name}
                    width="48"
                    height="48"
                    className="w-12 h-12 rounded-full border-2 border-white object-cover"
                  />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm truncate">
                  {chat.metadata.participant_1?.metadata?.display_name} & {chat.metadata.participant_2?.metadata?.display_name}
                </h3>
                <p className="text-xs text-gray-600">
                  Coffee Chat Session
                </p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>📅</span>
                <span>{new Date(chat.metadata.scheduled_date).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>🕐</span>
                <span>{chat.metadata.scheduled_time}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="badge bg-blue-100 text-blue-800">
                {chat.metadata.status?.value || 'Scheduled'}
              </span>
              
              {chat.metadata.meeting_link && (
                <a
                  href={chat.metadata.meeting_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                >
                  Join →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}