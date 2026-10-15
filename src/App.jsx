import { useState } from 'react'
import { useHeroIntro } from './animations/heroIntro'
import { useExtendedLookScroll } from './animations/extendedLook'
import { useFeaturesScroll } from './animations/features'
import { useHeroScroll } from './animations/heroScroll'
import { useViceCityScroll } from './animations/viceCity'
import CursorGlow from './components/CursorGlow'
import ExtendedLook from './components/ExtendedLook'
import Features from './components/Features'
import Hero from './components/Hero'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import ViceCity from './components/ViceCity'

// The page. `heroImages` swaps the hero's artwork (see heroImages.js); the /ai route passes the AI set.
function App({ heroImages }) {
  const [loading, setLoading] = useState(true)
  const [intro, setIntro] = useState(false)

  useHeroIntro(intro)
  useHeroScroll()
  useExtendedLookScroll()
  useViceCityScroll()
  useFeaturesScroll()

  return (
    <>
      {loading && (
        <Loader images="#hero img" onExit={() => setIntro(true)} onDone={() => setLoading(false)} />
      )}
      <CursorGlow />
      <Navbar />
      <main>
        <Hero images={heroImages} />
        <ExtendedLook />
        <ViceCity />
        <Features />
      </main>
    </>
  )
}

export default App
