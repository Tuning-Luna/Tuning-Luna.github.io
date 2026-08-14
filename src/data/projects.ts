/**
 * Open-source projects, from the public repos of https://github.com/Tuning-Luna.
 *
 * Star/fork counts are a snapshot retrieved 2026-08-14 from the GitHub API and
 * only cover repositories owned by the account (forks are excluded — e.g.
 * survive-hfut.github.io and Hello-CTF are upstream forks, not the user's work).
 * Descriptions live in the i18n locale files under `projects.items.<id>`.
 */
import type { Project } from '../types'

export const featuredProjects: Project[] = [
  {
    id: 'hfut-xc-study-things',
    name: 'HFUT_XC_Study_Things',
    repoUrl: 'https://github.com/Tuning-Luna/HFUT_XC_Study_Things',
    homepage: 'https://tuning-luna.github.io/HFUT_XC_Study_Things/',
    language: 'C++',
    stars: 77,
    forks: 4,
  },
  {
    id: 'github-avatar-generator',
    name: 'github-avatar-generator',
    repoUrl: 'https://github.com/Tuning-Luna/github-avatar-generator',
    homepage: 'https://tuning-luna.github.io/github-avatar-generator/',
    language: 'JavaScript',
    stars: 11,
    forks: 1,
  },
  {
    id: 'kards-scraper',
    name: 'kards-decks-collection-scraper',
    repoUrl: 'https://github.com/Tuning-Luna/kards-decks-collection-scraper',
    language: 'Python',
    stars: 8,
    forks: 0,
  },
  {
    id: 'hfut-xc-login-reverse',
    name: 'hfut-xc-login-reverse',
    repoUrl: 'https://github.com/Tuning-Luna/hfut-xc-login-reverse',
    language: 'Python',
    stars: 5,
    forks: 0,
  },
  {
    id: 'tuning-bao',
    name: 'tuning-bao',
    repoUrl: 'https://github.com/Tuning-Luna/tuning-bao',
    language: 'Vue',
    stars: 5,
    forks: 1,
  },
  {
    id: 'tenant-hub',
    name: 'tenant-hub',
    repoUrl: 'https://github.com/Tuning-Luna/tenant-hub',
    language: 'TypeScript',
    stars: 0,
    forks: 0,
  },
]

/** Course-design and other smaller projects, shown as a compact list. */
export const courseProjects: Project[] = [
  {
    id: 'react-message-board',
    name: 'react-message-board',
    repoUrl: 'https://github.com/Tuning-Luna/react-message-board',
    language: 'TypeScript',
    stars: 0,
    forks: 0,
  },
  {
    id: 'question-bank-management-system',
    name: 'question-bank-management-system',
    repoUrl: 'https://github.com/Tuning-Luna/question-bank-management-system',
    language: 'Vue',
    stars: 0,
    forks: 0,
  },
  {
    id: 'movie-recommender',
    name: 'movie-recommender',
    repoUrl: 'https://github.com/Tuning-Luna/movie-recommender',
    language: 'Python',
    stars: 0,
    forks: 0,
  },
  {
    id: 'my-new-tab-html',
    name: 'my-new-tab-html',
    repoUrl: 'https://github.com/Tuning-Luna/my-new-tab-html',
    language: 'Vue',
    stars: 0,
    forks: 0,
  },
  {
    id: 'hairdressing-member-manager-system',
    name: 'hairdressing-member-manger-system',
    repoUrl: 'https://github.com/Tuning-Luna/hairdressing-member-manger-system',
    language: 'Vue',
    stars: 0,
    forks: 1,
  },
  {
    id: 'class-quiz-system',
    name: 'class-quiz-system',
    repoUrl: 'https://github.com/Tuning-Luna/class-quiz-system',
    language: 'C++',
    stars: 1,
    forks: 0,
  },
  {
    id: 'sky-takeout',
    name: 'sky-takeout',
    repoUrl: 'https://github.com/Tuning-Luna/sky-takeout',
    language: 'Java',
    stars: 0,
    forks: 0,
    archived: true,
  },
]
