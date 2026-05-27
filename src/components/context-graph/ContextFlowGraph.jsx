import { memo, useMemo } from 'react'
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow'
import 'reactflow/dist/style.css'
import ContextNode from './ContextNode'

const nodeTypes = { context: memo(ContextNode) }

function ContextFlowGraph({ nodes, edges, className = '' }) {
  const defaultEdgeOptions = useMemo(
    () => ({
      style: { stroke: 'rgba(129, 140, 248, 0.35)', strokeWidth: 1.5 },
    }),
    []
  )

  return (
    <div
      className={`w-full h-full min-h-[400px] rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-elevated)] ${className}`}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.25 }}
        defaultEdgeOptions={defaultEdgeOptions}
        minZoom={0.4}
        maxZoom={1.5}
        proOptions={{ hideAttribution: true }}
        nodesDraggable
        nodesConnectable={false}
        elementsSelectable
      >
        <Background color="rgba(255,255,255,0.03)" gap={24} size={1} />
        <Controls showInteractive={false} />
        <MiniMap
          nodeColor={(n) => {
            const colors = {
              project: '#6366f1',
              task: '#38bdf8',
              workflow: '#8b5cf6',
              deadline: '#f43f5e',
            }
            return colors[n.data?.category] ?? '#3f3f46'
          }}
          maskColor="rgba(9, 9, 11, 0.85)"
          className="!bg-[var(--color-card)] !border-[var(--color-border)]"
        />
      </ReactFlow>
    </div>
  )
}

export default memo(ContextFlowGraph)
