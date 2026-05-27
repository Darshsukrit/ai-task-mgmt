import { useEffect, useRef, useState } from 'react'

export default function useIntersectionObserver(options = {}) {
  const ref = useRef(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => setIsIntersecting(e.isIntersecting))
    }, options)

    obs.observe(el)
    return () => obs.disconnect()
  }, [ref, JSON.stringify(options)])

  return [ref, isIntersecting]
}
