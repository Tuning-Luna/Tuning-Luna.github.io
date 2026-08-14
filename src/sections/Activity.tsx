import { useTranslation } from 'react-i18next'
import { Chip } from '../components/Chip'
import { Section } from '../components/Section'
import { Stat } from '../components/Stat'
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
        <Stat value={profileStats.totalStars} label={t('activity.stats.totalStars')} />
        <Stat value={profileStats.publicRepos} label={t('activity.stats.publicRepos')} />
        <Stat value={profileStats.followers} label={t('activity.stats.followers')} />
        <Stat value={profileStats.totalCommits} label={t('activity.stats.totalCommits')} />
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
