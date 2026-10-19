'use client'

import { useEffect, useState, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'
import { collection } from '@/lib/data'

const PHOTOS = [
  '/images/fairs/Art-fair-mont/GCS-Art-Fairmont-20260118_0082.jpg',
  '/images/fairs/Art-fair-mont/GCS-Art-Fairmont-20260118_0102.jpg',
  '/images/fairs/Art-fair-mont/GCS-Art-Fairmont-20260118_0130.jpg',
  '/images/fairs/Art-fair-mont/GCS-Art-Fairmont-20260118_0139.jpg',
]

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

// ─── Tile themes ──────────────────────────────────────────────────────────
type Theme = { text: string; muted: string; faint: string }

const MARIN: Theme = {
  text: '#FAF0E2',
  muted: 'rgba(250,240,226,0.72)',
  faint: 'rgba(250,240,226,0.42)',
}

const PERIWINKLE: Theme = {
  text: '#FFFFFF',
  muted: 'rgba(255,255,255,0.8)',
  faint: 'rgba(255,255,255,0.55)',
}

const CREAM: Theme = {
  text: '#1C1917',
  muted: 'rgba(28,25,23,0.68)',
  faint: 'rgba(28,25,23,0.4)',
}

// Forest green — matches the /marin page background
const MARIN_BG = '#2C3B2D'

// Soft periwinkle → lavender, with a faint light bloom so the tone shifts
const PERIWINKLE_BG =
  'radial-gradient(ellipse at 15% 10%, rgba(255,255,255,0.18), transparent 55%), ' +
  'radial-gradient(ellipse at 90% 100%, rgba(155,143,232,0.9), transparent 60%), ' +
  'linear-gradient(135deg, #7B7FE8 0%, #9B8FE8 100%)'

// Whitish cream — lighter than the page so the tile stands apart
const CREAM_BG = '#F7F1E6'

// ─── Shared tile content — indicator on top, details at the bottom ───────
function TileContent({
  title,
  subtitle,
  meta,
  indicator,
  theme,
}: {
  title: string
  subtitle: string
  meta: string[]
  indicator: ReactNode
  theme: Theme
}) {
  return (
    <div className="flex flex-col justify-between gap-16 min-h-[22rem] md:min-h-[26rem] p-8 md:p-12">
      <div className="flex items-start justify-end">
        {indicator}
      </div>

      <div>
        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
            fontWeight: 300,
            letterSpacing: '-0.01em',
            lineHeight: 1.05,
            color: theme.text,
          }}
        >
          {title}
        </h2>
        <p
          className="font-body mt-4"
          style={{ fontSize: '0.9rem', fontWeight: 300, letterSpacing: '0.01em', maxWidth: '36rem', color: theme.muted }}
        >
          {subtitle}
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-5">
          {meta.map((item, i) => (
            <span key={item} className="flex items-center gap-4">
              {i > 0 && <span style={{ color: theme.faint }}>·</span>}
              <span
                className="font-body"
                style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: theme.muted,
                }}
              >
                {item}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

const indicatorStyle = (theme: Theme): React.CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.6rem',
  fontFamily: 'var(--font-jost)',
  fontSize: '0.68rem',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: theme.text,
  opacity: 0.85,
  userSelect: 'none',
})

// Hover — gentle lift in brightness and scale
const TILE_HOVER = 'transition-[transform,filter] duration-500 ease-out hover:scale-[1.01] hover:brightness-110'

// ─── Entry 1 — Marin, links out to its own page ───────────────────────────
function MarinRow() {
  return (
    <Link
      href="/marin"
      className={`block w-full group ${TILE_HOVER}`}
      style={{ textDecoration: 'none', background: MARIN_BG }}
    >
      <TileContent
        title="Marin Art & Garden Center"
        subtitle="Zimbabwe Contemporary Sculpture Exhibition — Featuring Dominic Benhura"
        meta={['Ross, California', 'July 1 — October 2026']}
        theme={MARIN}
        indicator={
          <span style={indicatorStyle(MARIN)}>
            View
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
              →
            </span>
          </span>
        }
      />
    </Link>
  )
}

