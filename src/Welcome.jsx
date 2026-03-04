import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import welcomeBg from './assets/Welcomebg.jpg'
import './Welcome.css'

gsap.registerPlugin(ScrollTrigger)

const WELCOME_ST_ID = 'welcome-pin'

// Right=true for indices 0,2,4 (images 1,3,5); left for 1,3 (images 2,4)
const IMAGE_CONFIG = [
  { file: 'Welcome1.jpg', side: 'right', topPct: 8 },
  { file: 'Welcome2.jpg', side: 'left',  topPct: 20 },
  { file: 'Welcome3.jpg', side: 'right', topPct: 40 },
  { file: 'Welcome4.jpg', side: 'left',  topPct: 54 },
  { file: 'Welcome5.jpg', side: 'right', topPct: 68 },
]

export default function Welcome() {
  const containerRef = useRef(null)
  const imgRef0 = useRef(null)
  const imgRef1 = useRef(null)
  const imgRef2 = useRef(null)
  const imgRef3 = useRef(null)
  const imgRef4 = useRef(null)

  useEffect(() => {
    const imgRefs = [imgRef0, imgRef1, imgRef2, imgRef3, imgRef4]
    const container = containerRef.current
    const imgs = imgRefs.map(r => r.current)

    // Set each image's initial off-screen position
    IMAGE_CONFIG.forEach((config, i) => {
      gsap.set(imgs[i], { xPercent: config.side === 'right' ? 115 : -115, opacity: 0 })
    })

    // Timeline: images appear at evenly spaced intervals.
    // Each "slot" is 1 unit; we give 0.5 units to the animation and
    // 0.5 units as a settled pause before the next one begins.
    const tl = gsap.timeline()
    IMAGE_CONFIG.forEach((_config, i) => {
      tl.to(
        imgs[i],
        { xPercent: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        i   // position in timeline (0, 1, 2, 3, 4)
      )
    })
    // Extra settling pause after the last image
    tl.to({}, { duration: 0.8 })

    // Scrub the timeline across the full sticky scroll range of the container.
    // CSS position:sticky handles the visual pinning; ScrollTrigger drives the animation.
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
            {IMAGE_CONFIG.map(({ side, topPct, file }, i) =>
              side === 'left' ? (
                <div
                  key={file}
                  ref={[imgRef0, imgRef1, imgRef2, imgRef3, imgRef4][i]}
                  className="welcome-img-wrapper"
                  style={{ top: `${topPct}%` }}
                >
                  <img
                    src={`/assets/${file}`}
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

            <p className="welcome-subtitle">Welcome to Safina</p>
            <h2 className="welcome-title">Where luxury meets the ocean breeze</h2>

            <div className="welcome-letter">
              <p>
                Dear valued guests,
              </p>
              <p>
                It is with the warmest of hearts that we welcome you to Safina Beach — a sanctuary
                where time slows, the tides speak softly, and every moment is yours to keep.
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
            {IMAGE_CONFIG.map(({ side, topPct, file }, i) =>
              side === 'right' ? (
                <div
                  key={file}
                  ref={[imgRef0, imgRef1, imgRef2, imgRef3, imgRef4][i]}
                  className="welcome-img-wrapper"
                  style={{ top: `${topPct}%` }}
                >
                  <img
                    src={`/assets/${file}`}
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
