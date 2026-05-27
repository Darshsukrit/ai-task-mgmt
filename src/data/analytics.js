export const analyticsSeries = [
  { day: 'Mon', focus: 72, context: 68, productivity: 70 },
  { day: 'Tue', focus: 88, context: 82, productivity: 85 },
  { day: 'Wed', focus: 91, context: 85, productivity: 89 },
  { day: 'Thu', focus: 86, context: 90, productivity: 84 },
  { day: 'Fri', focus: 74, context: 78, productivity: 76 },
  { day: 'Sat', focus: 45, context: 52, productivity: 48 },
  { day: 'Sun', focus: 38, context: 48, productivity: 42 },
]

export const workflowHealth = [
  { label: 'Auth pipeline', health: 42, status: 'critical' },
  { label: 'Launch HQ', health: 78, status: 'healthy' },
  { label: 'Engineering sprint', health: 65, status: 'watch' },
  { label: 'Fundraise context', health: 88, status: 'healthy' },
]

export const relationshipMetrics = {
  totalLinks: 48,
  activeDependencies: 7,
  resolvedThisWeek: 12,
  avgLinkageDepth: 3.2,
}

export const deadlineTrends = [
  { week: 'W1', onTrack: 8, atRisk: 2, overdue: 0 },
  { week: 'W2', onTrack: 7, atRisk: 3, overdue: 1 },
  { week: 'W3', onTrack: 9, atRisk: 2, overdue: 0 },
  { week: 'W4', onTrack: 6, atRisk: 4, overdue: 1 },
]

export const performanceInsights = [
  { label: 'Tasks completed', value: '24', change: '+18%' },
  { label: 'Avg resolution time', value: '1.4d', change: '-12%' },
  { label: 'Context accuracy', value: '94%', change: '+3%' },
]

export const focusAnalytics = {
  avgScore: 76,
  peakDay: 'Wed',
  bestWindow: '9–12 AM',
  distractionRate: 12,
}
