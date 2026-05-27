import { motion } from 'framer-motion'
import PageHeader from '../components/ui/PageHeader'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { FileText, Plus } from 'lucide-react'
import { notes } from '../data/mockData'

export default function Notes() {
  return (
    <div>
      <PageHeader
        title="Notes"
        subtitle="Context-linked knowledge that feeds your intelligence graph."
        action={
          <Button variant="primary" icon={Plus}>
            New note
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {notes.map((note, i) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card hover className="cursor-pointer h-full">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-[var(--color-border)] flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 text-zinc-500" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-zinc-100 line-clamp-1">
                    {note.title}
                  </h3>
                  <p className="text-[11px] text-zinc-600 mt-0.5">
                    {note.updated}
                  </p>
                </div>
              </div>
              <p className="text-xs text-zinc-500 line-clamp-2 mb-3">
                {note.preview}
              </p>
              <div className="flex flex-wrap gap-1">
                {note.tags.map((tag) => (
                  <Badge key={tag} variant="muted">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
