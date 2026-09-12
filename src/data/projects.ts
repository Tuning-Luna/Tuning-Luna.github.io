/**
 * Which repositories are listed on the site — a hand-made editorial choice.
 *
 * Entries carry identity only (id, name, URL, optional demo link). Every
 * volatile fact — stars, forks, language, archived — is joined in from the
 * generated ./repoStats.ts, so a listing can no longer drift away from what
 * GitHub actually reports. Forks are excluded there, not here: an upstream fork
 * is not the account's own work.
 *
 * Descriptions live in the i18n locale files under `projects.items.<id>`.
 *
 * `as const` is load-bearing: it keeps each `name` a literal type, so the join
 * below type-checks against the generated table's keys. Curating a repository
 * that the snapshot does not contain is then a `tsc -b` failure rather than a
 * card that silently renders without its numbers.
 */
import { repoStats } from './repoStats'
import type { CuratedProject, Project } from '../types'

/** A curated entry whose `name` is known to exist in the generated table. */
type CuratedRepo = CuratedProject & { name: keyof typeof repoStats }

const featured = [
  {
    id: 'hfut-xc-study-things',
    name: 'HFUT_XC_Study_Things',
    repoUrl: 'https://github.com/Tuning-Luna/HFUT_XC_Study_Things',
    homepage: 'https://tuning-luna.github.io/HFUT_XC_Study_Things/',
  },
  {
    id: 'github-avatar-generator',
    name: 'github-avatar-generator',
    repoUrl: 'https://github.com/Tuning-Luna/github-avatar-generator',
    homepage: 'https://tuning-luna.github.io/github-avatar-generator/',
  },
  {
    id: 'kards-scraper',
    name: 'kards-decks-collection-scraper',
    repoUrl: 'https://github.com/Tuning-Luna/kards-decks-collection-scraper',
  },
  {
    id: 'hfut-xc-login-reverse',
    name: 'hfut-xc-login-reverse',
    repoUrl: 'https://github.com/Tuning-Luna/hfut-xc-login-reverse',
  },
  {
    id: 'tuning-bao',
    name: 'tuning-bao',
    repoUrl: 'https://github.com/Tuning-Luna/tuning-bao',
  },
  {
    id: 'tenant-hub',
    name: 'tenant-hub',
    repoUrl: 'https://github.com/Tuning-Luna/tenant-hub',
  },
] as const satisfies readonly CuratedProject[]

/** Course-design and other smaller projects, shown as a compact list. */
const course = [
  {
    id: 'react-message-board',
    name: 'react-message-board',
    repoUrl: 'https://github.com/Tuning-Luna/react-message-board',
  },
  {
    id: 'question-bank-management-system',
    name: 'question-bank-management-system',
    repoUrl: 'https://github.com/Tuning-Luna/question-bank-management-system',
  },
  {
    id: 'movie-recommender',
    name: 'movie-recommender',
    repoUrl: 'https://github.com/Tuning-Luna/movie-recommender',
  },
  {
    id: 'my-new-tab-html',
    name: 'my-new-tab-html',
    repoUrl: 'https://github.com/Tuning-Luna/my-new-tab-html',
  },
  {
    id: 'hairdressing-member-manager-system',
    name: 'hairdressing-member-manger-system',
    repoUrl: 'https://github.com/Tuning-Luna/hairdressing-member-manger-system',
  },
  {
    id: 'class-quiz-system',
    name: 'class-quiz-system',
    repoUrl: 'https://github.com/Tuning-Luna/class-quiz-system',
  },
  {
    id: 'sky-takeout',
    name: 'sky-takeout',
    repoUrl: 'https://github.com/Tuning-Luna/sky-takeout',
  },
] as const satisfies readonly CuratedProject[]

/**
 * Joins one curated entry with its generated stats.
 *
 * The lookup is type-checked, so the `!stat` branch is unreachable once
 * `tsc -b` passes. It is still reachable under `vite dev`, `tsx` and
 * `check:i18n`, all of which strip types without checking them — i.e. when a
 * newly curated repository has not been regenerated yet. Failing loudly beats
 * rendering a card with no numbers.
 */
function withStats(entry: CuratedRepo): Project {
  const stat = repoStats[entry.name]
  if (!stat) {
    throw new Error(
      `projects.ts: no generated stats for "${entry.name}" — run \`npm run stats:fetch\` to refresh src/data/repoStats.ts`,
    )
  }
  return { ...entry, ...stat }
}

export const featuredProjects: Project[] = featured.map(withStats)
export const courseProjects: Project[] = course.map(withStats)
