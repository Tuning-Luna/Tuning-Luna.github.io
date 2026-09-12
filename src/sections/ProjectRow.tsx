import { useTranslation } from 'react-i18next'
import type { Project } from '../types'
import './ProjectRow.css'

/**
 * One course/small project as a compact list row.
 *
 * The row renders a single link to the repository and the CSS stretches its hit
 * area over the whole row, so the hover tint is a true affordance rather than a
 * suggestion (previously only the repository name was clickable).
 */
export function ProjectRow({ project }: { project: Project }) {
  const { t } = useTranslation()

  return (
    <li className="project-row">
      <a
        className="project-row__name"
        href={project.repoUrl}
        target="_blank"
        rel="noreferrer noopener"
      >
        {project.name}
      </a>
      <span className="project-row__desc">{t(`projects.items.${project.id}`)}</span>
      {/* Language and archived share one grid column: as four separate children
          the archived badge wrapped onto a second row and landed under the
          repository name. */}
      <span className="project-row__meta">
        <span className="project-row__lang">{project.language}</span>
        {project.archived && (
          <span className="project-row__archived">{t('projects.archived')}</span>
        )}
      </span>
    </li>
  )
}
