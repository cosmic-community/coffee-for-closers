'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { CoffeeChat } from '@/types'

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [userChats, setUserChats] = useState<CoffeeChat[]>([])
  const [isLoadingChats, setIsLoadingChats] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      fetchUserChats()
    }
  }, [user])

  const fetchUserChats = async () => {
    try {
      const response = await fetch('/api/user/chats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setUserChats(data.chats)
      }
    } catch (error) {
      console.error('Error fetching user chats:', error)
    } finally {
      setIsLoadingChats(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const upcomingChats = userChats.filter(chat => 
    chat.metadata.status?.key === 'scheduled'
  )
  const completedChats = userChats.filter(chat => 
    chat.metadata.status?.key === 'completed'
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user.metadata.display_name}!
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your networking activity
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary mb-2">
            {userChats.length}
          </div>
          <div className="text-gray-600">Total Chats</div>
        </div>
        
        <div className="card text-center">
          <div className="text-3xl font-bold text-accent mb-2">
            {upcomingChats.length}
          </div>
          <div className="text-gray-600">Upcoming</div>
        </div>
        
        <div className="card text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {completedChats.length}
          </div>
          <div className="text-gray-600">Completed</div>
        </div>
      </div>

      {/* Profile Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Upcoming Chats */}
          <div className="card mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Upcoming Coffee Chats
            </h2>
            
            {isLoadingChats ? (
              <div className="text-center py-8">
                <div className="text-gray-600">Loading your chats...</div>
              </div>
            ) : upcomingChats.length > 0 ? (
              <div className="space-y-4">
                {upcomingChats.slice(0, 3).map((chat) => (
                  <div key={chat.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {chat.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {chat.metadata.scheduled_date} at {chat.metadata.scheduled_time}
                      </p>
                    </div>
                    {chat.metadata.meeting_link && (
                      <a
                        href={chat.metadata.meeting_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-sm"
                      >
                        Join Meeting
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">☕</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No upcoming chats scheduled
                </h3>
                <p className="text-gray-600 mb-4">
                  You'll be matched with other professionals soon!
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          {/* Profile Card */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Your Profile
            </h2>
            
            <div className="text-center mb-4">
              {user.metadata.profile_image ? (
                <img
                  src={`${user.metadata.profile_image.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                  alt={user.metadata.display_name}
                  width="80"
                  height="80"
                  className="w-20 h-20 rounded-full mx-auto object-cover mb-3"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto flex items-center justify-center mb-3">
                  <span className="text-gray-500 text-2xl">
                    {user.metadata.display_name.charAt(0)}
                  </span>
                </div>
              )}
              <h3 className="font-semibold text-gray-900">
                {user.metadata.display_name}
              </h3>
              <p className="text-sm text-gray-600">
                {user.metadata.job_title} at {user.metadata.company}
              </p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Experience:</span>
                <span className="text-gray-900">{user.metadata.experience_level.value}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span className="text-gray-900">{user.metadata.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Matching:</span>
                <span className={`text-sm px-2 py-1 rounded ${
                  user.metadata.available_for_matching 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {user.metadata.available_for_matching ? 'Available' : 'Paused'}
                </span>
              </div>
            </div>

            <button className="w-full mt-4 btn-secondary text-sm">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}