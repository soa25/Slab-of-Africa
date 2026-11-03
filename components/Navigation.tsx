'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { PAGE_PALETTES, getPalette } from '@/lib/pageColors'

// Desktop splits these around the centered logo; mobile shows them in one list
const leftLinks = [
  { href: '/', label: 'New' },
  { href: '/collection', label: 'Collection' },
  { href: '/kadiki', label: 'Kadiki' },
  { href: '/exhibits', label: 'Exhibits' },
]

const rightLinks = [
  { href: '/artists', label: 'Artists' },
  { href: '/journal', label: 'Journal' },
  { href: '/about', label: 'About' },
  { href: '/inquire', label: 'Inquire' },
]

const navLinks = [...leftLinks, ...rightLinks]

const menuVariants = {
  closed: {
    clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  open: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

const linkVariants = {
  closed: { y: 24, opacity: 0 },
  open: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.12 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
}

// ─── Desktop nav link with per-destination coloured underline ────────────
function DesktopNavLink({
  href,
  label,
  isActive,
  isDarkPage,
  hoveredLink,
  onHover,
}: {
  href: string
  label: string
  isActive: boolean
  isDarkPage: boolean
  hoveredLink: string | null
  onHover: (href: string | null) => void
}) {
  const accentColor = '#C1522A'
  const isHovered = hoveredLink === href
  const showUnderline = isActive || isHovered

  const isKadiki = href === '/kadiki'

  const baseColor = isDarkPage ? 'rgba(196,184,170,0.7)' : '#6E5F52'
  const activeColor = isDarkPage ? '#F0E8E0' : '#1C1917'

  return (
    <li>
      <Link
        href={href}
        className={`relative inline-block ${isKadiki ? 'font-kadiki' : 'font-body'}`}
        // Kadiki: italic serif reads small and thin next to the sans links, so it's
        // a touch larger, heavier and tighter
        style={{
          fontSize: isKadiki ? '0.8625rem' : '0.75rem',
          letterSpacing: isKadiki ? '0.02em' : '0.18em',
          textTransform: 'uppercase',
          fontWeight: isKadiki ? 500 : 400,
          fontStyle: isKadiki ? 'italic' : undefined,
          color: isActive ? activeColor : baseColor,
          transition: 'color 0.25s ease',
        }}
        onMouseEnter={() => onHover(href)}
        onMouseLeave={() => onHover(null)}
      >
        {label}

        {/* Animated underline — scaleX instead of width to avoid layout repaints */}
        <motion.span
          className="absolute left-0 block"
          style={{
            bottom: '-2px',
            height: '1px',
            width: '100%',
            backgroundColor: accentColor,
            transformOrigin: 'left center',
          }}
          animate={{ scaleX: showUnderline ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      </Link>
    </li>
  )
}

// ─── Mobile full-screen link with accent-coloured active state ────────────
function MobileNavLink({
  href,
  label,
  index,
  isActive,
  onClose,
}: {
  href: string
  label: string
  index: number
  isActive: boolean
  onClose: () => void
}) {
  const accentColor = '#C1522A'

  return (
    <motion.li
      custom={index}
      variants={linkVariants}
      initial="closed"
      animate="open"
      exit={{ y: 16, opacity: 0, transition: { duration: 0.2 } }}
    >
      <Link
        href={href}
        className={`relative inline-block ${href === '/kadiki' ? 'font-kadiki' : 'font-display'}`}
        style={{
          fontSize: href === '/kadiki' ? 'clamp(2.53rem, 8.05vw, 4.025rem)' : 'clamp(2.2rem, 7vw, 3.5rem)',
          fontWeight: href === '/kadiki' ? 500 : 300,
          fontStyle: href === '/kadiki' ? 'italic' : undefined,
          letterSpacing: href === '/kadiki' ? '0.02em' : '-0.01em',
          lineHeight: 1.15,
          color: isActive ? accentColor : '#E8E0D8',
          transition: 'color 0.2s ease',
        }}
        onClick={onClose}
      >
        {label}
        <motion.span
          className="absolute left-0 block"
          style={{
            bottom: '-2px',
            height: '1px',
            width: '100%',
            backgroundColor: accentColor,
            transformOrigin: 'left center',
          }}
          animate={{ scaleX: isActive ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      </Link>
    </motion.li>
  )
}

// ─── Main Navigation ──────────────────────────────────────────────────────
export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [navHidden, setNavHidden] = useState(false)
  const lastScrollYRef = useRef(0)
  const pathname = usePathname()

  const isMarinPage = pathname === '/marin'
  const currentPalette = getPalette(pathname)
  const isDarkPage = currentPalette.isDark

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-hide nav on scroll down, reveal on scroll up — all pages
  useEffect(() => {
    lastScrollYRef.current = window.scrollY
    const handleScrollDir = () => {
      const y = window.scrollY
      if (y > lastScrollYRef.current && y > 60) {
        setNavHidden(true)
      } else if (y < lastScrollYRef.current) {
        setNavHidden(false)
      }
      lastScrollYRef.current = y
    }
    window.addEventListener('scroll', handleScrollDir, { passive: true })
    return () => window.removeEventListener('scroll', handleScrollDir)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setNavHidden(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrolledBg = isDarkPage
    ? 'rgba(28,23,20,0.96)'
    : (currentPalette.navScrolledBg ?? 'rgba(248,238,222,0.95)')
  const scrolledBorder = isDarkPage
    ? '1px solid rgba(255,255,255,0.06)'
    : '1px solid #E5DDD4'

  const logoColor = !scrolled && isDarkPage ? '#D8CCBF' : '#1C1917'
  const hamColor  = !scrolled && isDarkPage ? '#D8CCBF' : '#1C1917'

  return (
    <>
      <header
        className={`fixed ${isMarinPage ? 'top-0' : 'top-9'} left-0 right-0 z-[100]`}
        style={{
          transition: 'background-color 0.45s ease, border-color 0.45s ease, backdrop-filter 0.45s ease, transform 0.35s ease',
          transform: navHidden ? 'translateY(-100%)' : 'translateY(0)',
          backgroundColor: isMarinPage ? currentPalette.bg : (scrolled ? scrolledBg : 'transparent'),
          borderBottom: isMarinPage ? '1px solid rgba(255,255,255,0.06)' : (scrolled ? scrolledBorder : '1px solid transparent'),
          backdropFilter: !isMarinPage && scrolled ? 'blur(12px)' : 'none',
        }}
      >
        {/* Below 1200px: logo left, hamburger right. From 1200px: equal side columns keep the logo at the true center */}
        <nav className="max-w-7xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between min-[1200px]:grid min-[1200px]:grid-cols-[1fr_auto_1fr] min-[1200px]:gap-10">
          {/* Desktop nav — left of logo */}
          <ul className="hidden min-[1200px]:flex items-baseline justify-end gap-8">
            {leftLinks.map(({ href, label }) => (
              <DesktopNavLink
                key={href}
                href={href}
                label={label}
                isActive={pathname === href}
                isDarkPage={isDarkPage}
                hoveredLink={hoveredLink}
                onHover={setHoveredLink}
              />
            ))}
          </ul>

          {/* Logo */}
          <Link
            href="/"
            className="font-display tracking-widest transition-colors duration-300"
            style={{
              fontSize: '2rem',
              letterSpacing: '0.2em',
              fontWeight: 400,
              color: logoColor,
            }}
          >
            SLAB OF AFRICA
          </Link>

          {/* Desktop nav — right of logo */}
          <ul className="hidden min-[1200px]:flex items-center justify-start gap-8">
            {rightLinks.map(({ href, label }) => (
              <DesktopNavLink
                key={href}
                href={href}
                label={label}
                isActive={pathname === href}
                isDarkPage={isDarkPage}
                hoveredLink={hoveredLink}
                onHover={setHoveredLink}
              />
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="min-[1200px]:hidden relative z-[200] w-10 h-10 flex flex-col items-center justify-center gap-[6px]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {[
              menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 },
              menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 },
              menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 },
            ].map((anim, i) => (
              <motion.span
                key={i}
                className="block w-6 h-px origin-center"
                style={{ backgroundColor: hamColor }}
                animate={anim}
                transition={{ duration: i === 1 ? 0.2 : 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </button>
        </nav>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[150] min-[1200px]:hidden flex flex-col justify-center items-start px-10"
            style={{ backgroundColor: '#1A1612' }}
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={() => setMenuOpen(false)}
          >
            <nav className="relative z-10 w-full" onClick={(e) => e.stopPropagation()}>
              <ul className="space-y-2">
                {navLinks.map(({ href, label }, i) => (
                  <MobileNavLink
                    key={href}
                    href={href}
                    label={label}
                    index={i}
                    isActive={pathname === href}
                    onClose={() => setMenuOpen(false)}
                  />
                ))}
              </ul>

              <motion.div
                className="mt-12 pt-8 flex flex-col gap-3"
                style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <a
                  href="mailto:shaan@slabofafrica.com"
                  className="font-body text-sm tracking-widest uppercase transition-colors"
                  style={{ color: '#7A6A5A', letterSpacing: '0.2em' }}
                >
                  shaan@slabofafrica.com
                </a>
                <a
                  href="https://instagram.com/slabofafrica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm tracking-widest uppercase transition-colors"
                  style={{ color: '#7A6A5A', letterSpacing: '0.2em' }}
                >
                  @slabofafrica
                </a>
              </motion.div>
            </nav>

            {/* Accent dot */}
            <motion.div
              className="absolute bottom-10 right-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: currentPalette.accent }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
