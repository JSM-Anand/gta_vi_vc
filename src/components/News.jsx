import { WRITING } from '../content'
import Carousel from './Carousel'
import SectionHeader from './SectionHeader'

// "Writing & Talks", the live site's "Featured News" after the shop, measured on rockstargames.com/VI.
// Three cards in a row (a carousel on phones): a 16:9 image over the title and date. No scroll
// animation on the live site; on hover the image brightens and a lighter gradient fades in over the card.
// From md up, sizes are multiples of --u (defined in index.css); phones use vw like the live site.

const formatDate = (iso) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

function NewsCard({ title, date, art, href }) {
  // An article with no link yet is a button
  const Tag = href ? 'a' : 'button'
  const link = href ? { href } : { type: 'button' }

  return (
    <Tag
      {...link}
      data-glow
      className="group cursor-pointer text-left relative flex w-[85vw] flex-none snap-start flex-col overflow-hidden rounded-[3vw] bg-[linear-gradient(#38365d_0%,#2f2e52_30%,#252644_65%,#1f1f38_100%)] outline-4 outline-offset-4 outline-transparent transition-[outline-color] duration-500 ease-in-out after:absolute after:inset-0 after:bg-[linear-gradient(#433f6a_0%,#38365d_30%,#2f2e52_65%,#252644_100%)] after:opacity-0 after:transition-opacity after:duration-500 after:ease-in-out hover:after:opacity-100 focus-visible:outline-white focus-visible:after:opacity-100 md:w-auto md:flex-1 md:rounded-[calc(var(--u)*0.875)]"
    >
      <span className="relative z-2 bg-[#070810]">
        <img
          src={art}
          alt=""
          className="aspect-video w-full object-cover opacity-80 transition-opacity duration-500 ease-in-out group-hover:opacity-100 group-focus-visible:opacity-100"
        />
      </span>
      <span className="relative z-2 flex flex-col gap-[3.5vw] p-[6vw] md:gap-[calc(var(--u)*1.125)] md:p-[calc(var(--u)*2)]">
        <span className="text-[3.5vw] leading-[1.5] tracking-[-0.015em] text-[#e5ddff] md:text-[calc(var(--u)*1.125)] md:leading-[1.3]">{title}</span>
        {/* Larger than the title on phones, smaller from md up (measured) */}
        <time dateTime={date} className="text-[4vw] leading-[1.4] font-normal tracking-[-0.015em] text-[#ccc2f5] md:text-(length:--u)">
          {formatDate(date)}
        </time>
      </span>
    </Tag>
  )
}

function News() {
  return (
    <section
      id="news"
      aria-labelledby="news-title"
      className="flex flex-col gap-[8vw] py-[10vw] md:gap-[calc(var(--u)*2)] md:py-[calc(var(--u)*4)] md:px-[7.5vw] lg:px-[10vw] hd:px-[13vw] fhd:px-[min(16vw,409.6px)]"
    >
      <SectionHeader id="news-title" title={WRITING.title} href={WRITING.href} link={WRITING.link} color="#ffb2c6" linkColor="#e5ddff" phoneLink="icon" />
      <div>
        <Carousel className="gap-3 md:gap-4 lg:gap-[18px] hd:gap-[22.5px] fhd:gap-[25px]">
          {WRITING.articles.map((article) => (
            <NewsCard key={article.title} {...article} />
          ))}
        </Carousel>
      </div>
    </section>
  )
}

export default News
