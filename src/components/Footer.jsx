import logo from '../assets/icons/logo.webp'
import { FOOTER, PROFILE } from '../content'
import JMark from './JMark'

// Page footer, measured on rockstargames.com/VI: the logo, the contact pill (the live site's "Get
// Rockstar Propaganda" newsletter pill), social and other links, and the credits where the live site
// has its ESRB rating. No scroll animation; only hover.
// From md up, sizes are multiples of --u (defined in index.css); phones use vw like the live site,
// except the pill's text, which is fixed px there too.

// Social icons (16×16 viewBox). X, Instagram, YouTube and TikTok are the live site's; GitHub and
// LinkedIn are Bootstrap Icons, which fill the whole box, so `full` scales them down to match.
const ICONS = {
  X: { d: ['M9.142 7.081 13.609 2H12.55L8.671 6.412 5.573 2H2l4.685 6.672L2 14h1.059l4.096-4.66L10.427 14H14zm-1.45 1.65-.475-.665L3.44 2.78h1.626l3.048 4.266.475.664 3.962 5.546h-1.626z'] },
  Instagram: { d: ['M5.515 2.042c-.638.03-1.074.132-1.455.282-.395.153-.73.36-1.062.694a2.9 2.9 0 0 0-.69 1.063c-.148.382-.248.818-.276 1.457s-.034.844-.031 2.474c.003 1.629.01 1.833.041 2.473.03.639.132 1.074.282 1.456.154.394.36.728.694 1.061s.668.537 1.064.69c.382.147.818.248 1.457.276.638.028.844.034 2.473.031s1.834-.01 2.474-.04 1.073-.133 1.455-.282c.394-.154.729-.36 1.061-.694a2.9 2.9 0 0 0 .69-1.064c.148-.382.248-.818.276-1.456.028-.64.034-.845.031-2.474s-.01-1.834-.04-2.474-.133-1.074-.282-1.456a2.95 2.95 0 0 0-.694-1.061 2.9 2.9 0 0 0-1.064-.69c-.382-.147-.818-.248-1.457-.276-.638-.027-.844-.034-2.473-.031s-1.834.01-2.474.041m.07 10.847c-.585-.026-.902-.123-1.114-.204a1.9 1.9 0 0 1-.691-.448 1.85 1.85 0 0 1-.45-.689c-.082-.212-.181-.529-.209-1.114-.03-.632-.036-.822-.04-2.424-.003-1.602.003-1.791.031-2.424.025-.584.123-.902.204-1.114.108-.28.238-.48.448-.69.21-.212.409-.342.689-.451.211-.083.529-.18 1.113-.209.633-.03.823-.036 2.424-.039 1.602-.004 1.792.002 2.425.03.585.026.903.123 1.114.204.28.108.48.238.69.448.212.21.342.409.451.69.083.21.181.527.209 1.112.03.633.037.823.04 2.424.002 1.602-.003 1.792-.031 2.424-.026.585-.123.903-.204 1.115-.108.28-.238.48-.448.69-.21.211-.409.341-.689.45-.211.083-.529.182-1.113.21-.633.03-.822.035-2.425.039s-1.791-.003-2.424-.03m4.892-8.096a.72.72 0 1 0 1.44-.002.72.72 0 0 0-1.44.002M4.919 8.006a3.08 3.08 0 1 0 6.162-.012 3.08 3.08 0 0 0-6.162.012M6 8.004a2 2 0 1 1 4-.008 2 2 0 0 1-4 .008'] },
  YouTube: { d: ['M14.708 4.63a1.75 1.75 0 0 0-1.237-1.237C12.378 3.1 8 3.1 8 3.1s-4.378 0-5.47.293A1.75 1.75 0 0 0 1.293 4.63C1 5.722 1 8 1 8s0 2.278.293 3.37a1.75 1.75 0 0 0 1.237 1.237C3.622 12.9 8 12.9 8 12.9s4.378 0 5.47-.293a1.75 1.75 0 0 0 1.237-1.237C15 10.278 15 8 15 8s0-2.278-.293-3.37zM6.6 10.1V5.9L10.237 8z'] },
  TikTok: { d: ['M8.854 10.79c-.032.923-.763 1.665-1.651 1.665a1.531 1.531 0 0 0 0 0c.895 0 1.62-.742 1.65-1.666V2.526h1.45a2.9 2.9 0 0 0 1.204 1.882c.428.29.945.466 1.493.466v2.064a4.56 4.56 0 0 1-2.741-.925v4.19c0 2.09-1.626 3.797-3.63 3.797a3.5 3.5 0 0 1-2.079-.688A3.86 3.86 0 0 1 3 10.202c0-2.09 1.626-3.797 3.63-3.797q.245.001.491.033v.486c-1.827.047-3.32 1.504-3.522 3.373C3.8 8.435 5.294 6.97 7.12 6.924v1.619a1.5 1.5 0 0 0-.492-.08c-.913 0-1.657.775-1.657 1.733 0 .667.36 1.24.889 1.53.227.129.491.203.768.203.895 0 1.62-.742 1.651-1.666V2h1.973c0 .175.019.35.044.526H8.854z'], evenOdd: true },
  GitHub: { full: true, d: ['M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8'] },
  LinkedIn: { full: true, d: ['M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z'] },
}

