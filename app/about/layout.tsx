import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = {
  ...pageMetadata({
    path: '/about',
    title: 'About Shona Sculpture',
    shareTitle: 'About Shona Sculpture | Slab of Africa',
    description: 'The Shona stone carving tradition of Zimbabwe: how each sculpture is hand-carved from serpentine, springstone or green opal, and the history behind the work.',
    image: { url: '/images/about/DSC_1187.JPG', width: 2000, height: 1333, alt: 'Hand-carved Shona stone sculpture from Zimbabwe' },
  }),
  keywords: [
    'what is Shona sculpture', 'Zimbabwe stone carving tradition', 'handmade African art',
    'Shona art history', 'Zimbabwe sculpture tradition', 'African stone carving',
    'serpentine stone sculpture', 'Shona sculpture process', 'Zimbabwe art heritage',
    'hand carved African art', 'Shona stone carving technique', 'Zimbabwe artistic tradition',
    'African sculpture history', 'Shona culture art', 'Zimbabwe art meaning',
  ],
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.slabofafrica.com' },
    { '@type': 'ListItem', position: 2, name: 'About Shona Sculpture', item: 'https://www.slabofafrica.com/about' },
  ],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {children}
    </>
  )
}
