import { useTranslation } from 'react-i18next'
import { profile } from '../data/profile'
import { LanguageToggle } from './LanguageToggle'
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
          <img
            className="appbar__avatar"
            src={profile.avatarUrl}
            alt=""
            width={32}
            height={32}
            referrerPolicy="no-referrer"
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
        </div>
      </div>
    </header>
  )
}
