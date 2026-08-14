import { useTranslation } from 'react-i18next'
import { Icon } from './Icon'
import './LanguageToggle.css'

/** Toggles between Chinese and English, showing the current language code. */
export function LanguageToggle() {
  const { i18n, t } = useTranslation()
  const current = i18n.language?.toLowerCase().startsWith('zh') ? 'zh' : 'en'
  const next = current === 'zh' ? 'en' : 'zh'
  return (
    <button
      type="button"
      className="lang-toggle"
      aria-label={t('a11y.language')}
      onClick={() => void i18n.changeLanguage(next)}
    >
      <Icon name="language" size={18} />
      <span className="lang-toggle__code" aria-hidden="true">
        {current === 'zh' ? '中' : 'EN'}
      </span>
    </button>
  )
}
