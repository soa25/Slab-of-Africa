import type { Metadata } from 'next'
import { Cormorant, Jost } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import IntroAnimation from '@/components/IntroAnimation'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import ConditionalFooter from '@/components/ConditionalFooter'
import MotionProvider from '@/components/MotionProvider'
import EdgeFade from '@/components/EdgeFade'
import { GoogleAnalytics } from '@next/third-parties/google'
import { collectionWorks } from '@/lib/data'

const SITE_URL = 'https://www.slabofafrica.com'

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Slab of Africa | Shona Stone Sculptures from Zimbabwe',
    template: '%s | Slab of Africa',
  },
  description:
    'Discover hand-carved Shona stone sculptures from Zimbabwe. Authentic African art including serpentine, springstone and green opal sculptures available for collectors across the United States. Based in San Francisco, CA.',
  keywords: [
    'Shona sculpture', 'Zimbabwe sculpture', 'African art', 'stone sculpture',
    'hand carved sculpture', 'serpentine sculpture', 'springstone', 'African home decor',
    'outdoor sculpture', 'garden sculpture', 'handmade art', 'contemporary African art',
    'Zimbabwe art for sale', 'Shona art', 'African sculpture for sale', 'stone art',
    'Zimbabwe stone carving', 'Shona stone art', 'African garden art',
    'handmade African sculpture', 'Shona sculpture for sale', 'African stone art',
    'Zimbabwe sculptures USA',
  ],
  openGraph: {
    title: 'Slab of Africa | Shona Stone Sculptures from Zimbabwe',
    description: 'Discover hand-carved Shona stone sculptures from Zimbabwe. Authentic African art available for collectors across the United States.',
    type: 'website',
    url: SITE_URL,
    siteName: 'Slab of Africa',
    images: [{ url: '/images/recent/Bonded%20Souls.jpg', width: 800, height: 1067, alt: 'Bonded Souls — Green Opal Shona stone sculpture by Gift Rusere, Slab of Africa' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Slab of Africa | Shona Stone Sculptures from Zimbabwe',
    description: 'Hand-carved Shona stone sculptures from Zimbabwe. African art for collectors across the United States.',
    images: ['/images/recent/Bonded%20Souls.jpg'],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'geo.region': 'US-CA',
    'geo.placename': 'San Francisco, CA',
    'geo.position': '37.7749;-122.4194',
    'ICBM': '37.7749, -122.4194',
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#localbusiness`,
  name: 'Slab of Africa',
  url: SITE_URL,
  email: 'shaan@slabofafrica.com',
  description: 'San Francisco-based gallery specializing in hand-carved Shona stone sculptures from Zimbabwe. Authentic African art for collectors across the United States.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'San Francisco',
    addressRegion: 'CA',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 37.7749,
    longitude: -122.4194,
  },
  sameAs: ['https://instagram.com/slabofafrica'],
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Slab of Africa',
  url: SITE_URL,
  email: 'shaan@slabofafrica.com',
  description: 'San Francisco-based gallery specializing in hand-carved Shona stone sculptures from Zimbabwe. Authentic African art for collectors across the United States.',
  sameAs: ['https://instagram.com/slabofafrica'],
}

const artGallerySchema = {
  '@context': 'https://schema.org',
  '@type': 'ArtGallery',
  name: 'Slab of Africa',
  url: SITE_URL,
  description: 'Curated collection of hand-carved Shona stone sculptures from Zimbabwe, available for collectors in the United States.',
  email: 'shaan@slabofafrica.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'San Francisco',
    addressRegion: 'CA',
    addressCountry: 'US',
  },
  sameAs: ['https://instagram.com/slabofafrica'],
}

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Shona Stone Sculpture Collection — Slab of Africa',
  description: 'Hand-carved Shona stone sculptures from Zimbabwe available for collectors.',
  url: `${SITE_URL}/collection`,
  numberOfItems: collectionWorks.length,
  itemListElement: collectionWorks.map((w, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'VisualArtwork',
      name: w.title,
      creator: { '@type': 'Person', name: w.artist },
      artMedium: `${w.material} stone`,
      artForm: 'Sculpture',
      url: `${SITE_URL}/collection`,
    },
  })),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(artGallerySchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

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
      <GoogleAnalytics gaId="G-918LGGV2NV" />
    </html>
  )
}
