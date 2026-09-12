import { Chip } from '../components/Chip'
import { techIconPaths } from '../data/techIcons'
import type { TechItem } from '../data/techIcons'

interface TechChipProps {
  item: TechItem
}

/**
 * One tech-stack item: a non-interactive tag chip led by its filled brand
 * glyph. (Not an M3 *assist* chip — those are interactive one-shot actions;
 * this is the outlined static-tag variant.)
 */
export function TechChip({ item }: TechChipProps) {
  return (
    <Chip>
      <svg
        viewBox="0 0 24 24"
        width={18}
        height={18}
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path d={techIconPaths[item]} />
      </svg>
      {item}
    </Chip>
  )
}
