import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PageHeader from '../components/ui/PageHeader'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import NoteForm from '../components/forms/NoteForm'
import { FileText, Plus, Loader } from 'lucide-react'
import { apiGet } from '../utils/api'

export default function Notes() {
  const [notes, setNotes] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const workspaceId = 1 // TODO: Get from context/auth
  const userId = 1 // TODO: Get from context/auth

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    setLoading(true)
    try {
      const data = await apiGet(`/notes?workspace_id=${workspaceId}`)
      setNotes(data || [])
    } catch (error) {
      console.error('Failed to fetch notes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleNoteCreated = () => {
    fetchNotes() // Refetch notes after creation
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div>
      <PageHeader
        title="Notes"
        subtitle="Context-linked knowledge that feeds your intelligence graph."
        action={
          <Button
            variant="primary"
            icon={Plus}
            onClick={() => setIsModalOpen(true)}
          >
            New note
          </Button>
        }
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Note"
        size="md"
      >
        <NoteForm
          workspaceId={workspaceId}
          userId={userId}
          onSubmit={handleNoteCreated}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader className="animate-spin text-zinc-500" size={32} />
        </div>
      ) : notes.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <p className="text-zinc-400">No notes yet. Create your first note!</p>
        </div>
      ) : (
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
                      {formatDate(note.created_at)}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-zinc-500 line-clamp-2 mb-3">
                  {note.content}
                </p>
                {note.tags && note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {note.tags.map((tag) => (
                      <Badge key={tag} variant="muted">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
