import { useEffect, useMemo, useState } from 'react'

export interface UseTypewriterResult {
  /** The visible prefix of `text` revealed so far (or the full text). */
  value: string
  /** True once the whole string has been revealed (or reduced motion). */
  done: boolean
}

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Types out `text` one character at a time, starting after `startDelayMs`.
 * Respects `prefers-reduced-motion`: with it enabled the full string is
 * returned immediately and never animated.
 *
 * When `text` changes (e.g. a language switch) the behaviour depends on whether
 * typing had already finished: if it had, the new text is shown in full without
 * re-typing; if it was still in progress, the new text types from scratch.
 */
export function useTypewriter(
  text: string,
  { intervalMs = 24, startDelayMs = 300 }: { intervalMs?: number; startDelayMs?: number } = {},
): UseTypewriterResult {
  const prefersReducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia(REDUCED_MOTION_QUERY).matches,
    [],
  )

  // Reset progress when `text` changes — React's documented "adjust state
  // during render" pattern, so the reset happens without an effect. If the old
  // text had fully typed out, jump straight to the full new text instead of
  // re-animating it.
  const [count, setCount] = useState(0)
  const [prevText, setPrevText] = useState(text)
  if (prevText !== text) {
    const wasDone = count >= prevText.length
    setPrevText(text)
    setCount(wasDone ? text.length : 0)
  }

  useEffect(() => {
    if (prefersReducedMotion || text.length === 0) return

    let interval: ReturnType<typeof setInterval> | undefined
    const stop = () => {
      if (interval !== undefined) window.clearInterval(interval)
    }
    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setCount((c) => {
          if (c >= text.length) {
            stop()
            return c
          }
          return c + 1
        })
      }, intervalMs)
    }, startDelayMs)
    return () => {
      window.clearTimeout(timeout)
      stop()
    }
  }, [text, intervalMs, startDelayMs, prefersReducedMotion])

  const done = prefersReducedMotion || count >= text.length
  return { value: done ? text : text.slice(0, count), done }
}
