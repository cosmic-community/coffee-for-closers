import type { CoffeeChat } from '@/types'

interface ChatListProps {
  chats: CoffeeChat[]
}

export default function ChatList({ chats }: ChatListProps) {
  if (!chats || chats.length === 0) {
    return (
      <div className="card text-center py-12">
        <div className="text-6xl mb-4">☕</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No coffee chats yet
        </h3>
        <p className="text-gray-600">
          Your upcoming and completed coffee chats will appear here.
        </p>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Your Coffee Chats
      </h2>
      
      {chats.map((chat) => (
        <div key={chat.id} className="card">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {chat.metadata.participant_1?.metadata?.profile_image && (
                  <img
                    src={`${chat.metadata.participant_1.metadata.profile_image.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                    alt={chat.metadata.participant_1.metadata.display_name}
                    width="32"
                    height="32"
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  />
                )}
                {chat.metadata.participant_2?.metadata?.profile_image && (
                  <img
                    src={`${chat.metadata.participant_2.metadata.profile_image.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                    alt={chat.metadata.participant_2.metadata.display_name}
                    width="32"
                    height="32"
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  />
                )}
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900">
                  {chat.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {chat.metadata.participant_1?.metadata?.display_name} & {chat.metadata.participant_2?.metadata?.display_name}
                </p>
              </div>
            </div>
            
            <span className={`badge ${getStatusColor(chat.metadata.status?.value || 'scheduled')}`}>
              {chat.metadata.status?.value || 'Scheduled'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <span>📅</span>
              <span>{chat.metadata.scheduled_date}</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <span>🕐</span>
              <span>{chat.metadata.scheduled_time}</span>
            </div>
            
            {chat.metadata.feedback_rating && (
              <div className="flex items-center gap-2 text-gray-600">
                <span>⭐</span>
                <span>{chat.metadata.feedback_rating}/5</span>
              </div>
            )}
          </div>

          {chat.metadata.meeting_link && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <a
                href={chat.metadata.meeting_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
              >
                Join Meeting →
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}