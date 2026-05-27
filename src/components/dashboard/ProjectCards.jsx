import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MoreHorizontal, GitBranch } from 'lucide-react'
import Card, { CardHeader } from '../ui/Card'
import Avatar from '../ui/Avatar'
import Badge from '../ui/Badge'
import { getMotionProps } from '../../constants/animations'
import { apiGet } from '../../utils/api'

const statusLabel = {
  active: { label: 'Active', variant: 'accent' },
  steady: { label: 'Steady', variant: 'default' },
  closing: { label: 'Closing', variant: 'success' },
}

const colorBar = {
  indigo: 'from-indigo-500 to-indigo-400',
  violet: 'from-violet-500 to-violet-400',
  emerald: 'from-emerald-500 to-emerald-400',
  amber: 'from-amber-500 to-amber-400',
}

function ProjectCards() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await apiGet('/projects/')
        setProjects(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchProjects()
  }, [])

  return (
    <div>
      <CardHeader
        title="Context workspaces"
        subtitle="Active project intelligence layers"
        action={
          <button
            type="button"
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
          >
            View all
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, i) => {
          const status = statusLabel[project.status] || { label: project.status, variant: 'default' }
          return (
            <motion.div
              key={project.id}
              variants={getMotionProps(false).projectItem}
              initial="initial"
              animate="animate"
              transition={{ delay: i * 0.05 }}
            >
              <Card hover padding="md" className="cursor-pointer">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-100">
                      {project.name}
                    </h4>
                    <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1">
                      {project.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="p-1 text-zinc-600 hover:text-zinc-400 rounded"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Badge variant={status.variant}>{status.label}</Badge>
                  <span className="flex items-center gap-1 text-[11px] text-zinc-600">
                    <GitBranch className="w-3 h-3" />
                    {project.contextNodes} nodes
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-[11px] mb-1.5">
                    <span className="text-zinc-500">Context coverage</span>
                    <span className="text-zinc-400 font-medium">
                      {project.progress}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${colorBar[project.color]}`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {project.members.map((m) => (
                      <Avatar
                        key={m}
                        initials={m}
                        size="sm"
                        className="ring-2 ring-[var(--color-card)]"
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-zinc-600">Open →</span>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default React.memo(ProjectCards)
