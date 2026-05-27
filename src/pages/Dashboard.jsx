import PageHeader from '../components/ui/PageHeader'
import StatsCards from '../components/dashboard/StatsCards'
import GraphSection from '../components/dashboard/GraphSection'
import InsightsPanel from '../components/dashboard/InsightsPanel'
import ActivityFeed from '../components/dashboard/ActivityFeed'
import ProjectCards from '../components/dashboard/ProjectCards'
import ProductivityWidgets from '../components/dashboard/ProductivityWidgets'
import Button from '../components/ui/Button'
import { Plus } from 'lucide-react'
import { insights } from '../data/mockData'

export default function Dashboard() {
  return (
    <div>
      <PageHeader
        title="Good morning, Sarah"
        subtitle={`Context layer synchronized · ${insights.length} intelligence signals active`}
        action={
          <Button variant="primary" icon={Plus}>
            New context
          </Button>
        }
      />

      <StatsCards />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
        <div className="xl:col-span-2 space-y-6">
          <GraphSection />
          <ProjectCards />
        </div>
        <div className="space-y-6">
          <InsightsPanel limit={3} showMoreHint />
          <ProductivityWidgets />
          <ActivityFeed limit={5} />
        </div>
      </div>
    </div>
  )
}
