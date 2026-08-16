import { useState, type ImgHTMLAttributes, type ReactNode } from 'react'
import './SmartImage.css'

type LoadStatus = 'loading' | 'loaded' | 'error'

interface SmartImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Rendered over the reserved image box when the source fails to load (or
   *  is absent) — typically an `Icon` on a tonal container. */
  fallback?: ReactNode
}

/**
 * An `<img>` that owns its load state: a pulsing skeleton while the source is
 * fetching, a short fade-in once it arrives, and an optional `fallback`
 * overlay when loading fails (remote images — GitHub avatars, third-party
 * cards — can be slow or unreachable). Keeps the caller's `className` on the
 * wrapper, so existing sizing / shape / hover styles keep working; the inner
 * media element fills the wrapper and reserves its aspect-ratio box via the
 * `width`/`height` attributes, so neither state causes layout shift.
 *
 * The status is derived from which src has loaded or failed, so a `src`
 * change (e.g. switching tracks) reverts to the skeleton with no effect
 * bookkeeping. `onLoad` / `onError` are handled internally.
 */
export function SmartImage({ src, alt = '', fallback, className, ...rest }: SmartImageProps) {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null)
  const [failedSrc, setFailedSrc] = useState<string | null>(null)

  const status: LoadStatus =
    !src || failedSrc === src ? 'error' : loadedSrc === src ? 'loaded' : 'loading'

  const statusClass =
    status === 'loading' ? 'm3-img--loading' : status === 'loaded' ? 'm3-img--loaded' : 'm3-img--error'

  return (
    <span
      className={['m3-img', statusClass, className].filter(Boolean).join(' ')}
      aria-busy={status === 'loading'}
    >
      <img
        className="m3-img__media"
        src={src}
        alt={alt}
        decoding="async"
        {...rest}
        onLoad={() => {
          if (src) setLoadedSrc(src)
        }}
        onError={() => {
          if (src) setFailedSrc(src)
        }}
      />
      {status === 'error' && (
        <span
          className="m3-img__fallback"
          role={alt ? 'img' : undefined}
          aria-label={alt || undefined}
          aria-hidden={alt ? undefined : true}
        >
          {fallback}
        </span>
      )}
    </span>
  )
}
