'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

export default function Hero() {
  const { user } = useAuth()

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 floating-element">
        <div className="card-floating w-24 h-24 flex items-center justify-center">
          <span className="text-2xl">☕</span>
        </div>
      </div>
      
      <div className="absolute top-40 left-20 floating-element-delayed">
        <div className="card-floating w-20 h-20 flex items-center justify-center">
          <span className="text-xl">🤝</span>
        </div>
      </div>
      
      <div className="absolute bottom-32 right-32 floating-element">
        <div className="card-floating w-28 h-28 flex items-center justify-center">
          <span className="text-2xl">📈</span>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-white/90 mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">Join Our Growing Community</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Be Ready to
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                Challenge Best
              </span>
              <br />
              Moments.
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Sales networking and coffee chats bring valuable insights to people's careers and success.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              {user ? (
                <>
                  <Link href="/dashboard" className="btn-primary">
                    Go to Dashboard
                  </Link>
                  <Link href="/profiles" className="btn-secondary">
                    Browse Profiles
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/signup" className="btn-primary">
                    Join our Community
                  </Link>
                  <Link href="/profiles" className="btn-secondary">
                    Explore Network
                  </Link>
                </>
              )}
            </div>

            {/* Community Stats */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
              <div className="flex -space-x-4">
                {/* Profile avatars placeholder */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-400 to-red-400 border-4 border-white"></div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 border-4 border-white"></div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-blue-400 border-4 border-white"></div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 border-4 border-white flex items-center justify-center text-white font-bold text-sm">
                  50+
                </div>
              </div>
              
              <div className="text-white/80">
                <p className="text-sm">Join our ever growing community.</p>
              </div>

              <div className="glass-effect rounded-2xl px-6 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-white font-semibold">Leveling Up</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="stats-card">
              <div className="text-4xl font-bold gradient-text mb-2">08+</div>
              <div className="text-gray-600 font-medium">Years of experience</div>
              <div className="text-sm text-gray-500">in sales networking</div>
            </div>
            
            <div className="stats-card">
              <div className="text-4xl font-bold gradient-text mb-2">8M+</div>
              <div className="text-gray-600 font-medium">Trust People</div>
              <div className="text-sm text-gray-500">Around worldwide</div>
            </div>
            
            <div className="stats-card">
              <div className="text-4xl font-bold gradient-text mb-2">26</div>
              <div className="text-gray-600 font-medium">Exclusive sales</div>
              <div className="text-sm text-gray-500">networking events</div>
            </div>
            
            <div className="stats-card relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-500 opacity-10"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full"></div>
                  <span className="font-bold text-gray-800">Most Trusted</span>
                </div>
                <div className="text-gray-600 font-medium">Security in Limitless</div>
                <div className="text-sm text-gray-500">professional network</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}