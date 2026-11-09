'use client'

import Image, { getImageProps } from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef, useCallback, createContext, useContext, memo, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { recentAdditions } from '@/lib/data'
import ScrollReveal from '@/components/ScrollReveal'
import HomeHeadline from '@/components/HomeHeadline'

type Artwork = (typeof recentAdditions)[0]

// Image sizes, shared so the lightbox can show the exact file the card or thumbnail already loaded
const CARD_SIZES = '(max-width: 1023px) 50vw, 33vw'
// Lightbox grid: 2 columns under 768px, 3 columns above, inside a 900px max-width box with 1.5rem padding
const THUMB_SIZES = '(max-width: 767px) calc(50vw - 30px), (max-width: 899px) calc(33vw - 27px), 274px'

// Hover effects written in JS only run on devices that can really hover, so a tap never changes anything
const canHover = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
const hoverOn = (e: React.MouseEvent<HTMLElement>) => { if (canHover()) { e.currentTarget.style.opacity = '0.7'; e.currentTarget.style.textDecoration = 'underline' } }
const hoverOff = (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.textDecoration = 'none' }

// Opening the lightbox goes through context, so its state lives outside the grid and cards don't re-render
const OpenLightboxContext = createContext<(artwork: Artwork) => void>(() => {})

function LightboxProvider({ children }: { children: ReactNode }) {
  const [artwork, setArtwork] = useState<Artwork | null>(null)
  const close = useCallback(() => setArtwork(null), [])
  return (
    <OpenLightboxContext.Provider value={setArtwork}>
      <AnimatePresence>
        {artwork && <Lightbox key={artwork.id} artwork={artwork} onClose={close} />}
      </AnimatePresence>
      {children}
    </OpenLightboxContext.Provider>
  )
}

// Loads an image into the browser cache with the same URL choice the <Image> would make. No React state, no DOM change.
function preloadImage(src: string, sizes: string) {
  const { props } = getImageProps({ src, alt: '', fill: true, sizes })
  const img = new window.Image()
  if (props.sizes) img.sizes = props.sizes
  if (props.srcSet) img.srcset = props.srcSet
  img.src = props.src
}

// Lightbox photo: the already-cached card/thumbnail file shows instantly, the large version fades in over it once loaded
function LayeredPhoto({
  src, alt, previewSizes, sizes, quality, priority,
}: {
  src: string; alt: string; previewSizes: string; sizes: string; quality?: number; priority?: boolean
}) {
  const [loaded, setLoaded] = useState(false)
  return (
    <>
      <Image src={src} alt="" aria-hidden="true" fill className="object-contain" sizes={previewSizes} />
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
        sizes={sizes}
        quality={quality}
        priority={priority}
        onLoad={() => setLoaded(true)}
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.2s ease' }}
      />
    </>
  )
}

// "Multiple Stones" can't be used as an adjective ("Multiple Stones Shona sculpture"), so it gets its own wording
const MULTIPLE_STONES = 'Multiple Stones'

// Alt/title text; leaves out "by …" when a piece has no artist yet
const describe = (a: Artwork) =>
  a.alt ?? `${a.title} — ${a.material === MULTIPLE_STONES ? 'Shona sculpture in multiple stones' : `${a.material} Shona sculpture`}${a.artist ? ` by ${a.artist}` : ''}`

// True when (x, y) lands on the visible picture of an object-fit: contain image,
// not on the empty letterbox space around it
function isOnPicture(img: HTMLImageElement, x: number, y: number) {
  const r = img.getBoundingClientRect()
  if (!img.naturalWidth || !img.naturalHeight) return true
  const k = Math.min(r.width / img.naturalWidth, r.height / img.naturalHeight)
  const w = img.naturalWidth * k, h = img.naturalHeight * k
  const left = r.left + (r.width - w) / 2, top = r.top + (r.height - h) / 2
  return x >= left && x <= left + w && y >= top && y <= top + h
}

// ── Lightbox ──────────────────────────────────────────────────────────────────

