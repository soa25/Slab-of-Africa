'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { recentAdditions } from '@/lib/data'
import ScrollReveal from '@/components/ScrollReveal'

const WHATSAPP = '263777043331'

// Dark-theme colour tokens
const D = {
  text:        '#EDE6DC',
  textMuted:   '#B0A090',
  textFaint:   '#7A6A5A',
  border:      'rgba(255,255,255,0.08)',
  borderFocus: '#C8AE96',
  accent:      '#C1522A',
  accentLight: '#C8AE96',
}

export default function InquirePage() {
  const [formState, setFormState] = useState({ name: '', email: '', artwork: '', message: '' })
  const [submitted, setSubmitted]   = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await fetch('https://formspree.io/f/mdawboko', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(formState),
    })
    setSubmitting(false)
    setSubmitted(true)
  }

  // Base input style for dark background
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

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #231E1A, #110E0C)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-36 md:pt-48 pb-28">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-28 md:items-start">

          {/* ── Left: heading + description + contact ───────────────────── */}
          <div>
            <p
              className="font-body mb-6"
              style={{ fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: D.textFaint }}
            >
              Contact
            </p>

            <ScrollReveal>
              <h1
                className="font-display"
                style={{
                  fontSize: 'clamp(3.2rem, 6.5vw, 5.5rem)',
                  fontWeight: 400,
                  lineHeight: 1.05,
                  letterSpacing: '-0.01em',
                  marginBottom: '2.5rem',
                  color: D.text,
                }}
              >
                Inquire
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <div className="space-y-5" style={{ maxWidth: '27rem', marginBottom: '3rem' }}>
                <p className="font-body" style={{ fontSize: '0.975rem', fontWeight: 500, color: D.text, lineHeight: 1.6 }}>
                  We&apos;d love to hear from you
                </p>
                <p className="font-body leading-relaxed" style={{ fontSize: '0.925rem', color: D.textMuted }}>
                  For all inquiries — whether you&apos;re interested in a particular piece, exploring a
                  commission, or simply have questions — please don&apos;t hesitate to reach out.
                </p>
                <p className="font-body leading-relaxed" style={{ fontSize: '0.925rem', color: D.textMuted }}>
                  You can contact us directly via WhatsApp or leave your details in the form
                  and we will reach out. We&apos;re here to assist and happy to help with anything
                  you need.
                </p>
                <p className="font-body leading-relaxed" style={{ fontSize: '0.925rem', color: D.text }}>
                  We offer custom commissions.
                </p>
                <p className="font-body leading-relaxed" style={{ fontSize: '0.925rem', color: D.textMuted }}>
                  If you&apos;re looking for something truly personal, we work closely with collectors
                  and clients to create bespoke sculptures.
                </p>
                <p className="font-body leading-relaxed" style={{ fontSize: '0.925rem', color: D.textMuted }}>
                  Pricing is available on request.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.14}>
              <div className="flex flex-col gap-4">
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${WHATSAPP}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body inline-flex items-center gap-3 self-start"
                  style={{
                    padding: '0.75rem 1.5rem',
                    border: `1px solid rgba(255,255,255,0.18)`,
                    color: D.text,
                    fontSize: '0.72rem',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = D.accentLight; e.currentTarget.style.color = D.accentLight }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = D.text }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Chat on WhatsApp
                </a>

                {/* Email */}
                <a
                  href="mailto:shaan@slabofafrica.com"
                  className="font-body link-underline"
                  style={{ fontSize: '0.875rem', color: D.textMuted, transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = D.accentLight)}
                  onMouseLeave={e => (e.currentTarget.style.color = D.textMuted)}
                >
                  shaan@slabofafrica.com
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* ── Right: form ─────────────────────────────────────────────── */}
          <div className="md:pt-16">
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
                  Thank you for reaching out. We&apos;ll be in touch shortly.
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
              <ScrollReveal delay={0.1}>
                <form onSubmit={handleSubmit} className="space-y-10">

                  {/* Name */}
                  <div>
                    <label
                      className="font-body block mb-3"
                      style={{ fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: D.textFaint }}
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Full name"
                      style={darkInput}
                      value={formState.name}
                      onChange={e => setFormState({ ...formState, name: e.target.value })}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      className="font-body block mb-3"
                      style={{ fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: D.textFaint }}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      style={darkInput}
                      value={formState.email}
                      onChange={e => setFormState({ ...formState, email: e.target.value })}
                    />
                  </div>

                  {/* Artwork */}
                  <div>
                    <label
                      className="font-body block mb-3"
                      style={{ fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: D.textFaint }}
                    >
                      Artwork of Interest (optional)
                    </label>
                    <select
                      style={darkSelect}
                      value={formState.artwork}
                      onChange={e => setFormState({ ...formState, artwork: e.target.value })}
                    >
                      <option value="" style={{ background: '#1C1714' }}>Select a work, or leave blank for general inquiry</option>
                      {recentAdditions.map(a => (
                        <option key={a.id} value={a.title} style={{ background: '#1C1714' }}>
                          {a.title} — {a.artist}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      className="font-body block mb-3"
                      style={{ fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: D.textFaint }}
                    >
                      Message
                    </label>
                    <textarea
                      required
                      rows={6}
                      placeholder="Tell us about your interest — a specific work, an artist, or the collection generally. Context about your collection or intended display is welcome."
                      style={{ ...darkInput, resize: 'none', paddingBottom: '0.5rem' }}
                      value={formState.message}
                      onChange={e => setFormState({ ...formState, message: e.target.value })}
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

        </div>
      </div>
    </div>
  )
}
