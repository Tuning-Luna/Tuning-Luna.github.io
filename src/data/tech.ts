/**
 * Tech stack, self-reported on the GitHub profile README
 * (skillicons.dev list) and cross-checked against repository topics/descriptions.
 * Group titles are translated via i18n under `tech.groups.<id>`.
 *
 * Every item MUST be a key of the glyph table in ./techIcons.ts — `TechItem` is
 * derived from that table's keys, so a typo here fails `tsc -b` instead of
 * silently rendering a chip with no icon.
 */
import type { TechItem } from './techIcons'

export interface TechGroup {
  id: string
  items: TechItem[]
}

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