function Lightbox({
  artwork,
  onClose,
}: {
  artwork: Artwork
  onClose: () => void
}) {
  const images = artwork.images?.length ? artwork.images : [artwork.image ?? '']
  // One photo: no grid to choose from, so open straight into the large photo view
  const single = images.length === 1
  const [level, setLevel] = useState<1 | 2>(single ? 2 : 1)
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
      if (e.key === 'Escape') { level === 2 && !single ? backToGrid() : onClose() }
      if (level === 2 && e.key === 'ArrowLeft') prev()
      if (level === 2 && e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  // One click handler for the whole lightbox: a click that isn't on a photo or a control closes it completely.
  // A drag or a text selection doesn't count as a click on the background.
  const pointerStart = useRef<{ x: number; y: number } | null>(null)
  const onBackgroundClick = (e: React.MouseEvent) => {
    const start = pointerStart.current
    if (start && Math.hypot(e.clientX - start.x, e.clientY - start.y) > 6) return
    if (window.getSelection()?.toString()) return
    const target = e.target as HTMLElement
    if (target.closest('button, a, [data-lightbox-control]')) return
    const img = target.closest('img')
    if (img && isOnPicture(img, e.clientX, e.clientY)) return
    onClose()
  }

  if (!mounted) return null

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.95)' }}
      data-lenis-prevent=""
      onPointerDown={e => { pointerStart.current = { x: e.clientX, y: e.clientY } }}
      onClick={onBackgroundClick}
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
          >
            <div style={{ maxWidth: 900, margin: '0 auto', padding: '4.5rem 1.5rem 4rem' }}>
              {/* Header */}
              <div style={{ marginBottom: '2.5rem' }}>
                {artwork.artist && (
                  <p style={{
                    fontFamily: 'var(--font-jost)', fontSize: '0.7rem',
                    letterSpacing: '0.25em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.38)', marginBottom: '0.5rem',
                  }}>
                    {artwork.artist}
                  </p>
                )}
                <h2 style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                  fontWeight: 400, color: 'white', margin: 0,
                }}>
                  {artwork.title}
                </h2>
                {artwork.sold ? (
                  <span style={{
                    display: 'inline-block', marginTop: '0.65rem',
                    fontFamily: 'var(--font-jost)', fontSize: '0.68rem',
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: 'var(--terracotta)', fontWeight: 400,
                  }}>
                    Sold
                  </span>
                ) : (
                  <Link
                    href="/inquire"
                    style={{
                      display: 'inline-block', marginTop: '0.65rem',
                      fontFamily: 'var(--font-jost)', fontSize: '0.68rem',
                      letterSpacing: '0.2em', textTransform: 'uppercase',
                      color: 'var(--terracotta)', fontWeight: 400,
                      textDecoration: 'none',
                      transition: 'opacity 0.2s ease, text-decoration 0.2s ease',
                    }}
                    onMouseEnter={hoverOn}
                    onMouseLeave={hoverOff}
                  >
                    Inquire
                  </Link>
                )}
              </div>

              {/* Photo grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {images.map((src, i) => (
                  <div
                    key={i}
                    data-lightbox-control=""
                    style={{ aspectRatio: '3/4', position: 'relative', background: '#000', cursor: 'zoom-in' }}
                    onClick={e => { e.stopPropagation(); openPhoto(i) }}
                  >
                    <Image
                      src={src}
                      alt={`${describe(artwork)}, photo ${i + 1}`}
                      fill
                      className="object-contain"
                      sizes={THUMB_SIZES}
                      loading="eager"
                      decoding="async"
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
          >
            {/* Back button — only when there's a grid to go back to */}
            {!single && (
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
            )}

            {/* Main image — single photos get the largest uncropped view the screen allows */}
            <div
              style={single
                ? { position: 'relative', width: '96vw', height: '92svh' }
                : { position: 'relative', width: '90vw', height: '90vh' }}
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
                  <LayeredPhoto
                    src={images[photoIndex]}
                    alt={`${describe(artwork)}, photo ${photoIndex + 1}`}
                    // Single photo: the card's file is cached. Multi-photo: the grid thumbnail's file is cached.
                    previewSizes={single ? CARD_SIZES : THUMB_SIZES}
                    sizes={single ? '100vw' : '90vw'}
                    quality={single ? 85 : undefined}
                    priority={single}
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

            {/* Inquire / Sold — bottom right */}
            {artwork.sold ? (
              <span
                style={{
                  position: 'absolute', bottom: '1.25rem', right: '1.5rem',
                  ...(single ? { textShadow: '0 1px 3px rgba(0,0,0,0.85)' } : {}),
                  fontFamily: 'var(--font-jost)', fontSize: '0.68rem',
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'var(--terracotta)', fontWeight: 400,
                }}
              >
                Sold
              </span>
            ) : (
              <Link
                href="/inquire"
                onClick={e => e.stopPropagation()}
                style={{
                  position: 'absolute', bottom: '1.25rem', right: '1.5rem',
                  ...(single ? { textShadow: '0 1px 3px rgba(0,0,0,0.85)' } : {}),
                  fontFamily: 'var(--font-jost)', fontSize: '0.68rem',
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'var(--terracotta)', fontWeight: 400,
                  textDecoration: 'none',
                  transition: 'opacity 0.2s ease, text-decoration 0.2s ease',
                }}
                onMouseEnter={hoverOn}
                onMouseLeave={hoverOff}
              >
                Inquire
              </Link>
            )}
          </motion.div>
        )}

      </AnimatePresence>
    </motion.div>,
    document.body
  )
}

