'use client'

import { motion } from 'framer-motion'

interface EnhancedSectionProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'hero' | 'feature' | 'testimonial'
  backgroundPattern?: boolean
}

const EnhancedSection = ({ 
  children, 
  className = '', 
  variant = 'default',
  backgroundPattern = false 
}: EnhancedSectionProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'hero':
        return 'py-32 relative overflow-hidden'
      case 'feature':
        return 'py-24 bg-gradient-to-b from-primary-black/95 to-primary-black-light/95'
      case 'testimonial':
        return 'py-24 relative'
      default:
        return 'py-20'
    }
  }

  return (
    <motion.section
      className={`${getVariantClasses()} ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {backgroundPattern && (
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(45deg, rgba(212, 175, 55, 0.1) 25%, transparent 25%),
                linear-gradient(-45deg, rgba(212, 175, 55, 0.1) 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, rgba(59, 130, 246, 0.05) 75%),
                linear-gradient(-45deg, transparent 75%, rgba(59, 130, 246, 0.05) 75%)
              `,
              backgroundSize: '60px 60px',
              backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px'
            }}
          />
        </div>
      )}
      {children}
    </motion.section>
  )
}

export default EnhancedSection