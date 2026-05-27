import { memo } from 'react'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'
import { Handle, Position } from 'reactflow'
import { CATEGORY_STYLES } from '../../constants/graph'

function ContextNode({ data, selected }) {
  const style = CATEGORY_STYLES[data.category] ?? CATEGORY_STYLES.task
  const isBlocked = data.status === 'blocked' || data.status === 'at-risk'
  const reduced = usePrefersReducedMotion()

  return (
    <div
      className={`
        px-3.5 py-2.5 rounded-xl border min-w-[128px] max-w-[160px]
        ${style.border} ${style.bg}
        ${selected || data.highlight ? style.glow : ''}
        ${isBlocked ? 'ring-1 ring-rose-500/30' : ''}
        ${reduced ? '' : 'motion-smooth'}
      `}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-zinc-500 !w-1.5 !h-1.5 !border-0"
      />
      <div className="flex items-center gap-1.5 mb-1">
        <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
        <p className="text-[9px] uppercase tracking-wider text-zinc-500 truncate">
          {data.category}
        </p>
      </div>
      <p className="text-xs font-medium text-zinc-100 leading-snug">{data.label}</p>
      {data.status && (
        <p
          className={`text-[9px] mt-1 capitalize ${
            isBlocked ? 'text-rose-400/90' : 'text-zinc-600'
          }`}
        >
          {data.status}
        </p>
      )}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-zinc-500 !w-1.5 !h-1.5 !border-0"
      />
    </div>
  )
}

export default memo(ContextNode)
