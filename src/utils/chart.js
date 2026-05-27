export function getSeriesMax(data, keys) {
  if (!data.length) return 1
  return Math.max(...data.flatMap((row) => keys.map((key) => row[key] ?? 0)), 1)
}

export function toPercent(value, max) {
  if (!max) return 0
  return Math.round((value / max) * 100)
}

export function average(data, key) {
  if (!data.length) return 0
  return Math.round(data.reduce((sum, row) => sum + row[key], 0) / data.length)
}
