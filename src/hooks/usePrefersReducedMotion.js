import { useEffect, useState } from 'react'

export default function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handle = () => setReduced(!!mq.matches)
    handle()
    try {
      mq.addEventListener('change', handle)
      return () => mq.removeEventListener('change', handle)
    } catch (e) {
      mq.addListener(handle)
      return () => mq.removeListener(handle)
    }
  }, [])

  return reduced
}
