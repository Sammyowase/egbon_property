'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaExpand, FaCompress, FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaInfoCircle } from 'react-icons/fa'
import LuxuryButton from '@/components/ui/LuxuryButton'
import { PropertyLoadingSpinner } from '@/components/ui/LuxuryLoadingSpinner'
import { BaseProperty } from '@/types/property'

interface VirtualTourModalProps {
  isOpen: boolean
  onClose: () => void
  property: BaseProperty
  tourType?: '360' | 'video' | 'interactive'
}

export default function VirtualTourModal({
  isOpen,
  onClose,
  property,
  tourType = '360'
}: VirtualTourModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [showInfo, setShowInfo] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
    }
    setIsFullscreen(!isFullscreen)
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  }

  const renderTourContent = () => {
    switch (tourType) {
      case '360':
        return (
          <div className="relative w-full h-full bg-primary-black rounded-lg overflow-hidden">
            {/* 360° Tour Placeholder - Replace with actual 360° viewer */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <PropertyLoadingSpinner
                  size="lg"
                  message="Loading 360° Virtual Tour..."
                />
              </div>
            </div>
            
            {/* Tour would be embedded here */}
            <iframe
              src={`/virtual-tours/${property.id}/360`}
              className="w-full h-full"
              title={`360° Tour of ${property.title}`}
              allowFullScreen
            />
          </div>
        )

      case 'video':
        return (
          <div className="relative w-full h-full bg-primary-black rounded-lg overflow-hidden">
            <video
              className="w-full h-full object-cover"
              autoPlay={isPlaying}
              muted={isMuted}
              loop
              controls={false}
            >
              <source src={`/virtual-tours/${property.id}/video.mp4`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Video Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-full bg-black/50 text-white hover:bg-primary-gold/20 transition-colors"
                >
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-full bg-black/50 text-white hover:bg-primary-gold/20 transition-colors"
                >
                  {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>
              </div>
            </div>
          </div>
        )

      case 'interactive':
        return (
          <div className="relative w-full h-full bg-primary-black rounded-lg overflow-hidden">
            {/* Interactive Tour Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-gold/20 to-transparent">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-primary-gold/20 flex items-center justify-center mx-auto mb-4">
                    <FaPlay className="text-primary-gold text-2xl ml-1" />
                  </div>
                  <h3 className="text-white text-xl font-bold mb-2">Interactive Property Tour</h3>
                  <p className="text-white/70">Click to explore different areas</p>
                </div>
              </div>
            </div>
            
            {/* Interactive hotspots would be here */}
            <div className="absolute top-1/3 left-1/4">
              <motion.button
                className="w-4 h-4 rounded-full bg-primary-gold animate-pulse"
                whileHover={{ scale: 1.5 }}
                onClick={() => setShowInfo(!showInfo)}
              />
              {showInfo && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-6 left-0 bg-black/80 text-white p-3 rounded-lg min-w-[200px]"
                >
                  <h4 className="font-bold mb-1">Living Room</h4>
                  <p className="text-sm">Spacious living area with modern furnishings</p>
                </motion.div>
              )}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className={`relative w-full max-w-6xl ${isFullscreen ? 'h-screen' : 'h-[80vh]'} bg-primary-black rounded-lg overflow-hidden border border-primary-gold/20`}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold text-lg">{property.title}</h3>
                  <p className="text-white/70 text-sm">{property.location}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleFullscreen}
                    className="p-2 rounded-full bg-black/50 text-white hover:bg-primary-gold/20 transition-colors"
                  >
                    {isFullscreen ? <FaCompress /> : <FaExpand />}
                  </button>
                  
                  <button
                    onClick={() => setShowInfo(!showInfo)}
                    className="p-2 rounded-full bg-black/50 text-white hover:bg-primary-gold/20 transition-colors"
                  >
                    <FaInfoCircle />
                  </button>
                  
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full bg-black/50 text-white hover:bg-red-500/20 transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            </div>

            {/* Tour Content */}
            <div className="w-full h-full">
              {renderTourContent()}
            </div>

            {/* Property Info Sidebar */}
            {showInfo && (
              <motion.div
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                className="absolute top-0 right-0 w-80 h-full bg-primary-black/95 backdrop-blur-sm border-l border-primary-gold/20 p-6 overflow-y-auto"
              >
                <h4 className="text-white font-bold text-lg mb-4">Property Details</h4>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-primary-gold font-semibold">Price</p>
                    <p className="text-white text-xl">{property.price}</p>
                  </div>
                  
                  <div>
                    <p className="text-primary-gold font-semibold">Size</p>
                    <p className="text-white">{property.size}</p>
                  </div>
                  
                  <div>
                    <p className="text-primary-gold font-semibold">Features</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {property.features?.slice(0, 6).map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 rounded-full bg-primary-gold/10 text-primary-gold text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-primary-gold font-semibold">Description</p>
                    <p className="text-white/80 text-sm mt-1">{property.description}</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-primary-gold/20">
                  <LuxuryButton variant="luxury" size="sm" className="w-full">
                    Schedule Viewing
                  </LuxuryButton>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
