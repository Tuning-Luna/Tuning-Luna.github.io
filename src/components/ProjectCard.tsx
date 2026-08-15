import { useTranslation } from 'react-i18next'
import type { Project } from '../types'
import { Card } from './Card'
import { Chip } from './Chip'
import { Icon } from './Icon'
import './ProjectCard.css'

export function ProjectCard({ project }: { project: Project }) {
  const { t } = useTranslation()
  return (
    <Card className="project-card">
      <div className="project-card__head">
        <a
          className="project-card__name"
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer noopener"
        >
          {project.name}
        </a>
        {project.archived && (
          <span className="project-card__archived">{t('projects.archived')}</span>
        )}
      </div>
      <p className="project-card__desc">
        {t(`projects.items.${project.id}`)}
      </p>
      <div className="project-card__meta">
        <Chip>{project.language}</Chip>
        <span className="project-card__stats">
          <span className="project-card__stat" title={t('projects.stars')}>
            <Icon name="star" size={15} />
            {project.stars}
          </span>
          <span className="project-card__stat" title={t('projects.forks')}>
            <Icon name="fork" size={15} />
            {project.forks}
          </span>
        </span>
      </div>
      <div className="project-card__actions">
        <a
          className="project-card__link"
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer noopener"
        >
          {t('projects.repo')}
          <Icon name="external" size={14} />
        </a>
        {project.homepage && (
          <a
            className="project-card__link"
            href={project.homepage}
            target="_blank"
            rel="noreferrer noopener"
          >
            {t('projects.homepage')}
            <Icon name="external" size={14} />
          </a>
        )}
      </div>
    </Card>
  )
}
