import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// "Ultimate Edition" backdrop, taken from rockstargames.com/VI. The backdrop starts 0.65 screens up,
// under the trailer cards:
//   - it's pinned from when it reaches the top until the cards do, and the footage zooms 1 → 1.1
//   - from when its top is a quarter of the way down the screen, it fades in over one screen
//     (easing in) while brightening from 20% over the first 61% of that
//   - the footage plays from first frame to last over the same span, ending as the cards reach the top
//   - as the cards rise from 80% down the screen (60% on phones) to the top, it fades out, dimming
//     back to 20% over the last fifth; the glow behind the cards fades out with it
// The cursor glow comes back as the cards arrive and fades again once they're near the top.
const $ = (name) => `[data-ue="${name}"]`

export function useUltimateEditionScroll() {
  useGSAP(() => {
    const video = document.querySelector($('video'))
    const backdrop = $('backdrop')
    const cards = $('cards')

    // Seek once per frame to wherever the scroll says the footage should be. On /ai the target is a
    // still image: it has no duration, so it only gets the zoom.
    let progress = 0
    let frame = 0
    const seek = () => {
      frame = 0
      if (video.duration) video.currentTime = video.duration * progress
    }
    video.addEventListener('loadedmetadata', seek)

    const mm = gsap.matchMedia()
    mm.add({ all: 'all', motion: '(prefers-reduced-motion: no-preference)', mobile: '(max-width: 767px)' }, (ctx) => {
      const { motion, mobile } = ctx.conditions
      const pin = { trigger: backdrop, start: 'top top', endTrigger: cards, end: 'top top' }

      ScrollTrigger.create({ ...pin, pin: true, pinSpacing: false })
      ScrollTrigger.create({
        ...pin,
        start: 'top 25%',
        onUpdate: (self) => {
          progress = self.progress
          frame ||= requestAnimationFrame(seek)
        },
      })
      if (motion) gsap.fromTo($('video'), { scale: 1 }, { scale: 1.1, ease: 'none', scrollTrigger: { ...pin, scrub: true } })

      // Durations are percentages of each span, as on the live site
      gsap
        .timeline({ defaults: { ease: 'none', duration: 100 }, scrollTrigger: { trigger: backdrop, start: 'top 25%', end: '+=100%', scrub: true } })
        .fromTo(backdrop, { autoAlpha: 0 }, { autoAlpha: 1, ease: 'power3.in' }, 0)
        .fromTo(backdrop, { filter: 'brightness(0.2)' }, { filter: 'brightness(1)', ease: 'power1.in', duration: 61 }, 0)

      // Fade-outs: immediateRender off so they don't overwrite the fade-in above on load
      gsap
        .timeline({
          defaults: { ease: 'none', duration: 100, immediateRender: false },
          scrollTrigger: { trigger: cards, start: mobile ? 'top bottom-=40%' : 'top bottom-=20%', end: 'top top', scrub: true },
        })
        .fromTo(backdrop, { opacity: 1 }, { opacity: 0 }, 0)
        .fromTo(backdrop, { filter: 'brightness(1)' }, { filter: 'brightness(0.2)', duration: 20 }, 80)
        .fromTo($('halo'), { opacity: 1 }, { opacity: 0, duration: 20 }, 80)

      const glow = (from, to, start, end) =>
        gsap.fromTo('[data-scroll="glow"]', { '--return': from }, { '--return': to, ease: 'none', immediateRender: false, scrollTrigger: { trigger: cards, start, end, scrub: true } })
      glow(0, 1, 'top bottom+=25%', 'top bottom')
      glow(1, 0, 'bottom center-=40%', '+=20%')
    })

    return () => {
      cancelAnimationFrame(frame)
      video.removeEventListener('loadedmetadata', seek)
    }
  })
}
