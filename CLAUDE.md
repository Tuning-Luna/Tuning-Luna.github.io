# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Tuning-Luna's personal homepage — a static single-page site served from GitHub Pages at <https://tuning-luna.github.io/>. Built with **React 19 + Vite 8 + TypeScript 6**, styled with **Material Design 3** design tokens plus **Glassmorphism** surfaces, and bilingual (Chinese & English). There is no runtime backend; all content is static data + i18n.

## Commands

```sh
npm run dev          # Vite dev server
npm run build        # typecheck (tsc -b) then production build to dist/
npm run typecheck    # TypeScript only
npm run lint         # ESLint
npm run check:i18n   # en/zh locale key parity + project description key check
npm run preview      # serve the built dist/
npm run theme:gen    # regenerate src/theme/colors.css from a seed color
```

- There are **no tests**. Verification is `lint` + `typecheck` (part of `build`) + `check:i18n` + a manual visual check in the dev server.
- `npm run theme:gen` uses seed color `#18F741` by default; override with `SEED_COLOR=#hex`.
- CI (`.github/workflows/deploy.yml`) runs `lint`, `check:i18n`, and `build` on every push to `main`, then deploys `dist/` to GitHub Pages. `dist/` is gitignored (build artifact).

## Architecture

### Content is i18n-first
All user-facing text lives in `src/i18n/locales/en.ts` and `src/i18n/locales/zh.ts` as nested TS objects with **mirrored keys**. Components never hardcode display strings. `src/data/projects.ts` stores only structured facts; each project's description lives under `projects.items.<id>` in the locale files. Adding a label or project means adding keys to **both** locales — `check:i18n` (run in CI) fails on any mismatch. English is the default regardless of browser language.

### Static data snapshots
`src/data/profile.ts` (profile facts, `profileStats`) and `src/data/projects.ts` (star/fork counts) are **static snapshots** of GitHub API data, timestamped in their header comments (retrieved 2026-08-14). They are intentionally not live — refresh the numbers manually when they drift. `projects.ts` only lists account-owned repos (forks excluded) and `profile.ts` documents each figure's source.

### Design system (M3 tokens)
- `src/theme/tokens.css` — static M3 spec tokens: type scale, shape, elevation, spacing, motion, plus the glassmorphism tokens (`--md-glass-*`: blur, saturate, opacity, border, highlight).
- `src/theme/colors.css` — **auto-generated** M3 color roles (light + dark) from a seed color by `scripts/gen-theme.mjs` (via `@material/material-color-utilities`). Do not edit by hand — change the seed and run `npm run theme:gen`, then commit.
- `src/theme/global.css` — reset, base styles, fixed blurred `.site-bg`, and the layout.
- Components read everything from these CSS variables — no hard-coded colors or dimensions in component styles.

### Theme & language persistence
`src/hooks/useTheme.ts` cycles system → light → dark (default **dark**), persists to localStorage key `tuning-luna-theme`, and reflects the active mode via `data-theme` on `<html>` plus the `<meta name="theme-color">`. `src/i18n/index.ts` persists the choice to `tuning-luna-lang`. The inline `<script>` in `index.html` applies both saved prefs **before first paint** to avoid a light/Chinese flash — if you rename those localStorage keys, update the inline script too.

### Layout
`src/App.tsx` composes: fixed `.site-bg` → `AppBar` → a split layout. Above 1000px a sticky frosted-glass `aside.layout__hero` (360px) holds the Hero on the right while content scrolls on the left; below 1000px it falls back to a single column with the hero on top. Grids inside `.layout__content` size themselves with **container queries** (`container-type: inline-size`), not viewport media queries. Scroll-reveal is an IntersectionObserver in `App.tsx` that toggles `.pre-reveal` on `.m3-section` elements. Some sections (`Activity`, `TechStack`) are commented out in `App.tsx` but still present on disk.

### Sections & components
Sections live in `src/sections/` and are individually imported in `App.tsx`. Reusable M3 components live in `src/components/` with **colocated CSS** (a `.css` beside each `.tsx`). `Section.tsx` is the shared wrapper (eyebrow + title + subtitle) and is what marks an element `.m3-section` for the scroll-reveal. The cursor halo on "personal" cards is `handleSpotlight` (`src/hooks/useSpotlight.ts`) writing `--spot-x` / `--spot-y`, consumed by the `.spotlight` CSS.

## Conventions

- TypeScript config uses `verbatimModuleSyntax` — use `import type` for type-only imports; `noUnusedLocals` and `noUnusedParameters` are on.
- Fonts are loaded from CDNs in `index.html` (jsDelivr for Manrope/Inter, ZeoSeven for Maple Mono NF CN). **Do not add Google Fonts** — they are blocked in mainland China. CJK text intentionally falls back to system fonts.
- `base: '/'` in `vite.config.ts` is correct because this is a GitHub Pages *user* site (`<username>.github.io`); a project site would need `/<repo-name>/`.
