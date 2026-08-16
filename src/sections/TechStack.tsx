import { useTranslation } from 'react-i18next'
import { Section } from '../components/Section'
import { techGroups } from '../data/tech'
import { TechChip } from './TechChip'
import './TechStack.css'

export function TechStack() {
  const { t } = useTranslation()

  return (
    <Section
      id="stack"
      eyebrow={t('stack.eyebrow')}
      title={t('stack.title')}
      subtitle={t('stack.subtitle')}
    >
      <div className="stack">
        {techGroups.map((group) => (
          <div className="stack__group" key={group.id}>
            <h3 className="stack__group-title">{t(`stack.groups.${group.id}`)}</h3>
            <div className="stack__chips">
              {group.items.map((item) => (
                <TechChip key={item} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
