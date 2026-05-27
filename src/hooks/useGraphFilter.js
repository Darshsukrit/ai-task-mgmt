import { useMemo, useState, useCallback } from 'react'
import { GRAPH_CATEGORIES } from '../constants/graph'
import { EDGE_STYLES } from '../constants/graph'

export function useGraphFilter(nodes, edges) {
  const [activeCategories, setActiveCategories] = useState(GRAPH_CATEGORIES)

  const toggleCategory = useCallback((category) => {
    setActiveCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }, [])

  const filteredNodes = useMemo(
    () =>
      nodes.filter((n) => activeCategories.includes(n.data.category)),
    [nodes, activeCategories]
  )

  const filteredNodeIds = useMemo(
    () => new Set(filteredNodes.map((n) => n.id)),
    [filteredNodes]
  )

  const filteredEdges = useMemo(
    () =>
      edges
        .filter(
          (e) => filteredNodeIds.has(e.source) && filteredNodeIds.has(e.target)
        )
        .map((edge) => {
          const kind = edge.data?.kind ?? 'default'
          const style = EDGE_STYLES[kind] ?? EDGE_STYLES.default
          return {
            ...edge,
            style,
            animated: kind === 'dependency' || edge.animated,
          }
        }),
    [edges, filteredNodeIds]
  )

  return {
    activeCategories,
    toggleCategory,
    filteredNodes,
    filteredEdges,
  }
}
