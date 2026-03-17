// ─── Per-page palette ─────────────────────────────────────────────────────
// Each page gets a background, a nav accent, a CTA section variant,
// and a flag for whether it's a dark-theme page.

export interface PagePalette {
  bg: string        // root page background
  ctaBg: string     // slightly shifted bg for CTA / section breaks
  accent: string    // nav underline + active state accent
  isDark: boolean   // inverts nav text + scrolled-header colour
}

export const PAGE_PALETTES: Record<string, PagePalette> = {
  '/': {
    bg: '#F5E8D2',      // warm golden linen
    ctaBg: '#F8EFDF',   // lighter warm cream
    accent: '#C1522A',  // terracotta
    isDark: false,
  },
  '/collection': {
    bg: '#C8BAA6',      // warm greige / muted clay
    ctaBg: '#D4C9B8',   // lighter warm greige
    accent: '#8B7A6A',  // deeper clay for nav underline
    isDark: false,
  },
  '/artists': {
    bg: '#EDE0C4',      // warm desert sand
    ctaBg: '#F3EAD4',   // lighter sand
    accent: '#AD8B52',  // amber sand
    isDark: false,
  },
  '/fairs': {
    bg: '#CCBFA0',      // warm oat / linen
    ctaBg: '#D8CBAF',   // lighter warm oat
    accent: '#9A7E54',  // warm amber-brown for nav underline
    isDark: false,
  },
  '/about': {
    bg: '#EAD9CA',      // warm clay / terra rosa
    ctaBg: '#F0E4D6',   // lighter clay
    accent: '#8B6F62',  // clay
    isDark: false,
  },
  '/inquire': {
    bg: '#1C1714',      // deep warm charcoal
    ctaBg: '#231E1A',   // slightly lighter dark
    accent: '#C8AE96',  // warm cream — legible on dark
    isDark: true,
  },
}

// Fallback for unknown paths
export const DEFAULT_PALETTE = PAGE_PALETTES['/']

export function getPalette(pathname: string): PagePalette {
  return PAGE_PALETTES[pathname] ?? DEFAULT_PALETTE
}
