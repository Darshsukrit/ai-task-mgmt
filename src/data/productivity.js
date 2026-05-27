export const intelligenceScores = {
  focus: { value: 87, change: '+6', trend: 'up' },
  productivity: { value: 82, change: '+4', trend: 'up' },
}

export const peakHours = [
  { hour: '6a', value: 22 },
  { hour: '8a', value: 58 },
  { hour: '9a', value: 91 },
  { hour: '10a', value: 88 },
  { hour: '11a', value: 85 },
  { hour: '12p', value: 62 },
  { hour: '2p', value: 54 },
  { hour: '4p', value: 48 },
  { hour: '6p', value: 30 },
]

export const distractionPatterns = [
  { label: 'Slack/context switches', value: 12, severity: 'medium' },
  { label: 'Meeting fragmentation', value: 8, severity: 'low' },
  { label: 'Tab overload', value: 15, severity: 'high' },
]

export const workflowBottlenecks = [
  { name: 'Auth workflow', impact: 'high', delay: '2d' },
  { name: 'Code review queue', impact: 'medium', delay: '4h' },
]

export const scheduleConflicts = [
  { title: 'Beta ship vs investor prep', date: 'May 28', severity: 'high' },
  { title: 'Overlapping deep work blocks', date: 'May 22', severity: 'medium' },
]

export const deepWorkAnalytics = {
  today: 4.2,
  target: 5,
  streak: 3,
  weeklyHours: [3.8, 4.5, 5.1, 4.2, 3.9, 1.2, 0.8],
}

export const productivityMetrics = [
  { label: 'Deep work', value: 4.2, unit: 'h', target: 5, color: 'indigo' },
  { label: 'Context switches', value: 12, unit: '', target: 8, color: 'amber' },
  { label: 'Threads resolved', value: 7, unit: '', target: 10, color: 'emerald' },
]
