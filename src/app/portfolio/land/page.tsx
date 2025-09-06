'use client'

import { motion, AnimatePresence } from 'framer-motion'
import MotionBackground from '@/components/MotionBackground'
import PageWrapper from '@/components/ui/PageWrapper'
import EnhancedSection from '@/components/ui/EnhancedSection'
import { FaRuler, FaMapMarkerAlt, FaTree, FaRoad, FaWater, FaCertificate, FaSearch, FaFilter, FaArrowRight, FaInfoCircle, FaPhone, FaWhatsapp, FaCheck, FaImage, FaTrash, FaExchangeAlt, FaSave, FaShare, FaBuilding, FaMountain, FaTools } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { BaseProperty } from '@/types/property'
import PropertyCard from '@/components/property/PropertyCard'
import PropertySearch from '@/components/property/PropertySearch'
import CompareDrawer from '@/components/property/CompareDrawer'
import PropertyDetailModal from '@/components/property/PropertyDetailModal'
import PropertyFilter from '@/components/property/PropertyFilter'

interface LandProperty extends BaseProperty {
  category: string
  utilities: string[]
  zoning: string
  topography: string
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

const cardHoverVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.02 }
}

const compareDrawerVariants = {
  hidden: { x: '100%' },
  visible: { 
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  }
}

