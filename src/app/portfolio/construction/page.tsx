'use client'

import { motion, AnimatePresence } from 'framer-motion'
import MotionBackground from '@/components/MotionBackground'
import { FaBuilding, FaHardHat, FaClock, FaCertificate, FaSave, FaExchangeAlt, FaWhatsapp, FaShare, FaMapMarkerAlt, FaRuler, FaTools, FaSearch, FaFilter, FaMoneyBillWave } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { ConstructionProperty, BaseProperty } from '@/types/property'
import PropertyCard from '@/components/property/PropertyCard'
import PropertySearch from '@/components/property/PropertySearch'
import CompareDrawer from '@/components/property/CompareDrawer'
import PropertyDetailModal from '@/components/property/PropertyDetailModal'
import PropertyFilter from '@/components/property/PropertyFilter'

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

export default function ConstructionPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('All')
  const [priceRange, setPriceRange] = useState('All')
  const [selectedProjectType, setSelectedProjectType] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedProperty, setSelectedProperty] = useState<ConstructionProperty | null>(null)
  const [filteredListings, setFilteredListings] = useState<ConstructionProperty[]>([])
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
  const [recentlyViewed, setRecentlyViewed] = useState<ConstructionProperty[]>([])

  const featuredProject: ConstructionProperty = {
    id: 'const-1',
    title: "Luxury Apartment Complex",
    size: "2000 sqm",
    price: "₦850M",
    location: "Lekki Phase 1, Lagos",
    features: [
      "Modern Architecture",
      "Smart Home Integration",
      "Sustainable Design"
    ],
    description: "Premium residential development featuring luxury apartments with modern amenities.",
    amenities: ["Swimming Pool", "Gym", "24/7 Security"],
    image: "/construction/luxury-apartments.jpg",
    gallery: ["/construction/luxury-1.jpg", "/construction/luxury-2.jpg"],
    status: "Under Contract",
    documents: ["Building Permit", "Environmental Impact Assessment"],
    propertyType: "Residential",
    stage: "Ongoing",
    completion: "2024-12",
    developer: "Premium Developers Ltd",
    specifications: ["High-end Finishes", "Sound Proofing", "Energy Efficient"],
    facilities: ["Underground Parking", "Rooftop Garden", "Business Center"],
    phoneNumber: "+2341234567890"
  }

  const constructionListings: ConstructionProperty[] = [
    featuredProject,
    {
      id: 'const-2',
      title: "Modern Office Complex",
      size: "5000 sqm",
      price: "₦1.2B",
      location: "Victoria Island, Lagos",
      features: [
        "Grade A Office Space",
        "Green Building",
        "Smart Technology"
      ],
      description: "State-of-the-art office complex with modern facilities and sustainable features.",
      amenities: ["Conference Center", "Cafeteria", "Parking"],
      image: "/construction/office-complex.jpg",
      gallery: ["/construction/office-1.jpg", "/construction/office-2.jpg"],
      status: "Available",
      documents: ["Building Permit", "Fire Safety Approval"],
      propertyType: "Commercial",
      stage: "Ongoing",
      completion: "2024-06",
      developer: "Commercial Properties Ltd",
      specifications: ["Raised Floors", "Fiber Optics", "Central HVAC"],
      facilities: ["Loading Bay", "Security Post", "Power Plant"],
      phoneNumber: "+2341234567890"
    },
    {
      id: 'const-3',
      title: "Shopping Mall Development",
      size: "15000 sqm",
      price: "₦2.5B",
      location: "Ikeja, Lagos",
      features: [
        "Multiple Retail Spaces",
        "Entertainment Zone",
        "Food Court"
      ],
      description: "Large-scale retail development with diverse shopping and entertainment options.",
      amenities: ["Parking Complex", "Children's Play Area", "Cinema"],
      image: "/construction/mall.jpg",
      gallery: ["/construction/mall-1.jpg", "/construction/mall-2.jpg"],
      status: "Under Contract",
      documents: ["Building Permit", "Safety Certification"],
      propertyType: "Commercial",
      stage: "Ongoing",
      completion: "2025-03",
      developer: "Retail Developers Ltd",
      specifications: ["High Ceilings", "Modern HVAC", "Fire Systems"],
      facilities: ["Loading Docks", "Service Elevators", "Waste Management"],
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

  const projectTypes = [
    "All",
    "Residential",
    "Commercial",
    "Mixed Use",
    "Industrial"
  ]

  const statusOptions = [
    "All",
    "Available",
    "Under Construction",
    "Completed",
    "Sold"
  ]

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500)

    let filtered = [...constructionListings]
    
    if (searchQuery) {
      filtered = filtered.filter(property => 
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.propertyType.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedLocation !== 'All') {
      filtered = filtered.filter(property => property.location === selectedLocation)
    }

    if (selectedProjectType !== 'All') {
      filtered = filtered.filter(property => property.propertyType === selectedProjectType)
    }

    if (selectedStatus !== 'All') {
      filtered = filtered.filter(property => property.status === selectedStatus)
    }

    setFilteredListings(filtered)
  }, [searchQuery, selectedLocation, selectedProjectType, selectedStatus])

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
        propertyType: selectedProjectType,
        status: selectedStatus
      }
    }
    setSavedSearches(prev => [...prev, newSearch])
    setShowSaveSearchModal(false)
  }

  const loadSavedSearch = (search: { filters: any }) => {
    setSelectedLocation(search.filters.location)
    setSelectedProjectType(search.filters.propertyType)
    setSelectedStatus(search.filters.status)
  }

  const handlePropertySelect = (property: BaseProperty) => {
    const constProperty = property as ConstructionProperty
    setSelectedProperty(constProperty)
  }

  const renderExtraInfo = (property: BaseProperty) => {
    const constProperty = property as ConstructionProperty
    return (
      <>
        <div className="mt-4">
          <div className="text-sm text-white/60 mb-2">Project Details</div>
          <div className="space-y-2">
            <div className="flex items-center text-white/80">
              <FaBuilding className="text-primary-gold mr-2" />
              {constProperty.propertyType}
            </div>
            <div className="flex items-center text-white/80">
              <FaHardHat className="text-primary-gold mr-2" />
              Stage: {constProperty.stage}
            </div>
            <div className="flex items-center text-white/80">
              <FaClock className="text-primary-gold mr-2" />
              Completion: {constProperty.completion}
            </div>
            <div className="flex items-center text-white/80">
              <FaCertificate className="text-primary-gold mr-2" />
              {constProperty.specifications.length} Specifications
            </div>
          </div>
        </div>
      </>
    )
  }

  const renderCompareExtraInfo = (property: BaseProperty) => {
    const constProperty = property as ConstructionProperty
    return (
      <>
        <div className="mt-4">
          <div className="text-sm text-white/60 mb-2">Property Type</div>
          <div className="text-white/80">{constProperty.propertyType}</div>
        </div>
        <div className="mt-4">
          <div className="text-sm text-white/60 mb-2">Construction Stage</div>
          <div className="text-white/80">{constProperty.stage}</div>
        </div>
        <div className="mt-4">
          <div className="text-sm text-white/60 mb-2">Developer</div>
          <div className="text-white/80">{constProperty.developer}</div>
        </div>
        <div className="mt-4">
          <div className="text-sm text-white/60 mb-2">Specifications</div>
          <div className="flex flex-wrap gap-2">
            {constProperty.specifications.map((spec, index) => (
              <span key={index} className="bg-primary-gold/10 text-primary-gold px-2 py-1 rounded-full text-xs">
                {spec}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <div className="text-sm text-white/60 mb-2">Facilities</div>
          <div className="flex flex-wrap gap-2">
            {constProperty.facilities.map((facility, index) => (
              <span key={index} className="bg-primary-gold/10 text-primary-gold px-2 py-1 rounded-full text-xs">
                {facility}
              </span>
            ))}
          </div>
        </div>
      </>
    )
  }

  const shareListing = (property: ConstructionProperty) => {
    setSelectedProperty(property)
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this construction project: ${property.title} in ${property.location}`,
        url: window.location.href
      })
    } else {
      setShowShareModal(true)
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
              Construction Projects
            </motion.h1>
            <motion.p 
              className="text-xl text-white/90 mb-8 leading-relaxed"
              variants={itemVariants}
            >
              Explore ongoing and upcoming construction projects across Nigeria
            </motion.p>

            <PropertyFilter
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedProjectType={selectedProjectType}
              setSelectedProjectType={setSelectedProjectType}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              locations={locations.map(loc => ({ value: loc, label: loc }))}
              priceRanges={priceRanges.map(range => ({ value: range, label: range }))}
              projectTypes={projectTypes.map(type => ({ value: type, label: type }))}
              statusOptions={statusOptions.map(status => ({ value: status, label: status }))}
              filteredProperties={filteredListings}
              recentlyViewed={recentlyViewed}
              onPropertySelect={handlePropertySelect}
            />
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
          constructionListings.find(p => p.id === id)! as BaseProperty
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
              <h3 className="text-2xl font-bold text-white mb-6">Share Project</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-4 py-3
                    rounded-lg hover:bg-[#128C7E] transition-all duration-300"
                  onClick={() => {
                    window.open(
                      `https://wa.me/?text=Check out this construction project: ${selectedProperty.title} in ${selectedProperty.location} - ${window.location.href}`,
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
                    {selectedLocation !== 'All' && (
                      <div className="flex items-center text-white/80">
                        <FaMapMarkerAlt className="text-primary-gold mr-2" />
                        Location: {selectedLocation}
                      </div>
                    )}
                    {selectedProjectType !== 'All' && (
                      <div className="flex items-center text-white/80">
                        <FaBuilding className="text-primary-gold mr-2" />
                        Property Type: {selectedProjectType}
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
    </>
  )
} 