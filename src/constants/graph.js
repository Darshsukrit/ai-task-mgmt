export const GRAPH_CATEGORIES = [
  'project',
  'task',
  'workflow',
  'file',
  'habit',
  'schedule',
  'deadline',
  'pattern',
]

export const CATEGORY_STYLES = {
  project: {
    border: 'border-indigo-500/35',
    bg: 'bg-indigo-500/10',
    glow: 'shadow-[0_0_24px_-8px_rgba(99,102,241,0.35)]',
    dot: 'bg-indigo-400',
  },
  task: {
    border: 'border-sky-500/35',
    bg: 'bg-sky-500/10',
    glow: 'shadow-[0_0_20px_-8px_rgba(56,189,248,0.3)]',
    dot: 'bg-sky-400',
  },
  workflow: {
    border: 'border-violet-500/35',
    bg: 'bg-violet-500/10',
    glow: 'shadow-[0_0_24px_-8px_rgba(139,92,246,0.3)]',
    dot: 'bg-violet-400',
  },
  file: {
    border: 'border-emerald-500/35',
    bg: 'bg-emerald-500/10',
    glow: 'shadow-[0_0_20px_-8px_rgba(52,211,153,0.25)]',
    dot: 'bg-emerald-400',
  },
  habit: {
    border: 'border-teal-500/35',
    bg: 'bg-teal-500/10',
    glow: 'shadow-[0_0_20px_-8px_rgba(45,212,191,0.25)]',
    dot: 'bg-teal-400',
  },
  schedule: {
    border: 'border-amber-500/35',
    bg: 'bg-amber-500/10',
    glow: 'shadow-[0_0_20px_-8px_rgba(251,191,36,0.25)]',
    dot: 'bg-amber-400',
  },
  deadline: {
    border: 'border-rose-500/35',
    bg: 'bg-rose-500/10',
    glow: 'shadow-[0_0_24px_-8px_rgba(251,113,133,0.35)]',
    dot: 'bg-rose-400',
  },
  pattern: {
    border: 'border-fuchsia-500/35',
    bg: 'bg-fuchsia-500/10',
    glow: 'shadow-[0_0_20px_-8px_rgba(232,121,249,0.25)]',
    dot: 'bg-fuchsia-400',
  },
}

export const EDGE_STYLES = {
  default: { stroke: 'rgba(129, 140, 248, 0.35)', strokeWidth: 1.5 },
  dependency: { stroke: 'rgba(129, 140, 248, 0.55)', strokeWidth: 2 },
  blocks: { stroke: 'rgba(251, 113, 133, 0.5)', strokeWidth: 2 },
  relates: { stroke: 'rgba(161, 161, 170, 0.25)', strokeWidth: 1 },
}

export const CATEGORY_LABELS = {
  project: 'Project',
  task: 'Task',
  workflow: 'Workflow',
  file: 'File',
  habit: 'Habit',
  schedule: 'Schedule',
  deadline: 'Deadline',
  pattern: 'Pattern',
}
