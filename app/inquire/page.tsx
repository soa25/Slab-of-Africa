'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { recentAdditions, collection } from '@/lib/data'
import ScrollReveal from '@/components/ScrollReveal'

// ── Dark-theme colour tokens ──────────────────────────────────────────────
const D = {
  bg:          '#1C1714',
  bgAlt:       '#231E1A',
  text:        '#EDE6DC',
  textMuted:   '#B0A090',
  textFaint:   '#7A6A5A',
  border:      'rgba(255,255,255,0.08)',
  borderFocus: '#C8AE96',
  accent:      '#C1522A',
  accentLight: '#C8AE96',
}

// Shared input style for dark background
const darkInput: React.CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: `1px solid ${D.border}`,
  padding: '0.875rem 0',
  fontFamily: 'var(--font-jost), system-ui, sans-serif',
  fontSize: '0.95rem',
  fontWeight: 300,
  color: D.text,
  outline: 'none',
  transition: 'border-color 0.3s ease',
  appearance: 'none' as const,
}

const darkSelect: React.CSSProperties = {
  ...darkInput,
  paddingRight: '1.5rem',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%237A6A5A' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 0 center',
  cursor: 'pointer',
}

export default function InquirePage() {
  const [formState, setFormState] = useState({ name: '', email: '', artwork: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1200))
    setSubmitting(false)
    setSubmitted(true)
  }

  const fieldBorder = (name: string) =>
    focusedField === name ? D.borderFocus : D.border

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #231E1A, #110E0C)' }}>
      {/* Header */}
      <section className="pt-36 md:pt-44 pb-16 px-6 md:px-10 max-w-7xl mx-auto">
        <p
          className="font-body mb-4"
          style={{ fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: D.textFaint }}
        >
          Contact
        </p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <ScrollReveal delay={0.06}>
            <h1
              className="font-display"
              style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)', fontWeight: 400, lineHeight: 1.05, color: D.text }}
            >
              Inquire
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.12} className="md:max-w-sm">
            <p className="font-body text-sm leading-relaxed" style={{ color: D.textMuted }}>
              We welcome inquiries from collectors, curators, and anyone curious about the work.
              We respond to all messages within two business days.
            </p>
          </ScrollReveal>
        </div>
        <div className="mt-10" style={{ width: '100%', height: '1px', backgroundColor: D.border }} />
      </section>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">

          {/* ── Left: form ─────────────────────────────────────────────── */}
          <div>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="py-12"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-8"
                  style={{ border: `1px solid ${D.accent}` }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={D.accent} strokeWidth="1.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h2 className="font-display text-3xl md:text-4xl mb-4" style={{ color: D.text }}>
                  Message received.
                </h2>
                <p className="font-body text-sm leading-relaxed mb-8" style={{ color: D.textMuted }}>
                  Thank you for reaching out. We'll be in touch within two business days.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormState({ name: '', email: '', artwork: '', message: '' }) }}
                  className="font-body"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'transparent',
                    color: D.text,
                    padding: '0.75rem 1.75rem',
                    fontSize: '0.75rem',
                    fontWeight: 400,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    border: `1px solid ${D.border}`,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <ScrollReveal>
                <form onSubmit={handleSubmit} className="space-y-10">
                  {/* Name */}
                  <div>
                    <label className="font-body block mb-3" style={{ fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: D.textFaint }}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Full name"
                      style={{ ...darkInput, borderBottomColor: fieldBorder('name') }}
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="font-body block mb-3" style={{ fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: D.textFaint }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      style={{ ...darkInput, borderBottomColor: fieldBorder('email') }}
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>

                  {/* Artwork */}
                  <div>
                    <label className="font-body block mb-3" style={{ fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: D.textFaint }}>
                      Artwork of Interest (optional)
                    </label>
                    <select
                      style={{ ...darkSelect, borderBottomColor: fieldBorder('artwork') }}
                      value={formState.artwork}
                      onChange={(e) => setFormState({ ...formState, artwork: e.target.value })}
                      onFocus={() => setFocusedField('artwork')}
                      onBlur={() => setFocusedField(null)}
                    >
                      <option value="" style={{ background: '#1C1714' }}>Select a work, or leave blank for general inquiry</option>
                      <optgroup label="Recent Additions" style={{ background: '#1C1714' }}>
                        {recentAdditions.map((a) => (
                          <option key={a.id} value={a.title} style={{ background: '#1C1714' }}>
                            {a.title} — {a.artist} ({a.year})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Other Works" style={{ background: '#1C1714' }}>
                        {collection.slice(recentAdditions.length).map((a) => (
                          <option key={a.id} value={a.title} style={{ background: '#1C1714' }}>
                            {a.title} — {a.artist} ({a.year})
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="font-body block mb-3" style={{ fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: D.textFaint }}>
                      Message
                    </label>
                    <textarea
                      required
                      rows={6}
                      placeholder="Tell us about your interest — a specific work, an artist, or the collection generally. Context about your collection or intended display is welcome."
                      style={{ ...darkInput, borderBottomColor: fieldBorder('message'), resize: 'none', paddingBottom: '0.5rem' }}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full justify-center disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                          <path d="M12 2a10 10 0 0 1 10 10" />
                        </svg>
                        Sending…
                      </>
                    ) : 'Send Inquiry'}
                  </button>

                  <p className="font-body text-xs text-center leading-relaxed" style={{ color: D.textFaint }}>
                    By submitting this form you agree that we may contact you regarding your inquiry.
                    We do not share your information with third parties.
                  </p>
                </form>
              </ScrollReveal>
            )}
          </div>

          {/* ── Right: contact info ────────────────────────────────────── */}
          <div className="space-y-12">
            <ScrollReveal delay={0.1}>
              <div>
                <p className="font-body mb-6" style={{ fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: D.textFaint }}>
                  Direct Contact
                </p>
                <div className="space-y-5">
                  {[
                    { label: 'Email', value: 'info@slabofafrica.com', href: 'mailto:info@slabofafrica.com' },
                    { label: 'Instagram', value: '@slabofafrica', href: 'https://instagram.com/slabofafrica', external: true },
                  ].map(({ label, value, href, external }) => (
                    <div key={label}>
                      <p className="font-body mb-1.5" style={{ fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: D.textFaint }}>
                        {label}
                      </p>
                      <a
                        href={href}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noopener noreferrer' : undefined}
                        className="font-body link-underline"
                        style={{ color: D.accentLight, transition: 'color 0.2s ease' }}
                      >
                        {value}
                      </a>
                    </div>
                  ))}
                  <div>
                    <p className="font-body mb-1.5" style={{ fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: D.textFaint }}>
                      Location
                    </p>
                    <p className="font-body text-sm" style={{ color: D.text }}>
                      San Francisco, California
                      <br />
                      <span style={{ color: D.textMuted }}>Viewings by appointment</span>
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <div style={{ width: '100%', height: '1px', backgroundColor: D.border }} />

            <ScrollReveal delay={0.18}>
              <div>
                <p className="font-body mb-4" style={{ fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: D.textFaint }}>
                  What to Expect
                </p>
                <div className="space-y-6">
                  {[
                    { n: '01', title: 'We respond within 48 hours', body: 'Every inquiry receives a personal response from the gallery.' },
                    { n: '02', title: 'Photography and video on request', body: 'Additional images, video of the piece, and condition reports.' },
                    { n: '03', title: 'Shipping worldwide', body: 'Experience shipping to collectors across the US, Europe, and beyond.' },
                    { n: '04', title: 'Provenance documentation', body: 'All works come with full provenance, artist documentation, and care instructions.' },
                  ].map(({ n, title, body }) => (
                    <div key={n} className="flex gap-5">
                      <span
                        className="font-display flex-shrink-0"
                        style={{ fontSize: '1.5rem', fontWeight: 300, lineHeight: 1, color: 'rgba(255,255,255,0.1)' }}
                      >
                        {n}
                      </span>
                      <div>
                        <p className="font-body text-sm font-medium mb-1" style={{ color: D.text }}>{title}</p>
                        <p className="font-body text-xs leading-relaxed" style={{ color: D.textMuted }}>{body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="p-6" style={{ border: `1px solid ${D.border}` }}>
                <p className="font-body mb-3" style={{ fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: D.textFaint }}>
                  Browse First
                </p>
                <p className="font-body text-sm mb-5 leading-relaxed" style={{ color: D.textMuted }}>
                  Not sure what to inquire about? Explore the full collection before reaching out.
                </p>
                <Link
                  href="/collection"
                  className="font-body w-full flex items-center justify-center"
                  style={{
                    padding: '0.75rem 1.75rem',
                    fontSize: '0.75rem',
                    fontWeight: 400,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    border: `1px solid ${D.border}`,
                    color: D.text,
                    transition: 'all 0.25s ease',
                  }}
                >
                  View Collection
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  )
}
