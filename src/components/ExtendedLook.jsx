import { useRef } from 'react'
import { SHOWREEL } from '../content'
import Carousel from './Carousel'

// "Showreel 2026", the live site's "Launch Trailer" (which was "An Extended Look" before launch; the
// names in code and the data-xl attributes still use that), measured on rockstargames.com/VI. A pinned
// scene (image, title, play button) sits under the hero; after a 2.7-screen pin the case study cards
// scroll up over it. The scroll animation lives in animations/extendedLook.js and targets the data-xl
// attributes. From md up, sizes are multiples of --u (defined in index.css); phones use vw like the
// live site.

// Long titles take the live site's smaller "An Extended Look" size (11vw / 4.25u / 2.25u)
const TITLE_SIZE = {
  long: 'text-[11vw] md:text-[calc(var(--u)*4.25)] xl:text-[calc(var(--u)*2.25)]',
  short: 'text-[12vw] md:text-[calc(var(--u)*4.5)] xl:text-[calc(var(--u)*2.5)]',
}

// Card colours, the live site's for its three trailer cards
const COLORS = [
  { bg: '#4b2f54', watch: '#fee8ea' },
  { bg: '#252644', watch: '#e5ddff' },
  { bg: '#2c3868', watch: '#d9f3fe' },
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

// Card height is a square plus the text, as on the live site (a 1:1 ::before above the text block),
// so the longer two-line title makes its card taller; the row stretches the others to match.
// Widths: 85vw on phones, two to a view from md (the third scrolls in), three in a row from xl.
function TrailerCard({ eyebrow, title, long, art, href, bg, watch }) {
  const Tag = href ? 'a' : 'button'
  const link = href ? { href } : { type: 'button' }

  return (
    <Tag
      {...link}
      data-xl="card"
      data-glow
      className="group relative flex w-[85vw] flex-none cursor-pointer snap-start flex-col justify-end overflow-hidden rounded-[3vw] text-center outline-4 outline-offset-4 outline-transparent transition-[outline-color] duration-150 ease-out before:block before:aspect-square focus-visible:outline-white md:w-[calc((100%-var(--gap))/2)] md:rounded-[calc(var(--u)*1.75)] xl:w-[calc((100%-2*var(--gap))/3)] xl:rounded-[calc(var(--u)*0.875)]"
      style={{ backgroundColor: bg }}
    >
      {/* Artwork: faded towards the text, brightens on hover, drifts with scroll */}
      <img
        src={art}
        alt=""
        data-xl="card-art"
        className="absolute inset-0 size-full object-cover object-top opacity-80 transition-opacity duration-1000 ease-out [mask-image:linear-gradient(#000_0%,#000_42.5vw,rgb(0_0_0/0.44)_85vw,rgb(0_0_0/0.1)_100%)] group-hover:opacity-100 md:[mask-image:linear-gradient(0deg,rgb(0_0_0/0.2)_0%,rgb(0_0_0/0.56)_25.57%,rgb(0_0_0/0.9)_59.99%)]"
      />
      <span className="absolute top-1/2 left-1/2 z-[3] size-[16vw] -translate-1/2 rounded-full bg-[rgb(17_17_23/0.4)] text-white transition-transform duration-500 ease-out group-hover:scale-105 md:size-[calc(var(--u)*4)]">
        <PlayIcon />
      </span>
      <span className="relative z-[2] flex flex-col items-center gap-[2vw] px-[8vw] pb-[8vw] font-condensed font-bold uppercase md:gap-[calc(var(--u)*0.75)] md:px-[calc(var(--u)*3.25)] md:pb-[calc(var(--u)*3.25)]">
        <q className="text-[4vw] leading-[1.4] tracking-[0.0175em] [quotes:none] md:text-[calc(var(--u)*1.25)] md:leading-[1.1]" style={{ color: watch }}>
          {eyebrow}
        </q>
        <span className={`leading-[0.9] text-cream ${TITLE_SIZE[long ? 'long' : 'short']}`}>{title}</span>
      </span>
    </Tag>
  )
}

// The reel isn't out yet, so the play button opens a short note instead of a player
function ShowreelDialog({ ref }) {
  const { title, body, close } = SHOWREEL.dialog
  return (
    <dialog
      ref={ref}
      aria-labelledby="showreel-dialog-title"
      closedby="any"
      className="m-auto w-[85vw] max-w-[calc(var(--u)*36)] overflow-hidden rounded-[3vw] bg-[#252644] text-white backdrop:bg-[rgb(12_13_27/0.8)] backdrop:backdrop-blur-sm md:rounded-[calc(var(--u)*1.75)]"
    >
      <img src={SHOWREEL.art} alt="" className="aspect-video w-full object-cover" />
      <div className="flex flex-col items-start gap-[3vw] p-[8vw] md:gap-[calc(var(--u)*0.75)] md:p-[calc(var(--u)*2.5)]">
        <h3 id="showreel-dialog-title" className="font-condensed text-[9vw] leading-[0.9] font-bold text-cream uppercase md:text-[calc(var(--u)*3)]">
          {title}
        </h3>
        <p className="text-[4vw] leading-[1.3] font-medium tracking-[-0.015em] md:text-(length:--u)">{body}</p>
        <form method="dialog">
          <button
            type="submit"
            autoFocus
            className="mt-[2.5vw] flex h-[10vw] cursor-pointer items-center rounded-full bg-[#ffb2c6] px-[5vw] text-[3.5vw] leading-none tracking-[-0.015em] text-ink transition-colors duration-200 ease-in-out hover:bg-[#fc97b1] outline-offset-2 focus-visible:outline-2 focus-visible:outline-white md:mt-[calc(var(--u)*0.75)] md:h-[calc(var(--u)*3)] md:px-[calc(var(--u)*1.5)] md:text-(length:--u)"
          >
            {close}
          </button>
        </form>
      </div>
    </dialog>
  )
}

function ExtendedLook() {
  const dialog = useRef(null)

  return (
    // Starts 35% of a screen down the page, underneath the pinned hero
    <section id="extended-look" aria-labelledby="extended-look-title" className="relative mt-[-65vh]">
      {/* Pinned scene */}
      <div data-xl="scene" className="relative h-dvh overflow-hidden">
        <div data-xl="image" className="absolute inset-0 overflow-hidden [filter:brightness(var(--brightness,1))]">
          <img
            data-xl="image-zoom"
            src={SHOWREEL.art}
            alt={SHOWREEL.alt}
            className="size-full object-cover object-[50%_15%]"
          />
        </div>

        <div
          data-xl="content"
          className="absolute inset-0 z-[1] flex flex-col items-center justify-between px-[4vw] pt-[20vw] pb-[8vw] md:px-[calc(var(--u)*13)] md:pt-[calc(var(--u)*4)] md:pb-[calc(var(--u)*2)]"
        >
          <div data-xl="title" className="flex h-[37.2vw] flex-col items-center justify-center gap-[3vw] text-center font-bold uppercase md:h-auto md:gap-(--u)">
            <p className="font-condensed text-[5vw] leading-[1.1] tracking-[0.0175em] text-[#fbd9e0] md:text-[calc(var(--u)*1.5)] md:tracking-[0.015em]">{SHOWREEL.eyebrow}</p>
            <h2
              id="extended-look-title"
              className="text-[8vw] leading-none tracking-[0.15em] text-shadow-[0_0_32px_rgb(255_255_255/0.3)] md:text-[calc(var(--u)*4)] md:leading-[1.1]"
            >
              {SHOWREEL.title}
            </h2>
          </div>

          <button
            type="button"
            data-xl="play"
            data-glow
            aria-label={`Play ${SHOWREEL.title}`}
            onClick={() => dialog.current.showModal()}
            className="absolute top-1/2 left-1/2 size-[21.6vw] -translate-1/2 cursor-pointer rounded-full bg-[rgb(17_17_23/0.4)] text-white transition-transform duration-500 ease-out hover:scale-105 md:size-[calc(var(--u)*7)]"
          >
            <PlayIcon />
          </button>
        </div>
      </div>
      <ShowreelDialog ref={dialog} />

      {/* Keeps the scene pinned for 2.7 screens before the cards arrive */}
      <div aria-hidden="true" className="h-[170vh]" />

      {/* Case study cards: a swipeable carousel up to xl (one card per view on phones, two from md,
          clipped at the page margins), then a row of three. Margins and gap are the Shop/News ones. */}
      <div data-xl="cards" className="relative z-[1] py-[20vw] md:px-[7.5vw] md:py-[calc(var(--u)*8)] lg:px-[10vw] hd:px-[13vw] fhd:px-[min(16vw,409.6px)]">
        <Carousel
          desktop="md:px-0 md:scroll-px-0 xl:overflow-visible"
          className="gap-(--gap) [--gap:12px] md:[--gap:16px] lg:[--gap:18px] hd:[--gap:22.5px] fhd:[--gap:25px]"
        >
          {SHOWREEL.cards.map((card, i) => (
            <TrailerCard key={card.title} {...card} {...COLORS[i]} />
          ))}
        </Carousel>
      </div>
    </section>
  )
}

export default ExtendedLook
