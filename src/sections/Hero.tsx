import { useTranslation } from 'react-i18next'
import { Button } from '../components/Button'
import { Icon } from '../components/Icon'
import { SmartImage } from '../components/SmartImage'
// import { Stat } from '../components/Stat'
import { profile } from '../data/profile'
// import { profileStats } from '../data/stats'
import './Hero.css'

export function Hero() {
  const { t } = useTranslation()
  return (
    <section id="top" className="hero">
      <div className="container hero__inner">
        <SmartImage
          className="hero__avatar"
          src={profile.avatarUrl}
          alt={profile.name}
          width={120}
          height={120}
          referrerPolicy="no-referrer"
          fallback={<Icon name="github" size={48} />}
        />
        <h1 className="hero__name">{profile.name}</h1>
        <p className="hero__bio">{t('hero.bio')}</p>
        {/* <div className="hero__stats">
          <Stat value={profileStats.publicRepos} label={t('hero.stats.repos')} />
          <Stat value={profileStats.totalStars} label={t('hero.stats.stars')} />
          <Stat value={profileStats.followers} label={t('hero.stats.followers')} />
        </div> */}
        <div className="hero__actions">
          <Button href={profile.githubUrl} variant="tonal">
            <Icon name="github" size={16} />
            {t('hero.ctaGithub')}
          </Button>
          <Button href={profile.gmailUrl} variant="tonal">
            <Icon name="gmail" size={16} />
            {t('hero.ctaGmail')}
          </Button>
          <Button href={profile.discordUrl} variant="tonal">
            <Icon name="discord" size={16} />
            {t('hero.ctaDiscord')}
          </Button>
          <Button href={profile.telegramUrl} variant="tonal">
            <Icon name="telegram" size={16} />
            {t('hero.ctaTelegram')}
          </Button>
          <Button href={profile.spotifyUrl} variant="tonal">
            <Icon name="spotify" size={16} />
            {t('hero.ctaSpotify')}
          </Button>
          <Button href={profile.bilibiliUrl} variant="tonal">
            <Icon name="bilibili" size={16} />
            {t('hero.ctaBilibili')}
          </Button>
          <Button href={profile.blogUrl} variant="tonal">
            <Icon name="blog" size={16} />
            {t('hero.ctaBlog')}
          </Button>
          <Button href="#projects">{t('hero.ctaProjects')}</Button>
        </div>
      </div>
    </section>
  )
}
