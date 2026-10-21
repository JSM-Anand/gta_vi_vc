import trailerArt from '../assets/images/517572321a549a.0y668_yrgy9s_.avif'
import storeArt from '../assets/images/759875393o5253.0h0t06-9rye35.avif'
import radioArt from '../assets/images/o3982oa93a23k4.05jwq4z-sjai_.avif'
import { AI_ART } from '../aiArt'
import Carousel from './Carousel'
import SectionHeader from './SectionHeader'

// "Featured News", after the shop, measured on rockstargames.com/VI. Three Newswire cards in a row
// (a carousel on phones): a 16:9 image over the title and date. No scroll animation on the live
// site; on hover the image brightens and a lighter gradient fades in over the card.
// From md up, sizes are multiples of --u (defined in index.css); phones use vw like the live site.
// The /ai route swaps in our own artwork (see aiArt.js).

const ARTICLE = 'https://www.rockstargames.com/newswire/article'

const ARTICLES = [
  { title: 'Watch the Grand Theft Auto VI Launch Trailer', date: '2026-10-15', id: '517572321a549a', art: trailerArt, aiArt: AI_ART.newsTrailer },
  { title: 'Grand Theft Auto VI Collection Now at the Rockstar Store', date: '2026-10-08', id: '759875393o5253', art: storeArt, aiArt: AI_ART.newsStore },
  { title: 'The Music of Grand Theft Auto VI: In-Game Radio Stations', date: '2026-10-08', id: 'o3982oa93a23k4', art: radioArt, aiArt: AI_ART.newsRadio },
]

const formatDate = (iso) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

function NewsCard({ title, date, id, art }) {
  return (
    <a
      href={`${ARTICLE}/${id}`}
      target="_blank"
      rel="noreferrer"
      data-glow
      className="group relative flex w-[85vw] flex-none snap-start flex-col overflow-hidden rounded-[3vw] bg-[linear-gradient(#38365d_0%,#2f2e52_30%,#252644_65%,#1f1f38_100%)] outline-4 outline-offset-4 outline-transparent transition-[outline-color] duration-500 ease-in-out after:absolute after:inset-0 after:bg-[linear-gradient(#433f6a_0%,#38365d_30%,#2f2e52_65%,#252644_100%)] after:opacity-0 after:transition-opacity after:duration-500 after:ease-in-out hover:after:opacity-100 focus-visible:outline-white focus-visible:after:opacity-100 md:w-auto md:flex-1 md:rounded-[calc(var(--u)*0.875)]"
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
    </a>
  )
}

function News({ ai }) {
  return (
    <section
      id="news"
      aria-labelledby="news-title"
      className="flex flex-col gap-[8vw] py-[10vw] md:gap-[calc(var(--u)*2)] md:py-[calc(var(--u)*4)] md:px-[7.5vw] lg:px-[10vw] hd:px-[13vw] fhd:px-[min(16vw,409.6px)]"
    >
      <SectionHeader id="news-title" title="Featured News" href="https://rsg.ms/vi-news" link="View all" color="#ffb2c6" linkColor="#e5ddff" phoneLink="icon" />
      <div>
        <Carousel className="gap-3 md:gap-4 lg:gap-[18px] hd:gap-[22.5px] fhd:gap-[25px]">
          {ARTICLES.map(({ aiArt, ...article }) => (
            <NewsCard key={article.id} {...article} art={ai ? aiArt : article.art} />
          ))}
        </Carousel>
      </div>
    </section>
  )
}

export default News
