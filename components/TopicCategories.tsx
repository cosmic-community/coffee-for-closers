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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Sales Methodology':
        return 'bg-blue-50 border-blue-200'
      case 'Industry Focus':
        return 'bg-green-50 border-green-200'
      case 'Tools & Technology':
        return 'bg-purple-50 border-purple-200'
      case 'Career Development':
        return 'bg-orange-50 border-orange-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  return (
    <section>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Discussion Topics
        </h2>
        <p className="text-gray-600">
          Explore sales topics and connect with professionals who share your interests
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(topicsByCategory).map(([category, categoryTopics]) => (
          <div
            key={category}
            className={`card ${getCategoryColor(category)}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="text-2xl">
                {getCategoryIcon(category)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {category}
                </h3>
                <p className="text-sm text-gray-600">
                  {categoryTopics.length} topic{categoryTopics.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {categoryTopics.slice(0, 3).map((topic) => (
                <div key={topic.id} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">
                      {topic.metadata.topic_name}
                    </h4>
                    {topic.metadata.description && (
                      <p className="text-xs text-gray-600 mt-1">
                        {topic.metadata.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              
              {categoryTopics.length > 3 && (
                <p className="text-xs text-gray-500 pt-2">
                  +{categoryTopics.length - 3} more topics
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}