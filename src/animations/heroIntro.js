import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

// Hero intro, timed against rockstargames.com/VI. Like the live site it is drawn on a canvas
// (CSS masks can't use AVIF images, and the shards need their silhouettes). GSAP tweens the
// values below; a ticker draws them. Every time and ease was measured from the live site's
// canvas calls and fitted to GSAP eases. Times are seconds from when the first shard moves (T0).

// T0 comes this long after the loader starts its exit
export const INTRO_DELAY = 0.64

// Each shard flies in from the camera: drawn at scale 1/p while p eases to 1.
// p0 is where p starts; tint is a dark silhouette fading off it (always power3.inOut).
const SHARDS = [
  { p0: 0.1523, ease: 'power2.inOut', from: -0.242, to: 1.74, tintFrom: -0.098, tintTo: 2.04 },
  { p0: 0, ease: 'power2.inOut', from: -0.144, to: 1.69, tintFrom: -0.004, tintTo: 2.04 },
  { p0: 0, ease: 'power2.out', from: 0.556, to: 1.82, tintFrom: 0.089, tintTo: 2.04 },
  { p0: 0, ease: 'power2.out', from: 0.642, to: 1.78, tintFrom: 0.184, tintTo: 2.03 },
  { p0: 0, ease: 'power3.out', from: 0.705, to: 2.05, tintFrom: 0.278, tintTo: 2.03 },
  { p0: 0, ease: 'power3.out', from: 0.721, to: 2.03, tintFrom: 0.37, tintTo: 2.03 },
  { p0: 0, ease: 'power3.out', from: 0.929, to: 2.05, tintFrom: 0.462, tintTo: 2.03 },
  { p0: 0, ease: 'power3.out', from: 0.872, to: 2.02, tintFrom: 0.555, tintTo: 2.03 },
  { p0: 0, ease: 'power3.out', from: 0.889, to: 2.05, tintFrom: 0.639, tintTo: 2.04 },
]

const TINT = '#0c0d1b'
const VI_GLOW = '#ffacfd'
const GTA_GLOW = '#ffd398'
const WIPE_EDGE = 0.2907 // soft edge of the wordmark wipe, as a fraction of the image height
const MIN_P = 1 / 40 // cap the zoom: beyond ~40x a shard already covers the screen
const ORIGIN = 0.3 // some tweens start just before T0, so the timeline begins this much earlier

const $ = (name) => document.querySelectorAll(`[data-intro="${name}"]`)

// Everything the canvas draws, in the live site's draw order
function initialState() {
  return {
    shards: SHARDS.map((s) => ({ p: s.p0, tint: 1 })),
    shardAlpha: 0.5,
    filler: 0,
    vi: { p: 0.5, alpha: 0, glow: 0 },
    gta: { p: 0.5, glow: 0, wipe: 0.0073 },
  }
}

// A layer's shape filled with one colour, at the given pixel size
function silhouette(img, color, w, h) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const x = c.getContext('2d')
  x.drawImage(img, 0, 0, w, h)
  x.globalCompositeOperation = 'source-in'
  x.fillStyle = color
  x.fillRect(0, 0, w, h)
  return c
}

