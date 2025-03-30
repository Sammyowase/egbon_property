'use client'

import { motion, AnimatePresence } from 'framer-motion'
import MotionBackground from '@/components/MotionBackground'
import { FaTree, FaLeaf, FaTractor, FaCertificate, FaSave, FaExchangeAlt, FaWhatsapp, FaShare, FaMapMarkerAlt, FaRuler, FaSearch, FaFilter, FaMoneyBillWave } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { AgricultureProperty, BaseProperty } from '@/types/property'
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

export default function AgriculturePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('All')
  const [selectedSize, setSelectedSize] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedProperty, setSelectedProperty] = useState<AgricultureProperty | null>(null)
  const [filteredProperties, setFilteredProperties] = useState<AgricultureProperty[]>([])
  const [recentlyViewed, setRecentlyViewed] = useState<AgricultureProperty[]>([])
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
  const [filterHistory, setFilterHistory] = useState<{
    timestamp: number
    filters: any
  }[]>([])

  const featuredProject: AgricultureProperty = {
    id: 'agri-1',
    title: "Integrated Rice Farm",
    size: "50 hectares",
    price: "₦250M",
    location: "Kebbi State",
    features: [
      "Irrigation System",
      "Storage Facilities",
      "Processing Units"
    ],
    description: "Large-scale rice farm with modern irrigation and processing facilities.",
    amenities: ["Power Supply", "Water Source", "Access Road"],
    image: "/agriculture/rice-farm.jpg",
    gallery: ["/agriculture/rice-1.jpg", "/agriculture/rice-2.jpg"],
    status: "Available",
    documents: ["Land Title", "Environmental Impact Assessment"],
    projectType: "Crop Farming",
    yield: "4.5 tons per hectare",
    crops: ["Rice", "Maize"],
    facilities: ["Storage Silos", "Processing Plant"],
    equipment: ["Tractors", "Harvesters", "Irrigation Pumps"],
    certifications: ["Organic Certification", "GAP Certification"],
    phoneNumber: "+2341234567890"
  }

  const agricultureListings: AgricultureProperty[] = [
    featuredProject,
    {
      id: 'agri-2',
      title: "Modern Poultry Farm",
      size: "10 hectares",
      price: "₦180M",
      location: "Ogun State",
      features: [
        "Automated Feeding System",
        "Climate Control",
        "Waste Management"
      ],
      description: "State-of-the-art poultry farm with automated systems and processing facilities.",
      amenities: ["Electricity", "Borehole", "Staff Quarters"],
      image: "/agriculture/poultry-farm.jpg",
      gallery: ["/agriculture/poultry-1.jpg", "/agriculture/poultry-2.jpg"],
      status: "Available",
      documents: ["Land Title", "Business Registration"],
      projectType: "Livestock",
      yield: "50,000 birds per cycle",
      crops: [],
      facilities: ["Feed Mill", "Processing Unit", "Cold Storage"],
      equipment: ["Incubators", "Feeders", "Ventilation Systems"],
      certifications: ["NAFDAC", "SON Certification"],
      phoneNumber: "+2341234567890"
    },
    {
      id: 'agri-3',
      title: "Fish Farm Complex",
      size: "5 hectares",
      price: "₦120M",
      location: "Oyo State",
      features: [
        "Recirculating System",
        "Hatchery",
        "Processing Unit"
      ],
      description: "Modern aquaculture facility with complete production cycle from hatchery to processing.",
      amenities: ["Water Treatment", "Cold Storage", "Laboratory"],
      image: "/agriculture/fish-farm.jpg",
      gallery: ["/agriculture/fish-1.jpg", "/agriculture/fish-2.jpg"],
      status: "Under Contract",
      documents: ["Land Title", "Environmental Permit"],
      projectType: "Aquaculture",
      yield: "100 tons per annum",
      crops: [],
      facilities: ["Hatchery", "Grow-out Ponds", "Processing Plant"],
      equipment: ["Water Pumps", "Aerators", "Feeding Systems"],
      certifications: ["HACCP", "ISO 22000"],
      phoneNumber: "+2341234567890"
    },
    {
      id: 'agri-4',
      title: "Cassava Processing Plant",
      size: "20 hectares",
      price: "₦280M",
      location: "Oyo State",
      features: [
        "Mechanized Farming",
        "Processing Units",
        "Storage Facilities"
      ],
      description: "Integrated cassava farm with modern processing facilities for various cassava products.",
      amenities: ["Power Plant", "Water System", "Staff Housing"],
      image: "/agriculture/cassava-farm.jpg",
      gallery: ["/agriculture/cassava-1.jpg", "/agriculture/cassava-2.jpg"],
      status: "Available",
      documents: ["C of O", "Business Plan"],
      projectType: "Mixed Use",
      yield: "25 tons per hectare",
      crops: ["Cassava"],
      facilities: ["Processing Plant", "Storage Units", "Packaging Facility"],
      equipment: ["Tractors", "Processing Machines", "Packaging Units"],
      certifications: ["NAFDAC", "ISO 9001"],
      phoneNumber: "+2341234567890"
    }
  ]

  const locations = [
    "All",
    "Kebbi State",
    "Kaduna State",
    "Kano State",
    "Ogun State",
    "Oyo State"
  ]

  const projectTypes = [
    "All",
    "Crop Farming",
    "Livestock",
    "Mixed Use",
    "Aquaculture"
  ]

  const priceRanges = [
    "All",
    "Below ₦100M",
    "₦100M - ₦250M",
    "₦250M - ₦500M",
    "Above ₦500M"
  ]

  const statusOptions = [
    "All",
    "Available",
    "Under Contract",
    "Sold"
  ]

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500)

    let filtered = [...agricultureListings]
    
    if (searchQuery) {
      filtered = filtered.filter(property => 
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.projectType.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedLocation !== 'All') {
      filtered = filtered.filter(property => property.location === selectedLocation)
    }

    if (selectedSize !== 'All') {
      filtered = filtered.filter(property => property.size === selectedSize)
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(property => property.projectType === selectedCategory)
    }

    if (selectedStatus !== 'All') {
      filtered = filtered.filter(property => property.status === selectedStatus)
    }

    setFilteredProperties(filtered)
  }, [searchQuery, selectedLocation, selectedSize, selectedCategory, selectedStatus])

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
        size: selectedSize,
        category: selectedCategory,
        status: selectedStatus
      }
    }
    setSavedSearches(prev => [...prev, newSearch])
    setShowSaveSearchModal(false)
  }

  const loadSavedSearch = (search: { filters: any }) => {
    setSelectedLocation(search.filters.location)
    setSelectedSize(search.filters.size)
    setSelectedCategory(search.filters.category)
    setSelectedStatus(search.filters.status)
  }

  const getPriceRange = (range: string): [number, number] => {
    switch (range) {
      case 'Below ₦100M': return [0, 100]
      case '₦100M - ₦250M': return [100, 250]
      case '₦250M - ₦500M': return [250, 500]
      case 'Above ₦500M': return [500, Infinity]
      default: return [0, Infinity]
    }
  }

  const handlePropertySelect = (property: BaseProperty) => {
    const agriProperty = property as AgricultureProperty
    setSelectedProperty(agriProperty)
  }

  const renderExtraInfo = (property: BaseProperty) => {
    const agriProperty = property as AgricultureProperty
    return (
      <>
        <div className="mt-4">
          <div className="text-sm text-white/60 mb-2">Project Details</div>
          <div className="space-y-2">
            <div className="flex items-center text-white/80">
              <FaTree className="text-primary-gold mr-2" />
              {agriProperty.projectType}
            </div>
            <div className="flex items-center text-white/80">
              <FaLeaf className="text-primary-gold mr-2" />
              Yield: {agriProperty.yield}
            </div>
            <div className="flex items-center text-white/80">
              <FaTractor className="text-primary-gold mr-2" />
              {agriProperty.equipment.length} Equipment
            </div>
            <div className="flex items-center text-white/80">
              <FaCertificate className="text-primary-gold mr-2" />
              {agriProperty.certifications.length} Certifications
            </div>
          </div>
        </div>
      </>
    )
  }

  const renderCompareExtraInfo = (property: BaseProperty) => {
    const agriProperty = property as AgricultureProperty
    return (
      <>
        <div className="mt-4">
          <div className="text-sm text-white/60 mb-2">Project Type</div>
          <div className="text-white/80">{agriProperty.projectType}</div>
        </div>
        <div className="mt-4">
          <div className="text-sm text-white/60 mb-2">Yield</div>
          <div className="text-white/80">{agriProperty.yield}</div>
        </div>
        <div className="mt-4">
          <div className="text-sm text-white/60 mb-2">Crops</div>
          <div className="flex flex-wrap gap-2">
            {agriProperty.crops.map((crop, index) => (
              <span key={index} className="bg-primary-gold/10 text-primary-gold px-2 py-1 rounded-full text-xs">
                {crop}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <div className="text-sm text-white/60 mb-2">Equipment</div>
          <div className="flex flex-wrap gap-2">
            {agriProperty.equipment.map((item, index) => (
              <span key={index} className="bg-primary-gold/10 text-primary-gold px-2 py-1 rounded-full text-xs">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <div className="text-sm text-white/60 mb-2">Certifications</div>
          <div className="flex flex-wrap gap-2">
            {agriProperty.certifications.map((cert, index) => (
              <span key={index} className="bg-primary-gold/10 text-primary-gold px-2 py-1 rounded-full text-xs">
                {cert}
              </span>
            ))}
          </div>
        </div>
      </>
    )
  }

  const shareListing = (property: AgricultureProperty) => {
    setSelectedProperty(property)
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this agricultural project: ${property.title} in ${property.location}`,
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
              Agriculture Investment Projects
            </motion.h1>
            <motion.p 
              className="text-xl text-white/90 mb-8 leading-relaxed"
              variants={itemVariants}
            >
              Discover high-yield agricultural investment opportunities
            </motion.p>

            <PropertyFilter
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              priceRange={selectedSize}
              setPriceRange={setSelectedSize}
              selectedProjectType={selectedCategory}
              setSelectedProjectType={setSelectedCategory}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              locations={locations.map(loc => ({ value: loc, label: loc }))}
              priceRanges={priceRanges.map(range => ({ value: range, label: range }))}
              projectTypes={projectTypes.map(type => ({ value: type, label: type }))}
              statusOptions={statusOptions.map(status => ({ value: status, label: status }))}
              filteredProperties={filteredProperties}
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
              filteredProperties.map((property) => (
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
          agricultureListings.find(p => p.id === id)! as BaseProperty
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
                      `https://wa.me/?text=Check out this agricultural project: ${selectedProperty.title} in ${selectedProperty.location} - ${window.location.href}`,
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
                    {selectedSize !== 'All' && (
                      <div className="flex items-center text-white/80">
                        <FaLeaf className="text-primary-gold mr-2" />
                        Size: {selectedSize}
                      </div>
                    )}
                    {selectedCategory !== 'All' && (
                      <div className="flex items-center text-white/80">
                        <FaTree className="text-primary-gold mr-2" />
                        Project Type: {selectedCategory}
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