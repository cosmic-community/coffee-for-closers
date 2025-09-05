'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

export default function Header() {
  const { user, logout, loading } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">☕</span>
            </div>
            <span className="font-bold text-xl text-gray-900">
              Coffee for Closers
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/profiles" className="nav-link">
              Profiles
            </Link>
            <Link href="/chats" className="nav-link">
              Chats
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="nav-link">
                  Dashboard
                </Link>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">
                    Hi, {user.metadata.display_name}
                  </span>
                  {user.metadata.profile_image && (
                    <img
                      src={`${user.metadata.profile_image.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                      alt={user.metadata.display_name}
                      width="32"
                      height="32"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              !loading && (
                <div className="flex items-center space-x-4">
                  <Link href="/login" className="nav-link">
                    Login
                  </Link>
                  <Link href="/signup" className="btn-primary">
                    Join Network
                  </Link>
                </div>
              )
            )}
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}