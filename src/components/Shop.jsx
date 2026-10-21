import merchArt from '../assets/images/GTAVI_Merch_PromoCard.0_k5n2lk~h9h~.avif'
import collectorsArt from '../assets/images/collectorsMobile.09~60xnm5q~pr.avif'
import { AI_ART } from '../aiArt'
import ArrowIcon from './ArrowIcon'
import Carousel from './Carousel'
import SectionHeader from './SectionHeader'

// "Shop", after the feature cards, measured on rockstargames.com/VI. Two cards in a row (a
// carousel on phones), each laid out like a feature card on a phone: a 3:2 space for the
// artwork, then the text. No scroll animation on the live site; only hover.
// From md up, sizes are multiples of --u (defined in index.css); phones use vw like the live site.
// The /ai route swaps in our own artwork (see aiArt.js).

const STORE = 'https://store.rockstargames.com'

const CARDS = [
  {
    eyebrow: 'Merchandise',
    title: 'Premium apparel, collectibles, and more',
    cta: 'Shop Now',
    href: `${STORE}/grand-theft-auto-vi-collection`,
    art: merchArt,
    aiArt: AI_ART.merch,
    // Only the photo is faded towards the text; the collector's box art is a cut-out on the card colour
    fade: true,
    titleSize: 'md:text-[calc(var(--u)*3)]',
    colors: { bg: '#20234c', eyebrow: '#fbd9e0', button: '#ffd4a8', buttonHover: '#ffc080', buttonText: '#0f0c1a', glow: '#3f284b' },
  },
  {
    eyebrow: 'Collector’s Box',
    title: 'The Vice City Collection',
    cta: 'Explore Now',
    art: collectorsArt,
    aiArt: AI_ART.collectors,
    titleSize: 'md:text-[calc(var(--u)*3.25)]',
    colors: { bg: '#252644', eyebrow: '#e5ddff', button: '#ffb2c6', buttonHover: '#fc97b1', buttonText: '#0c0d1b', glow: '#2f2e52' },
  },
]

function ShopCard({ eyebrow, title, cta, href, art, fade, titleSize, colors }) {
  // The first card links to the store; the second opens a modal on the live site, so it's a button
  const Tag = href ? 'a' : 'button'
  const link = href ? { href, target: '_blank', rel: 'noreferrer' } : { type: 'button' }

  return (
    <Tag
      {...link}
      data-glow
      className="group @container relative flex w-[85vw] flex-none cursor-pointer snap-start flex-col justify-end overflow-hidden rounded-[3vw] text-left outline-4 outline-offset-4 outline-transparent transition-[outline-color] duration-150 ease-out before:block before:aspect-[3/2] focus-visible:outline-white md:w-auto md:flex-1 md:rounded-[calc(var(--u)*1.75)]"
      style={{ backgroundColor: colors.bg, '--button': colors.button, '--button-hover': colors.buttonHover, '--glow': colors.glow }}
    >
      {/* Artwork: brightens on hover. The fade's stops sit at a third and two thirds of the card's
          width (cqw), as on the live site. Enlarged 1.0825x from md up (measured; it doesn't move). */}
      <img
        src={art}
        alt=""
        className={`absolute inset-0 z-1 size-full object-cover object-top opacity-80 transition-opacity duration-1000 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 md:scale-[1.0825] ${fade ? '[mask-image:linear-gradient(#000_0%,#000_33.333cqw,rgb(0_0_0/0.44)_66.667cqw,rgb(0_0_0/0.1)_100%)]' : ''}`}
      />

      <span className="relative z-2 flex flex-col gap-[2vw] px-[8vw] pb-[8vw] transition-[filter] duration-1000 ease-out group-hover:[filter:drop-shadow(0_0_10px_#fff3)_drop-shadow(0_20px_70px_var(--glow))] group-focus-visible:[filter:drop-shadow(0_0_10px_#fff3)_drop-shadow(0_20px_70px_var(--glow))] md:gap-[calc(var(--u)*0.5)] md:px-[calc(var(--u)*3.25)] md:pb-[calc(var(--u)*3.25)]">
        <q className="font-condensed text-[4vw] leading-[1.4] font-bold tracking-[0.02em] uppercase [quotes:none] md:text-[calc(var(--u)*1.125)] md:leading-[1.3]" style={{ color: colors.eyebrow }}>
          {eyebrow}
        </q>
        <span className={`font-condensed text-[8vw] leading-[0.9] font-bold text-cream uppercase ${titleSize}`}>{title}</span>
        <span className="mt-[2.5vw] flex h-[10vw] w-fit items-center gap-[1.5vw] rounded-full bg-(--button) pr-[4vw] pl-[5vw] text-[3.5vw] leading-[1.5] font-medium tracking-[-0.015em] transition-[background-color] duration-1000 ease-out group-hover:bg-(--button-hover) group-focus-visible:bg-(--button-hover) md:mt-[calc(var(--u)*0.75)] md:h-[calc(var(--u)*3)] md:gap-[calc(var(--u)*0.5)] md:pr-[calc(var(--u)*1.125)] md:pl-[calc(var(--u)*1.5)] md:text-(length:--u) md:leading-none" style={{ color: colors.buttonText }}>
          {cta}
          <ArrowIcon />
        </span>
      </span>
    </Tag>
  )
}

function Shop({ ai }) {
  return (
    <section
      id="shop"
      aria-labelledby="shop-title"
      className="flex flex-col gap-[8vw] py-[10vw] md:gap-[calc(var(--u)*2)] md:py-[calc(var(--u)*4)] md:px-[7.5vw] lg:px-[10vw] hd:px-[13vw] fhd:px-[min(16vw,409.6px)]"
    >
      <SectionHeader id="shop-title" title="Shop" href={STORE} link="View All" color="#ffd4a8" linkColor="#fee8ea" phoneLink="disc" />
      <div>
        <Carousel className="gap-3 md:gap-4 lg:gap-[18px] hd:gap-[22.5px] fhd:gap-[25px]">
          {CARDS.map(({ aiArt, ...card }) => (
            <ShopCard key={card.title} {...card} art={ai ? aiArt : card.art} />
          ))}
        </Carousel>
      </div>
    </section>
  )
}

export default Shop
