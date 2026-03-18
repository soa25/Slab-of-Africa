import type { Viewport } from 'next'

export const viewport: Viewport = {
  themeColor: '#DDD0BA',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
