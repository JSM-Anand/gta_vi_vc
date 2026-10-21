// Feature cards after "Vice City, USA.", measured on rockstargames.com/VI. Wide 5:2 cards with the
// text in a bottom corner on desktop; on phones they stack with the artwork above the text.
// The scroll and pointer animation lives in animations/features.js and targets the data-feature attributes.
// From md up, sizes are multiples of --u (defined in index.css); phones use vw like the live site.

import mediaArt from '../assets/images/mediaDesktop.11iioep6d3wsf.avif'
import musicArt from '../assets/images/musicDesktop.0zwcbzhynnsc-.avif'
import leonidaArt from '../assets/images/onlyInLeonidaDesktop.15y2n40f3axwo.avif'
import ArrowIcon from './ArrowIcon'

// The / route uses Rockstar's card artwork (already 5:2 and composed for the text side; there are no
// phone versions, so phones cover-crop the desktop image).
// The /ai route uses our own artwork, generated and hosted on Cloudinary. The sources are 4:3 and 3:2, so Cloudinary
// crops them to each layout around the subject (g_auto): 5:2 for desktop, portrait for phones.
const IMG = 'https://res.cloudinary.com/dtwvlmxqc/image/upload'
const art = (id, crop, width) => `${IMG}/${crop},w_${width}/f_auto,q_auto/${id}`
const DESKTOP_WIDTHS = [1024, 1600, 2048]
const MOBILE_WIDTHS = [480, 800]

const CARDS = [
  {
    eyebrow: 'Music',
    title: 'In-Game Radio and Music',
    body: 'Preview hand-picked stations from the biggest and widest-ranging selection of in-game radio yet, pre-order GTAVI: The Album, and more.',
    cta: 'Explore More',
    image: 'v1791951674/saoijl3xv1pymvgl9yhm',
    original: musicArt,
    colors: { bg: '#4b2f54', eyebrow: '#fee8ea', button: '#ffd4a8', buttonHover: '#ffc080', buttonText: '#0f0c1a', glow: '#583660' },
  },
  {
    eyebrow: 'People & Places',
    title: 'Only in Leonida',
    body: 'Vice City, USA. The darkest side of the sunniest place in America.',
    cta: 'Explore More',
    image: 'v1791951960/yef2z4tdg5i4yraf3bua',
    original: leonidaArt,
    // Text sits on the right here, so the AI desktop crop is mirrored to put the swimmer on the left
    right: true,
    colors: { bg: '#2c3868', eyebrow: '#d9f3fe', button: '#ffc5b8', buttonHover: '#fcae9c', buttonText: '#0d0c1a', glow: '#324275' },
  },
  {
    eyebrow: 'Downloads',
    title: 'Media & Artwork',
    body: 'Download and share official videos, screenshots, and more.',
    cta: 'See All',
    image: 'v1791952047/tg77xwan0btlw6fdx9aj',
    original: mediaArt,
    colors: { bg: '#162623', eyebrow: '#d1ddb0', button: '#ffdf9e', buttonHover: '#fbd383', buttonText: '#071012', glow: '#243830' },
  },
]

