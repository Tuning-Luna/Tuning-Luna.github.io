import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en'
import zh from './locales/zh'

const STORAGE_KEY = 'tuning-luna-lang'

/** English is the default, regardless of the browser language; respect a
 *  previously saved choice. The user can still switch languages manually. */
function detectLanguage(): 'zh' | 'en' {
  if (typeof window === 'undefined') return 'en'
  let stored: string | null = null
  try {
    stored = window.localStorage.getItem(STORAGE_KEY)
  } catch {
    // localStorage unavailable (blocked, private mode…) — default to English.
  }
  if (stored === 'zh' || stored === 'en') return stored
  return 'en'
}

const initial = detectLanguage()

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    zh: { translation: zh },
  },
  lng: initial,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

// Keep <html lang> and the user's choice in sync.
document.documentElement.lang = initial
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng
  if (lng === 'zh' || lng === 'en') {
    try {
      window.localStorage.setItem(STORAGE_KEY, lng)
    } catch {
      // Storage unavailable — the choice just won't persist.
    }
  }
})

export default i18n
