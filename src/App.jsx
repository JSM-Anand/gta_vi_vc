import { useState } from 'react'
import { useHeroIntro } from './animations/heroIntro'
import { useExtendedLookScroll } from './animations/extendedLook'
import { useFeaturesScroll } from './animations/features'
import { useHeroScroll } from './animations/heroScroll'
import { useUltimateEditionScroll } from './animations/ultimateEdition'
import { useViceCityScroll } from './animations/viceCity'
import CursorGlow from './components/CursorGlow'
import ExtendedLook from './components/ExtendedLook'
import Features from './components/Features'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import News from './components/News'
import Shop from './components/Shop'
import UltimateEdition from './components/UltimateEdition'
import ViceCity from './components/ViceCity'

// The page. Copy lives in content.js, artwork in art.js and assets/hero.
function App() {
  const [loading, setLoading] = useState(true)
  const [intro, setIntro] = useState(false)

  useHeroIntro(intro)
  useHeroScroll()
  useExtendedLookScroll()
  useUltimateEditionScroll()
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
        <Hero />
        <ExtendedLook />
        <UltimateEdition />
        <ViceCity />
        <Features />
        <Shop />
        <News />
      </main>
      <Footer />
    </>
  )
}

export default App
