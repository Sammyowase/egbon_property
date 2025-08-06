'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface LuxuryLoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'property' | 'elegant' | 'minimal'
  message?: string
  className?: string
}

const LuxuryLoadingSpinner: React.FC<LuxuryLoadingSpinnerProps> = ({
  size = 'md',
  variant = 'default',
  message,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }

  const containerSizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48'
  }

  // Sophisticated Architectural Spinner
  const DefaultSpinner = () => (
    <div className={`relative ${containerSizeClasses[size]} ${className}`}>
      {/* Outer rotating architectural frame */}
      <motion.div
        className={`absolute inset-0 ${sizeClasses[size]}`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Golden architectural corners */}
        {[0, 90, 180, 270].map((rotation, index) => (
          <motion.div
            key={index}
            className="absolute w-3 h-3 border-2 border-primary-gold"
            style={{
              top: '10%',
              left: '50%',
              transformOrigin: '50% 200%',
              transform: `translateX(-50%) rotate(${rotation}deg)`
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>

      {/* Central luxury emblem */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="relative">
          {/* Diamond shape */}
          <motion.div
            className="w-4 h-4 bg-gradient-to-br from-primary-gold to-yellow-600 transform rotate-45"
            animate={{
              boxShadow: [
                '0 0 10px rgba(212, 175, 55, 0.5)',
                '0 0 20px rgba(212, 175, 55, 0.8)',
                '0 0 10px rgba(212, 175, 55, 0.5)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {/* Inner glow */}
          <motion.div
            className="absolute inset-1 bg-white/30 transform rotate-45"
            animate={{
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>

      {/* Floating particles */}
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-1 h-1 bg-primary-gold rounded-full"
          style={{
            top: '50%',
            left: '50%'
          }}
          animate={{
            x: [0, Math.cos(index * 60 * Math.PI / 180) * 30],
            y: [0, Math.sin(index * 60 * Math.PI / 180) * 30],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.3,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  )

  // Sophisticated Property Construction Animation
  const PropertySpinner = () => (
    <div className={`relative ${containerSizeClasses[size]} ${className}`}>
      {/* Foundation building animation */}
      <motion.div
        className="absolute inset-0 flex items-end justify-center pb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Foundation */}
        <motion.div
          className="w-12 h-2 bg-gradient-to-r from-gray-600 to-gray-700 rounded-sm"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Building construction stages */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          rotate: [0, 360]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Walls building up */}
        {[0, 1, 2, 3].map((stage) => (
          <motion.div
            key={stage}
            className="absolute w-8 h-8 border-2 border-primary-gold/60"
            style={{
              borderRadius: stage === 0 ? '0' : stage === 1 ? '20%' : stage === 2 ? '40%' : '50%',
              transform: `rotate(${stage * 90}deg) translateY(-16px)`
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1, 1, 0.5],
              borderColor: [
                'rgba(212, 175, 55, 0.3)',
                'rgba(212, 175, 55, 0.8)',
                'rgba(212, 175, 55, 1)',
                'rgba(212, 175, 55, 0.3)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: stage * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>

      {/* Central luxury house icon */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          scale: [0.8, 1.2, 0.8],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.div
          className="relative"
          animate={{
            filter: [
              'drop-shadow(0 0 5px rgba(212, 175, 55, 0.5))',
              'drop-shadow(0 0 15px rgba(212, 175, 55, 0.8))',
              'drop-shadow(0 0 5px rgba(212, 175, 55, 0.5))'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Luxury house silhouette */}
          <svg
            className="w-8 h-8 text-primary-gold"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm0 2.5L18 11v7h-2v-6h-8v6H6v-7l6-5.5z"/>
            <circle cx="12" cy="15" r="1" fill="currentColor"/>
          </svg>
        </motion.div>
      </motion.div>

      {/* Luxury sparkles */}
      {[...Array(8)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-1 h-1 bg-primary-gold rounded-full"
          style={{
            top: `${20 + Math.sin(index * 45 * Math.PI / 180) * 30}%`,
            left: `${50 + Math.cos(index * 45 * Math.PI / 180) * 30}%`
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.25,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  )

  // Ultra-Sophisticated Morphing Geometric Spinner
  const ElegantSpinner = () => (
    <div className={`relative ${containerSizeClasses[size]} ${className}`}>
      {/* Morphing outer ring */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Luxury geometric segments */}
        {[0, 60, 120, 180, 240, 300].map((rotation, index) => (
          <motion.div
            key={index}
            className="absolute w-2 h-6 bg-gradient-to-t from-primary-gold to-yellow-400"
            style={{
              top: '10%',
              left: '50%',
              transformOrigin: '50% 250%',
              transform: `translateX(-50%) rotate(${rotation}deg)`,
              borderRadius: '2px'
            }}
            animate={{
              scaleY: [0.5, 1.5, 0.5],
              opacity: [0.4, 1, 0.4],
              background: [
                'linear-gradient(to top, #D4AF37, #F4D03F)',
                'linear-gradient(to top, #F4D03F, #F7DC6F)',
                'linear-gradient(to top, #D4AF37, #F4D03F)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>

      {/* Central morphing shape */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          rotate: [0, -360]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <motion.div
          className="relative w-8 h-8"
          animate={{
            borderRadius: [
              '0%',
              '25%',
              '50%',
              '25%',
              '0%'
            ],
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.2, 1, 0.8, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            background: 'linear-gradient(45deg, #D4AF37, #F4D03F, #D4AF37)',
            boxShadow: '0 0 20px rgba(212, 175, 55, 0.6)'
          }}
        >
          {/* Inner luxury pattern */}
          <motion.div
            className="absolute inset-1 bg-gradient-to-br from-white/40 to-transparent"
            animate={{
              borderRadius: [
                '0%',
                '25%',
                '50%',
                '25%',
                '0%'
              ],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>

      {/* Floating luxury particles */}
      {[...Array(12)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: 'radial-gradient(circle, #D4AF37, #F4D03F)',
            top: '50%',
            left: '50%'
          }}
          animate={{
            x: [0, Math.cos(index * 30 * Math.PI / 180) * 40],
            y: [0, Math.sin(index * 30 * Math.PI / 180) * 40],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.15,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Luxury glow effect */}
      <motion.div
        className="absolute inset-2 rounded-full"
        animate={{
          boxShadow: [
            '0 0 10px rgba(212, 175, 55, 0.3)',
            '0 0 30px rgba(212, 175, 55, 0.6)',
            '0 0 10px rgba(212, 175, 55, 0.3)'
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  )

  // Sophisticated Luxury Dots Animation
  const MinimalSpinner = () => (
    <div className={`flex items-center justify-center space-x-3 ${className}`}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="relative"
          animate={{
            y: [0, -8, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.2
          }}
        >
          {/* Main luxury dot */}
          <motion.div
            className="w-3 h-3 rounded-full relative overflow-hidden"
            style={{
              background: 'linear-gradient(45deg, #D4AF37, #F4D03F)',
              boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)'
            }}
            animate={{
              scale: [1, 1.3, 1],
              boxShadow: [
                '0 0 5px rgba(212, 175, 55, 0.3)',
                '0 0 15px rgba(212, 175, 55, 0.8)',
                '0 0 5px rgba(212, 175, 55, 0.3)'
              ]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2
            }}
          >
            {/* Inner luxury shine */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent rounded-full"
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2
              }}
            />
          </motion.div>

          {/* Trailing sparkle effect */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary-gold rounded-full"
            style={{
              transform: 'translate(-50%, -50%)'
            }}
            animate={{
              scale: [0, 2, 0],
              opacity: [0, 1, 0],
              y: [0, -12, -20]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeOut",
              delay: index * 0.2 + 0.3
            }}
          />
        </motion.div>
      ))}
    </div>
  )

  const renderSpinner = () => {
    switch (variant) {
      case 'property':
        return <PropertySpinner />
      case 'elegant':
        return <ElegantSpinner />
      case 'minimal':
        return <MinimalSpinner />
      default:
        return <DefaultSpinner />
    }
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {renderSpinner()}
      {message && (
        <motion.p
          className="text-white/70 text-sm font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {message}
        </motion.p>
      )}
    </div>
  )
}

export default LuxuryLoadingSpinner

// Convenience components for specific use cases
export const PropertyLoadingSpinner = (props: Omit<LuxuryLoadingSpinnerProps, 'variant'>) => (
  <LuxuryLoadingSpinner {...props} variant="property" />
)

export const ElegantLoadingSpinner = (props: Omit<LuxuryLoadingSpinnerProps, 'variant'>) => (
  <LuxuryLoadingSpinner {...props} variant="elegant" />
)

export const MinimalLoadingSpinner = (props: Omit<LuxuryLoadingSpinnerProps, 'variant'>) => (
  <LuxuryLoadingSpinner {...props} variant="minimal" />
)
