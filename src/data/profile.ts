/**
 * Public profile facts, all verifiable from
 * https://github.com/Tuning-Luna and the profile README.
 *
 * The numbers below are a snapshot retrieved on 2026-08-14 from the GitHub API.
 * They are intentionally static (a personal homepage has no runtime backend);
 * refresh them manually when they drift.
 */
export const profile = {
  name: 'Tuning-Luna',
  githubUrl: 'https://github.com/Tuning-Luna',
  gmailUrl: 'mailto:tuningluna1206@gmail.com',
  discordUrl: 'https://discord.com/users/1220524033955729428',
  telegramUrl: 'https://t.me/Bannister4529_bot',
  spotifyUrl: 'https://open.spotify.com/user/31d6ybszeq4mxs3khxyautsuexty',
  /** Page-view counter badge (count.getloli.com, Cloudflare-protected). */
  pageViewsUrl: 'https://count.getloli.com/get/@Tuning-Luna?theme=rule34',
  spotifyUid: '31d6ybszeq4mxs3khxyautsuexty',
  avatarUrl: 'https://github.com/Tuning-Luna.png?size=256',
  /** GitHub profile bio. */
  bio: "You Read My Bio. That's Enough Social Interaction For One Day.",
} as const

export const profileStats = {
  /** Sum of stars across non-fork public repositories. */
  totalStars: 110,
  publicRepos: 24,
  followers: 15,
  /** Total commit contributions (GitHub profile contribution graph), 2023–2026. */
  totalCommits: 401,
  /** Years with contributions, ascending. */
  contributionYears: ['2023', '2024', '2025', '2026'] as const,
} as const

export const siteUrl = 'https://tuning-luna.github.io'
