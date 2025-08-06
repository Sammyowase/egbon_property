'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import { HeroImage, getHeroImagesByCategory, heroImages } from '@/data/heroImages'
import { PropertyLoadingSpinner } from './LuxuryLoadingSpinner'
// Removed HeroEnhancedImage - using simple img tags for instant loading

interface CategoryHeroCarouselProps {
  category?: 'luxury' | 'agricultural' | 'construction' | 'market' | 'commercial' | 'mixed' | 'featured'
  autoSlideInterval?: number
  parallaxIntensity?: number
  overlayOpacity?: number
  showControls?: boolean
  showIndicators?: boolean
  showCategoryFilter?: boolean
  className?: string
  height?: string
}

const CategoryHeroCarousel = ({
  category = 'mixed',
  autoSlideInterval = 8000,
  parallaxIntensity = 0.5,
  overlayOpacity = 0.7,
  showControls = true,
  showIndicators = true,
  showCategoryFilter = false,
  className = '',
  height = 'h-screen'
}: CategoryHeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [selectedCategory, setSelectedCategory] = useState(category)
  const [heroImages, setHeroImages] = useState<HeroImage[]>([{
    src: '/background/frames-for-your-heart-2d4lAQAlbDA-unsplash.jpg',
    alt: 'Default property background',
    category: 'luxury',
    title: 'Premium Properties',
    description: 'Discover exceptional real estate opportunities'
  }])

  // Get images based on category
  useEffect(() => {
    let images: HeroImage[] = []

    switch (selectedCategory) {
      case 'mixed':
      case 'featured':
        images = heroImages
        break
      default:
        images = getHeroImagesByCategory(selectedCategory)
        break
    }

    // If no images found, use default fallback
    if (images.length === 0) {
      images = [{
        src: '/background/frames-for-your-heart-2d4lAQAlbDA-unsplash.jpg',
        alt: 'Default property background',
        category: 'luxury',
        title: 'Premium Properties',
        description: 'Discover exceptional real estate opportunities'
      }]
    }

    setHeroImages(images)
    setCurrentIndex(0)
  }, [selectedCategory])

  // Loading state - show spinner for optimal UX
  useEffect(() => {
    setIsLoaded(false)
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1500) // 1.5 seconds for optimal user experience

    return () => clearTimeout(timer)
  }, [selectedCategory]) // Reset loading when category changes

  // Auto-slide functionality
  useEffect(() => {
    if (!isPlaying || heroImages.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      )
    }, autoSlideInterval)

    return () => clearInterval(interval)
  }, [heroImages.length, autoSlideInterval, isPlaying])

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

  // Navigation functions
  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? heroImages.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === heroImages.length - 1 ? 0 : currentIndex + 1)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

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

  const categories = [
    { id: 'mixed', label: 'All Properties', icon: '🏘️' },
    { id: 'luxury', label: 'Luxury', icon: '🏰' },
    { id: 'agricultural', label: 'Agriculture', icon: '🌾' },
    { id: 'construction', label: 'Construction', icon: '🏗️' },
    { id: 'commercial', label: 'Commercial', icon: '🏢' },
    { id: 'market', label: 'Market', icon: '📈' }
  ]

  // Removed loading state - local images load instantly
  // Ensure currentIndex is within bounds
  const safeCurrentIndex = Math.max(0, Math.min(currentIndex, heroImages.length - 1))
  const currentImage = heroImages[safeCurrentIndex] || {
    src: '/background/frames-for-your-heart-2d4lAQAlbDA-unsplash.jpg',
    alt: 'Default property background',
    category: 'luxury',
    title: 'Premium Properties',
    description: 'Discover exceptional real estate opportunities'
  }

  return (
    <div 
      className={`relative ${height} overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      {/* Category Filter */}
      {showCategoryFilter && (
        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex space-x-2 bg-primary-black/80 backdrop-blur-md rounded-2xl p-2 border border-primary-gold/20"
          >
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? 'bg-primary-gold text-primary-black shadow-gold-glow'
                    : 'text-white hover:bg-primary-gold/20 hover:text-primary-gold'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.label}
              </motion.button>
            ))}
          </motion.div>
        </div>
      )}

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
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className="absolute inset-0 w-full h-full object-cover"
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

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center max-w-4xl mx-auto px-4">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {currentImage.title && (
              <motion.h1 
                className="text-hero-luxury mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {currentImage.title}
              </motion.h1>
            )}
            {currentImage.description && (
              <motion.p 
                className="text-body-luxury text-white/90 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                {currentImage.description}
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Navigation Controls */}
      {showControls && heroImages.length > 1 && (
        <>
          {/* Previous/Next Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-primary-black/50 backdrop-blur-sm border border-primary-gold/20 text-white hover:bg-primary-gold hover:text-primary-black transition-all duration-300 group"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-primary-black/50 backdrop-blur-sm border border-primary-gold/20 text-white hover:bg-primary-gold hover:text-primary-black transition-all duration-300 group"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="absolute bottom-8 right-8 z-20 p-3 rounded-full bg-primary-black/50 backdrop-blur-sm border border-primary-gold/20 text-white hover:bg-primary-gold hover:text-primary-black transition-all duration-300 group"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 group-hover:scale-110 transition-transform" />
            ) : (
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
            )}
          </button>
        </>
      )}

      {/* Carousel Indicators */}
      {showIndicators && heroImages.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-primary-gold shadow-gold-glow scale-125'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

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

      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-primary-black flex items-center justify-center z-30">
          <PropertyLoadingSpinner
            size="lg"
            message={`Loading ${currentImage.title || 'image'}...`}
          />
        </div>
      )}
    </div>
  )
}

export default CategoryHeroCarousel