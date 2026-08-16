import { useEffect, useState } from 'react'

/** Offset from the viewport top at which a section counts as "current" —
  matches the global `scroll-padding-top` (4xl + 2xl) so a clicked nav link
  lights up exactly when its anchor settles below the sticky app bar. */
const ACTIVATION_OFFSET = 96

/**
 * Tracks which page section the reader is currently in, for nav highlighting.
 *
 * A section becomes active once its top edge crosses the activation offset;
  the last section is pinned once the page is scrolled to the bottom so short
  final sections still highlight. Recomputed on scroll/resize via rAF, and the
  `ids` array must be stable (module-level) to avoid re-subscribing listeners.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (ids.length === 0) return
    let raf = 0

    const measure = () => {
      raf = 0
      let current: string | null = null
      // `ids` is in page order, so the last match wins.
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= ACTIVATION_OFFSET) current = id
      }
      if (
        current !== ids[ids.length - 1] &&
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      ) {
        current = ids[ids.length - 1]
      }
      setActive((prev) => (prev === current ? prev : current))
    }

    const schedule = () => {
      if (raf === 0) raf = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (raf !== 0) cancelAnimationFrame(raf)
    }
  }, [ids])

  return active
}
