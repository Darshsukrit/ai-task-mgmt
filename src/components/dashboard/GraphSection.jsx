import Card, { CardHeader } from '../ui/Card'
import MiniBarChart from '../ui/MiniBarChart'
import { analyticsSeries } from '../../data/mockData'

export default function GraphSection() {
  return (
    <Card className="h-full min-h-[280px]">
      <CardHeader
        title="Context & focus rhythm"
        subtitle="7-day intelligence index"
        action={
          <div className="flex gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-zinc-500">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              Focus
            </span>
            <span className="flex items-center gap-1.5 text-zinc-500">
              <span className="w-2 h-2 rounded-full bg-violet-400/70" />
              Context
            </span>
          </div>
        }
      />
      <MiniBarChart
        data={analyticsSeries}
        keys={['focus', 'context']}
        labelKey="day"
        height={160}
        barClassNames={[
          'bg-gradient-to-t from-indigo-600/80 to-indigo-400/40',
          'bg-gradient-to-t from-violet-600/50 to-violet-400/25',
        ]}
      />
    </Card>
  )
}
