import PageHeader from '../components/ui/PageHeader'
import StatsCards from '../components/dashboard/StatsCards'
import ProductivityAnalytics from '../components/analytics/ProductivityAnalytics'
import WorkflowHealthSection from '../components/analytics/WorkflowHealthSection'
import RelationshipMetrics from '../components/analytics/RelationshipMetrics'
import FocusAnalyticsSection from '../components/analytics/FocusAnalyticsSection'
import DeadlineTrends from '../components/analytics/DeadlineTrends'
import PerformanceInsights from '../components/analytics/PerformanceInsights'
import ProductivityIntelligence from '../components/intelligence/ProductivityIntelligence'

export default function Analytics() {
  return (
    <div>
      <PageHeader
        title="Analytics"
        subtitle="Productivity, workflow health, and contextual relationship metrics."
      />

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <ProductivityAnalytics />
        <WorkflowHealthSection />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <RelationshipMetrics />
        <FocusAnalyticsSection />
        <PerformanceInsights />
      </div>

      <div className="mt-6">
        <DeadlineTrends />
      </div>

      <div className="mt-8">
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
          Productivity intelligence
        </h2>
        <ProductivityIntelligence />
      </div>
    </div>
  )
}
