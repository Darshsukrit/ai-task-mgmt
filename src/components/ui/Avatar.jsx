const sizes = {
  sm: 'w-6 h-6 text-[10px]',
  md: 'w-8 h-8 text-xs',
  lg: 'w-10 h-10 text-sm',
}

export default function Avatar({ initials, size = 'md', className = '' }) {
  return (
    <div
      className={`
        ${sizes[size]} rounded-full flex items-center justify-center
        font-medium bg-gradient-to-br from-indigo-500/30 to-violet-500/20
        text-indigo-200 border border-indigo-500/20 shrink-0
        ${className}
      `}
      title={initials}
    >
      {initials}
    </div>
  )
}
