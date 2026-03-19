'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getPalette } from '@/lib/pageColors'

export default function Footer() {
  const pathname = usePathname()
  const { bg, isDark, accent } = getPalette(pathname)

  // Derive footer colours from page palette
  const footerBg    = isDark ? '#161210' : bg            // slightly darker than page on dark; same on light
  const borderColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'
  const logoColor   = isDark ? '#D8CCBF' : '#1C1917'
  const mutedColor  = isDark ? '#6A5A4A' : '#6E5F52'
  const hoverColor  = accent

  return (
    <footer
      className="hidden md:block"
      style={{
        backgroundColor: footerBg,
        borderTop: `1px solid ${borderColor}`,
        transition: 'background-color 0.55s ease, border-color 0.55s ease',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p
              className="font-display text-2xl mb-1"
              style={{ letterSpacing: '0.22em', color: logoColor }}
            >
              SLAB OF AFRICA
            </p>
            <p className="font-body text-xs tracking-widest uppercase" style={{ color: mutedColor }}>
              Shona Stone Sculpture · San Francisco
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 font-body text-xs tracking-widest uppercase" style={{ color: mutedColor }}>
            {[
              { href: 'mailto:shaan@slabofafrica.com', label: 'shaan@slabofafrica.com', external: false },
              { href: 'https://instagram.com/slabofafrica', label: '@slabofafrica', external: true },
              { href: '/inquire', label: 'Inquire', external: false },
            ].map(({ href, label, external }) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="link-underline transition-colors duration-200"
                style={{ color: mutedColor }}
                onMouseEnter={(e) => (e.currentTarget.style.color = hoverColor)}
                onMouseLeave={(e) => (e.currentTarget.style.color = mutedColor)}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div style={{ width: '100%', height: '1px', backgroundColor: borderColor, margin: '2.5rem 0 1.5rem' }} />

        <p className="font-body text-xs" style={{ color: mutedColor }}>
          © {new Date().getFullYear()} Slab of Africa. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
