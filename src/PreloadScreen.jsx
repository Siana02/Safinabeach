import { useState, useEffect, useRef } from 'react'
import './PreloadScreen.css'

const ANIMATION_DURATION_MS = 5100
const SLIDE_DELAY_MS = 250
const SLIDE_DURATION_MS = 900

function PreloadScreen({ onComplete }) {
  const [sliding, setSliding] = useState(false)
  const [hidden, setHidden] = useState(false)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  })

  useEffect(() => {
    let slideTimer, doneTimer
    slideTimer = setTimeout(() => {
      setSliding(true)
      doneTimer = setTimeout(() => {
        setHidden(true)
        onCompleteRef.current?.()
      }, SLIDE_DURATION_MS)
    }, ANIMATION_DURATION_MS + SLIDE_DELAY_MS)
    return () => {
      clearTimeout(slideTimer)
      clearTimeout(doneTimer)
    }
  }, [])

  if (hidden) return null

  return (
    <div className={`preload-screen${sliding ? ' sliding' : ''}`}>
      <div className="preload-inner">
        <div className="preload-letter">S</div>
        <div className="preload-line" />
        <div className="preload-text">safinabeachclub</div>
      </div>
    </div>
  )
}

export default PreloadScreen
