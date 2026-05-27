import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { getMotionProps } from '../../constants/animations'

const { statsContainer, statsItem } = getMotionProps(false)

function StatsCards({ stats = {} }) {
  // Format stats from API response
  const statsArray = [
    {
      id: 1,
      label: 'Total Tasks',
      value: stats.total_tasks || 0,
      trend: 'up',
      change: '+12%',
      description: 'Active in workspace',
    },
    {
      id: 2,
      label: 'Completed',
      value: stats.completed_tasks || 0,
      trend: 'up',
      change: '+5%',
      description: 'This period',
    },
    {
      id: 3,
      label: 'In Progress',
      value: stats.in_progress_tasks || 0,
      trend: 'down',
      change: '-2%',
      description: 'Currently assigned',
    },
    {
      id: 4,
      label: 'Completion Rate',
      value: `${Math.round(stats.completion_rate || 0)}%`,
      trend: 'up',
      change: '+8%',
      description: 'Of open tasks',
    },
  ]

  return (
    <motion.div
      variants={statsContainer}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
    >
      {statsArray.map((stat) => (
        <motion.div
          key={stat.id}
          variants={statsItem}
          className="glass-panel rounded-xl p-5 glow-subtle"
        >
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
            {stat.label}
          </p>
          <div className="flex items-end justify-between mt-3 gap-2">
            <span className="text-2xl font-semibold text-zinc-50 tracking-tight">
              {stat.value}
            </span>
            <span
              className={`inline-flex items-center gap-0.5 text-xs font-medium ${
                stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
              }`}
            >
              {stat.trend === 'up' ? (
                <TrendingUp className="w-3.5 h-3.5" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5" />
              )}
              {stat.change}
            </span>
          </div>
          <p className="text-[11px] text-zinc-600 mt-2">{stat.description}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default React.memo(StatsCards)
