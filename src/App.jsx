import { useTranslation } from 'react-i18next'
import './App.css'

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'ar', label: 'العربية' },
  { code: 'zh', label: '中文' },
  { code: 'pt', label: 'Português' },
  { code: 'it', label: 'Italiano' },
]

function App() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.language === 'ar'

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value)
  }

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'}>
      <nav className="navbar">
        <div className="nav-brand">🌊 Safina Beach</div>
        <ul className="nav-links">
          <li><a href="#home">{t('nav.home')}</a></li>
          <li><a href="#about">{t('nav.about')}</a></li>
          <li><a href="#rooms">{t('nav.rooms')}</a></li>
          <li><a href="#dining">{t('nav.dining')}</a></li>
          <li><a href="#contact">{t('nav.contact')}</a></li>
        </ul>
        <div className="lang-switcher">
          <label htmlFor="lang-select">{t('language.select')}: </label>
          <select
            id="lang-select"
            value={i18n.language.split('-')[0]}
            onChange={changeLanguage}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
      </nav>

      <section id="home" className="hero">
        <div className="hero-content">
          <h1>{t('hero.title')}</h1>
          <p>{t('hero.subtitle')}</p>
          <a href="#rooms" className="cta-btn">{t('hero.cta')}</a>
        </div>
      </section>

      <section id="about" className="section about-section">
        <h2>{t('about.title')}</h2>
        <p>{t('about.description')}</p>
      </section>

      <section id="rooms" className="section rooms-section">
        <h2>{t('rooms.title')}</h2>
        <p className="section-subtitle">{t('rooms.subtitle')}</p>
        <div className="rooms-grid">
          {['ocean', 'garden', 'penthouse'].map((type) => (
            <div key={type} className="room-card">
              <div className="room-icon">{type === 'ocean' ? '🌊' : type === 'garden' ? '🌿' : '🏙️'}</div>
              <h3>{t(`rooms.${type}`)}</h3>
              <button className="book-btn">{t('rooms.bookNow')}</button>
            </div>
          ))}
        </div>
      </section>

      <section id="dining" className="section dining-section">
        <h2>{t('dining.title')}</h2>
        <p>{t('dining.description')}</p>
      </section>

      <section id="contact" className="section contact-section">
        <h2>{t('contact.title')}</h2>
        <p>📍 {t('contact.address')}</p>
        <p>📞 {t('contact.phone')}</p>
        <p>✉️ {t('contact.email')}</p>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Safina Beach. {t('footer.rights')}</p>
      </footer>
    </div>
  )
}

export default App
