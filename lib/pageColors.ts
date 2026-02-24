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
    bg: '#E8E0D0',      // warm raw stone
    ctaBg: '#EDE7D8',   // slightly lighter stone
    accent: '#86796F',  // muted stone
    isDark: false,
  },
  '/artists': {
    bg: '#EDE0C4',      // warm desert sand
    ctaBg: '#F3EAD4',   // lighter sand
    accent: '#AD8B52',  // amber sand
    isDark: false,
  },
  '/fairs': {
    bg: '#E8D5A8',      // warm ochre / dried wheat
    ctaBg: '#EDDDBA',   // lighter ochre
    accent: '#A07438',  // deep amber / raw sienna
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
