'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const backgrounds = [
  '/images/horse1.jpg',
  '/images/horse2.jpg',
  '/images/horse3.jpg',
]

interface MotionBackgroundProps {
  overlay?: boolean
  className?: string
}

const MotionBackground = ({ overlay = true, className = '' }: MotionBackgroundProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % backgrounds.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgrounds[currentIndex]})` }}
          />
          {overlay && (
            <div className="absolute inset-0 bg-gradient-to-b from-primary-black/70 to-primary-black/40" />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default MotionBackground 