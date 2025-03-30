'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp, FaShare, FaDownload, FaChevronLeft, FaChevronRight, FaTimes, FaCheck } from 'react-icons/fa'
import Image from 'next/image'
import { BaseProperty } from '@/types/property'
import { useState } from 'react'

interface PropertyDetailModalProps {
  property: BaseProperty | null
  onClose: () => void
  extraInfo?: (property: BaseProperty) => React.ReactNode
}

export default function PropertyDetailModal({ property, onClose, extraInfo }: PropertyDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showPhotoModal, setShowPhotoModal] = useState(false)

  if (!property) return null

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.gallery.length - 1 ? 0 : prev + 1
    )
  }

  const previousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.gallery.length - 1 : prev - 1
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        key="property-detail-modal"
        className="fixed inset-0 bg-black/90 z-50 flex items-start justify-center p-4 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-primary-black/95 rounded-2xl w-full max-w-5xl my-20 mx-4
            border border-primary-gold/20 backdrop-blur-xl
            shadow-[0_20px_60px_rgba(234,179,8,0.3)]"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            className="absolute right-4 top-4 z-50 bg-black/50 p-2 rounded-full
              text-white/80 hover:text-white transition-all duration-300"
            onClick={onClose}
          >
            <FaTimes className="text-xl" />
          </button>

          <div className="p-4 sm:p-6 md:p-8">
            {/* Gallery */}
            <div className="mb-8 relative rounded-xl overflow-hidden group">
              <motion.div
                className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                onClick={() => setShowPhotoModal(true)}
              >
                <Image
                  src={property.gallery[currentImageIndex]}
                  alt={`${property.title} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-black/80 to-transparent" />
                
                {/* Gallery Navigation */}
                {property.gallery.length > 1 && (
                  <>
                    {/* Navigation Arrows */}
                    <button
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full
                        text-white/80 hover:bg-black/70 hover:text-white transition-all duration-300
                        opacity-0 group-hover:opacity-100 sm:block hidden"
                      onClick={(e) => {
                        e.stopPropagation()
                        previousImage()
                      }}
                    >
                      <FaChevronLeft className="text-xl" />
                    </button>
                    <button
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full
                        text-white/80 hover:bg-black/70 hover:text-white transition-all duration-300
                        opacity-0 group-hover:opacity-100 sm:block hidden"
                      onClick={(e) => {
                        e.stopPropagation()
                        nextImage()
                      }}
                    >
                      <FaChevronRight className="text-xl" />
                    </button>

                    {/* Mobile Navigation Dots */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4 sm:hidden">
                      <div className="bg-black/50 rounded-full p-2 backdrop-blur-sm flex gap-2">
                        {property.gallery.map((_, index) => (
                          <button
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all duration-300 
                              ${index === currentImageIndex ? 'bg-primary-gold w-4' : 'bg-white/50 hover:bg-white'}`}
                            onClick={(e) => {
                              e.stopPropagation()
                              setCurrentImageIndex(index)
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Image Counter */}
                    <div className="absolute top-4 right-4 bg-black/50 rounded-full px-3 py-1 text-sm text-white/80 backdrop-blur-sm">
                      {currentImageIndex + 1} / {property.gallery.length}
                    </div>
                  </>
                )}
              </motion.div>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{property.title}</h2>
                <div className="flex items-center gap-4 text-white/80 mb-6">
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-primary-gold mr-2" />
                    {property.location}
                  </div>
                  <div className="text-primary-gold font-semibold">{property.price}</div>
                </div>
                <p className="text-white/70 mb-6 leading-relaxed">{property.description}</p>
                
                {/* Features */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Features</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-white/70">
                        <FaCheck className="text-primary-gold mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Extra Info */}
                {extraInfo && extraInfo(property)}
              </div>

              {/* Right Column */}
              <div>
                {/* Documents */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Documents</h3>
                  <div className="space-y-3">
                    {property.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-primary-black/50 p-3 rounded-lg
                          border border-primary-gold/10 hover:border-primary-gold/30 transition-all duration-300"
                      >
                        <span className="text-white/70">{doc}</span>
                        <FaDownload className="text-primary-gold" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
                  <div className="space-y-3">
                    <a
                      href={`tel:${property.phoneNumber}`}
                      className="flex items-center gap-3 bg-primary-gold/10 text-primary-gold
                        p-3 rounded-lg hover:bg-primary-gold hover:text-primary-black
                        transition-all duration-300 w-full"
                    >
                      <FaPhone />
                      <span>Call Agent</span>
                    </a>
                    <a
                      href={`https://wa.me/${property.phoneNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-[#25D366] text-white
                        p-3 rounded-lg hover:bg-[#128C7E]
                        transition-all duration-300 w-full"
                    >
                      <FaWhatsapp />
                      <span>WhatsApp</span>
                    </a>
                    <button
                      className="flex items-center gap-3 bg-primary-gold/10 text-primary-gold
                        p-3 rounded-lg hover:bg-primary-gold hover:text-primary-black
                        transition-all duration-300 w-full"
                      onClick={(e) => {
                        e.stopPropagation()
                        navigator.clipboard.writeText(window.location.href)
                      }}
                    >
                      <FaShare />
                      <span>Share Property</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Full Screen Photo Modal */}
      <AnimatePresence>
        {showPhotoModal && (
          <motion.div
            className="fixed inset-0 bg-black z-[60] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPhotoModal(false)}
          >
            <motion.div
              className="relative w-full h-full flex items-center justify-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              {/* Close Button */}
              <button
                className="absolute right-4 top-4 z-50 bg-black/50 p-2 rounded-full
                  text-white/80 hover:text-white transition-all duration-300"
                onClick={() => setShowPhotoModal(false)}
              >
                <FaTimes className="text-xl" />
              </button>

              {/* Navigation Arrows */}
              {property.gallery.length > 1 && (
                <>
                  <button
                    className="absolute left-4 z-50 bg-black/50 p-4 rounded-full
                      text-white/80 hover:bg-black/70 hover:text-white transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation()
                      previousImage()
                    }}
                  >
                    <FaChevronLeft className="text-2xl" />
                  </button>
                  <button
                    className="absolute right-4 z-50 bg-black/50 p-4 rounded-full
                      text-white/80 hover:bg-black/70 hover:text-white transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage()
                    }}
                  >
                    <FaChevronRight className="text-2xl" />
                  </button>
                </>
              )}

              {/* Main Image */}
              <div className="relative w-full h-full">
                <Image
                  src={property.gallery[currentImageIndex]}
                  alt={`${property.title} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 rounded-full px-4 py-2 text-white/80 backdrop-blur-sm">
                {currentImageIndex + 1} / {property.gallery.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  )
} 