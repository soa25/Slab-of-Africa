'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const TITLE = 'SLAB OF AFRICA'
const CHAR_DELAY = 80  // ms per character
const HOLD = 800       // ms to hold after last character
const FADE = 420       // ms fade-out duration

export default function IntroAnimation() {
  const [visible, setVisible] = useState(false)
  const [revealed, setRevealed] = useState(0)
  const [cursorOn, setCursorOn] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const KEY = 'slab-intro-seen'
    if (sessionStorage.getItem(KEY)) return

    sessionStorage.setItem(KEY, '1')
    setVisible(true)

    let count = 0
    let alive = true
    const pending: ReturnType<typeof setTimeout>[] = []

    const iv = setInterval(() => {
      if (!alive) return
      count++
      setRevealed(count)

      if (count >= TITLE.length) {
        clearInterval(iv)

        const t1 = setTimeout(() => {
          if (!alive) return
          setCursorOn(false)
        }, 300)

        const t2 = setTimeout(() => {
          if (!alive) return
          setFading(true)

          const t3 = setTimeout(() => {
            if (!alive) return
            setVisible(false)
          }, FADE + 60)
          pending.push(t3)
        }, HOLD)

        pending.push(t1, t2)
      }
    }, CHAR_DELAY)

    return () => {
      alive = false
      clearInterval(iv)
      pending.forEach(clearTimeout)
      sessionStorage.removeItem(KEY)
      setVisible(false)
      setRevealed(0)
      setFading(false)
      setCursorOn(true)
    }
  }, [])

  if (!visible) return null

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        background: 'radial-gradient(ellipse at center, #111009 0%, #0C0A09 70%)',
        pointerEvents: fading ? 'none' : 'all',
      }}
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: FADE / 1000, ease: 'easeInOut' }}
    >
      <div className="select-none px-6">
        <div
          className="font-display"
          style={{
            fontSize: 'clamp(2.2rem, 7vw, 6.5rem)',
            fontWeight: 300,
            letterSpacing: '0.28em',
            color: '#F4EFE6',
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {TITLE.split('').map((char, i) => (
            <span
              key={i}
              style={{
                visibility: i < revealed ? 'visible' : 'hidden',
                display: 'inline-block',
                minWidth: char === ' ' ? '0.3em' : undefined,
              }}
            >
              {char}
            </span>
          ))}

          {/* Blinking terracotta cursor */}
          <motion.span
            style={{
              display: 'inline-block',
              width: '2px',
              height: '0.7em',
              backgroundColor: '#C1522A',
              marginLeft: '0.1em',
              flexShrink: 0,
              alignSelf: 'center',
            }}
            animate={{ opacity: cursorOn ? [1, 1, 0, 0] : 0 }}
            transition={
              cursorOn
                ? { duration: 0.8, times: [0, 0.5, 0.5, 1], repeat: Infinity, ease: 'linear' }
                : { duration: 0.15 }
            }
          />
        </div>
      </div>
    </motion.div>
  )
}
