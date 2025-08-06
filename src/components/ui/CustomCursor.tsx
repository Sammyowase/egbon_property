'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CursorTrail {
  id: number
  x: number
  y: number
  timestamp: number
}

interface CustomCursorProps {
  enabled?: boolean
  trailLength?: number
  trailDelay?: number
}

const CustomCursor = ({ 
  enabled = true, 
  trailLength = 8, 
  trailDelay = 50 
}: CustomCursorProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorTrail, setCursorTrail] = useState<CursorTrail[]>([])
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Update mouse position
  const updateMousePosition = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
    setIsVisible(true)

    // Add to trail
    const newTrail: CursorTrail = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
      timestamp: Date.now()
    }

    setCursorTrail(prev => {
      const updated = [newTrail, ...prev].slice(0, trailLength)
      return updated
    })
  }, [trailLength])

  // Handle hover states
  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
  }, [])

  // Handle click states
  const handleMouseDown = useCallback(() => {
    setIsClicking(true)
  }, [])

  const handleMouseUp = useCallback(() => {
    setIsClicking(false)
  }, [])

  // Handle mouse leave window
  const handleMouseLeaveWindow = useCallback(() => {
    setIsVisible(false)
  }, [])

  useEffect(() => {
    if (!enabled) return

    // Add event listeners
    document.addEventListener('mousemove', updateMousePosition)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeaveWindow)

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, .cursor-pointer'
    )

    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter)
      element.addEventListener('mouseleave', handleMouseLeave)
    })

    // Cleanup trail periodically
    const trailCleanup = setInterval(() => {
      setCursorTrail(prev => 
        prev.filter(trail => Date.now() - trail.timestamp < 1000)
      )
    }, 100)

    return () => {
      document.removeEventListener('mousemove', updateMousePosition)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeaveWindow)
      
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter)
        element.removeEventListener('mouseleave', handleMouseLeave)
      })

      clearInterval(trailCleanup)
    }
  }, [enabled, updateMousePosition, handleMouseDown, handleMouseUp, handleMouseEnter, handleMouseLeave, handleMouseLeaveWindow])

  if (!enabled || !isVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] mix-blend-difference">
      {/* Main Cursor */}
      <motion.div
        className={`fixed w-6 h-6 rounded-full border-2 transition-all duration-200 ${
          isHovering 
            ? 'border-primary-gold bg-primary-gold/20 scale-150' 
            : 'border-primary-gold bg-transparent'
        } ${
          isClicking ? 'scale-75' : ''
        }`}
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
        }}
        animate={{
          scale: isHovering ? 1.5 : isClicking ? 0.75 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* Inner Dot */}
      <motion.div
        className="fixed w-2 h-2 bg-primary-gold rounded-full"
        style={{
          left: mousePosition.x - 4,
          top: mousePosition.y - 4,
        }}
        animate={{
          scale: isClicking ? 0 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* Cursor Trail */}
      <AnimatePresence>
        {cursorTrail.map((trail, index) => (
          <motion.div
            key={trail.id}
            className="fixed w-3 h-3 bg-primary-gold rounded-full"
            style={{
              left: trail.x - 6,
              top: trail.y - 6,
            }}
            initial={{ 
              opacity: 0.8,
              scale: 1,
            }}
            animate={{ 
              opacity: 0,
              scale: 0.3,
            }}
            exit={{ 
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: 0.8,
              delay: index * 0.05,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Hover Ring Effect */}
      {isHovering && (
        <motion.div
          className="fixed border border-primary-gold/30 rounded-full"
          style={{
            left: mousePosition.x - 25,
            top: mousePosition.y - 25,
            width: 50,
            height: 50,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1.2, 1],
            opacity: [0, 0.6, 0.3],
          }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
        />
      )}

      {/* Click Ripple Effect */}
      {isClicking && (
        <motion.div
          className="fixed border-2 border-primary-gold rounded-full"
          style={{
            left: mousePosition.x - 20,
            top: mousePosition.y - 20,
            width: 40,
            height: 40,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ 
            scale: 2,
            opacity: 0,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
        />
      )}
    </div>
  )
}

export default CustomCursor
