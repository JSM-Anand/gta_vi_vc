import viLogo from '../assets/images/vi.0hxa9~pf214xe.png'
import esrbMature from '../assets/images/esrb-mature.0k-tky9~eo.-3.svg'

// Page footer, measured on rockstargames.com/VI: the GTA VI logo, the "Get Rockstar Propaganda"
// newsletter pill, social and legal links, and the ESRB rating. No scroll animation; only hover.
// From md up, sizes are multiples of --u (defined in index.css); phones use vw like the live site,
// except the pill's text and the ESRB badge, which are fixed px there too.

const RSG = 'https://www.rockstargames.com'

// Icons copied from the live site (16×16 viewBox)
const SOCIALS = [
  { name: 'X', href: 'https://x.com/rockstargames', d: ['M9.142 7.081 13.609 2H12.55L8.671 6.412 5.573 2H2l4.685 6.672L2 14h1.059l4.096-4.66L10.427 14H14zm-1.45 1.65-.475-.665L3.44 2.78h1.626l3.048 4.266.475.664 3.962 5.546h-1.626z'] },
  { name: 'Instagram', href: 'https://instagram.com/rockstargames', d: ['M5.515 2.042c-.638.03-1.074.132-1.455.282-.395.153-.73.36-1.062.694a2.9 2.9 0 0 0-.69 1.063c-.148.382-.248.818-.276 1.457s-.034.844-.031 2.474c.003 1.629.01 1.833.041 2.473.03.639.132 1.074.282 1.456.154.394.36.728.694 1.061s.668.537 1.064.69c.382.147.818.248 1.457.276.638.028.844.034 2.473.031s1.834-.01 2.474-.04 1.073-.133 1.455-.282c.394-.154.729-.36 1.061-.694a2.9 2.9 0 0 0 .69-1.064c.148-.382.248-.818.276-1.456.028-.64.034-.845.031-2.474s-.01-1.834-.04-2.474-.133-1.074-.282-1.456a2.95 2.95 0 0 0-.694-1.061 2.9 2.9 0 0 0-1.064-.69c-.382-.147-.818-.248-1.457-.276-.638-.027-.844-.034-2.473-.031s-1.834.01-2.474.041m.07 10.847c-.585-.026-.902-.123-1.114-.204a1.9 1.9 0 0 1-.691-.448 1.85 1.85 0 0 1-.45-.689c-.082-.212-.181-.529-.209-1.114-.03-.632-.036-.822-.04-2.424-.003-1.602.003-1.791.031-2.424.025-.584.123-.902.204-1.114.108-.28.238-.48.448-.69.21-.212.409-.342.689-.451.211-.083.529-.18 1.113-.209.633-.03.823-.036 2.424-.039 1.602-.004 1.792.002 2.425.03.585.026.903.123 1.114.204.28.108.48.238.69.448.212.21.342.409.451.69.083.21.181.527.209 1.112.03.633.037.823.04 2.424.002 1.602-.003 1.792-.031 2.424-.026.585-.123.903-.204 1.115-.108.28-.238.48-.448.69-.21.211-.409.341-.689.45-.211.083-.529.182-1.113.21-.633.03-.822.035-2.425.039s-1.791-.003-2.424-.03m4.892-8.096a.72.72 0 1 0 1.44-.002.72.72 0 0 0-1.44.002M4.919 8.006a3.08 3.08 0 1 0 6.162-.012 3.08 3.08 0 0 0-6.162.012M6 8.004a2 2 0 1 1 4-.008 2 2 0 0 1-4 .008'] },
  { name: 'YouTube', href: 'https://www.youtube.com/rockstargames', d: ['M14.708 4.63a1.75 1.75 0 0 0-1.237-1.237C12.378 3.1 8 3.1 8 3.1s-4.378 0-5.47.293A1.75 1.75 0 0 0 1.293 4.63C1 5.722 1 8 1 8s0 2.278.293 3.37a1.75 1.75 0 0 0 1.237 1.237C3.622 12.9 8 12.9 8 12.9s4.378 0 5.47-.293a1.75 1.75 0 0 0 1.237-1.237C15 10.278 15 8 15 8s0-2.278-.293-3.37zM6.6 10.1V5.9L10.237 8z'] },
  { name: 'TikTok', href: 'https://www.tiktok.com/@rockstargames', d: ['M8.854 10.79c-.032.923-.763 1.665-1.651 1.665a1.531 1.531 0 0 0 0 0c.895 0 1.62-.742 1.65-1.666V2.526h1.45a2.9 2.9 0 0 0 1.204 1.882c.428.29.945.466 1.493.466v2.064a4.56 4.56 0 0 1-2.741-.925v4.19c0 2.09-1.626 3.797-3.63 3.797a3.5 3.5 0 0 1-2.079-.688A3.86 3.86 0 0 1 3 10.202c0-2.09 1.626-3.797 3.63-3.797q.245.001.491.033v.486c-1.827.047-3.32 1.504-3.522 3.373C3.8 8.435 5.294 6.97 7.12 6.924v1.619a1.5 1.5 0 0 0-.492-.08c-.913 0-1.657.775-1.657 1.733 0 .667.36 1.24.889 1.53.227.129.491.203.768.203.895 0 1.62-.742 1.651-1.666V2h1.973c0 .175.019.35.044.526H8.854z'], evenOdd: true },
  { name: 'Facebook', href: 'https://www.facebook.com/rockstargames', d: ['M14 8.022C14 4.696 11.313 2 8 2S2 4.696 2 8.022a6.02 6.02 0 0 0 4.55 5.845V9.862H5.314v-1.84h1.238v-.793c0-2.05.924-3 2.929-3 .38 0 1.036.075 1.304.15v1.668a8 8 0 0 0-.693-.022c-.984 0-1.364.374-1.364 1.346v.65h1.96l-.337 1.841H8.727V14A6.015 6.015 0 0 0 14 8.022'] },
  { name: 'Twitch', href: 'https://twitch.tv/rockstargames', d: ['M5.143 2 3 4.143v7.714h2.571V14l2.143-2.143H9.43L13.286 8V2zm7.286 5.571-1.715 1.715H9l-1.5 1.5v-1.5H5.571V2.857h6.858z', 'M11.143 4.357h-.857V6.93h.857zM8.786 4.357h-.857V6.93h.857z'] },
  { name: 'Discord', href: 'https://discord.gg/rockstargames', d: ['M12.165 4.362A10 10 0 0 0 9.69 3.6q-.175.314-.317.645a9.2 9.2 0 0 0-2.747 0q-.142-.33-.317-.645a10 10 0 0 0-2.478.764C2.263 6.682 1.84 8.942 2.051 11.17a10 10 0 0 0 3.036 1.524 7.3 7.3 0 0 0 .65-1.049 6.5 6.5 0 0 1-1.023-.489q.129-.094.25-.188a7.13 7.13 0 0 0 6.071 0q.123.1.251.188-.492.29-1.025.49.28.552.65 1.048a10 10 0 0 0 3.038-1.523c.25-2.585-.426-4.824-1.784-6.81M6.007 9.8c-.592 0-1.081-.537-1.081-1.198S5.398 7.4 6.005 7.4s1.092.542 1.081 1.202c-.01.661-.476 1.198-1.08 1.198m3.986 0c-.592 0-1.08-.537-1.08-1.198S9.387 7.4 9.994 7.4s1.09.542 1.08 1.202c-.011.661-.476 1.198-1.08 1.198'] },
]

