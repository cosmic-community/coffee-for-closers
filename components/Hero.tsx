export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Connect with Sales Professionals
            <span className="text-primary"> Over Coffee</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join a community of software sales professionals. Get matched weekly for 
            20-minute virtual coffee chats to share knowledge, build relationships, and advance your career.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="btn-primary text-lg px-8 py-3">
              Join the Network
            </button>
            <button className="btn-secondary text-lg px-8 py-3">
              Browse Profiles
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="card text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">🤝</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Smart Matching</h3>
              <p className="text-gray-600">
                Get paired with peers based on experience level, interests, and expertise areas.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">☕</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Weekly Coffee Chats</h3>
              <p className="text-gray-600">
                20-minute virtual meetings designed to build meaningful professional relationships.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">📈</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Grow Your Network</h3>
              <p className="text-gray-600">
                Expand your professional network and learn from experienced sales professionals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}