'use client'

import { useEffect, useRef } from 'react'
import { useAnimationFrame } from 'framer-motion'
import Lenis from 'lenis'

// Drives Lenis via Framer Motion's internal RAF scheduler so both share one loop.
function LenisDriver() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 0.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    return () => {
      lenisRef.current?.destroy()
      lenisRef.current = null
    }
  }, [])

  // Framer Motion's useAnimationFrame hooks into its own internal scheduler —
  // no second requestAnimationFrame loop needed.
  useAnimationFrame((time) => {
    lenisRef.current?.raf(time)
  })

  return null
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <LenisDriver />
      {children}
    </>
  )
}
