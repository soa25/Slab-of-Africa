'use client'

import { useEffect, useCallback } from 'react'
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
  const currentIndex = artwork ? artworks.findIndex((a) => a.id === artwork.id) : -1

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    },
    [onClose, onPrev, onNext]
  )

  useEffect(() => {
    if (artwork) {
      document.addEventListener('keydown', handleKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [artwork, handleKey])

  return (
    <AnimatePresence>
      {artwork && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
          {/* Backdrop — plain div, no animation needed */}
          <div
            className="absolute inset-0 cursor-pointer"
            style={{ backgroundColor: 'rgba(12,10,9,0.95)' }}
            onClick={onClose}
          />

          {/* Content */}
          <motion.div
            className="relative z-10 flex flex-col md:flex-row items-center gap-8 max-w-6xl w-full px-6 md:px-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Image */}
            <div className="relative flex-shrink-0 w-full md:w-auto">
              <div
                className="relative overflow-hidden"
                style={{ maxHeight: '75vh', maxWidth: '55vw' }}
              >
                <Image
                  key={artwork.id}
                  src={artwork.image}
                  alt={artwork.title}
                  width={600}
                  height={artwork.aspectRatio === 'landscape' ? 400 : 800}
                  className="object-contain"
                  style={{ maxHeight: '72vh', width: 'auto' }}
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 text-cream">
              <p className="section-label text-stone mb-4">
                {currentIndex + 1} / {artworks.length}
              </p>
              <h2
                className="font-display text-cream mb-2"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 400 }}
              >
                {artwork.title}
              </h2>
              <p
                className="font-body text-stone mb-6"
                style={{ fontSize: '0.85rem', letterSpacing: '0.08em' }}
              >
                {artwork.artist}
              </p>

              <div className="divider mb-6" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />

              <dl className="space-y-3 mb-8">
                {[
                  { label: 'Material', value: artwork.material },
                  { label: 'Dimensions', value: artwork.size },
                  { label: 'Year', value: artwork.year },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-6">
                    <dt className="section-label text-stone/60 w-24 flex-shrink-0">{label}</dt>
                    <dd className="font-body text-sm text-cream/80">{value}</dd>
                  </div>
                ))}
              </dl>

              {artwork.description && (
                <p className="font-body text-sm text-stone leading-relaxed mb-8">
                  {artwork.description}
                </p>
              )}

              <a href="/inquire" className="btn-primary inline-flex">
                Inquire About This Work
              </a>
            </div>
          </motion.div>

          {/* Navigation Arrows */}
          <button
            onClick={onPrev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-cream/60 hover:text-cream transition-colors"
            aria-label="Previous"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            onClick={onNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-cream/60 hover:text-cream transition-colors"
            aria-label="Next"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center text-cream/60 hover:text-cream transition-colors"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
