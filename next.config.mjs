/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['lenis'],
  async redirects() {
    return [
{ source: '/contact/', destination: '/inquire', permanent: true },
      { source: '/new-page/', destination: '/', permanent: true },
      { source: '/work/', destination: '/collection', permanent: true },
    ]
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'placehold.co' },
    ],
  },
}

export default nextConfig
