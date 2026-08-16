/**
 * GitHub account stats — GENERATED FILE, do not edit by hand.
 *
 * Regenerate with `npm run stats:fetch` (scripts/fetch-stats.mts), which
 * queries the GitHub API through the authenticated gh CLI and rewrites this
 * file and src/data/contributions.ts in place. Hand-maintained profile facts
 * (URLs, bio) live separately in src/data/profile.ts.
 */

/** ISO date the snapshots below (and contributions.ts) were retrieved. */
export const snapshotDate = '2026-08-17'

export const profileStats = {
  /** Sum of stars across non-fork public repositories. */
  totalStars: 111,
  publicRepos: 24,
  followers: 15,
  /** Total commit contributions (GitHub profile contribution graph), 2023–2026. */
  totalCommits: 1103,
  /** Years with contributions, ascending. */
  contributionYears: ['2023', '2024', '2025', '2026'] as const,
} as const
