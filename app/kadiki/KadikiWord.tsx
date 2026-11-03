import type { ReactNode } from 'react'

// "Kadiki" in body copy: true italic from --font-kadiki, sized up slightly to match the sans text
export default function KadikiWord({ children }: { children: ReactNode }) {
  return (
    <em className="font-kadiki" style={{ fontStyle: 'italic', fontSize: '1.05em' }}>
      {children}
    </em>
  )
}