// ── Grid card ─────────────────────────────────────────────────────────────────

const ArtworkCard = memo(function ArtworkCard({
  artwork,
  priority = false,
  eager = false,
}: {
  artwork: Artwork
  priority?: boolean
  eager?: boolean
}) {
  const onOpen = useContext(OpenLightboxContext)
  const images = artwork.images?.length ? artwork.images : [artwork.image ?? '']
  const [activeIndex, setActiveIndex] = useState(0)
  const hasMultiple = images.length > 1

  // On first pointer contact (or mouse hover), load the next angle into the browser cache so a swipe shows it
  // instantly. Imperative and once per card: no state change and no DOM change, so a tap still opens on the first try.
  const preloaded = useRef(false)
  const preloadNext = () => {
    if (!hasMultiple || preloaded.current) return
    preloaded.current = true
    preloadImage(images[(activeIndex + 1) % images.length], CARD_SIZES)
  }

  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const didSwipe = useRef(false)

  const prevPhoto = () => setActiveIndex(i => (i - 1 + images.length) % images.length)
  const nextPhoto = () => setActiveIndex(i => (i + 1) % images.length)

  const prev = (e: React.MouseEvent) => { e.stopPropagation(); prevPhoto() }
  const next = (e: React.MouseEvent) => { e.stopPropagation(); nextPhoto() }

  // Records the start point only: no state, no preventDefault
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    didSwipe.current = false
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = e.changedTouches[0].clientY - touchStartY.current
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      didSwipe.current = true
      if (dx < 0) nextPhoto()
      else prevPhoto()
    }
  }

  return (
    <div className="group block cursor-pointer" onClick={() => onOpen(artwork)}>
      <div
        className="relative overflow-hidden bg-black"
        // pan-y keeps vertical scrolling native and lets a tap fire its click straight away
        style={{ aspectRatio: '3 / 4', touchAction: 'pan-y', WebkitTapHighlightColor: 'transparent', cursor: 'pointer' }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onPointerDown={preloadNext}
        onPointerEnter={e => { if (e.pointerType === 'mouse') preloadNext() }}
        onClick={(e) => { if (didSwipe.current) { didSwipe.current = false; e.stopPropagation() } }}
      >
        <Image
          src={images[activeIndex]}
          alt={describe(artwork)}
          title={describe(artwork)}
          fill
          className={`${artwork.fit === 'cover' ? 'object-cover object-center' : 'object-contain'} transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]`}
          priority={priority}
          loading={!priority && eager ? 'eager' : undefined}
          sizes={CARD_SIZES}
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

      <CardCaption artwork={artwork} />
    </div>
  )
})

