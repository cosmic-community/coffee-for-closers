'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { getTopics } from '@/lib/cosmic'
import type { Topic } from '@/types'

export default function EditProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [topics, setTopics] = useState<Topic[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [formData, setFormData] = useState({
    display_name: '',
    job_title: '',
    company: '',
    experience_level: '',
    location: '',
    bio: '',
    linkedin_url: '',
    topics_of_interest: [] as string[],
    available_for_matching: true
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
      return
    }

    // Populate form with current user data
    if (user) {
      setFormData({
        display_name: user.metadata.display_name || '',
        job_title: user.metadata.job_title || '',
        company: user.metadata.company || '',
        experience_level: user.metadata.experience_level?.key || '',
        location: user.metadata.location || '',
        bio: user.metadata.bio || '',
        linkedin_url: user.metadata.linkedin_url || '',
        topics_of_interest: Array.isArray(user.metadata.topics_of_interest) 
          ? user.metadata.topics_of_interest.map((topic: any) => typeof topic === 'string' ? topic : topic.id)
          : [],
        available_for_matching: user.metadata.available_for_matching !== false
      })
    }

    // Fetch topics
    const fetchTopics = async () => {
      try {
        const topicsData = await getTopics()
        setTopics(topicsData)
      } catch (error) {
        console.error('Error fetching topics:', error)
      }
    }

    fetchTopics()
  }, [user, loading, router])

  const updateFormData = (field: keyof typeof formData, value: string | string[] | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const toggleTopic = (topicId: string) => {
    setFormData(prev => ({
      ...prev,
      topics_of_interest: prev.topics_of_interest.includes(topicId)
        ? prev.topics_of_interest.filter(id => id !== topicId)
        : [...prev.topics_of_interest, topicId]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      const response = await fetch('/api/user/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        setMessage({ type: 'success', text: 'Profile updated successfully!' })
        // Refresh the auth context to get updated user data
        window.location.reload()
      } else {
        const error = await response.json()
        setMessage({ type: 'error', text: error.error || 'Failed to update profile' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Group topics by category
  const topicsByCategory = topics.reduce((acc, topic) => {
    const category = topic.metadata.category.value || 'Other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(topic)
    return acc
  }, {} as Record<string, Topic[]>)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Sales Methodology': return '📋'
      case 'Industry Focus': return '🏢'
      case 'Tools & Technology': return '⚙️'
      case 'Career Development': return '📈'
      default: return '🏷️'
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="card">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Edit Your Profile
              </h1>
              <p className="text-gray-600">
                Update your professional information and preferences
              </p>
            </div>
            <button
              type="button"
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              ← Back
            </button>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-md ${
              message.type === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Personal Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="display_name" className="block text-sm font-medium text-gray-700 mb-1">
                    Display Name *
                  </label>
                  <input
                    type="text"
                    id="display_name"
                    required
                    value={formData.display_name}
                    onChange={(e) => updateFormData('display_name', e.target.value)}
                    className="input w-full"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="job_title" className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    id="job_title"
                    required
                    value={formData.job_title}
                    onChange={(e) => updateFormData('job_title', e.target.value)}
                    className="input w-full"
                    placeholder="e.g. Account Executive"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company *
                  </label>
                  <input
                    type="text"
                    id="company"
                    required
                    value={formData.company}
                    onChange={(e) => updateFormData('company', e.target.value)}
                    className="input w-full"
                    placeholder="e.g. Salesforce"
                  />
                </div>

                <div>
                  <label htmlFor="experience_level" className="block text-sm font-medium text-gray-700 mb-1">
                    Experience Level *
                  </label>
                  <select
                    id="experience_level"
                    required
                    value={formData.experience_level}
                    onChange={(e) => updateFormData('experience_level', e.target.value)}
                    className="input w-full"
                  >
                    <option value="">Select experience level</option>
                    <option value="junior">Junior (0-2 years)</option>
                    <option value="mid">Mid-level (3-5 years)</option>
                    <option value="senior">Senior (6-10 years)</option>
                    <option value="executive">Executive (10+ years)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    id="location"
                    required
                    value={formData.location}
                    onChange={(e) => updateFormData('location', e.target.value)}
                    className="input w-full"
                    placeholder="e.g. San Francisco, CA"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="linkedin_url" className="block text-sm font-medium text-gray-700 mb-1">
                    LinkedIn Profile (Optional)
                  </label>
                  <input
                    type="url"
                    id="linkedin_url"
                    value={formData.linkedin_url}
                    onChange={(e) => updateFormData('linkedin_url', e.target.value)}
                    className="input w-full"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                About You
              </h2>
              
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                  Professional Bio *
                </label>
                <textarea
                  id="bio"
                  required
                  rows={6}
                  value={formData.bio}
                  onChange={(e) => updateFormData('bio', e.target.value)}
                  className="input w-full resize-none"
                  placeholder="Tell us about your sales experience, expertise areas, and what you enjoy about sales. What would you like to share or learn from others?"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.bio.length} characters
                </p>
              </div>
            </div>

            {/* Topics of Interest */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Topics of Interest
              </h2>
              <p className="text-gray-600 mb-6">
                Select topics you're interested in discussing during coffee chats
              </p>

              <div className="space-y-6">
                {Object.entries(topicsByCategory).map(([category, categoryTopics]) => (
                  <div key={category} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg">{getCategoryIcon(category)}</span>
                      <h3 className="font-medium text-gray-900">{category}</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2">
                      {categoryTopics.map((topic) => (
                        <label key={topic.id} className="flex items-start gap-3 cursor-pointer p-2 rounded hover:bg-gray-50">
                          <input
                            type="checkbox"
                            checked={formData.topics_of_interest.includes(topic.id)}
                            onChange={() => toggleTopic(topic.id)}
                            className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          />
                          <div>
                            <div className="font-medium text-sm text-gray-900">
                              {topic.metadata.topic_name}
                            </div>
                            {topic.metadata.description && (
                              <div className="text-xs text-gray-600 mt-1">
                                {topic.metadata.description}
                              </div>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Matching Preferences */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Matching Preferences
              </h2>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="available_for_matching"
                    checked={formData.available_for_matching}
                    onChange={(e) => updateFormData('available_for_matching', e.target.checked)}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="available_for_matching" className="text-sm text-gray-700">
                    I'm available for weekly coffee chat matching
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-1 ml-7">
                  When unchecked, you won't be included in automatic matching but can still participate in scheduled chats
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Updating Profile...' : 'Update Profile'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}