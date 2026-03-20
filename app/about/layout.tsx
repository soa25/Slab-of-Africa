import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Shona Sculpture',
  description: 'Learn about the Shona stone carving tradition from Zimbabwe. Hand-carved from serpentine, springstone and green opal, each sculpture is a unique expression of African artistic heritage. Discover the history and process behind authentic handmade Zimbabwe art.',
  keywords: [
    'what is Shona sculpture', 'Zimbabwe stone carving tradition', 'handmade African art',
    'Shona art history', 'Zimbabwe sculpture tradition', 'African stone carving',
    'serpentine stone sculpture', 'Shona sculpture process', 'Zimbabwe art heritage',
    'hand carved African art', 'Shona stone carving technique', 'Zimbabwe artistic tradition',
    'African sculpture history', 'Shona culture art', 'Zimbabwe art meaning',
  ],
  openGraph: {
    title: 'About Shona Sculpture | Slab of Africa',
    description: 'Learn about the Shona stone carving tradition from Zimbabwe — hand-carved from serpentine, springstone and green opal. The history and process behind authentic African art.',
    url: 'https://www.slabofafrica.com/about',
  },
  alternates: {
    canonical: 'https://www.slabofafrica.com/about',
  },
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
