#!/usr/bin/env python3
"""
Slab of Africa — Instagram Story Generator
Generates a branded 1080×1920 PNG from a sculpture photo + text.

Usage:
    python3 generate_story.py <photo_path> "<headline>" "<caption>"

Example:
    python3 generate_story.py public/images/recent/apple-of-my-eye-dominic.jpg \
        "Dominic Benhura" "A true master of his craft."

Output:
    stories_output/<photo_name>.png  (1080×1920 PNG)
"""

import sys
import urllib.request
from pathlib import Path
from typing import List, Tuple

from PIL import Image, ImageDraw, ImageFilter, ImageFont

# ── Brand Palette ──────────────────────────────────────────────────────────────
BG         = (8,   6,   4)    # #080604  near-black top (photo area)
BG_TEXT    = (42,  36,  32)   # #2A2420  warm dark brown (text area)
TERRA      = (193, 82,  42)   # #C1522A  terracotta accent / divider
STONE      = (154, 138, 122)  # #9A8A7A  body / caption text
WARM_WHITE = (250, 248, 244)  # #FAF8F4  headline text

# ── Canvas ─────────────────────────────────────────────────────────────────────
W, H         = 1080, 1920
PHOTO_H      = int(H * 0.62)  # 1190 — photo zone (contain-fit, no crop)
SAFE_BOTTOM  = H - 300        # 1620 — Instagram UI covers below this
MARGIN       = 72             # horizontal padding

# ── Output folder ──────────────────────────────────────────────────────────────
OUTPUT_DIR   = Path(__file__).parent / "stories_output"

# ── Font Cache ─────────────────────────────────────────────────────────────────
FONTS_DIR    = Path(__file__).parent / ".story_fonts"

_CDN = "https://cdn.jsdelivr.net/gh"
FONT_URLS = {
    "cormorant.ttf":        _CDN + "/CatharsisFonts/Cormorant@master/fonts/ttf/CormorantGaramond-Regular.ttf",
    "cormorant_italic.ttf": _CDN + "/CatharsisFonts/Cormorant@master/fonts/ttf/CormorantGaramond-Italic.ttf",
    "cormorant_light.ttf":  _CDN + "/CatharsisFonts/Cormorant@master/fonts/ttf/CormorantGaramond-Light.ttf",
    "jost.ttf":             _CDN + "/indestructible-type/Jost@master/fonts/ttf/Jost-400-Book.ttf",
    "jost_light.ttf":       _CDN + "/indestructible-type/Jost@master/fonts/ttf/Jost-300-Light.ttf",
}


# ─────────────────────────────── Font helpers ──────────────────────────────────

def ensure_fonts():
    """Download brand fonts to .story_fonts/ if not already cached."""
    FONTS_DIR.mkdir(exist_ok=True)
    any_downloaded = False
    for fname, url in FONT_URLS.items():
        dest = FONTS_DIR / fname
        if dest.exists():
            continue
        if not any_downloaded:
            print("Downloading brand fonts …")
            any_downloaded = True
        print("  {} …".format(fname), end=" ", flush=True)
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=30) as r:
                dest.write_bytes(r.read())
            print("done")
        except Exception as e:
            print("failed: {}".format(e), file=sys.stderr)


def load_font(name, size):
    # type: (str, int) -> ImageFont.FreeTypeFont
    """Load font from cache; fall back to system fonts gracefully."""
    path = FONTS_DIR / name
    if path.exists():
        try:
            return ImageFont.truetype(str(path), size)
        except Exception:
            pass
    is_serif = "cormorant" in name
    candidates = (
        ["/System/Library/Fonts/Supplemental/Georgia.ttf"]
        if is_serif else
        ["/System/Library/Fonts/Helvetica.ttc",
         "/System/Library/Fonts/Supplemental/Arial.ttf"]
    )
    for p in candidates:
        if Path(p).exists():
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                pass
    return ImageFont.load_default()


# ─────────────────────────────── Drawing helpers ───────────────────────────────

def text_width(text, fnt, tracking=0.0):
    # type: (str, ImageFont.FreeTypeFont, float) -> int
    """Total rendered width including per-character tracking."""
    if tracking == 0.0:
        return int(fnt.getlength(text))
    extra = fnt.size * tracking
    w = sum(fnt.getlength(ch) + extra for ch in text) - extra
    return max(0, int(w))


def draw_tracked(draw, xy, text, fnt, fill, tracking=0.0):
    # type: (ImageDraw.Draw, Tuple[int,int], str, ImageFont.FreeTypeFont, tuple, float) -> None
    """Draw text with explicit letter-spacing (tracking in ems)."""
    x, y = xy
    extra = fnt.size * tracking
    for ch in text:
        draw.text((x, y), ch, font=fnt, fill=fill)
        x += fnt.getlength(ch) + extra


