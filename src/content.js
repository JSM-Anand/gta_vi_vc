// Everything the portfolio says, in one place. Sections read their copy, links and artwork from here;
// layout, colours and motion stay in the components. Jarvis is a sample persona; the copy is Jarvis's
// own voice (first person). Every link is a placeholder (`href: null` renders a button, `'#'` a link that goes nowhere yet).
import { ART } from './art'

export const PROFILE = {
  name: 'Jarvis',
  role: 'Creative Developer',
  city: 'Miami, FL',
}

export const HERO = {
  status: ['Launch sites for', 'games, music & brands'],
  cta: 'Hire Me',
  facts: ['Miami & remote', 'Booking April 2027'],
}

// The live site's "Launch Trailer": one pinned scene, then three cards
export const SHOWREEL = {
  eyebrow: 'Watch',
  title: 'Showreel 2026',
  art: ART.scene,
  alt: 'A couple by a red muscle car on a palm-lined street at sunset',
  dialog: {
    title: 'Showreel 2026',
    body: 'The 2026 reel is in the edit and releases in early 2027. In the meantime, the case studies below walk through recent launches.',
    close: 'Close',
  },
  // Long titles take the live site's smaller "An Extended Look" size (`long`)
  cards: [
    { eyebrow: 'EV Launch', title: 'Neon Drive', art: ART.trailer1, href: null },
    { eyebrow: 'Record Label', title: 'Low Tide Records', long: true, art: ART.extendedLook, href: null },
    { eyebrow: 'Game Launch', title: 'Ocean Avenue', art: ART.trailer2, href: null },
  ],
}

// The live site's "Ultimate Edition" and "Vintage Vice City Pack" cards
export const SERVICES = {
  label: 'Ways to work with me',
  backdrop: ART.backdrop,
  backdropMobile: ART.backdropMobile,
  cards: [
    {
      title: 'Launch Sites',
      body: 'Strategy, design and development for a game, album or product launch, from the first storyboard to go-live. Typically six to eight weeks.',
      cta: 'Start a Project',
      art: ART.ultimate,
      mobileArt: ART.ultimateMobile,
      box: ART.ultimateBox,
      boxLabel: 'JARVIS STUDIO',
    },
    {
      eyebrow: 'For existing sites',
      title: ['Motion &', 'Interaction'],
      body: 'Scroll-driven storytelling, transitions and micro-interactions added to the site you already have, without a rebuild. Typically two to three weeks.',
      cta: 'See What’s Included',
      art: ART.vintage,
      mobileArt: ART.vintageMobile,
    },
  ],
}

// The live site's "Vice City, USA."
export const ABOUT = {
  title: 'Jarvis, Miami.',
  body: 'I’m an independent creative developer, and for eight years I’ve been building launch sites for game studios, record labels and consumer brands. I work directly with design and marketing teams and take each project from storyboard to production code, with motion tuned frame by frame and pages that stay fast on any device.',
}

// Feature cards. `image` is a Cloudinary public ID, cropped per layout in Features.jsx.
export const SKILLS = {
  label: 'What I do',
  cards: [
    {
      eyebrow: 'Motion',
      title: 'Scroll-Driven Storytelling',
      body: 'Pinned scenes, scrubbed video, canvas and WebGL, built with GSAP and tuned frame by frame against the design.',
      cta: 'View Case Studies',
      image: 'v1791951674/saoijl3xv1pymvgl9yhm',
    },
    {
      eyebrow: 'Engineering',
      title: 'Front-End Engineering',
      body: 'React, Vite and Tailwind CSS, with performance budgets, accessibility and reduced-motion support built in from day one.',
      cta: 'See the Stack',
      image: 'v1791951960/yef2z4tdg5i4yraf3bua',
    },
    {
      eyebrow: 'Recognition',
      title: 'Awards & Speaking',
      body: 'Six Site of the Day awards, features in design publications, and talks on motion and performance at front-end conferences.',
      cta: 'See Awards',
      image: 'v1791952047/tg77xwan0btlw6fdx9aj',
    },
  ],
}

// The live site's "Shop"
export const WORK = {
  title: 'Selected Work',
  link: 'View All',
  href: '#',
  cards: [
    { eyebrow: 'Featured · E-commerce', title: 'Palm Co. Summer Drop: Sold Out in 52 Minutes', cta: 'View Project', art: ART.merch, href: null },
    { eyebrow: 'Archive', title: '40+ Launches Since 2018', cta: 'Browse the Archive', art: ART.archive, href: null },
  ],
}

// The live site's "Featured News"
export const WRITING = {
  title: 'Writing & Talks',
  link: 'View all',
  href: '#',
  articles: [
    { title: 'Measure, Don’t Guess: Rebuilding a Launch Site Frame by Frame', date: '2026-11-03', art: ART.newsTrailer, href: null },
    { title: 'Designing a Launch Page Before the Footage Exists', date: '2026-10-21', art: ART.newsStills, href: null },
    { title: 'Talk: Motion That Doesn’t Cost Performance', date: '2026-10-08', art: ART.newsRadio, href: null },
  ],
}

export const FOOTER = {
  contact: {
    title: 'Start a Project',
    body: 'Booking new projects from April 2027. Share a brief and I’ll reply within two working days.',
  },
  socials: ['X', 'Instagram', 'YouTube', 'GitHub', 'LinkedIn', 'TikTok'].map((name) => ({ name, href: '#' })),
  links: ['Email', 'Résumé', 'Press Kit', 'Privacy'].map((label) => ({ label, href: '#' })),
  credits: [
    '© 2026 Jarvis Studio. All rights reserved.',
    'Design inspired by the Grand Theft Auto VI website. Fan-made; not affiliated with or endorsed by Rockstar Games.',
  ],
}
