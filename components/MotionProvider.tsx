'use client'

// LazyMotion removed — causes hydration mismatches in Framer Motion v11 + Next.js 14 App Router.
// Framer Motion v11 has built-in tree shaking; LazyMotion is not needed.
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
