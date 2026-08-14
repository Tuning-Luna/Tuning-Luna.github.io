/**
 * Tech stack, self-reported on the GitHub profile README
 * (skillicons.dev list) and cross-checked against repository topics/descriptions.
 * Group titles are translated via i18n under `tech.groups.<id>`.
 */
import type { TechGroup } from '../types'

export const techGroups: TechGroup[] = [
  {
    id: 'languages',
    items: ['C', 'C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'SQL'],
  },
  {
    id: 'frontend',
    items: ['Vue', 'React', 'Next.js', 'Vite', 'UniApp', 'Element Plus'],
  },
  {
    id: 'backend',
    items: ['Node.js', 'Express', 'NestJS', 'Spring Boot', 'FastAPI'],
  },
  {
    id: 'databases',
    items: ['MySQL', 'SQLite', 'Redis'],
  },
  {
    id: 'tools',
    items: [
      'Git',
      'Linux',
      'Debian',
      'Nginx',
      'Docker',
      'Electron',
      'Tauri',
      'Bun',
      'npm',
      'PowerShell',
      'Neovim',
      'Markdown',
    ],
  },
]
