import type { Viewport } from 'next'

export const viewport: Viewport = {
  themeColor: '#231E1A',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
