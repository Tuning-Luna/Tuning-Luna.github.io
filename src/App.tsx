import { AppBar } from './components/AppBar'
import { Footer } from './components/Footer'
import { handleSpotlight } from './hooks/useSpotlight'
import { useScrollReveal } from './hooks/useScrollReveal'
import { About } from './sections/About'
import { Activity } from './sections/Activity'
import { Contact } from './sections/Contact'
import { Hero } from './sections/Hero'
import { MiniPlayer } from './sections/MiniPlayer'
import { NowPlaying } from './sections/NowPlaying'
import { PageViews } from './sections/PageViews'
import { Projects } from './sections/Projects'
import { TechStack } from './sections/TechStack'

export default function App() {
  useScrollReveal()

  return (
    <>
      {/* Fixed blurred background image + theme-tinted mask (see base.css). */}
      <div className="site-bg" aria-hidden="true" />
      <AppBar />
      {/* Symmetric fixed rails: Hero on the left, the PageViews/NowPlaying/
          MiniPlayer widgets in their own glass card on the right, content
          scrolling between them. Each is a separate element — no nesting. */}
      <div className="layout">
        <aside className="layout__hero" onMouseMove={handleSpotlight}>
          <Hero />
        </aside>
        <div className="layout__content">
          <main>
            <About />
            <TechStack />
            <Projects />
            <Activity />
            <Contact />
          </main>
          <Footer />
        </div>
        <aside className="layout__widgets" onMouseMove={handleSpotlight}>
          <PageViews />
          <NowPlaying />
          <MiniPlayer />
        </aside>
      </div>
    </>
  )
}
