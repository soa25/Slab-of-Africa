import type { Metadata } from 'next'
import { Cormorant, Cormorant_Garamond, Jost } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import ExhibitionBanner from '@/components/ExhibitionBanner'
import IntroAnimation from '@/components/IntroAnimation'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import ConditionalFooter from '@/components/ConditionalFooter'
import MotionProvider from '@/components/MotionProvider'
import EdgeFade from '@/components/EdgeFade'
import { GoogleAnalytics } from '@next/third-parties/google'
import { SITE_URL, pageMetadata } from '@/lib/seo'

const HOME_DESCRIPTION =
  'Hand-carved Shona stone sculpture from Zimbabwe in springstone, serpentine and green opal, for collectors across the United States. Based in San Francisco, CA.'

const cormorant = Cormorant({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

// Kadiki heading + nav link. Swap the font here; everything uses --font-kadiki
const kadiki = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-kadiki',
  weight: ['300', '500'],
  style: ['italic'],
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
  keywords: [
    'Shona sculpture', 'Zimbabwe sculpture', 'African art', 'stone sculpture',
    'hand carved sculpture', 'serpentine sculpture', 'springstone', 'African home decor',
    'outdoor sculpture', 'garden sculpture', 'handmade art', 'contemporary African art',
    'Zimbabwe art for sale', 'Shona art', 'African sculpture for sale', 'stone art',
    'Zimbabwe stone carving', 'Shona stone art', 'African garden art',
    'handmade African sculpture', 'Shona sculpture for sale', 'African stone art',
    'Zimbabwe sculptures USA',
  ],
  // Homepage description, canonical and share card; every other page sets its own
  ...pageMetadata({
    path: '',
    shareTitle: 'Slab of Africa | Shona Stone Sculptures from Zimbabwe',
    description: HOME_DESCRIPTION,
  }),
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${kadiki.variable} ${jost.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(artGallerySchema) }} />

        {/* Global grain/texture overlay — pre-rendered noise tile (public/grain.png), no live SVG filter */}
        <div
          aria-hidden="true"
          style={{
            position: 'fixed', top: 0, left: 0,
            width: '100%', height: '100%',
            zIndex: 1,
            pointerEvents: 'none',
            opacity: 0.045,
            backgroundImage: 'url(/grain.png)',
            backgroundRepeat: 'repeat',
            backgroundSize: '256px',
          }}
        />

        <MotionProvider>
        <SmoothScrollProvider>
          {/* Mobile edge fades — top and bottom gradient overlays */}
          <EdgeFade />

          {/* Cinematic intro animation */}
          <IntroAnimation />

          {/* Exhibition announcement strip */}
          <ExhibitionBanner />

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
