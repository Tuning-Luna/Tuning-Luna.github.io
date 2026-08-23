import { useLayoutEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Chip } from '../components/Chip'
import { Section } from '../components/Section'
import { useTypewriter } from '../hooks/useTypewriter'
import './About.css'

/** Separator between the two intro paragraphs in the typewriter stream; never
 *  rendered — the paragraphs are sliced at it so p1 types fully, then p2.
 *  Built at runtime so no NUL byte sits in the source file. */
const P1_P2_SEPARATOR = String.fromCharCode(0)

export function About() {
  const { t } = useTranslation()
  const focus = t('about.focus', { returnObjects: true }) as string[]

  const text1 = t('about.p1')
  const text2 = t('about.p2')
  const { value } = useTypewriter(`${text1}${P1_P2_SEPARATOR}${text2}`, { intervalMs: 12 })

  // Reserve the paragraphs' final height up front (measured from a hidden
  // full-text clone) so typing never pushes the sections below down.
  const measureRef = useRef<HTMLDivElement>(null)
  const [minHeight, setMinHeight] = useState<number | undefined>(undefined)
  useLayoutEffect(() => {
    const measure = measureRef.current
    if (!measure) return
    const update = () => setMinHeight(measure.offsetHeight)
    update()
    // Re-measure on reflow (viewport resize, webfont load, language switch).
    const ro = new ResizeObserver(update)
    ro.observe(measure)
    return () => ro.disconnect()
  }, [text1, text2])

  const sep = value.indexOf(P1_P2_SEPARATOR)
  const p1 = sep === -1 ? value : value.slice(0, sep)
  const p2 = sep === -1 ? '' : value.slice(sep + 1)
  // The caret follows the typing position and stays at the end once done.
  const typingInP1 = sep === -1

  return (
    <Section id="about" eyebrow={t('about.eyebrow')} title={t('about.title')}>
      <div className="about__body">
        <div
          className="about__type"
          style={minHeight !== undefined ? { minHeight } : undefined}
        >
          {/* Hidden full-text clone used to measure the final height. */}
          <div className="about__type-measure" ref={measureRef} aria-hidden="true">
            <p className="about__p">{text1}</p>
            <p className="about__p">{text2}</p>
          </div>
          <p className="about__p">
            {p1}
            {typingInP1 && <span className="type-caret" aria-hidden="true" />}
          </p>
          <p className="about__p">
            {p2}
            {!typingInP1 && <span className="type-caret" aria-hidden="true" />}
          </p>
        </div>
        <div className="about__focus">
          <h3 className="about__focus-title">{t('about.focusTitle')}</h3>
          <div className="about__chips">
            {focus.map((item) => (
              <Chip key={item}>{item}</Chip>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
