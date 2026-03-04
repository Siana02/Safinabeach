import { useState, useEffect, useRef } from 'react'
import './PreloadScreen.css'

const ANIMATION_DURATION_MS = 5100

function PreloadScreen({ onComplete }) {
  const [visible, setVisible] = useState(true)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      onCompleteRef.current?.()
    }, ANIMATION_DURATION_MS)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="preload-screen">
      <div className="preload-inner">
        <div className="preload-letter">S</div>
        <div className="preload-line" />
        <div className="preload-text">safinabeachclub</div>
      </div>
    </div>
  )
}

export default PreloadScreen
