import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = {
  ...pageMetadata({
    path: '/collection',
    title: 'The Collection',
    shareTitle: 'The Collection | Slab of Africa — Shona Stone Sculptures',
    description: 'Browse hand-carved Shona stone sculptures from Zimbabwe in serpentine, springstone, green opal and cobalt, available to collectors across the United States.',
  }),
  keywords: [
    'buy Shona sculpture', 'stone sculpture collection', 'African art for sale',
    'Zimbabwe sculpture for sale', 'buy African stone art', 'Shona stone art collection',
    'serpentine sculpture for sale', 'springstone sculpture', 'green opal sculpture',
    'handmade African sculpture for sale', 'Zimbabwe art collection', 'Shona art for sale',
    'African sculpture gallery', 'buy Zimbabwe art', 'outdoor stone sculpture for sale',
  ],
  // Placeholder works for now: kept reachable, but out of search results and the sitemap
  robots: { index: false },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.slabofafrica.com' },
    { '@type': 'ListItem', position: 2, name: 'The Collection', item: 'https://www.slabofafrica.com/collection' },
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
