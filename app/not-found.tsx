import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="section-label text-stone mb-4">404</p>
      <h2 className="font-display text-charcoal text-3xl md:text-4xl mb-8" style={{ fontWeight: 400 }}>
        Page not found.
      </h2>
      <Link href="/" className="btn-outline">
        Back to home
      </Link>
    </div>
  )
}
