import { memo } from 'react'
import { getSeriesMax, toPercent } from '../../utils/chart'

function MiniBarChart({
  data,
  keys,
  labelKey = 'day',
  height = 160,
  barClassNames = [],
}) {
  const max = getSeriesMax(data, keys)

  return (
    <div
      className="flex items-end justify-between gap-2 px-1"
      style={{ height }}
    >
      {data.map((row) => (
        <div
          key={row[labelKey] ?? row.hour}
          className="flex-1 flex flex-col items-center gap-2 h-full"
        >
          <div className="w-full flex items-end justify-center gap-1 flex-1 min-h-0">
            {keys.map((key, i) => (
              <div
                key={key}
                className={`w-full max-w-[14px] rounded-t transition-all duration-500 ${barClassNames[i] ?? 'bg-indigo-500/60'}`}
                style={{ height: `${Math.max(toPercent(row[key], max), 4)}%` }}
              />
            ))}
          </div>
          <span className="text-[10px] text-zinc-600 font-medium shrink-0">
            {row[labelKey]}
          </span>
        </div>
      ))}
    </div>
  )
}

export default memo(MiniBarChart)
