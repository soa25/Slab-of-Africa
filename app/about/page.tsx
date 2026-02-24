'use client'

import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

function SectionImage({ src, alt, aspect = '4/3' }: { src: string; alt: string; aspect?: string }) {
  return (
    <ScrollReveal className="relative overflow-hidden group">
      <Image
        src={src}
        alt={alt}
        width={900}
        height={600}
        className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        style={{ aspectRatio: aspect }}
      />
    </ScrollReveal>
  )
}

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #F2E6D8, #DECCBA)' }}>
      {/* Header */}
      <section className="pt-36 md:pt-44 pb-16 px-6 md:px-10 max-w-7xl mx-auto">
        <p className="section-label mb-4">Our Story</p>
        <ScrollReveal delay={0.06}>
          <h1
            className="font-display text-charcoal"
            style={{
              fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)',
              fontWeight: 400,
              lineHeight: 1.05,
            }}
          >
            About
          </h1>
        </ScrollReveal>
        <div className="divider mt-10" />
      </section>

      {/* ── Section 1: Shona Art Tradition ─────────────── */}
      <section className="py-20 md:py-28 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
            {/* Text */}
            <div>
              <ScrollReveal delay={0}>
                <p className="section-label mb-5 text-terracotta">I — The Art Form</p>
              </ScrollReveal>
              <ScrollReveal delay={0.06}>
                <h2
                  className="font-display text-charcoal mb-8"
                  style={{
                    fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
                    fontWeight: 400,
                    lineHeight: 1.1,
                  }}
                >
                  Shona Stone Sculpture
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p className="font-body text-muted leading-relaxed mb-5 text-sm md:text-base">
                  The Shona people of Zimbabwe have been carving stone for centuries, but the modern
                  movement began in the late 1950s when sculptor Frank McEwen established the
                  National Gallery of Zimbabwe's workshop program in Harare. What emerged was not a
                  craft revival, but a fully realized contemporary art movement — one that quickly
                  gained international recognition for its originality, spiritual depth, and formal
                  mastery.
                </p>
                <p className="font-body text-muted leading-relaxed mb-5 text-sm md:text-base">
                  Unlike many traditional art forms, Shona stone sculpture has no ancient
                  precedent in the sculptural sense — it is genuinely modern, born from the
                  intersection of ancient Shona spiritual beliefs, the natural abundance of
                  extraordinary stone in Zimbabwe's geological landscape, and the creative
                  liberation that came from McEwen's radical educational philosophy: no instruction,
                  only encouragement.
                </p>
                <p className="font-body text-muted leading-relaxed text-sm md:text-base">
                  The stones themselves are foundational to the work: springstone, serpentine,
                  verdite, and opal stone — each with its own color range, hardness, and character.
                  Sculptors work directly with the stone, without preliminary models, responding to
                  its form and natural markings as the work emerges. This direct relationship
                  between artist and material is perhaps the defining quality of the tradition.
                </p>
              </ScrollReveal>
            </div>

            {/* Images */}
            <div className="space-y-5">
              <SectionImage
                src="https://picsum.photos/seed/slab-ab1/800/560"
                alt="Shona stone carving process"
                aspect="16/11"
              />
              <div className="grid grid-cols-2 gap-5">
                <SectionImage
                  src="https://picsum.photos/seed/slab-ab2/500/620"
                  alt="Zimbabwe serpentine stone"
                  aspect="4/5"
                />
                <SectionImage
                  src="https://picsum.photos/seed/slab-ab3/500/620"
                  alt="Carving tools and process"
                  aspect="4/5"
                />
              </div>
            </div>
          </div>

          {/* Pullquote */}
          <ScrollReveal className="mt-20 border-l-2 border-terracotta pl-8 md:pl-12 max-w-3xl">
            <blockquote
              className="font-display text-charcoal"
              style={{
                fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 1.4,
              }}
            >
              "The stone already contains the sculpture. The artist's task is simply to reveal
              what was always there."
            </blockquote>
            <p className="section-label mt-4 text-stone">— Shona carving philosophy</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Section 2: The Gallery ─────────────────────── */}
      <section className="py-20 md:py-28 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {/* Full-width image first */}
          <ScrollReveal className="mb-16">
            <div className="relative overflow-hidden">
              <Image
                src="https://picsum.photos/seed/slab-ab4/1200/600"
                alt="Slab of Africa gallery"
                width={1200}
                height={600}
                className="w-full object-cover"
                style={{ aspectRatio: '21/10' }}
              />
              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                <span className="section-label text-cream/70 bg-dark/60 backdrop-blur-sm px-3 py-1.5">
                  Slab of Africa · San Francisco
                </span>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <ScrollReveal>
              <p className="section-label mb-5 text-terracotta">II — The Gallery</p>
              <h2
                className="font-display text-charcoal mb-8"
                style={{
                  fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
                  fontWeight: 400,
                  lineHeight: 1.1,
                }}
              >
                Slab of Africa
              </h2>
            </ScrollReveal>

            <div className="space-y-5">
              <ScrollReveal delay={0.06}>
                <p className="font-body text-muted leading-relaxed text-sm md:text-base">
                  Founded in San Francisco, Slab of Africa was established with a single clear
                  conviction: that Shona stone sculpture deserves a place at the very top of the
                  contemporary art world. Not as folk art, not as ethnographic object, but as
                  serious, ambitious, formally rigorous sculpture made by serious, ambitious, formally
                  rigorous artists.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p className="font-body text-muted leading-relaxed text-sm md:text-base">
                  The gallery works directly with artists in Zimbabwe, traveling to studios and
                  workshops to select works that meet an exacting standard. We do not buy in bulk
                  and we do not compromise on quality. Every piece in the collection has been
                  personally chosen because it is genuinely exceptional.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.14}>
                <p className="font-body text-muted leading-relaxed text-sm md:text-base">
                  In addition to direct sales, Slab of Africa participates in leading American and
                  international art fairs, placing Shona sculpture in the conversations where it
                  belongs — alongside the best contemporary work being made anywhere in the world.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.18}>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {[
                    { n: '3', label: 'Artists represented' },
                    { n: '15+', label: 'Works in collection' },
                    { n: '3', label: 'Fairs exhibited' },
                    { n: 'SF', label: 'Based in San Francisco' },
                  ].map(({ n, label }) => (
                    <div key={label} className="border border-border p-5">
                      <p
                        className="font-display text-charcoal mb-1"
                        style={{ fontSize: '2.2rem', fontWeight: 300 }}
                      >
                        {n}
                      </p>
                      <p className="section-label text-stone">{label}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: The Founder ─────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
            {/* Image */}
            <div className="md:order-2">
              <SectionImage
                src="https://picsum.photos/seed/slab-ab5/680/820"
                alt="Gallery founder"
                aspect="5/6"
              />
            </div>

            {/* Text */}
            <div className="md:order-1">
              <ScrollReveal>
                <p className="section-label mb-5 text-terracotta">III — The Founder</p>
                <h2
                  className="font-display text-charcoal mb-8"
                  style={{
                    fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
                    fontWeight: 400,
                    lineHeight: 1.1,
                  }}
                >
                  A Lifelong
                  <br />
                  <em style={{ fontStyle: 'italic', fontWeight: 300 }}>Encounter with Stone</em>
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.08}>
                <p className="font-body text-muted leading-relaxed mb-5 text-sm md:text-base">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. The founder's first
                  encounter with Shona sculpture came during a trip to Harare in the early 2000s,
                  where a visit to the National Gallery changed everything. Standing before a
                  Benhura piece, she understood — in a way that transcended language or analysis —
                  that this was among the great sculptural traditions of the twentieth century.
                </p>
                <p className="font-body text-muted leading-relaxed mb-5 text-sm md:text-base">
                  Over the following years, she returned to Zimbabwe repeatedly, building
                  relationships with artists, visiting studios, and developing a deep understanding
                  of the tradition's history, materials, and contemporary practice. Slab of Africa
                  was born from this accumulated love and knowledge — a project as personal as it is
                  professional.
                </p>
                <p className="font-body text-muted leading-relaxed mb-10 text-sm md:text-base">
                  Based in San Francisco's Hayes Valley neighborhood, she brings to the gallery both
                  a collector's eye and an advocate's conviction that these works — and these artists —
                  deserve far wider recognition than they have yet received.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.14}>
                <Link href="/inquire" className="btn-primary">
                  Get in Touch
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
