'use client'

import { motion, AnimatePresence } from 'framer-motion'
import MotionBackground from '@/components/MotionBackground'
import { FaBed, FaBath, FaRuler, FaMapMarkerAlt, FaSearch, FaHeart, FaSwimmingPool, FaCar, FaTree, FaHome, FaImage } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Property {
  id: string
  title: string
  location: string
  price: number
  bedrooms: number
  bathrooms: number
  area: number
  imageUrl: string
  type: 'property'
  description: string
  features: string[]
  amenities: string[]
  gallery: string[]
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
}

const cardHoverVariants = {
  rest: { scale: 1, boxShadow: "0 4px 6px rgba(234, 179, 8, 0.1)" },
  hover: { 
    scale: 1.02,
    boxShadow: "0 10px 20px rgba(234, 179, 8, 0.2)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17
    }
  }
}

export default function PropertyPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('All')
  const [priceRange, setPriceRange] = useState('All')
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [showContactModal, setShowContactModal] = useState(false)
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showGallery, setShowGallery] = useState(false)
  const [galleryInterval, setGalleryInterval] = useState<NodeJS.Timeout | null>(null)

  const properties: Property[] = [
    {
      id: '1',
      title: 'Luxury Villa with Ocean View',
      location: 'Banana Island, Lagos',
      price: 850000000, // ₦850M
      bedrooms: 6,
      bathrooms: 7,
      area: 12000,
      imageUrl: '/images/property1.jpg',
      type: 'property',
      description: "Magnificent waterfront villa with panoramic ocean views. Features include a private infinity pool, smart home automation, and premium finishes throughout.",
      features: [
        "Smart Home System",
        "Infinity Pool",
        "Private Beach Access",
        "Wine Cellar"
      ],
      amenities: [
        "24/7 Security",
        "Elevator",
        "Garden",
        "Staff Quarters"
      ],
      gallery: ['/images/property1-1.jpg', '/images/property1-2.jpg', '/images/property1-3.jpg']
    },
    {
      id: '2',
      title: 'Modern Penthouse Suite',
      location: 'Victoria Island, Lagos',
      price: 450000000, // ₦450M
      bedrooms: 4,
      bathrooms: 4.5,
      area: 6500,
      imageUrl: '/images/property2.jpg',
      type: 'property',
      description: "Stunning penthouse with 360-degree city views. Contemporary design meets luxury living with high-end finishes and smart features.",
      features: [
        "Panoramic Views",
        "Private Terrace",
        "Designer Kitchen",
        "Home Theater"
      ],
      amenities: [
        "Concierge Service",
        "Gym",
        "Spa",
        "Rooftop Pool"
      ],
      gallery: ['/images/property2-1.jpg', '/images/property2-2.jpg', '/images/property2-3.jpg']
    },
    {
      id: '3',
      title: 'Executive Family Estate',
      location: 'Ikoyi, Lagos',
      price: 650000000, // ₦650M
      bedrooms: 5,
      bathrooms: 6,
      area: 9000,
      imageUrl: '/images/property3.jpg',
      type: 'property',
      description: "Elegant family estate in prestigious Ikoyi. Perfect blend of luxury and comfort with extensive outdoor living spaces.",
      features: [
        "Swimming Pool",
        "Tennis Court",
        "Guest House",
        "Garden Pavilion"
      ],
      amenities: [
        "Security Post",
        "Backup Power",
        "Staff Quarters",
        "CCTV"
      ],
      gallery: ['/images/property3-1.jpg', '/images/property3-2.jpg', '/images/property3-3.jpg']
    }
  ]

  const locations = [
    "All",
    "Banana Island",
    "Victoria Island",
    "Ikoyi",
    "Lekki Phase 1"
  ]

  const priceRanges = [
    "All",
    "Below ₦300M",
    "₦300M - ₦500M",
    "₦500M - ₦800M",
    "Above ₦800M"
  ]

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500)

    let filtered = [...properties]
    
    if (searchQuery) {
      filtered = filtered.filter(property => 
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedLocation !== 'All') {
      filtered = filtered.filter(property => property.location.includes(selectedLocation))
    }

    if (priceRange !== 'All') {
      const [min, max] = getPriceRange(priceRange)
      filtered = filtered.filter(property => {
        const priceInMillions = property.price / 1000000
        return priceInMillions >= min && (max === Infinity || priceInMillions <= max)
      })
    }

    setFilteredProperties(filtered)
  }, [searchQuery, selectedLocation, priceRange])

  const getPriceRange = (range: string): [number, number] => {
    switch (range) {
      case 'Below ₦300M': return [0, 300]
      case '₦300M - ₦500M': return [300, 500]
      case '₦500M - ₦800M': return [500, 800]
      case 'Above ₦800M': return [800, Infinity]
      default: return [0, Infinity]
    }
  }

  const formatPrice = (price: number) => {
    return `₦${(price / 1000000).toFixed(0)}M`
  }

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    )
  }

  // Auto-advance gallery images
  useEffect(() => {
    if (selectedProperty && showGallery) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => 
          prev === (selectedProperty.gallery.length - 1) ? 0 : prev + 1
        )
      }, 3000)
      setGalleryInterval(interval)
      return () => clearInterval(interval)
    } else if (galleryInterval) {
      clearInterval(galleryInterval)
      setGalleryInterval(null)
    }
  }, [selectedProperty, showGallery])

  // Reset image index when property changes
  useEffect(() => {
    setCurrentImageIndex(0)
  }, [selectedProperty])

  // Ensure images exist before rendering
  const getImageUrl = (url: string) => {
    try {
      return url.startsWith('http') ? url : url.startsWith('/') ? url : `/${url}`
    } catch (error) {
      return '/images/placeholder.jpg'
    }
  }

  return (
    <>
      <MotionBackground />
      
      {/* Hero Section */}
      <motion.section 
        className="pt-32 pb-16 relative"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            variants={itemVariants}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-gold via-yellow-500 to-primary-gold"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
            >
              Luxury Properties
            </motion.h1>
            <motion.p 
              className="text-xl text-white/90 mb-8 leading-relaxed"
              variants={itemVariants}
            >
              Discover exceptional homes in Nigeria's most prestigious locations
            </motion.p>

            {/* Search Section */}
            <motion.div
              className="bg-primary-black/40 p-8 rounded-2xl border border-primary-gold/20 backdrop-blur-lg
                shadow-[0_8px_32px_rgba(234,179,8,0.1)] hover:shadow-[0_8px_32px_rgba(234,179,8,0.2)]
                transition-all duration-500"
              variants={itemVariants}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-gold" />
                  <input
                    type="text"
                    placeholder="Search properties..."
                    className="w-full bg-primary-black/50 border border-primary-gold/30 rounded-lg py-3 px-10 text-white
                      focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all duration-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select
                  className="w-full bg-primary-black/50 border border-primary-gold/30 rounded-lg py-3 px-4 text-white
                    focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all duration-300"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  {locations.map((location, index) => (
                    <option key={index} value={location}>{location}</option>
                  ))}
                </select>
                <select
                  className="w-full bg-primary-black/50 border border-primary-gold/30 rounded-lg py-3 px-4 text-white
                    focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all duration-300"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                >
                  {priceRanges.map((range, index) => (
                    <option key={index} value={range}>{range}</option>
                  ))}
                </select>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Properties Grid */}
      <motion.section 
        className="py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {isLoading ? (
              // Skeleton Loading
              [...Array(6)].map((_, index) => (
                <motion.div
                  key={index}
                  className="bg-primary-black/40 rounded-2xl overflow-hidden"
                  variants={itemVariants}
                >
                  <div className="animate-pulse">
                    <div className="h-64 bg-primary-black/60" />
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-primary-black/60 rounded w-3/4" />
                      <div className="h-4 bg-primary-black/60 rounded w-1/2" />
                      <div className="h-4 bg-primary-black/60 rounded w-2/3" />
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              filteredProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  className="relative rounded-2xl overflow-hidden cursor-pointer
                    bg-primary-black/40 border border-primary-gold/10 backdrop-blur-sm
                    shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_24px_rgba(234,179,8,0.2)]
                    transition-all duration-500"
                  variants={cardHoverVariants}
                  initial="rest"
                  whileHover="hover"
                  onClick={() => setSelectedProperty(property)}
                >
                  <div className="relative h-64">
                    <Image
                      src={getImageUrl(property.imageUrl)}
                      alt={property.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index < 3}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-black to-transparent opacity-60" />
                    <motion.button
                      className="absolute top-4 right-4 p-2 rounded-full bg-primary-black/50
                        hover:bg-primary-gold/80 transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(property.id)
                      }}
                    >
                      <FaHeart 
                        className={`text-xl ${
                          favorites.includes(property.id) ? 'text-red-500' : 'text-white'
                        }`}
                      />
                    </motion.button>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-4 mb-4">
                      <span className="flex items-center bg-primary-black/50 px-3 py-1 rounded-full text-white/80 text-sm">
                        <FaBed className="mr-2" />
                        {property.bedrooms} Beds
                      </span>
                      <span className="flex items-center bg-primary-black/50 px-3 py-1 rounded-full text-white/80 text-sm">
                        <FaBath className="mr-2" />
                        {property.bathrooms} Baths
                      </span>
                      <span className="flex items-center bg-primary-black/50 px-3 py-1 rounded-full text-white/80 text-sm">
                        <FaRuler className="mr-2" />
                        {property.area} sqft
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {property.title}
                    </h3>
                    <p className="text-white/80 mb-4 flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-primary-gold" />
                      {property.location}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary-gold font-bold text-xl">
                        {formatPrice(property.price)}
                      </span>
                      <motion.button
                        className="text-primary-gold hover:text-white transition-colors flex items-center"
                        whileHover={{ x: 5 }}
                      >
                        View Details
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Property Detail Modal */}
      <AnimatePresence>
        {selectedProperty && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProperty(null)}
          >
            <motion.div
              className="bg-primary-black/95 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto
                border border-primary-gold/20 backdrop-blur-xl
                shadow-[0_20px_60px_rgba(234,179,8,0.3)]"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="p-8">
                {/* Gallery */}
                <div className="mb-8 relative rounded-xl overflow-hidden group">
                  <motion.div
                    className="relative h-[500px] w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src={getImageUrl(selectedProperty.gallery[currentImageIndex])}
                      alt={`${selectedProperty.title} - Image ${currentImageIndex + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1200px) 100vw, 1200px"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-black/80 to-transparent" />
                    
                    {/* Gallery Navigation */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                      {selectedProperty.gallery.map((_, index) => (
                        <button
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            currentImageIndex === index 
                              ? 'bg-primary-gold w-4' 
                              : 'bg-white/50 hover:bg-white'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation()
                            setCurrentImageIndex(index)
                          }}
                        />
                      ))}
                    </div>

                    {/* Gallery Controls */}
                    <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.button
                        className="p-2 rounded-full bg-primary-black/50 text-white hover:bg-primary-gold/80 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          setCurrentImageIndex(prev => 
                            prev === 0 ? selectedProperty.gallery.length - 1 : prev - 1
                          )
                        }}
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </motion.button>
                      <motion.button
                        className="p-2 rounded-full bg-primary-black/50 text-white hover:bg-primary-gold/80 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          setCurrentImageIndex(prev => 
                            prev === selectedProperty.gallery.length - 1 ? 0 : prev + 1
                          )
                        }}
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>

                    {/* Gallery Toggle */}
                    <motion.button
                      className="absolute top-4 right-4 p-2 rounded-full bg-primary-black/50 text-white
                        hover:bg-primary-gold/80 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowGallery(!showGallery)
                      }}
                    >
                      <FaImage className="text-xl" />
                    </motion.button>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h2 className="text-3xl font-bold text-white mb-4">
                        {selectedProperty.title}
                      </h2>
                      <p className="text-white/80 leading-relaxed">
                        {selectedProperty.description}
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-primary-black/40 rounded-xl p-6 backdrop-blur-sm
                        border border-primary-gold/10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="text-xl font-semibold text-white mb-4">Property Details</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center text-white/80">
                          <FaBed className="text-primary-gold mr-2" />
                          {selectedProperty.bedrooms} Bedrooms
                        </div>
                        <div className="flex items-center text-white/80">
                          <FaBath className="text-primary-gold mr-2" />
                          {selectedProperty.bathrooms} Bathrooms
                        </div>
                        <div className="flex items-center text-white/80">
                          <FaRuler className="text-primary-gold mr-2" />
                          {selectedProperty.area} sqft
                        </div>
                        <div className="flex items-center text-white/80">
                          <FaMapMarkerAlt className="text-primary-gold mr-2" />
                          {selectedProperty.location}
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="bg-primary-black/40 rounded-xl p-6 backdrop-blur-sm
                        border border-primary-gold/10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3 className="text-xl font-semibold text-white mb-4">Features</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {selectedProperty.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-white/80">
                            <FaHome className="text-primary-gold mr-2" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <motion.div
                      className="bg-primary-black/40 rounded-xl p-6 backdrop-blur-sm
                        border border-primary-gold/10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h3 className="text-xl font-semibold text-white mb-4">Price</h3>
                      <div className="text-3xl font-bold text-primary-gold">
                        {formatPrice(selectedProperty.price)}
                      </div>
                      <p className="text-white/60 mt-2">Negotiable</p>
                    </motion.div>

                    <motion.div
                      className="bg-primary-black/40 rounded-xl p-6 backdrop-blur-sm
                        border border-primary-gold/10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <h3 className="text-xl font-semibold text-white mb-4">Amenities</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {selectedProperty.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center text-white/80">
                            {amenity.includes('Pool') && <FaSwimmingPool className="text-primary-gold mr-2" />}
                            {amenity.includes('Security') && <FaHome className="text-primary-gold mr-2" />}
                            {amenity.includes('Garden') && <FaTree className="text-primary-gold mr-2" />}
                            {!amenity.includes('Pool') && !amenity.includes('Security') && !amenity.includes('Garden') && (
                              <FaHome className="text-primary-gold mr-2" />
                            )}
                            {amenity}
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      className="bg-primary-black/40 rounded-xl p-6 backdrop-blur-sm
                        border border-primary-gold/10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <h3 className="text-xl font-semibold text-white mb-4">Contact Agent</h3>
                      <div className="space-y-4">
                        <motion.button
                          className="w-full bg-primary-gold text-primary-black py-4 rounded-lg font-bold
                            flex items-center justify-center hover:bg-white transition-colors duration-300"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowContactModal(true)}
                        >
                          Schedule Viewing
                        </motion.button>
                        <motion.button
                          className="w-full bg-white/10 text-white py-4 rounded-lg font-bold
                            flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Request More Info
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowContactModal(false)}
          >
            <motion.div
              className="bg-primary-black/95 rounded-2xl max-w-md w-full
                border border-primary-gold/20 backdrop-blur-xl
                shadow-[0_20px_60px_rgba(234,179,8,0.3)]"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Schedule Viewing</h2>
                <form className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="text-white/80 block mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full bg-primary-black/50 border border-primary-gold/30 rounded-lg py-3 px-4 text-white
                        focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all duration-300"
                      placeholder="Your name"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="text-white/80 block mb-2">Phone</label>
                    <input
                      type="tel"
                      className="w-full bg-primary-black/50 border border-primary-gold/30 rounded-lg py-3 px-4 text-white
                        focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all duration-300"
                      placeholder="Your phone number"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="text-white/80 block mb-2">Preferred Date</label>
                    <input
                      type="date"
                      className="w-full bg-primary-black/50 border border-primary-gold/30 rounded-lg py-3 px-4 text-white
                        focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all duration-300"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label className="text-white/80 block mb-2">Message</label>
                    <textarea
                      className="w-full bg-primary-black/50 border border-primary-gold/30 rounded-lg py-3 px-4 text-white h-32
                        focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all duration-300"
                      placeholder="Additional information or questions"
                    ></textarea>
                  </motion.div>
                  <motion.button
                    className="w-full bg-primary-gold text-primary-black py-4 rounded-lg font-bold
                      hover:bg-white transition-colors duration-300"
                    whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(234,179,8,0.2)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Submit Request
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 