const link = 'outline-offset-2 focus-visible:outline-2 focus-visible:outline-white'
const small = 'text-[3vw] leading-[1.5] font-normal tracking-[-0.015em] md:text-[calc(var(--u)*0.75)]'

function Footer() {
  return (
    <div className="flex flex-col items-center gap-[8vw] pt-[10vw] pb-[20vw] md:gap-[calc(var(--u)*2)] md:pt-[calc(var(--u)*4)] md:pb-[calc(var(--u)*8)]">
      <img src={logo} alt={`${PROFILE.name}, ${PROFILE.role}`} className="w-36 lg:w-[162px] fhd:w-45" />

      <footer className="flex w-full flex-col items-center gap-[8vw] px-[8vw] md:gap-[calc(var(--u)*2)] md:px-[7.5vw] lg:px-[10vw] hd:px-[13vw] fhd:px-[min(16vw,409.6px)]">
        {/* Contact pill: as wide as its content, up to the page margins. On phones it's a
            rounded box with the text stacked and centred. */}
        <a
          href="#"
          data-glow
          className={`flex max-w-[400px] cursor-pointer flex-wrap items-center justify-center gap-[2vw] rounded-2xl border border-white/20 px-[8vw] py-[6vw] text-[4vw] leading-[1.4] font-bold tracking-[-0.005em] transition-colors duration-200 ease-in-out hover:bg-white/5 md:max-w-full md:flex-nowrap md:gap-[calc(var(--u)*2.5)] md:rounded-full md:px-[calc(var(--u)*3)] md:py-[calc(var(--u)*1.5)] md:text-left md:text-(length:--u) ${link}`}
        >
          {/* The pill's text steps in px (16/18/20 and 14/15.75/17.5), measured; it doesn't follow --u */}
          <strong className="flex w-full flex-col items-center gap-[2vw] text-center text-base leading-normal font-bold uppercase md:w-auto md:flex-row md:gap-[0.75em] md:text-left lg:text-lg fhd:text-xl">
            <JMark className="h-[1.5em] flex-none" />
            {FOOTER.contact.title}
          </strong>
          <span className="text-center text-sm leading-normal font-normal tracking-[-0.025em] md:max-w-[400px] md:text-left lg:max-w-[450px] lg:text-[15.75px] fhd:max-w-[500px] fhd:text-[17.5px]">
            {FOOTER.contact.body}
          </span>
        </a>

        <nav aria-label={PROFILE.name} className="flex flex-col items-center gap-[2.5vw] md:gap-[calc(var(--u)*0.75)]">
          <ul className="flex">
            {FOOTER.socials.map(({ name, href }) => {
              const { d, evenOdd, full } = ICONS[name]
              return (
                <li key={name}>
                  <a
                    href={href}
                    aria-label={name}
                    data-glow
                    className={`flex size-[12vw] items-center justify-center rounded-full text-[#ccc2f5] transition-colors duration-200 ease-in-out hover:bg-[#1f1f38] hover:text-[#e5ddff] md:size-[calc(var(--u)*3)] ${link}`}
                  >
                    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="size-[5vw] md:size-[calc(var(--u)*1.25)]">
                      <g transform={full ? 'translate(2 2) scale(0.75)' : undefined}>
                        {d.map((path) => (
                          <path key={path} d={path} fillRule={evenOdd ? 'evenodd' : undefined} clipRule={evenOdd ? 'evenodd' : undefined} />
                        ))}
                      </g>
                    </svg>
                  </a>
                </li>
              )
            })}
          </ul>

          <ul className="flex flex-wrap justify-center gap-x-[4vw] gap-y-[2vw] text-center md:gap-[calc(var(--u)*1.25)]">
            {FOOTER.links.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className={`block rounded-full text-[#ccc2f5] hover:underline ${small} ${link}`}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Credits, in the live site's ESRB rating block (without the badge) */}
        <p className={`flex w-[56vw] flex-col gap-[3vw] text-center md:w-[calc(var(--u)*22)] md:gap-[calc(var(--u)*0.75)] ${small}`}>
          <span>{FOOTER.credits[0]}</span>
          <span aria-hidden="true" className="h-px bg-[#1f1f38]" />
          <span>{FOOTER.credits[1]}</span>
        </p>
      </footer>
    </div>
  )
}

export default Footer
