import { ReactNode } from 'react'
import styles from './HomeHeadline.module.css'

const FULL_TEXT = 'The premier destination for timeless Zimbabwean stone sculpture.'

// Homepage <h1>. Pure CSS motion (see the stylesheet): lines slide in from alternating sides on load,
// then drift apart on scroll via a scroll-driven animation. No JavaScript scroll or resize logic.
const LINES: { side: 'left' | 'right'; content: ReactNode }[] = [
  { side: 'left', content: 'The premier destination' },
  {
    side: 'right',
    content: (
      <>
        for <em style={{ fontStyle: 'italic', fontWeight: 300 }}>timeless</em> Zimbabwean
      </>
    ),
  },
  { side: 'left', content: 'stone sculpture.' },
]

export default function HomeHeadline() {
  return (
    <div className={styles.wrap}>
      <h1
        aria-label={FULL_TEXT}
        className={`font-display text-charcoal ${styles.headline}`}
        style={{
          fontWeight: 400,
          lineHeight: 1.08,
          letterSpacing: '-0.01em',
        }}
      >
        {LINES.map((line, i) => (
          <span
            key={i}
            className={`${styles.line} ${line.side === 'left' ? styles.fromLeft : styles.fromRight}`}
          >
            <span className={styles.enter} style={{ animationDelay: `${i * 0.12}s` }}>
              {line.content}
            </span>
          </span>
        ))}
      </h1>
    </div>
  )
}
