'use client'

import Image from 'next/image'
import ScrollReveal from '@/components/ScrollReveal'

function AboutImage({ src, alt, priority }: { src: string; alt: string; priority?: boolean }) {
  return (
    <Image
      src={src}
      alt={alt}
      title={alt}
      width={0}
      height={0}
      sizes="(max-width: 768px) 95vw, 45vw"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      priority={priority}
    />
  )
}

export default function AboutPage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(to bottom, #F2E6D8, #DECCBA)' }}
    >
      {/* Clear the fixed nav */}
      <div className="pt-36 md:pt-44" />

      <div className="px-6 md:px-10 max-w-7xl mx-auto">

        {/* ── Section 1: About Slab of Africa — text left · image right ────── */}
        <section className="py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-x-12 md:gap-x-20 gap-y-12 items-start">

            <ScrollReveal delay={0.05}>
              <p className="section-label mb-6">About</p>
              <h2
                className="font-display text-charcoal"
                style={{
                  fontSize: 'clamp(2.4rem, 4vw, 4rem)',
                  fontWeight: 300,
                  lineHeight: 1.05,
                  letterSpacing: '-0.015em',
                  marginBottom: '2rem',
                }}
              >
                About Slab<br />
                <em style={{ fontStyle: 'italic', fontWeight: 300 }}>of Africa</em>
              </h2>
              <div className="space-y-5">
                <p className="font-body text-muted leading-relaxed" style={{ fontSize: '0.975rem' }}>
                  Slab of Africa exists for one reason: the world should know these artists.
                </p>
                <p className="font-body text-muted leading-relaxed" style={{ fontSize: '0.975rem' }}>
                  Across Zimbabwe, there are sculptors of extraordinary talent, men and women who have spent their lives mastering one of the most demanding art forms in existence, carving form from solid stone with nothing but hand tools and instinct. Many have never had the platform their work deserves. The international stage has largely been out of reach, not for lack of talent, but lack of access.
                </p>
                <p className="font-body text-muted leading-relaxed" style={{ fontSize: '0.975rem' }}>
                  Sculpture is one of the most underrepresented art forms in the global market. In a world increasingly shaped by automation and mass production, there is something profound about an object made entirely by hand, where every mark, every surface, every decision belongs to a single person. No two pieces are alike. Nothing is reproduced. Each work is as singular as the person who made it.
                </p>
                <p className="font-body text-muted leading-relaxed" style={{ fontSize: '0.975rem' }}>
                  That is what we are here to celebrate and to change. Slab of Africa represents these artists directly, placing their work in front of collectors, interiors, and institutions across the United States and beyond. Every acquisition creates a tangible path toward wider recognition, greater opportunity, and a future where these sculptors can take their place on the world stage on their own terms.
                </p>
                <p className="font-body text-muted leading-relaxed" style={{ fontSize: '0.975rem' }}>
                  Every piece is a direct connection between the person who made it and the person who now holds it. That connection is, in many ways, the whole point.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.13}>
              <AboutImage
                src="/images/about/DSC_1014.JPG"
                alt="Hand-carved Shona stone sculpture from Zimbabwe — serpentine and springstone African art carved from a single block"
                priority
              />
            </ScrollReveal>

          </div>
        </section>

        <div className="divider" />

        {/* ── Section 2: The Tradition — image left · text right ──────────── */}
        <section className="py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-x-12 md:gap-x-20 gap-y-12 items-start">

            {/* Image — second in DOM (mobile: below text), first on desktop */}
            <ScrollReveal delay={0.13}>
              <div className="order-2 md:order-1">
                <AboutImage
                  src="/images/about/DSC_1187.JPG"
                  alt="Unique handmade Shona sculpture — authentic Zimbabwe stone art, one-of-a-kind African handmade artwork"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <div className="order-1 md:order-2">
                <p className="section-label mb-6">The Craft</p>
                <h2
                  className="font-display text-charcoal"
                  style={{
                    fontSize: 'clamp(2.4rem, 4vw, 4rem)',
                    fontWeight: 300,
                    lineHeight: 1.05,
                    letterSpacing: '-0.015em',
                    marginBottom: '2rem',
                  }}
                >
                  The<br />
                  <em style={{ fontStyle: 'italic', fontWeight: 300 }}>Tradition</em>
                </h2>
                <div className="space-y-5">
                  <p className="font-body text-muted leading-relaxed" style={{ fontSize: '0.975rem' }}>
                    Shona stone sculpture is not a trend. It is a tradition centuries in the making.
                  </p>
                  <p className="font-body text-muted leading-relaxed" style={{ fontSize: '0.975rem' }}>
                    Rooted in the soil of Zimbabwe, the craft has been passed down through generations, from parent to child, uncle to nephew, master to apprentice. Many of the sculptors working today are direct descendants of the artists who first carved spirit forms under open skies decades ago. The knowledge lives in the hands, not in textbooks.
                  </p>
                  <p className="font-body text-muted leading-relaxed" style={{ fontSize: '0.975rem' }}>
                    Every sculpture begins with a single raw block of stone. Springstone, serpentine, green opal, each one untouched, unpredictable, and full of potential. There are no moulds, no repetitions, no shortcuts. The artist works the stone with chisels and rasps until a form emerges, one that has never existed before and never will again. What remains is not just an object. It is time, made solid.
                  </p>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </section>

        <div className="divider" />

        {/* ── Section 3: The Founder — text left · image right ────────────── */}
        <section className="py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-x-12 md:gap-x-20 gap-y-12 items-start">

            <ScrollReveal delay={0.05}>
              <p className="section-label mb-6">The People</p>
              <h2
                className="font-display text-charcoal"
                style={{
                  fontSize: 'clamp(2.4rem, 4vw, 4rem)',
                  fontWeight: 300,
                  lineHeight: 1.05,
                  letterSpacing: '-0.015em',
                  marginBottom: '2rem',
                }}
              >
                The<br />
                <em style={{ fontStyle: 'italic', fontWeight: 300 }}>Founder</em>
              </h2>
              <div className="space-y-5">
                <p className="font-body text-muted leading-relaxed" style={{ fontSize: '0.975rem' }}>
                  Shaan is a third-generation Zimbabwean, raised there, schooled there, and shaped by it in ways that still show up in everything he builds.
                </p>
                <p className="font-body text-muted leading-relaxed" style={{ fontSize: '0.975rem' }}>
                  He has been starting businesses since the age of fifteen. Not out of necessity, but out of a genuine restlessness, a need to find problems worth solving and build something around them. Art was always a presence in his life, something he was drawn to without quite knowing what to do with it.
                </p>
                <p className="font-body text-muted leading-relaxed" style={{ fontSize: '0.975rem' }}>
                  It wasn't until a trip abroad that sculpture became something more than appreciation. He picked up a few small pieces as gifts for a friend's family and watched what happened when he handed them over. The way people stopped, turned them over in their hands, asked where they came from. There was something in that reaction he hadn't expected. A recognition. A hunger for something real, something made.
                </p>
                <p className="font-body text-muted leading-relaxed" style={{ fontSize: '0.975rem' }}>
                  He went back to the artists. Spent time with them. Learned not just about the work but about the people behind it, their craft, their lives, the gap between the quality of what they were producing and the reach they had. He saw talent of a genuinely rare order, largely invisible to the rest of the world. Not because the work wasn't good enough. Because the infrastructure to carry it outward simply didn't exist.
                </p>
                <p className="font-body text-muted leading-relaxed" style={{ fontSize: '0.975rem' }}>
                  So he built one. He brought a selection of pieces to the United States, introduced them to collectors, and paid close attention to what happened next. The response confirmed what he had suspected from the beginning. The work could stand anywhere, in front of anyone.
                </p>
                <p className="font-body text-muted leading-relaxed" style={{ fontSize: '0.975rem' }}>
                  That is where Slab of Africa began, and where it continues from.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.13}>
              <AboutImage
                src="/images/about/DSC_1191.JPG"
                alt="Zimbabwe Shona stone carving tradition — handmade African sculpture passed through generations of artists"
              />
            </ScrollReveal>

          </div>
        </section>

      </div>

      {/* Closing breath before footer */}
      <div className="h-16 md:h-24" />

    </div>
  )
}
