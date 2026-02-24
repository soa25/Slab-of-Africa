import type { Metadata } from 'next'
import { Cormorant, Jost } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Navigation from '@/components/Navigation'
import IntroAnimation from '@/components/IntroAnimation'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import Footer from '@/components/Footer'
import MotionProvider from '@/components/MotionProvider'

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
        <Script src="/cursor.js" strategy="afterInteractive" />
        <MotionProvider>
        <SmoothScrollProvider>
          {/* Cinematic intro animation */}
          <IntroAnimation />

          {/* Navigation */}
          <Navigation />

          {/* Page content */}
          <main>{children}</main>

          {/* Footer — palette-aware, see components/Footer.tsx */}
          <Footer />
        </SmoothScrollProvider>
        </MotionProvider>
      </body>
    </html>
  )
}
