import { useTranslation } from 'react-i18next'
import { useTheme } from '../hooks/useTheme'
import { IconButton } from './IconButton'
import type { IconName } from './Icon'

/** Cycles system → light → dark. Icon reflects the currently selected mode. */
export function ThemeToggle() {
  const { mode, cycle } = useTheme()
  const { t } = useTranslation()
  const icon: IconName = mode === 'dark' ? 'moon' : mode === 'light' ? 'sun' : 'monitor'
  return <IconButton icon={icon} label={t('a11y.theme')} onClick={cycle} />
}
