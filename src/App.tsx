import { useEffect } from 'react'
import { AppBar } from './components/AppBar'
import { Footer } from './components/Footer'
import { handleSpotlight } from './hooks/useSpotlight'
import { About } from './sections/About'
// import { Activity } from './sections/Activity'
import { Contact } from './sections/Contact'
import { Hero } from './sections/Hero'
import { NowPlaying } from './sections/NowPlaying'
import { Projects } from './sections/Projects'
// import { TechStack } from './sections/TechStack'

export default function App() {
  // Scroll-reveal: sections start faded/raised and animate in when they enter
  // the viewport (`.m3-section.pre-reveal`, see Section.css).
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const sections = document.querySelectorAll<HTMLElement>('.m3-section')
    sections.forEach((el) => el.classList.add('pre-reveal'))
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.remove('pre-reveal')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.08 },
    )
    sections.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      {/* Fixed blurred background image + theme-tinted mask (see global.css). */}
      <div className="site-bg" aria-hidden="true" />
      <AppBar />
      {/* Split layout: fixed hero panel on the right, scrolling content on the left. */}
      <div className="layout">
        <aside className="layout__hero" onMouseMove={handleSpotlight}>
          <Hero />
        </aside>
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
      </div>
    </>
  )
}
