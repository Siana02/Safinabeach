import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { MapPin, Phone, BedDouble } from 'lucide-react'
import './App.css'
import PreloadScreen from './PreloadScreen'
import LanguageSelectionScreen from './LanguageSelectionScreen'
import Welcome from './Welcome'
import overview1 from './assets/Overview1.jpg'
import overview2 from './assets/Overview2.jpg'

const SUPPORTED_LANGUAGES = ['ar', 'de', 'en', 'es', 'fr', 'it', 'pt', 'zh']

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
  const [phase, setPhase] = useState('preload') // 'preload' | 'language' | 'hero'

  const needsLanguageSelection = useMemo(() => {
    const browserLang = (navigator.language || '').split('-')[0].toLowerCase()
    return !SUPPORTED_LANGUAGES.includes(browserLang)
  }, [])

  const shouldShowLanguageScreen = needsLanguageSelection && (phase === 'preload' || phase === 'language')

  const handlePreloadComplete = () => {
    setPhase(needsLanguageSelection ? 'language' : 'hero')
  }

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value)
  }

  return (
    <>
      {shouldShowLanguageScreen && (
        <LanguageSelectionScreen onLanguageSelected={() => setPhase('hero')} />
      )}
      {phase === 'preload' && <PreloadScreen onComplete={handlePreloadComplete} />}
      <div dir={isRtl ? 'rtl' : 'ltr'}>

      <section id="home" className="hero">
        <div className="hero-bg hero-bg-1" style={{ backgroundImage: `url(${overview1})` }} />
        <div className="hero-bg hero-bg-2" style={{ backgroundImage: `url(${overview2})` }} />
        <div className="hero-overlay" />
        <header className="hero-header">
          <nav className="hero-nav">
            <ul className="hero-nav-links">
              {[
                { key: 'about', href: '#about' },
                { key: 'rooms', href: '#rooms' },
                { key: 'services', href: '#services' },
                { key: 'events', href: '#events' },
                { key: 'blog', href: '#blog' },
              ].map(({ key, href }) => (
                <li key={key}>
                  <a href={href}>
                    <span className="nav-link-inner">
                      <span>{t(`nav.${key}`)}</span>
                      <span>{t(`nav.${key}`)}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hero-brand">Safina Beach Club</div>
          <div className="hero-contact">
            <span className="hero-contact-item">
              <MapPin size={15} className="hero-icon" />
              <span>Watamu 🇰🇪</span>
            </span>
            <span className="hero-contact-item">
              <Phone size={15} className="hero-icon" />
              <span>+254780 214521</span>
            </span>
            <select
              id="lang-select"
              value={i18n.language.split('-')[0]}
              onChange={changeLanguage}
              className="hero-lang-select"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
        </header>
        <div className="hero-content">
          <h1>Welcome to Paradise</h1>
          <p>Experience sun-kissed shores, luxurious stays and unforgettable memories at Safina.</p>
          <div className="hero-cta-group">
            <a href="#rooms" className="cta-btn cta-btn-primary">
              <BedDouble size={18} className="cta-icon" />
              Explore Rooms
            </a>
            <a href="tel:+254780214521" className="cta-btn cta-btn-secondary">
              <Phone size={18} className="cta-icon" />
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <Welcome />

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
    </>
  )
}

export default App
