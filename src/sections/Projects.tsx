import { useTranslation } from 'react-i18next'
import { Button } from '../components/Button'
import { ProjectCard } from '../components/ProjectCard'
import { Section } from '../components/Section'
import { featuredProjects } from '../data/projects'
import {courseProjects} from '../data/projects'
import { profile } from '../data/profile'
import './Projects.css'

export function Projects() {
  const { t } = useTranslation()

  return (
    <Section id="projects" eyebrow={t('projects.eyebrow')}>
      <h3 className="projects__subhead">{t('projects.featuredTitle')}</h3>
      <div className="projects__grid">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <h3 className="projects__subhead">{t('projects.moreTitle')}</h3>
      <ul className="projects__list">
        {courseProjects.map((project) => (
          <li key={project.id} className="projects__row">
            <a
              className="projects__row-name"
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              {project.name}
            </a>
            <span className="projects__row-desc">
              {t(`projects.items.${project.id}`)}
            </span>
            <span className="projects__row-lang">{project.language}</span>
            {project.archived && (
              <span className="projects__row-archived">{t('projects.archived')}</span>
            )}
          </li>
        ))}
      </ul> 

      <div className="projects__viewall">
        <Button href={`${profile.githubUrl}?tab=repositories`} variant="text">
          {t('projects.viewAll')}
        </Button>
      </div>
    </Section>
  )
}
