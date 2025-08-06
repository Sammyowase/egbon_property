'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPlay, FaEye, FaVideo, FaCube } from 'react-icons/fa'
import VirtualTourModal from './VirtualTourModal'
import { BaseProperty } from '@/types/property'

interface VirtualTourButtonProps {
  property: BaseProperty
  tourType?: '360' | 'video' | 'interactive'
  variant?: 'primary' | 'secondary' | 'icon'
  className?: string
}

export default function VirtualTourButton({
  property,
  tourType = '360',
  variant = 'primary',
  className = ''
}: VirtualTourButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getIcon = () => {
    switch (tourType) {
      case '360':
        return <FaEye />
      case 'video':
        return <FaVideo />
      case 'interactive':
        return <FaCube />
      default:
        return <FaPlay />
    }
  }

  const getLabel = () => {
    switch (tourType) {
      case '360':
        return '360° Tour'
      case 'video':
        return 'Video Tour'
      case 'interactive':
        return 'Interactive Tour'
      default:
        return 'Virtual Tour'
    }
  }

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  }

  const iconVariants = {
    rest: { rotate: 0 },
    hover: { rotate: 5 }
  }

  if (variant === 'icon') {
    return (
      <>
        <motion.button
          className={`p-3 rounded-full bg-primary-gold/90 text-primary-black hover:bg-primary-gold transition-colors ${className}`}
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          onClick={() => setIsModalOpen(true)}
          title={getLabel()}
        >
          <motion.div variants={iconVariants}>
            {getIcon()}
          </motion.div>
        </motion.button>

        <VirtualTourModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          property={property}
          tourType={tourType}
        />
      </>
    )
  }

  if (variant === 'secondary') {
    return (
      <>
        <motion.button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-primary-gold/30 text-primary-gold hover:bg-primary-gold/10 transition-colors ${className}`}
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          onClick={() => setIsModalOpen(true)}
        >
          <motion.div variants={iconVariants}>
            {getIcon()}
          </motion.div>
          <span className="text-sm font-medium">{getLabel()}</span>
        </motion.button>

        <VirtualTourModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          property={property}
          tourType={tourType}
        />
      </>
    )
  }

  return (
    <>
      <motion.button
        className={`flex items-center gap-3 px-6 py-3 rounded-lg bg-gradient-to-r from-primary-gold to-primary-gold-accent text-primary-black font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
        variants={buttonVariants}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        onClick={() => setIsModalOpen(true)}
      >
        <motion.div 
          variants={iconVariants}
          className="text-lg"
        >
          {getIcon()}
        </motion.div>
        <span>{getLabel()}</span>
        
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </motion.button>

      <VirtualTourModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        property={property}
        tourType={tourType}
      />
    </>
  )
}
