'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaRuler, FaMapMarkerAlt, FaHeart, FaRegHeart, FaShare, FaEye, FaPlay } from 'react-icons/fa'
import { BaseProperty } from '@/types/property'
import { useState } from 'react'
import LuxuryCard from './LuxuryCard'
import LuxuryButton from './LuxuryButton'

interface LuxuryPropertyCardProps {
  property: BaseProperty
  onSelect: (property: BaseProperty) => void
  onLike?: (id: string) => void
  onShare?: (property: BaseProperty) => void
  isLiked?: boolean
  showVirtualTour?: boolean
}

const imageVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.1 }
}

const overlayVariants = {
  rest: { opacity: 0 },
  hover: { opacity: 1 }
}

export default function LuxuryPropertyCard({
  property,
  onSelect,
  onLike,
  onShare,
  isLiked = false,
  showVirtualTour = false
}: LuxuryPropertyCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    onLike?.(property.id)
  }

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()
    onShare?.(property)
  }

  return (
    <LuxuryCard 
      className="group cursor-pointer"
      onClick={() => onSelect(property)}
      hover={true}
      glow={false}
    >
      <div className="relative">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden rounded-t-lg">
          <motion.div
            variants={imageVariants}
            initial="rest"
            whileHover="hover"
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full h-full"
          >
            <Image
              src={property.image}
              alt={property.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              onLoad={() => setImageLoaded(true)}
            />
          </motion.div>

          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Action buttons overlay */}
          <motion.div
            className="absolute top-4 right-4 flex gap-2"
            variants={overlayVariants}
            initial="rest"
            whileHover="hover"
          >
            <motion.button
              onClick={handleLike}
              className="p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-primary-gold/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isLiked ? (
                <FaHeart className="text-primary-gold" />
              ) : (
                <FaRegHeart />
              )}
            </motion.button>
            
            <motion.button
              onClick={handleShare}
              className="p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-primary-gold/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaShare />
            </motion.button>
          </motion.div>

          {/* Virtual tour button */}
          {showVirtualTour && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              variants={overlayVariants}
              initial="rest"
              whileHover="hover"
            >
              <motion.button
                className="flex items-center gap-2 bg-primary-gold/90 text-primary-black px-4 py-2 rounded-full font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation()
                  // Handle virtual tour
                }}
              >
                <FaPlay className="text-sm" />
                Virtual Tour
              </motion.button>
            </motion.div>
          )}

          {/* Status badge */}
          {property.status && (
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                property.status === 'Available' 
                  ? 'bg-green-500/90 text-white' 
                  : property.status === 'Sold'
                  ? 'bg-red-500/90 text-white'
                  : 'bg-yellow-500/90 text-black'
              }`}>
                {property.status}
              </span>
            </div>
          )}

          {/* Price tag */}
          <div className="absolute bottom-4 left-4">
            <motion.div
              className="bg-primary-gold/90 backdrop-blur-sm text-primary-black px-3 py-1 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <span className="font-bold text-lg">{property.price}</span>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-gold transition-colors">
              {property.title}
            </h3>
            <div className="flex items-center gap-1 text-white/70 mb-3">
              <FaMapMarkerAlt className="text-primary-gold" />
              <span className="text-sm">{property.location}</span>
            </div>
          </div>

          {/* Property details */}
          <div className="flex items-center gap-4 mb-4 text-white/60">
            <div className="flex items-center gap-1">
              <FaRuler />
              <span className="text-sm">{property.size}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaEye />
              <span className="text-sm">View Details</span>
            </div>
          </div>

          {/* Features */}
          {property.features && property.features.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {property.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="px-2 py-1 rounded-full bg-primary-gold/10 text-primary-gold text-xs"
                >
                  {feature}
                </span>
              ))}
              {property.features.length > 3 && (
                <span className="px-2 py-1 rounded-full bg-primary-gold/10 text-primary-gold text-xs">
                  +{property.features.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Action button */}
          <LuxuryButton
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => onSelect(property)}
          >
            View Details
          </LuxuryButton>
        </div>
      </div>
    </LuxuryCard>
  )
}
