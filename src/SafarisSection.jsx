import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import maasaiImg from './assets/Welcome1.jpg'
import tsavoImg from './assets/Welcome4.jpg'
import amboseliImg from './assets/palmtrees.jpg'
import nakuruImg from './assets/coconuttree.jpg'
import safariBlueImg from './assets/Welcome2.jpg'
import midaCreekImg from './assets/Welcome5.jpg'
import gedeImg from './assets/hallway.jpg'
import hellsKitchenImg from './assets/Welcomebg.jpg'
import './SafarisSection.css'

gsap.registerPlugin(ScrollTrigger)

const SAFARIS = [
  {
    id: 'maasai-mara',
    title: 'Maasai Mara Big Five Safari Adventure',
    description:
      "Experience Kenya's most iconic wildlife reserve with guided game drives across vast golden plains. Witness lions, elephants, rhinos, leopards, and buffalo in one of the world's most celebrated safari landscapes.",
    label: '3–4 Day Safari Experience',
    mainImage: maasaiImg,
    layout: 'image-left',
  },
  {
    id: 'tsavo',
    title: 'Tsavo Classic Savannah Adventure',
    description:
      "Journey through Kenya's largest national park, home to the legendary red elephants of Tsavo and dramatic volcanic landscapes that stretch across the savannah.",
    label: '2–3 Day Safari',
    mainImage: tsavoImg,
    layout: 'content-left',
  },
  {
    id: 'amboseli',
    title: 'Amboseli Wildlife & Kilimanjaro Safari',
    description:
      'Discover Amboseli National Park where large elephant herds roam beneath the breathtaking backdrop of Mount Kilimanjaro, Africa\'s highest peak.',
    label: '2 Day Safari',
    mainImage: amboseliImg,
    layout: 'image-left',
  },
  {
    id: 'lake-nakuru',
    title: 'Lake Nakuru Flamingo & Rhino Safari',
    description:
      'Visit the famous alkaline lake where thousands of flamingos gather and rare black and white rhinos roam within the protected sanctuary.',
    label: '1–2 Day Safari',
    mainImage: nakuruImg,
    layout: 'content-left',
  },
  {
    id: 'safari-blue',
    title: 'Safari Blue – Watamu Marine Adventure',
    description:
      'Sail through the turquoise waters of Watamu Marine National Park for snorkeling, dolphin watching, sandbank relaxation, and exclusive island dining.',
    label: 'Full Day Ocean Experience',
    mainImage: safariBlueImg,
    layout: 'image-left',
  },
  {
    id: 'mida-creek',
    title: 'Mida Creek Sunset Dhow Cruise',
    description:
      'Glide through the mangrove-lined waters of Mida Creek aboard a traditional dhow while the sun sets over one of the most peaceful coastal ecosystems in Kenya.',
    label: 'Sunset Experience',
    mainImage: midaCreekImg,
    layout: 'content-left',
  },
  {
    id: 'gede-ruins',
    title: 'Gede Ruins Historical Tour',
    description:
      'Discover the mysterious lost Swahili city of Gede, hidden within the coastal forest and filled with centuries of history, culture, and archaeological wonder.',
    label: 'Half-Day Cultural Tour',
    mainImage: gedeImg,
    layout: 'image-left',
  },
  {
    id: 'hells-kitchen',
    title: "Hell's Kitchen Canyon Adventure",
    description:
      'Explore the dramatic sandstone canyon formations of Marafa, locally known as Hell\'s Kitchen, where glowing colors transform the landscape at sunset.',
    label: 'Sunset Geological Tour',
    mainImage: hellsKitchenImg,
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
