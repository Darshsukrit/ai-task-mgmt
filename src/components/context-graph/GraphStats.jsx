import { graphSummary } from '../../data/graph'

export default function GraphStats({ nodes, edges }) {
  const summary = nodes && edges ? {
    nodes: nodes.length,
    relationships: edges.length,
    blockedPaths: edges.filter((e) => e.data?.kind === 'blocks' || e.data?.kind === 'blocked').length,
    activeDependencies: edges.filter((e) => e.data?.kind === 'dependency').length,
  } : graphSummary

  const items = [
    { label: 'Nodes', value: summary.nodes },
    { label: 'Relationships', value: summary.relationships },
    { label: 'Blocked paths', value: summary.blockedPaths },
    { label: 'Dependencies', value: summary.activeDependencies },
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
