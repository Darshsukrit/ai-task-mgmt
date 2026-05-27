export { contextGraphNodes, contextGraphEdges, graphSummary } from './graph'
export { insights } from './insights'
export { activities } from './activity'
export {
  intelligenceScores,
  peakHours,
  distractionPatterns,
  workflowBottlenecks,
  scheduleConflicts,
  deepWorkAnalytics,
  productivityMetrics,
} from './productivity'
export {
  analyticsSeries,
  workflowHealth,
  relationshipMetrics,
  deadlineTrends,
  performanceInsights,
  focusAnalytics,
} from './analytics'

export const stats = [
  {
    id: 'context-depth',
    label: 'Context Depth',
    value: '94%',
    change: '+12%',
    trend: 'up',
    description: 'Cross-domain linkage score',
  },
  {
    id: 'active-threads',
    label: 'Active Threads',
    value: '28',
    change: '+4',
    trend: 'up',
    description: 'Open context streams',
  },
  {
    id: 'focus-score',
    label: 'Focus Score',
    value: '87',
    change: '+6',
    trend: 'up',
    description: 'Weighted attention index',
  },
  {
    id: 'sync-latency',
    label: 'Sync Latency',
    value: '42ms',
    change: '-8ms',
    trend: 'up',
    description: 'Real-time context refresh',
  },
]

export const projects = [
  {
    id: 1,
    name: 'Product Launch HQ',
    description: 'Unified context for GTM, eng, and design',
    progress: 72,
    contextNodes: 48,
    members: ['SC', 'MC', 'JL'],
    status: 'active',
    color: 'indigo',
  },
  {
    id: 2,
    name: 'Series A Narrative',
    description: 'Investor story, metrics, and milestone map',
    progress: 58,
    contextNodes: 31,
    members: ['SC', 'AK'],
    status: 'active',
    color: 'violet',
  },
  {
    id: 3,
    name: 'Personal Operating System',
    description: 'Life admin, health, and learning contexts',
    progress: 41,
    contextNodes: 22,
    members: ['SC'],
    status: 'steady',
    color: 'emerald',
  },
  {
    id: 4,
    name: 'Engineering Sprint 24',
    description: 'Sprint goals linked to product roadmap',
    progress: 89,
    contextNodes: 19,
    members: ['JL', 'DK', 'MC'],
    status: 'closing',
    color: 'amber',
  },
]

export const workspaces = [
  { id: 'launch', name: 'Product Launch', threads: 12, updated: '2h ago' },
  { id: 'fundraise', name: 'Fundraise', threads: 8, updated: '1d ago' },
  { id: 'personal', name: 'Life OS', threads: 6, updated: '3d ago' },
  { id: 'eng', name: 'Engineering', threads: 15, updated: '4h ago' },
]

export const goals = [
  {
    id: 1,
    title: 'Close Series A',
    progress: 65,
    due: 'Jun 30',
    contexts: ['Fundraise', 'Product'],
    priority: 'high',
  },
  {
    id: 2,
    title: 'Ship v2.0 public beta',
    progress: 78,
    due: 'May 28',
    contexts: ['Launch HQ', 'Engineering'],
    priority: 'high',
  },
  {
    id: 3,
    title: 'Establish weekly review ritual',
    progress: 40,
    due: 'Ongoing',
    contexts: ['Life OS'],
    priority: 'medium',
  },
]

export const notes = [
  {
    id: 1,
    title: 'Investor call — key objections',
    preview: 'Market timing, competitive moat, unit economics...',
    updated: 'Today',
    tags: ['Fundraise'],
  },
  {
    id: 2,
    title: 'Launch narrative v3',
    preview: 'Problem → insight → solution → proof...',
    updated: 'Yesterday',
    tags: ['Launch'],
  },
  {
    id: 3,
    title: 'Context graph mental model',
    preview: 'Nodes = entities, edges = relationships, weights = relevance...',
    updated: '3d ago',
    tags: ['Product'],
  },
]

export const calendarEvents = [
  { id: 1, title: 'Deep work block', time: '9:00 AM', duration: '2h', type: 'focus' },
  { id: 2, title: 'Investor sync', time: '2:00 PM', duration: '45m', type: 'meeting' },
  { id: 3, title: 'Context review', time: '4:30 PM', duration: '30m', type: 'ritual' },
]

export const navItems = [
  { path: '/', label: 'Dashboard', icon: 'LayoutDashboard' },
  { path: '/workspace', label: 'Workspace', icon: 'Layers' },
  { path: '/context-graph', label: 'Context Graph', icon: 'GitBranch' },
  { path: '/analytics', label: 'Analytics', icon: 'BarChart3' },
  { path: '/goals', label: 'Goals', icon: 'Target' },
  { path: '/calendar', label: 'Calendar', icon: 'Calendar' },
  { path: '/notes', label: 'Notes', icon: 'FileText' },
  { path: '/settings', label: 'Settings', icon: 'Settings' },
]
