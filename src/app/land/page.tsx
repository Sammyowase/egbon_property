'use client'

import { motion } from 'framer-motion'
import MotionBackground from '@/components/MotionBackground'
import { FaRuler, FaMapMarkerAlt, FaTree, FaRoad, FaWater, FaCertificate, FaSearch, FaFilter } from 'react-icons/fa'
import { useState } from 'react'
import Image from 'next/image'

export default function LandPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('All')
  const [priceRange, setPriceRange] = useState('All')

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
    image: "/land/featured-land.jpg"
  }

  const landListings = [
    {
      title: "Commercial Plot in Victoria Island",
      size: "800 sqm",
      price: "₦200M",
      location: "Victoria Island, Lagos",
      features: ["C of O Available", "Corner Piece", "Fenced"],
      image: "/land/land1.jpg",
      category: "Commercial"
    },
    {
      title: "Residential Land in Ikoyi",
      size: "500 sqm",
      price: "₦120M",
      location: "Ikoyi, Lagos",
      features: ["Governor's Consent", "Serene Environment", "Gated Estate"],
      image: "/land/land2.jpg",
      category: "Residential"
    },
    {
      title: "Waterfront Plot in Banana Island",
      size: "1200 sqm",
      price: "₦350M",
      location: "Banana Island, Lagos",
      features: ["C of O Available", "Waterfront", "Premium Location"],
      image: "/land/land3.jpg",
      category: "Premium"
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

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  }

  return (
    <>
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

            {/* Search Section */}
            <motion.div
              className="bg-primary-black/50 p-6 rounded-lg border border-primary-gold/20 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
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
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Land */}
      <motion.section 
        className="py-16 bg-primary-black/95"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="relative rounded-lg overflow-hidden group cursor-pointer"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
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
              <motion.button
                className="bg-primary-gold text-primary-black px-6 py-3 rounded-full font-bold
                  hover:bg-white transition-colors duration-300 inline-flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Details
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Land Listings */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {landListings.map((land, index) => (
              <motion.div
                key={index}
                className="relative rounded-lg overflow-hidden group cursor-pointer bg-primary-black/50 border border-primary-gold/10"
                variants={fadeInUp}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
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
                      className="text-primary-gold hover:text-white transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
} 