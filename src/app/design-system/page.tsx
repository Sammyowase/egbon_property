'use client'

import { motion } from 'framer-motion'
import TypographyShowcase from '@/components/ui/TypographyShowcase'
import HeroBackgroundCarousel from '@/components/ui/HeroBackgroundCarousel'
import MagneticButton from '@/components/ui/MagneticButton'
import InteractiveCard from '@/components/ui/InteractiveCard'
import CustomCursor from '@/components/ui/CustomCursor'
import { fallbackHeroImages } from '@/data/heroImages'
import { Star, Heart, Share2, Eye, ArrowRight } from 'lucide-react'

export default function DesignSystemPage() {
  return (
    <>
      {/* Custom Cursor */}
      <CustomCursor enabled={true} trailLength={10} />

      {/* Background */}
      <HeroBackgroundCarousel
        images={fallbackHeroImages}
        autoSlideInterval={15000}
        parallaxIntensity={0.2}
        overlayOpacity={0.85}
        className="fixed inset-0 z-0"
      />

      {/* Content */}
      <main className="relative z-10 min-h-screen pt-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-hero-luxury mb-6">
              Design System
            </h1>
            <p className="text-body-luxury text-white/90 max-w-3xl mx-auto">
              Explore our comprehensive design system featuring enhanced typography, 
              color palettes, and interactive components designed for luxury real estate.
            </p>
          </motion.div>

          {/* Typography Showcase */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-20"
          >
            <TypographyShowcase />
          </motion.section>

          {/* Color Palette */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-20"
          >
            <h2 className="text-heading-luxury text-primary-gold mb-12 text-center">Color Palette</h2>
            
            {/* Primary Colors */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-white mb-6">Primary Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <div className="text-center">
                  <div className="w-full h-20 bg-primary-gold rounded-lg mb-2"></div>
                  <p className="text-sm text-white">Rich Gold</p>
                  <p className="text-xs text-white/60">#C9A14D</p>
                </div>
                <div className="text-center">
                  <div className="w-full h-20 bg-primary-gold-metallic rounded-lg mb-2"></div>
                  <p className="text-sm text-white">Metallic Gold</p>
                  <p className="text-xs text-white/60">#A67C00</p>
                </div>
                <div className="text-center">
                  <div className="w-full h-20 bg-primary-gold-glow rounded-lg mb-2"></div>
                  <p className="text-sm text-white">Golden Glow</p>
                  <p className="text-xs text-white/60">#E5C07B</p>
                </div>
                <div className="text-center">
                  <div className="w-full h-20 bg-primary-black rounded-lg mb-2 border border-white/20"></div>
                  <p className="text-sm text-white">Pure Black</p>
                  <p className="text-xs text-white/60">#000000</p>
                </div>
                <div className="text-center">
                  <div className="w-full h-20 bg-primary-black-charcoal rounded-lg mb-2"></div>
                  <p className="text-sm text-white">Charcoal Black</p>
                  <p className="text-xs text-white/60">#1A1A1A</p>
                </div>
                <div className="text-center">
                  <div className="w-full h-20 bg-primary-white rounded-lg mb-2 border border-gray-300"></div>
                  <p className="text-sm text-white">Pure White</p>
                  <p className="text-xs text-white/60">#FFFFFF</p>
                </div>
              </div>
            </div>

            {/* Blue Accent Colors */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-white mb-6">Blue Accent Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-full h-20 bg-primary-blue-primary rounded-lg mb-2"></div>
                  <p className="text-sm text-white">Primary Blue</p>
                  <p className="text-xs text-white/60">#1E40AF</p>
                </div>
                <div className="text-center">
                  <div className="w-full h-20 bg-primary-blue-secondary rounded-lg mb-2"></div>
                  <p className="text-sm text-white">Secondary Blue</p>
                  <p className="text-xs text-white/60">#3B82F6</p>
                </div>
                <div className="text-center">
                  <div className="w-full h-20 bg-primary-blue-accent rounded-lg mb-2"></div>
                  <p className="text-sm text-white">Accent Blue</p>
                  <p className="text-xs text-white/60">#60A5FA</p>
                </div>
                <div className="text-center">
                  <div className="w-full h-20 bg-primary-blue-midnight rounded-lg mb-2"></div>
                  <p className="text-sm text-white">Midnight Blue</p>
                  <p className="text-xs text-white/60">#0F172A</p>
                </div>
              </div>
            </div>

            {/* Status Colors */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Status Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-full h-20 bg-primary-success rounded-lg mb-2"></div>
                  <p className="text-sm text-white">Success</p>
                  <p className="text-xs text-white/60">#2ECC71</p>
                </div>
                <div className="text-center">
                  <div className="w-full h-20 bg-primary-error rounded-lg mb-2"></div>
                  <p className="text-sm text-white">Error</p>
                  <p className="text-xs text-white/60">#E74C3C</p>
                </div>
                <div className="text-center">
                  <div className="w-full h-20 bg-primary-warning rounded-lg mb-2"></div>
                  <p className="text-sm text-white">Warning</p>
                  <p className="text-xs text-white/60">#F39C12</p>
                </div>
                <div className="text-center">
                  <div className="w-full h-20 bg-primary-info rounded-lg mb-2"></div>
                  <p className="text-sm text-white">Info</p>
                  <p className="text-xs text-white/60">#3498DB</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Button Showcase */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mb-20"
          >
            <h2 className="text-heading-luxury text-primary-gold mb-12 text-center">Button Components</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <button className="btn-primary mb-4">Primary Button</button>
                <p className="text-sm text-white/80">Primary action button with gold styling</p>
              </div>
              <div className="text-center">
                <button className="btn-outline mb-4">
                  <span>Outline Button</span>
                </button>
                <p className="text-sm text-white/80">Secondary action with outline styling</p>
              </div>
              <div className="text-center">
                <button className="btn-secondary mb-4">Secondary Button</button>
                <p className="text-sm text-white/80">Blue accent button for secondary actions</p>
              </div>
              <div className="text-center">
                <button className="btn-ghost mb-4">Ghost Button</button>
                <p className="text-sm text-white/80">Minimal button for subtle actions</p>
              </div>
              <div className="text-center lg:col-span-2">
                <button className="btn-luxury mb-4">Luxury Button</button>
                <p className="text-sm text-white/80">Premium button with enhanced styling</p>
              </div>
            </div>
          </motion.section>

          {/* Interactive Components */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mb-20"
          >
            <h2 className="text-heading-luxury text-primary-gold mb-12 text-center">Interactive Components</h2>

            {/* Magnetic Buttons */}
            <div className="mb-16">
              <h3 className="text-2xl font-semibold text-white mb-8 text-center">Magnetic Buttons</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="text-center">
                  <MagneticButton variant="primary" className="mb-4">
                    <span>Magnetic Primary</span>
                  </MagneticButton>
                  <p className="text-sm text-white/80">Magnetic effect with primary styling</p>
                </div>
                <div className="text-center">
                  <MagneticButton variant="outline" className="mb-4">
                    <span>Magnetic Outline</span>
                  </MagneticButton>
                  <p className="text-sm text-white/80">Magnetic effect with outline styling</p>
                </div>
                <div className="text-center">
                  <MagneticButton variant="luxury" className="mb-4">
                    <Star className="w-5 h-5" />
                    <span>Luxury Magnetic</span>
                  </MagneticButton>
                  <p className="text-sm text-white/80">Premium magnetic button with icon</p>
                </div>
              </div>
            </div>

            {/* Interactive Cards */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-8 text-center">Interactive Cards</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <InteractiveCard variant="default" hoverEffect="lift" className="p-6">
                  <div className="text-center">
                    <Eye className="w-8 h-8 text-primary-gold mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-white mb-2">Lift Effect</h4>
                    <p className="text-sm text-white/70">Card lifts on hover</p>
                  </div>
                </InteractiveCard>

                <InteractiveCard variant="glass" hoverEffect="tilt" className="p-6">
                  <div className="text-center">
                    <Heart className="w-8 h-8 text-primary-gold mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-white mb-2">Tilt Effect</h4>
                    <p className="text-sm text-white/70">3D tilt with spotlight</p>
                  </div>
                </InteractiveCard>

                <InteractiveCard variant="luxury" hoverEffect="glow" className="p-6">
                  <div className="text-center">
                    <Share2 className="w-8 h-8 text-primary-gold mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-white mb-2">Glow Effect</h4>
                    <p className="text-sm text-white/70">Glowing background on hover</p>
                  </div>
                </InteractiveCard>

                <InteractiveCard variant="minimal" hoverEffect="magnetic" className="p-6">
                  <div className="text-center">
                    <ArrowRight className="w-8 h-8 text-primary-gold mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-white mb-2">Magnetic</h4>
                    <p className="text-sm text-white/70">Follows mouse movement</p>
                  </div>
                </InteractiveCard>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
    </>
  )
}
