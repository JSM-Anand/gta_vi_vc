import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { HERO_IMAGES } from '../heroImages'
import { PS5Logo, XboxSeriesLogo } from './PlatformLogos'

gsap.registerPlugin(useGSAP)

const MOBILE = '(max-width: 767px)'

// Full-size layer of the poster: every image is a full canvas with its piece already in place
function Art({ src, alt = '', className = '', ...props }) {
  return (
    <picture>
      <source media={MOBILE} srcSet={src.mobile} />
      <img src={src.desktop} alt={alt} className={`absolute inset-0 size-full object-cover ${className}`} {...props} />
    </picture>
  )
}

// Pre-Order button states, measured on the live site. Shadows list the dark layer first so
// GSAP can tween between them (both layers exist in every state).
const PULSE_LOW = {
  backgroundColor: '#ffb4c7',
  color: '#342d50',
  boxShadow: 'rgba(53,24,32,0) 0px 0px 28px 0px, rgba(255,178,199,0.19) 0px 2px 53px 0px',
}
const PULSE_HIGH = {
  backgroundColor: '#fed2e0',
  color: '#623a55',
  boxShadow: 'rgba(53,24,32,0) 0px 0px 28px 0px, rgba(255,178,199,0.41) 0px 2px 72px 0px',
}
const HOVER = {
  backgroundColor: '#fdfbff',
  color: '#9c4958',
  boxShadow: 'rgba(53,24,32,0.32) 0px 0px 28px 0px, rgba(255,178,198,0.4) 0px 0px 110px 0px',
}

// Scroll hint at the bottom of the hero. Sized from max(5vw, 10vh) like the live site.
function ScrollArrow() {
  return (
    <svg
      viewBox="0 0 34 14"
      fill="currentColor"
      aria-hidden="true"
      className="block h-[calc(var(--x)*0.45)] w-[min(calc(var(--x)*0.45),2.1rem)] text-[#ffb2c6] [--x:max(5vw,10vh)] [filter:drop-shadow(0_0_calc(var(--x)*0.025)_#ffb0c480)_drop-shadow(0_0_calc(var(--x)*0.1)_#000)] motion-safe:animate-arrow-pulse"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M33.5609 1.54346C34.0381 2.5875 33.6881 3.87821 32.7791 4.42633L17.0387 13.9181L1.48663 4.42115C0.580153 3.86761 0.235986 2.57483 0.717909 1.53365C1.19983 0.492464 2.32535 0.097152 3.23182 0.650692L17.0497 9.08858L31.051 0.64551C31.96 0.0973872 33.0837 0.499411 33.5609 1.54346Z"
      />
    </svg>
  )
}