function FeatureCard({ eyebrow, title, body, cta, image, original, right, colors }) {
  const desktopCrop = `c_fill,ar_5:2,g_auto${right ? ',a_hflip' : ''}`
  const mobileCrop = 'c_fill,ar_2:3,g_auto'

  return (
    <button
      type="button"
      data-feature="card"
      data-glow
      className={`group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-[3vw] text-left outline-4 outline-offset-4 outline-transparent transition-[outline-color] duration-150 ease-out [--mx:-5%] [--my:140%] before:block before:aspect-[3/2] focus-visible:outline-white md:aspect-[5/2] md:flex-row md:items-end md:rounded-[calc(var(--u)*1.75)] md:p-[calc(var(--u)*3.25)] md:before:hidden ${right ? 'md:justify-end' : ''}`}
      style={{ backgroundColor: colors.bg, '--button': colors.button, '--button-hover': colors.buttonHover, '--glow': colors.glow }}
    >
      {/* Artwork: faded towards the text, brightens on hover, drifts with scroll. On desktop the fade
          is a radial gradient from the text's corner that follows the pointer (--mx, --my). */}
      <picture
        data-feature="art"
        aria-hidden="true"
        className={`absolute inset-0 z-1 opacity-80 transition-opacity duration-1000 ease-out [mask-image:linear-gradient(#000_0%,#000_28.333vw,rgb(0_0_0/0.44)_56.667vw,rgb(0_0_0/0.1)_100%)] group-hover:opacity-100 group-focus-visible:opacity-100 ${right ? 'md:[mask-image:radial-gradient(100%_200%_at_calc(100%+var(--mx))_var(--my),rgb(0_0_0/0.28)_0%,rgb(0_0_0/0.48)_52%,#000_87%)]' : 'md:[mask-image:radial-gradient(100%_200%_at_var(--mx)_var(--my),rgb(0_0_0/0.28)_0%,rgb(0_0_0/0.48)_52%,#000_87%)]'}`}
      >
        {!original && (
          <source
            media="(min-width: 768px)"
            srcSet={DESKTOP_WIDTHS.map((w) => `${art(image, desktopCrop, w)} ${w}w`).join(', ')}
            sizes="85vw"
          />
        )}
        <img
          src={original ?? art(image, mobileCrop, 800)}
          srcSet={original ? undefined : MOBILE_WIDTHS.map((w) => `${art(image, mobileCrop, w)} ${w}w`).join(', ')}
          sizes="85vw"
          alt=""
          className="size-full object-cover object-top md:object-center"
        />
      </picture>

      <span className="relative z-2 flex flex-col gap-[2vw] px-[8vw] pb-[8vw] transition-[filter] duration-1000 ease-out group-hover:[filter:drop-shadow(0_0_10px_#fff3)_drop-shadow(0_20px_70px_var(--glow))] group-focus-visible:[filter:drop-shadow(0_0_10px_#fff3)_drop-shadow(0_20px_70px_var(--glow))] md:w-[calc(var(--u)*23)] md:gap-[calc(var(--u)*0.5)] md:p-0">
        <q className="font-condensed text-[4vw] leading-[1.4] font-bold tracking-[0.02em] uppercase [quotes:none] md:text-[calc(var(--u)*1.125)] md:leading-[1.3]" style={{ color: colors.eyebrow }}>
          {eyebrow}
        </q>
        <span className="font-condensed text-[9vw] leading-[0.9] font-bold text-balance text-cream uppercase md:text-[calc(var(--u)*3.5)]">{title}</span>
        <span className="text-[4vw] leading-[1.2] font-medium tracking-[-0.015em] text-balance text-white md:text-(length:--u) md:leading-[1.4]">{body}</span>
        <span className="mt-[2.5vw] flex h-[10vw] w-fit items-center gap-[1.5vw] rounded-full bg-(--button) pr-[4vw] pl-[5vw] text-[3.5vw] leading-[1.5] font-medium tracking-[-0.015em] transition-[background-color] duration-1000 ease-out group-hover:bg-(--button-hover) group-focus-visible:bg-(--button-hover) md:mt-[calc(var(--u)*0.75)] md:h-[calc(var(--u)*3)] md:gap-[calc(var(--u)*0.5)] md:pr-[calc(var(--u)*1.125)] md:pl-[calc(var(--u)*1.5)] md:text-(length:--u) md:leading-none" style={{ color: colors.buttonText }}>
          {cta}
          <ArrowIcon />
        </span>
      </span>
    </button>
  )
}

// `ai` (the /ai route) swaps Rockstar's artwork for our own
function Features({ ai }) {
  return (
    <section
      id="features"
      aria-label="More from Vice City"
      className="flex flex-col gap-[7vw] px-[7.5vw] pt-[10vw] pb-[20vw] md:gap-[calc(var(--u)*2)] md:pt-[calc(var(--u)*4)] md:pb-[calc(var(--u)*8)] lg:px-[10vw] hd:px-[13vw] fhd:px-[min(16vw,409.6px)]"
    >
      {CARDS.map((card) => (
        <FeatureCard key={card.title} {...card} original={ai ? undefined : card.original} />
      ))}
    </section>
  )
}

export default Features
