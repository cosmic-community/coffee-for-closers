import type { Topic } from '@/types'

interface TopicCategoriesProps {
  topics: Topic[]
}

export default function TopicCategories({ topics }: TopicCategoriesProps) {
  if (!topics || topics.length === 0) {
    return null
  }

  // Group topics by category
  const topicsByCategory = topics.reduce((acc, topic) => {
    const category = topic.metadata.category.value || 'Other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(topic)
    return acc
  }, {} as Record<string, Topic[]>)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Sales Methodology':
        return '📋'
      case 'Industry Focus':
        return '🏢'
      case 'Tools & Technology':
        return '⚙️'
      case 'Career Development':
        return '📈'
      default:
        return '🏷️'
    }
  }

  const getCategoryGradient = (category: string) => {
    switch (category) {
      case 'Sales Methodology':
        return 'from-blue-400 to-blue-600'
      case 'Industry Focus':
        return 'from-green-400 to-green-600'
      case 'Tools & Technology':
        return 'from-purple-400 to-purple-600'
      case 'Career Development':
        return 'from-orange-400 to-orange-600'
      default:
        return 'from-gray-400 to-gray-600'
    }
  }

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Discussion Topics
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore sales topics and connect with professionals who share your interests
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {Object.entries(topicsByCategory).map(([category, categoryTopics], index) => (
            <div
              key={category}
              className={`card relative overflow-hidden ${index % 2 === 0 ? 'md:-rotate-1' : 'md:rotate-1'} hover:rotate-0 transition-transform duration-300`}
            >
              {/* Background Gradient */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${getCategoryGradient(category)} opacity-10 rounded-full -mr-12 -mt-12`}></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${getCategoryGradient(category)} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}>
                    {getCategoryIcon(category)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {category}
                    </h3>
                    <p className="text-gray-600 font-medium">
                      {categoryTopics.length} topic{categoryTopics.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {categoryTopics.slice(0, 3).map((topic) => (
                    <div key={topic.id} className="bg-gray-50/50 rounded-xl p-4 hover:bg-white/80 transition-colors duration-200">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {topic.metadata.topic_name}
                      </h4>
                      {topic.metadata.description && (
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {topic.metadata.description}
                        </p>
                      )}
                    </div>
                  ))}
                  
                  {categoryTopics.length > 3 && (
                    <div className="text-center pt-2">
                      <span className="inline-flex items-center gap-2 text-sm text-gray-500 bg-gray-100/50 px-4 py-2 rounded-full">
                        <span>+{categoryTopics.length - 3} more topics</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}