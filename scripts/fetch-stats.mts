/**
 * Regenerates the GitHub data snapshots:
 *   src/data/stats.ts          — account stats (stars/repos/followers/commits)
 *   src/data/contributions.ts  — 12-month contribution calendar
 *
 * Run: npm run stats:fetch   (requires the gh CLI, authenticated)
 *
 * Reads the GitHub REST + GraphQL APIs with the token from `gh auth token`.
 * The site itself stays backend-free: this is a dev-time generator only.
 */
import { execFileSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const LOGIN = 'Tuning-Luna'
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const API = 'https://api.github.com'

/** Heatmap levels: quartiles of the nonzero counts (kept in sync with the
 *  header comment in the generated contributions.ts). */
const level = (count: number): 0 | 1 | 2 | 3 | 4 =>
  count === 0 ? 0 : count === 1 ? 1 : count <= 3 ? 2 : count <= 5 ? 3 : 4

function ghToken(): string {
  try {
    return execFileSync('gh', ['auth', 'token'], { encoding: 'utf8' }).trim()
  } catch {
    throw new Error('gh CLI not available or not authenticated — run `gh auth login` first.')
  }
}

const token = ghToken()

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'tuning-luna-stats-fetch',
      ...init?.headers,
    },
  })
  if (!res.ok) throw new Error(`GitHub API ${res.status} on ${path}: ${await res.text()}`)
  return (await res.json()) as T
}

interface GhUser {
  login: string
  followers: number
  public_repos: number
  created_at: string
}

interface GhRepo {
  stargazers_count: number
  fork: boolean
}

const user = await api<GhUser>('/user')

// Owner repos (public and private alike); forks are not the user's own work.
let stars = 0
for (let page = 1; ; page++) {
  const repos = await api<GhRepo[]>(
    `/users/${LOGIN}/repos?per_page=100&page=${page}&type=owner`,
  )
  for (const repo of repos) if (!repo.fork) stars += repo.stargazers_count
  if (repos.length < 100) break
}

// Per-year contribution totals, from the account's first year to now.
const firstYear = Number(user.created_at.slice(0, 4))
const currentYear = new Date().getUTCFullYear()
const yearTotals = new Map<number, number>()
for (let year = firstYear; year <= currentYear; year++) {
  const data = await api<{ data: { user: { contributionsCollection: { contributionCalendar: { totalContributions: number } } } } }>(
    '/graphql',
    {
      method: 'POST',
      body: JSON.stringify({
        query: `query($from: DateTime!, $to: DateTime!) {
          user(login: "${LOGIN}") {
            contributionsCollection(from: $from, to: $to) {
              contributionCalendar { totalContributions }
            }
          }
        }`,
        variables: {
          from: `${year}-01-01T00:00:00Z`,
          to: `${year + 1}-01-01T00:00:00Z`,
        },
      }),
    },
  )
  yearTotals.set(year, data.data.user.contributionsCollection.contributionCalendar.totalContributions)
}
const activeYears = [...yearTotals.entries()].filter(([, total]) => total > 0).map(([year]) => year)
const totalCommits = [...yearTotals.values()].reduce((a, b) => a + b, 0)

// Last-12-months calendar for the heatmap.
const cal = await api<{ data: { user: { contributionsCollection: { contributionCalendar: {
  totalContributions: number
  weeks: { contributionDays: { date: string; contributionCount: number } }[]
} } } } }>('/graphql', {
  method: 'POST',
  body: JSON.stringify({
    query: `query {
      user(login: "${LOGIN}") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks { contributionDays { date contributionCount } }
          }
        }
      }
    }`,
  }),
})
const calendar = cal.data.user.contributionsCollection.contributionCalendar

// Local date (YYYY-MM-DD) — the snapshot marker should match the day the
// maintainer actually ran the script, not the UTC clock.
const date = new Date().toLocaleDateString('en-CA')
const firstDay = calendar.weeks[0].contributionDays[0].date
const lastDay = calendar.weeks.at(-1)!.contributionDays.at(-1)!.date

const statsTs = `/**
 * GitHub account stats — GENERATED FILE, do not edit by hand.
 *
 * Regenerate with \`npm run stats:fetch\` (scripts/fetch-stats.mts), which
 * queries the GitHub API through the authenticated gh CLI and rewrites this
 * file and src/data/contributions.ts in place. Hand-maintained profile facts
 * (URLs, bio) live separately in src/data/profile.ts.
 */

/** ISO date the snapshots below (and contributions.ts) were retrieved. */
export const snapshotDate = '${date}'

export const profileStats = {
  /** Sum of stars across non-fork public repositories. */
  totalStars: ${stars},
  publicRepos: ${user.public_repos},
  followers: ${user.followers},
  /** Total commit contributions (GitHub profile contribution graph), ${firstYear}–${currentYear}. */
  totalCommits: ${totalCommits},
  /** Years with contributions, ascending. */
  contributionYears: [${activeYears.map((y) => `'${y}'`).join(', ')}] as const,
} as const
`

const weeksBlock = calendar.weeks
  .map(
    (week) =>
      '  [\n' +
      week.contributionDays
        .map(
          (day) =>
            `    { date: '${day.date}', count: ${day.contributionCount}, level: ${level(day.contributionCount)} },`,
        )
        .join('\n') +
      '\n  ],',
  )
  .join('\n')
const contributionsTs = `/**
 * GitHub contribution calendar snapshot (last 12 months, ${firstDay} → ${lastDay}),
 * retrieved ${date} via the GraphQL contributionsCollection API
 * (npm run stats:fetch regenerates it).
 *
 * Weeks are column-major like GitHub's graph: weeks[i] is a Sun-Sat column.
 * Each day is { date, count, level }; levels are quartiles of the nonzero
 * counts: 0 none, 1 one, 2 two-three, 3 four-five, 4 six-plus.
 */
import type { ContributionDay } from '../types'

export const contributionCalendar = {
  retrievedAt: '${date}',
  /** Contributions inside the calendar window. */
  total: ${calendar.totalContributions},
  weeks: [
${weeksBlock}
  ] as ContributionDay[][],
} as const
`

writeFileSync(resolve(ROOT, 'src/data/stats.ts'), statsTs)
writeFileSync(resolve(ROOT, 'src/data/contributions.ts'), contributionsTs)

console.log(
  `stats.ts: ${stars} stars, ${user.public_repos} repos, ${user.followers} followers, ${totalCommits} commits (${firstYear}–${currentYear})`,
)
console.log(
  `contributions.ts: ${calendar.totalContributions} contributions, ${calendar.weeks.length} weeks (${firstDay} → ${lastDay})`,
)
