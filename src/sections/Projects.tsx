import { useTranslation } from 'react-i18next'
import { Button } from '../components/Button'
import { Section } from '../components/Section'
import { profile } from '../data/profile'
import { courseProjects, featuredProjects } from '../data/projects'
import { ProjectCard } from './ProjectCard'
import { ProjectRow } from './ProjectRow'
import './Projects.css'

export function Projects() {
  const { t } = useTranslation()

  return (
    <Section
      id="projects"
      eyebrow={t('projects.eyebrow')}
      title={t('projects.title')}
    >
      <h3 className="projects__subhead">{t('projects.featuredTitle')}</h3>
      <div className="projects__grid">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <h3 className="projects__subhead">{t('projects.moreTitle')}</h3>
      {/* One glass panel rather than seven glass rows: the frosted material
          stays on the featured cards, so "glass = featured" reads as the
          section's hierarchy instead of being everywhere. */}
      <div className="glass-card projects__more">
        <ul className="projects__list">
          {courseProjects.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </ul>
      </div>

      <div className="projects__viewall">
        <Button href={`${profile.githubUrl}?tab=repositories`} variant="text">
          {t('projects.viewAll')}
        </Button>
      </div>
    </Section>
  )
}
