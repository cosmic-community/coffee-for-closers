'use client'

import { useState } from 'react'

export default function WelcomeBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-green-50 border-b border-green-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">🎉</span>
            </div>
            <div>
              <h3 className="font-semibold text-green-900">
                Welcome to Coffee for Closers!
              </h3>
              <p className="text-sm text-green-700">
                Your profile has been created successfully. You'll be matched with other sales professionals for weekly coffee chats.
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setIsVisible(false)}
            className="text-green-600 hover:text-green-800 p-1"
            aria-label="Dismiss welcome message"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}