// "Cookie Settings" opens the consent manager on the live site, so it's a button there too
const LEGAL = [
  { label: 'Corporate', href: `${RSG}/corpinfo` },
  { label: 'Privacy', href: `${RSG}/privacy` },
  { label: 'Cookie Settings' },
  { label: 'Cookie Policy', href: `${RSG}/cookies` },
  { label: 'Legal', href: `${RSG}/legal` },
  { label: 'Do Not Sell or Share My Personal Information', href: `${RSG}/ccpa` },
]

// Rockstar "R*" mark, copied from the live site
function RockstarLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-[1.5em] flex-none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.46158 8.24829H9.43888C10.7887 8.24829 11.9568 7.83799 11.9568 6.33698C11.9568 5.14605 10.9311 4.89311 9.94489 4.89311H7.1748L6.46158 8.24829ZM18.252 16.2711H23L18.7152 19.2304L19.4081 23.8935L15.6956 21.0792L10.7134 24L13.0429 19.0576C13.0429 19.0576 10.3333 16.2384 10.3355 16.2384C10.1533 15.9985 10.0924 15.3804 10.0924 15.1145C10.0924 14.7783 10.114 14.4378 10.1369 14.0751C10.163 13.6619 10.1909 13.2199 10.1909 12.7227C10.1909 11.4958 9.64767 10.8542 8.31965 10.8542H5.82976L4.74562 15.9186H1L3.97871 2H11.0275C13.6468 2 15.646 2.64299 15.646 5.60795C15.646 7.69498 14.6166 9.17746 12.3456 9.48874V9.52873C13.4135 9.78202 13.8135 10.5027 13.8135 11.8459C13.8135 12.3821 13.7972 12.8526 13.7818 13.2953C13.7681 13.6882 13.7553 14.0592 13.7553 14.4344C13.7553 14.9154 13.8805 15.7015 14.196 16.2384H14.7164L17.4989 11.6004L18.252 16.2711ZM17.6626 16.9514H20.8136L17.9728 18.9127L18.4804 22.3323L15.747 20.2582L12.2768 22.2913L13.8654 18.9255L11.9338 16.9183H15.1096L17.1185 13.5697L17.6626 16.9514Z"
      />
    </svg>
  )
}

