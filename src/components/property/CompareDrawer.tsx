import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { FaMapMarkerAlt, FaRuler, FaWhatsapp, FaTrash, FaCheck, FaTimes, FaChartBar } from 'react-icons/fa'
import { BaseProperty } from '@/types/property'

interface CompareDrawerProps {
  isOpen: boolean
  onClose: () => void
  properties: BaseProperty[]
  extraInfo: (property: BaseProperty) => JSX.Element
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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3
    }
  }
}

export default function CompareDrawer({
  isOpen,
  onClose,
  properties,
  extraInfo
}: CompareDrawerProps) {
  if (!isOpen || properties.length === 0) return null

  const getCommonFeatures = () => {
    const allFeatures = properties.map(p => p.features).flat()
    const uniqueFeatures = [...new Set(allFeatures)]
    return uniqueFeatures.map(feature => ({
      name: feature,
      count: properties.filter(p => p.features.includes(feature)).length,
      percentage: (properties.filter(p => p.features.includes(feature)).length / properties.length) * 100
    }))
  }

  const getCommonAmenities = () => {
    const allAmenities = properties.map(p => p.amenities).flat()
    const uniqueAmenities = [...new Set(allAmenities)]
    return uniqueAmenities.map(amenity => ({
      name: amenity,
      count: properties.filter(p => p.amenities.includes(amenity)).length,
      percentage: (properties.filter(p => p.amenities.includes(amenity)).length / properties.length) * 100
    }))
  }

  const getPriceRange = () => {
    const prices = properties.map(p => parseInt(p.price.replace(/[^\d]/g, '')))
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
      avg: prices.reduce((a, b) => a + b, 0) / prices.length
    }
  }

  const getSizeRange = () => {
    const sizes = properties.map(p => parseInt(p.size.replace(/[^\d]/g, '')))
    return {
      min: Math.min(...sizes),
      max: Math.max(...sizes),
      avg: sizes.reduce((a, b) => a + b, 0) / sizes.length
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <AnimatePresence>
      {isOpen && properties.length > 0 && (
        <motion.div
          className="fixed inset-y-0 right-0 w-full md:w-2/3 lg:w-1/2 bg-primary-black/95 z-50
            border-l border-primary-gold/20 backdrop-blur-xl overflow-y-auto"
          variants={compareDrawerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Compare Properties</h3>
              <button
                className="text-white/60 hover:text-white transition-colors"
                onClick={onClose}
              >
                <FaTrash className="text-xl" />
              </button>
            </div>

            {/* Summary Section */}
            <motion.div
              className="mb-8 bg-primary-black/50 rounded-xl p-6 border border-primary-gold/10"
              variants={itemVariants}
            >
              <h4 className="text-lg font-semibold text-white mb-4">Quick Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-white/60 mb-2">Price Range</div>
                  <div className="space-y-1">
                    <div className="text-white/80">Min: {formatCurrency(getPriceRange().min)}</div>
                    <div className="text-white/80">Max: {formatCurrency(getPriceRange().max)}</div>
                    <div className="text-primary-gold font-semibold">
                      Avg: {formatCurrency(getPriceRange().avg)}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-white/60 mb-2">Size Range</div>
                  <div className="space-y-1">
                    <div className="text-white/80">Min: {getSizeRange().min} sqm</div>
                    <div className="text-white/80">Max: {getSizeRange().max} sqm</div>
                    <div className="text-primary-gold font-semibold">
                      Avg: {Math.round(getSizeRange().avg)} sqm
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-white/60 mb-2">Status</div>
                  <div className="space-y-1">
                    {properties.map((property, index) => (
                      <div
                        key={index}
                        className={`text-sm rounded-full px-3 py-1 inline-block mr-2
                          ${property.status === 'Available' ? 'bg-green-500/20 text-green-500' :
                            property.status === 'Under Contract' ? 'bg-yellow-500/20 text-yellow-500' :
                            'bg-red-500/20 text-red-500'}`}
                      >
                        {property.status}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Common Features */}
            <motion.div
              className="mb-8 bg-primary-black/50 rounded-xl p-6 border border-primary-gold/10"
              variants={itemVariants}
            >
              <h4 className="text-lg font-semibold text-white mb-4">Common Features</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getCommonFeatures().map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-primary-black/30 rounded-lg p-3"
                  >
                    <span className="text-white/80">{feature.name}</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-primary-black/50 rounded-full h-2 mr-3">
                        <motion.div
                          className="bg-primary-gold h-full rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${feature.percentage}%` }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        />
                      </div>
                      <span className="text-primary-gold text-sm">{feature.count}/{properties.length}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Property Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map(property => (
                <div key={property.id} className="bg-primary-black/50 rounded-xl p-4">
                  <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <h4 className="text-lg font-bold text-white mb-2">{property.title}</h4>
                  
                  <div className="space-y-4">
                    <div className="text-white/80">
                      <div className="text-sm text-white/60 mb-1">Location</div>
                      {property.location}
                    </div>
                    <div className="text-white/80">
                      <div className="text-sm text-white/60 mb-1">Size</div>
                      {property.size}
                    </div>
                    <div className="text-white/80">
                      <div className="text-sm text-white/60 mb-1">Status</div>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs
                        ${property.status === 'Available' ? 'bg-green-500/20 text-green-400' :
                          property.status === 'Under Contract' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'}`}
                      >
                        {property.status}
                      </span>
                    </div>
                  </div>

                  {extraInfo(property)}

                  <div className="mt-6">
                    <div className="text-primary-gold font-bold text-xl mb-1">
                      {property.price}
                    </div>
                    <div className="text-white/60 text-sm">
                      Asking Price
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 