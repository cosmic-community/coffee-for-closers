import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/contexts/AuthContext'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Coffee for Closers - Sales Professional Network',
  description: 'Connect with sales professionals over virtual coffee chats. Build your network, share knowledge, and advance your career.',
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
        <AuthProvider>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main>
              {children}
            </main>
            <Footer />
          </div>
          <CosmicBadge bucketSlug={bucketSlug} />
        </AuthProvider>
      </body>
    </html>
  )
}