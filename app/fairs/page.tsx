'use client'

import Image from 'next/image'
import ScrollReveal from '@/components/ScrollReveal'

const PHOTOS = [
  '/images/fairs/Art-fair-mont/GCS-Art-Fairmont-20260118_0082.jpg',
  '/images/fairs/Art-fair-mont/GCS-Art-Fairmont-20260118_0102.jpg',
  '/images/fairs/Art-fair-mont/GCS-Art-Fairmont-20260118_0130.jpg',
  '/images/fairs/Art-fair-mont/GCS-Art-Fairmont-20260118_0139.jpg',
]

export default function FairsPage() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #DDD0BA, #CCBFA0)' }}>

      {/* ── Header ─────────────────────────────────────────── */}
      <section className="pt-40 md:pt-52 px-6 md:px-16 max-w-7xl mx-auto">
        <ScrollReveal>
          <h1
            className="font-display text-charcoal"
            style={{
              fontSize: 'clamp(3.5rem, 9vw, 9rem)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            Art-Fair-Mont
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p
            className="font-body text-muted mt-4 mb-5"
            style={{ fontSize: '0.9rem', fontWeight: 300, letterSpacing: '0.01em', maxWidth: '32rem' }}
          >
            Boutique art fair in San Francisco during SF Art Week
          </p>
          <div className="flex items-center gap-4 mb-24 md:mb-36">
            <span
              className="font-body"
              style={{
                fontSize: '0.78rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--charcoal)',
                opacity: 0.5,
              }}
            >
              January 2026
            </span>
            <span style={{ color: 'var(--stone)', opacity: 0.35 }}>·</span>
            <a
              href="https://art-fair-mont.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body"
              style={{
                fontSize: '0.78rem',
                letterSpacing: '0.1em',
                color: 'var(--charcoal)',
                opacity: 0.45,
                textDecoration: 'none',
                borderBottom: '1px solid currentColor',
                paddingBottom: '1px',
                transition: 'opacity 0.25s ease',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.8')}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.45')}
            >
              art-fair-mont.com
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Photo grid ─────────────────────────────────────── */}
      <section className="px-6 md:px-16 max-w-7xl mx-auto pb-40">

        {/* First pair */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">

          {/* Photo 1 — large landscape, left */}
          <ScrollReveal className="md:col-start-1 md:col-end-9">
            <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
              <Image
                src={PHOTOS[0]}
                alt="Art-Fair-Mont January 2026"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 58vw"
                priority
              />
            </div>
          </ScrollReveal>

          {/* Photo 2 — portrait, right, dropped down */}
          <ScrollReveal delay={0.12} className="md:col-start-10 md:col-end-13 md:mt-28">
            <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
              <Image
                src={PHOTOS[1]}
                alt="Art-Fair-Mont January 2026"
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
                alt="Art-Fair-Mont January 2026"
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
                alt="Art-Fair-Mont January 2026"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 46vw"
              />
            </div>
          </ScrollReveal>

        </div>

      </section>

    </div>
  )
}