// Title, artist, series, stone, note, price and Inquire/Sold, shared by grid cards and the feature row
function CardCaption({ artwork }: { artwork: Artwork }) {
  return (
    <div className="pt-3 md:pt-5 break-words">
      <h3 className="font-display text-charcoal group-hover:text-terracotta transition-colors duration-300 text-[0.95rem] leading-snug md:text-[clamp(1.1rem,1.5vw,1.6rem)] md:leading-normal">
        {artwork.title}
      </h3>
      {artwork.artist && <p className="font-body text-muted mt-1 md:mt-1.5 text-[0.75rem] md:text-sm">— {artwork.artist}</p>}
      {artwork.series && (
        <p className="font-body text-muted mt-0.5 text-[0.7rem] md:text-[0.75rem]" style={{ fontWeight: 300, fontStyle: 'italic' }}>
          {artwork.series}
        </p>
      )}
      {artwork.subline && (
        <p className="font-body text-muted mt-0.5 text-[0.7rem] md:text-[0.75rem]" style={{ fontWeight: 300, fontStyle: 'italic' }}>
          {artwork.subline}
        </p>
      )}
      <p className="font-body text-muted mt-1 text-[0.72rem] tracking-normal md:text-[0.78rem] md:tracking-[0.02em]" style={{ fontWeight: 300 }}>
        {artwork.material}{artwork.size ? ` · ${artwork.size}` : ''}
      </p>
      {artwork.note && (
        <p className="font-body text-muted mt-0.5 text-[0.7rem] md:text-[0.75rem]" style={{ fontWeight: 300, fontStyle: 'italic' }}>
          {artwork.note}
        </p>
      )}
      {artwork.price !== undefined && (
        <p className="font-body text-charcoal mt-1 text-[0.72rem] tracking-normal md:text-[0.78rem] md:tracking-[0.02em]" style={{ fontWeight: 300 }}>
          ${artwork.price.toLocaleString('en-US')}
        </p>
      )}
      {artwork.sold ? (
        <span
          style={{
            display: 'inline-block',
            marginTop: '0.75rem',
            fontFamily: 'var(--font-jost)',
            fontSize: '0.68rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--terracotta)',
            fontWeight: 400,
          }}
        >
          Sold
        </span>
      ) : (
        <Link
          href="/inquire"
          onClick={e => e.stopPropagation()}
          style={{
            display: 'inline-block',
            // 14px + 16px line + 14px = 44px tap height; the negative margins keep the text in the same place
            paddingTop: 14,
            paddingBottom: 14,
            lineHeight: '16px',
            marginTop: 'calc(0.75rem - 14px)',
            marginBottom: -14,
            fontFamily: 'var(--font-jost)',
            fontSize: '0.68rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--terracotta)',
            fontWeight: 400,
            textDecoration: 'none',
            transition: 'opacity 0.2s ease, text-decoration 0.2s ease',
          }}
          onMouseEnter={hoverOn}
          onMouseLeave={hoverOff}
        >
          Inquire
        </Link>
      )}
    </div>
  )
}

// Intrinsic shape hint for natural-ratio images; the browser switches to the real ratio once loaded
const RATIO_HINT = { landscape: [3, 2], portrait: [3, 4], square: [1, 1] } as const

