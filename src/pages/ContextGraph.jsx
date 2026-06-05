import { lazy, Suspense, useEffect, useState } from 'react'
import PageHeader from '../components/ui/PageHeader'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import GraphLegend from '../components/context-graph/GraphLegend'
import GraphStats from '../components/context-graph/GraphStats'
import InsightsPanel from '../components/dashboard/InsightsPanel'
import { useGraphFilter } from '../hooks/useGraphFilter'
import { contextGraphNodes, contextGraphEdges } from '../data/graph'
import { GitBranch, Filter } from 'lucide-react'
import ErrorBoundary from '../components/ui/ErrorBoundary'
import { apiGet } from '../utils/api'

const ContextFlowGraph = lazy(
  () => import('../components/context-graph/ContextFlowGraph')
)

function GraphLoader() {
  return (
    <div className="w-full h-full min-h-[480px] rounded-xl border border-[var(--color-border)] bg-[var(--color-elevated)] flex items-center justify-center">
      <div className="w-full max-w-4xl p-6">
        <div className="h-6 rounded-md mb-4 bg-white/2 shimmer" />
        <div className="h-60 rounded-xl bg-white/3 shimmer" />
      </div>
    </div>
  )
}

export default function ContextGraph() {
  const [nodes, setNodes] = useState(contextGraphNodes)
  const [edges, setEdges] = useState(contextGraphEdges)
  const [isLoadingGraph, setIsLoadingGraph] = useState(true)

  const { activeCategories, toggleCategory, filteredNodes, filteredEdges } =
    useGraphFilter(nodes, edges)

  useEffect(() => {
    async function fetchGraphData() {
      try {
        const [projects, tasks] = await Promise.all([
          apiGet('/projects/'),
          apiGet('/tasks/'),
        ])

        if (projects?.length || tasks?.length) {
          const projectNodes = (projects || []).map((project, index) => ({
            id: `project-${project.id}`,
            type: 'context',
            position: { x: index * 240, y: 0 },
            data: {
              label: project.title || project.name,
              category: 'project',
              status: project.status || 'active',
            },
          }))

          const taskNodes = (tasks || []).map((task, index) => ({
            id: `task-${task.id}`,
            type: 'context',
            position: {
              x: (index % 6) * 180,
              y: 180 + Math.floor(index / 6) * 160,
            },
            data: {
              label: task.title,
              category: 'task',
              status: task.status,
            },
          }))

          const projectTaskEdges = (tasks || [])
            .filter((task) => task.project_id)
            .map((task, index) => ({
              id: `project-${task.project_id}-task-${task.id}`,
              source: `project-${task.project_id}`,
              target: `task-${task.id}`,
              type: 'dependency',
              animated: true,
              data: { kind: 'dependency' },
            }))

          setNodes([...projectNodes, ...taskNodes])
          setEdges(projectTaskEdges)
        }
      } catch (error) {
        console.error('Failed to load graph data:', error)
      } finally {
        setIsLoadingGraph(false)
      }
    }

    fetchGraphData()
  }, [])

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <PageHeader
        title="Context Graph"
        subtitle="Relationships across projects, tasks, workflows, files, habits, and schedules."
        action={
          <div className="flex gap-2">
            <Button variant="secondary" icon={Filter} size="sm">
              Filter
            </Button>
            <Button variant="primary" icon={GitBranch} size="sm">
              Expand graph
            </Button>
          </div>
        }
      />

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
        <div className="lg:col-span-3 min-h-[480px]">
          {isLoadingGraph ? (
            <GraphLoader />
          ) : (
            <ErrorBoundary>
              <Suspense fallback={<GraphLoader />}>
                <ContextFlowGraph
                  nodes={filteredNodes}
                  edges={filteredEdges}
                  className="h-full min-h-[480px]"
                />
              </Suspense>
            </ErrorBoundary>
          )}
        </div>

        <div className="space-y-4 overflow-y-auto">
          <Card padding="sm">
            <GraphStats nodes={filteredNodes} edges={filteredEdges} />
          </Card>
          <Card padding="sm">
            <GraphLegend
              activeCategories={activeCategories}
              onToggle={toggleCategory}
            />
          </Card>
          <InsightsPanel limit={2} />
        </div>
      </div>
    </div>
  )
}
