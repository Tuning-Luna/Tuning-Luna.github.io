/**
 * Hand-maintained profile facts (URLs, bio), all verifiable from
 * https://github.com/Tuning-Luna and the profile README.
 *
 * API-derived numbers (stars, repos, followers, commits) do NOT live here —
 * they are generated into src/data/stats.ts by `npm run stats:fetch`.
 */
export const profile = {
  name: 'Tuning-Luna',
  githubUrl: 'https://github.com/Tuning-Luna',
  gmailUrl: 'mailto:tuningluna1206@gmail.com',
  discordUrl: 'https://discord.com/users/1220524033955729428',
  telegramUrl: 'https://t.me/Bannister4529_bot',
  spotifyUrl: 'https://open.spotify.com/user/31d6ybszeq4mxs3khxyautsuexty',
  bilibiliUrl: 'https://space.bilibili.com/416066123',
  blogUrl: 'https://tuning-luna.github.io/blog/',
  /** Page-view counter badge (count.getloli.com, Cloudflare-protected). */
  pageViewsUrl: 'https://count.getloli.com/get/@Tuning-Luna?theme=rule34',
  spotifyUid: '31d6ybszeq4mxs3khxyautsuexty',
  avatarUrl: 'https://github.com/Tuning-Luna.png?size=256',
  /** GitHub profile bio. */
  bio: "You Read My Bio. That's Enough Social Interaction For One Day.",
} as const

export const siteUrl = 'https://tuning-luna.github.io'

/** This site's own repository, linked from the app bar. */
export const siteRepoUrl = 'https://github.com/Tuning-Luna/Tuning-Luna.github.io'
