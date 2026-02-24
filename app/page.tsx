'use client'

import Image from 'next/image'
import Link from 'next/link'
import { recentAdditions } from '@/lib/data'
import ScrollReveal from '@/components/ScrollReveal'

function ArtworkCard({
  artwork,
  priority = false,
}: {
  artwork: (typeof recentAdditions)[0]
  priority?: boolean
}) {
  return (
    <Link href="/collection" className="group block">
      <div className="relative overflow-hidden bg-stone/10" style={{ aspectRatio: '2/3' }}>
          <Image
            src={artwork.image}
            alt={artwork.title}
            fill
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            priority={priority}
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
          {/* Info overlay - slides up on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
            <div className="backdrop-blur-sm bg-dark/80 px-4 py-3">
              <p className="section-label text-stone/80 mb-1">{artwork.material} · {artwork.year}</p>
              <p className="font-display text-cream text-xl">{artwork.title}</p>
            </div>
          </div>
        </div>
      {/* Card info below image */}
      <div className="pt-4 pb-2">
        <p className="section-label text-stone mb-1.5">{artwork.artist}</p>
        <h3 className="font-display text-charcoal text-xl md:text-2xl group-hover:text-terracotta transition-colors duration-300">
          {artwork.title}
        </h3>
        <p className="font-body text-sm text-muted mt-1">
          {artwork.material} · {artwork.size} · {artwork.year}
        </p>
      </div>
    </Link>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #FAF0E2, #E4CFA8)' }}>
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
              The latest works to join our collection — each piece carved by hand from Zimbabwean stone,
              carrying the deep traditions of the Shona people and the individual vision of the artist.
            </p>
            <Link href="/collection" className="btn-outline mt-6 inline-flex">
              View Full Collection
            </Link>
          </ScrollReveal>
        </div>

        {/* Thin divider with accent */}
        <div className="flex items-center gap-4 mb-16">
          <div className="divider flex-1" />
          <div className="w-1.5 h-1.5 rounded-full bg-terracotta flex-shrink-0" />
          <div className="divider flex-1" />
        </div>

        {/* Uniform artwork grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {recentAdditions.map((artwork, i) => (
            <ScrollReveal key={artwork.id} delay={i * 0.04}>
              <ArtworkCard artwork={artwork} priority={i < 5} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Interlude: Quote / Mission Statement */}
      <section className="py-24 md:py-36 px-6 md:px-10 border-t border-b border-border mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="section-label mb-8">The Work</p>
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

      {/* Artists preview */}
      <section className="py-20 md:py-28 px-6 md:px-10 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="section-label mb-2">Represented Artists</p>
              <h2
                className="font-display text-charcoal"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)', fontWeight: 400 }}
              >
                The Sculptors
              </h2>
            </div>
            <Link href="/artists" className="btn-outline hidden md:inline-flex">
              All Artists
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {['Dominic Benhura', 'Agnes Nyanhongo', 'Tafadzwa Chiwawa'].map((name, i) => {
            const seeds = ['slab-a1', 'slab-a2', 'slab-a3']
            const subtitles = [
              'Serpentine · Springstone',
              'Springstone · Opal Stone',
              'Serpentine · Verdite',
            ]
            return (
              <ScrollReveal key={name} delay={i * 0.08}>
                <Link href="/artists" className="group bg-cream block relative overflow-hidden">
                  <div className="relative overflow-hidden" style={{ paddingBottom: '120%' }}>
                    <Image
                      src={`https://picsum.photos/seed/${seeds[i]}/500/600`}
                      alt={name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <p className="section-label text-stone/80 mb-1">{subtitles[i]}</p>
                      <h3 className="font-display text-cream text-2xl">{name}</h3>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            )
          })}
        </div>

        <div className="mt-8 md:hidden">
          <Link href="/artists" className="btn-outline w-full text-center justify-center">
            All Artists
          </Link>
        </div>
      </section>

      {/* Upcoming Fairs CTA */}
      <section
        className="py-20 md:py-28 px-6 md:px-10 relative overflow-hidden"
        style={{ backgroundColor: '#1C1917' }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <p className="section-label text-stone mb-4">Art Fairs</p>
              <ScrollReveal delay={0.08}>
                <h2
                  className="font-display text-cream"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 4rem)',
                    fontWeight: 300,
                    lineHeight: 1.1,
                  }}
                >
                  See the work
                  <br />
                  <em style={{ color: 'var(--terracotta)', fontStyle: 'italic' }}>in person</em>
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.14}>
                <p className="font-body text-stone mt-4 max-w-sm text-sm leading-relaxed">
                  Slab of Africa exhibits at leading international art fairs, bringing Shona stone
                  sculpture to collectors and curators worldwide.
                </p>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={0.12}>
              <Link href="/fairs" className="btn-primary">
                View All Fairs
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  )
}
