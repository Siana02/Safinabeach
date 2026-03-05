import { useState, useRef, useEffect } from 'react'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import img1 from './assets/Welcome1.jpg'
import img2 from './assets/Welcome2.jpg'
import img3 from './assets/Welcome3.png'
import img4 from './assets/Welcome4.jpg'
import img5 from './assets/Welcome5.jpg'
import img6 from './assets/Overview1.jpg'
import img7 from './assets/Overview2.jpg'
import img8 from './assets/coconuttree.jpg'
import img9 from './assets/palmtrees.jpg'
import './Gallery.css'

const GALLERY_IMAGES = [img1, img2, img3, img4, img5, img6, img7, img8, img9]
const GAP_PX = 24

function getVisibleCount() {
  return window.innerWidth < 768 ? 1 : 3
}

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [step, setStep] = useState(0)
  const [maxIndex, setMaxIndex] = useState(GALLERY_IMAGES.length - 3)
  const wrapperRef = useRef(null)

  useEffect(() => {
    const updateLayout = () => {
      if (wrapperRef.current) {
        const w = wrapperRef.current.offsetWidth
        const visible = getVisibleCount()
        const itemWidth = (w - (visible - 1) * GAP_PX) / visible
        wrapperRef.current.style.setProperty('--item-width', `${itemWidth}px`)
        setStep(itemWidth + GAP_PX)
        setMaxIndex(GALLERY_IMAGES.length - visible)
        // Clamp currentIndex when resizing
        setCurrentIndex((i) => Math.min(i, GALLERY_IMAGES.length - visible))
      }
    }
    updateLayout()
    window.addEventListener('resize', updateLayout)
    return () => window.removeEventListener('resize', updateLayout)
  }, [])

  const handleNext = () => {
    setCurrentIndex((i) => (i >= maxIndex ? 0 : i + 1))
  }

  const handlePrev = () => {
    setCurrentIndex((i) => (i <= 0 ? maxIndex : i - 1))
  }

  return (
    <section className="gallery-section" id="gallery">

      {/* ── Divider ── */}
      <div className="gallery-divider" aria-hidden="true">
        <div className="gallery-divider-line gallery-divider-line--left" />
        <div className="gallery-divider-diamond" />
        <div className="gallery-divider-line gallery-divider-line--right" />
      </div>

      {/* ── Subtitle ── */}
      <p className="gallery-subtitle">Photo Gallery</p>

      {/* ── Main Title ── */}
      <h2 className="gallery-title">Safina Moments Captured</h2>

      {/* ── Carousel ── */}
      <div className="gallery-carousel">

        {/* Left arrow — visible only once user has navigated right */}
        {currentIndex > 0 && (
          <button
            className="gallery-arrow gallery-arrow--left"
            onClick={handlePrev}
            aria-label="Previous images"
          >
            <ArrowLeft size={22} />
          </button>
        )}

        {/* Track wrapper — clips the scrolling track */}
        <div className="gallery-track-wrapper" ref={wrapperRef}>
          <div
            className="gallery-track"
            style={{ transform: `translateX(-${currentIndex * step}px)` }}
          >
            {GALLERY_IMAGES.map((src, i) => (
              <div key={src} className="gallery-item">
                <img
                  src={src}
                  alt={`Safina moment ${i + 1}`}
                  className="gallery-img"
                  draggable="false"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right arrow — always visible */}
        <button
          className="gallery-arrow gallery-arrow--right"
          onClick={handleNext}
          aria-label="Next images"
        >
          <ArrowRight size={22} />
        </button>

      </div>
    </section>
  )
}
