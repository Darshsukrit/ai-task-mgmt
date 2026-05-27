import Card, { CardHeader } from '../ui/Card'
import { performanceInsights } from '../../data/analytics'

export default function PerformanceInsights() {
  return (
    <Card>
      <CardHeader title="Performance insights" subtitle="Velocity & accuracy" />
      <ul className="space-y-4">
        {performanceInsights.map((item) => (
          <li
            key={item.label}
            className="flex items-center justify-between py-2 border-b border-[var(--color-border)] last:border-0"
          >
            <span className="text-sm text-zinc-400">{item.label}</span>
            <div className="text-right">
              <span className="text-sm font-semibold text-zinc-100">{item.value}</span>
              <span className="block text-[10px] text-emerald-400">{item.change}</span>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}