// ── Feature row ───────────────────────────────────────────────────────────────
// Full-width row: photo at its natural ratio on the left (~60%), caption under it,
// and a quote slot on the right (~40%) that renders only when the piece has a quote.
const FeatureCard = memo(function FeatureCard({
  artwork,
  priority = false,
  eager = false,
}: {
  artwork: Artwork
  priority?: boolean
  eager?: boolean
}) {
  const onOpen = useContext(OpenLightboxContext)
  const [w, h] = RATIO_HINT[artwork.aspectRatio]
  return (
    <div className="md:grid md:grid-cols-[3fr_2fr] md:gap-12 md:items-start">
      <div className="group block cursor-pointer w-[60%] md:w-auto" onClick={() => onOpen(artwork)}>
        <div className="relative overflow-hidden" style={{ touchAction: 'pan-y', WebkitTapHighlightColor: 'transparent', cursor: 'pointer' }}>
          <Image
            src={artwork.image}
            alt={describe(artwork)}
            title={describe(artwork)}
            width={w * 1000}
            height={h * 1000}
            className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
            style={{ width: '100%', height: 'auto', display: 'block' }}
            priority={priority}
            loading={!priority && eager ? 'eager' : undefined}
            sizes="(max-width: 768px) calc(100vw - 3rem), (max-width: 1280px) 60vw, 720px"
          />
        </div>
        <CardCaption artwork={artwork} />
      </div>

      {artwork.quote && (
        <figure className="mt-8 md:mt-0">
          <blockquote
            className="font-display text-charcoal"
            style={{ fontSize: 'clamp(1.25rem, 1.8vw, 1.6rem)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.45 }}
          >
            {artwork.quote.text}
          </blockquote>
          {artwork.quote.attribution && (
            <figcaption className="section-label mt-5" style={{ color: 'var(--muted)' }}>
              {artwork.quote.attribution}
            </figcaption>
          )}
        </figure>
      )}
    </div>
  )
})

// ── Page ──────────────────────────────────────────────────────────────────────

const SITE_URL = 'https://www.slabofafrica.com'

export default function HomePage() {

  const sculptureSchema = {
    '@context': 'https://schema.org',
    '@graph': recentAdditions.map(a => ({
      '@type': ['VisualArtwork', 'Product'],
      name: a.title,
      ...(a.artist ? { creator: { '@type': 'Person', name: a.artist } } : {}),
      artMedium: a.material === MULTIPLE_STONES ? MULTIPLE_STONES : `${a.material} stone`,
      artForm: 'Shona stone sculpture',
      // Size is left out entirely when a piece has no dimensions
      // A spelled-out size (e.g. "Lifesize") goes in the description only, not the size property
      ...(a.size && !a.sizeDescription ? { size: a.size } : {}),
      description: `${a.title} — ${a.material === MULTIPLE_STONES ? 'Shona stone sculpture in multiple stones' : `${a.material} Shona stone sculpture`}${a.artist ? ` by ${a.artist}` : ''}.${a.sizeDescription ? ` ${a.sizeDescription}.` : a.size ? ` ${a.size}.` : ''}`,
      image: `${SITE_URL}${a.image}`,
      url: `${SITE_URL}/inquire`,
      brand: { '@type': 'Brand', name: 'Slab of Africa' },
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        // Real price when a piece has one, otherwise the existing placeholder
        price: a.price !== undefined ? String(a.price) : '0',
        priceCurrency: 'USD',
        priceValidUntil: '2027-12-31',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          priceCurrency: 'USD',
          priceValidUntil: '2027-12-31',
        },
        hasMerchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          applicableCountry: 'US',
          returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
          merchantReturnDays: 14,
          returnMethod: 'https://schema.org/ReturnByMail',
          returnFees: 'https://schema.org/FreeReturn',
        },
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'USD' },
          shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'US' },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 5, unitCode: 'DAY' },
            transitTime: { '@type': 'QuantitativeValue', minValue: 3, maxValue: 14, unitCode: 'DAY' },
          },
        },
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5',
        reviewCount: '1',
      },
      review: {
        '@type': 'Review',
        reviewRating: { '@type': 'Rating', ratingValue: '5' },
        author: { '@type': 'Person', name: 'Slab of Africa' },
      },
    })),
  }

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sculptureSchema) }} />
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #FAF0E2, #E0D5C5)' }}>
    <LightboxProvider>

      {/* Hero header */}
      <section className="pt-32 md:pt-40 pb-16 px-6 md:px-10 max-w-7xl mx-auto">
        {/* Headline left (~2/3), paragraph right in a narrow column, lined up with the headline's last line */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_22rem] gap-5 lg:gap-16 lg:[align-items:last_baseline]">
          <HomeHeadline />

          <ScrollReveal delay={1.1}>
            <p className="font-body text-muted leading-relaxed text-sm md:text-base">
              Sourced and sold responsibly from the heart of Zimbabwe to collectors across the globe. Each piece is carved by hand from a single block of stone.
            </p>
          </ScrollReveal>
        </div>

        {/* Thin divider, ~2rem above the grid */}
        <div className="divider mt-10 mb-8" />

        {/* Editorial grid — 1-col mobile, 2-col desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 items-start gap-x-3 md:gap-x-8 gap-y-10 md:gap-y-24 -mx-2 md:mx-0">
          {recentAdditions.map((artwork, i) =>
            artwork.layout === 'feature' ? (
              // Spans every column of the row (grid-column: 1 / -1)
              <ScrollReveal key={artwork.id} className="[grid-column:1/-1]" mobileFadeOnly>
                <FeatureCard
                  artwork={artwork}
                  priority={i < 4}
                  eager={i < 10}
                />
              </ScrollReveal>
            ) : (
              <ScrollReveal key={artwork.id} delay={(i % 2) * 0.07} mobileFadeOnly>
                <ArtworkCard
                  artwork={artwork}
                  priority={i < 4}
                  eager={i < 10}
                />
              </ScrollReveal>
            )
          )}
        </div>

        {/* View Full Collection — centered below grid */}
        <ScrollReveal>
          <div className="flex flex-col items-center gap-4 mt-16 md:mt-20">
            <Link href="/collection" className="btn-outline btn-outline-terracotta" style={{ borderColor: 'var(--charcoal)' }}>
              View Full Collection
            </Link>
            <Link href="/artists" className="btn-outline btn-outline-terracotta" style={{ borderColor: 'var(--charcoal)' }}>
              The Artists
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
          <ScrollReveal delay={0.1}>
            <p className="font-body text-muted text-sm mt-4">
              <a href="/about" className="link-underline" style={{ color: 'inherit', transition: 'color 0.25s ease' }} onMouseEnter={e => { if (canHover()) e.currentTarget.style.color = 'var(--terracotta)' }} onMouseLeave={e => (e.currentTarget.style.color = 'inherit')}>Learn about the Shona sculpture tradition</a>
            </p>
          </ScrollReveal>
        </div>
      </section>

    </LightboxProvider>
    </div>
    </>
  )
}
