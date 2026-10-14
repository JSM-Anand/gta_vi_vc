import { useEffect, useRef } from 'react'

// "Vice City, USA.", measured on rockstargames.com/VI. A full-screen flight over the city, scrubbed
// by scroll, sits under the trailer cards; the text then scrolls up over it as it fades away.
// The scroll animation lives in animations/viceCity.js and targets the data-city attributes.

// The footage is hosted on Cloudinary. The source is 4K and slowed down, which is far more than
// scrubbing needs, so the delivered version is resized, sped up 4x (same footage, a quarter of the
// frames) and re-encoded with a keyframe every 0.5s so seeking to any scroll position stays quick.
const CLOUD = 'https://res.cloudinary.com/dtwvlmxqc/video/upload'
const VIDEO = 'v1791948027/gta_city'
const videoSrc = (width) => `${CLOUD}/e_accelerate:100/e_accelerate:100/w_${width},q_auto,vc_h264,ki_0.5/${VIDEO}.mp4`
const poster = (width) => `${CLOUD}/so_0,w_${width},q_auto,f_auto/${VIDEO}.jpg`

function ViceCity() {
  const section = useRef(null)
  const video = useRef(null)

  // Load the video when the section is within two screens. On desktop it's downloaded whole first,
  // as on the live site, so every seek is served from memory; phones stream a smaller file (720p,
  // since the tall crop shows only the middle of the frame, enlarged).
  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 767px)').matches
    const src = videoSrc(mobile ? 1280 : 1920)
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
  }, [])

  return (
    // Starts 1.5 screens up, under the trailer cards. Two rows hold the backdrop (one screen tall);
    // the text sits 2.5 screens below the second, so it reaches the top just as the pin ends.
    <section
      ref={section}
      id="vice-city"
      aria-labelledby="vice-city-title"
      className="mt-[-150lvh] grid grid-rows-[calc(100lvh-var(--title)*1.1-var(--title-gap))_calc(var(--title)*1.1+var(--title-gap))_min-content] [--body:5vw] [--title-gap:6vw] [--title:10vw] md:pb-[calc(var(--u)*4)] md:[--body:calc(var(--u)*2.5)] md:[--title-gap:calc(var(--u)*1.5)] md:[--title:calc(var(--u)*4.5)]"
    >
      {/* Backdrop: pinned, fades in, zooms and plays the flight as you scroll */}
      <div data-city="backdrop" className="relative -z-1 col-start-1 row-span-2 row-start-1 invisible opacity-0">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={poster(1920)}
            srcSet={`${poster(768)} 768w, ${poster(1920)} 1920w`}
            sizes="100vw"
            alt=""
            className="absolute inset-0 size-full object-cover"
          />
          <video
            ref={video}
            data-city="video"
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            className="relative size-full object-cover"
          />
        </div>
      </div>

      {/* Text, filled with a gradient that warms up and then cools as it passes */}
      <div
        data-city="text"
        className="col-start-1 row-span-2 row-start-2 mt-[250lvh] flex flex-col gap-[calc(var(--body)/1.5)] bg-[linear-gradient(0deg,#fec497_10%,#e9639b_100%)] bg-clip-text px-[7.5vw] text-transparent brightness-80 lg:px-[10vw] hd:px-[13vw] fhd:px-[min(16vw,409.6px)]"
      >
        <h2
          id="vice-city-title"
          className="text-(length:--title) leading-[1.1] font-bold tracking-[-0.02em]"
        >
          Vice City, USA.
        </h2>
        <p className="text-(length:--body) leading-[1.1] font-medium tracking-[-0.0125em]">
          Jason and Lucia have always known the deck is stacked against them. But when an easy score goes
          wrong, they find themselves on the darkest side of the sunniest place in America, in the middle of a
          criminal conspiracy stretching across the state of Leonida — forced to rely on each other more than
          ever if they want to make it out alive.
        </p>
      </div>
    </section>
  )
}

export default ViceCity
