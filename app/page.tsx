'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { recentAdditions } from '@/lib/data'
import ScrollReveal from '@/components/ScrollReveal'

type Artwork = (typeof recentAdditions)[0]

// ── Lightbox ──────────────────────────────────────────────────────────────────

function Lightbox({
  artwork,
  onClose,
}: {
  artwork: Artwork
  onClose: () => void
}) {
  const images = artwork.images?.length ? artwork.images : [artwork.image ?? '']
  const [level, setLevel] = useState<1 | 2>(1)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const prev = () => setPhotoIndex(i => (i - 1 + images.length) % images.length)
  const next = () => setPhotoIndex(i => (i + 1) % images.length)
  const openPhoto = (i: number) => { setPhotoIndex(i); setLevel(2) }
  const backToGrid = () => setLevel(1)

  // Re-registers on every render so closures are always fresh
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { level === 2 ? backToGrid() : onClose() }
      if (level === 2 && e.key === 'ArrowLeft') prev()
      if (level === 2 && e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  if (!mounted) return null

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.95)' }}
      data-lenis-prevent=""
    >
      {/* X — always visible, always closes entirely */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: '1.25rem', right: '1.25rem',
          width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'transparent', border: 'none',
          color: 'rgba(255,255,255,0.55)', cursor: 'pointer', zIndex: 10,
        }}
        aria-label="Close"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <line x1="2" y1="2" x2="16" y2="16" />
          <line x1="16" y1="2" x2="2" y2="16" />
        </svg>
      </button>

      <AnimatePresence mode="sync">

        {/* ── Level 1: sculpture overview ──────────────────────────────────── */}
        {level === 1 && (
          <motion.div
            key="level1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ position: 'absolute', inset: 0, overflowY: 'auto' }}
            onClick={onClose}
          >
            <div
              style={{ maxWidth: 900, margin: '0 auto', padding: '4.5rem 1.5rem 4rem' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div style={{ marginBottom: '2.5rem' }}>
                <p style={{
                  fontFamily: 'var(--font-jost)', fontSize: '0.7rem',
                  letterSpacing: '0.25em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.38)', marginBottom: '0.5rem',
                }}>
                  {artwork.artist}
                </p>
                <h2 style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                  fontWeight: 400, color: 'white', margin: 0,
                }}>
                  {artwork.title}
                </h2>
              </div>

              {/* Photo grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {images.map((src, i) => (
                  <div
                    key={i}
                    style={{ aspectRatio: '3/4', position: 'relative', background: '#000', cursor: 'zoom-in' }}
                    onClick={() => openPhoto(i)}
                  >
                    <Image
                      src={src}
                      alt={`${artwork.title} — photo ${i + 1}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Level 2: individual photo ────────────────────────────────────── */}
        {level === 2 && (
          <motion.div
            key="level2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            onClick={backToGrid}
          >
            {/* Back button */}
            <button
              onClick={e => { e.stopPropagation(); backToGrid() }}
              style={{
                position: 'absolute', top: '1.25rem', left: '1.25rem',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                background: 'transparent', border: 'none',
                color: 'rgba(255,255,255,0.5)', cursor: 'pointer',
                fontFamily: 'var(--font-jost)', fontSize: '0.7rem',
                letterSpacing: '0.2em', textTransform: 'uppercase',
              }}
              aria-label="Back to overview"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="8 2 4 6 8 10" />
              </svg>
              Back
            </button>

            {/* Main image */}
            <div
              style={{ position: 'relative', width: '90vw', height: '90vh' }}
              onClick={e => e.stopPropagation()}
            >
              <AnimatePresence mode="sync" initial={false}>
                <motion.div
                  key={photoIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22, ease: 'easeInOut' }}
                  style={{ position: 'absolute', inset: 0 }}
                >
                  <Image
                    src={images[photoIndex]}
                    alt={`${artwork.title} — photo ${photoIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="90vw"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Left / right arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={e => { e.stopPropagation(); prev() }}
                  style={{
                    position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
                    width: 44, height: 44, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(255,255,255,0.12)', border: 'none', color: 'white', cursor: 'pointer',
                  }}
                  aria-label="Previous photo"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="10 2 4 7 10 12" />
                  </svg>
                </button>
                <button
                  onClick={e => { e.stopPropagation(); next() }}
                  style={{
                    position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
                    width: 44, height: 44, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(255,255,255,0.12)', border: 'none', color: 'white', cursor: 'pointer',
                  }}
                  aria-label="Next photo"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="4 2 10 7 4 12" />
                  </svg>
                </button>
              </>
            )}
          </motion.div>
        )}

      </AnimatePresence>
    </motion.div>,
    document.body
  )
}

// ── Grid card ─────────────────────────────────────────────────────────────────

function ArtworkCard({
  artwork,
  priority = false,
  onOpen,
}: {
  artwork: Artwork
  priority?: boolean
  onOpen: (artwork: Artwork) => void
}) {
  const images = artwork.images?.length ? artwork.images : [artwork.image ?? '']
  const [activeIndex, setActiveIndex] = useState(0)
  const hasMultiple = images.length > 1

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveIndex(i => (i - 1 + images.length) % images.length)
  }

  const next = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveIndex(i => (i + 1) % images.length)
  }

  return (
    <div className="group block cursor-pointer" onClick={() => onOpen(artwork)}>
      <div className="relative overflow-hidden bg-black" style={{ aspectRatio: '3 / 4' }}>
        <Image
          src={images[activeIndex]}
          alt={artwork.title}
          fill
          className="object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          priority={priority}
          sizes="(max-width: 768px) calc(100vw - 3rem), 50vw"
        />

        {hasMultiple && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-40 hover:!opacity-80 transition-opacity duration-300 z-10 w-6 h-6 rounded-full bg-black/20 flex items-center justify-center"
              aria-label="Previous image"
            >
              <svg width="8" height="8" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="7 1 3 5 7 9" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-40 hover:!opacity-80 transition-opacity duration-300 z-10 w-6 h-6 rounded-full bg-black/20 flex items-center justify-center"
              aria-label="Next image"
            >
              <svg width="8" height="8" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 1 7 5 3 9" />
              </svg>
            </button>
          </>
        )}
      </div>

      <div className="pt-5">
        <h3
          className="font-display text-charcoal group-hover:text-terracotta transition-colors duration-300"
          style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.6rem)' }}
        >
          {artwork.title}
        </h3>
        <p className="font-body text-sm text-muted mt-1.5">— {artwork.artist}</p>
        <p className="font-body text-muted mt-1" style={{ fontSize: '0.78rem', fontWeight: 300, letterSpacing: '0.02em' }}>
          {artwork.material} · {artwork.size}
        </p>
        {artwork.note && (
          <p className="font-body text-muted mt-0.5" style={{ fontSize: '0.75rem', fontWeight: 300, fontStyle: 'italic' }}>
            {artwork.note}
          </p>
        )}
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [lightboxArtwork, setLightboxArtwork] = useState<Artwork | null>(null)

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #FAF0E2, #E0D5C5)' }}>

      <AnimatePresence>
        {lightboxArtwork && (
          <Lightbox
            artwork={lightboxArtwork}
            onClose={() => setLightboxArtwork(null)}
          />
        )}
      </AnimatePresence>

      {/* Hero header */}
      <section className="pt-36 md:pt-44 pb-16 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="section-label mb-4">Recent Additions</p>
            <ScrollReveal delay={0.08}>
              <h1
                className="font-display text-charcoal"
                style={{
                  fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)',
                  fontWeight: 400,
                  lineHeight: 1.05,
                  letterSpacing: '-0.01em',
                }}
              >
                New Works,
                <br />
                <em style={{ fontStyle: 'italic', fontWeight: 300 }}>Just Arrived</em>
              </h1>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.15} className="md:max-w-xs">
            <p className="font-body text-muted leading-relaxed text-sm md:text-base">
              From the heart of Zimbabwe to collectors across the United States, discover our first curated collection — timeless stone sculptures available for acquisition from San Francisco, California
            </p>
          </ScrollReveal>
        </div>

        {/* Thin divider with accent */}
        <div className="flex items-center gap-4 mb-16">
          <div className="divider flex-1" />
          <div className="w-1.5 h-1.5 rounded-full bg-terracotta flex-shrink-0" />
          <div className="divider flex-1" />
        </div>

        {/* Editorial grid — 1-col mobile, 2-col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-12 md:gap-y-24">
          {recentAdditions.map((artwork, i) => (
            <ScrollReveal key={artwork.id} delay={(i % 2) * 0.07}>
              <ArtworkCard
                artwork={artwork}
                priority={i < 4}
                onOpen={setLightboxArtwork}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* View Full Collection — centered below grid */}
        <ScrollReveal>
          <div className="flex justify-center mt-16 md:mt-20">
            <Link href="/collection" className="btn-outline" style={{ borderColor: 'var(--charcoal)' }}>
              View Full Collection
            </Link>
          </div>
        </ScrollReveal>

        {/* Inquire — mobile only */}
        <ScrollReveal>
          <div className="flex justify-center mt-4 md:hidden">
            <Link href="/inquire" className="btn-primary">
              Inquire
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Interlude: Quote / Mission Statement */}
      <section className="py-24 md:py-36 px-6 md:px-10 border-t border-b border-border mt-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal delay={0.08}>
            <blockquote
              className="font-display text-charcoal"
              style={{
                fontSize: 'clamp(1.6rem, 3.2vw, 3rem)',
                fontWeight: 300,
                lineHeight: 1.35,
                fontStyle: 'italic',
              }}
            >
              "Stone remembers. Each sculpture carries within it not just the vision of the artist,
              but the ancient weight of the earth from which it was drawn — the hills of Zimbabwe,
              the hands of the carver, the silence of centuries."
            </blockquote>
          </ScrollReveal>
          <p className="section-label mt-8 text-terracotta">Slab of Africa</p>
        </div>
      </section>


    </div>
  )
}
