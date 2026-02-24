'use client'

import { ReactNode, useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'

// ─── Shared singleton IntersectionObserver ────────────────────────────────
// All ScrollReveal instances register here instead of each creating their own.
type IOCallback = () => void
const callbackMap = new Map<Element, IOCallback>()
let sharedIO: IntersectionObserver | null = null

function getIO(): IntersectionObserver {
  if (sharedIO) return sharedIO
  sharedIO = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const cb = callbackMap.get(entry.target)
          if (cb) {
            cb()
            // Once fired, stop watching this element
            sharedIO!.unobserve(entry.target)
            callbackMap.delete(entry.target)
          }
        }
      }
    },
    { rootMargin: '-80px' }
  )
  return sharedIO
}

// Premium expo-out — fast initial move that tapers to a silky stop
const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  // Legacy props kept for API compat
  duration?: number
  y?: number
  once?: boolean
}

export default function ScrollReveal({ children, className = '', delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    callbackMap.set(el, () => {
      controls.start({ opacity: 1, y: 0 })
    })
    getIO().observe(el)

    return () => {
      getIO().unobserve(el)
      callbackMap.delete(el)
    }
  }, [controls])

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={controls}
      transition={{ duration: 0.7, ease: EXPO_OUT, delay }}
    >
      {children}
    </motion.div>
  )
}

// Passthrough — keeps API compat for any callers that use ScrollRevealGroup
export function ScrollRevealGroup({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
  stagger?: number
  containerDelay?: number
}) {
  return <div className={className}>{children}</div>
}