function createRenderer(canvas, box, state) {
  const ctx = canvas.getContext('2d')
  const img = (name) => document.querySelector(`[data-intro-src="${name}"] img`)
  const shardImgs = [...document.querySelectorAll('[data-intro-src="shard"] img')]
  const filler = img('filler')
  const vi = img('vi')
  const gta = img('gta')
  const wipe = document.createElement('canvas')
  let cache = null // silhouettes, rebuilt if the poster size changes

  function buildCache(w, h) {
    cache = {
      w,
      h,
      tints: shardImgs.map((im) => silhouette(im, TINT, w, h)),
      viGlow: silhouette(vi, VI_GLOW, w, h),
      gtaGlow: silhouette(gta, GTA_GLOW, w, h),
    }
    wipe.width = w
    wipe.height = h
  }

  function render() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const area = canvas.getBoundingClientRect()
    const b = box.getBoundingClientRect()
    if (canvas.width !== Math.round(area.width * dpr) || canvas.height !== Math.round(area.height * dpr)) {
      canvas.width = Math.round(area.width * dpr)
      canvas.height = Math.round(area.height * dpr)
    }
    // Silhouettes at poster size in device pixels (capped to keep memory down)
    const sw = Math.min(Math.round(b.width * dpr), 1600)
    const sh = Math.round((sw * b.height) / b.width)
    if (!cache || cache.w !== sw) buildCache(sw, sh)

    const cx = b.left - area.left + b.width / 2
    const cy = b.top - area.top + b.height / 2
    // Draw a full-poster layer scaled about the poster centre
    const draw = (src, p, alpha) => {
      if (alpha <= 0.001) return
      const k = 1 / Math.max(p, MIN_P)
      const w = b.width * k
      const h = b.height * k
      ctx.globalAlpha = Math.min(alpha, 1)
      ctx.drawImage(src, cx - w / 2, cy - h / 2, w, h)
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.globalAlpha = 1
    ctx.clearRect(0, 0, area.width, area.height)

    state.shards.forEach((s, i) => {
      draw(shardImgs[i], s.p, state.shardAlpha)
      draw(cache.tints[i], s.p, s.tint)
    })
    draw(filler, 1, state.filler)

    draw(cache.viGlow, state.vi.p, state.vi.glow)
    draw(vi, state.vi.p, state.vi.alpha)

    draw(cache.gtaGlow, state.gta.p, state.gta.glow)
    // Wordmark revealed top to bottom: opaque above the edge, fading to clear at the wipe line
    const y = state.gta.wipe * sh
    if (y > 0) {
      const x = wipe.getContext('2d')
      x.globalCompositeOperation = 'source-over'
      x.clearRect(0, 0, sw, sh)
      x.drawImage(gta, 0, 0, sw, sh)
      x.clearRect(0, y, sw, sh - y)
      const g = x.createLinearGradient(0, 0, 0, y)
      g.addColorStop(0, '#fff')
      g.addColorStop(Math.max(0, (y - WIPE_EDGE * sh) / y), '#fff')
      g.addColorStop(1, 'rgba(255,255,255,0)')
      x.globalCompositeOperation = 'destination-in'
      x.fillStyle = g
      x.fillRect(0, 0, sw, y)
      draw(wipe, state.gta.p, 1)
    }
  }

  function dispose() {
    cache = null
    wipe.width = wipe.height = 0
    canvas.width = canvas.height = 0
  }

  return { render, dispose }
}

// Sets the intro's start state on mount, then plays it once `play` turns true.
export function useHeroIntro(play) {
  useGSAP(
    () => {
      const canvas = $('canvas')[0]
      const hide = [$('poster'), $('nav'), $('text'), $('button')]

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(canvas, { display: 'none' })
        return
      }
      // Start state, applied before first paint (the loader covers it anyway)
      gsap.set(hide, { autoAlpha: 0 })
      if (!play) return

      const state = initialState()
      const renderer = createRenderer(canvas, $('box')[0], state)
      gsap.ticker.add(renderer.render)
      const finish = () => {
        gsap.ticker.remove(renderer.render)
        renderer.dispose()
        gsap.set(canvas, { display: 'none' })
      }

      const tl = gsap.timeline({ delay: INTRO_DELAY - ORIGIN })
      const at = (from) => from + ORIGIN
      const tween = (target, vars, from, to) => tl.to(target, { ...vars, duration: to - from }, at(from))

      // Shards fly together and emerge from the dark, then brighten from half to full
      state.shards.forEach((s, i) => {
        const d = SHARDS[i]
        tween(s, { p: 1, ease: d.ease }, d.from, d.to)
        tween(s, { tint: 0, ease: 'power3.inOut' }, d.tintFrom, d.tintTo)
      })
      tween(state, { shardAlpha: 1, ease: 'sine.inOut' }, 2.04, 3.15)
      // The small piece behind the logo just fades up
      tween(state, { filler: 1, ease: 'sine.inOut' }, 1.85, 2.32)

      // VI settles in and fades up, with a pink glow that swells and fades
      tween(state.vi, { p: 1, ease: 'power3.out' }, 1.02, 2.04)
      tween(state.vi, { alpha: 1, ease: 'none' }, 1.11, 1.67)
      tween(state.vi, { glow: 1, ease: 'none' }, 1.48, 2.41)
      tween(state.vi, { glow: 0, ease: 'power2.in' }, 2.46, 3.58)

      // "grand theft auto" settles in and wipes on top to bottom, over a warm glow
      tween(state.gta, { p: 1, ease: 'power3.out' }, 1.06, 2.05)
      tween(state.gta, { wipe: 1, ease: 'power1.out' }, 1.11, 3.24)
      tween(state.gta, { glow: 1, ease: 'none' }, 1.91, 2.46)
      tween(state.gta, { glow: 0, ease: 'power2.in' }, 2.46, 3.58)

      // Nav and text fade in
      tween([$('nav'), $('text')], { autoAlpha: 1, ease: 'power1.inOut' }, 2.05, 3.56)
      tween($('button'), { autoAlpha: 1, ease: 'power1.in' }, 2.06, 2.83)

      // Hand over to the static poster, then stop drawing
      tween($('poster'), { autoAlpha: 1, ease: 'none' }, 3.63, 4.13)
      tl.call(finish)

      return () => gsap.ticker.remove(renderer.render)
    },
    { dependencies: [play] },
  )
}
