'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function ExhibitionBanner() {
  const pathname = usePathname()
  if (pathname === '/marin') return null
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[110]"
      style={{
        backgroundColor: '#1C1510',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="flex items-center gap-3 px-4 w-full justify-center" style={{ minWidth: 0 }}>
        {/* Label */}
        <span
          className="hidden sm:inline shrink-0"
          style={{
            fontFamily: 'var(--font-jost)',
            fontSize: '0.6rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#6E5F52',
            fontWeight: 500,
          }}
        >
          Now Showing
        </span>

        <span className="hidden sm:inline" style={{ color: 'rgba(255,255,255,0.1)', fontSize: '0.75rem' }}>·</span>

        {/* Title — Cormorant serif */}
        <span
          className="shrink truncate"
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: '0.9rem',
            fontWeight: 400,
            letterSpacing: '0.02em',
            color: '#D4C4B0',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          Gift Rusere at West Portal Gallery — San Francisco, California
        </span>

        <span className="shrink-0" style={{ color: 'rgba(255,255,255,0.1)', fontSize: '0.75rem' }}>·</span>

        {/* CTA */}
        <Link
          href="/exhibits#west-portal"
          onClick={() => {
            // Already on /exhibits — a hash-only change doesn't remount the tile, so tell it directly
            if (pathname === '/exhibits') window.dispatchEvent(new CustomEvent('open-exhibit', { detail: 'west-portal' }))
          }}
          className="shrink-0 exhibition-banner-link"
          style={{
            fontFamily: 'var(--font-jost)',
            fontSize: '0.65rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#C1522A',
            fontWeight: 400,
            whiteSpace: 'nowrap',
          }}
        >
          View Exhibition →
        </Link>
        <style>{`.exhibition-banner-link { transition: color 0.2s ease; } .exhibition-banner-link:hover { color: #D4714A !important; }`}</style>
      </div>
    </div>
  )
}