export default function LandPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('All')
  const [priceRange, setPriceRange] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedProperty, setSelectedProperty] = useState<LandProperty | null>(null)
  const [filteredListings, setFilteredListings] = useState<LandProperty[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProperties, setSelectedProperties] = useState<string[]>([])
  const [showCompareDrawer, setShowCompareDrawer] = useState(false)
  const [savedSearches, setSavedSearches] = useState<{
    id: string
    name: string
    filters: any
  }[]>([])
  const [showShareModal, setShowShareModal] = useState(false)
  const [showSaveSearchModal, setShowSaveSearchModal] = useState(false)
  const [recentlyViewed, setRecentlyViewed] = useState<LandProperty[]>([])

  const featuredLand: LandProperty = {
    id: 'featured-1',
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
    image: "/background/avi-werde-hHz4yrvxwlA-unsplash.jpg",
    category: "Premium",
    gallery: ["/land/featured-1.jpg", "/land/featured-2.jpg", "/land/featured-3.jpg"],
    status: "Available",
    documents: ["C of O", "Survey Plan", "Site Plan"],
    utilities: ["Water", "Electricity", "Drainage"],
    zoning: "Mixed Use",
    topography: "Flat",
    phoneNumber: "+2341234567890"
  }

  const landListings: LandProperty[] = [
    {
      id: 'land-1',
      title: "Commercial Plot in Victoria Island",
      size: "800 sqm",
      price: "₦200M",
      location: "Victoria Island, Lagos",
      features: ["C of O Available", "Corner Piece", "Fenced"],
      description: "Strategic commercial plot in the heart of Victoria Island. Perfect for corporate headquarters or mixed-use development.",
      amenities: ["24/7 Security", "Drainage System", "Street Lights"],
      image: "/background/avi-werde-hHz4yrvxwlA-unsplash.jpg",
      category: "Commercial",
      gallery: ["/land/vi-1.jpg", "/land/vi-2.jpg"],
      status: "Available",
      documents: ["C of O", "Survey Plan"],
      utilities: ["Water", "Electricity"],
      zoning: "Commercial",
      topography: "Flat",
      phoneNumber: "+2341234567890"
    },
    {
      id: 'land-2',
      title: "Residential Land in Ikoyi",
      size: "500 sqm",
      price: "₦120M",
      location: "Ikoyi, Lagos",
      features: ["Governor's Consent", "Serene Environment", "Gated Estate"],
      description: "Beautiful residential plot in a secure, gated community. Perfect for building your dream home.",
      amenities: ["Estate Security", "Underground Drainage", "Recreational Areas"],
      image: "/background/avi-werde-hHz4yrvxwlA-unsplash.jpg",
      category: "Residential",
      gallery: ["/land/ikoyi-1.jpg", "/land/ikoyi-2.jpg"],
      status: "Under Contract",
      documents: ["Governor's Consent", "Survey Plan"],
      utilities: ["Water", "Electricity", "Gas"],
      zoning: "Residential",
      topography: "Gentle Slope",
      phoneNumber: "+2341234567890"
    },
    {
      id: 'land-3',
      title: "Waterfront Plot in Banana Island",
      size: "1200 sqm",
      price: "₦350M",
      location: "Banana Island, Lagos",
      features: ["C of O Available", "Waterfront", "Premium Location"],
      description: "Exclusive waterfront plot in Nigeria's most prestigious neighborhood. Rare investment opportunity.",
      amenities: ["Private Jetty Access", "24/7 Security", "Underground Utilities"],
      image: "/background/avi-werde-hHz4yrvxwlA-unsplash.jpg",
      category: "Premium",
      gallery: ["/land/banana-1.jpg", "/land/banana-2.jpg"],
      status: "Available",
      documents: ["C of O", "Survey Plan", "Site Plan"],
      utilities: ["Water", "Electricity", "Gas", "Internet"],
      zoning: "Residential",
      topography: "Waterfront",
      phoneNumber: "+2341234567890"
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

  const categories = [
    "All",
    "Residential",
    "Commercial",
    "Premium",
    "Industrial"
  ]

  const statusOptions = [
    "All",
    "Available",
    "Under Contract",
    "Sold"
  ]

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500)

    let filtered = [...landListings]
    
    if (searchQuery) {
      filtered = filtered.filter(property => 
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedLocation !== 'All') {
      filtered = filtered.filter(property => property.location === selectedLocation)
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(property => property.category === selectedCategory)
    }

    if (priceRange !== 'All') {
      const [min, max] = getPriceRange(priceRange)
      filtered = filtered.filter(property => {
        const price = parseInt(property.price.replace('₦', '').replace('M', ''))
        return price >= min && (max === Infinity || price <= max)
      })
    }

    if (selectedStatus !== 'All') {
      filtered = filtered.filter(property => property.status === selectedStatus)
    }

    setFilteredListings(filtered)
  }, [searchQuery, selectedLocation, selectedCategory, priceRange, selectedStatus])

  useEffect(() => {
    if (selectedProperty) {
      setRecentlyViewed(prev => {
        const newViewed = [selectedProperty, ...prev.filter(p => p.id !== selectedProperty.id)]
        return newViewed.slice(0, 5)
      })
    }
  }, [selectedProperty])

  const togglePropertyComparison = (propertyId: string) => {
    setSelectedProperties(prev => {
      if (prev.includes(propertyId)) {
        return prev.filter(id => id !== propertyId)
      }
      if (prev.length < 3) {
        return [...prev, propertyId]
      }
      return prev
    })
  }

  const saveCurrentSearch = (name: string) => {
    const newSearch = {
      id: Date.now().toString(),
      name,
      filters: {
        location: selectedLocation,
        category: selectedCategory,
        priceRange,
        status: selectedStatus
      }
    }
    setSavedSearches(prev => [...prev, newSearch])
    setShowSaveSearchModal(false)
  }

  const loadSavedSearch = (search: { filters: any }) => {
    setSelectedLocation(search.filters.location)
    setSelectedCategory(search.filters.category)
    setPriceRange(search.filters.priceRange)
    setSelectedStatus(search.filters.status)
  }

  const getPriceRange = (range: string): [number, number] => {
    switch (range) {
      case 'Below ₦50M': return [0, 50]
      case '₦50M - ₦100M': return [50, 100]
      case '₦100M - ₦200M': return [100, 200]
      case 'Above ₦200M': return [200, Infinity]
      default: return [0, Infinity]
    }
  }

  const handlePropertySelect = (property: BaseProperty) => {
    const landProperty = property as LandProperty
    setSelectedProperty(landProperty)
  }

  const renderExtraInfo = (property: BaseProperty) => {
    const landProperty = property as LandProperty
    return (
      <>
        <div className="mt-4">
          <div className="text-sm text-white/60 mb-2">Property Details</div>
          <div className="space-y-2">
            <div className="flex items-center text-white/80">
              <FaBuilding className="text-primary-gold mr-2" />
              {landProperty.category}
            </div>
            <div className="flex items-center text-white/80">
              <FaMountain className="text-primary-gold mr-2" />
              {landProperty.topography}
            </div>
            <div className="flex items-center text-white/80">
              <FaTools className="text-primary-gold mr-2" />
              {landProperty.utilities.join(', ')}
            </div>
            <div className="flex items-center text-white/80">
              <FaMapMarkerAlt className="text-primary-gold mr-2" />
              {landProperty.zoning}
            </div>
          </div>
        </div>
      </>
    )
  }

  const renderCompareExtraInfo = (property: BaseProperty) => {
    const landProperty = property as LandProperty
    return (
      <>
        <div className="mt-4">
          <div className="text-sm text-white/60 mb-2">Category</div>
          <div className="text-white/80">{landProperty.category}</div>
        </div>
        <div className="mt-4">
          <div className="text-sm text-white/60 mb-2">Topography</div>
          <div className="text-white/80">{landProperty.topography}</div>
        </div>
        <div className="mt-4">
          <div className="text-sm text-white/60 mb-2">Utilities</div>
          <div className="flex flex-wrap gap-2">
            {landProperty.utilities.map((utility, index) => (
              <span key={index} className="bg-primary-gold/10 text-primary-gold px-2 py-1 rounded-full text-xs">
                {utility}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <div className="text-sm text-white/60 mb-2">Zoning</div>
          <div className="text-white/80">{landProperty.zoning}</div>
        </div>
      </>
    )
  }

  const shareListing = (property: LandProperty) => {
    setSelectedProperty(property)
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property: ${property.title} in ${property.location}`,
        url: window.location.href
      })
    } else {
      setShowShareModal(true)
    }
  }

  return (
    <PageWrapper backgroundVariant="default">
      <MotionBackground />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 text-gradient"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Premium Land Properties
            </motion.h1>
            <motion.p 
              className="text-lg text-white/90 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Discover prime land opportunities in Nigeria's most sought-after locations
            </motion.p>

            {/* Search and Filter Section */}
            <motion.div
              className="bg-primary-black/50 p-6 rounded-lg border border-primary-gold/20 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <PropertyFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedProjectType={selectedCategory}
                setSelectedProjectType={setSelectedCategory}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                locations={locations.map(loc => ({ value: loc, label: loc }))}
                priceRanges={priceRanges.map(range => ({ value: range, label: range }))}
                projectTypes={categories.map(cat => ({ value: cat, label: cat }))}
                statusOptions={statusOptions.map(status => ({ value: status, label: status }))}
                filteredProperties={filteredListings}
                recentlyViewed={recentlyViewed}
                onPropertySelect={handlePropertySelect}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Properties Grid */}
      <motion.section 
        className="py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Floating Action Buttons */}
          <motion.div
            className="fixed bottom-6 right-6 flex flex-col gap-4 z-40"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {selectedProperties.length > 0 && (
              <motion.button
                className="bg-primary-gold text-primary-black p-4 rounded-full shadow-lg
                  hover:bg-white transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowCompareDrawer(true)}
              >
                <FaExchangeAlt className="text-xl" />
              </motion.button>
            )}
            <motion.button
              className="bg-primary-gold/80 text-primary-black p-4 rounded-full shadow-lg
                hover:bg-white transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowSaveSearchModal(true)}
            >
              <FaSave className="text-xl" />
            </motion.button>
          </motion.div>

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
              filteredListings.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property as BaseProperty}
                  onSelect={handlePropertySelect}
                  onCompare={togglePropertyComparison}
                  onShare={() => shareListing(property)}
                  extraInfo={renderExtraInfo}
                />
              ))
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Compare Drawer */}
      <CompareDrawer
        isOpen={showCompareDrawer}
        onClose={() => setShowCompareDrawer(false)}
        properties={selectedProperties.map(id => 
          landListings.find(p => p.id === id)! as BaseProperty
        )}
        extraInfo={renderCompareExtraInfo}
      />

      {/* Property Detail Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        extraInfo={renderExtraInfo}
      />

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && selectedProperty && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              className="bg-primary-black/80 border border-primary-gold/20 rounded-2xl p-6 w-full max-w-md
                backdrop-blur-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Share Property</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-4 py-3
                    rounded-lg hover:bg-[#128C7E] transition-all duration-300"
                  onClick={() => {
                    window.open(
                      `https://wa.me/?text=Check out this property: ${selectedProperty.title} in ${selectedProperty.location} - ${window.location.href}`,
                      '_blank'
                    )
                    setShowShareModal(false)
                  }}
                >
                  <FaWhatsapp className="text-lg" />
                  WhatsApp
                </button>
                <button
                  className="flex items-center justify-center gap-2 bg-primary-gold/10 text-primary-gold
                    px-4 py-3 rounded-lg hover:bg-primary-gold hover:text-primary-black
                    transition-all duration-300"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
                    setShowShareModal(false)
                  }}
                >
                  <FaShare className="text-lg" />
                  Copy Link
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Save Search Modal */}
      <AnimatePresence>
        {showSaveSearchModal && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSaveSearchModal(false)}
          >
            <motion.div
              className="bg-primary-black/80 border border-primary-gold/20 rounded-2xl p-6 w-full max-w-md
                backdrop-blur-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Save Current Search</h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-white/80 mb-2">Search Name</label>
                  <input
                    type="text"
                    className="w-full bg-primary-black/50 border border-primary-gold/30 rounded-lg py-3 px-4
                      text-white focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20
                      transition-all duration-300"
                    placeholder="Enter a name for this search"
                    onChange={e => {
                      const searchName = e.target.value.trim()
                      if (searchName) {
                        saveCurrentSearch(searchName)
                      }
                    }}
                  />
                </div>

                <div>
                  <div className="text-white/60 mb-2">Current Filters</div>
                  <div className="space-y-2">
                    {selectedLocation !== 'Location' && (
                      <div className="flex items-center text-white/80">
                        <FaMapMarkerAlt className="text-primary-gold mr-2" />
                        Location: {selectedLocation}
                      </div>
                    )}
                    {selectedCategory !== 'Category' && (
                      <div className="flex items-center text-white/80">
                        <FaBuilding className="text-primary-gold mr-2" />
                        Category: {selectedCategory}
                      </div>
                    )}
                    {priceRange !== 'Price Range' && (
                      <div className="flex items-center text-white/80">
                        <FaRuler className="text-primary-gold mr-2" />
                        Price: {priceRange}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  className="px-6 py-2 rounded-lg text-white/60 hover:text-white transition-colors"
                  onClick={() => setShowSaveSearchModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-primary-gold text-primary-black px-6 py-2 rounded-lg
                    hover:bg-white transition-all duration-300"
                  onClick={() => setShowSaveSearchModal(false)}
                >
                  Save Search
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  )
} 