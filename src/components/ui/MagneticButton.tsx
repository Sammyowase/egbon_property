'use client'

import { useRef, useState, useCallback } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'luxury'
  magneticStrength?: number
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const MagneticButton = ({
  children,
  className = '',
  variant = 'primary',
  magneticStrength = 0.3,
  onClick,
  disabled = false,
  type = 'button'
}: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  // Spring animations for magnetic effect
  const x = useSpring(0, { stiffness: 300, damping: 30 })
  const y = useSpring(0, { stiffness: 300, damping: 30 })
  const scale = useSpring(1, { stiffness: 400, damping: 25 })

  // Transform values for rotation and glow
  const rotateX = useTransform(y, [-50, 50], [5, -5])
  const rotateY = useTransform(x, [-50, 50], [-5, 5])

  // Handle mouse movement for magnetic effect
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!buttonRef.current || disabled) return

    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const deltaX = (e.clientX - centerX) * magneticStrength
    const deltaY = (e.clientY - centerY) * magneticStrength

    x.set(deltaX)
    y.set(deltaY)
  }, [x, y, magneticStrength, disabled])

  // Handle mouse enter
  const handleMouseEnter = useCallback(() => {
    if (disabled) return
    setIsHovered(true)
    scale.set(1.05)
  }, [scale, disabled])

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
    scale.set(1)
  }, [x, y, scale])

  // Handle mouse down
  const handleMouseDown = useCallback(() => {
    if (disabled) return
    setIsPressed(true)
    scale.set(0.95)
  }, [scale, disabled])

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    setIsPressed(false)
    scale.set(isHovered ? 1.05 : 1)
  }, [scale, isHovered])

  // Get variant classes
  const getVariantClasses = () => {
    const baseClasses = 'relative overflow-hidden font-semibold transition-all duration-300 rounded-2xl'
    
    switch (variant) {
      case 'primary':
        return `${baseClasses} px-8 py-4 bg-primary-gold text-primary-black hover:bg-primary-gold-glow`
      case 'secondary':
        return `${baseClasses} px-8 py-4 bg-primary-blue-primary text-white hover:bg-primary-blue-secondary`
      case 'outline':
        return `${baseClasses} px-8 py-4 border-2 border-primary-gold text-primary-gold hover:bg-primary-gold hover:text-primary-black`
      case 'ghost':
        return `${baseClasses} px-8 py-4 text-white hover:bg-white/10`
      case 'luxury':
        return `${baseClasses} px-10 py-5 bg-gradient-to-r from-primary-gold to-primary-gold-glow text-primary-black rounded-3xl`
      default:
        return `${baseClasses} px-8 py-4 bg-primary-gold text-primary-black`
    }
  }

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      className={`${getVariantClasses()} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
      style={{
        x,
        y,
        scale,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.95 }}
    >
      {/* Background Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-inherit"
        style={{
          background: variant === 'primary' || variant === 'luxury' 
            ? 'radial-gradient(circle, rgba(201, 161, 77, 0.4) 0%, transparent 70%)'
            : variant === 'secondary'
            ? 'radial-gradient(circle, rgba(30, 64, 175, 0.4) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.2 : 0.8,
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.2 : 0.8,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-inherit"
        style={{
          transform: 'translateX(-100%)',
        }}
        animate={{
          transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
        }}
      />

      {/* Ripple Effect on Click */}
      {isPressed && (
        <motion.div
          className="absolute inset-0 rounded-inherit"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center space-x-2">
        {children}
      </span>

      {/* Border Glow for Outline Variant */}
      {variant === 'outline' && (
        <motion.div
          className="absolute inset-0 rounded-inherit border-2 border-primary-gold"
          style={{
            boxShadow: isHovered 
              ? '0 0 20px rgba(201, 161, 77, 0.5), inset 0 0 20px rgba(201, 161, 77, 0.1)'
              : '0 0 0px rgba(201, 161, 77, 0)',
          }}
          animate={{
            boxShadow: isHovered 
              ? '0 0 20px rgba(201, 161, 77, 0.5), inset 0 0 20px rgba(201, 161, 77, 0.1)'
              : '0 0 0px rgba(201, 161, 77, 0)',
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Luxury Variant Extra Effects */}
      {variant === 'luxury' && (
        <>
          <motion.div
            className="absolute inset-0 rounded-inherit bg-gradient-to-r from-primary-gold via-primary-gold-glow to-primary-gold"
            style={{
              opacity: isHovered ? 0.8 : 0.6,
            }}
            animate={{
              opacity: isHovered ? 0.8 : 0.6,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute inset-0 rounded-inherit"
            style={{
              boxShadow: isHovered 
                ? '0 0 30px rgba(201, 161, 77, 0.6), 0 0 60px rgba(201, 161, 77, 0.3)'
                : '0 0 15px rgba(201, 161, 77, 0.3)',
            }}
            animate={{
              boxShadow: isHovered 
                ? '0 0 30px rgba(201, 161, 77, 0.6), 0 0 60px rgba(201, 161, 77, 0.3)'
                : '0 0 15px rgba(201, 161, 77, 0.3)',
            }}
            transition={{ duration: 0.3 }}
          />
        </>
      )}
    </motion.button>
  )
}

export default MagneticButton
