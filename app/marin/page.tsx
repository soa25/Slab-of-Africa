import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { CSSProperties } from 'react'

export const metadata: Metadata = {
  title: 'Zimbabwe Contemporary Sculpture Exhibition — Marin Art & Garden Center',
  description:
    'Works by Dominic Benhura at the Marin Art & Garden Center, Ross, California. On view until October 2026. Available for acquisition through Slab of Africa.',
}

const PHOTOS = [
  '/images/marin/marin-2.JPG',
  '/images/marin/marin-6.JPG',
  '/images/marin/marin-8.JPG',
  '/images/marin/marin-10.JPG',
  '/images/marin/marin-11.JPG',
  '/images/marin/marin-16.JPG',
  '/images/marin/marin-17.JPG',
  '/images/marin/marin-18.JPG',
  '/images/marin/marin-19.JPG',
  '/images/marin/marin-20.JPG',
]

// ── Reusable corner botanical motif ───────────────────────────────────────
// Top-left corner: open rose with veined leaves and stem + rosebud.
// CSS transform mirrors it for the other three corners.
function CornerBotanical({ style }: { style: CSSProperties }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 180 180"
      width="180"
      height="180"
      style={{ position: 'fixed', zIndex: 2, pointerEvents: 'none', opacity: 0.22, ...style }}
    >
      <g stroke="#FAF0E2" fill="none" strokeLinecap="round" strokeLinejoin="round">

        {/* ── Open rose: 5 outer petals + 5 inner petals at (56, 46) ── */}
        <g transform="translate(56, 46)">
          {/* Outer petals — wide rounded shape tapering to base */}
          {[0, 72, 144, 216, 288].map(a => (
            <g key={a} transform={`rotate(${a})`}>
              <path d="M 0,7 C -13,5 -16,-11 -9,-21 C -5,-26 5,-26 9,-21 C 16,-11 13,5 0,7 Z" strokeWidth="0.85" />
            </g>
          ))}
          {/* Inner petals — smaller, offset by 36° */}
          {[36, 108, 180, 252, 324].map(a => (
            <g key={a} transform={`rotate(${a})`}>
              <path d="M 0,5 C -8,3 -9,-6 -5,-13 C -3,-16 3,-16 5,-13 C 9,-6 8,3 0,5 Z" strokeWidth="0.75" />
            </g>
          ))}
          {/* Rose center */}
          <circle r="5" strokeWidth="0.7" />
          <circle r="2" strokeWidth="0.55" />
        </g>

        {/* ── Main curved stem from rose base toward lower-left corner ── */}
        <path d="M 56,56 C 52,84 40,118 22,155 C 15,166 8,174 3,178" strokeWidth="1.1" />

        {/* ── Side branch from stem to rosebud ── */}
        <path d="M 47,74 C 64,62 82,52 102,43" strokeWidth="0.78" />

        {/* Rosebud at branch tip (102, 43) */}
        <g transform="translate(102, 43)">
          {/* Closed bud petals */}
          <path d="M 0,1 C -5,-1 -7,-9 -4,-16 C -2,-20 2,-20 4,-16 C 7,-9 5,-1 0,1 Z" strokeWidth="0.65" />
          <path d="M 0,-9 C -2,-13 -2,-18 0,-21" strokeWidth="0.45" />
          {/* Sepals flanking bud */}
          <path d="M -1,-4 C -8,-2 -12,-9 -9,-16" strokeWidth="0.5" />
          <path d="M  1,-4 C  8,-2  12,-9  9,-16" strokeWidth="0.5" />
        </g>

        {/* ── Leaf on side branch at (72, 57) — pointing upward-left ── */}
        <g transform="translate(72, 57) rotate(-72)">
          <path d="M 0,4 C -9,-8 -8,-26 0,-36 C 8,-26 9,-8 0,4 Z" strokeWidth="0.68" />
          <path d="M 0,4 L 0,-36" strokeWidth="0.36" />
          <path d="M 0,-8  C -6,-11 -7,-15 -6,-20" strokeWidth="0.28" />
          <path d="M 0,-8  C  6,-11  7,-15  6,-20" strokeWidth="0.28" />
          <path d="M 0,-20 C -5,-23 -6,-27 -5,-31" strokeWidth="0.24" />
          <path d="M 0,-20 C  5,-23  6,-27  5,-31" strokeWidth="0.24" />
        </g>

        {/* ── Leaf 1: grows right from stem at (38, 88) ── */}
        <g transform="translate(38, 88) rotate(42)">
          <path d="M 0,5 C -11,-9 -10,-30 0,-42 C 10,-30 11,-9 0,5 Z" strokeWidth="0.75" />
          <path d="M 0,5 L 0,-42" strokeWidth="0.4" />
          {/* Lateral veins with midrib */}
          <path d="M 0,-9  C -7,-13 -9,-17 -8,-23" strokeWidth="0.32" />
          <path d="M 0,-9  C  7,-13  9,-17  8,-23" strokeWidth="0.32" />
          <path d="M 0,-22 C -6,-26 -8,-30 -7,-35" strokeWidth="0.28" />
          <path d="M 0,-22 C  6,-26  8,-30  7,-35" strokeWidth="0.28" />
          <path d="M 0,-32 C -4,-35 -5,-38 -4,-41" strokeWidth="0.24" />
          <path d="M 0,-32 C  4,-35  5,-38  4,-41" strokeWidth="0.24" />
        </g>

        {/* ── Leaf 2: grows left from stem at (24, 122) ── */}
        <g transform="translate(24, 122) rotate(-140)">
          <path d="M 0,4 C -9,-8 -8,-26 0,-36 C 8,-26 9,-8 0,4 Z" strokeWidth="0.7" />
          <path d="M 0,4 L 0,-36" strokeWidth="0.38" />
          <path d="M 0,-8  C -6,-11 -7,-15 -6,-20" strokeWidth="0.28" />
          <path d="M 0,-8  C  6,-11  7,-15  6,-20" strokeWidth="0.28" />
          <path d="M 0,-20 C -5,-23 -6,-27 -5,-31" strokeWidth="0.24" />
          <path d="M 0,-20 C  5,-23  6,-27  5,-31" strokeWidth="0.24" />
        </g>

      </g>
    </svg>
  )
}

