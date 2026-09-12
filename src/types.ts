/** Shared data types. UI renders these; descriptions come from i18n by project id. */

/** One repository's live GitHub numbers — generated into src/data/repoStats.ts. */
export interface RepoStat {
  stars: number
  forks: number
  language: string
  archived: boolean
}

/**
 * A repository listed on the site: the hand-picked identity from
 * src/data/projects.ts joined with the generated snapshot above. Because
 * `stars`/`language`/`archived` come from the API rather than from a hand-typed
 * copy, they cannot drift away from what GitHub actually reports.
 */
export interface Project extends RepoStat {
  /** Stable id; also the i18n key for the description: projects.items.<id> */
  id: string
  /** Repository name on GitHub — the key into the generated repoStats table. */
  name: string
  repoUrl: string
  /** Live demo / docs URL, if any */
  homepage?: string
}

/** The hand-picked part of a listing, before its generated stats are joined in. */
export type CuratedProject = Omit<Project, keyof RepoStat>

export interface ContributionDay {
  /** ISO date, e.g. 2026-08-17 */
  date: string
  count: number
  /** Quartile of the nonzero counts: 0 none … 4 six-plus */
  level: 0 | 1 | 2 | 3 | 4
}
