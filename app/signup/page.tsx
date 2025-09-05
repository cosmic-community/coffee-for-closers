import SignupForm from '@/components/SignupForm'
import { getTopics } from '@/lib/cosmic'

export default async function SignupPage() {
  const topics = await getTopics()

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Join Coffee for Closers
            </h1>
            <p className="text-gray-600 text-lg">
              Connect with sales professionals and grow your network through weekly coffee chats
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <SignupForm topics={topics} />
          </div>
        </div>
      </div>
    </div>
  )
}