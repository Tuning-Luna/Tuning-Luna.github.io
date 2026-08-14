import { useTranslation } from 'react-i18next'
import { Icon, type IconName } from '../components/Icon'
import { Section } from '../components/Section'
import { profile } from '../data/profile'
import './Contact.css'

interface ContactLink {
  id: string
  href: string
  icon: IconName
}

const LINKS: ContactLink[] = [
  { id: 'github', href: profile.githubUrl, icon: 'github' },
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
            className="contact__card"
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
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
