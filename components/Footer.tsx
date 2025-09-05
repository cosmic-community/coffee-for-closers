import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">☕</span>
              </div>
              <span className="font-bold text-xl text-gray-900">
                Coffee for Closers
              </span>
            </Link>
            <p className="text-gray-600 mb-4">
              Connecting software sales professionals through meaningful virtual coffee chats. 
              Build your network, share knowledge, and advance your career.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Network</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/profiles" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Browse Profiles
                </Link>
              </li>
              <li>
                <Link href="/chats" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Coffee Chats
                </Link>
              </li>
              <li>
                <Link href="/topics" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Sales Topics
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © 2024 Coffee for Closers. All rights reserved.
            </p>
            <p className="text-gray-600 text-sm mt-4 md:mt-0">
              Built with ❤️ for the sales community
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}