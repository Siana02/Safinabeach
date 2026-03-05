import { ArrowRight } from 'lucide-react'
import './RoomsSection.css'

export default function RoomsSection() {
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

      </div>
    </section>
  )
}
