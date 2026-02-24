'use client'

import Image from 'next/image'
import Link from 'next/link'
import { artists } from '@/lib/data'
import ScrollReveal from '@/components/ScrollReveal'

function ArtistSection({
  artist,
  index,
}: {
  artist: (typeof artists)[0]
  index: number
}) {
  const isEven = index % 2 === 0

  return (
    <section className="py-20 md:py-28 border-b border-border last:border-0">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start ${
            !isEven ? 'md:[&>*:first-child]:order-2' : ''
          }`}
        >
          {/* Image column */}
          <ScrollReveal>
            <div className="relative overflow-hidden group">
              <Image
                src={artist.image}
                alt={artist.name}
                width={700}
                height={860}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                style={{ aspectRatio: '5/6' }}
              />
              {/* Number overlay */}
              <div
                className="absolute top-6 left-6 font-display text-cream/20"
                style={{ fontSize: '5rem', fontWeight: 300, lineHeight: 1 }}
              >
                0{index + 1}
              </div>
            </div>

            {/* Caption beneath image */}
            <div className="mt-5 flex items-center gap-4">
              <div className="w-8 h-px bg-terracotta" />
              <p className="section-label text-stone">
                {artist.origin} · b. {artist.born}
              </p>
            </div>
          </ScrollReveal>

          {/* Text column */}
          <ScrollReveal className="flex flex-col justify-center pt-0 md:pt-12">
            <p className="section-label mb-5">Artist Profile</p>
            <h2
              className="font-display text-charcoal mb-6"
              style={{
                fontSize: 'clamp(2.2rem, 4vw, 4rem)',
                fontWeight: 400,
                lineHeight: 1.05,
              }}
            >
              {artist.name}
            </h2>

            <div className="divider mb-8" />

            <p className="font-body text-muted leading-relaxed mb-6 text-sm md:text-base">
              {artist.bio}
            </p>
            <p className="font-body text-muted leading-relaxed mb-10 text-sm md:text-base">
              {artist.extended}
            </p>

            {/* Signature style */}
            <div className="border-l-2 border-terracotta pl-5 mb-10">
              <p className="section-label mb-2">Signature Style</p>
              <p className="font-body text-sm text-charcoal leading-relaxed">
                {artist.signature}
              </p>
            </div>

            <Link href="/collection" className="btn-outline self-start">
              View Works by {artist.name.split(' ')[0]}
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default function ArtistsPage() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #F3E9CE, #E0D0A8)' }}>
      {/* Header */}
      <section className="pt-36 md:pt-44 pb-16 px-6 md:px-10 max-w-7xl mx-auto">
        <p className="section-label mb-4">Represented Artists</p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <ScrollReveal delay={0.06}>
            <h1
              className="font-display text-charcoal"
              style={{
                fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)',
                fontWeight: 400,
                lineHeight: 1.05,
              }}
            >
              The Sculptors
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.12} className="md:max-w-sm">
            <p className="font-body text-muted text-sm leading-relaxed">
              Slab of Africa represents three of Zimbabwe's most significant Shona stone sculptors,
              each bringing a singular artistic vision to this ancient tradition.
            </p>
          </ScrollReveal>
        </div>
        <div className="divider mt-10" />
      </section>

      {/* Artist list overview */}
      <div className="px-6 md:px-10 max-w-7xl mx-auto pb-8">
        <ScrollReveal>
          <div className="grid grid-cols-3 gap-px bg-border">
            {artists.map((artist, i) => (
              <div key={artist.id} className="px-6 py-5" style={{ backgroundColor: '#EDE3CF' }}>
                <p className="section-label text-stone mb-1">0{i + 1}</p>
                <p className="font-display text-charcoal text-lg md:text-xl">{artist.name}</p>
                <p className="font-body text-xs text-muted mt-1">b. {artist.born}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Artist sections */}
      <div>
        {artists.map((artist, i) => (
          <ArtistSection key={artist.id} artist={artist} index={i} />
        ))}
      </div>

      {/* CTA */}
      <section className="py-20 px-6 md:px-10 border-t border-border" style={{ backgroundColor: '#F5EAD8' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <ScrollReveal>
            <p className="section-label mb-2">The Collection</p>
            <h2 className="font-display text-charcoal text-2xl md:text-3xl">
              See the works these artists have made.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Link href="/collection" className="btn-primary">
              Browse Collection
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
