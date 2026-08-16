import { useTranslation } from 'react-i18next'
import { profile, siteRepoUrl } from '../data/profile'
import { Icon } from './Icon'
import { LanguageToggle } from './LanguageToggle'
import { SmartImage } from './SmartImage'
import { ThemeToggle } from './ThemeToggle'
import './AppBar.css'

const NAV_ITEMS = [
  { id: 'about', key: 'nav.about' },
  // { id: 'page-views', key: 'nav.pageViews' },
  { id: 'projects', key: 'nav.projects' },
  // { id: 'now-playing', key: 'nav.nowPlaying' },
  { id: 'contact', key: 'nav.contact' },
  // { id: 'stack', key: 'nav.stack' },
  // { id: 'activity', key: 'nav.activity' },
] as const

export function AppBar() {
  const { t } = useTranslation()
  return (
    <header className="appbar">
      <div className="container appbar__inner">
        <a className="appbar__brand" href="#top">
          <SmartImage
            className="appbar__avatar"
            src={profile.avatarUrl}
            alt=""
            width={32}
            height={32}
            referrerPolicy="no-referrer"
            fallback={<Icon name="github" size={16} />}
          />
          <span className="appbar__name">{profile.name}</span>
        </a>
        <nav className="appbar__nav" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <a key={item.id} className="appbar__link" href={`#${item.id}`}>
              {t(item.key)}
            </a>
          ))}
        </nav>
        <div className="appbar__actions">
          <LanguageToggle />
          <ThemeToggle />
          <a className="m3-icon-button" href={siteRepoUrl} target="_blank" rel="noreferrer noopener" aria-label={t('a11y.repo')}>
            <Icon name="github" size={20} />
          </a>
        </div>
      </div>
    </header>
  )
}
