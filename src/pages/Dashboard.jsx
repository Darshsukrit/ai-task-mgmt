import { useState, useEffect } from 'react'
import PageHeader from '../components/ui/PageHeader'
import StatsCards from '../components/dashboard/StatsCards'
import GraphSection from '../components/dashboard/GraphSection'
import InsightsPanel from '../components/dashboard/InsightsPanel'
import ActivityFeed from '../components/dashboard/ActivityFeed'
import ProjectCards from '../components/dashboard/ProjectCards'
import ProductivityWidgets from '../components/dashboard/ProductivityWidgets'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import ProjectForm from '../components/forms/ProjectForm'
import { Plus, Loader } from 'lucide-react'
import { apiGet } from '../utils/api'

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const workspaceId = 1 // TODO: Get from context/auth
  const userId = 1 // TODO: Get from context/auth

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      const response = await apiGet(`/dashboard/aggregated-data?workspace_id=${workspaceId}`)
      setData(response)
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleProjectCreated = () => {
    fetchDashboardData() // Refetch dashboard data after creation
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader className="animate-spin text-zinc-500" size={48} />
      </div>
    )
  }

  const stats = data?.stats || {}
  const activityFeed = data?.activity_feed || []
  const insights = data?.insights || []

  return (
    <div>
      <PageHeader
        title="Good morning, Sarah"
        subtitle={`Context layer synchronized · ${insights.length} intelligence signals active`}
        action={
          <Button
            variant="primary"
            icon={Plus}
            onClick={() => setIsModalOpen(true)}
          >
            New context
          </Button>
        }
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Project"
        size="md"
      >
        <ProjectForm
          workspaceId={workspaceId}
          userId={userId}
          onSubmit={handleProjectCreated}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>

      <StatsCards stats={stats} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
        <div className="xl:col-span-2 space-y-6">
          <GraphSection data={data?.analytics_series} />
          <ProjectCards />
        </div>
        <div className="space-y-6">
          <InsightsPanel insights={insights} limit={3} showMoreHint />
          <ProductivityWidgets focusAnalytics={data?.focus_analytics} />
          <ActivityFeed activities={activityFeed} limit={5} />
        </div>
      </div>
    </div>
  )
}
