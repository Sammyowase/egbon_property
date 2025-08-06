'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface LuxuryCardProps {
  children: ReactNode
  className?: string
  variant?: 'glass' | 'solid' | 'gradient'
  hover?: boolean
  glow?: boolean
  onClick?: () => void
}

const cardVariants = {
  rest: {
    scale: 1,
    boxShadow: "0 4px 20px rgba(212, 175, 55, 0.1)",
    borderColor: "rgba(212, 175, 55, 0.2)"
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 20px 40px rgba(212, 175, 55, 0.2)",
    borderColor: "rgba(212, 175, 55, 0.4)",
    transition: { duration: 0.3, ease: "easeOut" }
  }
}

const glowVariants = {
  rest: {
    boxShadow: "0 0 20px rgba(212, 175, 55, 0.1)"
  },
  hover: {
    boxShadow: "0 0 30px rgba(212, 175, 55, 0.3)"
  }
}

export default function LuxuryCard({
  children,
  className = '',
  variant = 'glass',
  hover = true,
  glow = false,
  onClick
}: LuxuryCardProps) {
  const baseClasses = "relative overflow-hidden transition-all duration-300"
  
  const variantClasses = {
    glass: "glass-card-dark",
    solid: "bg-primary-black border border-primary-gold/20",
    gradient: "bg-gradient-to-br from-primary-black to-primary-black-light border border-primary-gold/20"
  }

  const hoverClasses = hover ? "cursor-pointer" : ""
  const glowClasses = glow ? "animate-glow" : ""

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${glowClasses} ${className}`}
      variants={glow ? glowVariants : cardVariants}
      initial="rest"
      whileHover={hover ? "hover" : "rest"}
      onClick={onClick}
    >
      {/* Shimmer effect overlay */}
      {hover && (
        <motion.div
          className="absolute inset-0 shimmer-effect opacity-0 hover:opacity-100 transition-opacity duration-500"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}
