'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="section-label text-stone mb-4">Something went wrong</p>
      <h2 className="font-display text-charcoal text-3xl md:text-4xl mb-8" style={{ fontWeight: 400 }}>
        An unexpected error occurred.
      </h2>
      <button
        onClick={reset}
        className="btn-outline"
      >
        Try again
      </button>
    </div>
  )
}
