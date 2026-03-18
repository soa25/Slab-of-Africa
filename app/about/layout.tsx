import type { Viewport } from 'next'

export const viewport: Viewport = {
  themeColor: '#F2E6D8',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
