import Card, { CardHeader } from '../ui/Card'
import { deadlineTrends } from '../../data/analytics'
import { getSeriesMax, toPercent } from '../../utils/chart'

export default function DeadlineTrends() {
  const max = getSeriesMax(deadlineTrends, ['onTrack', 'atRisk', 'overdue'])

  return (
    <Card>
      <CardHeader title="Deadline trends" subtitle="4-week delivery outlook" />
      <div className="flex items-end gap-3 h-36">
        {deadlineTrends.map((week) => (
          <div key={week.week} className="flex-1 flex flex-col items-center gap-2 h-full">
            <div className="flex items-end justify-center gap-0.5 w-full flex-1">
              <div
                className="w-full max-w-3 rounded-t bg-emerald-500/70"
                style={{ height: `${toPercent(week.onTrack, max)}%` }}
              />
              <div
                className="w-full max-w-3 rounded-t bg-amber-500/70"
                style={{ height: `${toPercent(week.atRisk, max)}%` }}
              />
              <div
                className="w-full max-w-3 rounded-t bg-rose-500/70"
                style={{ height: `${toPercent(week.overdue, max)}%` }}
              />
            </div>
            <span className="text-[10px] text-zinc-600">{week.week}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-4 text-[10px] text-zinc-500">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-sm bg-emerald-500/70" /> On track
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-sm bg-amber-500/70" /> At risk
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-sm bg-rose-500/70" /> Overdue
        </span>
      </div>
    </Card>
  )
}
