import { Children, useEffect, useRef, useState } from 'react'

// Phone card carousel, as on rockstargames.com/VI (trailer, shop and news cards): a scroll-snapping
// row inset by the 7.5vw page margin, with a dot per card underneath. From md up it's a plain row
// and the dots hide; `className` sets the gap and the desktop layout. `desktop` replaces the md-up
// row classes, for rows that keep scrolling past md (the trailer cards scroll until xl).
// Cards need their own phone width and snap point (w-[85vw] flex-none snap-start).
function Carousel({ className = '', desktop = 'md:overflow-visible md:px-0', children }) {
  const track = useRef(null)
  const [active, setActive] = useState(0)

  // Highlight the dot of the card that's mostly in view
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
    <>
      <div
        ref={track}
        className={`flex snap-x snap-mandatory scroll-px-[7.5vw] overflow-x-auto px-[7.5vw] [scrollbar-width:none] ${desktop} ${className}`}
      >
        {children}
      </div>

      <div aria-hidden="true" className="mt-[8vw] flex justify-center md:hidden">
        <div className="flex h-[12vw] items-center gap-[3vw] rounded-full bg-white/5 px-[6vw]">
          {Children.map(children, (_, i) => (
            <span className={`size-[2vw] rounded-full transition-colors ${i === active ? 'bg-white' : 'bg-white/20'}`} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Carousel
