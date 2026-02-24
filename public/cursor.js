;(function () {
  // Only on fine-pointer (mouse) devices
  if (!window.matchMedia('(pointer: fine)').matches) return

  // ── Create element ──────────────────────────────────────────────────────
  var el = document.createElement('div')
  el.setAttribute('aria-hidden', 'true')
  el.style.cssText = [
    'position:fixed',
    'top:0',
    'left:0',
    'width:15px',
    'height:15px',
    'border-radius:50%',
    'background:#fff',
    'mix-blend-mode:difference',
    'pointer-events:none',
    'z-index:99999',
    'will-change:transform',
    'opacity:0',
    'transform:translate(-200px,-200px)',
    'transition:width 0.18s ease,height 0.18s ease',
  ].join(';')
  document.body.appendChild(el)

  // ── State ───────────────────────────────────────────────────────────────
  var mouseX = -200, mouseY = -200
  var curX   = -200, curY   = -200
  var alpha  = 0
  var targetAlpha = 0
  var raf

  // ── Mouse tracking ──────────────────────────────────────────────────────
  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX
    mouseY = e.clientY
    targetAlpha = 1

    // Expand on interactive / image elements
    var t = e.target
    var isInteractive =
      t.closest('a, button, [role="button"], label, select, textarea, input') !== null ||
      t.tagName === 'IMG'

    el.style.width  = isInteractive ? '35px' : '15px'
    el.style.height = isInteractive ? '35px' : '15px'
  }, { passive: true })

  document.addEventListener('mouseleave', function () {
    targetAlpha = 0
  }, { passive: true })

  // ── RAF loop — single loop, transform only, no layout triggers ──────────
  function tick() {
    // Instant tracking (lerp factor = 1)
    curX = curX + (mouseX - curX)
    curY = curY + (mouseY - curY)

    // Fade in/out
    alpha = alpha + (targetAlpha - alpha) * 0.12

    // Offset by half-size so the cursor is centered on the hot-spot.
    // Read offsetWidth only once on first paint; after that the CSS
    // transition handles the size change visually — no need to re-read.
    var half = 7.5 // half of default 15px
    el.style.transform = 'translate(' + (curX - half) + 'px,' + (curY - half) + 'px)'
    el.style.opacity   = alpha < 0.005 ? '0' : alpha.toFixed(3)

    raf = requestAnimationFrame(tick)
  }

  raf = requestAnimationFrame(tick)
})()
