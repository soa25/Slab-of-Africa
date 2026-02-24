'use client'

import Image from 'next/image'
import Link from 'next/link'
import { fairs } from '@/lib/data'
import ScrollReveal from '@/components/ScrollReveal'

function FairSection({
  fair,
  index,
}: {
  fair: (typeof fairs)[0]
  index: number
}) {
  return (
    <article className="py-20 md:py-28 border-b border-border last:border-0">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Fair header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span
                  className="font-display text-border"
                  style={{ fontSize: '4rem', fontWeight: 300, lineHeight: 1 }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="w-px h-10 bg-border" />
                <div>
                  <p className="section-label text-stone mb-1">{fair.dates}</p>
                  <p className="section-label text-terracotta">{fair.location}</p>
                </div>
              </div>
              <h2
                className="font-display text-charcoal"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 4rem)',
                  fontWeight: 400,
                  lineHeight: 1.05,
                }}
              >
                {fair.name}
                <br />
                <span className="text-stone" style={{ fontSize: '60%', fontWeight: 300 }}>
                  {fair.year}
                </span>
              </h2>
            </div>

            <div className="md:max-w-xs">
              <div className="border-l-2 border-terracotta pl-5">
                <p className="section-label mb-2 text-stone">Highlight</p>
                <p className="font-body text-sm text-charcoal leading-relaxed">
                  {fair.highlight}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Photo grid */}
        <ScrollReveal>
          <div className="grid grid-cols-12 gap-4 mb-10">
            {/* Large image */}
            <div className="col-span-12 md:col-span-7 relative overflow-hidden group">
              <Image
                src={fair.images[0]}
                alt={`${fair.name} ${fair.year}`}
                width={800}
                height={580}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                style={{ aspectRatio: '16/11' }}
              />
            </div>

            {/* Two smaller images */}
            <div className="col-span-12 md:col-span-5 flex flex-col gap-4">
              {fair.images.slice(1).map((img, i) => (
                <div key={i} className="relative overflow-hidden group flex-1">
                  <Image
                    src={img}
                    alt={`${fair.name} ${fair.year} — ${i + 2}`}
                    width={600}
                    height={380}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    style={{ aspectRatio: '3/2' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Description */}
        <ScrollReveal>
          <p className="font-body text-muted leading-relaxed text-sm md:text-base max-w-3xl">
            {fair.description}
          </p>
        </ScrollReveal>
      </div>
    </article>
  )
}

export default function FairsPage() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #EFE0C0, #D8C490)' }}>
      {/* Header */}
      <section className="pt-36 md:pt-44 pb-16 px-6 md:px-10 max-w-7xl mx-auto">
        <p className="section-label mb-4">Exhibitions</p>
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
              Art Fairs
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.12} className="md:max-w-xs">
            <p className="font-body text-muted text-sm leading-relaxed">
              Slab of Africa brings Shona stone sculpture to the world's leading art fairs —
              placing these works in direct dialogue with contemporary art at the highest level.
            </p>
          </ScrollReveal>
        </div>
        <div className="divider mt-10" />
      </section>

      {/* Fair stats bar */}
      <div className="px-6 md:px-10 max-w-7xl mx-auto mb-4">
        <ScrollReveal>
          <div className="grid grid-cols-3 gap-px bg-border">
            {[
              { value: `${fairs.length}`, label: 'Fairs Presented' },
              { value: '3', label: 'Cities' },
              { value: '2023–24', label: 'Active Years' },
            ].map(({ value, label }) => (
              <div key={label} className="px-6 py-6 text-center" style={{ backgroundColor: '#E8DBBB' }}>
                <p
                  className="font-display text-charcoal mb-1"
                  style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 300 }}
                >
                  {value}
                </p>
                <p className="section-label text-stone">{label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Fair sections */}
      <div>
        {fairs.map((fair, i) => (
          <FairSection key={fair.id} fair={fair} index={i} />
        ))}
      </div>

      {/* Upcoming / CTA */}
      <section className="py-20 px-6 md:px-10 border-t border-border" style={{ backgroundColor: '#EDDDBA' }}>
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <p className="section-label mb-4 text-terracotta">Coming Up</p>
            <h2
              className="font-display text-charcoal mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', fontWeight: 400 }}
            >
              Interested in seeing the work before acquiring?
            </h2>
            <p className="font-body text-muted text-sm max-w-lg mb-8 leading-relaxed">
              Contact us to learn about upcoming fair schedules, private viewings in San Francisco,
              or to arrange for a piece to be shipped for your consideration.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Link href="/inquire" className="btn-primary">
              Get in Touch
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
