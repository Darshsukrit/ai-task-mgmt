import React from 'react'
import { motion } from 'framer-motion'
import Button from './Button'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'
import { getMotionProps } from '../../constants/animations'

function PageHeader({ title, subtitle, action, actionLabel, onAction }) {
  const reduced = usePrefersReducedMotion()
  const motionProps = getMotionProps(reduced)

  return (
    <motion.header {...motionProps.header} className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-50">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-zinc-500 mt-1.5 max-w-xl">{subtitle}</p>
          )}
        </div>
        {(action || actionLabel) && (
          <div className="shrink-0">
            {action ?? (
              <Button variant="primary" onClick={onAction}>
                {actionLabel}
              </Button>
            )}
          </div>
        )}
      </div>
    </motion.header>
  )
}

export default React.memo(PageHeader)
