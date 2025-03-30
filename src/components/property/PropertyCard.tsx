import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaRuler, FaMapMarkerAlt, FaExchangeAlt, FaShare } from 'react-icons/fa'
import { BaseProperty } from '@/types/property'
import { ReactNode } from 'react'

interface PropertyCardProps {
  property: BaseProperty
  onSelect: (property: BaseProperty) => void
  onCompare: (id: string) => void
  onShare: () => void
  extraInfo: (property: BaseProperty) => ReactNode
}

const cardHoverVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.02 }
}

export default function PropertyCard({
  property,
  onSelect,
  onCompare,
  onShare,
  extraInfo
}: PropertyCardProps) {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden
        bg-primary-black/40 border border-primary-gold/10 backdrop-blur-sm
        shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_24px_rgba(234,179,8,0.2)]
        transition-all duration-500"
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
    >
      <div 
        className="relative h-64 cursor-pointer"
        onClick={() => onSelect(property)}
      >
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-black to-transparent opacity-60" />
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium
          ${property.status === 'Available' ? 'bg-green-500/80 text-white' :
            property.status === 'Under Contract' ? 'bg-yellow-500/80 text-primary-black' :
            'bg-red-500/80 text-white'}`}
        >
          {property.status}
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="flex items-center bg-primary-black/50 px-3 py-1 rounded-full text-white/80 text-sm">
            <FaRuler className="mr-2" />
            {property.size}
          </span>
          <span className="flex items-center bg-primary-black/50 px-3 py-1 rounded-full text-white/80 text-sm">
            <FaMapMarkerAlt className="mr-2" />
            {property.location}
          </span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">
          {property.title}
        </h3>
        <p className="text-white/80 mb-4 line-clamp-2">
          {property.description}
        </p>
        {extraInfo(property)}
        <div className="flex items-center justify-between mt-4">
          <span className="text-primary-gold font-bold text-xl">
            {property.price}
          </span>
          <div className="flex gap-2">
            <motion.button
              className="text-primary-gold hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              onClick={() => onCompare(property.id)}
            >
              <FaExchangeAlt />
            </motion.button>
            <motion.button
              className="text-primary-gold hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              onClick={() => onShare()}
            >
              <FaShare />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 