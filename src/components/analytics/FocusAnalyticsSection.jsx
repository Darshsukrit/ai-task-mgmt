import Card, { CardHeader } from '../ui/Card'
import { focusAnalytics } from '../../data/analytics'

export default function FocusAnalyticsSection() {
  return (
    <Card>
      <CardHeader title="Focus analytics" subtitle="Attention & distraction index" />
      <dl className="space-y-4">
        <div className="flex justify-between items-baseline">
          <dt className="text-sm text-zinc-500">Average focus score</dt>
          <dd className="text-2xl font-semibold text-zinc-50">{focusAnalytics.avgScore}</dd>
        </div>
        <div className="flex justify-between items-baseline">
          <dt className="text-sm text-zinc-500">Peak day</dt>
          <dd className="text-lg font-medium text-zinc-200">{focusAnalytics.peakDay}</dd>
        </div>
        <div className="flex justify-between items-baseline">
          <dt className="text-sm text-zinc-500">Best window</dt>
          <dd className="text-lg font-medium text-indigo-300">{focusAnalytics.bestWindow}</dd>
        </div>
        <div className="flex justify-between items-baseline">
          <dt className="text-sm text-zinc-500">Distraction rate</dt>
          <dd className="text-lg font-medium text-amber-400/90">
            {focusAnalytics.distractionRate}/day
          </dd>
        </div>
      </dl>
    </Card>
  )
}
