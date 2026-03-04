import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './LanguageSelectionScreen.css'

const LANGUAGES = [
  { code: 'ar', label: 'العربية' },
  { code: 'de', label: 'Deutsch' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'it', label: 'Italiano' },
  { code: 'pt', label: 'Português' },
  { code: 'zh', label: '中文' },
]

function LanguageSelectionScreen({ onLanguageSelected }) {
  const { i18n } = useTranslation()
  const [entered, setEntered] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    let raf1, raf2
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setEntered(true))
    })
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [])

  const handleSelect = (code) => {
    i18n.changeLanguage(code)
    localStorage.setItem('i18nextLng', code)
    setExiting(true)
    setTimeout(() => onLanguageSelected(code), 600)
  }

  const cls = ['lang-select-screen', entered && 'entered', exiting && 'exiting']
    .filter(Boolean)
    .join(' ')

  return (
    <div className={cls}>
      <div className="lang-select-inner">
        <div className="lang-select-logo" aria-hidden="true">
          <span className="lang-logo-letter">S</span>
          <div className="lang-logo-line" />
          <span className="lang-logo-text">safinabeachclub</span>
        </div>

        <h1 className="lang-select-headline">Select your language to continue</h1>

        <ul className="lang-buttons-grid">
          {LANGUAGES.map((lang) => (
            <li key={lang.code}>
              <button
                className="lang-btn"
                onClick={() => handleSelect(lang.code)}
                aria-label={`Select ${lang.label}`}
              >
                {lang.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default LanguageSelectionScreen
