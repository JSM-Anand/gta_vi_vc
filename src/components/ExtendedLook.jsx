import { useEffect, useRef, useState } from 'react'
import scene from '../assets/section02/section02.avif'
// Matched by picture, as on the live site: the first card ("Trailer 2", blue) is the dock scene in
// trailer01.avif; the second ("Trailer 1", pink) is the couple on the car in trailer02.avif
import trailer2Art from '../assets/section02/trailer01.avif'
import trailer1Art from '../assets/section02/trailer02.avif'

// "An Extended Look", measured on rockstargames.com/VI. A pinned scene (image, title, play button)
// sits under the hero; after a 2.7-screen pin the trailer cards scroll up over it.
// The scroll animation lives in animations/extendedLook.js and targets the data-xl attributes.
// From md up, sizes are multiples of --u (defined in index.css); phones use vw like the live site.

const CARDS = [
  { title: 'Trailer 2', art: trailer2Art, bg: '#2c3868', watch: '#d9f3fe' },
  { title: 'Trailer 1', art: trailer1Art, bg: '#4b2f54', watch: '#fee8ea' },
]

// Solid disc with the play triangle cut out, copied from the live site
function PlayIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="currentColor" aria-hidden="true" className="size-full">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40ZM16.8988 14.426C16.7193 14.3106 16.4911 14.3024 16.3038 14.4047C16.1165 14.5069 16 14.7033 16 14.9167V25.4167C16 25.6301 16.1165 25.8264 16.3038 25.9287C16.4911 26.0309 16.7193 26.0227 16.8988 25.9074L25.0654 20.6574C25.2324 20.55 25.3333 20.3652 25.3333 20.1667C25.3333 19.9682 25.2324 19.7833 25.0654 19.676L16.8988 14.426Z"
      />
    </svg>
  )
}

function TrailerCard({ title, art, bg, watch }) {
  return (
    <button
      type="button"
      data-xl="card"
      data-glow
      className="group relative flex aspect-[332/434] w-[85vw] flex-none cursor-pointer snap-start items-end justify-center overflow-hidden rounded-[3vw] text-center outline-4 outline-offset-4 outline-transparent transition-[outline-color] duration-150 ease-out focus-visible:outline-white md:aspect-[522/657] md:w-auto md:flex-1 md:rounded-[calc(var(--u)*1.75)]"
      style={{ backgroundColor: bg }}
    >
      {/* Artwork: faded towards the text, brightens on hover, drifts with scroll */}
      <img
        src={art}
        alt=""
        data-xl="card-art"
        className="absolute inset-0 size-full object-cover object-top opacity-80 transition-opacity duration-1000 ease-out [mask-image:linear-gradient(#000_0%,#000_42.5vw,rgb(0_0_0/0.44)_85vw,rgb(0_0_0/0.1)_100%)] group-hover:opacity-100 md:[mask-image:linear-gradient(0deg,rgb(0_0_0/0.2)_0%,rgb(0_0_0/0.56)_25.57%,rgb(0_0_0/0.9)_59.99%)]"
      />
      <span className="absolute top-1/2 left-1/2 z-[3] size-[16vw] -translate-1/2 rounded-full bg-[rgb(17_17_23/0.4)] text-white transition-transform duration-500 ease-out group-hover:scale-105 md:size-[calc(var(--u)*5.75)]">
        <PlayIcon />
      </span>
      <span className="relative z-[2] flex flex-col items-center gap-[2vw] px-[8vw] pb-[8vw] font-condensed font-bold uppercase md:gap-[calc(var(--u)*0.75)] md:px-[calc(var(--u)*3.25)] md:pb-[calc(var(--u)*3.25)]">
        <q className="text-[4vw] leading-[1.4] tracking-[0.0175em] [quotes:none] md:text-[calc(var(--u)*1.25)] md:leading-[1.1]" style={{ color: watch }}>
          Watch
        </q>
        <span className="text-[12vw] leading-[0.9] text-cream md:text-[calc(var(--u)*4.5)]">{title}</span>
      </span>
    </button>
  )
}

function ExtendedLook() {
  const track = useRef(null)
  const [active, setActive] = useState(0)

  // Phone carousel: highlight the dot of the card that's mostly in view
  useEffect(() => {
    const cards = [...track.current.children]
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(cards.indexOf(e.target))),
      { root: track.current, threshold: 0.6 },
    )
    cards.forEach((c) => io.observe(c))
    return () => io.disconnect()
  }, [])

  return (
    // Starts 35% of a screen down the page, underneath the pinned hero
    <section id="extended-look" aria-labelledby="extended-look-title" className="relative mt-[-65vh]">
      {/* Pinned scene */}
      <div data-xl="scene" className="relative h-dvh overflow-hidden">
        <div data-xl="image" className="absolute inset-0 overflow-hidden [filter:brightness(var(--brightness,1))]">
          <img
            data-xl="image-zoom"
            src={scene}
            alt="Jason and Lucia pulling up their bandanas outside a gas station at dusk"
            className="size-full object-cover object-[50%_15%]"
          />
        </div>

        <div
          data-xl="content"
          className="absolute inset-0 z-[1] flex flex-col items-center justify-between px-[4vw] pt-[20vw] pb-[8vw] md:px-[calc(var(--u)*13)] md:pt-[calc(var(--u)*4)] md:pb-[calc(var(--u)*2)]"
        >
          <div data-xl="title" className="flex h-[37.2vw] flex-col items-center justify-center gap-[3vw] text-center font-bold uppercase md:h-auto md:gap-(--u)">
            <h2
              id="extended-look-title"
              className="text-[7vw] leading-none tracking-[0.15em] text-shadow-[0_0_32px_rgb(255_255_255/0.3)] md:text-[calc(var(--u)*4)] md:leading-[1.1]"
            >
              An Extended Look
            </h2>
            <p className="text-[4.5vw] leading-[1.3] tracking-[0.05em] text-[#fdfbff] md:text-[calc(var(--u)*1.5)]">Now Playing</p>
          </div>

          <button
            type="button"
            data-xl="play"
            data-glow
            aria-label="Play the extended look"
            className="absolute top-1/2 left-1/2 size-[21.6vw] -translate-1/2 cursor-pointer rounded-full bg-[rgb(17_17_23/0.4)] text-white transition-transform duration-500 ease-out hover:scale-105 md:size-[calc(var(--u)*7)]"
          >
            <PlayIcon />
          </button>
        </div>
      </div>

      {/* Keeps the scene pinned for 2.7 screens before the cards arrive */}
      <div aria-hidden="true" className="h-[170vh]" />

      {/* Trailer cards: a row on desktop, a swipeable carousel on phones */}
      <div className="relative z-[1] py-[20vw] md:px-[calc(var(--u)*13)] md:py-[calc(var(--u)*8)]">
        <div
          ref={track}
          className="flex snap-x snap-mandatory scroll-px-[7.5vw] gap-[3vw] overflow-x-auto px-[7.5vw] [scrollbar-width:none] md:gap-[calc(var(--u)*1.5625)] md:overflow-visible md:px-0"
        >
          {CARDS.map((card) => (
            <TrailerCard key={card.title} {...card} />
          ))}
        </div>

        <div aria-hidden="true" className="mt-[8vw] flex justify-center md:hidden">
          <div className="flex h-[12vw] items-center gap-[3vw] rounded-full bg-white/5 px-[6vw]">
            {CARDS.map((card, i) => (
              <span key={card.title} className={`size-2 rounded-full transition-colors ${i === active ? 'bg-white' : 'bg-white/20'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExtendedLook
