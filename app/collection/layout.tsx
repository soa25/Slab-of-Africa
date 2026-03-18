import type { Viewport } from 'next'

export const viewport: Viewport = {
  themeColor: '#D9CEBE',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
