import { useTranslation } from 'react-i18next'
import { Chip } from '../components/Chip'
import { Section } from '../components/Section'
import { techGroups } from '../data/tech'
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
                <Chip key={item} withCode={group.id === 'languages'}>
                  {item}
                </Chip>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
