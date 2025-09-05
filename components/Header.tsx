import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">☕</span>
            </div>
            <span className="font-bold text-xl text-gray-900">
              Coffee for Closers
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/profiles" className="text-gray-600 hover:text-gray-900 transition-colors">
              Profiles
            </Link>
            <Link href="/chats" className="text-gray-600 hover:text-gray-900 transition-colors">
              Coffee Chats
            </Link>
            <Link href="/topics" className="text-gray-600 hover:text-gray-900 transition-colors">
              Topics
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button className="btn-secondary">
              Sign In
            </button>
            <button className="btn-primary">
              Join Network
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}