'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { PropertyLoadingSpinner } from './LuxuryLoadingSpinner'

interface HeroBackgroundCarouselProps {
  images: string[]
  autoSlideInterval?: number
  parallaxIntensity?: number
  overlayOpacity?: number
  className?: string
}

const HeroBackgroundCarousel = ({
  images,
  autoSlideInterval = 8000,
  parallaxIntensity = 0.5,
  overlayOpacity = 0.7,
  className = ''
}: HeroBackgroundCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Auto-slide functionality
  useEffect(() => {
    if (images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      )
    }, autoSlideInterval)

    return () => clearInterval(interval)
  }, [images.length, autoSlideInterval])

  // Loading state - show spinner for optimal UX
  useEffect(() => {
    setIsLoaded(false)
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1500) // 1.5 seconds for optimal user experience

    return () => clearTimeout(timer)
  }, [images]) // Reset loading when images change

  // Handle window resize
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

  // Mouse move handler for parallax effect
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const { clientX, clientY } = e
    setMousePosition({
      x: (clientX / dimensions.width - 0.5) * parallaxIntensity,
      y: (clientY / dimensions.height - 0.5) * parallaxIntensity
    })
  }, [dimensions, parallaxIntensity])

  // Image transition variants
  const imageVariants = {
    enter: {
      opacity: 0,
      scale: 1.1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    center: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  // Parallax transform calculation
  const parallaxTransform = {
    transform: `translate3d(${mousePosition.x * 20}px, ${mousePosition.y * 20}px, 0) scale(1.05)`
  }

  return (
    <div 
      className={`absolute inset-0 overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      {/* Background Images Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          <motion.div
            className="relative w-full h-full"
            style={parallaxTransform}
            transition={{ type: "spring", stiffness: 100, damping: 30 }}
          >
            <Image
              src={images[currentIndex]}
              alt={`Hero background ${currentIndex + 1}`}
              fill
              className="object-cover"
              priority={currentIndex === 0}
              quality={95}
              sizes="100vw"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Enhanced Gradient Overlays */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-primary-black via-primary-black/70 to-primary-black"
          style={{ opacity: overlayOpacity }}
        />
        
        {/* Secondary overlay for depth */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-primary-black/95 via-transparent to-primary-black/60"
          style={{ opacity: overlayOpacity * 0.8 }}
        />
        
        {/* Subtle color overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary-gold/5 via-transparent to-primary-blue-primary/5"
          style={{ opacity: overlayOpacity * 0.3 }}
        />
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              i % 3 === 0 
                ? 'w-2 h-2 bg-primary-gold/20' 
                : i % 3 === 1 
                ? 'w-1.5 h-1.5 bg-primary-blue-accent/15' 
                : 'w-1 h-1 bg-white/30'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -120, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0, 0.8, 0],
              scale: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 6,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Carousel Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-primary-gold shadow-gold-glow scale-125'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-primary-black flex items-center justify-center">
          <PropertyLoadingSpinner
            size="lg"
            message="Loading hero images..."
          />
        </div>
      )}
    </div>
  )
}

export default HeroBackgroundCarousel
