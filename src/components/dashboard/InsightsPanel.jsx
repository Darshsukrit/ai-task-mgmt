import { Sparkles } from 'lucide-react'
import Card, { CardHeader } from '../ui/Card'
import Badge from '../ui/Badge'
import InsightCard from '../intelligence/InsightCard'
import { insights } from '../../data/mockData'

const DASHBOARD_INSIGHT_LIMIT = 3

export default function InsightsPanel({
  limit = DASHBOARD_INSIGHT_LIMIT,
  showMoreHint = false,
}) {
  const visible = limit ? insights.slice(0, limit) : insights

  return (
    <Card className="h-full">
      <CardHeader
        title="Contextual insights"
        subtitle="Embedded intelligence — not a chatbot"
        action={
          <Badge variant="accent" className="gap-1">
            <Sparkles className="w-3 h-3" />
            Live
          </Badge>
        }
      />

      <ul className="space-y-3">
        {visible.map((insight) => (
          <li key={insight.id}>
            <InsightCard insight={insight} />
          </li>
        ))}
      </ul>
      {showMoreHint && limit && insights.length > limit && (
        <p className="text-[11px] text-zinc-600 mt-3 text-center">
          +{insights.length - limit} more signals active
        </p>
      )}
    </Card>
  )
}
