import { useEffect, useRef } from 'react'
import posterDesktop from '../assets/images/desktop.0iky3x6.hl8fo.avif'
import posterMobile from '../assets/images/mobile.0xsc-b1pnezup.avif'
import ultimateArt from '../assets/images/ultimate_desktop_en_us.0~shc~hnjifzu.avif'
import ultimateMobileArt from '../assets/images/ultimate_mobile_en_us.03~7e7tlo4k4r.avif'
import vintageArt from '../assets/images/VINTAGE_VICE_CITY_PACK_01.05zaof7o1uz.3.avif'
import { AI_ART } from '../aiArt'
import ArrowIcon from './ArrowIcon'

// "Ultimate Edition", between the trailer cards and "Vice City, USA.", measured on rockstargames.com/VI.
// A full-screen shot of Jason and Lucia by the car, scrubbed by scroll, fades in under the trailer
// cards and stays pinned; two promo cards then scroll up over it as it fades away.
// The backdrop animation lives in animations/ultimateEdition.js (data-ue attributes); the cards share
// the feature cards' scroll and pointer animation (animations/features.js, data-feature attributes),
// as they do on the live site. From md up, sizes are multiples of --u; phones use vw.
// The /ai route swaps in our own artwork (see aiArt.js): a still backdrop instead of the footage, and
// the Ultimate Edition box art built from the hero's AI poster.

// Rockstar's footage (10s, a keyframe every 4 frames, so it seeks quickly). The files and the
// window sizes that pick them are the live site's; the two smallest are portrait crops for phones.
const VIDEOS = [
  { src: '/videos/ultimate-edition/450.mp4', media: '(max-width: 450.98px) and (orientation: portrait)' },
  { src: '/videos/ultimate-edition/768.mp4', media: '(max-width: 767.98px) and (orientation: portrait)' },
  { src: '/videos/ultimate-edition/1280.mp4', media: '(max-width: 1280.98px)' },
  { src: '/videos/ultimate-edition/1920.mp4', media: '(max-width: 1920.98px)' },
  { src: '/videos/ultimate-edition/2160.mp4', media: 'all' },
]

// Hover colours and glow are the live site's theme values for each card
const CARDS = [
  {
    title: 'Ultimate Edition',
    body: 'An exclusive collection of items threaded across all aspects of Jason and Lucia’s story.',
    ultimate: true,
    art: ultimateArt,
    mobileArt: ultimateMobileArt,
    ai: { art: AI_ART.ultimate, mobileArt: AI_ART.ultimateMobile, box: AI_ART.ultimateBox },
    colors: { bg: '#4b2f54', button: '#ffd4a8', buttonHover: '#ffc080', buttonText: '#0f0c1a', glow: '#583660' },
  },
  {
    eyebrow: 'Pre-order Bonuses',
    title: (
      <>
        Vintage
        <br />
        Vice City Pack
      </>
    ),
    body: 'Pre-order to get unique benefits that flash back to when the neon burned brightest.',
    art: vintageArt,
    ai: { art: AI_ART.vintage, mobileArt: AI_ART.vintageMobile },
    colors: { bg: '#243152', eyebrow: '#b8f0ea', button: '#e6ffa3', buttonHover: '#e1fa9e', buttonText: '#0d0c1a', glow: '#273c5c' },
  },
]

// The Ultimate Edition card is a feature card with the text centred on the right (37:20, the box art's
// own ratio, with no fade: the art is composed for it). On phones it's a square of artwork over the
// text. The Vintage card is a 5:2 feature card with the text bottom right and the pointer-tracked fade.

// The /ai Ultimate Edition box art: the hero's square AI poster in the frame and under the label of
// Rockstar's, at the same place on the backdrop (measured on their 3840×2076 and 1080×1990 artwork,
// in fractions of the backdrop; the frame and label are fractions of the box, cqw).
function BoxArt({ src }) {
  return (
    <span className="@container absolute top-[10.3%] left-[13.33%] aspect-square w-[73.33%] md:top-[15.75%] md:left-[13.72%] md:w-[39.56%]">
      <span className="absolute inset-0 bg-[linear-gradient(#554da1,#f67e8c)] p-[0.66cqw]">
        <span className="block size-full bg-[#1f002c] p-[2.37cqw]">
          <img src={src} alt="" className="size-full" />
        </span>
      </span>
      {/* Letters spread across the box, cap tops 6.9% of the box above it, caps 2.9% tall */}
      <span className="absolute inset-x-[1cqw] top-[-6.9cqw] flex justify-between font-sans text-[4.1cqw] leading-none text-[#9b9dca] [text-box:trim-both_cap_alphabetic]">
        {[...'ULTIMATE EDITION'].map((letter, i) => (
          <span key={i}>{letter}</span>
        ))}
      </span>
    </span>
  )
}

