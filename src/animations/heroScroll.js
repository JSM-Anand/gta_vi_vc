import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// Scrolling past the hero, measured on rockstargames.com/VI. The hero stays pinned for one
// viewport height and the next section sits underneath it. As you scroll:
//   - the hero shrinks to 90%
//   - the poster, date, button and badges fade out; the logo lingers and fades more slowly
//   - the cursor glow fades away
//   - a Pre-Order pill appears in the nav once the hero's button has gone
//   - the next section (animations/extendedLook.js) fades in where the hero was
// Positions are fractions of the window height, so they scale with it as on the live site.
export function useHeroScroll() {
  useGSAP(() => {
    // The scroll arrow is dismissed for good on the first scroll
    const hideArrow = () => {
      if (window.scrollY <= 0) return
      gsap.set('[data-scroll="arrow"]', { autoAlpha: 0 })
      window.removeEventListener('scroll', hideArrow)
    }
    window.addEventListener('scroll', hideArrow, { passive: true })

    const pill = (autoAlpha) => gsap.to('[data-scroll="nav-preorder"]', { autoAlpha, duration: 0.27, ease: 'power1.inOut' })
    gsap.set('[data-scroll="nav-preorder"]', { autoAlpha: 0 })

    const mm = gsap.matchMedia()
    // `all` always matches, so this runs everywhere; only the shrink depends on motion preferences
    mm.add({ all: 'all', motion: '(prefers-reduced-motion: no-preference)', mobile: '(max-width: 767px)' }, (ctx) => {
      const { motion, mobile } = ctx.conditions

      // Scroll positions as a fraction of the window height (recomputed on resize). The pin's own
      // trigger is the hero; other triggers use plain positions, since ScrollTrigger would otherwise
      // treat them as inside the pin and push them back by its length.
      const at = (fraction) => () => window.innerHeight * fraction

      // Pin without adding scroll space: the next section scrolls in underneath
      const tl = gsap.timeline({
        scrollTrigger: { trigger: '#hero', start: 'top top', end: '+=100%', pin: true, pinSpacing: false, scrub: true },
      })
      if (motion) tl.to('[data-scroll="content"]', { scale: 0.9, ease: 'none', duration: 0.556 }, 0)
      tl.fromTo('[data-scroll="content"]', { '--hero-fade': 1 }, { '--hero-fade': 0, ease: 'power3.out', duration: 0.38 }, 0.28)
        .fromTo('[data-scroll="poster-logo"]', { opacity: 1 }, { opacity: 0, ease: 'power3.out', duration: 0.71 }, 0.28)
        .fromTo('[data-scroll="glow"]', { '--scroll-fade': 1 }, { '--scroll-fade': 0, ease: 'none', duration: 0.51 }, 0.35)
        .set({}, {}, 1) // the timeline spans the whole pin


      ScrollTrigger.create({
        start: at(mobile ? 0.575 : 0.52),
        onEnter: () => pill(1),
        onLeaveBack: () => pill(0),
      })
    })

    return () => window.removeEventListener('scroll', hideArrow)
  })
}
