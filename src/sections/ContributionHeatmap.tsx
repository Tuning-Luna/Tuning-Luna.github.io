import { useState, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import type { ContributionDay } from '../types'
import { contributionCalendar } from '../data/contributions'
import './ContributionHeatmap.css'

/**
 * GitHub-style contribution heatmap for the last 12 months — a pure render of
 * the static snapshot in `src/data/contributions.ts` (regenerate it with
 * `npm run stats:fetch`). Weeks are column-major like GitHub's graph.
 */
export function ContributionHeatmap() {
  const { t } = useTranslation()
  const [hovered, setHovered] = useState<ContributionDay | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const handleCellEnter = useCallback((day: ContributionDay, el: HTMLElement) => {
    setHovered(day)
    const card = cardRef.current
    if (!card) return
    const cardRect = card.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()

    // Horizontal center of the cell, relative to the card.
    let x = elRect.left - cardRect.left + elRect.width / 2
    // Vertical position: cell top relative to the card.
    const y = elRect.top - cardRect.top

    // Initial set so the tooltip renders and we can measure its width.
    setTooltipPos({ x, y })

    // After the tooltip renders, clamp horizontal position so it stays inside
    // the card (with a small padding).
    requestAnimationFrame(() => {
      const tip = tooltipRef.current
      if (!tip || !card) return
      const tipWidth = tip.offsetWidth
      const cardWidth = card.clientWidth
      const half = tipWidth / 2
      const edgePad = 6
      const minX = half + edgePad
      const maxX = cardWidth - half - edgePad
      if (x < minX) x = minX
      if (x > maxX) x = maxX
      setTooltipPos((prev) => ({ ...prev, x }))
    })
  }, [])

  const handleCellLeave = useCallback(() => {
    setHovered(null)
  }, [])

  return (
    <div className="heatmap__wrapper">
      <div
        ref={cardRef}
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
            <button
              key={day.date}
              type="button"
              className={`heatmap__cell heatmap__cell--l${day.level}`}
              aria-label={`${day.count} ${t('activity.tooltipContributions')} ${t('activity.tooltipOn')} ${day.date}`}
              onMouseEnter={(e) => handleCellEnter(day, e.currentTarget)}
              onMouseLeave={handleCellLeave}
              onBlur={handleCellLeave}
            />
          ))}
        </div>
      </div>
      {/* Tooltip lives OUTSIDE the .heatmap card so it can never trigger a
          scrollbar on the card. It is positioned relative to the wrapper, using
          coordinates derived from the card's bounding rect. */}
      {hovered && (
        <div
          ref={tooltipRef}
          className="heatmap__tooltip glass-card"
          role="tooltip"
          style={{ '--tip-x': `${tooltipPos.x}px`, '--tip-y': `${tooltipPos.y}px` } as React.CSSProperties}
        >
          <span className="heatmap__tooltip-count">{hovered.count}</span>
          <span className="heatmap__tooltip-label">{t('activity.tooltipContributions')}</span>
          <span className="heatmap__tooltip-date">{hovered.date}</span>
        </div>
      )}
    </div>
  )
}
