import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import welcomeBg from './assets/Welcomebg.jpg'
import img1 from './assets/Welcome1.jpg'
import img2 from './assets/Welcome2.jpg'
import img3 from './assets/Welcome3.png'
import img4 from './assets/Welcome4.jpg'
import img5 from './assets/Welcome5.jpg'
import './Welcome.css'

gsap.registerPlugin(ScrollTrigger)

const WELCOME_ST_ID = 'welcome-pin'

// Right for indices 0,2,4 (images 1,3,5); left for 1,3 (images 2,4)
const IMAGE_CONFIG = [
  { src: img1, side: 'right' },
  { src: img2, side: 'left'  },
  { src: img3, side: 'right' },
  { src: img4, side: 'left'  },
  { src: img5, side: 'right' },
]

export default function Welcome() {
  const { t } = useTranslation()
  const containerRef = useRef(null)
  // Single ref that holds all five image wrapper DOM nodes
  const imgEls = useRef([])

  useEffect(() => {
    const container = containerRef.current
    const imgs = imgEls.current

    // Duration each image takes to traverse the full column (timeline units)
    const imgDuration = 2.5
    // Stagger between consecutive images in the runway sequence
    const stagger = 1.0

    // Place all images below their respective columns at full opacity.
    // The column's overflow:hidden keeps them invisible until they enter.
    IMAGE_CONFIG.forEach((_, i) => {
      gsap.set(imgs[i], {
        y: imgs[i].parentElement.offsetHeight,
        opacity: 1,
      })
    })

    // One continuous upward runway: each image travels from below its column
    // to above it. Staggered starts create the flowing sequence with no pauses.
    const tl = gsap.timeline()

    IMAGE_CONFIG.forEach((_, i) => {
      const colH = imgs[i].parentElement.offsetHeight
      const imgH = imgs[i].offsetHeight
      tl.fromTo(
        imgs[i],
        { y: colH },
        { y: -imgH, duration: imgDuration, ease: 'none' },
        i * stagger
      )
    })

    // Pin the section while the runway plays; 5 viewport heights gives
    // comfortable scroll room for all 5 images to enter and exit.
    const st = ScrollTrigger.create({
      id: WELCOME_ST_ID,
      trigger: container,
      start: 'top top',
      end: () => `+=${window.innerHeight * 5}`,
      pin: true,
      pinSpacing: true,
      animation: tl,
      scrub: 1,
      invalidateOnRefresh: true,
    })

    return () => {
      st.kill()
    }
  }, [])

  return (
    /* Outer container provides the scroll space (~400vh) */
    <section
      ref={containerRef}
      id="welcome"
      className="welcome-scroll-container"
    >
      {/* Inner sticky panel — stays fixed in viewport during scroll */}
      <div
        className="welcome-sticky"
        style={{ backgroundImage: `url(${welcomeBg})` }}
      >
        {/* 3-column grid */}
        <div className="welcome-grid">

          {/* ── LEFT IMAGE COLUMN ── */}
          <div className="welcome-col welcome-col-left">
            {IMAGE_CONFIG.map(({ src, side }, i) =>
              side === 'left' ? (
                <div
                  key={i}
                  ref={(el) => { imgEls.current[i] = el }}
                  className="welcome-img-wrapper"
                >
                  <img
                    src={src}
                    alt={`Safina memory ${i + 1}`}
                    className="welcome-img"
                  />
                </div>
              ) : null
            )}
          </div>

          {/* ── CENTER LETTER COLUMN ── */}
          <div className="welcome-col welcome-col-center">
            {/* Logo placeholder / brand mark */}
            <div className="welcome-logo" aria-label="Safina Beach logo">
              <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="30" cy="30" r="28" stroke="#4a8a69" strokeWidth="1.5" />
                <path d="M20 38 Q30 18 40 38" stroke="#00311F" strokeWidth="1.5" fill="none" />
                <circle cx="30" cy="30" r="3" fill="#4a8a69" />
              </svg>
            </div>

            <p className="welcome-subtitle">{t('welcome.title')}</p>
            <h2 className="welcome-title">{t('welcome.tagline')}</h2>

            <div className="welcome-letter">
              <p>
                {t('welcome.greeting')}
              </p>
              <p>
                {t('welcome.description')}
              </p>
              <p>
                {t('welcome.body')}
              </p>
              <p>
                {t('welcome.closing')}
              </p>
              <p className="welcome-letter-signature">
                {t('welcome.signature')}<br />
                <em>{t('welcome.family')}</em>
              </p>
            </div>
          </div>

          {/* ── RIGHT IMAGE COLUMN ── */}
          <div className="welcome-col welcome-col-right">
            {IMAGE_CONFIG.map(({ src, side }, i) =>
              side === 'right' ? (
                <div
                  key={i}
                  ref={(el) => { imgEls.current[i] = el }}
                  className="welcome-img-wrapper"
                >
                  <img
                    src={src}
                    alt={`Safina memory ${i + 1}`}
                    className="welcome-img"
                  />
                </div>
              ) : null
            )}
          </div>

        </div>{/* /welcome-grid */}
      </div>{/* /welcome-sticky */}
    </section>
  )
}
