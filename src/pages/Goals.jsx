import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PageHeader from '../components/ui/PageHeader'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import GoalForm from '../components/forms/GoalForm'
import { Target, Plus, Loader } from 'lucide-react'
import { apiGet } from '../utils/api'

const statusColor = {
  active: 'default',
  completed: 'success',
  cancelled: 'muted',
}

export default function Goals() {
  const [goals, setGoals] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const workspaceId = 1 // TODO: Get from context/auth
  const userId = 1 // TODO: Get from context/auth

  useEffect(() => {
    fetchGoals()
  }, [])

  const fetchGoals = async () => {
    setLoading(true)
    try {
      const data = await apiGet(`/goals?workspace_id=${workspaceId}`)
      setGoals(data || [])
    } catch (error) {
      console.error('Failed to fetch goals:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGoalCreated = () => {
    fetchGoals() // Refetch goals after creation
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'No date'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div>
      <PageHeader
        title="Goals"
        subtitle="Milestones linked to your living context graph."
        action={
          <Button
            variant="primary"
            icon={Plus}
            onClick={() => setIsModalOpen(true)}
          >
            Add goal
          </Button>
        }
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Goal"
        size="md"
      >
        <GoalForm
          workspaceId={workspaceId}
          userId={userId}
          onSubmit={handleGoalCreated}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader className="animate-spin text-zinc-500" size={32} />
        </div>
      ) : goals.length === 0 ? (
        <div className="text-center py-12">
          <Target className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <p className="text-zinc-400">No goals yet. Create your first goal!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {goals.map((goal, i) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card hover className="cursor-pointer">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-zinc-100">
                        {goal.title}
                      </h3>
                      <Badge variant={statusColor[goal.status] || 'default'}>
                        {goal.status}
                      </Badge>
                    </div>
                    {goal.category && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        <Badge variant="accent">{goal.category}</Badge>
                      </div>
                    )}
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden max-w-xs">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400"
                          style={{ width: `${goal.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-zinc-500 shrink-0">
                        {Math.round(goal.progress)}% · Due{' '}
                        {formatDate(goal.target_date)}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
