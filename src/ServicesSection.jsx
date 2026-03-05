import { useState } from 'react'
import { ArrowLeft, ArrowRight, Waves, Flower2, Utensils, Wine, Shirt } from 'lucide-react'
import './ServicesSection.css'
import beachImg from './assets/Welcome2.jpg'
import spaImg from './assets/Welcome4.jpg'
import restaurantImg from './assets/palmtrees.jpg'
import barImg from './assets/Overview2.jpg'
import boutiqueImg from './assets/hallway.jpg'

const SERVICES = [
  {
    id: 'beach',
    Icon: Waves,
    title: 'Private Beach Access',
    description: 'Complimentary cabanas, towel service, and personal beach butler.',
    image: beachImg,
  },
  {
    id: 'spa',
    Icon: Flower2,
    title: 'The Tide Pool Spa',
    description:
      'Featuring seaweed wraps, deep tissue massages, signature facials, manicures, and pedicures.',
    image: spaImg,
  },
  {
    id: 'restaurant',
    Icon: Utensils,
    title: 'Beach Restaurant',
    description:
      'Farm-to-table dining with rotating seasonal menus and daily catch specials.',
    image: restaurantImg,
  },
  {
    id: 'bar',
    Icon: Wine,
    title: 'Bar & Sunset Lounge',
    description:
      'Handcrafted cocktails and small plates with unobstructed sunset views.',
    image: barImg,
  },
  {
    id: 'boutique',
    Icon: Shirt,
    title: 'Cultural Finds Boutique',
    description:
      'Shop handcrafted beadwork, African print designs, bikinis, and curated coastal fashion.',
    image: boutiqueImg,
  },
]

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = SERVICES[activeIndex]

  const handlePrev = () => {
    setActiveIndex((i) => (i === 0 ? SERVICES.length - 1 : i - 1))
  }

  const handleNext = () => {
    setActiveIndex((i) => (i === SERVICES.length - 1 ? 0 : i + 1))
  }

  return (
    <section className="services-section" id="services">
      <div className="services-inner">

        {/* ── Header row: left text + right CTA ── */}
        <div className="services-header">
          <div className="services-header-text">
            <p className="services-mini-title">Services &amp; Amenities</p>
            <h2 className="services-main-title">Experience Paradise</h2>
            <p className="services-description">
              Indulge in coastal luxury with our carefully curated experiences and
              premier facilities designed to elevate your stay from ordinary to
              extraordinary.
            </p>
          </div>
          <div className="services-header-cta">
            <a href="#services" className="services-explore-btn">
              Explore All Services
            </a>
          </div>
        </div>

        {/* ── Display area: image left / content right ── */}
        <div className="services-display">

          {/* Left: immersive image */}
          <div className="services-image-col" key={active.id}>
            <img
              src={active.image}
              alt={active.title}
              className="services-image"
            />
          </div>

          {/* Right: service info */}
          <div className="services-content-col">
            <div className="services-content-inner" key={active.id}>
              <active.Icon size={52} className="services-icon" strokeWidth={1.4} />
              <h3 className="services-title">{active.title}</h3>
              <p className="services-desc">{active.description}</p>
            </div>

            {/* Navigation arrows */}
            <div className="services-nav">
              <button
                className="services-nav-btn"
                onClick={handlePrev}
                aria-label="Previous service"
              >
                <ArrowLeft size={20} />
              </button>
              <button
                className="services-nav-btn"
                onClick={handleNext}
                aria-label="Next service"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
