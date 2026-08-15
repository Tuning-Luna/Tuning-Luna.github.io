import { useTranslation } from 'react-i18next'
import { Section } from '../components/Section'
import { profile } from '../data/profile'
import './PageViews.css'

export function PageViews() {
  const { t } = useTranslation()

  return (
    <Section id="page-views" eyebrow={t('pageViews.eyebrow')} title={t('pageViews.title')}>
      <div className="page-views">
        <img
          className="page-views__badge"
          src={profile.pageViewsUrl}
          alt={t('pageViews.alt')}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Graceful fallback: hide the badge (and its broken-image icon) if
            // the counter service is unreachable.
            e.currentTarget.style.display = 'none'
          }}
        />
      </div>
    </Section>
  )
}
