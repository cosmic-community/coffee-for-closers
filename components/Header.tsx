'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

export default function Header() {
  const { user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setMobileMenuOpen(false)
  }

  const navigationItems = [
    { label: 'Products', href: '/profiles' },
    { label: 'Network', href: '/chats' },
    { label: 'Features', href: '#features' },
    { label: 'About us', href: '#about' },
  ]

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">☕</span>
            </div>
            <span className="text-xl font-bold gradient-text">COFFEE FOR CLOSERS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="hidden md:block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <div className="flex items-center gap-2">
                  {user.metadata.profile_image && (
                    <img
                      src={`${user.metadata.profile_image.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                      alt={user.metadata.display_name}
                      width="32"
                      height="32"
                      className="w-8 h-8 rounded-full border-2 border-blue-200 object-cover"
                    />
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="hidden md:block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  SIGN IN
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-white/20 py-4">
            <div className="flex flex-col space-y-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 px-4 py-2"
                >
                  {item.label}
                </Link>
              ))}
              
              {!user && (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 px-4 py-2"
                >
                  Login
                </Link>
              )}
              
              {user && (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 px-4 py-2"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}