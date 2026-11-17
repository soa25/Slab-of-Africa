import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = {
  ...pageMetadata({
    path: '/exhibits',
    title: 'Exhibits',
    shareTitle: 'Art Fairs | Slab of Africa — Shona Sculpture Exhibitions',
    description: 'Slab of Africa at Art-Fair-Mont in San Francisco and art fairs across the United States. See hand-carved Zimbabwean stone sculpture in person.',
    image: { url: '/images/fairs/Art-fair-mont/GCS-Art-Fairmont-20260118_0082.jpg', width: 2000, height: 1333, alt: 'Slab of Africa exhibition of hand-carved Shona stone sculpture' },
  }),
  keywords: [
    'African art fair', 'Shona sculpture exhibition', 'Zimbabwe art show', 'African art event',
    'Shona art fair San Francisco', 'African sculpture exhibition USA', 'Zimbabwe art fair',
    'African art gallery show', 'Shona stone art exhibition', 'art fair San Francisco',
  ],
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.slabofafrica.com' },
    { '@type': 'ListItem', position: 2, name: 'Exhibits', item: 'https://www.slabofafrica.com/exhibits' },
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
