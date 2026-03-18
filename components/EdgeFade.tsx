'use client'

import { usePathname } from 'next/navigation'

const PAGE_COLORS: Record<string, string> = {
  '/':           '#FAF0E2',
  '/collection': '#D9CEBE',
  '/fairs':      '#DDD0BA',
  '/about':      '#F2E6D8',
  '/inquire':    '#231E1A',
}

export default function EdgeFade() {
  const pathname = usePathname()
  const color = PAGE_COLORS[pathname] ?? '#FAF0E2'

  const base: React.CSSProperties = {
    position: 'fixed',
    left: 0,
    right: 0,
    height: 60,
    pointerEvents: 'none',
    zIndex: 50,
  }

  return (
    <>
      <div
        className="md:hidden"
        style={{ ...base, top: 0, background: `linear-gradient(to bottom, ${color}, transparent)` }}
      />
      <div
        className="md:hidden"
        style={{ ...base, bottom: 0, background: `linear-gradient(to top, ${color}, transparent)` }}
      />
    </>
  )
}
