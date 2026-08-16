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

export interface ContributionDay {
  /** ISO date, e.g. 2026-08-17 */
  date: string
  count: number
  /** Quartile of the nonzero counts: 0 none … 4 six-plus */
  level: 0 | 1 | 2 | 3 | 4
}
