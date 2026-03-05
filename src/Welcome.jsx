import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import welcomeBg from './assets/Welcomebg.jpg'
import img1 from './assets/Welcome1.jpg'
import img2 from './assets/Welcome2.jpg'
import img3 from './assets/Welcome3.jpg'
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

// Slide duration for each enter / exit tween
const DUR = 0.4

export default function Welcome() {
  const { t } = useTranslation()
  const containerRef = useRef(null)
  // Single ref that holds all five image wrapper DOM nodes
  const imgEls = useRef([])

  useEffect(() => {
    const container = containerRef.current
    const imgs = imgEls.current

    // Start every image fully off-screen below the viewport
    const vh = window.innerHeight
    IMAGE_CONFIG.forEach((_config, i) => {
      gsap.set(imgs[i], {
        y: vh,
        yPercent: -50,
        opacity: 0,
      })
    })

    // ─── Sequential reveal timeline ───────────────────────────────────
    // Phase 1 : images 1 & 2 slide in from below (1 still visible when 2 arrives)
    // Phase 2 : image 3 in = image 1 out;  image 4 in = image 2 out
    // Phase 3 : images 3 & 4 slide out, then image 5 slides in
    // Phase 4 : settling pause with image 5 visible
    // ──────────────────────────────────────────────────────────────────
    const tl = gsap.timeline()

    const slideIn    = { y: 0,   opacity: 1, duration: DUR, ease: 'power2.out' }
    const slideOutUp = { y: -vh, opacity: 0, duration: DUR, ease: 'power2.in' }

    // Image 1 in
    tl.to(imgs[0], slideIn,     0)
    // Image 2 in (slightly after)
    tl.to(imgs[1], slideIn,     0.7)
    // Image 1 out + Image 3 in (simultaneous)
    tl.to(imgs[0], slideOutUp,  1.5)
    tl.to(imgs[2], slideIn,     1.5)
    // Image 2 out + Image 4 in (simultaneous)
    tl.to(imgs[1], slideOutUp,  2.0)
    tl.to(imgs[3], slideIn,     2.0)
    // Images 3 & 4 out (simultaneous)
    tl.to(imgs[2], slideOutUp,  2.8)
    tl.to(imgs[3], slideOutUp,  2.8)
    // Image 5 in (after brief gap)
    tl.to(imgs[4], slideIn,     3.3)
    // Settling pause — keeps image 5 visible before the pin releases
    tl.to({}, { duration: 0.8 }, 4.0)

    // Scrub the timeline across the full sticky scroll range of the container
    const st = ScrollTrigger.create({
      id: WELCOME_ST_ID,
      trigger: container,
      start: 'top top',
      end: () => `+=${container.offsetHeight - window.innerHeight}`,
      animation: tl,
      scrub: 0.6,
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
            <h2 className="welcome-title">Where luxury meets the ocean breeze</h2>

            <div className="welcome-letter">
              <p>
                Dear valued guests,
              </p>
              <p>
                {t('welcome.description')}
              </p>
              <p>
                Here, along the sun-kissed shores of Watamu, we have built not just a resort,
                but a living memory. Each room, each meal, each quiet evening by the water
                has been crafted with intention — for you.
              </p>
              <p>
                Whether this is your first visit or a cherished return, we promise to make it
                unforgettable.
              </p>
              <p className="welcome-letter-signature">
                With warmth &amp; gratitude,<br />
                <em>The Safina Family</em>
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
