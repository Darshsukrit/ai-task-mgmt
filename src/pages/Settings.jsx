import PageHeader from '../components/ui/PageHeader'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

const sections = [
  {
    title: 'Profile',
    fields: [
      { label: 'Display name', value: 'Sarah Chen' },
      { label: 'Email', value: 'sarah@contextos.app' },
    ],
  },
  {
    title: 'Intelligence',
    fields: [
      { label: 'Context sync', value: 'Real-time' },
      { label: 'AI insights', value: 'Enabled' },
    ],
  },
  {
    title: 'Appearance',
    fields: [
      { label: 'Theme', value: 'Dark (system)' },
      { label: 'Density', value: 'Comfortable' },
    ],
  },
]

export default function Settings() {
  return (
    <div className="max-w-2xl">
      <PageHeader
        title="Settings"
        subtitle="Configure your context intelligence preferences."
      />

      <div className="space-y-6">
        {sections.map((section) => (
          <Card key={section.title}>
            <h3 className="text-sm font-semibold text-zinc-100 mb-4">
              {section.title}
            </h3>
            <dl className="space-y-4">
              {section.fields.map((field) => (
                <div
                  key={field.label}
                  className="flex items-center justify-between gap-4 py-2 border-b border-[var(--color-border)] last:border-0"
                >
                  <dt className="text-sm text-zinc-500">{field.label}</dt>
                  <dd className="text-sm text-zinc-200">{field.value}</dd>
                </div>
              ))}
            </dl>
          </Card>
        ))}

        <div className="flex gap-3 pt-2">
          <Button variant="primary">Save changes</Button>
          <Button variant="ghost">Cancel</Button>
        </div>
      </div>
    </div>
  )
}
