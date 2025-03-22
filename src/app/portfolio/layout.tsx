'use client'

import { motion } from 'framer-motion'
import MotionBackground from '@/components/MotionBackground'

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <MotionBackground />
      
      {/* Portfolio Header */}
      <section className="pt-32 pb-16 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Our Portfolio
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Explore our curated collection of premium properties and investment opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-primary-black/95">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {/* Location Filter */}
            <div className="relative">
              <select className="w-full px-4 py-3 bg-primary-black border border-primary-gold/30 rounded-md text-white focus:border-primary-gold focus:ring-1 focus:ring-primary-gold outline-none appearance-none cursor-pointer">
                <option value="">Find by Location</option>
                <option value="new-york">New York</option>
                <option value="los-angeles">Los Angeles</option>
                <option value="miami">Miami</option>
                <option value="chicago">Chicago</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-gold pointer-events-none">
                ▼
              </div>
            </div>

            {/* Property Type Filter */}
            <div className="relative">
              <select className="w-full px-4 py-3 bg-primary-black border border-primary-gold/30 rounded-md text-white focus:border-primary-gold focus:ring-1 focus:ring-primary-gold outline-none appearance-none cursor-pointer">
                <option value="">Property Type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="land">Land</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-gold pointer-events-none">
                ▼
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="relative">
              <select className="w-full px-4 py-3 bg-primary-black border border-primary-gold/30 rounded-md text-white focus:border-primary-gold focus:ring-1 focus:ring-primary-gold outline-none appearance-none cursor-pointer">
                <option value="">Price Range</option>
                <option value="0-500000">$0 - $500,000</option>
                <option value="500000-1000000">$500,000 - $1,000,000</option>
                <option value="1000000-2000000">$1,000,000 - $2,000,000</option>
                <option value="2000000+">$2,000,000+</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-gold pointer-events-none">
                ▼
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 bg-primary-black/90">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </section>
    </div>
  )
} 