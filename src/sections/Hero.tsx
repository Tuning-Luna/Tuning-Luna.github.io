import { useTranslation } from 'react-i18next'
import { Button } from '../components/Button'
import { profile } from '../data/profile'
import './Hero.css'

export function Hero() {
  const { t } = useTranslation()
  return (
    <section id="top" className="hero">
      <div className="container hero__inner">
        <img
          className="hero__avatar"
          src={profile.avatarUrl}
          alt={profile.name}
          width={120}
          height={120}
          referrerPolicy="no-referrer"
        />
        <h1 className="hero__name">{profile.name}</h1>
        <p className="hero__role">{t('hero.role')}</p>
        <p className="hero__tagline">{t('hero.tagline')}</p>
        <p className="hero__bio">{t('hero.bio')}</p>
        <div className="hero__actions">
          <Button href="#projects">{t('hero.ctaProjects')}</Button>
          <Button href={profile.githubUrl} variant="tonal">
            {t('hero.ctaGithub')}
          </Button>
        </div>
      </div>
    </section>
  )
}
