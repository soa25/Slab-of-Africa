'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Artwork } from '@/lib/data'

interface LightboxProps {
  artwork: Artwork | null
  artworks: Artwork[]
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function Lightbox({ artwork, artworks, onClose, onPrev, onNext }: LightboxProps) {
  const [mounted, setMounted] = useState(false)
  const [zoomed, setZoomed]   = useState(false)

  // For double-tap detection on mobile
  const lastTapRef = useRef<number>(0)

  const currentIndex = artwork ? artworks.findIndex(a => a.id === artwork.id) : -1

  useEffect(() => setMounted(true), [])

  // Reset zoom when artwork changes
  useEffect(() => { setZoomed(false) }, [artwork?.id])

  useEffect(() => {
    if (!artwork) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [artwork])

  useEffect(() => {
    if (!artwork) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowLeft')  onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [artwork, onClose, onPrev, onNext])

  function handleImageDoubleClick(e: React.MouseEvent) {
    e.stopPropagation()
    setZoomed(z => !z)
  }

  function handleImageTap(e: React.TouchEvent) {
    e.stopPropagation()
    const now = Date.now()
    if (now - lastTapRef.current < 300) {
      setZoomed(z => !z)
      lastTapRef.current = 0
    } else {
      lastTapRef.current = now
    }
  }

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {artwork && (
        <motion.div
          data-lenis-prevent=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          style={{
            position: 'fixed', top: 0, left: 0,
            width: '100vw', height: '100vh',
            zIndex: 9999,
            background: 'rgba(0,0,0,0.95)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Backdrop — click outside image closes */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }} onClick={onClose} />

          {/* Image — entry/exit animation + zoom via CSS transform only */}
          <motion.div
            key={artwork.id}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1,    opacity: 1 }}
            exit={{    scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'relative', zIndex: 1, lineHeight: 0 }}
          >
            <div
              onDoubleClick={handleImageDoubleClick}
              onTouchEnd={handleImageTap}
              onClick={e => e.stopPropagation()}
              style={{
                transform: zoomed ? 'scale(2)' : 'scale(1)',
                transformOrigin: 'center center',
                transition: 'transform 0.25s ease',
                cursor: zoomed ? 'zoom-out' : 'zoom-in',
                lineHeight: 0,
              }}
            >
              <Image
                src={artwork.image}
                alt={artwork.title}
                width={1200}
                height={
                  artwork.aspectRatio === 'landscape' ? 800
                  : artwork.aspectRatio === 'square'  ? 1200
                  : 1500
                }
                style={{
                  maxWidth: '90vw',
                  maxHeight: '90vh',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
                draggable={false}
                priority
              />
            </div>
          </motion.div>

          {/* Close */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 20, right: 20, zIndex: 10,
              width: 40, height: 40,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(255,255,255,0.55)', transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,1)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="18" y1="6"  x2="6"  y2="18" />
              <line x1="6"  y1="6"  x2="18" y2="18" />
            </svg>
          </button>

          {/* Prev */}
          <button
            onClick={e => { e.stopPropagation(); onPrev() }}
            style={{
              position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 10,
              width: 48, height: 48,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(255,255,255,0.35)', transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
            aria-label="Previous"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Next */}
          <button
            onClick={e => { e.stopPropagation(); onNext() }}
            style={{
              position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 10,
              width: 48, height: 48,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(255,255,255,0.35)', transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
            aria-label="Next"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Counter */}
          <div style={{
            position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 10,
            pointerEvents: 'none',
            color: 'rgba(255,255,255,0.3)', fontSize: '0.68rem', letterSpacing: '0.18em',
            fontFamily: 'var(--font-jost, sans-serif)', whiteSpace: 'nowrap',
          }}>
            {currentIndex + 1} / {artworks.length}
          </div>

        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
