import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">☕</span>
            <span className="font-bold text-xl text-gray-900">
              Coffee for Closers
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/profiles" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Browse Profiles
            </Link>
            <Link 
              href="/chats" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Coffee Chats
            </Link>
            <Link 
              href="/signup" 
              className="btn-primary text-sm px-4 py-2"
            >
              Join Network
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2">
            <span className="sr-only">Open menu</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}