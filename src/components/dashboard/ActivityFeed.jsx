import Card, { CardHeader } from '../ui/Card'
import ActivityTimelineItem from '../intelligence/ActivityTimelineItem'

export default function ActivityFeed({ activities = [], limit }) {
  const items = limit ? activities.slice(0, limit) : activities

  // Transform API response to match ActivityTimelineItem format
  const formattedActivities = items.map((activity) => ({
    id: activity.id,
    user: activity.user || 'Unknown',
    action: activity.action || 'Activity',
    entity: activity.entity || 'System',
    timestamp: activity.timestamp,
  }))

  return (
    <Card>
      <CardHeader title="Activity" subtitle="Context events & system signals" />

      <ul>
        {formattedActivities.length === 0 ? (
          <li className="py-4 text-center text-xs text-zinc-600">
            No activity yet
          </li>
        ) : (
          formattedActivities.map((activity, index) => (
            <ActivityTimelineItem
              key={activity.id}
              activity={activity}
              isLast={index === formattedActivities.length - 1}
            />
          ))
        )}
      </ul>
    </Card>
  )
}
