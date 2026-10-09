import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

// Soft navy glow behind the page that trails the cursor, as on rockstargames.com/VI.
// It rests at half strength; over anything marked data-glow it moves to that element's
// centre at full strength. On touch screens it stays in the top-left corner.
// The outer layer is faded on scroll by animations/heroScroll.js (--scroll-fade); hovering an
// element overrides that fade (--hover), as on the live site.
function CursorGlow() {
  const glow = useRef(null)

  useGSAP(() => {
    gsap.set(glow.current, { xPercent: -50, yPercent: -50 }) // centre it on (x, y)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Timings measured on the live site: it trails the cursor slowly, but snaps to elements quickly
    const move = (x, y, duration) =>
      gsap.to(glow.current, { x, y, duration, ease: 'power1.inOut', overwrite: 'auto' })
    const fade = (opacity) => {
      gsap.to(glow.current, { opacity, duration: 0.4, ease: 'power1.inOut', overwrite: 'auto' })
      gsap.to(glow.current.parentElement, { '--hover': opacity === 1 ? 1 : 0, duration: 0.4, ease: 'power1.inOut', overwrite: 'auto' })
    }
    let target = null // the data-glow element under the cursor, if any

    const onMove = (e) => {
      if (target || e.pointerType !== 'mouse') return
      move(e.clientX, e.clientY, 0.8)
    }
    const onOver = (e) => {
      if (e.pointerType !== 'mouse') return
      const el = e.target.closest('[data-glow]')
      if (el === target) return
      target = el
      if (el) {
        const r = el.getBoundingClientRect()
        move(r.left + r.width / 2, r.top + r.height / 2, 0.4)
        fade(1)
      } else {
        move(e.clientX, e.clientY, 0.4)
        fade(0.5)
      }
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerover', onOver)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
    }
  })

  return (
    <div data-scroll="glow" aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 [opacity:max(var(--scroll-fade,1),var(--hover,0))]">
      {/* Centred on (x, y): 1.5x the larger side of the window, so it always reaches the far corner */}
      <div
        ref={glow}
        className="absolute top-0 left-0 size-[max(150vw,150vh)] rounded-full bg-[radial-gradient(50%_50%,var(--color-glow),transparent)] opacity-50"
      />
    </div>
  )
}

export default CursorGlow
