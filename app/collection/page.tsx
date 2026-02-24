'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import { collectionWorks, Artwork } from '@/lib/data'
import Lightbox from '@/components/Lightbox'
import ScrollReveal from '@/components/ScrollReveal'

function MasonryItem({
  artwork,
  onClick,
}: {
  artwork: Artwork
  onClick: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.disconnect()
        }
      },
      { threshold: 0.05, rootMargin: '-20px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="masonry-item reveal">
      <button
        className="group w-full text-left cursor-pointer focus:outline-none"
        onClick={onClick}
        aria-label={`View ${artwork.title}`}
      >
        {/* Image */}
        <div className="relative overflow-hidden bg-stone/10">
          <Image
            src={artwork.image}
            alt={artwork.title}
            width={artwork.aspectRatio === 'landscape' ? 800 : 600}
            height={artwork.aspectRatio === 'landscape' ? 560 : artwork.aspectRatio === 'square' ? 600 : 800}
            className="w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] block"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-all duration-500" />
          {/* Center icon on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
            <div
              className="w-10 h-10 border border-cream/60 flex items-center justify-center"
              style={{ borderRadius: '50%' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </div>
          </div>
        </div>

      </button>
    </div>
  )
}

export default function CollectionPage() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null)

  const selectedIndex = selectedArtwork
    ? collectionWorks.findIndex((a) => a.id === selectedArtwork.id)
    : -1

  const handlePrev = useCallback(() => {
    if (selectedIndex > 0) setSelectedArtwork(collectionWorks[selectedIndex - 1])
    else setSelectedArtwork(collectionWorks[collectionWorks.length - 1])
  }, [selectedIndex])

  const handleNext = useCallback(() => {
    if (selectedIndex < collectionWorks.length - 1) setSelectedArtwork(collectionWorks[selectedIndex + 1])
    else setSelectedArtwork(collectionWorks[0])
  }, [selectedIndex])

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #EDE8DE, #DDD4C4)' }}>
      {/* Header */}
      <section className="pt-36 md:pt-44 pb-12 px-6 md:px-10 max-w-7xl mx-auto">
        <p className="section-label mb-4">The Collection</p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <ScrollReveal delay={0.06}>
            <h1
              className="font-display text-charcoal"
              style={{
                fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)',
                fontWeight: 400,
                lineHeight: 1.05,
              }}
            >
              All Works
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.12} className="md:max-w-xs">
            <p className="font-body text-muted text-sm leading-relaxed">
              {collectionWorks.length} works available. Click any piece to view details and inquire.
              Each sculpture is unique and available to collectors globally.
            </p>
          </ScrollReveal>
        </div>
        <div className="divider" />
      </section>

      {/* Masonry Grid */}
      <div className="px-1 md:px-2 pb-2">
        <div className="masonry-grid">
          {collectionWorks.map((artwork) => (
            <MasonryItem
              key={artwork.id}
              artwork={artwork}
              onClick={() => setSelectedArtwork(artwork)}
            />
          ))}
        </div>
      </div>

      {/* Inquiry CTA */}
      <section
        className="border-t border-border py-16 px-6 md:px-10"
        style={{ backgroundColor: '#EEE8E0' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <ScrollReveal>
            <p className="section-label mb-2">Acquire a Work</p>
            <p className="font-display text-charcoal text-2xl md:text-3xl">
              Interested in a piece?
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <a href="/inquire" className="btn-primary">
              Make an Inquiry
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        artwork={selectedArtwork}
        artworks={collectionWorks}
        onClose={() => setSelectedArtwork(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  )
}
