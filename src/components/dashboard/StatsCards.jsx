import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { stats } from '../../data/mockData'
import { getMotionProps } from '../../constants/animations'

const { statsContainer, statsItem } = getMotionProps(false)

function StatsCards() {
  return (
    <motion.div
      variants={statsContainer}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
    >
      {stats.map((stat) => (
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
