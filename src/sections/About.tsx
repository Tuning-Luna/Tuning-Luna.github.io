import { useTranslation } from 'react-i18next'
import { Chip } from '../components/Chip'
import { Section } from '../components/Section'
import './About.css'

export function About() {
  const { t } = useTranslation()
  const focus = t('about.focus', { returnObjects: true }) as string[]

  return (
    <Section id="about" eyebrow={t('about.eyebrow')} title={t('about.title')}>
      <div className="about__body">
        <p className="about__p">{t('about.p1')}</p>
        <p className="about__p">{t('about.p2')}</p>
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
