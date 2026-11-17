import { HERO } from '../content'
import JMark from './JMark'

// Fixed top bar: J monogram on the left, menu button on the right. A Hire pill joins the
// menu button once the hero's own button has scrolled away (animations/heroScroll.js).
// From md up, sizes are multiples of --u (defined in index.css).
function Navbar() {
  return (
    <nav data-intro="nav" className="fixed inset-x-0 top-0 z-10 flex items-center justify-between p-[6vw] text-white md:p-[calc(var(--u)*2.5)]">
      <a
        href="/"
        aria-label="Homepage"
        data-glow
        className="flex size-[12vw] transition-colors duration-200 ease-in-out hover:text-cream items-center justify-center rounded-full outline-offset-2 focus-visible:outline-2 focus-visible:outline-white md:size-[calc(var(--u)*3)]"
      >
        <JMark className="h-[7vw] md:h-[calc(var(--u)*2.25)]" />
      </a>

      <div className="flex items-center gap-x-[2.5vw] md:gap-x-(--u)">
        <button
          type="button"
          data-glow
          data-scroll="nav-preorder"
          className="invisible flex h-[10vw] cursor-pointer items-center rounded-full bg-[#ffb2c6] px-[5vw] text-[3.5vw] leading-none tracking-[-0.015em] text-ink opacity-0 outline-offset-2 transition-colors duration-200 ease-in-out hover:bg-[#fc97b1] focus-visible:outline-2 focus-visible:outline-white md:h-[calc(var(--u)*2.5)] md:px-[calc(var(--u)*1.25)] md:text-[calc(var(--u)*0.875)]"
        >
          {HERO.cta}
        </button>

        <button
          type="button"
          data-glow
          className="flex size-[12vw] cursor-pointer transition-colors duration-200 ease-in-out hover:text-cream flex-col items-center justify-center gap-[1vw] rounded-full outline-offset-2 focus-visible:outline-2 focus-visible:outline-white md:size-[calc(var(--u)*3)] md:gap-[calc(var(--u)*0.38)]"
        >
          <span className="h-[1vw] w-[5vw] bg-current md:h-[calc(var(--u)*0.38)] md:w-[calc(var(--u)*1.75)]" />
          <span className="h-[1vw] w-[5vw] bg-current md:h-[calc(var(--u)*0.38)] md:w-[calc(var(--u)*1.75)]" />
          <span className="sr-only">Expand Navigation Menu</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