const link = 'outline-offset-2 focus-visible:outline-2 focus-visible:outline-white'
const small = 'text-[3vw] leading-[1.5] font-normal tracking-[-0.015em] md:text-[calc(var(--u)*0.75)]'

function Footer() {
  return (
    <div className="flex flex-col items-center gap-[8vw] pt-[10vw] pb-[20vw] md:gap-[calc(var(--u)*2)] md:pt-[calc(var(--u)*4)] md:pb-[calc(var(--u)*8)]">
      <img src={viLogo} alt="Grand Theft Auto VI" className="w-36 lg:w-[162px] fhd:w-45" />

      <footer className="flex w-full flex-col items-center gap-[8vw] px-[8vw] md:gap-[calc(var(--u)*2)] md:px-[7.5vw] lg:px-[10vw] hd:px-[13vw] fhd:px-[min(16vw,409.6px)]">
        {/* Newsletter pill: as wide as its content, up to the page margins. On phones it's a
            rounded box with the text stacked and centred. */}
        <button
          type="button"
          data-glow
          className={`flex max-w-[400px] cursor-pointer flex-wrap items-center justify-center gap-[2vw] rounded-2xl border border-white/20 px-[8vw] py-[6vw] text-[4vw] leading-[1.4] font-bold tracking-[-0.005em] transition-colors duration-200 ease-in-out hover:bg-white/5 md:max-w-full md:flex-nowrap md:gap-[calc(var(--u)*2.5)] md:rounded-full md:px-[calc(var(--u)*3)] md:py-[calc(var(--u)*1.5)] md:text-left md:text-(length:--u) ${link}`}
        >
          {/* The pill's text steps in px (16/18/20 and 14/15.75/17.5), measured; it doesn't follow --u */}
          <strong className="flex w-full flex-col items-center gap-[2vw] text-center text-base leading-normal font-bold uppercase md:w-auto md:flex-row md:gap-[0.75em] md:text-left lg:text-lg fhd:text-xl">
            <RockstarLogo />
            Get Rockstar Propaganda
          </strong>
          <span className="text-center text-sm leading-normal font-normal tracking-[-0.025em] md:max-w-[400px] md:text-left lg:max-w-[450px] lg:text-[15.75px] fhd:max-w-[500px] fhd:text-[17.5px]">
            Get the latest game announcements, updates on special events and offers, and much more from Rockstar Games.
          </span>
        </button>

        <nav aria-label="Rockstar Games" className="flex flex-col items-center gap-[2.5vw] md:gap-[calc(var(--u)*0.75)]">
          <ul className="flex">
            {SOCIALS.map(({ name, href, d, evenOdd }) => (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={name}
                  data-glow
                  className={`flex size-[12vw] items-center justify-center rounded-full text-[#ccc2f5] transition-colors duration-200 ease-in-out hover:bg-[#1f1f38] hover:text-[#e5ddff] md:size-[calc(var(--u)*3)] ${link}`}
                >
                  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="size-[5vw] md:size-[calc(var(--u)*1.25)]">
                    {d.map((path) => (
                      <path key={path} d={path} fillRule={evenOdd ? 'evenodd' : undefined} clipRule={evenOdd ? 'evenodd' : undefined} />
                    ))}
                  </svg>
                </a>
              </li>
            ))}
          </ul>

          <ul className="flex flex-wrap justify-center gap-x-[4vw] gap-y-[2vw] text-center md:gap-[calc(var(--u)*1.25)]">
            {LEGAL.map(({ label, href }) => (
              <li key={label}>
                {href ? (
                  <a href={href} target="_blank" rel="noreferrer" className={`block rounded-full text-[#ccc2f5] hover:underline ${small} ${link}`}>
                    {label}
                  </a>
                ) : (
                  <button type="button" className={`block cursor-pointer rounded-full text-[#ccc2f5] hover:underline ${small} ${link}`}>
                    {label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* ESRB rating: the badge is a fixed 48×72 at every width */}
        <a href="https://esrb.org" target="_blank" rel="noreferrer" aria-label="ESRB rating: Mature 17+" className={`flex w-[56vw] gap-[4vw] rounded md:w-[calc(var(--u)*22)] md:gap-(--u) ${link}`}>
          <img src={esrbMature} alt="" className="h-18 w-12 flex-none" />
          <span className={`flex flex-col gap-[3vw] md:gap-[calc(var(--u)*0.75)] ${small}`}>
            <span>Blood and Gore, Intense Violence, Mature Humor, Nudity, Strong Language, Strong Sexual Content, Use of Drugs and Alcohol.</span>
            <span aria-hidden="true" className="h-px bg-[#1f1f38]" />
            <span>In-Game Purchases.</span>
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Footer
