const variants = {
  default: 'bg-white/[0.06] text-zinc-300 border-[var(--color-border)]',
  accent: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
  success: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  warning: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
  muted: 'bg-transparent text-zinc-500 border-transparent',
}

export default function Badge({ children, variant = 'default', className = '' }) {
  return (
    <span
      className={`
        inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium
        border ${variants[variant]} ${className}
      `}
    >
      {children}
    </span>
  )
}
