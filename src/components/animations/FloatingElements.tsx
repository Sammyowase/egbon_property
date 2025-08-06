'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FloatingElementProps {
  children: ReactNode
  className?: string
  duration?: number
  delay?: number
  amplitude?: number
}

export default function FloatingElement({
  children,
  className = '',
  duration = 3,
  delay = 0,
  amplitude = 10
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-amplitude, amplitude, -amplitude],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  )
}

// Rotating element
export function RotatingElement({
  children,
  className = '',
  duration = 20,
  direction = 'clockwise'
}: {
  children: ReactNode
  className?: string
  duration?: number
  direction?: 'clockwise' | 'counterclockwise'
}) {
  return (
    <motion.div
      className={className}
      animate={{
        rotate: direction === 'clockwise' ? 360 : -360
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      {children}
    </motion.div>
  )
}

// Pulsing element
export function PulsingElement({
  children,
  className = '',
  scale = [1, 1.05, 1],
  duration = 2
}: {
  children: ReactNode
  className?: string
  scale?: number[]
  duration?: number
}) {
  return (
    <motion.div
      className={className}
      animate={{
        scale
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  )
}

// Background particles
export function BackgroundParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 10 + 10
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary-gold/10"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5
          }}
        />
      ))}
    </div>
  )
}
