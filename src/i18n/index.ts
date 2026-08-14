import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en'
import zh from './locales/zh'

const STORAGE_KEY = 'tuning-luna-lang'

/** Chinese is the default; respect a previously saved choice, else browser language. */
function detectLanguage(): 'zh' | 'en' {
  if (typeof window === 'undefined') return 'zh'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'zh' || stored === 'en') return stored
  return navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

const initial = detectLanguage()

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    zh: { translation: zh },
  },
  lng: initial,
  fallbackLng: 'zh',
  interpolation: { escapeValue: false },
})

// Keep <html lang> and the user's choice in sync.
document.documentElement.lang = initial
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng
  if (lng === 'zh' || lng === 'en') {
    window.localStorage.setItem(STORAGE_KEY, lng)
  }
})

export default i18n
