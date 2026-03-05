import { useState } from 'react'
import { ArrowRight, Maximize2, BedDouble, Users } from 'lucide-react'
import './RoomsSection.css'
import coastalImg from './assets/coconuttree.jpg'
import pentHouseImg from './assets/Overview1.jpg'
import beachfrontImg from './assets/Welcome2.jpg'
import familyImg from './assets/palmtrees.jpg'
import honeymoonImg from './assets/hallway.jpg'

const ROOMS = [
  {
    id: 'coastal-garden',
    name: 'Coastal Garden Suite',
    sqft: '420 sq.ft',
    bed: '1 King Bed',
    guests: '2 Guests',
    price: '$249',
    image: coastalImg,
    caption: 'Lush tropical gardens meeting the gentle sea breeze.',
  },
  {
    id: 'penthouse',
    name: 'Penthouse Suite',
    sqft: '680 sq.ft',
    bed: '1 King Bed',
    guests: '2 Guests',
    price: '$549',
    image: pentHouseImg,
    caption: 'Elevated coastal luxury with panoramic ocean views.',
  },
  {
    id: 'beachfront',
    name: 'Beachfront Rooms',
    sqft: '380 sq.ft',
    bed: '1 Queen Bed',
    guests: '2 Guests',
    price: '$299',
    image: beachfrontImg,
    caption: 'Wake up steps away from the shoreline.',
  },
  {
    id: 'family',
    name: 'Family Suites',
    sqft: '560 sq.ft',
    bed: '2 Queen Beds',
    guests: '4 Guests',
    price: '$399',
    image: familyImg,
    caption: 'Spacious comfort designed for shared moments.',
  },
  {
    id: 'honeymoon',
    name: 'Honeymoon Suites',
    sqft: '480 sq.ft',
    bed: '1 King Bed',
    guests: '2 Guests',
    price: '$449',
    image: honeymoonImg,
    caption: 'Private romantic escapes near the ocean breeze.',
  },
]

export default function RoomsSection() {
  const [activeId, setActiveId] = useState(ROOMS[0].id)
  const activeRoom = ROOMS.find((r) => r.id === activeId)

  return (
    <section className="rooms-section-editorial" id="rooms-suites">
      <div className="rooms-section-inner">

        {/* ── Header row: left text block + right CTA ── */}
        <div className="rooms-section-header">

          {/* Left text block */}
          <div className="rooms-section-text">
            <p className="rooms-section-subtitle">Rooms &amp; Suites</p>
            <h2 className="rooms-section-title">Find Your Stay</h2>
            <p className="rooms-section-description">
              Guests can choose between oceanfront rooms steps from the beach or
              tranquil garden suites inspired by traditional Swahili and Mijikenda
              architecture. Each stay blends coastal comfort with the charm and
              heritage of Watamu.
            </p>
          </div>

          {/* Right CTA button */}
          <div className="rooms-section-cta">
            <a href="#rooms" className="rooms-explore-btn">
              Explore All Rooms
              <ArrowRight size={18} className="rooms-explore-icon" />
            </a>
          </div>

        </div>

        {/* ── Interactive Showcase ── */}
        <div className="rooms-showcase">

          {/* Left: accordion room list */}
          <div className="rooms-accordion">
            {ROOMS.map((room) => {
              const isActive = room.id === activeId
              return (
                <div
                  key={room.id}
                  className={`room-item${isActive ? ' room-item--active' : ''}`}
                >
                  <button
                    className={`room-name${isActive ? ' room-name--active' : ''}`}
                    onClick={() => setActiveId(room.id)}
                    aria-expanded={isActive}
                  >
                    {room.name}
                  </button>

                  {isActive && (
                    <div className="room-details">
                      {/* Icon row */}
                      <div className="room-icons">
                        <span className="room-icon-item">
                          <Maximize2 size={16} />
                          <span>{room.sqft}</span>
                        </span>
                        <span className="room-icon-item">
                          <BedDouble size={16} />
                          <span>{room.bed}</span>
                        </span>
                        <span className="room-icon-item">
                          <Users size={16} />
                          <span>{room.guests}</span>
                        </span>
                      </div>

                      {/* Price + Book row */}
                      <div className="room-price-row">
                        <div className="room-price-block">
                          <span className="room-starting-at">starting at</span>
                          <span className="room-price">
                            {room.price}
                            <span className="room-price-unit"> / night</span>
                          </span>
                        </div>
                        <a href="#contact" className="room-book-btn">Book</a>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Right: image preview */}
          <div className="rooms-image-area">
            <div className="rooms-image-container" key={activeId}>
              <img
                src={activeRoom.image}
                alt={activeRoom.name}
                className="rooms-image"
              />
              <div className="rooms-image-gradient" />
              <p className="rooms-image-caption">{activeRoom.caption}</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
