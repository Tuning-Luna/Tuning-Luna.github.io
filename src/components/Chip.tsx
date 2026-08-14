import type { HTMLAttributes } from 'react'
import './Chip.css'

interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  /** Optional leading code icon. */
  withCode?: boolean
}

/** M3 assist chip — used for tags and tech names. */
export function Chip({ withCode, className, children, ...rest }: ChipProps) {
  return (
    <span className={['m3-chip', className].filter(Boolean).join(' ')} {...rest}>
      {withCode && <span className="m3-chip__code" aria-hidden="true">&lt;/&gt;</span>}
      {children}
    </span>
  )
}
