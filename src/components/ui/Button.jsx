import React from 'react'
import { motion } from 'framer-motion'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'

const variants = {
  primary:
    'bg-[var(--color-accent-dim)] text-white hover:bg-indigo-500 border border-indigo-500/30',
  secondary:
    'bg-white/[0.04] text-zinc-200 hover:bg-white/[0.08] border border-[var(--color-border)]',
  ghost: 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]',
  outline:
    'bg-transparent text-zinc-300 border border-[var(--color-border-strong)] hover:bg-white/[0.04]',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-5 py-2.5 text-sm gap-2',
}

export default function Button({
  children,
  variant = 'secondary',
  size = 'md',
  className = '',
  icon: Icon,
  ...props
}) {
  const reduced = usePrefersReducedMotion()
  const tapProps = reduced ? {} : { whileTap: { scale: 0.98 } }

  return (
    <motion.button
      {...tapProps}
      className={`inline-flex items-center justify-center font-medium rounded-lg motion-smooth cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      {children}
    </motion.button>
  )
}
