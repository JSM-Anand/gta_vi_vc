import ArrowIcon from './ArrowIcon'

// Title row of the Shop and Featured News sections: the title on the left, a "View All" link on
// the right. On phones the link shrinks to its arrow: in a plum disc for Shop (phoneLink="disc"),
// bare and larger for News (phoneLink="icon"), as on rockstargames.com/VI.
function SectionHeader({ id, title, href, link, color, linkColor, phoneLink }) {
  const phone =
    phoneLink === 'disc'
      ? 'size-[8vw] justify-center rounded-full bg-[#4b2f54] md:size-auto md:bg-transparent'
      : ''
  const icon = phoneLink === 'disc' ? 'size-[3.5vw] md:size-[calc(var(--u)*1.5)]' : 'size-[6vw] md:size-[calc(var(--u)*1.5)]'

  return (
    <div className="flex justify-between gap-[8vw] px-[7.5vw] md:px-0">
      <h2
        id={id}
        className="text-[6vw] leading-[1.3] tracking-[-0.0075em] md:text-[calc(var(--u)*2)] md:leading-[1.2] md:tracking-[-0.01em]"
        style={{ color }}
      >
        {title}
      </h2>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        data-glow
        className={`flex flex-none items-center rounded-full text-(--link) outline-offset-2 transition-colors duration-200 ease-in-out hover:text-cream focus-visible:outline-2 focus-visible:outline-white md:gap-[calc(var(--u)*0.5)] md:text-[calc(var(--u)*1.125)] md:leading-none md:tracking-[-0.015em] ${phone}`}
        style={{ '--link': linkColor }}
      >
        <span className="sr-only md:not-sr-only">{link}</span>
        <ArrowIcon className={icon} />
      </a>
    </div>
  )
}

export default SectionHeader
