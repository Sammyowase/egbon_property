'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { FaBed, FaBath, FaRuler } from 'react-icons/fa'

interface PropertyCardProps {
  id: string
  title: string
  location: string
  price: number
  bedrooms?: number
  bathrooms?: number
  area?: number
  imageUrl: string
  type: 'property' | 'land' | 'luxury'
}

const PropertyCard = ({
  id,
  title,
  location,
  price,
  bedrooms,
  bathrooms,
  area,
  imageUrl,
  type
}: PropertyCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-primary-black/50 rounded-lg overflow-hidden hover-card"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-black to-transparent" />
        
        {/* Property Type Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-primary-gold text-primary-black text-sm font-semibold rounded-full">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-primary-gold transition-colors">
          {title}
        </h3>
        <p className="text-white/70 mb-4">{location}</p>
        
        {/* Features */}
        {(bedrooms || bathrooms || area) && (
          <div className="flex items-center gap-4 mb-4 text-white/60">
            {bedrooms && (
              <div className="flex items-center gap-1">
                <FaBed />
                <span>{bedrooms} beds</span>
              </div>
            )}
            {bathrooms && (
              <div className="flex items-center gap-1">
                <FaBath />
                <span>{bathrooms} baths</span>
              </div>
            )}
            {area && (
              <div className="flex items-center gap-1">
                <FaRuler />
                <span>{area} sqft</span>
              </div>
            )}
          </div>
        )}

        {/* Price and Action */}
        <div className="flex justify-between items-center">
          <span className="text-primary-gold font-bold text-xl">
            ${price.toLocaleString()}
          </span>
          <Link
            href={`/portfolio/${type}/${id}`}
            className="text-primary-gold hover:text-primary-gold-light transition-colors"
          >
            View Details →
          </Link>
        </div>
      </div>

      {/* Hover Overlay */}
      <motion.div
        className="absolute inset-0 bg-primary-gold/10 opacity-0 group-hover:opacity-100 transition-opacity"
        initial={false}
      />
    </motion.div>
  )
}

export default PropertyCard 