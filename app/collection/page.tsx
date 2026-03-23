'use client'

import { useState, useCallback, useEffect, useRef, useMemo } from 'react'
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
        className="group block w-full text-left cursor-pointer focus:outline-none"
        onClick={onClick}
        aria-label={`View ${artwork.title}`}
      >
        {/* Image */}
        <div className="relative overflow-hidden bg-stone/10">
          <Image
            src={artwork.image}
            alt={`${artwork.title} — ${artwork.material} Shona sculpture by ${artwork.artist}`}
            title={`${artwork.title} — ${artwork.material} Shona sculpture by ${artwork.artist}`}
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

const SITE_URL = 'https://www.slabofafrica.com'

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Shona Stone Sculpture Collection — Slab of Africa',
  url: `${SITE_URL}/collection`,
  numberOfItems: collectionWorks.length,
  itemListElement: collectionWorks.map((w, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': ['VisualArtwork', 'Product'],
      name: w.title,
      creator: { '@type': 'Person', name: w.artist },
      artMedium: `${w.material} stone`,
      artForm: 'Shona stone sculpture',
      size: w.size,
      description: `${w.title} — ${w.material} Shona stone sculpture by ${w.artist}. ${w.size}.`,
      image: `${SITE_URL}${w.image}`,
      url: `${SITE_URL}/inquire`,
      brand: { '@type': 'Brand', name: 'Slab of Africa' },
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        seller: { '@type': 'Organization', name: 'Slab of Africa' },
        url: `${SITE_URL}/inquire`,
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingDestination: [
            { '@type': 'DefinedRegion', addressCountry: 'US' },
            { '@type': 'DefinedRegion', name: 'Worldwide' },
          ],
          shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'USD' },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            businessDays: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            },
            cutoffTime: '17:00',
          },
        },
        hasMerchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          applicableCountry: 'US',
          returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
          merchantReturnDays: 14,
          returnMethod: 'https://schema.org/ReturnByMail',
          returnFees: 'https://schema.org/FreeReturn',
          description: 'We accept returns within 14 days of delivery. Item must be in original condition. Contact us at shaan@slabofafrica.com to initiate a return.',
        },
      },
    },
  })),
}

export default function CollectionPage() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null)

  const leftColumn  = useMemo(() => collectionWorks.filter((_, i) => i % 2 === 0 || i === collectionWorks.length - 1), [])
  const rightColumn = useMemo(() => collectionWorks.filter((_, i) => i % 2 === 1 && i !== collectionWorks.length - 1), [])

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
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #D9CEBE, #C8BAA6)' }}>
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
              Curated selection of hand-carved Shona sculptures from Zimbabwe.
              Further details, including pricing, are available upon inquiry
            </p>
          </ScrollReveal>
        </div>
        <div className="divider" />
      </section>

      {/* Masonry Grid */}
      <div className="px-4 pb-2">
        <div className="masonry-grid">
          <div className="masonry-column">
            {leftColumn.map((artwork) => (
              <MasonryItem
                key={artwork.id}
                artwork={artwork}
                onClick={() => setSelectedArtwork(artwork)}
              />
            ))}
          </div>
          <div className="masonry-column">
            {rightColumn.map((artwork) => (
              <MasonryItem
                key={artwork.id}
                artwork={artwork}
                onClick={() => setSelectedArtwork(artwork)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Inquiry CTA */}
      <section
        className="border-t border-border py-16 px-6 md:px-10"
        style={{ backgroundColor: '#D4C9B8' }}
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
    </>
  )
}
