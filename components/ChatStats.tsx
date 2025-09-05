import type { CoffeeChat } from '@/types'

interface ChatStatsProps {
  chats: CoffeeChat[]
}

export default function ChatStats({ chats }: ChatStatsProps) {
  const completedChats = chats.filter(chat => 
    chat.metadata.status?.key === 'completed' || 
    chat.metadata.status?.value === 'Completed'
  )
  
  const scheduledChats = chats.filter(chat => 
    chat.metadata.status?.key === 'scheduled' || 
    chat.metadata.status?.value === 'Scheduled'
  )

  const averageRating = completedChats.length > 0 
    ? completedChats
        .filter(chat => chat.metadata.feedback_rating)
        .reduce((sum, chat) => sum + (chat.metadata.feedback_rating || 0), 0) / 
      completedChats.filter(chat => chat.metadata.feedback_rating).length
    : 0

  const stats = [
    {
      label: 'Total Chats',
      value: chats.length,
      icon: '☕',
      color: 'text-blue-600'
    },
    {
      label: 'Completed',
      value: completedChats.length,
      icon: '✅',
      color: 'text-green-600'
    },
    {
      label: 'Scheduled',
      value: scheduledChats.length,
      icon: '📅',
      color: 'text-orange-600'
    },
    {
      label: 'Avg Rating',
      value: averageRating > 0 ? averageRating.toFixed(1) : '—',
      icon: '⭐',
      color: 'text-yellow-600'
    }
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Your Stats
      </h2>
      
      {stats.map((stat) => (
        <div key={stat.label} className="card">
          <div className="flex items-center gap-3">
            <div className={`text-2xl ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">
                {stat.label}
              </div>
            </div>
          </div>
        </div>
      ))}

      {chats.length > 0 && (
        <div className="card bg-primary/5 border-primary/20">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🎯</div>
            <div>
              <div className="text-sm font-medium text-gray-900">
                Keep it up!
              </div>
              <div className="text-xs text-gray-600">
                {completedChats.length > 0 
                  ? `You've completed ${completedChats.length} coffee chat${completedChats.length !== 1 ? 's' : ''}`
                  : 'Start networking with your first coffee chat'
                }
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}