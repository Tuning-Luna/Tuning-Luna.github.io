import { useTranslation } from 'react-i18next'
import { Chip } from '../components/Chip'
import { Section } from '../components/Section'
import { Stat } from '../components/Stat'
import { contributionCalendar } from '../data/contributions'
import { profileStats } from '../data/profile'
import './Activity.css'

export function Activity() {
  const { t } = useTranslation()

  return (
    <Section
      id="activity"
      eyebrow={t('activity.eyebrow')}
      title={t('activity.title')}
      subtitle={t('activity.subtitle')}
    >
      <div className="activity__stats">
        <Stat icon="star" value={profileStats.totalStars} label={t('activity.stats.totalStars')} />
        <Stat icon="folder" value={profileStats.publicRepos} label={t('activity.stats.publicRepos')} />
        <Stat icon="people" value={profileStats.followers} label={t('activity.stats.followers')} />
        <Stat icon="commit" value={profileStats.totalCommits} label={t('activity.stats.totalCommits')} />
      </div>

      <div
        className="activity__heatmap"
        role="img"
        aria-label={`${contributionCalendar.total} ${t('activity.heatmapTitle')}`}
      >
        <div className="activity__heatmap-header">
          <span className="activity__heatmap-title">{t('activity.heatmapTitle')}</span>
          <span className="activity__heatmap-total">{contributionCalendar.total}</span>
        </div>
        <div className="activity__heatmap-grid">
          {contributionCalendar.weeks.flat().map((day) => (
            <span
              key={day.date}
              className={`activity__cell activity__cell--l${day.level}`}
              title={`${day.date} · ${day.count}`}
            />
          ))}
        </div>
      </div>

      <div className="activity__years">
        <span className="activity__years-label">{t('activity.yearsLabel')}</span>
        <div className="activity__year-chips">
          {profileStats.contributionYears.map((year) => (
            <Chip key={year}>{year}</Chip>
          ))}
        </div>
      </div>

      <p className="activity__note">{t('activity.note')}</p>
    </Section>
  )
}