function PromoCard({ eyebrow, title, body, ultimate, art, mobileArt, box, colors }) {
  return (
    <button
      type="button"
      data-feature="card"
      data-glow
      className={`group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-[3vw] text-left outline-4 outline-offset-4 outline-transparent transition-[outline-color] duration-150 ease-out [--mx:-5%] [--my:140%] before:block focus-visible:outline-white md:flex-row md:justify-end md:rounded-[calc(var(--u)*1.75)] md:p-[calc(var(--u)*3.25)] md:before:hidden ${ultimate ? 'before:aspect-square md:aspect-[37/20] md:items-center' : 'before:aspect-[3/2] md:aspect-[5/2] md:items-end'}`}
      style={{ backgroundColor: colors.bg, '--button': colors.button, '--button-hover': colors.buttonHover, '--glow': colors.glow }}
    >
      {/* Artwork: brightens on hover, drifts with scroll. Only the Vintage photo is faded towards the
          text (on desktop from the text's corner, following the pointer). */}
      <span
        data-feature="art"
        aria-hidden="true"
        className={`absolute inset-0 z-1 opacity-80 transition-opacity duration-1000 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 ${ultimate ? '' : '[mask-image:linear-gradient(#000_0%,#000_28.333vw,rgb(0_0_0/0.44)_56.667vw,rgb(0_0_0/0.1)_100%)] md:[mask-image:radial-gradient(100%_200%_at_calc(100%+var(--mx))_var(--my),rgb(0_0_0/0.28)_0%,rgb(0_0_0/0.48)_52%,#000_87%)]'}`}
      >
        {/* With box art laid on top, the backdrop keeps its own shape on phones so the box lands on it */}
        <span className={`absolute inset-0 ${box ? 'bottom-auto aspect-[1080/1990] md:bottom-0 md:aspect-auto' : ''}`}>
          <picture>
            {mobileArt && <source media="(min-width: 768px)" srcSet={art} />}
            <img
              src={mobileArt ?? art}
              alt=""
              className={`absolute inset-0 size-full object-cover ${ultimate ? 'object-top md:object-center' : 'object-[26%_0%] md:object-top'}`}
            />
          </picture>
          {box && <BoxArt src={box} />}
        </span>
      </span>

      <span className={`relative z-2 flex flex-col gap-[2vw] px-[8vw] pb-[8vw] transition-[filter] duration-1000 ease-out group-hover:[filter:drop-shadow(0_0_10px_#fff3)_drop-shadow(0_20px_70px_var(--glow))] group-focus-visible:[filter:drop-shadow(0_0_10px_#fff3)_drop-shadow(0_20px_70px_var(--glow))] md:w-[calc(var(--u)*23)] md:p-0 ${ultimate ? 'md:gap-[calc(var(--u)*0.75)]' : 'md:gap-[calc(var(--u)*0.5)]'}`}>
        {eyebrow && (
          <q className="font-condensed text-[4vw] leading-[1.4] font-bold tracking-[0.02em] uppercase [quotes:none] md:text-[calc(var(--u)*1.125)] md:leading-[1.3]" style={{ color: colors.eyebrow }}>
            {eyebrow}
          </q>
        )}
        <span className={`font-condensed leading-[0.9] font-bold text-balance text-cream uppercase ${ultimate ? 'text-[11vw] md:text-[calc(var(--u)*4.25)]' : 'text-[9vw] md:text-[calc(var(--u)*3.5)]'}`}>
          {title}
        </span>
        <span className={`text-[4vw] leading-[1.2] font-medium tracking-[-0.015em] text-balance text-white ${ultimate ? 'md:text-[calc(var(--u)*1.125)] md:leading-[1.3]' : 'md:text-(length:--u) md:leading-[1.4]'}`}>
          {body}
        </span>
        <span className="mt-[2.5vw] flex h-[10vw] w-fit items-center gap-[1.5vw] rounded-full bg-(--button) pr-[4vw] pl-[5vw] text-[3.5vw] leading-[1.5] font-medium tracking-[-0.015em] transition-[background-color] duration-1000 ease-out group-hover:bg-(--button-hover) group-focus-visible:bg-(--button-hover) md:mt-[calc(var(--u)*0.75)] md:h-[calc(var(--u)*3)] md:gap-[calc(var(--u)*0.5)] md:pr-[calc(var(--u)*1.125)] md:pl-[calc(var(--u)*1.5)] md:text-(length:--u) md:leading-none" style={{ color: colors.buttonText }}>
          Learn More
          <ArrowIcon />
        </span>
      </span>
    </button>
  )
}

