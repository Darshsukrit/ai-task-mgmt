import { motion } from 'framer-motion'
import PageHeader from '../components/ui/PageHeader'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { Target, Plus } from 'lucide-react'
import { goals } from '../data/mockData'

const priorityVariant = {
  high: 'warning',
  medium: 'default',
}

export default function Goals() {
  return (
    <div>
      <PageHeader
        title="Goals"
        subtitle="Milestones linked to your living context graph."
        action={
          <Button variant="primary" icon={Plus}>
            Add goal
          </Button>
        }
      />

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
                    <Badge variant={priorityVariant[goal.priority]}>
                      {goal.priority}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {goal.contexts.map((ctx) => (
                      <Badge key={ctx} variant="accent">
                        {ctx}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden max-w-xs">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-zinc-500 shrink-0">
                      {goal.progress}% · Due {goal.due}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