def wrap_lines(text, fnt, max_w):
    # type: (str, ImageFont.FreeTypeFont, int) -> List[str]
    """Word-wrap text to fit within max_w pixels."""
    lines, cur = [], ""
    for word in text.split():
        probe = (cur + " " + word).strip()
        if fnt.getlength(probe) <= max_w:
            cur = probe
        else:
            if cur:
                lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    return lines or [text]


def draw_centered(draw, y, lines, fnt, fill, line_height_mult=1.22):
    # type: (ImageDraw.Draw, int, List[str], ImageFont.FreeTypeFont, tuple, float) -> int
    """Draw centred multi-line text. Returns updated y."""
    lh = int(fnt.size * line_height_mult)
    for line in lines:
        draw.text(((W - text_width(line, fnt)) // 2, y), line, font=fnt, fill=fill)
        y += lh
    return y


# ─────────────────────────────── Composition ───────────────────────────────────

def make_gradient_bg():
    # type: () -> Image.Image
    """
    Vertical gradient canvas: #0C0A09 at top → #1C1917 at bottom.
    Built as a 1×H strip then stretched, so it's fast.
    """
    strip = Image.new("RGB", (1, H))
    pixels = []
    for row in range(H):
        t = row / (H - 1)
        pixels.append((
            int(BG[0] + (BG_TEXT[0] - BG[0]) * t),
            int(BG[1] + (BG_TEXT[1] - BG[1]) * t),
            int(BG[2] + (BG_TEXT[2] - BG[2]) * t),
        ))
    strip.putdata(pixels)
    return strip.resize((W, H), Image.NEAREST)


def make_photo_layer(photo_path):
    # type: (str) -> Image.Image
    """Contain-fit photo within top 55% zone; alpha-fade into gradient background."""
    src    = Image.open(photo_path).convert("RGB")
    sw, sh = src.size

    # Contain-fit: scale so entire photo is visible, no cropping
    scale  = min(W / sw, PHOTO_H / sh)
    nw, nh = int(sw * scale), int(sh * scale)
    src    = src.resize((nw, nh), Image.LANCZOS)

    # Centre photo within the zone
    px = (W     - nw) // 2
    py = (PHOTO_H - nh) // 2

    # Build alpha mask: opaque on top, fades to transparent over bottom 40%
    fade_start_local = int(nh * 0.60)
    fade_span        = max(nh - fade_start_local, 1)
    alpha            = Image.new("L", (nw, nh), 255)
    alpha_draw       = ImageDraw.Draw(alpha)
    for row in range(fade_start_local, nh):
        t   = min(1.0, (row - fade_start_local) / fade_span)
        val = int((1.0 - t ** 1.4) * 255)
        alpha_draw.line([(0, row), (nw - 1, row)], fill=val)

    photo_rgba = src.convert("RGBA")
    photo_rgba.putalpha(alpha)

    # Composite faded photo over gradient background
    canvas = make_gradient_bg().convert("RGBA")
    canvas.paste(photo_rgba, (px, py), mask=photo_rgba)
    return canvas.convert("RGB")


def add_grain(img, strength=0.028):
    # type: (Image.Image, float) -> Image.Image
    """Overlay subtle analogue film grain (skipped if numpy unavailable)."""
    try:
        import numpy as np
        rng   = np.random.default_rng(1984)
        noise = rng.integers(0, 256, (H, W), dtype=np.uint8)
        grain = Image.fromarray(noise, "L").filter(ImageFilter.GaussianBlur(0.5))
        n     = (np.asarray(grain, dtype=np.float32) - 128.0) / 128.0
        arr   = np.asarray(img, dtype=np.float32) + n[..., None] * 255 * strength
        return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))
    except ImportError:
        return img


# ─────────────────────────────── Main generator ────────────────────────────────

