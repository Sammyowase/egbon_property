'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Bed, Bath, Square, Heart, Share2, Eye } from 'lucide-react'
import { HeroImage, heroImages as allHeroImages, getHeroImagesByCategory, primaryFallbacks } from '@/data/heroImages'
// Removed EnhancedImage imports - using simple img tags for instant loading

interface Property {
  id: string
  title: string
  location: string
  price: string
  beds?: number
  baths?: number
  sqft?: string
  type: 'luxury' | 'agricultural' | 'construction' | 'commercial' | 'market'
  featured?: boolean
  images: string[]
  description: string
}

interface PropertyShowcaseProps {
  category?: 'luxury' | 'agricultural' | 'construction' | 'commercial' | 'market'
  title?: string
  subtitle?: string
  showFilters?: boolean
  maxProperties?: number
  className?: string
}

const PropertyShowcase = ({
  category,
  title = "Featured Properties",
  subtitle = "Discover exceptional real estate opportunities",
  showFilters = true,
  maxProperties = 6,
  className = ""
}: PropertyShowcaseProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(category || 'all')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [heroImages, setHeroImages] = useState<HeroImage[]>(allHeroImages) // Initialize with all images immediately
  // Removed isLoading state - local images load instantly

  // Sample properties data (in real app, this would come from API/database)
  const sampleProperties: Property[] = [
    {
      id: '1',
      title: 'Luxury Waterfront Villa',
      location: 'Apete, Ibadan',
      price: '₦850,000,000',
      beds: 5,
      baths: 6,
      sqft: '4,500',
      type: 'luxury',
      featured: true,
      images: [
        '/background/avi-werde-hHz4yrvxwlA-unsplash.jpg',
        '/background/webaliser-_TPTXZd9mOo-unsplash.jpg'
      ],
      description: 'Stunning waterfront villa with panoramic views and premium amenities.'
    },
    {
      id: '2',
      title: 'Prime Agricultural Land',
      location: 'Alakia, Ibadan',
      price: '₦45,000,000',
      type: 'agricultural',
      sqft: '50 Acres',
      images: [
       '/background/frames-for-your-heart-2d4lAQAlbDA-unsplash.jpg',
        '/bg/back_.jpeg'
      ],
      description: 'Fertile agricultural land perfect for modern farming operations.'
    },
    {
      id: '3',
      title: 'Commercial Development Site',
      location: 'Moniya, Ibadan',
      price: '₦1,200,000,000',
      type: 'commercial',
      sqft: '10,000',
      images: [
        '/background/brian-babb-XbwHrt87mQ0-unsplash.jpg',
        '/background/brian-babb-XbwHrt87mQ0-unsplash.jpg'
      ],
      description: 'Prime commercial land in the heart of Lekki business district.'
    },
    {
      id: '4',
      title: 'Residential Development',
      location: 'Idi Ayunre, Ibadan',
      price: '₦2,500,000,000',
      type: 'construction',
      images: [
        '/background/frames-for-your-heart-2d4lAQAlbDA-unsplash.jpg',
        '/bg/back_.jpeg'
      ],
      description: 'Large-scale residential development project with modern infrastructure.'
    },
    {
      id: '5',
      title: 'Modern Penthouse',
      location: 'Eleyele, Ibadan',
      price: '₦650,000,000',
      beds: 4,
      baths: 5,
      sqft: '3,200',
      type: 'luxury',
      images: [
        '/background/frames-for-your-heart-2d4lAQAlbDA-unsplash.jpg',
        '/bg/back_.jpeg'
      ],
      description: 'Luxurious penthouse with breathtaking city views and premium finishes.'
    },
    {
      id: '6',
      title: 'Investment Portfolio',
      location: 'Multiple Locations',
      price: '₦5,000,000,000',
      type: 'market',
      images: [
        '/background/webaliser-_TPTXZd9mOo-unsplash.jpg',
        '/background/webaliser-_TPTXZd9mOo-unsplash.jpg'
      ],
      description: 'Diversified real estate investment portfolio across prime locations.'
    }
  ]

  const categories = [
    { id: 'all', label: 'All Properties', icon: '🏘️' },
    { id: 'luxury', label: 'Luxury', icon: '🏰' },
    { id: 'agricultural', label: 'Agriculture', icon: '🌾' },
    { id: 'construction', label: 'Development', icon: '🏗️' },
    { id: 'commercial', label: 'Commercial', icon: '🏢' },
    { id: 'market', label: 'Investment', icon: '📈' }
  ]

  // Filter properties based on selected category
  const filteredProperties = selectedCategory === 'all' 
    ? sampleProperties.slice(0, maxProperties)
    : sampleProperties.filter(prop => prop.type === selectedCategory).slice(0, maxProperties)

  // Get hero images for background - Instant loading with local images
  useEffect(() => {
    let images: HeroImage[] = []

    if (selectedCategory === 'all') {
      // Use all available hero images for mixed view
      images = allHeroImages
    } else {
      images = getHeroImagesByCategory(selectedCategory as any)
      // If no category-specific images, use all images
      if (images.length === 0) {
        images = allHeroImages
      }
    }

    // Ensure we always have images
    if (images.length === 0) {
      images = allHeroImages
    }

    console.log('PropertyShowcase: Setting hero images:', images)
    setHeroImages(images)
    setCurrentSlide(0)
  }, [selectedCategory])

  // Auto-slide for background images - Every 2 seconds
  useEffect(() => {
    if (heroImages.length <= 1) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [heroImages.length])

  const PropertyCard = ({ property }: { property: Property }) => (
    <div className="group relative bg-primary-black/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-primary-gold/10 hover:border-primary-gold/30 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 ease-out">
      {/* Property Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-black/80 via-transparent to-transparent z-10" />

        {/* Property Actions */}
        <div className="absolute top-4 right-4 flex space-x-2 z-20">
          <button className="p-2 bg-primary-black/50 backdrop-blur-sm rounded-full text-white hover:text-primary-gold hover:bg-primary-gold/20 hover:scale-110 active:scale-90 transition-all duration-300">
            <Heart className="w-4 h-4" />
          </button>
          <button className="p-2 bg-primary-black/50 backdrop-blur-sm rounded-full text-white hover:text-primary-gold hover:bg-primary-gold/20 hover:scale-110 active:scale-90 transition-all duration-300">
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Featured Badge */}
        {property.featured && (
          <div className="absolute top-4 left-4 z-20">
            <span className="px-3 py-1 bg-primary-gold text-primary-black text-xs font-semibold rounded-full">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Property Details */}
      <div className="relative p-6 z-10 bg-primary-black/40 backdrop-blur-sm">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-white group-hover:text-primary-gold transition-colors duration-300">
            {property.title}
          </h3>
          <span className="text-primary-gold font-bold text-lg">
            {property.price}
          </span>
        </div>

        <div className="flex items-center text-white/70 mb-4">
          <MapPin className="w-4 h-4 mr-2 text-primary-gold" />
          <span className="text-sm">{property.location}</span>
        </div>

        <p className="text-white/80 text-sm mb-4 line-clamp-2">
          {property.description}
        </p>

        {/* Property Stats */}
        {(property.beds || property.baths || property.sqft) && (
          <div className="flex items-center space-x-4 mb-4 text-sm text-white/70">
            {property.beds && (
              <div className="flex items-center space-x-1">
                <Bed className="w-4 h-4 text-primary-gold" />
                <span>{property.beds} beds</span>
              </div>
            )}
            {property.baths && (
              <div className="flex items-center space-x-1">
                <Bath className="w-4 h-4 text-primary-gold" />
                <span>{property.baths} baths</span>
              </div>
            )}
            {property.sqft && (
              <div className="flex items-center space-x-1">
                <Square className="w-4 h-4 text-primary-gold" />
                <span>{property.sqft} sqft</span>
              </div>
            )}
          </div>
        )}

        {/* View Details Button */}
        <button className="w-full py-3 bg-primary-gold/10 hover:bg-primary-gold hover:text-primary-black text-primary-gold font-semibold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-[1.02] active:scale-[0.98]">
          <Eye className="w-4 h-4" />
          <span>View Details</span>
        </button>
      </div>
    </div>
  )

  return (
    <section className={`relative py-20 overflow-hidden ${className}`}>
      {/* Dynamic Background - Instant Display */}
      <div className="absolute inset-0 z-0">
        {/* Test: Show current image info */}
        <div className="absolute top-4 right-4 bg-primary-gold text-primary-black px-3 py-1 rounded text-sm font-semibold z-50">
          {currentSlide + 1}/{heroImages.length}
        </div>

        <img
          src={heroImages[currentSlide]?.src || primaryFallbacks.default}
          alt={heroImages[currentSlide]?.alt || "Property background"}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          style={{ zIndex: 1 }}
        />

        {/* Overlay - Reduced opacity to show background images */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-black/50 via-primary-black/30 to-primary-black/60" style={{ zIndex: 2 }} />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-gold/5 via-transparent to-primary-blue-primary/5" style={{ zIndex: 3 }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-heading-luxury text-primary-gold mb-4">
            {title}
          </h2>
          <p className="text-body-luxury text-white/80 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Category Filters */}
        {showFilters && (
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                  selectedCategory === cat.id
                    ? 'bg-primary-gold text-primary-black shadow-gold-glow'
                    : 'bg-primary-black/40 backdrop-blur-sm text-white hover:bg-primary-gold/20 hover:text-primary-gold border border-primary-gold/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            className="btn-outline px-8 py-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View All Properties</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default PropertyShowcase