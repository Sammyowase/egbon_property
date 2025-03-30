'use client'

import { useEffect, useState, useCallback } from 'react'
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const { clientX, clientY } = e
    setMousePosition({
      x: clientX / dimensions.width,
      y: clientY / dimensions.height
    })
  }, [dimensions])

  const generateGradient = useCallback(() => {
    // Base gold hue is 45 (degrees)
    const baseHue = 45
    
    // Generate variations of gold based on mouse position
    // Vary the hue slightly around the base gold color
    const hue1 = baseHue - 5 + (mousePosition.x * 10) // 40-50 degree range
    const hue2 = baseHue + (mousePosition.y * 10) // 45-55 degree range
    const hue3 = baseHue - 10 + ((mousePosition.x + mousePosition.y) * 10) // 35-45 degree range

    // Create different saturations and lightness for depth
    return `radial-gradient(
      circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%,
      hsla(${hue1}, 80%, 55%, 0.4) 0%,
      hsla(${hue2}, 70%, 45%, 0.3) 45%,
      hsla(${hue3}, 60%, 35%, 0.2) 100%
    )`
  }, [mousePosition])

  return (
    <div 
      className={`fixed inset-0 -z-10 ${className}`}
      onMouseMove={handleMouseMove}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <motion.div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-300"
            style={{
              background: generateGradient(),
              backgroundBlendMode: 'soft-light'
            }}
            animate={{
              background: generateGradient()
            }}
            transition={{
              duration: 0.3,
              ease: "linear"
            }}
          />
          
          {overlay && (
            <motion.div 
              className="absolute inset-0"
              initial={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.5))' }}
              animate={{
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.5))'
              }}
              transition={{
                duration: 0.3,
                ease: "linear"
              }}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default MotionBackground