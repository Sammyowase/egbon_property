'use client'

import { motion } from 'framer-motion'
import MotionBackground from '@/components/MotionBackground'

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <MotionBackground />
      
      
      {/* Content Section */}
      <section className="py-12 bg-primary-black/90">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </section>
    </div>
  )
} 