import { motion } from 'framer-motion'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'

export default function Card({
  children,
  className = '',
  hover = false,
  padding = 'md',
  ...props
}) {
  const paddingClass = {
    none: '',
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
  }[padding]

  const baseClass = `glass-panel rounded-xl ${paddingClass} ${className}`

  if (hover) {
    const reduced = usePrefersReducedMotion()
    const hoverProps = reduced ? {} : { whileHover: { y: -2 }, transition: { duration: 0.2 } }
    return (
      <motion.div className={`${baseClass} motion-smooth`} {...hoverProps} {...props}>
        {children}
      </motion.div>
    )
  }

  return (
    <div className={baseClass} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-4">
      <div>
        {title && (
          <h3 className="text-sm font-semibold text-zinc-100 tracking-tight">
            {title}
          </h3>
        )}
        {subtitle && (
          <p className="text-xs text-zinc-500 mt-0.5">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  )
}
