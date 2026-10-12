import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// "An Extended Look" scroll animation, measured on rockstargames.com/VI.
// Positions are in screen heights from the top of the page (the section starts at 0.35,
// under the hero), so everything scales with the window height as on the live site.
//
//   0.35 → 3.05   scene pinned; image zooms 1.2 → 1, content 1.05 → 0.9
//   0.35 → 0.86   image brightens from 20%
//   0.50 → 1.19   image fades in          2.05 → 2.86  fades out
//   0.61 → 1.18   title fades in          2.05 → 3.05  fades out
//   0.93 → 1.35   play button fades in    2.45 → 2.75  fades out
//   1.83 → 2.06   cursor glow returns
//   2.18 → 3.05   cards grow 0.985 → 1
//   2.06 → 3.94   card artwork drifts down through its margin (2.01 → 3.68 on phones)
const $ = (name) => `[data-xl="${name}"]`

export function useExtendedLookScroll() {
  useGSAP(() => {
    const vh = (fraction) => () => window.innerHeight * fraction
    // A scrubbed tween between two scroll positions (in screen heights)
    const scrub = (target, from, to, vars, start, end) =>
      gsap.fromTo(target, from, {
        ...to,
        ...vars,
        ease: vars.ease ?? 'none',
        scrollTrigger: { start: vh(start), end: vh(end), scrub: true },
      })

    const mm = gsap.matchMedia()
    mm.add({ all: 'all', motion: '(prefers-reduced-motion: no-preference)', mobile: '(max-width: 767px)' }, (ctx) => {
      const { motion, mobile } = ctx.conditions

      // Pin the scene without adding scroll space; the spacer in the markup sets the pin length
      ScrollTrigger.create({ trigger: $('scene'), start: 'top top', end: '+=270%', pin: true, pinSpacing: false })

      if (motion) {
        scrub($('image-zoom'), { scale: 1.2 }, { scale: 1 }, {}, 0.35, 3.05)
        scrub($('content'), { scale: 1.05 }, { scale: 0.9 }, {}, 0.35, 3.05)
        scrub($('card'), { scale: 0.985 }, { scale: 1 }, {}, 2.18, 3.05)
        // Artwork sits slightly enlarged and drifts through that margin (about 0.029px per px scrolled)
        gsap.set($('card-art'), { scale: mobile ? 1.0935 : 1.0752 })
        if (mobile) scrub($('card-art'), { yPercent: -4.67 }, { yPercent: 4.67 }, {}, 2.01, 3.68)
        else scrub($('card-art'), { yPercent: -3.76 }, { yPercent: 3.76 }, {}, 2.06, 3.94)
      }

      scrub($('image'), { '--brightness': 0.2 }, { '--brightness': 1 }, { ease: 'power1.in' }, 0.35, 0.86)
      scrub($('image'), { opacity: 0 }, { opacity: 1 }, { ease: 'power2.in' }, 0.5, 1.19)
      scrub($('title'), { opacity: 0 }, { opacity: 1 }, { ease: 'power3.in' }, 0.61, 1.18)
      scrub($('play'), { opacity: 0 }, { opacity: 1 }, {}, 0.93, 1.35)
      scrub('[data-scroll="glow"]', { '--return': 0 }, { '--return': 1 }, {}, 1.83, 2.06)

      // Fade-outs: immediateRender off so they don't overwrite the fade-ins above on load
      const out = (target, start, end) =>
        gsap.to(target, { opacity: 0, ease: 'none', immediateRender: false, scrollTrigger: { start: vh(start), end: vh(end), scrub: true } })
      out($('image'), 2.05, 2.86)
      out($('title'), 2.05, 3.05)
      out($('play'), 2.45, 2.75)
    })
  })
}
