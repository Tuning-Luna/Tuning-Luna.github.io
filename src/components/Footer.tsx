import { useTranslation } from 'react-i18next'
import { snapshotDate } from '../data/stats'
import { profile } from '../data/profile'
import './Footer.css'

export function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="m3-footer">
      <div className="container m3-footer__inner">
        <p className="m3-footer__line">© {new Date().getFullYear()} {profile.name}</p>
        <p className="m3-footer__line">
          {t('footer.builtWith')} · {t('footer.snapshotNote', { date: snapshotDate })}
        </p>
      </div>
    </footer>
  )
}
