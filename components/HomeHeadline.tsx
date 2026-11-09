'use client'

import { ReactNode } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import styles from './HomeHeadline.module.css'

const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]
const FULL_TEXT = 'The premier destination for timeless Zimbabwean stone sculpture.'
const DRIFT = 24 // px

// Homepage <h1>: lines slide up out of masks on load and drift apart as the page scrolls.
// Transform only.
export default function HomeHeadline() {
  // Drift follows page scroll from the top, so nothing is offset on load
  const { scrollY } = useScroll()
  const driftLeft = useTransform(scrollY, [0, 500], [0, -DRIFT], { clamp: true })
  const driftRight = useTransform(scrollY, [0, 500], [0, DRIFT], { clamp: true })

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
        className="font-display text-charcoal"
        style={{
          fontSize: 'clamp(2rem, 4.5vw, 4rem)',
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
