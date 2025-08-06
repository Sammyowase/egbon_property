'use client'

import { motion } from 'framer-motion'

interface EnhancedBackgroundProps {
  variant?: 'default' | 'hero' | 'minimal'
  className?: string
}

const EnhancedBackground = ({ variant = 'default', className = '' }: EnhancedBackgroundProps) => {
  const particleCount = variant === 'minimal' ? 15 : variant === 'hero' ? 40 : 25

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 ${className}`}>
      {/* Animated Gradient Overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: variant === 'hero' 
            ? `
              radial-gradient(circle at 20% 80%, rgba(212, 175, 55, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(212, 175, 55, 0.08) 0%, transparent 50%)
            `
            : `
              radial-gradient(circle at 25% 75%, rgba(212, 175, 55, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 75% 25%, rgba(59, 130, 246, 0.06) 0%, transparent 50%)
            `
        }}
        animate={{
          opacity: variant === 'minimal' ? [0.2, 0.4, 0.2] : [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: variant === 'hero' ? 8 : 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Floating Geometric Shapes */}
      {variant !== 'minimal' && (
        <div className="absolute inset-0">
          {[...Array(variant === 'hero' ? 8 : 5)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute ${
                i % 4 === 0 ? 'w-24 h-24 border border-primary-gold/8' :
                i % 4 === 1 ? 'w-20 h-20 border border-primary-blue-light/6' :
                i % 4 === 2 ? 'w-16 h-16 bg-primary-gold/3 rounded-full' :
                'w-18 h-18 bg-primary-blue-light/3 rounded-full'
              }`}
              style={{
                left: `${15 + (i * 15)}%`,
                top: `${15 + (i * 12)}%`,
                transform: `rotate(${i * 45}deg)`,
              }}
              animate={{
                rotate: [i * 45, i * 45 + 360],
                scale: [1, 1.05, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 25 + i * 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(particleCount)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              i % 3 === 0 
                ? 'w-2 h-2 bg-primary-gold/20' 
                : i % 3 === 1 
                ? 'w-1.5 h-1.5 bg-primary-blue-light/15' 
                : 'w-1 h-1 bg-white/30'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -120, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0, 0.8, 0],
              scale: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Subtle Grid Pattern */}
      {variant !== 'minimal' && (
        <div 
          className="absolute inset-0 opacity-3"
          style={{
            backgroundImage: `
              linear-gradient(rgba(212, 175, 55, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(212, 175, 55, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
      )}
    </div>
  )
}

export default EnhancedBackground