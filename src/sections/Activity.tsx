import { useTranslation } from 'react-i18next'
import { Chip } from '../components/Chip'
import { Section } from '../components/Section'
import { Stat } from '../components/Stat'
import { profileStats, snapshotDate } from '../data/stats'
import { ContributionHeatmap } from './ContributionHeatmap'
import './Activity.css'

export function Activity() {
  const { t } = useTranslation()

  return (
    <Section id="activity" eyebrow={t('activity.eyebrow')} title={t('activity.title')}>
      <div className="glass-card activity__stats">
        <Stat icon="star" value={profileStats.totalStars} label={t('activity.stats.totalStars')} />
        <Stat icon="folder" value={profileStats.publicRepos} label={t('activity.stats.publicRepos')} />
        <Stat icon="people" value={profileStats.followers} label={t('activity.stats.followers')} />
        <Stat icon="commit" value={profileStats.totalCommits} label={t('activity.stats.totalCommits')} />
      </div>

      <ContributionHeatmap />

      <div className="activity__years">
        <span className="activity__years-label">{t('activity.yearsLabel')}</span>
        <div className="activity__year-chips">
          {profileStats.contributionYears.map((year) => (
            <Chip key={year}>{year}</Chip>
          ))}
        </div>
      </div>

      <p className="activity__note">{t('activity.note', { date: snapshotDate })}</p>
    </Section>
  )
}
