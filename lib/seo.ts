import type { Metadata } from 'next'

export const SITE_URL = 'https://www.slabofafrica.com'
export const SITE_NAME = 'Slab of Africa'

export interface ShareImage {
  url: string
  width: number
  height: number
  alt: string
}

// Default share image (homepage and pages without a photo of their own)
export const DEFAULT_SHARE_IMAGE: ShareImage = {
  url: '/images/recent/bonded-souls.jpg',
  width: 1333,
  height: 2000,
  alt: 'Bonded Souls — Green Opal Shona stone sculpture by Gift Rusere',
}

// Per-page metadata: its own canonical, description, and Open Graph / Twitter card.
// A page's openGraph replaces the root one entirely, so site name, type and image are set here every time.
export function pageMetadata({
  path,
  title,
  shareTitle,
  description,
  image = DEFAULT_SHARE_IMAGE,
}: {
  path: string // '' for the homepage, '/about' etc. otherwise
  title?: string // <title>, before the " | Slab of Africa" template; omit on the homepage
  shareTitle: string // full title for social cards
  description: string // 160 characters or fewer
  image?: ShareImage
}): Metadata {
  const url = `${SITE_URL}${path}`
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: url },
    openGraph: {
      title: shareTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_US',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: shareTitle,
      description,
      images: [{ url: image.url, alt: image.alt }],
    },
  }
}
