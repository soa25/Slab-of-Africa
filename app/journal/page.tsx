import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import ScrollReveal from '@/components/ScrollReveal'

// Placeholder page: noindex and left out of the sitemap until it has content
export const metadata: Metadata = {
  ...pageMetadata({
    path: '/journal',
    title: 'Journal',
    shareTitle: 'Journal | Slab of Africa',
    description: 'Notes on Shona stone sculpture, the artists and the stone, from Slab of Africa.',
  }),
  robots: { index: false },
}

export default function JournalPage() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #FAF0E2, #E0D5C5)' }}>
      <section className="pt-36 md:pt-44 pb-32 px-6 md:px-16 max-w-7xl mx-auto">
        <ScrollReveal>
          <h1
            className="font-display text-charcoal"
            style={{
              fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)',
              fontWeight: 400,
              lineHeight: 1.05,
            }}
          >
            Journal
          </h1>
        </ScrollReveal>
      </section>
    </div>
  )
}
