import { useTranslation } from 'react-i18next'
import { Button } from '../components/Button'
import { MiniPlayer } from '../components/MiniPlayer'
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
          width={128}
          height={128}
          referrerPolicy="no-referrer"
        />
        <h1 className="hero__name">{profile.name}</h1>
        <p className="hero__bio">{t('hero.bio')}</p>
        <div className="hero__actions">
          <Button href="#projects">{t('hero.ctaProjects')}</Button>
          <Button href={profile.githubUrl} variant="tonal">
            {t('hero.ctaGithub')}
          </Button>
          <Button href={profile.telegramUrl} variant="tonal">
            {t('hero.ctaTelegram')}
          </Button>
        </div>
        <MiniPlayer />
      </div>
    </section>
  )
}
