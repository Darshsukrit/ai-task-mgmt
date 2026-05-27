import { CATEGORY_LABELS, GRAPH_CATEGORIES } from '../../constants/graph'
import { CATEGORY_STYLES } from '../../constants/graph'

export default function GraphLegend({ activeCategories, onToggle }) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
        Node types
      </h3>
      <div className="flex flex-wrap gap-1.5">
        {GRAPH_CATEGORIES.map((cat) => {
          const active = activeCategories.includes(cat)
          const style = CATEGORY_STYLES[cat]
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onToggle(cat)}
              className={`
                inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-medium
                border transition-colors
                ${active
                  ? `${style.border} ${style.bg} text-zinc-200`
                  : 'border-transparent bg-white/[0.02] text-zinc-600 hover:text-zinc-400'}
              `}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
              {CATEGORY_LABELS[cat]}
            </button>
          )
        })}
      </div>
      <p className="text-[11px] text-zinc-600 leading-relaxed">
        Animated edges = active dependencies. Rose ring = blocked or at-risk.
      </p>
    </div>
  )
}
