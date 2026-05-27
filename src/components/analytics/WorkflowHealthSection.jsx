import Card, { CardHeader } from '../ui/Card'
import { workflowHealth } from '../../data/analytics'

const statusColor = {
  healthy: 'bg-emerald-500',
  watch: 'bg-amber-500',
  critical: 'bg-rose-500',
}

export default function WorkflowHealthSection() {
  return (
    <Card>
      <CardHeader
        title="Workflow health"
        subtitle="Context pipeline status by domain"
      />
      <ul className="space-y-4">
        {workflowHealth.map((item) => (
          <li key={item.label}>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-zinc-400">{item.label}</span>
              <span className="text-zinc-300 font-medium">{item.health}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${statusColor[item.status]}`}
                style={{ width: `${item.health}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}