def generate_story(photo_path, headline, caption, output=None):
    # type: (str, str, str, str) -> str

    # Resolve output path
    if output is None:
        OUTPUT_DIR.mkdir(exist_ok=True)
        stem   = Path(photo_path).stem
        output = str(OUTPUT_DIR / "{}.png".format(stem))
    else:
        Path(output).parent.mkdir(parents=True, exist_ok=True)

    ensure_fonts()
    print("Compositing story …")

    # ── Photo + fade ──────────────────────────────────────────────────────────
    img  = make_photo_layer(photo_path)
    draw = ImageDraw.Draw(img)

    # ── Fonts ─────────────────────────────────────────────────────────────────
    f_wordmark = load_font("jost.ttf",               18)  # SLAB OF AFRICA (+15%)
    f_headline = load_font("cormorant_italic.ttf",   91)  # main headline  (+20%)
    f_handle   = load_font("jost_light.ttf",         26)  # @slabofafrica

    WM_TRACK  = 0.30
    HL_LH_M   = 1.18
    CAP_LH_M  = 1.55
    HD_GAP    = 36   # gap between caption and handle

    # ── Pre-calculate text block height to centre it in the safe zone ─────────
    #    Handle now flows inline below caption — not pinned to bottom.
    #    Available zone: PHOTO_H → SAFE_BOTTOM minus a bottom margin.
    TEXT_TOP   = PHOTO_H
    TEXT_H     = (SAFE_BOTTOM - 40) - TEXT_TOP   # leave 40px bottom margin

    hl_lines  = wrap_lines(headline, f_headline, W - 2 * MARGIN)
    hl_lh     = int(f_headline.size * HL_LH_M)

    # Fixed block height: wordmark + divider + headline + handle (caption varies)
    FIXED_H = (
        f_wordmark.size + 44 +        # wordmark + gap
        1              + 44 +        # divider + gap
        len(hl_lines) * hl_lh + 28 + # headline + gap
        HD_GAP + f_handle.size        # gap before handle + handle
    )

    cap_budget = TEXT_H - FIXED_H    # pixels available for caption

    # Fixed caption size — wrap naturally, no auto-scaling
    cap_size  = 34
    f_caption = load_font("jost.ttf", cap_size)
    cap_lines = wrap_lines(caption, f_caption, W - 2 * MARGIN)
    cap_lh    = int(cap_size * CAP_LH_M)

    # Total block height (including handle)
    block_h = FIXED_H + cap_lh * len(cap_lines)

    # Vertically centre the block then shift down 80px
    y = TEXT_TOP + max(0, (TEXT_H - block_h) // 2) - 20

    # ── "SLAB OF AFRICA" wordmark ─────────────────────────────────────────────
    wm_w = text_width("SLAB OF AFRICA", f_wordmark, WM_TRACK)
    draw_tracked(draw, ((W - wm_w) // 2, y), "SLAB OF AFRICA",
                 f_wordmark, STONE, WM_TRACK)
    y += f_wordmark.size + 44

    # ── Terracotta divider ────────────────────────────────────────────────────
    div_half = 90
    draw.rectangle(
        [(W // 2 - div_half, y), (W // 2 + div_half, y + 1)],
        fill=TERRA,
    )
    y += 1 + 44

    # ── Headline ──────────────────────────────────────────────────────────────
    y = draw_centered(draw, y, hl_lines, f_headline, WARM_WHITE, HL_LH_M)
    y += 28

    # ── Caption ───────────────────────────────────────────────────────────────
    y = draw_centered(draw, y, cap_lines, f_caption, STONE, CAP_LH_M)

    # ── @slabofafrica handle — flows just below caption ───────────────────────
    handle   = "@slabofafrica"
    hd_track = 0.10
    hd_w     = text_width(handle, f_handle, hd_track)
    draw_tracked(draw, ((W - hd_w) // 2, y + HD_GAP), handle,
                 f_handle, STONE, hd_track)

    # ── Film grain ────────────────────────────────────────────────────────────
    img = add_grain(img)

    # ── Save ──────────────────────────────────────────────────────────────────
    img.save(output, "PNG", optimize=True)
    print("Saved → {}  ({}×{})".format(output, W, H))
    return output


# ── CLI entry point ────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(
        description="Generate a Slab of Africa Instagram Story (1080×1920 PNG).",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=(
            "Examples:\n"
            '  python3 generate_story.py sculpture.jpg "Bonded Souls" '
            '"Green opal · 18\\" · Gift Rusere"\n'
            '  python3 generate_story.py photo.jpg "Awakening" '
            '"Serpentine stone · Available" -o custom/path.png'
        ),
    )
    parser.add_argument("photo",    help="Path to sculpture photo (JPEG/PNG)")
    parser.add_argument("headline", help='Headline text, e.g. "Bonded Souls"')
    parser.add_argument("caption",  help='Body caption text')
    parser.add_argument(
        "-o", "--output", default=None,
        help="Output PNG path (default: stories_output/<photo_name>.png)",
    )
    args = parser.parse_args()

    if not Path(args.photo).exists():
        sys.exit("Error: photo not found — {}".format(args.photo))

    generate_story(args.photo, args.headline, args.caption, args.output)
