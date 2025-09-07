'use client'

import { motion } from 'framer-motion'
import PageWrapper from '@/components/ui/PageWrapper'
import EnhancedSection from '@/components/ui/EnhancedSection'
import PremiumLoaderExample from '@/components/examples/PremiumLoaderExample'

export default function LoaderTestPage() {
  return (
    <PageWrapper backgroundVariant="default">
      <EnhancedSection variant="hero" backgroundPattern>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="heading-display mb-8 luxury-gradient-mixed">
              Premium Loader Test
            </h1>
            <p className="body-luxury text-white/90 mb-6 leading-relaxed">
              Test our premium loading animations and transitions.
            </p>
          </motion.div>
        </div>
      </EnhancedSection>
      
      <EnhancedSection variant="feature">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <PremiumLoaderExample />
          </div>
        </div>
      </EnhancedSection>
    </PageWrapper>
  )
}