'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ReactNode, useRef } from 'react'

interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  speed?: number
  direction?: 'up' | 'down'
  backgroundImage?: string
  overlay?: boolean
}

export default function ParallaxSection({
  children,
  className = '',
  speed = 0.5,
  direction = 'up',
  backgroundImage,
  overlay = true
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'up' ? [0, -100 * speed] : [0, 100 * speed]
  )

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Background with parallax effect */}
      {backgroundImage && (
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            y
          }}
        />
      )}

      {/* Overlay */}
      {overlay && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-primary-black/80 via-primary-black/60 to-primary-black/80"
          style={{ opacity }}
        />
      )}

      {/* Content */}
      <motion.div
        className="relative z-10"
        style={{ opacity }}
      >
        {children}
      </motion.div>
    </div>
  )
}
