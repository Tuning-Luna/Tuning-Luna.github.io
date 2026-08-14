import { useCallback, useEffect, useState } from 'react'

export type ThemeMode = 'system' | 'light' | 'dark'

const STORAGE_KEY = 'tuning-luna-theme'

function getInitialMode(): ThemeMode {
  if (typeof window === 'undefined') return 'system'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark' || stored === 'system') return stored
  return 'system'
}

/** Reflects the active mode on <html data-theme> and on the <meta name="theme-color">. */
function applyMode(mode: ThemeMode) {
  const root = document.documentElement
  if (mode === 'system') {
    root.removeAttribute('data-theme')
  } else {
    root.setAttribute('data-theme', mode)
  }
  // The background token resolves to whichever theme is active (light or dark),
  // so the browser chrome color can be read straight from the computed styles.
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
  if (meta) {
    const bg = getComputedStyle(root)
      .getPropertyValue('--md-sys-color-background')
      .trim()
    meta.setAttribute('content', bg || '#ffffff')
  }
}

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>(getInitialMode)

  useEffect(() => {
    applyMode(mode)
    window.localStorage.setItem(STORAGE_KEY, mode)
    // Keep the browser-chrome color accurate when the OS theme flips in system mode.
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => mode === 'system' && applyMode(mode)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [mode])

  const cycle = useCallback(() => {
    setMode((m) => (m === 'system' ? 'light' : m === 'light' ? 'dark' : 'system'))
  }, [])

  return { mode, setMode, cycle }
}
