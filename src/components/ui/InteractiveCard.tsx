'use client'

import { useRef, useState, useCallback } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

interface InteractiveCardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'glass' | 'luxury' | 'minimal'
  hoverEffect?: 'lift' | 'tilt' | 'glow' | 'scale' | 'magnetic'
  onClick?: () => void
  disabled?: boolean
}

const InteractiveCard = ({
  children,
  className = '',
  variant = 'default',
  hoverEffect = 'lift',
  onClick,
  disabled = false
}: InteractiveCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Spring animations
  const x = useSpring(0, { stiffness: 300, damping: 30 })
  const y = useSpring(0, { stiffness: 300, damping: 30 })
  const scale = useSpring(1, { stiffness: 400, damping: 25 })

  // Transform values for 3D effects
  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])

  // Handle mouse movement
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current || disabled) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const deltaX = e.clientX - centerX
    const deltaY = e.clientY - centerY

    setMousePosition({ x: deltaX, y: deltaY })

    if (hoverEffect === 'tilt' || hoverEffect === 'magnetic') {
      x.set(deltaX * 0.1)
      y.set(deltaY * 0.1)
    }
  }, [x, y, hoverEffect, disabled])

  // Handle mouse enter
  const handleMouseEnter = useCallback(() => {
    if (disabled) return
    setIsHovered(true)
    
    switch (hoverEffect) {
      case 'lift':
        y.set(-10)
        break
      case 'scale':
        scale.set(1.05)
        break
      case 'magnetic':
        scale.set(1.02)
        break
    }
  }, [y, scale, hoverEffect, disabled])

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
    scale.set(1)
    setMousePosition({ x: 0, y: 0 })
  }, [x, y, scale])

  // Get variant classes
  const getVariantClasses = () => {
    const baseClasses = 'relative overflow-hidden transition-all duration-300'
    
    switch (variant) {
      case 'glass':
        return `${baseClasses} bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl`
      case 'luxury':
        return `${baseClasses} bg-gradient-to-br from-primary-black/80 to-primary-black/60 border border-primary-gold/20 rounded-2xl backdrop-blur-sm`
      case 'minimal':
        return `${baseClasses} bg-white/3 border border-white/5 rounded-xl backdrop-blur-sm`
      default:
        return `${baseClasses} bg-primary-black/40 border border-primary-gold/10 rounded-2xl backdrop-blur-sm`
    }
  }

  // Get hover effect styles
  const getHoverStyles = () => {
    switch (hoverEffect) {
      case 'tilt':
        return {
          x,
          y,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d' as const,
        }
      case 'magnetic':
        return {
          x,
          y,
          scale,
          transformStyle: 'preserve-3d' as const,
        }
      case 'scale':
        return {
          scale,
        }
      case 'lift':
        return {
          y,
        }
      default:
        return {}
    }
  }

  return (
    <motion.div
      ref={cardRef}
      className={`${getVariantClasses()} ${onClick ? 'cursor-pointer' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      style={getHoverStyles()}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={disabled ? undefined : onClick}
      whileTap={onClick && !disabled ? { scale: 0.98 } : undefined}
    >
      {/* Background Glow Effect */}
      {hoverEffect === 'glow' && (
        <motion.div
          className="absolute inset-0 rounded-inherit"
          style={{
            background: variant === 'luxury' 
              ? 'radial-gradient(circle at center, rgba(201, 161, 77, 0.2) 0%, transparent 70%)'
              : 'radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
            opacity: isHovered ? 1 : 0,
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1.1 : 0.9,
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-inherit"
        style={{
          transform: 'translateX(-100%)',
        }}
        animate={{
          transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
      />

      {/* Border Glow */}
      {variant === 'luxury' && (
        <motion.div
          className="absolute inset-0 rounded-inherit border border-primary-gold/20"
          style={{
            boxShadow: isHovered 
              ? '0 0 20px rgba(201, 161, 77, 0.3), inset 0 0 20px rgba(201, 161, 77, 0.1)'
              : '0 0 0px rgba(201, 161, 77, 0)',
          }}
          animate={{
            boxShadow: isHovered 
              ? '0 0 20px rgba(201, 161, 77, 0.3), inset 0 0 20px rgba(201, 161, 77, 0.1)'
              : '0 0 0px rgba(201, 161, 77, 0)',
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Spotlight Effect for Tilt */}
      {hoverEffect === 'tilt' && isHovered && (
        <motion.div
          className="absolute inset-0 rounded-inherit pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x + 200}px ${mousePosition.y + 200}px, rgba(255, 255, 255, 0.1) 0%, transparent 50%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>

      {/* Floating Particles for Luxury Variant */}
      {variant === 'luxury' && isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary-gold/40 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Shadow Enhancement */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-inherit"
        style={{
          boxShadow: isHovered 
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.4)'
            : '0 10px 25px -12px rgba(0, 0, 0, 0.2)',
        }}
        animate={{
          boxShadow: isHovered 
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.4)'
            : '0 10px 25px -12px rgba(0, 0, 0, 0.2)',
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

export default InteractiveCard
