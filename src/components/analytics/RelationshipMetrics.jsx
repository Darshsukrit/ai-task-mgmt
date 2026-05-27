import Card, { CardHeader } from '../ui/Card'
import { relationshipMetrics } from '../../data/analytics'

export default function RelationshipMetrics() {
  const items = [
    { label: 'Total links', value: relationshipMetrics.totalLinks },
    { label: 'Active dependencies', value: relationshipMetrics.activeDependencies },
    { label: 'Resolved this week', value: relationshipMetrics.resolvedThisWeek },
    { label: 'Avg linkage depth', value: relationshipMetrics.avgLinkageDepth },
  ]

  return (
    <Card>
      <CardHeader
        title="Relationship metrics"
        subtitle="Context graph connectivity"
      />
      <dl className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.label}>
            <dt className="text-xs text-zinc-500">{item.label}</dt>
            <dd className="text-xl font-semibold text-zinc-50 mt-1">{item.value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  )
}
