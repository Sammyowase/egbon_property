'use client'

import { motion, AnimatePresence } from 'framer-motion'
import MotionBackground from '@/components/MotionBackground'
import { FaRuler, FaMapMarkerAlt, FaTree, FaRoad, FaWater, FaCertificate, FaSearch, FaFilter, FaArrowRight, FaInfoCircle, FaPhone, FaWhatsapp, FaCheck, FaImage } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import Image from 'next/image'

interface LandProperty {
  title: string
  size: string
  price: string
  location: string
  features: string[]
  description: string
  amenities: string[]
  image: string
  category?: string
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

export default function LandPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('All')
  const [priceRange, setPriceRange] = useState('All')
  const [selectedLand, setSelectedLand] = useState<LandProperty | null>(null)
  const [showContactModal, setShowContactModal] = useState(false)
  const [filteredListings, setFilteredListings] = useState<LandProperty[]>([])
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showGallery, setShowGallery] = useState(false)

  const featuredLand = {
    title: "Premium Land in Lekki Phase 1",
    size: "1000 sqm",
    price: "₦150M",
    location: "Lekki Phase 1, Lagos",
    features: [
      "C of O Documentation",
      "Waterfront Access",
      "Developed Area",
      "Road Network"
    ],
    description: "Prime waterfront land perfect for luxury development. Fully documented with C of O and all necessary approvals.",
    amenities: ["Electricity", "Water", "Security", "Good Road"],
    image: "/land/featured-land.jpg",
    gallery: ["/land/featured-1.jpg", "/land/featured-2.jpg", "/land/featured-3.jpg"]
  }

  const landListings = [
    {
      title: "Commercial Plot in Victoria Island",
      size: "800 sqm",
      price: "₦200M",
      location: "Victoria Island, Lagos",
      features: ["C of O Available", "Corner Piece", "Fenced"],
      description: "Strategic commercial plot in the heart of Victoria Island. Perfect for corporate headquarters or mixed-use development.",
      amenities: ["24/7 Security", "Drainage System", "Street Lights"],
      image: "/land/land1.jpg",
      category: "Commercial",
      gallery: ["/land/vi-1.jpg", "/land/vi-2.jpg"]
    },
    {
      title: "Residential Land in Ikoyi",
      size: "500 sqm",
      price: "₦120M",
      location: "Ikoyi, Lagos",
      features: ["Governor's Consent", "Serene Environment", "Gated Estate"],
      description: "Beautiful residential plot in a secure, gated community. Perfect for building your dream home.",
      amenities: ["Estate Security", "Underground Drainage", "Recreational Areas"],
      image: "/land/land2.jpg",
      category: "Residential",
      gallery: ["/land/ikoyi-1.jpg", "/land/ikoyi-2.jpg"]
    },
    {
      title: "Waterfront Plot in Banana Island",
      size: "1200 sqm",
      price: "₦350M",
      location: "Banana Island, Lagos",
      features: ["C of O Available", "Waterfront", "Premium Location"],
      description: "Exclusive waterfront plot in Nigeria's most prestigious neighborhood. Rare investment opportunity.",
      amenities: ["Private Jetty Access", "24/7 Security", "Underground Utilities"],
      image: "/land/land3.jpg",
      category: "Premium",
      gallery: ["/land/banana-1.jpg", "/land/banana-2.jpg"]
    }
  ]

  const locations = [
    "All",
    "Lekki Phase 1",
    "Victoria Island",
    "Ikoyi",
    "Banana Island",
    "Ajah"
  ]

  const priceRanges = [
    "All",
    "Below ₦50M",
    "₦50M - ₦100M",
    "₦100M - ₦200M",
    "Above ₦200M"
  ]

  const categories = ["All", "Commercial", "Residential", "Premium"]

  useEffect(() => {
    // Simulate loading state
    setTimeout(() => setIsLoading(false), 1500)

    // Filter listings based on search and filters
    let filtered = [...landListings]
    
    if (searchQuery) {
      filtered = filtered.filter(land => 
        land.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        land.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        land.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedLocation !== 'All') {
      filtered = filtered.filter(land => land.location.includes(selectedLocation))
    }

    if (priceRange !== 'All') {
      // Add price range filtering logic here
      const [min, max] = getPriceRange(priceRange)
      filtered = filtered.filter(land => {
        const price = parseInt(land.price.replace('₦', '').replace('M', ''))
        return price >= min && (max === Infinity || price <= max)
      })
    }

    setFilteredListings(filtered)
  }, [searchQuery, selectedLocation, priceRange])

  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedLand && showGallery) {
        setCurrentImageIndex((prev) => 
          prev === selectedLand.gallery.length - 1 ? 0 : prev + 1
        )
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [selectedLand, showGallery])

  const getPriceRange = (range: string): [number, number] => {
    switch (range) {
      case 'Below ₦50M': return [0, 50]
      case '₦50M - ₦100M': return [50, 100]
      case '₦100M - ₦200M': return [100, 200]
      case 'Above ₦200M': return [200, Infinity]
      default: return [0, Infinity]
    }
  }

  return (
    <>
      <MotionBackground />
      
      {/* Hero Section with Enhanced Animation */}
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
              Discover Premium Land
            </motion.h1>
            <motion.p 
              className="text-xl text-white/90 mb-8 leading-relaxed"
              variants={itemVariants}
            >
              Explore exclusive land opportunities in Nigeria's prime locations
            </motion.p>

            {/* Enhanced Search Section with Glass Effect */}
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
                    placeholder="Search land properties..."
                    className="w-full bg-primary-black/50 border border-primary-gold/30 rounded-md py-2 pl-10 pr-4 text-white
                      focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all duration-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select
                  className="w-full bg-primary-black/50 border border-primary-gold/30 rounded-md py-2 px-4 text-white
                    focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all duration-300"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  {locations.map((location, index) => (
                    <option key={index} value={location}>{location}</option>
                  ))}
                </select>
                <select
                  className="w-full bg-primary-black/50 border border-primary-gold/30 rounded-md py-2 px-4 text-white
                    focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all duration-300"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                >
                  {priceRanges.map((range, index) => (
                    <option key={index} value={range}>{range}</option>
                  ))}
                </select>
              </div>

              {/* Active Filters */}
              <div className="flex flex-wrap gap-2 mt-4">
                {activeFilters.map((filter, index) => (
                  <motion.span
                    key={index}
                    className="bg-primary-gold/20 text-primary-gold px-3 py-1 rounded-full text-sm flex items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    {filter}
                    <button
                      className="ml-2 hover:text-white"
                      onClick={() => {
                        setActiveFilters(activeFilters.filter(f => f !== filter))
                      }}
                    >
                      ×
                    </button>
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Land with Interactive Gallery */}
      <motion.section 
        className="py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="relative rounded-2xl overflow-hidden cursor-pointer
              shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_40px_rgba(234,179,8,0.2)]
              transition-all duration-500"
            variants={cardHoverVariants}
            initial="rest"
            whileHover="hover"
            onClick={() => setSelectedLand(featuredLand)}
          >
            <div className="relative h-[400px] md:h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-t from-primary-black via-primary-black/60 to-transparent z-10" />
              <div className="absolute inset-0 bg-primary-gold/20" />
            </div>
            <motion.div 
              className="absolute bottom-0 left-0 right-0 p-8 z-20"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex flex-wrap items-center gap-4 text-white/80 mb-4">
                <span className="flex items-center bg-primary-black/50 px-4 py-2 rounded-full">
                  <FaRuler className="mr-2" />
                  {featuredLand.size}
                </span>
                <span className="flex items-center bg-primary-black/50 px-4 py-2 rounded-full">
                  <FaMapMarkerAlt className="mr-2" />
                  {featuredLand.location}
                </span>
                <span className="flex items-center bg-primary-gold text-primary-black px-4 py-2 rounded-full font-bold">
                  {featuredLand.price}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {featuredLand.title}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {featuredLand.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center text-white/90"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <FaCertificate className="text-primary-gold mr-2" />
                    {feature}
                  </motion.div>
                ))}
              </div>
              <div className="flex gap-4">
                <motion.button
                  className="bg-primary-gold text-primary-black px-6 py-3 rounded-full font-bold
                    hover:bg-white transition-colors duration-300 inline-flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowContactModal(true)
                  }}
                >
                  Contact Agent
                </motion.button>
                <motion.button
                  className="bg-white/10 text-white px-6 py-3 rounded-full font-bold
                    hover:bg-white/20 transition-colors duration-300 inline-flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaInfoCircle className="mr-2" />
                  View Details
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Land Listings Grid with Enhanced Cards */}
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
            {filteredListings.map((land, index) => (
              <motion.div
                key={index}
                className="relative rounded-2xl overflow-hidden cursor-pointer
                  bg-primary-black/40 border border-primary-gold/10 backdrop-blur-sm
                  shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_24px_rgba(234,179,8,0.2)]
                  transition-all duration-500"
                variants={cardHoverVariants}
                initial="rest"
                whileHover="hover"
                onClick={() => setSelectedLand(land)}
              >
                <div className="relative h-48">
                  <div className="absolute inset-0 bg-primary-gold/20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-black to-transparent opacity-60" />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-primary-black/50 px-3 py-1 rounded-full text-white/80 text-sm">
                      {land.size}
                    </span>
                    <span className="bg-primary-gold/20 px-3 py-1 rounded-full text-primary-gold text-sm">
                      {land.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {land.title}
                  </h3>
                  <p className="text-white/80 mb-4 flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-primary-gold" />
                    {land.location}
                  </p>
                  <div className="space-y-2 mb-4">
                    {land.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-white/70">
                        <FaCertificate className="text-primary-gold mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-primary-gold font-bold text-xl">
                      {land.price}
                    </span>
                    <motion.button
                      className="text-primary-gold hover:text-white transition-colors flex items-center"
                      whileHover={{ x: 5 }}
                    >
                      View Details
                      <FaArrowRight className="ml-2" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced Property Detail Modal with Gallery */}
      <AnimatePresence>
        {selectedLand && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLand(null)}
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
                {/* Gallery Section */}
                <div className="mb-8 relative rounded-xl overflow-hidden">
                  <motion.div
                    className="relative h-[400px] w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src={selectedLand.gallery[currentImageIndex]}
                      alt={`Gallery image ${currentImageIndex + 1}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-black/80 to-transparent" />
                  </motion.div>
                  <motion.button
                    className="absolute top-4 right-4 bg-primary-black/50 p-2 rounded-full
                      hover:bg-primary-gold/80 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowGallery(!showGallery)}
                  >
                    <FaImage className="text-white text-xl" />
                  </motion.button>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h2 className="text-3xl font-bold text-white mb-4">{selectedLand.title}</h2>
                      <p className="text-white/80 leading-relaxed">{selectedLand.description}</p>
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
                          <FaRuler className="text-primary-gold mr-2" />
                          {selectedLand.size}
                        </div>
                        <div className="flex items-center text-white/80">
                          <FaMapMarkerAlt className="text-primary-gold mr-2" />
                          {selectedLand.location}
                        </div>
                        <div className="flex items-center text-white/80">
                          <FaCertificate className="text-primary-gold mr-2" />
                          Documentation
                        </div>
                        <div className="flex items-center text-white/80">
                          <FaRoad className="text-primary-gold mr-2" />
                          Access Road
                        </div>
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
                      transition={{ delay: 0.4 }}
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
                          <FaPhone className="mr-2" />
                          Call Agent
                        </motion.button>
                        <motion.button
                          className="w-full bg-green-600 text-white py-4 rounded-lg font-bold
                            flex items-center justify-center hover:bg-green-500 transition-colors duration-300"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => window.open('https://wa.me/1234567890')}
                        >
                          <FaWhatsapp className="mr-2" />
                          WhatsApp
                        </motion.button>
                      </div>
                    </motion.div>

                    <motion.div
                      className="bg-primary-black/40 rounded-xl p-6 backdrop-blur-sm
                        border border-primary-gold/10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h3 className="text-xl font-semibold text-white mb-4">Price</h3>
                      <div className="text-3xl font-bold text-primary-gold">{selectedLand.price}</div>
                      <p className="text-white/60 mt-2">Negotiable</p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Contact Modal */}
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
                <h2 className="text-2xl font-bold text-white mb-6">Contact Agent</h2>
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
                    <label className="text-white/80 block mb-2">Message</label>
                    <textarea
                      className="w-full bg-primary-black/50 border border-primary-gold/30 rounded-lg py-3 px-4 text-white h-32
                        focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all duration-300"
                      placeholder="Your message"
                    ></textarea>
                  </motion.div>
                  <motion.button
                    className="w-full bg-primary-gold text-primary-black py-4 rounded-lg font-bold
                      hover:bg-white transition-colors duration-300"
                    whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(234,179,8,0.2)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Message
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