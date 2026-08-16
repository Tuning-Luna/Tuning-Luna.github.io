# AGENTS.md

Guidance for AI coding agents working in this repository. See also `CLAUDE.md` (same content, Claude Code flavor).

## Project

Tuning-Luna's personal homepage — a static single-page site served from GitHub Pages at <https://tuning-luna.github.io/>. Built with **React 19 + Vite 8 + TypeScript 6**, styled with **Material Design 3** tokens plus Glassmorphism, bilingual (Chinese & English). No runtime backend; all content is static data + i18n.

## Commands

```sh
npm run dev          # Vite dev server
npm run build        # typecheck (tsc -b) then production build to dist/
npm run typecheck    # TypeScript only
npm run lint         # ESLint
npm run check:i18n   # en/zh locale key parity + project description key check
npm run stats:fetch  # regenerate src/data/stats.ts + contributions.ts from the GitHub API (needs gh auth)
npm run preview      # serve the built dist/
npm run theme:gen    # regenerate src/theme/colors.css from seed color #18F741 (override: SEED_COLOR=#hex)
```

- There are **no tests**. Verification is `lint` + `typecheck` + `check:i18n` + manual visual check in the dev server.
- CI (`.github/workflows/deploy.yml`) runs lint, check:i18n, and build on every push to `main`, then deploys `dist/` to GitHub Pages. `dist/` is gitignored.

## Architecture

### i18n-first content
All user-facing text lives in `src/i18n/locales/en.ts` and `src/i18n/locales/zh.ts` as nested TS objects with **mirrored keys**. Components never hardcode display strings. `src/data/projects.ts` stores only structured facts; project descriptions live under `projects.items.<id>` in the locale files. Any new key must be added to **both** locales — `check:i18n` fails otherwise. English is the default regardless of browser language.

### Static data snapshots
Two kinds, kept apart on purpose: **generated** (`src/data/stats.ts` account stats, `src/data/contributions.ts` 12-month contribution calendar — rewritten in place by `npm run stats:fetch`; never edit by hand) and **hand-maintained** (`src/data/profile.ts` URLs/bio, `src/data/projects.ts` star/fork counts). Intentionally not live — no runtime backend. Forks are excluded everywhere. The i18n snapshot note interpolates `snapshotDate` from `stats.ts`, so regeneration needs no locale edits.

### Design system (M3 tokens)
- `src/theme/tokens.css` — static M3 tokens (type, shape, elevation, spacing, motion, glass tokens `--md-glass-*`).
- `src/theme/colors.css` — **auto-generated** by `scripts/gen-theme.mjs`. Do not edit by hand; change the seed and run `npm run theme:gen`, then commit.
- `src/theme/base.css` — reset, base styles, fixed blurred `.site-bg`, scrollbar.
- `src/theme/layout.css` — the split layout and its sticky rails.
- `src/theme/utilities.css` — `.container`, `.visually-hidden`, `.spotlight`, and the shared `.glass-card` frosted-surface recipe.
- Components read everything from these CSS variables — no hard-coded colors or dimensions in component styles.
- `design-system/` (gitignored, local-only) is a portable snapshot of this design system — theme CSS, the M3 primitives, shared hooks and docs. **Any change to `src/theme/`, the M3 primitives in `src/components/`, or a hook mirrored in `design-system/hooks/` must be synced to its `design-system/` counterpart (plus the relevant `AGENT-GUIDE.md` / `docs/` sections) in the same task**; append a dated line to the sync log in `design-system/AGENT-GUIDE.md` §17.

### Theme & language persistence
`src/hooks/useTheme.ts` cycles system → light → dark (default **dark**), persists to localStorage key `tuning-luna-theme`; language persists to `tuning-luna-lang`. An inline `<script>` in `index.html` applies both saved prefs **before first paint** — if you rename those localStorage keys, update the inline script too.

### Layout & sections
`src/App.tsx` composes the page: fixed `.site-bg` → `AppBar` → split layout (above 1200px: two sticky 360px frosted-glass asides — Hero on the left, the PageViews/NowPlaying/MiniPlayer widgets on the right — with the scrolling content column between them; below 1200px: single column, hero → widgets → content). Grids inside `.layout__content` use **container queries**, not viewport media queries. Scroll-reveal is the `useScrollReveal` hook (`src/hooks/`) toggling `.pre-reveal` on `.m3-section`. Sections live in `src/sections/`; section-specific widgets and data snapshots sit beside their consumers (e.g. `TechChip.tsx` + `techIcons.ts`, `contributions.ts` for the Activity heatmap). Section-specific widgets (`MiniPlayer`, `ProjectCard`) live in `src/sections/` beside their consumers; `src/components/` holds the reusable M3 primitives (Button, Card, Chip, Icon, IconButton, Section, Slider, SmartImage, Stat) plus the app chrome (AppBar, Footer, LanguageToggle, ThemeToggle), all with colocated CSS (`.css` beside each `.tsx`). MiniPlayer is purely presentational — its audio engine (states, fades, volume persistence) is the headless `src/hooks/useAudioPlayer.ts`. `Section.tsx` is the shared wrapper (eyebrow + title + subtitle). Remote or slow-loading images (GitHub avatar, third-party cards/covers) go through `SmartImage` — skeleton while loading, tonal fallback on error — never a bare `<img>`.

## Conventions

- TypeScript uses `verbatimModuleSyntax` — use `import type` for type-only imports; `noUnusedLocals` / `noUnusedParameters` are on.
- Fonts load from CDNs in `index.html` (jsDelivr, ZeoSeven). **Do not add Google Fonts** — blocked in mainland China. CJK text falls back to system fonts.
- `base: '/'` in `vite.config.ts` is correct for a GitHub Pages *user* site; a project site would need `/<repo-name>/`.
