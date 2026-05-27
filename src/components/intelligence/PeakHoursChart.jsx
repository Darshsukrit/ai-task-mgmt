import { memo } from 'react'
import { getSeriesMax, toPercent } from '../../utils/chart'

function PeakHoursChart({ data }) {
  const max = getSeriesMax(data, ['value'])

  return (
    <div className="space-y-2">
      <div className="flex items-end gap-1 h-20">
        {data.map((row) => (
          <div key={row.hour} className="flex-1 flex flex-col items-center gap-1 h-full">
            <div
              className="w-full max-w-[12px] rounded-t bg-gradient-to-t from-indigo-600/70 to-indigo-400/30 transition-all duration-500"
              style={{ height: `${Math.max(toPercent(row.value, max), 8)}%` }}
              title={`${row.value}% focus`}
            />
            <span className="text-[9px] text-zinc-600">{row.hour}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(PeakHoursChart)
