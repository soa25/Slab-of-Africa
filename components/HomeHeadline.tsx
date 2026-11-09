'use client'

import { ReactNode, useEffect } from 'react'
import { motion, useMotionValue, useScroll, useTransform, MotionValue } from 'framer-motion'
import styles from './HomeHeadline.module.css'

const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]
const FULL_TEXT = 'The premier destination for timeless Zimbabwean stone sculpture.'
const DRIFT_DESKTOP = 24 // px
const DRIFT_MOBILE = 14 // px, under 768px

// Homepage <h1>: lines slide up out of masks on load and drift apart as the page scrolls.
// Transform only.
export default function HomeHeadline() {
  // Drift amount depends on viewport width, set on load and on resize
  const drift = useMotionValue(DRIFT_DESKTOP)
  useEffect(() => {
    const update = () => drift.set(window.innerWidth < 768 ? DRIFT_MOBILE : DRIFT_DESKTOP)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [drift])

  // Drift follows native page scroll (works the same for touch and wheel), from the top so nothing is offset on load
  const { scrollY } = useScroll()
  const progress = useTransform(scrollY, [0, 500], [0, 1], { clamp: true })
  const driftLeft = useTransform(() => -progress.get() * drift.get())
  const driftRight = useTransform(() => progress.get() * drift.get())

  const lines: { x: MotionValue<number>; content: ReactNode }[] = [
    { x: driftLeft, content: 'The premier destination' },
    {
      x: driftRight,
      content: (
        <>
          for <em style={{ fontStyle: 'italic', fontWeight: 300 }}>timeless</em> Zimbabwean
        </>
      ),
    },
    { x: driftLeft, content: 'stone sculpture.' },
  ]

  return (
    <div>
      <h1
        aria-label={FULL_TEXT}
        className={`font-display text-charcoal ${styles.headline}`}
        style={{
          fontWeight: 400,
          lineHeight: 1.08,
          letterSpacing: '-0.01em',
        }}
      >
        {lines.map((line, i) => (
          <motion.span key={i} className={styles.drift} style={{ x: line.x }}>
            <span className={styles.mask}>
              <motion.span
                className={styles.line}
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: EXPO_OUT, delay: i * 0.12 }}
              >
                {line.content}
              </motion.span>
            </span>
          </motion.span>
        ))}
      </h1>
    </div>
  )
}
