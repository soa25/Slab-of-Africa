'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const THEME_COLORS: Record<string, string> = {
  '/':           '#FAF0E2',
  '/collection': '#D9CEBE',
  '/artists':    '#C4C0BA',
  '/fairs':      '#DDD0BA',
  '/about':      '#F2E6D8',
  '/inquire':    '#231E1A',
}

export default function ThemeColor() {
  const pathname = usePathname()

  useEffect(() => {
    const color = THEME_COLORS[pathname] ?? '#FAF0E2'
    let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'theme-color'
      document.head.appendChild(meta)
    }
    meta.content = color
  }, [pathname])

  return null
}
