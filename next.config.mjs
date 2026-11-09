/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['lenis'],
  async redirects() {
    return [
{ source: '/contact/', destination: '/inquire', permanent: true },
      { source: '/new-page/', destination: '/', permanent: true },
      { source: '/work/', destination: '/collection', permanent: true },
      { source: '/fairs', destination: '/exhibits', permanent: true },
    ]
  },
  images: {
    // Cache optimized images for a year instead of regenerating them every 4 hours
    minimumCacheTTL: 31536000,
    // 75 is the default for every image; 85 is used only for the large single-photo lightbox view
    qualities: [75, 85],
  },
}

export default nextConfig
