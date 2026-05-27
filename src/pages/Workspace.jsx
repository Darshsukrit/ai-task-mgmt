import { motion } from 'framer-motion'
import { FolderOpen, Plus, ChevronRight } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { workspaces } from '../data/mockData'

export default function Workspace() {
  return (
    <div>
      <PageHeader
        title="Workspace"
        subtitle="Organize context streams across work and life domains."
        action={
          <Button variant="primary" icon={Plus}>
            New workspace
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {workspaces.map((ws, i) => (
            <motion.div
              key={ws.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                hover
                className="flex items-center justify-between gap-4 cursor-pointer group"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                    <FolderOpen className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-zinc-100">
                      {ws.name}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      {ws.threads} active threads · Updated {ws.updated}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 shrink-0 transition-colors" />
              </Card>
            </motion.div>
          ))}
        </div>

        <Card>
          <h3 className="text-sm font-semibold text-zinc-100 mb-2">
            Workspace intelligence
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed mb-4">
            Each workspace is a bounded context domain. Threads connect goals,
            notes, and artifacts into a coherent narrative.
          </p>
          <div className="space-y-2">
            <Badge variant="accent">4 workspaces</Badge>
            <Badge variant="default">41 total threads</Badge>
          </div>
        </Card>
      </div>
    </div>
  )
}
