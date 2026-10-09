import { useState } from 'react'
import { useHeroIntro } from './animations/heroIntro'
import { useHeroScroll } from './animations/heroScroll'
import CursorGlow from './components/CursorGlow'
import Hero from './components/Hero'
import Loader from './components/Loader'
import Navbar from './components/Navbar'

function App() {
  const [loading, setLoading] = useState(true)
  const [intro, setIntro] = useState(false)

  useHeroIntro(intro)
  useHeroScroll()

  return (
    <>
      {loading && (
        <Loader images="#hero img" onExit={() => setIntro(true)} onDone={() => setLoading(false)} />
      )}
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        {/* Placeholder until the next section is built. Like the live site's next section it starts
            under the pinned hero (a third of a screen down) and holds in place while it fades in. */}
        <section className="relative mt-[-66.667vh] h-[200vh]">
          <div data-scroll="next" className="sticky top-0 flex h-dvh items-center justify-center">
            <h2 className="text-[6vw] uppercase md:text-[calc(var(--u)*1.5)]">Next section</h2>
          </div>
        </section>
      </main>
    </>
  )
}

export default App
