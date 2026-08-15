import { useTranslation } from 'react-i18next'
import { Button } from '../components/Button'
import { Icon } from '../components/Icon'
import { MiniPlayer } from '../components/MiniPlayer'
import { Stat } from '../components/Stat'
import { profile, profileStats } from '../data/profile'
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
        <div className="hero__stats">
          <Stat value={profileStats.publicRepos} label={t('hero.stats.repos')} />
          <Stat value={profileStats.totalStars} label={t('hero.stats.stars')} />
          <Stat value={profileStats.followers} label={t('hero.stats.followers')} />
        </div>
        <div className="hero__actions">
          <Button href={profile.githubUrl} variant="tonal">
            <Icon name="github" size={16} />
            {t('hero.ctaGithub')}
          </Button>
          <Button href={profile.telegramUrl} variant="tonal">
            <Icon name="telegram" size={16} />
            {t('hero.ctaTelegram')}
          </Button>
          <Button href="#projects">{t('hero.ctaProjects')}</Button>
        </div>
        <MiniPlayer />
      </div>
    </section>
  )
}
