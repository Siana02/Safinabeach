import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import maasaiMain from './assets/maasaimara1.png'
import maasaiSecondary from './assets/maasaimara2.png'
import tsavoMain from './assets/tsavo1.jpg'
import tsavoSecondary from './assets/tsavo2.jpg'
import amboseliMain from './assets/amboseli1.jpg'
import amboseliSecondary from './assets/amboseli2.jpg'
import nakuruMain from './assets/lakenakuru1.jpg'
import nakuruSecondary from './assets/lakenakuru2.jpg'
import safariBlueMain from './assets/dolphinwatching1.jpg'
import safariBlueSecondary from './assets/turtlewatching.jpg'
import midaCreekMain from './assets/cocktailscheers.jpg'
import midaCreekSecondary from './assets/midacreek2.png'
import gedeMain from './assets/gediruins1.jpg'
import gedeSecondary from './assets/gediruins2.jpg'
import hellsMain from './assets/hellskitchen1.jpg'
import hellsSecondary from './assets/hellskitchen2.jpg'
import './SafarisSection.css'

gsap.registerPlugin(ScrollTrigger)

const SAFARIS = [
  {
    id: 'maasai-mara',
    title: 'Maasai Mara Big Five Safari Adventure',
    description:
      "Experience Kenya's most iconic wildlife reserve with guided game drives across vast golden plains. Witness lions, elephants, rhinos, leopards, and buffalo in one of the world's most celebrated safari landscapes.",
    label: '3–4 Day Safari Experience',
    mainImage: maasaiMain,
    secondaryImage: maasaiSecondary,
    layout: 'image-left',
  },
  {
    id: 'tsavo',
    title: 'Tsavo Classic Savannah Adventure',
    description:
      "Journey through Kenya's largest national park, home to the legendary red elephants of Tsavo and dramatic volcanic landscapes that stretch across the savannah.",
    label: '2–3 Day Safari',
    mainImage: tsavoMain,
    secondaryImage: tsavoSecondary,
    layout: 'content-left',
  },
  {
    id: 'amboseli',
    title: 'Amboseli Wildlife & Kilimanjaro Safari',
    description:
      'Discover Amboseli National Park where large elephant herds roam beneath the breathtaking backdrop of Mount Kilimanjaro, Africa\'s highest peak.',
    label: '2 Day Safari',
    mainImage: amboseliMain,
    secondaryImage: amboseliSecondary,
    layout: 'image-left',
  },
  {
    id: 'lake-nakuru',
    title: 'Lake Nakuru Flamingo & Rhino Safari',
    description:
      'Visit the famous alkaline lake where thousands of flamingos gather and rare black and white rhinos roam within the protected sanctuary.',
    label: '1–2 Day Safari',
    mainImage: nakuruMain,
    secondaryImage: nakuruSecondary,
    layout: 'content-left',
  },
  {
    id: 'safari-blue',
    title: 'Safari Blue – Watamu Marine Adventure',
    description:
      'Sail through the turquoise waters of Watamu Marine National Park for snorkeling, dolphin watching, sandbank relaxation, and exclusive island dining.',
    label: 'Full Day Ocean Experience',
    mainImage: safariBlueMain,
    secondaryImage: safariBlueSecondary,
    layout: 'image-left',
  },
  {
    id: 'mida-creek',
    title: 'Mida Creek Sunset Dhow Cruise',
    description:
      'Glide through the mangrove-lined waters of Mida Creek aboard a traditional dhow while the sun sets over one of the most peaceful coastal ecosystems in Kenya.',
    label: 'Sunset Experience',
    mainImage: midaCreekMain,
    secondaryImage: midaCreekSecondary,
    layout: 'content-left',
  },
  {
    id: 'gede-ruins',
    title: 'Gede Ruins Historical Tour',
    description:
      'Discover the mysterious lost Swahili city of Gede, hidden within the coastal forest and filled with centuries of history, culture, and archaeological wonder.',
    label: 'Half-Day Cultural Tour',
    mainImage: gedeMain,
    secondaryImage: gedeSecondary,
    layout: 'image-left',
  },
  {
    id: 'hells-kitchen',
    title: "Hell's Kitchen Canyon Adventure",
    description:
      'Explore the dramatic sandstone canyon formations of Marafa, locally known as Hell\'s Kitchen, where glowing colors transform the landscape at sunset.',
    label: 'Sunset Geological Tour',
    mainImage: hellsMain,
    secondaryImage: hellsSecondary,
    layout: 'content-left',
  },
]

export default function SafarisSection() {
  const headerRef = useRef(null)

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const els = header.querySelectorAll(
      '.saf-mini-title, .saf-main-title, .saf-description, .saf-cta-btn'
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
    <section id="safaris" className="saf-section">
      {/* ── Header Block ── */}
      <div className="saf-header" ref={headerRef}>
        <p className="saf-mini-title">Safaris &amp; Excursions</p>
        <h2 className="saf-main-title">Explore the Wild</h2>
        <p className="saf-description">
          Explore the breathtaking landscapes and wildlife of Kenya with curated
          safaris and coastal adventures designed to immerse you in nature,
          culture, and unforgettable discovery.
        </p>
        <a href="#safaris" className="saf-cta-btn">
          Explore Safaris &amp; Excursions
        </a>
      </div>

      {/* ── Cards Container ── */}
      <div className="saf-cards">
        {SAFARIS.map((safari) => {
          const isImageLeft = safari.layout === 'image-left'
          const imageCol = (
            <div className="saf-card-half saf-card-image-half">
              <img
                src={safari.mainImage}
                alt={safari.title}
                className="saf-card-img"
              />
            </div>
          )
          const contentCol = (
            <div className="saf-card-half saf-card-content-half">
              <div className="saf-card-inner">
                <h3 className="saf-card-title">{safari.title}</h3>
                <img
                  src={safari.secondaryImage}
                  alt={`${safari.title} detail`}
                  className="saf-card-secondary-img"
                />
                <p className="saf-card-description">{safari.description}</p>
                <p className="saf-card-label">{safari.label}</p>
              </div>
            </div>
          )

          return (
            <div key={safari.id} className="saf-card">
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
