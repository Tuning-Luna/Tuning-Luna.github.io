import { Chip } from '../components/Chip'
import { techIconPaths } from './techIcons'

interface TechChipProps {
  item: string
}

/** One tech-stack item: an M3 assist chip led by its filled brand glyph. */
export function TechChip({ item }: TechChipProps) {
  const path = techIconPaths[item]

  return (
    <Chip>
      {path && (
        <svg
          className="tech-chip__icon"
          viewBox="0 0 24 24"
          width={18}
          height={18}
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
        >
          <path d={path} />
        </svg>
      )}
      {item}
    </Chip>
  )
}
