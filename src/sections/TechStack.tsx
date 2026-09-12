import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Section } from '../components/Section'
import { techGroups } from '../data/tech'
import { TechChip } from './TechChip'
import './TechStack.css'

export function TechStack() {
  const { t } = useTranslation()

  return (
    <Section id="stack" eyebrow={t('stack.eyebrow')} title={t('stack.title')}>
      {/* One glass panel holds the whole stack (same pattern as Activity's
          stats card) — 35 chips spread bare over the backdrop read as a
          keyword dump and left this the only major section with no surface. */}
      <div className="glass-card stack">
        {/* Label and chip set are direct grid children so the five group titles
            share one label column and the chip sets line up. */}
        {techGroups.map((group) => (
          <Fragment key={group.id}>
            <h3 className="stack__group-title">{t(`stack.groups.${group.id}`)}</h3>
            <div className="chip-set">
              {group.items.map((item) => (
                <TechChip key={item} item={item} />
              ))}
            </div>
          </Fragment>
        ))}
      </div>
    </Section>
  )
}
