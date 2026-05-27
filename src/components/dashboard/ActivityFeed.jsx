import Card, { CardHeader } from '../ui/Card'
import ActivityTimelineItem from '../intelligence/ActivityTimelineItem'
import { activities } from '../../data/mockData'

export default function ActivityFeed({ limit }) {
  const items = limit ? activities.slice(0, limit) : activities

  return (
    <Card>
      <CardHeader title="Activity" subtitle="Context events & system signals" />

      <ul>
        {items.map((activity, index) => (
          <ActivityTimelineItem
            key={activity.id}
            activity={activity}
            isLast={index === items.length - 1}
          />
        ))}
      </ul>
    </Card>
  )
}
