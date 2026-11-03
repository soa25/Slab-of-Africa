'use client'

import { useState, type FormEvent } from 'react'
import KadikiWord from './KadikiWord'

// Same Formspree endpoint as the Inquire page; `source` tells these apart from inquiries
const FORMSPREE_URL = 'https://formspree.io/f/mdawboko'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, source: 'Kadiki waitlist' }),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <p className="font-body text-muted leading-relaxed" style={{ fontSize: '0.975rem' }}>
        Thank you. We&apos;ll let you know when <KadikiWord>Kadiki</KadikiWord> launches.
      </p>
    )
  }

  return (
    <div style={{ maxWidth: '28rem' }}>
      <form onSubmit={handleSubmit} className="flex items-end gap-6">
        <input
          type="email"
          name="email"
          required
          aria-label="Email address"
          placeholder="you@example.com"
          className="form-input flex-1 !border-b-[rgba(28,25,23,0.2)] focus:!border-b-[#C1522A]"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input type="hidden" name="source" value="Kadiki waitlist" />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="font-body shrink-0 disabled:opacity-50"
          style={{
            background: 'transparent',
            border: 'none',
            padding: '0.875rem 0',
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--terracotta)',
            cursor: 'pointer',
          }}
        >
          {status === 'submitting' ? 'Joining…' : 'Join'}
        </button>
      </form>
      {status === 'error' && (
        <p className="font-body mt-4" role="alert" style={{ fontSize: '0.85rem', color: 'var(--terracotta)' }}>
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  )
}
