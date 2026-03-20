import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Art Fairs',
  description: 'Slab of Africa at African art fairs and exhibitions across the United States. See Shona stone sculptures from Zimbabwe at live shows and art events including Art-Fair-Mont in San Francisco.',
  keywords: [
    'African art fair', 'Shona sculpture exhibition', 'Zimbabwe art show', 'African art event',
    'Shona art fair San Francisco', 'African sculpture exhibition USA', 'Zimbabwe art fair',
    'African art gallery show', 'Shona stone art exhibition', 'art fair San Francisco',
  ],
  openGraph: {
    title: 'Art Fairs | Slab of Africa — Shona Sculpture Exhibitions',
    description: 'Slab of Africa at African art fairs and exhibitions. See hand-carved Shona stone sculptures from Zimbabwe at live events.',
    url: 'https://www.slabofafrica.com/fairs',
  },
  alternates: {
    canonical: 'https://www.slabofafrica.com/fairs',
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.slabofafrica.com' },
    { '@type': 'ListItem', position: 2, name: 'Art Fairs', item: 'https://www.slabofafrica.com/fairs' },
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
