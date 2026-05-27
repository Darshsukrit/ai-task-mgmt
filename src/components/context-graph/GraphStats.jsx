import { graphSummary } from '../../data/graph'

export default function GraphStats() {
  const items = [
    { label: 'Nodes', value: graphSummary.nodes },
    { label: 'Relationships', value: graphSummary.relationships },
    { label: 'Blocked paths', value: graphSummary.blockedPaths },
    { label: 'Dependencies', value: graphSummary.activeDependencies },
  ]

  return (
    <dl className="grid grid-cols-2 gap-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="p-3 rounded-lg bg-white/[0.02] border border-[var(--color-border)]"
        >
          <dt className="text-[10px] text-zinc-600 uppercase tracking-wider">
            {item.label}
          </dt>
          <dd className="text-lg font-semibold text-zinc-100 mt-0.5">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}
