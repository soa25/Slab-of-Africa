import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = {
  ...pageMetadata({
    path: '/inquire',
    title: 'Inquire',
    shareTitle: 'Inquire | Slab of Africa — Buy or Commission Shona Sculpture',
    description: 'Buy or commission an authentic Shona stone sculpture from Zimbabwe. Contact Slab of Africa in San Francisco for pricing, serving collectors across the US.',
  }),
  keywords: [
    'commission African sculpture', 'buy Zimbabwe art', 'custom Shona sculpture',
    'purchase African stone art', 'Shona sculpture price', 'buy handmade African art',
    'Zimbabwe art commission', 'custom stone sculpture', 'African art inquiry',
    'Shona sculpture for sale contact', 'buy authentic African art', 'Zimbabwe sculpture price',
    'commission handmade sculpture', 'African art collector', 'Shona art purchase',
  ],
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.slabofafrica.com' },
    { '@type': 'ListItem', position: 2, name: 'Inquire', item: 'https://www.slabofafrica.com/inquire' },
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
