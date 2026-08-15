import { useTranslation } from 'react-i18next'
import { Icon, type IconName } from '../components/Icon'
import { Section } from '../components/Section'
import { profile } from '../data/profile'
import { handleSpotlight } from '../hooks/useSpotlight'
import './Contact.css'

interface ContactLink {
  id: string
  href: string
  icon: IconName
}

const LINKS: ContactLink[] = [
  { id: 'github', href: profile.githubUrl, icon: 'github' },
  { id: 'gmail', href: profile.gmailUrl, icon: 'gmail' },
  { id: 'discord', href: profile.discordUrl, icon: 'discord' },
  { id: 'spotify', href: profile.spotifyUrl, icon: 'spotify' },
] as const

export function Contact() {
  const { t } = useTranslation()

  return (
    <Section
      id="contact"
      eyebrow={t('contact.eyebrow')}
      title={t('contact.title')}
      subtitle={t('contact.subtitle')}
    >
      <div className="contact__links">
        {LINKS.map((link) => (
          <a
            key={link.id}
            className="contact__card spotlight"
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
            onMouseMove={handleSpotlight}
          >
            <Icon name={link.icon} size={28} />
            <span className="contact__card-label">{t(`contact.${link.id}.label`)}</span>
            <span className="contact__card-desc">{t(`contact.${link.id}.desc`)}</span>
          </a>
        ))}
      </div>
    </Section>
  )
}
