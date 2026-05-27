import PageHeader from '../components/ui/PageHeader'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { calendarEvents } from '../data/mockData'

const typeStyles = {
  focus: 'accent',
  meeting: 'default',
  ritual: 'success',
}

export default function Calendar() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div>
      <PageHeader
        title="Calendar"
        subtitle="Context-aware scheduling aligned with your focus rhythm."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <p className="text-sm text-zinc-400 mb-6">{today}</p>
          <div className="space-y-3">
            {calendarEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center gap-4 p-4 rounded-lg border border-[var(--color-border)] bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
              >
                <div className="text-center shrink-0 w-16">
                  <p className="text-sm font-semibold text-zinc-200">
                    {event.time}
                  </p>
                  <p className="text-[10px] text-zinc-600">{event.duration}</p>
                </div>
                <div className="h-10 w-px bg-[var(--color-border)]" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-zinc-100">
                    {event.title}
                  </h4>
                  <Badge variant={typeStyles[event.type]} className="mt-2">
                    {event.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
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
