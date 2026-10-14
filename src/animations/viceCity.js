import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// "Vice City, USA." scroll animation, taken from rockstargames.com/VI. The section starts 1.5 screens
// up, so the backdrop is pinned while the trailer cards are still scrolling away. From the top of the
// section until the text reaches the top of the screen:
//   - the backdrop is pinned, the flight plays from first frame to last and the footage zooms 1 → 1.1
//   - the backdrop fades in over the first 1.5 screens (1 on phones), easing in
//   - as the text approaches, a radial mask closes the backdrop from the bottom and it fades out
// The text's gradient warms up as it scrolls into view, then cools to blue as it leaves.
const $ = (name) => `[data-city="${name}"]`

export function useViceCityScroll() {
  useGSAP(() => {
    const video = document.querySelector($('video'))
    const backdrop = $('backdrop')
    const text = $('text')

    // Seek once per frame to wherever the scroll says the flight should be
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
      const pin = { trigger: '#vice-city', start: 'top top', endTrigger: text, end: 'top top' }

      ScrollTrigger.create({ ...pin, pin: backdrop, pinSpacing: false })
      ScrollTrigger.create({
        ...pin,
        onUpdate: (self) => {
          progress = self.progress
          frame ||= requestAnimationFrame(seek)
        },
      })
      if (motion) gsap.fromTo($('video'), { scale: 1 }, { scale: 1.1, ease: 'none', scrollTrigger: { ...pin, scrub: true } })

      gsap.fromTo(
        backdrop,
        { autoAlpha: 0 },
        { autoAlpha: 1, ease: 'power3.in', scrollTrigger: { trigger: '#vice-city', start: 'top top', end: mobile ? '+=100%' : '+=150%', scrub: true } },
      )

      // Offsets in the start are fractions of the text's own height
      gsap
        .timeline({
          defaults: { ease: 'none', immediateRender: false },
          scrollTrigger: { trigger: text, start: mobile ? 'top-=150% bottom' : 'top-=90% bottom', end: 'top top', scrub: true },
        })
        .fromTo(
          backdrop,
          { maskImage: `radial-gradient(${mobile ? '250%' : '150%'} 150% at 50% 50%, rgba(0, 0, 0, 1) 100%, rgba(0, 0, 0, 0.5) 150%)` },
          {
            maskImage: `radial-gradient(${mobile ? '200%' : '100%'} 100% at 50% ${mobile ? '-40%' : '-50%'}, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0.25) 90%)`,
            ease: 'power1.out',
            duration: 1,
          },
          0,
        )
        .to(backdrop, { autoAlpha: 0, duration: 0.5 }, 0.5)

      gsap
        .timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: text, start: 'top bottom', end: 'bottom top', scrub: true } })
        .fromTo(
          text,
          { backgroundImage: 'linear-gradient(0deg, #99743d -10%, #ad4556 90%)', filter: 'brightness(0.8)' },
          { backgroundImage: 'linear-gradient(0deg, #FEC497 10%, #E9639B 100%)', filter: 'brightness(1)', duration: 0.5 },
          0,
        )
        .fromTo(
          text,
          { backgroundImage: 'linear-gradient(0deg, #FEC497 10%, #E9639B 100%)' },
          { backgroundImage: 'linear-gradient(0deg, #99C7FE 30%, #D263E9 110%)', duration: 0.5 },
          0.5,
        )
    })

    return () => {
      cancelAnimationFrame(frame)
      video.removeEventListener('loadedmetadata', seek)
    }
  })
}
