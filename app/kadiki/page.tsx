import type { Metadata } from 'next'
import Image from 'next/image'
import ScrollReveal from '@/components/ScrollReveal'
import WaitlistForm from './WaitlistForm'
import KadikiWord from './KadikiWord'

// Placeholder page: noindex and left out of the sitemap until it has content
export const metadata: Metadata = {
  title: 'Kadiki',
  robots: { index: false },
  alternates: {
    canonical: 'https://www.slabofafrica.com/kadiki',
  },
}

const BODY = [
  <>In Shona, <KadikiWord>kadiki</KadikiWord> means little one.</>,
  <><KadikiWord>Kadiki</KadikiWord> is a new collection of small sculptures from Slab of Africa: animals, family groups and timeless Shona forms, carved by three sculptors working exclusively with us on this collection.</>,
  <>Each design is carved again and again, but no two pieces are ever the same. Every sculpture begins as its own block of stone and is shaped entirely by hand. The grain, the colour and the way the stone takes the light are different every time. The piece you receive will carry its own character, a little different from the one pictured and from every other in the world.</>,
  <>These are works to live with every day, to gift, or to begin a collection. They carry the same stone, the same hands and the same tradition as our larger works, at a scale and price that welcome more people in.</>,
]

const PHOTOS = [
  { src: '/images/kadiki/kadiki-1.jpg', width: 1086, height: 1448, alt: 'Kadiki small Shona stone sculpture carved by hand' },
  { src: '/images/kadiki/kadiki-2.jpg', width: 1536, height: 1024, alt: 'Kadiki small hand-carved Shona stone sculptures from Slab of Africa' },
  { src: '/images/kadiki/kadiki-3.jpg', width: 1086, height: 1448, alt: 'Kadiki hand-carved Shona stone sculpture showing the natural grain of the stone' },
]

export default function KadikiPage() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #FAF0E2, #E0D5C5)' }}>
      <section className="pt-36 md:pt-44 pb-32 px-6 md:px-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_40%] lg:grid-rows-[auto_1fr] lg:gap-x-16">
        {/* Heading and subheading: top of left column */}
        <div className="lg:col-start-1 lg:row-start-1">
        <p className="section-label mb-4" style={{ color: 'var(--terracotta)' }}>Coming soon</p>
        <ScrollReveal>
          <h1
            className="font-kadiki text-charcoal"
            style={{
              fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              lineHeight: 1.05,
            }}
          >
            Kadiki
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <p
            className="font-display text-charcoal mt-6"
            style={{
              fontSize: 'clamp(1.5rem, 2.4vw, 2rem)',
              fontWeight: 300,
              lineHeight: 1.2,
            }}
          >
            Small works, carved by hand
          </p>
        </ScrollReveal>
        </div>

        {/* Photo mosaic: right column on desktop, between subheading and body on mobile.
            Top row: the two portraits share one height because each flex-grows by its aspect ratio.
            Bottom row: the landscape at full width. Nothing is cropped. */}
        <div className="mt-12 lg:mt-0 lg:col-start-2 lg:row-start-1 lg:row-span-2 self-start flex flex-col gap-3">
          <div className="flex gap-3">
            {[PHOTOS[0], PHOTOS[2]].map((photo, i) => (
              <div key={photo.src} style={{ flex: `${photo.width / photo.height} 1 0`, minWidth: 0 }}>
                <ScrollReveal delay={0.1 + i * 0.1}>
                  <Image
                    src={photo.src}
                    width={photo.width}
                    height={photo.height}
                    alt={photo.alt}
                    sizes="(min-width: 1280px) 230px, (min-width: 1024px) 20vw, 50vw"
                    priority={photo === PHOTOS[0]}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </ScrollReveal>
              </div>
            ))}
          </div>
          <ScrollReveal delay={0.3}>
            <Image
              src={PHOTOS[1].src}
              width={PHOTOS[1].width}
              height={PHOTOS[1].height}
              alt={PHOTOS[1].alt}
              sizes="(min-width: 1280px) 460px, (min-width: 1024px) 40vw, 100vw"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </ScrollReveal>
        </div>

        {/* Body copy and waitlist: rest of left column */}
        <div className="lg:col-start-1 lg:row-start-2">

        <ScrollReveal delay={0.1}>
          <div className="mt-12 space-y-5" style={{ maxWidth: '40rem' }}>
            {BODY.map((paragraph, i) => (
              <p key={i} className="font-body text-muted leading-relaxed" style={{ fontSize: '0.975rem' }}>
                {paragraph}
              </p>
            ))}
          </div>
        </ScrollReveal>

        {/* Coming soon */}
        <ScrollReveal delay={0.1}>
          <div className="mt-8" style={{ maxWidth: '40rem' }}>
            <p className="font-body text-muted leading-relaxed mb-8" style={{ fontSize: '0.975rem' }}>
              Join the list to be the first to know when <KadikiWord>Kadiki</KadikiWord> launches.
            </p>
            <WaitlistForm />
          </div>
        </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
