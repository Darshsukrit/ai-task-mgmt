import Card, { CardHeader } from '../ui/Card'
import MiniBarChart from '../ui/MiniBarChart'
import { analyticsSeries } from '../../data/analytics'

export default function ProductivityAnalytics() {
  return (
    <Card className="min-h-[300px]">
      <CardHeader
        title="Productivity analytics"
        subtitle="Focus, context & output index"
        action={
          <div className="flex flex-wrap gap-3 text-[10px] text-zinc-500">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-indigo-400" /> Focus
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-violet-400/70" /> Context
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400/70" /> Productivity
            </span>
          </div>
        }
      />
      <MiniBarChart
        data={analyticsSeries}
        keys={['focus', 'context', 'productivity']}
        labelKey="day"
        height={180}
        barClassNames={[
          'bg-gradient-to-t from-indigo-600/80 to-indigo-400/40',
          'bg-gradient-to-t from-violet-600/50 to-violet-400/25',
          'bg-gradient-to-t from-emerald-600/50 to-emerald-400/25',
        ]}
      />
    </Card>
  )
}
