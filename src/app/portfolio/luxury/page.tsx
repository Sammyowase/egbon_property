'use client'

import { motion } from 'framer-motion'
import PropertyCard from '@/components/PropertyCard'

// Mock data - replace with actual data from your API
const luxuryProperties = [
  {
    id: '1',
    title: 'Ultra-Luxury Beachfront Estate',
    location: 'Palm Beach, FL',
    price: 45000000,
    bedrooms: 8,
    bathrooms: 12,
    area: 15000,
    imageUrl: '/images/luxury1.jpg',
    type: 'luxury' as const,
  },
  {
    id: '2',
    title: 'Private Island Resort',
    location: 'Caribbean Sea',
    price: 75000000,
    bedrooms: 12,
    bathrooms: 15,
    area: 25000,
    imageUrl: '/images/luxury2.jpg',
    type: 'luxury' as const,
  },
  {
    id: '3',
    title: 'Mountain-Top Luxury Retreat',
    location: 'Swiss Alps',
    price: 38000000,
    bedrooms: 7,
    bathrooms: 9,
    area: 12000,
    imageUrl: '/images/luxury3.jpg',
    type: 'luxury' as const,
  },
  // Add more properties as needed
]

export default function LuxuryPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Luxury Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {luxuryProperties.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>

      {/* Load More Button */}
      <div className="mt-12 text-center">
        <motion.button
          className="btn-outline"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Load More Luxury Properties
        </motion.button>
      </div>
    </motion.div>
  )
} 