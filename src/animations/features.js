import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// Feature card animation, taken from rockstargames.com/VI. For each card, while it crosses the screen:
//   - it grows 0.985 → 1 until it's halfway across, then holds
//   - its artwork drifts down at 3% of the scroll speed (a 0.97 parallax), enlarged just enough
//     that the drift never shows an edge
// On desktop, the artwork's edge fade follows the pointer around the text's corner.
const $ = (name) => document.querySelectorAll(`[data-feature="${name}"]`)
const DRIFT = 0.03 // artwork travel per px of scroll
const OVERSCAN = 0.0317 // extra size per px of travel range, a little more than the drift needs

export function useFeaturesScroll() {
  useGSAP(() => {
    const cards = [...$('card')]
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      cards.forEach((card) => {
        const range = () => window.innerHeight + card.offsetHeight
        const scrollTrigger = { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true }

        gsap
          .timeline({ defaults: { ease: 'none' }, scrollTrigger })
          .fromTo(card, { scale: 0.985 }, { scale: 1, duration: 0.5 }, 0)
          .set({}, {}, 1)

        const scale = () => 1 + (OVERSCAN * range()) / card.offsetHeight
        gsap.fromTo(
          card.querySelector('[data-feature="art"]'),
          { scale, y: () => (-DRIFT * range()) / 2 },
          { scale, y: () => (DRIFT * range()) / 2, ease: 'none', scrollTrigger },
        )
      })
    })

    // Pointer-tracked fade (desktop only; phones use a fixed top-to-bottom fade)
    mm.add('(min-width: 768px) and (pointer: fine)', () => {
      const cleanups = cards.map((card) => {
        const pos = { x: -5, y: 140 }
        const apply = () => gsap.set(card, { '--mx': `${pos.x}%`, '--my': `${pos.y}%` })
        const toX = gsap.quickTo(pos, 'x', { duration: 0.3, ease: 'none', onUpdate: apply })
        const toY = gsap.quickTo(pos, 'y', { duration: 0.3, ease: 'none', onUpdate: apply })

        const onMove = (e) => {
          const r = card.getBoundingClientRect()
          const x = gsap.utils.clamp(0, 1, (e.clientX - r.left) / r.width)
          const y = gsap.utils.clamp(0, 1, (e.clientY - r.top) / r.height)
          toX(gsap.utils.clamp(-15, 5, -5 - 10 * (x - 0.5) * 2))
          toY(gsap.utils.clamp(133, 147, 140 - 7 * (y - 0.5) * 2))
        }
        const onLeave = () => {
          toX(-5)
          toY(140)
        }

        card.addEventListener('pointermove', onMove, { passive: true })
        card.addEventListener('pointerleave', onLeave, { passive: true })
        return () => {
          card.removeEventListener('pointermove', onMove)
          card.removeEventListener('pointerleave', onLeave)
        }
      })
      return () => cleanups.forEach((fn) => fn())
    })
  })
}
