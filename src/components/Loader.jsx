import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import loaderLogo from '../assets/icons/loader-logo.svg'

gsap.registerPlugin(useGSAP)

// Full-screen loader: the R* outline with a light sweeping across it.
// Stays up until every image matching `images` has decoded and the fonts are ready,
// then finishes the current sweep and fades out. Calls onExit as the exit starts
// (the hero intro plays underneath it) and onDone once it's gone.
function Loader({ images, onExit, onDone }) {
  const root = useRef(null)
  const logo = useRef(null)
  const shine = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    const imgs = [...document.querySelectorAll(images)]

    Promise.all([
      document.fonts.ready,
      ...imgs.map((img) => img.decode().catch(() => {})), // a broken image shouldn't block forever
    ]).then(() => {
      if (cancelled) return
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reducedMotion || !shine.current) return setReady(true)
      // Let the light finish its pass rather than cutting it off
      shine.current.addEventListener('animationiteration', () => setReady(true), { once: true })
    })

    return () => {
      cancelled = true
    }
  }, [images])

  // Exit, timed against the live site: the logo fades, then the backdrop fades
  // while the hero intro is already playing behind it
  useGSAP(
    () => {
      if (!ready) return
      onExit?.()
      gsap
        .timeline({ onComplete: onDone })
        .to(logo.current, { autoAlpha: 0, duration: 1.17, ease: 'sine.inOut' })
        .to(root.current, { autoAlpha: 0, duration: 1.32, ease: 'sine.inOut' }, 1.12)
    },
    { dependencies: [ready], scope: root },
  )

  return (
    <div
      ref={root}
      data-loading
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-loader"
    >
      <div ref={logo} className="relative isolate size-[24vw] md:size-[calc(var(--u)*6)]">
        {/* Dim outline with a soft purple glow, pulsing */}
        <div
          className="absolute inset-0 bg-cover bg-center drop-shadow-[0_0_1vw_#38365d] motion-safe:animate-loader-glow md:drop-shadow-[0_0_calc(var(--u)*0.25)_#38365d]"
          style={{ backgroundImage: `url("${loaderLogo}")` }}
        />
        {/* Fill clipped to the outline; the light travels inside it */}
        <div
          className="relative size-full overflow-hidden bg-[#1f1f38] motion-safe:animate-loader-fill"
          style={{ maskImage: `url("${loaderLogo}")`, maskSize: 'cover' }}
        >
          <span
            ref={shine}
            className="absolute top-[-40%] left-[-40%] h-3/5 w-1/4 bg-linear-[232deg] from-[#ffb2c6] from-20% to-[#988bd0] to-70% blur-[5px] transform-[skew(-45deg,45deg)] motion-safe:animate-loader-shine"
          />
        </div>
      </div>
    </div>
  )
}

export default Loader