// From md up, sizes are multiples of --u (defined in index.css).
// The intro (animations/heroIntro.js) draws on the canvas and targets the data-intro attributes;
// the scroll effect (animations/heroScroll.js) pins the section, shrinks the content layer and
// fades it through --hero-fade (a filter, so it doesn't fight the intro's opacity tweens).
function Hero({ images = HERO_IMAGES.original }) {
  const button = useRef(null)
  const art = (name) => ({ desktop: images.desktop[name], mobile: images.mobile[name] })
  const SHARDS = Array.from({ length: 9 }, (_, i) => art(`shard-0${i + 1}`))
  const FILLER = art('shard-10')

  // Pre-Order button: a slow colour pulse, interrupted by a hover/focus state
  useGSAP(() => {
    const el = button.current
    gsap.set(el, PULSE_LOW)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const pulse = gsap.to(el, { ...PULSE_HIGH, duration: 1.73, ease: 'sine.inOut', repeat: -1, yoyo: true })
    let hover
    const enter = () => {
      pulse.pause()
      hover?.kill()
      hover = gsap.to(el, { ...HOVER, duration: 0.4, ease: 'power1.inOut' })
    }
    const leave = () => {
      hover?.kill()
      hover = gsap.to(el, { ...PULSE_LOW, duration: 0.4, ease: 'power1.inOut', onComplete: () => pulse.restart() })
    }
    el.addEventListener('pointerenter', enter)
    el.addEventListener('pointerleave', leave)
    el.addEventListener('focus', enter)
    el.addEventListener('blur', leave)
    return () => {
      el.removeEventListener('pointerenter', enter)
      el.removeEventListener('pointerleave', leave)
      el.removeEventListener('focus', enter)
      el.removeEventListener('blur', leave)
    }
  })

  return (
    <section id="hero" className="relative z-[1] overflow-clip">
      <h1 className="sr-only">Grand Theft Auto VI</h1>

      <div
        data-scroll="content"
        className="relative flex min-h-dvh items-center justify-center py-[8vw] md:py-[calc(var(--u)*3)]"
      >
        {/* Intro is drawn here; it covers the whole hero so the zoomed-in pieces can overflow the poster */}
        <canvas data-intro="canvas" aria-hidden="true" className="pointer-events-none absolute inset-0 size-full" />

        <div className="relative grid w-[85vw] grid-cols-1 justify-items-center md:w-[min(80vw,120vh)] md:grid-cols-3 md:items-center md:gap-y-[calc(var(--u)*2)] hd:w-[min(74vw,120vh)]">
          {/* Poster. On phones it is square and capped by height so the whole stack fits on screen. */}
          <div
            data-intro="box"
            className="relative order-2 mt-[6vw] aspect-square w-[min(85vw,41svh)] md:order-0 md:col-span-3 md:mt-0 md:aspect-video md:w-full"
          >
            {/* Images the intro draws, in draw order. Never shown, only loaded. */}
            <div hidden>
              {SHARDS.map((src, i) => (
                <div key={i} data-intro-src="shard">
                  <Art src={src} />
                </div>
              ))}
              <div data-intro-src="filler">
                <Art src={FILLER} />
              </div>
              <div data-intro-src="vi">
                <Art src={art('logo-vi')} />
              </div>
              <div data-intro-src="gta">
                <Art src={art('logo-gta')} />
              </div>
            </div>

            {/* Static poster: the logo layer sits exactly over the logo baked into the poster */}
            <div data-intro="poster" className="absolute inset-0">
              <Art src={art('poster')} alt="Grand Theft Auto VI key art" fetchPriority="high" className="[filter:opacity(var(--hero-fade,1))]" />
              <Art src={art('poster-logo')} data-scroll="poster-logo" />
            </div>
          </div>

          <p
            data-intro="text"
            className="order-1 [filter:opacity(var(--hero-fade,1))] text-center text-[6vw] leading-none tracking-[-0.01em] uppercase text-shadow-[0_0_28px_rgb(230_220_255/0.25)] md:order-0 md:justify-self-start md:px-[calc(var(--u)*0.625)] md:text-left md:text-[calc(var(--u)*1.5)] md:leading-[1.2]"
          >
            Coming
            <br />
            November 19, 2026
          </p>

          <button
            type="button"
            ref={button}
            data-intro="button"
            data-glow
            className="order-4 mt-[4.5vw] [filter:opacity(var(--hero-fade,1))] flex h-[12vw] cursor-pointer items-center rounded-full bg-pink px-[6vw] text-[4vw] leading-none tracking-[-0.015em] text-plum shadow-[0_2px_53px_rgb(255_178_199/0.19)] outline-offset-4 focus-visible:outline-2 focus-visible:outline-pink md:order-0 md:mt-0 md:h-[calc(var(--u)*3.5)] md:px-[calc(var(--u)*1.75)] md:text-[calc(var(--u)*1.125)]"
          >
            Pre-Order Now
          </button>

          <div
            data-intro="text"
            className="order-3 mt-[9.5vw] [filter:opacity(var(--hero-fade,1))] flex items-center gap-x-[6vw] md:order-0 md:mt-0 md:flex-col md:items-end md:gap-y-[calc(var(--u)*0.75)] md:justify-self-end md:px-[calc(var(--u)*0.625)]"
          >
            <span className="sr-only">Available on PlayStation 5 and Xbox Series X|S</span>
            <PS5Logo className="h-[4.5vw] md:h-[calc(var(--u)*1.25)]" />
            <XboxSeriesLogo className="h-[4.5vw] md:h-[calc(var(--u)*1.25)]" />
          </div>
        </div>

        {/* Scroll hint: dismissed for good once the page is scrolled */}
        <div data-intro="text" className="absolute inset-x-0 bottom-0 flex justify-center">
          <div data-scroll="arrow">
            <ScrollArrow />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
