'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Topic } from '@/types'

interface SignupFormProps {
  topics: Topic[]
}

interface FormData {
  display_name: string
  job_title: string
  company: string
  experience_level: string
  location: string
  bio: string
  linkedin_url: string
  topics_of_interest: string[]
  available_for_matching: boolean
}

const experienceLevels = [
  { key: 'junior', value: 'Junior (0-2 years)' },
  { key: 'mid', value: 'Mid-level (3-5 years)' },
  { key: 'senior', value: 'Senior (6-10 years)' },
  { key: 'executive', value: 'Executive (10+ years)' }
]

export default function SignupForm({ topics }: SignupFormProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    display_name: '',
    job_title: '',
    company: '',
    experience_level: '',
    location: '',
    bio: '',
    linkedin_url: '',
    topics_of_interest: [],
    available_for_matching: true
  })

  const updateFormData = (field: keyof FormData, value: string | string[] | boolean) => {
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

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const result = await response.json()
        router.push(`/profiles/${result.profile.slug}?welcome=true`)
      } else {
        const error = await response.json()
        alert(`Error: ${error.message}`)
      }
    } catch (error) {
      alert('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isStep1Valid = () => {
    return formData.display_name && formData.job_title && formData.company && 
           formData.experience_level && formData.location
  }

  const isStep2Valid = () => {
    return formData.bio.length >= 50
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-500">Step {currentStep} of 3</span>
          <span className="text-sm text-gray-500">{Math.round((currentStep / 3) * 100)}% complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Basic Information */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Basic Information
            </h2>
            <p className="text-gray-600 mb-6">
              Tell us about yourself and your current role
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="display_name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="display_name"
                required
                value={formData.display_name}
                onChange={(e) => updateFormData('display_name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="e.g. John Smith"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select experience level</option>
                {experienceLevels.map((level) => (
                  <option key={level.key} value={level.key}>
                    {level.value}
                  </option>
                ))}
              </select>
            </div>
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="e.g. San Francisco, CA (PST)"
            />
          </div>

          <div>
            <label htmlFor="linkedin_url" className="block text-sm font-medium text-gray-700 mb-1">
              LinkedIn Profile (Optional)
            </label>
            <input
              type="url"
              id="linkedin_url"
              value={formData.linkedin_url}
              onChange={(e) => updateFormData('linkedin_url', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>
        </div>
      )}

      {/* Step 2: Bio */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              About You
            </h2>
            <p className="text-gray-600 mb-6">
              Share your background and what you're passionate about in sales
            </p>
          </div>

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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              placeholder="Tell us about your sales experience, expertise areas, and what you enjoy about sales. What would you like to share or learn from others? (Minimum 50 characters)"
            />
            <p className="text-sm text-gray-500 mt-1">
              {formData.bio.length}/50 characters minimum
            </p>
          </div>
        </div>
      )}

      {/* Step 3: Topics & Preferences */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Topics of Interest
            </h2>
            <p className="text-gray-600 mb-6">
              Select topics you're interested in discussing during coffee chats
            </p>
          </div>

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

          <div className="border-t border-gray-200 pt-6">
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
              You can change this preference anytime in your profile settings
            </p>
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            currentStep === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:text-gray-900'
          }`}
        >
          Previous
        </button>

        <div className="flex gap-3">
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={
                (currentStep === 1 && !isStep1Valid()) ||
                (currentStep === 2 && !isStep2Valid())
              }
              className="btn-primary px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting || formData.topics_of_interest.length === 0}
              className="btn-primary px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating Profile...' : 'Create Profile'}
            </button>
          )}
        </div>
      </div>
    </form>
  )
}