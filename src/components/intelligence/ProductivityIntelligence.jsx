import { memo } from 'react'
import Card, { CardHeader } from '../ui/Card'
import ScoreRing from '../ui/ScoreRing'
import PeakHoursChart from './PeakHoursChart'
import {
  intelligenceScores,
  peakHours,
  distractionPatterns,
  workflowBottlenecks,
  scheduleConflicts,
  deepWorkAnalytics,
} from '../../data/productivity'

function ProductivityIntelligence({ compact = false }) {
  if (compact) {
    return (
      <Card>
        <CardHeader
          title="Intelligence pulse"
          subtitle="Focus & productivity scores"
        />
        <div className="grid grid-cols-2 gap-4">
          <ScoreRing
            value={intelligenceScores.focus.value}
            label="Focus"
            size={64}
          />
          <ScoreRing
            value={intelligenceScores.productivity.value}
            label="Productivity"
            size={64}
          />
        </div>
        <div className="mt-5 pt-4 border-t border-[var(--color-border)]">
          <p className="text-[11px] text-zinc-500 mb-2">Peak hours</p>
          <PeakHoursChart data={peakHours} />
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader title="Focus score" subtitle="Weighted attention index" />
          <ScoreRing value={intelligenceScores.focus.value} />
          <p className="text-xs text-emerald-400 mt-2 text-center">
            {intelligenceScores.focus.change} this week
          </p>
        </Card>
        <Card>
          <CardHeader title="Productivity score" subtitle="Output velocity index" />
          <ScoreRing value={intelligenceScores.productivity.value} />
          <p className="text-xs text-emerald-400 mt-2 text-center">
            {intelligenceScores.productivity.change} this week
          </p>
        </Card>
        <Card>
          <CardHeader title="Deep work" subtitle={`${deepWorkAnalytics.streak} day streak`} />
          <p className="text-3xl font-semibold text-zinc-50">
            {deepWorkAnalytics.today}
            <span className="text-lg text-zinc-500 font-normal">h</span>
          </p>
          <div className="mt-3 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
            <div
              className="h-full rounded-full bg-indigo-500"
              style={{
                width: `${(deepWorkAnalytics.today / deepWorkAnalytics.target) * 100}%`,
              }}
            />
          </div>
          <p className="text-[10px] text-zinc-600 mt-1">
            Target {deepWorkAnalytics.target}h
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader title="Peak working hours" subtitle="Focus intensity by hour" />
          <PeakHoursChart data={peakHours} />
        </Card>
        <Card>
          <CardHeader title="Distraction patterns" subtitle="Context switch sources" />
          <ul className="space-y-3">
            {distractionPatterns.map((item) => (
              <li key={item.label} className="flex justify-between items-center text-sm">
                <span className="text-zinc-400">{item.label}</span>
                <span
                  className={`font-medium ${
                    item.severity === 'high'
                      ? 'text-amber-400'
                      : item.severity === 'medium'
                        ? 'text-zinc-300'
                        : 'text-zinc-500'
                  }`}
                >
                  {item.value}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader title="Workflow bottlenecks" subtitle="Blocked or slow paths" />
          <ul className="space-y-3">
            {workflowBottlenecks.map((b) => (
              <li
                key={b.name}
                className="flex justify-between items-center p-3 rounded-lg bg-white/[0.02] border border-[var(--color-border)]"
              >
                <span className="text-sm text-zinc-300">{b.name}</span>
                <span className="text-xs text-amber-400/90">
                  {b.impact} · {b.delay}
                </span>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardHeader title="Schedule conflicts" subtitle="Overlapping commitments" />
          <ul className="space-y-3">
            {scheduleConflicts.map((c) => (
              <li
                key={c.title}
                className="p-3 rounded-lg bg-white/[0.02] border border-[var(--color-border)]"
              >
                <p className="text-sm text-zinc-300">{c.title}</p>
                <p className="text-[11px] text-zinc-600 mt-0.5">{c.date}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}

export default memo(ProductivityIntelligence)
