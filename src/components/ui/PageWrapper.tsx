'use client'

import { motion } from 'framer-motion'
import EnhancedBackground from './EnhancedBackground'

interface PageWrapperProps {
  children: React.ReactNode
  backgroundVariant?: 'default' | 'hero' | 'minimal'
  className?: string
}

const PageWrapper = ({ children, backgroundVariant = 'default', className = '' }: PageWrapperProps) => {
  return (
    <div className={`relative min-h-screen ${className}`}>
      <EnhancedBackground variant={backgroundVariant} />
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default PageWrapper