// ─── Entry 2 — Art-Fair-Mont, expands inline ──────────────────────────────
function ArtFairMontRow() {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={open ? 'transition-[transform,filter] duration-500 ease-out' : TILE_HOVER}
      style={{ background: PERIWINKLE_BG }}
    >
      <button
        className="w-full text-left focus:outline-none group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <TileContent
          title="Art-Fair-Mont"
          subtitle="Boutique art fair inside the iconic Fairmont Hotel during San Francisco Art Week"
          meta={['San Francisco, California', 'January 2026']}
          theme={PERIWINKLE}
          indicator={
            <span style={indicatorStyle(PERIWINKLE)}>
              {open ? 'Close' : 'View'}
              <motion.span
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                style={{ display: 'inline-block', fontSize: '1.1rem', fontWeight: 300, lineHeight: 1 }}
                aria-hidden
              >
                +
              </motion.span>
            </span>
          }
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="art-fair-mont"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-8 md:px-12 pb-10 md:pb-14">

              <a
                href="https://art-fair-mont.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body inline-block mb-10 md:mb-14"
                style={{
                  fontSize: '0.78rem',
                  letterSpacing: '0.1em',
                  color: PERIWINKLE.text,
                  opacity: 0.7,
                  textDecoration: 'none',
                  borderBottom: '1px solid currentColor',
                  paddingBottom: '1px',
                  transition: 'opacity 0.25s ease',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.7')}
              >
                art-fair-mont.com
              </a>

              {/* First pair */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">

                {/* Photo 1 — large landscape, left */}
                <ScrollReveal className="md:col-start-1 md:col-end-9">
                  <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                    <Image
                      src={PHOTOS[0]}
                      alt="Slab of Africa booth at Art-Fair-Mont San Francisco — Shona stone sculptures from Zimbabwe on display"
                      title="Slab of Africa booth at Art-Fair-Mont San Francisco — Shona stone sculptures from Zimbabwe on display"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 58vw"
                    />
                  </div>
                </ScrollReveal>

                {/* Photo 2 — portrait, right, dropped down */}
                <ScrollReveal delay={0.12} className="md:col-start-10 md:col-end-13 md:mt-28">
                  <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                    <Image
                      src={PHOTOS[1]}
                      alt="African art exhibition Art-Fair-Mont 2026 — Zimbabwe Shona stone sculptures for sale in San Francisco"
                      title="African art exhibition Art-Fair-Mont 2026 — Zimbabwe Shona stone sculptures for sale in San Francisco"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </div>
                </ScrollReveal>

              </div>

              {/* Second pair */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mt-5 md:mt-8">

                {/* Photo 3 — small square, inset from left */}
                <ScrollReveal delay={0.06} className="md:col-start-2 md:col-end-6 md:mt-16">
                  <div className="relative overflow-hidden" style={{ aspectRatio: '1/1' }}>
                    <Image
                      src={PHOTOS[2]}
                      alt="Shona sculpture collection at San Francisco art fair — authentic handmade Zimbabwe stone art"
                      title="Shona sculpture collection at San Francisco art fair — authentic handmade Zimbabwe stone art"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 30vw"
                    />
                  </div>
                </ScrollReveal>

                {/* Photo 4 — wider, right-leaning */}
                <ScrollReveal delay={0.14} className="md:col-start-7 md:col-end-13">
                  <div className="relative overflow-hidden" style={{ aspectRatio: '5/4' }}>
                    <Image
                      src={PHOTOS[3]}
                      alt="Slab of Africa at Art-Fair-Mont 2026 — hand-carved African Shona sculptures exhibition San Francisco"
                      title="Slab of Africa at Art-Fair-Mont 2026 — hand-carved African Shona sculptures exhibition San Francisco"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 46vw"
                    />
                  </div>
                </ScrollReveal>

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Entry 3 — West Portal Gallery, expands inline ────────────────────────
// Bio mirrors Gift Rusere's entry on the Artists page
// Works on show — pulled from the collection so photos stay in sync
const WEST_PORTAL_WORKS = ['Bonded Souls', 'Infinity']
  .map(title => collection.find(w => w.title === title))
  .filter((w): w is NonNullable<typeof w> => Boolean(w))

const GIFT_RUSERE_BIO = `Gift Rusere grew up in Mhondoro, Mashonaland West, before moving to Mbare in Harare at twelve — where his maternal uncle Kunaka, who sold his work at Africa Unity Square, first placed a chisel in his hands. He started carving in 1998 while still at school and sold his first pieces at HIFA in 1999. A meeting with German painter Andreas Wutz opened him to abstraction and expanded what he understood sculpture could be. He works primarily in springstone, green opal, cobalt and leopard stone, materials whose character he knows intimately after more than two decades of practice.`

function WestPortalRow() {
  const [open, setOpen] = useState(false)

  // Opened from the "Now Showing" banner — via #west-portal on arrival, or an event if already here
  useEffect(() => {
    if (window.location.hash === '#west-portal') setOpen(true)
    const onOpen = (e: Event) => {
      if ((e as CustomEvent).detail === 'west-portal') setOpen(true)
    }
    window.addEventListener('open-exhibit', onOpen)
    return () => window.removeEventListener('open-exhibit', onOpen)
  }, [])

  return (
    <div
      id="west-portal"
      className={open ? 'transition-[transform,filter] duration-500 ease-out' : TILE_HOVER}
      style={{ background: CREAM_BG }}
    >
      <button
        className="w-full text-left focus:outline-none group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <TileContent
          title="West Portal Gallery Exhibition"
          subtitle="Slab of Africa representing Gift Rusere at West Portal Gallery as part of a featured artists exhibition"
          meta={['San Francisco, California', 'October — November 2026']}
          theme={CREAM}
          indicator={
            <span style={indicatorStyle(CREAM)}>
              {open ? 'Close' : 'View'}
              <motion.span
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                style={{ display: 'inline-block', fontSize: '1.1rem', fontWeight: 300, lineHeight: 1 }}
                aria-hidden
              >
                +
              </motion.span>
            </span>
          }
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="west-portal"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-8 md:px-12 pb-10 md:pb-14">
              <p
                className="font-body mb-4"
                style={{
                  fontSize: '0.68rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: CREAM.faint,
                }}
              >
                Featured Artist — Gift Rusere
              </p>
              <p
                className="font-body leading-relaxed"
                style={{ fontSize: '0.95rem', maxWidth: '42rem', color: CREAM.text }}
              >
                {GIFT_RUSERE_BIO}
              </p>

              <div className="grid grid-cols-2 gap-4 md:gap-6 mt-10 md:mt-14 max-w-2xl">
                {WEST_PORTAL_WORKS.map((work, i) => (
                  <ScrollReveal key={work.id} delay={i * 0.1}>
                    <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                      <Image
                        src={work.image}
                        alt={`${work.title} by ${work.artist} — ${work.material} Shona stone sculpture from Zimbabwe`}
                        title={`${work.title} by ${work.artist} — ${work.material} Shona stone sculpture from Zimbabwe`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 45vw, 320px"
                      />
                    </div>
                    <p
                      className="font-display mt-4"
                      style={{ fontSize: '1.4rem', fontWeight: 400, color: CREAM.text, lineHeight: 1.2 }}
                    >
                      {work.title}
                    </p>
                    <p
                      className="font-body mt-1"
                      style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: CREAM.muted }}
                    >
                      {work.material} · {work.size}
                    </p>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ExhibitsPage() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #DDD0BA, #CCBFA0)' }}>

      {/* Header */}
      <section className="pt-36 md:pt-44 px-6 md:px-16 max-w-7xl mx-auto">
        <ScrollReveal>
          <h1
            className="font-display text-charcoal"
            style={{
              fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)',
              fontWeight: 400,
              lineHeight: 1.05,
            }}
          >
            Exhibits
          </h1>
        </ScrollReveal>
        <div className="divider mt-10" />
      </section>

      {/* Exhibition list */}
      <section className="px-6 md:px-16 max-w-7xl mx-auto pt-10 md:pt-14 pb-32 flex flex-col gap-6 md:gap-8">
        <WestPortalRow />
        <MarinRow />
        <ArtFairMontRow />
      </section>

    </div>
  )
}
