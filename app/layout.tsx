import type { Metadata } from 'next'
import { Cormorant, Jost } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import IntroAnimation from '@/components/IntroAnimation'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import ConditionalFooter from '@/components/ConditionalFooter'
import MotionProvider from '@/components/MotionProvider'
import EdgeFade from '@/components/EdgeFade'

const cormorant = Cormorant({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Slab of Africa — Shona Stone Sculpture',
    template: '%s | Slab of Africa',
  },
  description:
    'A San Francisco–based gallery specializing in contemporary Shona stone sculpture from Zimbabwe. Representing artists of international standing, available to collectors and through art fairs.',
  keywords: [
    'Shona sculpture',
    'Zimbabwe art',
    'African art gallery',
    'stone sculpture',
    'contemporary African art',
    'San Francisco art gallery',
    'Dominic Benhura',
    'Agnes Nyanhongo',
  ],
  openGraph: {
    title: 'Slab of Africa — Shona Stone Sculpture',
    description: 'Contemporary Shona stone sculpture from Zimbabwe, available through a San Francisco–based gallery.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        {/* Global grain/texture overlay — static SVG feTurbulence, no JS, no interaction */}
        <svg
          aria-hidden="true"
          style={{
            position: 'fixed', top: 0, left: 0,
            width: '100%', height: '100%',
            zIndex: 1,
            pointerEvents: 'none',
            opacity: 0.045,
          }}
        >
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>

        <MotionProvider>
        <SmoothScrollProvider>
          {/* Mobile edge fades — top and bottom gradient overlays */}
          <EdgeFade />

          {/* Cinematic intro animation */}
          <IntroAnimation />

          {/* Navigation */}
          <Navigation />

          {/* Page content */}
          <main>{children}</main>

          {/* Footer — hidden on /collection, see components/ConditionalFooter.tsx */}
          <ConditionalFooter />
        </SmoothScrollProvider>
        </MotionProvider>
      </body>
    </html>
  )
}
