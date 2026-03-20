import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Inquire',
  description: 'Commission or purchase an authentic Shona stone sculpture from Zimbabwe. Contact Slab of Africa to buy Zimbabwe art, request pricing, or commission a custom handmade African sculpture. Based in San Francisco, serving collectors across the United States.',
  keywords: [
    'commission African sculpture', 'buy Zimbabwe art', 'custom Shona sculpture',
    'purchase African stone art', 'Shona sculpture price', 'buy handmade African art',
    'Zimbabwe art commission', 'custom stone sculpture', 'African art inquiry',
    'Shona sculpture for sale contact', 'buy authentic African art', 'Zimbabwe sculpture price',
    'commission handmade sculpture', 'African art collector', 'Shona art purchase',
  ],
  openGraph: {
    title: 'Inquire | Slab of Africa — Buy or Commission Shona Sculpture',
    description: 'Contact Slab of Africa to purchase or commission an authentic hand-carved Shona stone sculpture from Zimbabwe.',
    url: 'https://www.slabofafrica.com/inquire',
  },
  alternates: {
    canonical: 'https://www.slabofafrica.com/inquire',
  },
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
