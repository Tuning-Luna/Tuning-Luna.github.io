import { AppBar } from './components/AppBar'
import { Footer } from './components/Footer'
import { About } from './sections/About'
// import { Activity } from './sections/Activity'
import { Contact } from './sections/Contact'
import { Hero } from './sections/Hero'
import { NowPlaying } from './sections/NowPlaying'
import { Projects } from './sections/Projects'
// import { TechStack } from './sections/TechStack'

export default function App() {
  return (
    <>
      {/* Fixed blurred background image + theme-tinted mask (see global.css). */}
      <div className="site-bg" aria-hidden="true" />
      <AppBar />
      {/* Split layout: fixed hero panel on the right, scrolling content on the left. */}
      <div className="layout">
        <div className="layout__content">
          <main>
            <About />
            {/* <TechStack /> */}
            <Projects />
            {/* <Activity /> */}
            <NowPlaying />
            <Contact />
          </main>
          <Footer />
        </div>
        <aside className="layout__hero">
          <Hero />
        </aside>
      </div>
    </>
  )
}
