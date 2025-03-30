'use client'

import { motion, AnimatePresence } from 'framer-motion'
import MotionBackground from '@/components/MotionBackground'
import { FaTree, FaMapMarkerAlt, FaSearch, FaWater, FaSun, FaLeaf, FaTractor, FaMountain, FaRoad, FaSeedling, FaTrash, FaWhatsapp, FaShare, FaRuler, FaSave, FaExchangeAlt, FaFilter, FaMoneyBillWave, FaCertificate } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import CompareDrawer from '@/components/property/CompareDrawer'
import { BaseProperty } from '@/types/property'
import PropertyCard from '@/components/property/PropertyCard'
import PropertySearch from '@/components/property/PropertySearch'
import PropertyDetailModal from '@/components/property/PropertyDetailModal'
import PropertyFilter from '@/components/property/PropertyFilter'

interface FarmlandProperty extends BaseProperty {
  category: 'Crop Farming' | 'Livestock' | 'Mixed Use' | 'Aquaculture'
  soilType: string
  waterSource: string[]
  crops: string[]
  infrastructure: string[]
  accessibility: string
  seasonality: string
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

export default function FarmlandPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('All')
  const [selectedSize, setSelectedSize] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedProperty, setSelectedProperty] = useState<FarmlandProperty | null>(null)
  const [showContactModal, setShowContactModal] = useState(false)
  const [filteredProperties, setFilteredProperties] = useState<FarmlandProperty[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showGallery, setShowGallery] = useState(false)
  const [selectedProperties, setSelectedProperties] = useState<string[]>([])
  const [showCompareDrawer, setShowCompareDrawer] = useState(false)
  const [savedSearches, setSavedSearches] = useState<{
    id: string
    name: string
    filters: any
  }[]>([])
  const [showShareModal, setShowShareModal] = useState(false)
  const [showSaveSearchModal, setShowSaveSearchModal] = useState(false)
  const [recentlyViewed, setRecentlyViewed] = useState<FarmlandProperty[]>([])
  const [filterHistory, setFilterHistory] = useState<{
    timestamp: number
    filters: any
  }[]>([])

  const farmlandProperties: FarmlandProperty[] = [
    {
      id: '1',
      title: 'Premium Farmland Estate',
      location: 'Oyo State',
      size: '1000 hectares',
      price: '₦500M',
      status: 'Available',
      image: '/farmland/estate-1.jpg',
      description: "Expansive farmland with rich soil perfect for large-scale agriculture. Features natural water sources and excellent road access.",
      features: [
        "Rich Loamy Soil",
        "Year-round Water Access",
        "Power Supply",
        "Security Post",
        "Access Roads",
        "Storage Facilities",
        "Farm Equipment",
        "Staff Quarters"
      ],
      amenities: ["Electricity", "Security", "Storage Facilities", "Internet Coverage"],
      gallery: ['/farmland/estate-1.jpg', '/farmland/estate-2.jpg', '/farmland/estate-3.jpg'],
      category: "Crop Farming",
      soilType: "Loamy",
      waterSource: ["River", "Boreholes"],
      crops: ["Maize", "Cassava", "Rice", "Vegetables"],
      infrastructure: ["Electricity", "Security", "Storage Facilities", "Internet Coverage"],
      accessibility: "Paved Road Access",
      seasonality: "Year-round farming",
      documents: ["C of O", "Survey Plan", "Soil Analysis Report"],
      phoneNumber: "+234123456789"
    },
    {
      id: '2',
      title: 'Riverside Agricultural Land',
      location: 'Kwara State',
      size: '500 hectares',
      price: '₦300M',
      status: 'Under Contract',
      image: '/farmland/riverside-1.jpg',
      description: "Strategic farmland with river frontage, ideal for irrigation-dependent crops. Includes basic infrastructure and storage facilities.",
      features: [
        "River Frontage",
        "Irrigation System",
        "Storage Facilities",
        "Security",
        "Farm House"
      ],
      amenities: ["Water Pump", "Storage", "Farm House"],
      gallery: ['/farmland/riverside-1.jpg', '/farmland/riverside-2.jpg', '/farmland/riverside-3.jpg'],
      category: "Mixed Use",
      soilType: "Sandy Loam",
      waterSource: ["River", "Rain-fed"],
      crops: ["Rice", "Vegetables", "Sugarcane"],
      infrastructure: ["Water Pump", "Storage Facilities", "Farm House", "Irrigation System"],
      accessibility: "Gravel Road",
      seasonality: "Dual season farming",
      documents: ["Survey Plan", "Deed of Assignment"],
      phoneNumber: "+234123456789"
    },
    {
      id: '3',
      title: 'Highland Farm Estate',
      location: 'Plateau State',
      size: '300 hectares',
      price: '₦250M',
      status: 'Available',
      image: '/farmland/highland-1.jpg',
      description: "High-altitude farmland perfect for temperate crops. Features cool climate and natural springs.",
      features: [
        "Cool Climate",
        "Natural Springs",
        "Mountain Views",
        "Rich Soil",
        "Existing Crops"
      ],
      amenities: ["Water Source", "Basic Infrastructure"],
      gallery: ['/farmland/highland-1.jpg', '/farmland/highland-2.jpg', '/farmland/highland-3.jpg'],
      category: "Crop Farming",
      soilType: "Volcanic Soil",
      waterSource: ["Springs", "Rain-fed"],
      crops: ["Tea", "Coffee", "Vegetables", "Fruits"],
      infrastructure: ["Water Source", "Basic Infrastructure", "Storage Facilities"],
      accessibility: "Mountain Road",
      seasonality: "Cool climate farming",
      documents: ["C of O", "Environmental Impact Assessment"],
      phoneNumber: "+234123456789"
    }
  ]

  const locations = [
    "All",
    "Ogun State",
    "Oyo State",
    "Osun State",
    "Ekiti State",
    "Ondo State"
  ]

  const sizes = [
    "All",
    "100-300 hectares",
    "301-500 hectares",
    "501-1000 hectares",
    "1000+ hectares"
  ]

  const categories = [
    "All",
    "Crop Farming",
    "Livestock",
    "Mixed Use",
    "Aquaculture"
  ]

  const statusOptions = [
    "All",
    "Available",
    "Under Contract",
    "Sold"
  ]

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500)

    let filtered = [...farmlandProperties]
    
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

    if (selectedSize !== 'All') {
      filtered = filtered.filter(property => {
        const size = parseInt(property.size)
        const [min, max] = selectedSize.split('-').map(s => parseInt(s))
        return size >= min && (max ? size <= max : true)
      })
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(property => property.category === selectedCategory)
    }

    if (selectedStatus !== 'All') {
      filtered = filtered.filter(property => property.status === selectedStatus)
    }

    setFilteredProperties(filtered)

    // Save filter history
    if (selectedLocation !== 'All' || selectedCategory !== 'All' || 
        selectedSize !== 'All' || selectedStatus !== 'All') {
      setFilterHistory(prev => [{
        timestamp: Date.now(),
        filters: {
          location: selectedLocation,
          category: selectedCategory,
          size: selectedSize,
          status: selectedStatus
        }
      }, ...prev.slice(0, 9)])
    }
  }, [searchQuery, selectedLocation, selectedCategory, selectedSize, selectedStatus])

  // Ensure images exist before rendering
  const getImageUrl = (url: string) => {
    try {
      return url.startsWith('http') ? url : url.startsWith('/') ? url : `/${url}`
    } catch (error) {
      return '/images/placeholder.jpg'
    }
  }

  const renderExtraInfo = (property: BaseProperty) => {
    const farmProperty = property as FarmlandProperty
    return (
      <>
        <div className="mt-4">
          <div className="text-sm text-white/60 mb-2">Property Details</div>
          <div className="space-y-2">
            <div className="flex items-center text-white/80">
              <FaTree className="text-primary-gold mr-2" />
              {farmProperty.category}
            </div>
            <div className="flex items-center text-white/80">
              <FaWater className="text-primary-gold mr-2" />
              {farmProperty.waterSource.join(', ')}
            </div>
            <div className="flex items-center text-white/80">
              <FaSeedling className="text-primary-gold mr-2" />
              {farmProperty.soilType}
            </div>
            <div className="flex items-center text-white/80">
              <FaRoad className="text-primary-gold mr-2" />
              {farmProperty.accessibility}
            </div>
          </div>
        </div>
      </>
    )
  }

  const renderCompareExtraInfo = (property: BaseProperty) => {
    const farmProperty = property as FarmlandProperty
    return (
      <>
        <div className="mt-4">
          <div className="text-sm text-white/60 mb-2">Category</div>
          <div className="text-white/80">{farmProperty.category}</div>
        </div>
        <div className="mt-4">
          <div className="text-sm text-white/60 mb-2">Soil Type</div>
          <div className="text-white/80">{farmProperty.soilType}</div>
        </div>
        <div className="mt-4">
          <div className="text-sm text-white/60 mb-2">Water Sources</div>
          <div className="flex flex-wrap gap-2">
            {farmProperty.waterSource.map((source, index) => (
              <span key={index} className="bg-primary-gold/10 text-primary-gold px-2 py-1 rounded-full text-xs">
                {source}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <div className="text-sm text-white/60 mb-2">Crops</div>
          <div className="flex flex-wrap gap-2">
            {farmProperty.crops.map((crop, index) => (
              <span key={index} className="bg-primary-gold/10 text-primary-gold px-2 py-1 rounded-full text-xs">
                {crop}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <div className="text-sm text-white/60 mb-2">Infrastructure</div>
          <div className="flex flex-wrap gap-2">
            {farmProperty.infrastructure.map((item, index) => (
              <span key={index} className="bg-primary-gold/10 text-primary-gold px-2 py-1 rounded-full text-xs">
                {item}
              </span>
            ))}
          </div>
        </div>
      </>
    )
  }

  // Share function
  const shareListing = (property: FarmlandProperty) => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this farmland: ${property.title} in ${property.location}`,
        url: window.location.href
      })
    } else {
      setShowShareModal(true)
    }
  }

  // Save search function
  const saveCurrentSearch = (name: string) => {
    const newSearch = {
      id: Date.now().toString(),
      name,
      filters: {
        location: selectedLocation,
        category: selectedCategory,
        size: selectedSize,
        status: selectedStatus
      }
    }
    setSavedSearches(prev => [...prev, newSearch])
    setShowSaveSearchModal(false)
  }

  // Load saved search
  const loadSavedSearch = (search: { filters: any }) => {
    setSelectedLocation(search.filters.location)
    setSelectedCategory(search.filters.category)
    setSelectedSize(search.filters.size)
    setSelectedStatus(search.filters.status)
  }

  // Property comparison
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

  // Handle recently viewed properties
  useEffect(() => {
    if (selectedProperty) {
      setRecentlyViewed(prev => {
        const newViewed = [selectedProperty, ...prev.filter(p => p.id !== selectedProperty.id)]
        return newViewed.slice(0, 5)
      })
    }
  }, [selectedProperty])

  // Handle property selection
  const handlePropertySelect = (property: BaseProperty) => {
    setSelectedProperty(property as FarmlandProperty)
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
              Premium Farmland Properties
            </motion.h1>
            <motion.p 
              className="text-xl text-white/90 mb-8 leading-relaxed"
              variants={itemVariants}
            >
              Discover prime agricultural land for your farming ventures
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
              priceRanges={sizes.map(range => ({ value: range, label: range }))}
              projectTypes={categories.map(type => ({ value: type, label: type }))}
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
          farmlandProperties.find(p => p.id === id)! as BaseProperty
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
                      `https://wa.me/?text=Check out this farmland property: ${selectedProperty.title} in ${selectedProperty.location} - ${window.location.href}`,
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
                    {selectedCategory !== 'All' && (
                      <div className="flex items-center text-white/80">
                        <FaTree className="text-primary-gold mr-2" />
                        Category: {selectedCategory}
                      </div>
                    )}
                    {selectedSize !== 'All' && (
                      <div className="flex items-center text-white/80">
                        <FaRuler className="text-primary-gold mr-2" />
                        Size: {selectedSize}
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