// `ai` (the /ai route) swaps Rockstar's artwork for our own
function UltimateEdition({ ai }) {
  const section = useRef(null)
  const video = useRef(null)

  // Load the video when the section is within two screens. As on the live site (and in ViceCity.jsx),
  // desktop downloads the whole file first so every seek is served from memory; phones stream it.
  // The /ai route has no footage of its own, so it shows the still.
  useEffect(() => {
    if (ai) return
    const mobile = window.matchMedia('(max-width: 767px)').matches
    const { src } = VIDEOS.find(({ media }) => window.matchMedia(media).matches)
    const controller = new AbortController()
    let objectUrl

    const load = async () => {
      try {
        if (mobile) {
          video.current.src = src
        } else {
          const res = await fetch(src, { signal: controller.signal })
          objectUrl = URL.createObjectURL(await res.blob())
          video.current.src = objectUrl
        }
      } catch {
        if (!controller.signal.aborted) video.current.src = src // fall back to streaming
      }
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        load()
      },
      { rootMargin: '200% 0px' },
    )
    io.observe(section.current)

    return () => {
      io.disconnect()
      controller.abort()
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [ai])

  return (
    // overflow-x-clip: the glow behind the cards is twice the window's width
    <section ref={section} id="ultimate-edition" aria-label="Ultimate Edition and pre-order bonuses" className="overflow-x-clip">
      {/* Backdrop: 1.35 screens tall, starting 0.65 screens up under the trailer cards; one screen
          of footage at the top, pinned until the cards reach the top of the screen */}
      <div data-ue="backdrop" className="invisible relative -z-1 mt-[-65lvh] h-[135lvh] opacity-0 brightness-20">
        <div className="relative h-screen w-screen overflow-hidden">
          {/* On /ai the still takes the video's place (data-ue="video"), so it still gets the zoom */}
          <picture>
            <source media="(min-width: 768px)" srcSet={ai ? AI_ART.backdrop : posterDesktop} />
            <img
              src={ai ? AI_ART.backdropMobile : posterMobile}
              alt=""
              data-ue={ai ? 'video' : undefined}
              className="absolute inset-0 size-full object-cover [@media(min-aspect-ratio:9/4)]:object-[50%_25%]"
            />
          </picture>
          {!ai && (
            <video
              ref={video}
              data-ue="video"
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
              className="relative size-full object-cover [@media(min-aspect-ratio:9/4)]:object-[50%_25%]"
            />
          )}
        </div>
      </div>

      {/* Cards. They start 1.35 screens below the section on phones; from md the live site's grid puts
          them 12u higher than a screen further down. The flow above takes 0.7 screens (1.35 − 0.65). */}
      <div className="relative mt-[65lvh] md:mt-[calc(165lvh-var(--u)*12)]">
        {/* Soft navy glow behind the cards, faded out as they reach the top */}
        <div
          data-ue="halo"
          aria-hidden="true"
          className="pointer-events-none absolute top-[-10%] left-1/2 -z-1 h-[200svh] w-[200vw] -translate-x-1/2 -translate-y-[5%] rounded-[1000px] bg-[radial-gradient(100%_50%_at_50%_50%,#18182d_0%,transparent_90%)] md:h-[100vmax] md:translate-y-0"
        />
        <div
          data-ue="cards"
          className="flex flex-col gap-[8vw] px-[7.5vw] pb-[20vw] md:gap-[calc(var(--u)*2)] md:pb-[calc(var(--u)*8)] lg:px-[10vw] hd:px-[13vw] fhd:px-[min(16vw,409.6px)]"
        >
          {CARDS.map(({ ai: aiArt, ...card }) => (
            <PromoCard key={card.body} {...card} {...(ai ? aiArt : {})} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default UltimateEdition
