import {
  Link2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ListTodo,
  GitBranch,
  Calendar,
} from 'lucide-react'
import Badge from '../ui/Badge'

const iconMap = {
  link: Link2,
  sparkles: Sparkles,
  check: CheckCircle2,
  alert: AlertCircle,
  task: ListTodo,
  workflow: GitBranch,
  calendar: Calendar,
}

const categoryVariant = {
  dependency: 'warning',
  task: 'default',
  workflow: 'accent',
  schedule: 'success',
  insight: 'accent',
}

export default function ActivityTimelineItem({ activity, isLast }) {
  const Icon = iconMap[activity.icon] ?? Sparkles

  return (
    <li className="relative flex gap-3 pl-1 group">
      {!isLast && (
        <span
          className="absolute left-[15px] top-9 bottom-0 w-px bg-[var(--color-border)]"
          aria-hidden
        />
      )}
      <div className="relative z-10 w-8 h-8 rounded-lg bg-[var(--color-elevated)] border border-[var(--color-border)] flex items-center justify-center shrink-0 group-hover:border-indigo-500/20 transition-colors">
        <Icon className="w-3.5 h-3.5 text-zinc-500 group-hover:text-indigo-400/80 transition-colors" />
      </div>
      <div className="min-w-0 flex-1 pb-5 pt-0.5">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <Badge variant={categoryVariant[activity.category] ?? 'muted'}>
            {activity.category}
          </Badge>
          <span className="text-[10px] text-zinc-600">{activity.time}</span>
        </div>
        <p className="text-sm text-zinc-300 leading-snug">
          <span className="font-medium text-zinc-200">{activity.user}</span>{' '}
          {activity.action}{' '}
          <span className="text-zinc-400">{activity.target}</span>
        </p>
      </div>
    </li>
  )
}
