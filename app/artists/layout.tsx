import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = {
  ...pageMetadata({
    path: '/artists',
    title: 'Zimbabwean Stone Sculptors',
    shareTitle: 'Zimbabwean Stone Sculptors | Slab of Africa',
    description: 'Meet the Zimbabwean sculptors of Slab of Africa, including Dominic Benhura, Gift Rusere and Lovemore Bonjisi, carrying the Shona carving tradition forward.',
    image: {
      url: '/images/recent/apple-of-my-eye-dominic.jpg',
      width: 1500,
      height: 2000,
      alt: 'Apple of My Eye — Springstone and Dolomite Shona stone sculpture by Dominic Benhura',
    },
  }),
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.slabofafrica.com' },
    { '@type': 'ListItem', position: 2, name: 'Sculptors', item: 'https://www.slabofafrica.com/artists' },
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
