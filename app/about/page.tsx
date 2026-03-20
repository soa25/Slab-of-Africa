'use client'

import Image from 'next/image'
import ScrollReveal from '@/components/ScrollReveal'

// ─── Images — one per section ─────────────────────────────────────────────────
const IMAGES = [
  '/images/about/DSC_1014.JPG',
  '/images/about/DSC_1187.JPG',
  '/images/about/DSC_1191.JPG',
  '/images/about/DSC_1213.JPG',
  '/images/about/DSC_1207.jpg',
]

// ─── Section content ──────────────────────────────────────────────────────────
const SECTIONS = [
  {
    title: 'Each piece is hand carved from a single stone.',
    imageAlt: 'Hand-carved Shona stone sculpture from Zimbabwe — serpentine and springstone African art carved from a single block',
    body: [
      'In Zimbabwe, every sculpture begins with a raw, solid block of stone — untouched, unpredictable, and full of potential. Whether it\'s the richly dark Spring Stone, the earthy texture of Serpentine, the vivid greens of Cobalt, or the soft, almost translucent beauty of Green Opal stone — the material itself plays a central role in what it becomes.',
      'From that single slab, an artist brings forth a form. There are no templates, no repetitions. Just hands, stone, and time.',
    ],
  },
  {
    title: 'No two pieces can ever be the same.',
    imageAlt: 'Unique handmade Shona sculpture — authentic Zimbabwe stone art, one-of-a-kind African handmade artwork',
    body: [
      'Each sculpture carries its own soul — shaped not only by the contours of the stone, but by the choices, moods, and instincts of the artist. Every curve, mark, and texture is intentional.',
      'What you hold is more than an object. It is a moment. A story. A singular expression that cannot be repeated.',
    ],
  },
  {
    title: 'This is not just art. It\'s inheritance.',
    imageAlt: 'Zimbabwe Shona stone carving tradition — handmade African sculpture passed through generations of artists',
    body: [
      'The roots of Shona stone sculpting run deep into Zimbabwean soil. Passed from parent to child, uncle to nephew, master to apprentice — this is a tradition that survives through hands and memory.',
      <>Many sculptors today are descendants of the original artists who carved spirit forms under the open sky decades ago. In this way, each sculpture in our <a href="/collection" className="link-underline" style={{ color: 'inherit' }}>collection</a> is also a vessel of history.</>,
    ],
  },
  {
    title: 'Carved by hand. Refined by fire. Washed by rain. Left to breathe.',
    imageAlt: 'Shona sculpture finishing process — hand carved Zimbabwe stone art waxed and polished by the artist',
    body: [
      'The process is as elemental as the material itself. First, the sculptor works the stone using chisels, rasps, and hammers. Slowly, a shape emerges. Once rough-carved, it is smoothed and detailed with sandpaper, sometimes for days.',
      'Then it is heated and waxed — a process that deepens its colour and reveals the natural grain. Finally, it is left in the open — under sun, wind, and rain — to breathe and settle into itself.',
    ],
  },
  {
    title: 'The artist does not shape the stone. The stone reveals the shape.',
    imageAlt: 'Shona artist at work — Zimbabwe handmade stone sculpture tradition and spiritual connection to African art',
    body: [
      'To many Shona sculptors, creating is not about control — it\'s about listening. They speak of entering into quiet conversation with the stone.',
      'It is a process of respect, instinct, and belief — that the sculpture already exists within, waiting to be found. The artist\'s job is simply to uncover what has always been there.',
    ],
  },
]

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(to bottom, #F2E6D8, #DECCBA)' }}
    >
      {/* Clear the fixed nav */}
      <div className="pt-36 md:pt-44" />

      {SECTIONS.map((section, i) => (
        <section key={i} className="pb-28 md:pb-40 px-6 md:px-10">

          {/* Title */}
          <ScrollReveal>
            <h2
              className="font-display text-charcoal text-center mx-auto"
              style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: '-0.015em',
                maxWidth: '44rem',
                marginBottom: '1.75rem',
              }}
            >
              {section.title}
            </h2>
          </ScrollReveal>

          {/* Body text */}
          <ScrollReveal delay={0.07}>
            <div
              className="mx-auto text-center"
              style={{ maxWidth: '34rem', marginBottom: '3.5rem' }}
            >
              {section.body.map((para, j) => (
                <p
                  key={j}
                  className="font-body text-muted leading-relaxed"
                  style={{
                    fontSize: '0.975rem',
                    marginBottom: j < section.body.length - 1 ? '1rem' : 0,
                  }}
                >
                  {para}
                </p>
              ))}
            </div>
          </ScrollReveal>

          {/* Image — natural proportions, no cropping */}
          <ScrollReveal delay={0.13}>
            <div
              className="mx-auto"
              style={{
                maxWidth: '80%',
                backgroundColor: '#DDD0BC',
                lineHeight: 0,
              }}
            >
              <Image
                src={IMAGES[i]}
                alt={section.imageAlt}
                title={section.imageAlt}
                width={0}
                height={0}
                sizes="(max-width: 768px) 95vw, 80vw"
                style={{ width: '100%', height: 'auto', display: 'block' }}
                priority={i === 0}
              />
            </div>
          </ScrollReveal>

        </section>
      ))}

      {/* Closing breath before footer */}
      <div className="h-16 md:h-24" />

    </div>
  )
}
