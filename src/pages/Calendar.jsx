import { useState, useEffect } from 'react'
import PageHeader from '../components/ui/PageHeader'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import EventForm from '../components/forms/EventForm'
import { Plus, Loader } from 'lucide-react'
import { apiGet } from '../utils/api'

export default function Calendar() {
  const [events, setEvents] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const workspaceId = 1 // TODO: Get from context/auth
  const userId = 1 // TODO: Get from context/auth

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    setLoading(true)
    try {
      const data = await apiGet(`/events?workspace_id=${workspaceId}`)
      // Sort by start_time
      const sorted = (data || []).sort((a, b) => {
        return new Date(a.start_time) - new Date(b.start_time)
      })
      setEvents(sorted)
    } catch (error) {
      console.error('Failed to fetch events:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEventCreated = () => {
    fetchEvents() // Refetch events after creation
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatDuration = (startString, endString) => {
    const start = new Date(startString)
    const end = new Date(endString)
    const minutes = Math.round((end - start) / 60000)
    if (minutes < 60) return `${minutes}m`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins === 0 ? `${hours}h` : `${hours}h ${mins}m`
  }

  return (
    <div>
      <PageHeader
        title="Calendar"
        subtitle="Context-aware scheduling aligned with your focus rhythm."
        action={
          <Button
            variant="primary"
            icon={Plus}
            onClick={() => setIsModalOpen(true)}
          >
            New event
          </Button>
        }
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Event"
        size="lg"
      >
        <EventForm
          workspaceId={workspaceId}
          userId={userId}
          onSubmit={handleEventCreated}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <p className="text-sm text-zinc-400 mb-6">{today}</p>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader className="animate-spin text-zinc-500" size={32} />
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-zinc-400">No events scheduled for today.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center gap-4 p-4 rounded-lg border border-[var(--color-border)] bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                  style={{
                    borderLeftColor: event.color,
                    borderLeftWidth: '3px',
                  }}
                >
                  <div className="text-center shrink-0 w-16">
                    <p className="text-sm font-semibold text-zinc-200">
                      {formatTime(event.start_time)}
                    </p>
                    <p className="text-[10px] text-zinc-600">
                      {formatDuration(event.start_time, event.end_time)}
                    </p>
                  </div>
                  <div className="h-10 w-px bg-[var(--color-border)]" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-zinc-100">
                      {event.title}
                    </h4>
                    {event.location && (
                      <p className="text-xs text-zinc-600 mt-1">
                        📍 {event.location}
                      </p>
                    )}
                    {event.is_all_day && (
                      <Badge variant="accent" className="mt-2">
                        All day
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-zinc-100 mb-2">
            Protected focus
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            CONTEXTOS blocks deep work windows based on your historical focus
            patterns. Tuesday–Thursday mornings are currently protected.
          </p>
        </Card>
      </div>
    </div>
  )
}