// ── Full-page botanical watermark ─────────────────────────────────────────
// A rose wreath: 6 roses + 6 three-leaf clusters on a ring, plus a center rose.
// Cream at ~6.5% opacity — luxury stationery watermark feel.
function BotanicalWatermark() {
  // Petal shapes shared by all roses
  const outerPetal = 'M 0,11 C -20,8 -24,-17 -14,-33 C -8,-41 8,-41 14,-33 C 24,-17 20,8 0,11 Z'
  const innerPetal = 'M 0,7 C -12,5 -14,-10 -8,-20 C -4,-25 4,-25 8,-20 C 14,-10 12,5 0,7 Z'

  // Wreath center (600, 700), radius 190
  // Roses at 0°/60°/120°/180°/240°/300° clockwise from top
  const roses = [
    { x: 600, y: 510 },  // top
    { x: 764, y: 605 },  // upper-right
    { x: 764, y: 795 },  // lower-right
    { x: 600, y: 890 },  // bottom
    { x: 436, y: 795 },  // lower-left
    { x: 436, y: 605 },  // upper-left
  ]

  // Leaf clusters at 30°/90°/150°/210°/270°/330° (between roses)
  // rot = degrees clockwise from top — points each cluster outward from center
  const leafClusters = [
    { x: 695, y: 536, rot: 30  },
    { x: 790, y: 700, rot: 90  },
    { x: 695, y: 864, rot: 150 },
    { x: 505, y: 864, rot: 210 },
    { x: 410, y: 700, rot: 270 },
    { x: 505, y: 536, rot: 330 },
  ]

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 1400"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: 'fixed', inset: 0, width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none', opacity: 0.065,
      }}
    >
      <g stroke="#FAF0E2" fill="none" strokeLinecap="round" strokeLinejoin="round">

        {/* ── Wreath ring ── */}
        <circle cx="600" cy="700" r="190" strokeWidth="0.85" />

        {/* ── 6 roses on the ring ── */}
        {roses.map((pos, i) => (
          <g key={i} transform={`translate(${pos.x}, ${pos.y})`}>
            {[0, 72, 144, 216, 288].map(a => (
              <g key={a} transform={`rotate(${a})`}>
                <path d={outerPetal} strokeWidth="1.1" />
              </g>
            ))}
            {[36, 108, 180, 252, 324].map(a => (
              <g key={a} transform={`rotate(${a})`}>
                <path d={innerPetal} strokeWidth="0.9" />
              </g>
            ))}
            <circle r="7" strokeWidth="0.85" />
            <circle r="3.5" strokeWidth="0.65" />
          </g>
        ))}

        {/* ── Leaf clusters between roses ── */}
        {leafClusters.map((lc, i) => (
          <g key={i} transform={`translate(${lc.x}, ${lc.y}) rotate(${lc.rot})`}>
            {/* Centre leaf — points outward */}
            <path d="M 0,8 C -18,-16 -16,-50 0,-70 C 16,-50 18,-16 0,8 Z" strokeWidth="0.9" />
            <path d="M 0,8 L 0,-70" strokeWidth="0.5" />
            <path d="M 0,-14 C -11,-19 -14,-25 -12,-33" strokeWidth="0.42" />
            <path d="M 0,-14 C  11,-19  14,-25  12,-33" strokeWidth="0.42" />
            <path d="M 0,-33 C -10,-38 -12,-44 -10,-53" strokeWidth="0.36" />
            <path d="M 0,-33 C  10,-38  12,-44  10,-53" strokeWidth="0.36" />
            <path d="M 0,-52 C  -7,-56  -8,-61  -7,-66" strokeWidth="0.3" />
            <path d="M 0,-52 C   7,-56   8,-61   7,-66" strokeWidth="0.3" />
            {/* Left companion leaf */}
            <g transform="translate(-14, -14) rotate(-24)">
              <path d="M 0,6 C -13,-10 -12,-36 0,-52 C 12,-36 13,-10 0,6 Z" strokeWidth="0.78" />
              <path d="M 0,6 L 0,-52" strokeWidth="0.4" />
              <path d="M 0,-12 C -8,-16 -10,-21 -8,-28" strokeWidth="0.32" />
              <path d="M 0,-12 C  8,-16  10,-21  8,-28" strokeWidth="0.32" />
              <path d="M 0,-28 C -6,-32 -7,-37 -6,-43" strokeWidth="0.28" />
              <path d="M 0,-28 C  6,-32  7,-37  6,-43" strokeWidth="0.28" />
            </g>
            {/* Right companion leaf */}
            <g transform="translate(14, -14) rotate(24)">
              <path d="M 0,6 C -13,-10 -12,-36 0,-52 C 12,-36 13,-10 0,6 Z" strokeWidth="0.78" />
              <path d="M 0,6 L 0,-52" strokeWidth="0.4" />
              <path d="M 0,-12 C -8,-16 -10,-21 -8,-28" strokeWidth="0.32" />
              <path d="M 0,-12 C  8,-16  10,-21  8,-28" strokeWidth="0.32" />
              <path d="M 0,-28 C -6,-32 -7,-37 -6,-43" strokeWidth="0.28" />
              <path d="M 0,-28 C  6,-32  7,-37  6,-43" strokeWidth="0.28" />
            </g>
          </g>
        ))}

        {/* ── Large center rose ── */}
        <g transform="translate(600, 700)">
          {[0, 72, 144, 216, 288].map(a => (
            <g key={a} transform={`rotate(${a})`}>
              <path d="M 0,15 C -27,11 -32,-23 -19,-45 C -11,-56 11,-56 19,-45 C 32,-23 27,11 0,15 Z" strokeWidth="1.2" />
            </g>
          ))}
          {[36, 108, 180, 252, 324].map(a => (
            <g key={a} transform={`rotate(${a})`}>
              <path d="M 0,10 C -16,7 -18,-14 -10,-27 C -6,-33 6,-33 10,-27 C 18,-14 16,7 0,10 Z" strokeWidth="1" />
            </g>
          ))}
          <circle r="9" strokeWidth="0.9" />
          <circle r="4" strokeWidth="0.7" />
        </g>

      </g>
    </svg>
  )
}

