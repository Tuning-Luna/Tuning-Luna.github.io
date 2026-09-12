import { useTranslation } from 'react-i18next'
import type { Project } from '../types'
import { handleSpotlight } from '../hooks/useSpotlight'
import { Card } from '../components/Card'
import { Chip } from '../components/Chip'
import { Icon } from '../components/Icon'
import './ProjectCard.css'

export function ProjectCard({ project }: { project: Project }) {
  const { t } = useTranslation()
  return (
    <Card className="project-card spotlight" onMouseMove={handleSpotlight}>
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
        {/* Zero counts say nothing, so they are omitted rather than shown as a
            bare "0". The label lives in visually-hidden text: `title` on a
            non-interactive span is unreachable by touch and keyboard, and the
            icon is aria-hidden, so the number would otherwise be announced
            alone. */}
        <span className="project-card__stats">
          {project.stars > 0 && (
            <span className="project-card__stat">
              <Icon name="star" size={15} />
              {project.stars}
              <span className="visually-hidden">{t('projects.stars')}</span>
            </span>
          )}
          {project.forks > 0 && (
            <span className="project-card__stat">
              <Icon name="fork" size={15} />
              {project.forks}
              <span className="visually-hidden">{t('projects.forks')}</span>
            </span>
          )}
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
