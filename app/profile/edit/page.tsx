'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import type { User, Topic } from '@/types'

export default function EditProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [topics, setTopics] = useState<Topic[]>([])
  const [formData, setFormData] = useState({
    display_name: '',
    job_title: '',
    company: '',
    experience_level: '',
    location: '',
    bio: '',
    linkedin_url: '',
    zoom_link: '',
    topics_of_interest: [] as string[],
    available_for_matching: true
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      setFormData({
        display_name: user.metadata.display_name || '',
        job_title: user.metadata.job_title || '',
        company: user.metadata.company || '',
        experience_level: user.metadata.experience_level?.key || '',
        location: user.metadata.location || '',
        bio: user.metadata.bio || '',
        linkedin_url: user.metadata.linkedin_url || '',
        zoom_link: user.metadata.zoom_link || '',
        topics_of_interest: Array.isArray(user.metadata.topics_of_interest) 
          ? user.metadata.topics_of_interest.map((topic: any) => topic.id || topic)
          : [],
        available_for_matching: user.metadata.available_for_matching !== false
      })
    }
  }, [user])

  useEffect(() => {
    fetchTopics()
  }, [])

  const fetchTopics = async () => {
    try {
      const response = await fetch('/api/topics')
      const data = await response.json()
      setTopics(data)
    } catch (error) {
      console.error('Error fetching topics:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch('/api/user/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        router.push('/dashboard')
      } else {
        const error = await response.json()
        console.error('Error updating profile:', error)
      }
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleTopicToggle = (topicId: string) => {
    setFormData(prev => ({
      ...prev,
      topics_of_interest: prev.topics_of_interest.includes(topicId)
        ? prev.topics_of_interest.filter(id => id !== topicId)
        : [...prev.topics_of_interest, topicId]
    }))
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Edit Your Profile
          </h1>
          <p className="text-gray-600">
            Update your professional information and interests
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Display Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.display_name}
                  onChange={(e) => setFormData(prev => ({...prev, display_name: e.target.value}))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.job_title}
                  onChange={(e) => setFormData(prev => ({...prev, job_title: e.target.value}))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company *
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({...prev, company: e.target.value}))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience Level *
                </label>
                <select
                  required
                  value={formData.experience_level}
                  onChange={(e) => setFormData(prev => ({...prev, experience_level: e.target.value}))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select experience level</option>
                  <option value="junior">Junior (0-2 years)</option>
                  <option value="mid">Mid-level (3-5 years)</option>
                  <option value="senior">Senior (6-10 years)</option>
                  <option value="executive">Executive (10+ years)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData(prev => ({...prev, location: e.target.value}))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., San Francisco, CA or Remote"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                rows={4}
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({...prev, bio: e.target.value}))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tell others about your experience and what you're passionate about..."
              />
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Contact & Meeting Information
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn URL
              </label>
              <input
                type="url"
                value={formData.linkedin_url}
                onChange={(e) => setFormData(prev => ({...prev, linkedin_url: e.target.value}))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Personal Zoom Room Link
              </label>
              <input
                type="url"
                value={formData.zoom_link}
                onChange={(e) => setFormData(prev => ({...prev, zoom_link: e.target.value}))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://zoom.us/j/your-personal-room-id"
              />
              <p className="text-sm text-gray-600 mt-1">
                Optional: Add your personal Zoom room link to be used for coffee chat meetings. 
                If not provided, meeting organizers will create rooms as needed.
              </p>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Topics of Interest
            </h2>
            <p className="text-gray-600 mb-4">
              Select the topics you're interested in discussing during coffee chats
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {topics.map((topic) => (
                <label
                  key={topic.id}
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors duration-200 ${
                    formData.topics_of_interest.includes(topic.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.topics_of_interest.includes(topic.id)}
                    onChange={() => handleTopicToggle(topic.id)}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900">
                      {topic.metadata.topic_name}
                    </div>
                    {topic.metadata.description && (
                      <div className="text-sm text-gray-600 mt-1">
                        {topic.metadata.description}
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Matching Settings
            </h2>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.available_for_matching}
                onChange={(e) => setFormData(prev => ({...prev, available_for_matching: e.target.checked}))}
                className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <div>
                <div className="font-medium text-gray-900">
                  Available for matching
                </div>
                <div className="text-sm text-gray-600">
                  When enabled, you may be matched with other professionals for coffee chats
                </div>
              </div>
            </label>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}