import { useTranslation } from 'react-i18next'
import { contributionCalendar } from '../data/contributions'
import './ContributionHeatmap.css'

/**
 * GitHub-style contribution heatmap for the last 12 months — a pure render of
 * the static snapshot in `src/data/contributions.ts` (regenerate it with
 * `npm run stats:fetch`). Weeks are column-major like GitHub's graph.
 */
export function ContributionHeatmap() {
  const { t } = useTranslation()

  return (
    <div
      className="glass-card heatmap"
      role="img"
      aria-label={`${contributionCalendar.total} ${t('activity.heatmapTitle')}`}
    >
      <div className="heatmap__header">
        <span className="heatmap__title">{t('activity.heatmapTitle')}</span>
        <span className="heatmap__total">{contributionCalendar.total}</span>
      </div>
      <div className="heatmap__grid">
        {contributionCalendar.weeks.flat().map((day) => (
          <span
            key={day.date}
            className={`heatmap__cell heatmap__cell--l${day.level}`}
            title={`${day.date} · ${day.count}`}
          />
        ))}
      </div>
    </div>
  )
}
