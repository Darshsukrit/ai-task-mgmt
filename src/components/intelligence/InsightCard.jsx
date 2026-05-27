import { ArrowRight } from 'lucide-react'
import Badge from '../ui/Badge'
import { INSIGHT_TYPE_VARIANT } from '../../constants/insights'

export default function InsightCard({ insight, compact = false }) {
  const variant = INSIGHT_TYPE_VARIANT[insight.type] ?? 'default'

  return (
    <article
      className="group p-4 rounded-lg border border-[var(--color-border)] bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <Badge variant={variant}>{insight.type}</Badge>
        {insight.confidence && (
          <span className="text-[10px] text-zinc-600 font-mono">
            {insight.confidence}%
          </span>
        )}
      </div>
      <h4 className="text-sm font-medium text-zinc-200 mb-1">{insight.title}</h4>
      {!compact && (
        <p className="text-xs text-zinc-500 leading-relaxed mb-3">{insight.body}</p>
      )}
      <button
        type="button"
        className="inline-flex items-center gap-1 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
      >
        {insight.action}
        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </article>
  )
}
