import { useState } from 'react'
import { useHeroIntro } from './animations/heroIntro'
import { useExtendedLookScroll } from './animations/extendedLook'
import { useHeroScroll } from './animations/heroScroll'
import CursorGlow from './components/CursorGlow'
import ExtendedLook from './components/ExtendedLook'
import Hero from './components/Hero'
import Loader from './components/Loader'
import Navbar from './components/Navbar'

function App() {
  const [loading, setLoading] = useState(true)
  const [intro, setIntro] = useState(false)

  useHeroIntro(intro)
  useHeroScroll()
  useExtendedLookScroll()

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
      </main>
    </>
  )
}

export default App