// ── Color tokens for this page ────────────────────────────────────────────
const C = {
  bg:        '#2C3B2D',
  text:      '#FAF0E2',
  body:      'rgba(250,240,226,0.72)',
  label:     'rgba(250,240,226,0.42)',
  gold:      '#D4BC8A',
  divider:   'rgba(250,240,226,0.12)',
  btnBorder: 'rgba(250,240,226,0.45)',
} as const

export default function MarinPage() {
  return (
    <div style={{ background: C.bg, minHeight: '100vh', position: 'relative' }}>

      {/* ── Botanical watermark (full page, very faint) ── */}
      <BotanicalWatermark />

      {/* ── Corner botanical frames ── */}
      <CornerBotanical style={{ top: 0, left: 0 }} />
      <CornerBotanical style={{ top: 0, right: 0, transform: 'scaleX(-1)' }} />
      <CornerBotanical style={{ bottom: 0, left: 0, transform: 'scaleY(-1)' }} />
      <CornerBotanical style={{ bottom: 0, right: 0, transform: 'scale(-1)' }} />

      {/* ── Main content ── */}
      <div
        className="px-6 md:px-16 max-w-7xl mx-auto pt-32 md:pt-40 pb-24"
        style={{ position: 'relative', zIndex: 1 }}
      >

        {/* ── Header ── */}
        <p className="section-label mb-4" style={{ color: C.label }}>Now Showing</p>

        <h1
          className="font-display"
          style={{
            color: C.text,
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
          }}
        >
          Zimbabwe Contemporary Sculpture{' '}
          <em style={{ fontStyle: 'italic', fontWeight: 300 }}>Exhibition</em>
        </h1>

        <div style={{ marginTop: '0.75rem' }}>
          <p
            className="font-display"
            style={{
              color: C.text,
              fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
              fontWeight: 300,
              letterSpacing: '-0.01em',
            }}
          >
            Featuring Dominic Benhura
          </p>
          <p
            className="font-body"
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: C.label,
              fontWeight: 400,
              marginTop: '0.2rem',
            }}
          >
            Marin Art &amp; Garden Center, Ross, CA — On view until October 2026
          </p>
        </div>

        {/* ── Divider ── */}
        <div style={{ height: '1px', background: C.divider, marginTop: '1.5rem', marginBottom: '1.5rem' }} />

        {/* ── Body text ── */}
        <div style={{ maxWidth: '40rem' }} className="space-y-4">
          <p className="font-body leading-relaxed" style={{ fontSize: '0.9rem', color: C.body }}>
            This exhibition brings together a selection of works by Dominic Benhura, one of
            Zimbabwe's most celebrated stone sculptors, presented at the Marin Art &amp; Garden
            Center in Ross, California.
          </p>
          <p className="font-body leading-relaxed" style={{ fontSize: '0.9rem', color: C.body }}>
            Benhura's work is defined by movement. Where stone is so often associated with
            stillness, his figures leap, embrace, laugh and reach. Carved entirely by hand from a
            single block of springstone, each piece carries the full weight of the material and
            the full lightness of the moment it captures.
          </p>
          <p className="font-body leading-relaxed" style={{ fontSize: '0.9rem', color: C.body }}>
            The works on view span his signature themes: mothers and children, figures in motion,
            the tender geometry of human connection. They are available for acquisition through
            Slab of Africa.
          </p>
          <p className="font-body leading-relaxed" style={{ fontSize: '0.9rem', color: C.body }}>
            For inquiries contact{' '}
            <a
              href="mailto:shaan@slabofafrica.com"
              style={{ color: C.gold, borderBottom: `1px solid ${C.gold}`, paddingBottom: '1px' }}
            >
              shaan@slabofafrica.com
            </a>
            .
          </p>
        </div>

        {/* ── Exhibition catalogue button ── */}
        <div style={{ marginTop: '1.5rem' }}>
          <style>{`
            .marin-catalogue-btn {
              display: inline-flex;
              align-items: center;
              background: ${C.gold};
              color: ${C.bg};
              border: 1px solid ${C.gold};
              padding: 0.75rem 1.75rem;
              font-family: var(--font-jost), system-ui, sans-serif;
              font-size: 0.75rem;
              font-weight: 400;
              letter-spacing: 0.18em;
              text-transform: uppercase;
              cursor: pointer;
              transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
              text-decoration: none;
            }
            .marin-catalogue-btn:hover {
              background-color: #B8A070;
              border-color: #B8A070;
            }
          `}</style>
          <a
            href="https://www.benhuraexhibit.com"
            target="_blank"
            rel="noopener noreferrer"
            className="marin-catalogue-btn"
          >
            View Exhibition Catalogue
          </a>
        </div>

        {/* ── Divider ── */}
        <div style={{ height: '1px', background: C.divider, marginTop: '1.5rem', marginBottom: '1.5rem' }} />

        {/* ── Photo grid ── */}
        <div className="columns-2 md:columns-3" style={{ columnGap: '8px' }}>
          {PHOTOS.map((src, i) => (
            <div key={src} style={{ breakInside: 'avoid', marginBottom: '8px' }}>
              <Image
                src={src}
                alt="Dominic Benhura Shona stone sculpture at Marin Art &amp; Garden Center, Ross California"
                width={0}
                height={0}
                sizes="(max-width: 768px) calc(50vw - 2rem), calc(33vw - 4rem)"
                style={{ width: '100%', height: 'auto', display: 'block' }}
                priority={i < 3}
              />
            </div>
          ))}
        </div>

        {/* ── Inquire ── */}
        <div style={{ marginTop: '1.5rem' }}>
          <Link
            href="/inquire"
            className="font-body"
            style={{
              fontSize: '0.72rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: C.gold,
              borderBottom: `1px solid ${C.gold}`,
              paddingBottom: '2px',
            }}
          >
            Inquire →
          </Link>
        </div>

      </div>
    </div>
  )
}
