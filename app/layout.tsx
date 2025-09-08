import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Coffee for Closers - Sales Professional Network',
  description: 'Connect with sales professionals through weekly coffee chats. Share knowledge, build relationships, and grow your sales career.',
  keywords: 'sales, networking, coffee chats, sales professionals, business development',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <div className="min-h-screen bg-gray-50">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <CosmicBadge bucketSlug={bucketSlug} />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}