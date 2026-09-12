import type { HTMLAttributes } from 'react'
import './Chip.css'

type ChipProps = HTMLAttributes<HTMLSpanElement>

/** M3 outlined chip used as a non-interactive tag — for tech names, languages, years.
 *  (Not an *assist* chip: M3 reserves those for interactive one-shot actions.) */
export function Chip({ className, children, ...rest }: ChipProps) {
  return (
    <span className={['m3-chip', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </span>
  )
}
