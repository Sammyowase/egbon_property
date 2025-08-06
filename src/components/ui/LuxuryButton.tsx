'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { MinimalLoadingSpinner } from './LuxuryLoadingSpinner'

interface LuxuryButtonProps {
  children: ReactNode
  variant?: 'primary' | 'outline' | 'ghost' | 'luxury'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
}

const buttonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
}

const shimmerVariants = {
  rest: { x: '-100%' },
  hover: { x: '100%', transition: { duration: 0.6, ease: "easeInOut" } }
}

export default function LuxuryButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left'
}: LuxuryButtonProps) {
  const baseClasses = "relative overflow-hidden font-semibold transition-all duration-300 flex items-center justify-center gap-2"
  
  const variantClasses = {
    primary: "bg-primary-gold text-primary-black hover:bg-primary-gold-dark shadow-lg hover:shadow-xl",
    outline: "border-2 border-primary-gold text-primary-gold hover:bg-primary-gold hover:text-primary-black",
    ghost: "text-primary-gold hover:bg-primary-gold/10",
    luxury: "bg-gradient-to-r from-primary-gold to-primary-gold-accent text-primary-black shadow-lg hover:shadow-xl"
  }

  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-md",
    md: "px-6 py-3 text-base rounded-lg",
    lg: "px-8 py-4 text-lg rounded-lg",
    xl: "px-10 py-5 text-xl rounded-xl"
  }

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
      variants={buttonVariants}
      initial="rest"
      whileHover={!disabled ? "hover" : "rest"}
      whileTap={!disabled ? "tap" : "rest"}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {/* Shimmer effect for luxury variant */}
      {variant === 'luxury' && !disabled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          variants={shimmerVariants}
          initial="rest"
          whileHover="hover"
        />
      )}

      {/* Loading spinner */}
      {loading && (
        <MinimalLoadingSpinner size="sm" />
      )}

      {/* Icon and text content */}
      <div className="relative z-10 flex items-center gap-2">
        {icon && iconPosition === 'left' && !loading && icon}
        {children}
        {icon && iconPosition === 'right' && !loading && icon}
      </div>
    </motion.button>
  )
}
