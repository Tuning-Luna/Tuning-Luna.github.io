/** Shared data types. UI renders these; descriptions come from i18n by project id. */

export interface Project {
  /** Stable id; also the i18n key suffix: projects.items.<id>.description */
  id: string
  name: string
  repoUrl: string
  /** Live demo / docs URL, if any */
  homepage?: string
  language: string
  stars: number
  forks: number
  archived?: boolean
}

export interface TechGroup {
  id: string
  items: string[]
}

export interface StatItem {
  id: string
  value: number | string
  /** i18n key suffix under activity.stats */
  labelKey: string
}
