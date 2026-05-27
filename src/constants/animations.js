export const MOTION = {
  duration: {
    fast: 0.18,
    smooth: 0.35,
    slow: 0.6,
  },
  ease: [0.25, 0.1, 0.25, 1],
}

export function getMotionProps(reduced = false) {
  if (reduced) {
    return {
      header: { initial: {}, animate: {}, transition: {} },
      card: { initial: {}, animate: {}, whileHover: {}, transition: {} },
    }
  }

  return {
    header: {
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: MOTION.duration.smooth, ease: MOTION.ease },
    },
    card: {
      initial: { opacity: 0, y: 6 },
      animate: { opacity: 1, y: 0 },
      whileHover: { y: -4 },
      transition: { duration: MOTION.duration.smooth, ease: MOTION.ease },
    },
    statsContainer: {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { staggerChildren: 0.06 } },
    },
    statsItem: { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } },
    projectItem: { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 } },
  }
}
