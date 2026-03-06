import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import aperitivoMain from './assets/apperitivo1.jpg'
import aperitivoSecondary from './assets/apperitivo2.jpg'
import fullMoonMain from './assets/fullmoon1.jpg'
import fullMoonSecondary from './assets/fullmoon2.png'
import bonfireMain from './assets/bonfire1.jpg'
import bonfireSecondary from './assets/bonfire2.jpg'
import mijikendaMain from './assets/culturalfinds.png'
import mijikendaSecondary from './assets/turtlewatching.jpg'
import './SpecialEvents.css'

gsap.registerPlugin(ScrollTrigger)

const EVENTS = [
  {
    id: 'aperitivo',
    title: 'Aperitivo',
    description:
      'Enjoy the timeless coastal ritual of aperitivo as golden hour settles over the ocean. Light bites, refreshing drinks, and the gentle rhythm of the waves create the perfect pre-dinner moment.',
    time: 'Everyday, 04:00 PM',
    mainImage: aperitivoMain,
    secondaryImage: aperitivoSecondary,
    layout: 'image-left', // image on left, content on right
  },
  {
    id: 'fullmoon',
    title: 'Full Moon Parties',
    description:
      'Celebrate beneath the glow of the full moon with music, cocktails, and barefoot dancing on the sand. A night where the ocean, stars, and rhythm meet.',
    time: 'Every Full Moon',
    mainImage: fullMoonMain,
    secondaryImage: fullMoonSecondary,
    layout: 'content-left', // content on left, image on right
  },
  {
    id: 'bonfire',
    title: 'Beach Bonfire Nights',
    description:
      'Gather around the fire as the tide whispers along the shore. Stories, music, and warm coastal air make this a night to remember.',
    time: 'Fridays, 07:00 PM',
    mainImage: bonfireMain,
    secondaryImage: bonfireSecondary,
    layout: 'image-left',
  },
  {
    id: 'mijikenda',
    title: 'Mijikenda Cultural Night',
    description:
      'Experience the beauty of coastal heritage through music, traditional fashion, and storytelling inspired by the Mijikenda communities of the Kenyan coast.',
    time: 'Saturdays, 08:00 PM',
    mainImage: mijikendaMain,
    secondaryImage: mijikendaSecondary,
    layout: 'content-left',
  },
]

export default function SpecialEvents() {
  const headerRef = useRef(null)

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const els = header.querySelectorAll(
      '.se-mini-title, .se-main-title, .se-description, .se-cta-btn'
    )

    gsap.set(els, { opacity: 0, y: 24 })

    const st = ScrollTrigger.create({
      trigger: header,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.12,
        })
      },
    })

    return () => {
      st.kill()
    }
  }, [])

  return (
    <section id="events" className="se-section">
      {/* ── Header Block ── */}
      <div className="se-header" ref={headerRef}>
        <p className="se-mini-title">Special Events</p>
        <h2 className="se-main-title">Celebrate by the Sea</h2>
        <p className="se-description">
          Create unforgettable memories with curated coastal experiences designed
          for celebration, culture, and connection beneath the Watamu sky.
        </p>
        <a href="#events" className="se-cta-btn">
          Explore All Events
        </a>
      </div>

      {/* ── Cards Container ── */}
      <div className="se-cards" style={{ height: `${EVENTS.length * 100}vh` }}>
        {EVENTS.map((event, index) => {
          const isImageLeft = event.layout === 'image-left'
          const imageCol = (
            <div className="se-card-half se-card-image-half">
              <img
                src={event.mainImage}
                alt={event.title}
                className="se-card-img"
              />
            </div>
          )
          const contentCol = (
            <div className="se-card-half se-card-content-half">
              <div className="se-card-inner">
                <h3 className="se-card-title">{event.title}</h3>
                <img
                  src={event.secondaryImage}
                  alt={`${event.title} detail`}
                  className="se-card-secondary-img"
                />
                <p className="se-card-description">{event.description}</p>
                <p className="se-card-time">{event.time}</p>
              </div>
            </div>
          )

          return (
            <div key={event.id} className="se-card" style={{ zIndex: index + 1 }}>
              {isImageLeft ? (
                <>
                  {imageCol}
                  {contentCol}
                </>
              ) : (
                <>
                  {contentCol}
                  {imageCol}
                </>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
