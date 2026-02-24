'use client'

import { usePathname } from 'next/navigation'
import { getPalette } from '@/lib/pageColors'

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { bg } = getPalette(pathname)

  return (
    <>
      {/*
        Curtain — a solid panel the colour of the incoming page.
        Starts covering the viewport (translateY 0), then sweeps upward
        (translateY -100%) to reveal the page underneath.
        The brief moment before it moves = the "solid colour flash" the
        user sees between pages, grounding the transition in the new room.
      */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9998,
          backgroundColor: bg,
          pointerEvents: 'none',
          willChange: 'transform',
          animation: 'page-curtain 0.42s cubic-bezier(0.25, 0, 0, 1) 0.03s both',
        }}
      />

      {/*
        Content — stays hidden during the curtain's opening moment,
        then lifts in smoothly as the curtain retreats.
      */}
      <div
        style={{
          willChange: 'opacity, transform',
          animation: 'page-content 0.3s ease-out 0.12s both',
        }}
      >
        {children}
      </div>
    </>
  )
}
