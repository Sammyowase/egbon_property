'use client'

import { motion } from 'framer-motion'

interface TypographyShowcaseProps {
  className?: string
}

const TypographyShowcase = ({ className = '' }: TypographyShowcaseProps) => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <div className={`space-y-16 ${className}`}>
      {/* Hero Typography */}
      <motion.section {...fadeInUp} className="text-center">
        <h2 className="text-heading-luxury text-primary-gold mb-8">Hero Typography</h2>
        <h1 className="text-hero-luxury mb-6">
          Where Vision Meets Value
        </h1>
        <p className="text-body-luxury text-white/90 max-w-3xl mx-auto">
          Experience the pinnacle of luxury real estate with our comprehensive design system 
          that combines elegance, functionality, and cutting-edge technology.
        </p>
      </motion.section>

      {/* Display Typography */}
      <motion.section {...fadeInUp} className="text-center">
        <h2 className="text-heading-luxury text-primary-gold mb-8">Display Typography</h2>
        <h1 className="text-display-luxury text-white mb-6">
          Architectural Excellence
        </h1>
        <p className="text-body-luxury text-white/90 max-w-2xl mx-auto">
          Discover properties that redefine luxury living through innovative design 
          and uncompromising quality.
        </p>
      </motion.section>

      {/* Heading Hierarchy */}
      <motion.section {...fadeInUp}>
        <h2 className="text-heading-luxury text-primary-gold mb-8 text-center">Heading Hierarchy</h2>
        <div className="space-y-6">
          <div>
            <h1 className="heading-hero text-white mb-2">H1 - Hero Heading</h1>
            <p className="text-sm text-white/60">Font: Poppins Bold, Responsive scaling</p>
          </div>
          <div>
            <h2 className="heading-display text-white mb-2">H2 - Display Heading</h2>
            <p className="text-sm text-white/60">Font: Poppins Semibold, Large scale</p>
          </div>
          <div>
            <h3 className="heading-primary text-white mb-2">H3 - Primary Heading</h3>
            <p className="text-sm text-white/60">Font: Poppins Semibold, Medium scale</p>
          </div>
          <div>
            <h4 className="heading-secondary text-white mb-2">H4 - Secondary Heading</h4>
            <p className="text-sm text-white/60">Font: Poppins Medium, Smaller scale</p>
          </div>
        </div>
      </motion.section>

      {/* Body Text Variations */}
      <motion.section {...fadeInUp}>
        <h2 className="text-heading-luxury text-primary-gold mb-8 text-center">Body Text Variations</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Luxury Body Text (Inter)</h3>
            <p className="body-luxury text-white/90">
              This is our primary body text using Inter font family. It provides excellent 
              readability and a modern, clean appearance that complements our luxury aesthetic. 
              Perfect for detailed property descriptions and important content.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Accent Body Text (Lato)</h3>
            <p className="body-text text-white/90">
              This is our accent body text using Lato font family. It offers a friendly, 
              approachable feel while maintaining professionalism. Ideal for testimonials, 
              quotes, and secondary content that needs to stand out.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Responsive Typography Demo */}
      <motion.section {...fadeInUp}>
        <h2 className="text-heading-luxury text-primary-gold mb-8 text-center">Responsive Typography</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-responsive-4xl text-white mb-2">Responsive 4XL</h3>
            <p className="text-sm text-white/60">Scales from text-4xl to text-7xl across breakpoints</p>
          </div>
          <div>
            <h4 className="text-responsive-3xl text-white mb-2">Responsive 3XL</h4>
            <p className="text-sm text-white/60">Scales from text-3xl to text-5xl across breakpoints</p>
          </div>
          <div>
            <h5 className="text-responsive-2xl text-white mb-2">Responsive 2XL</h5>
            <p className="text-sm text-white/60">Scales from text-2xl to text-4xl across breakpoints</p>
          </div>
          <div>
            <p className="text-responsive-lg text-white mb-2">Responsive Large Text</p>
            <p className="text-sm text-white/60">Scales from text-lg to text-xl across breakpoints</p>
          </div>
          <div>
            <p className="text-responsive-base text-white mb-2">Responsive Base Text</p>
            <p className="text-sm text-white/60">Scales from text-base to text-lg across breakpoints</p>
          </div>
        </div>
      </motion.section>

      {/* Text Gradients */}
      <motion.section {...fadeInUp}>
        <h2 className="text-heading-luxury text-primary-gold mb-8 text-center">Text Gradients</h2>
        <div className="space-y-6 text-center">
          <h3 className="text-gradient-gold text-4xl font-bold">Gold Gradient Text</h3>
          <h3 className="text-gradient-blue-gold text-4xl font-bold">Blue-Gold Gradient Text</h3>
          <h3 className="text-gradient-luxury text-4xl font-bold">Luxury Gradient Text</h3>
        </div>
      </motion.section>

      {/* Caption and Small Text */}
      <motion.section {...fadeInUp}>
        <h2 className="text-heading-luxury text-primary-gold mb-8 text-center">Caption & Small Text</h2>
        <div className="space-y-4 text-center">
          <p className="text-luxury-sm text-primary-gold">Luxury Caption Text</p>
          <p className="text-caption-luxury text-white/80">Responsive Caption Text</p>
          <p className="text-responsive-xs text-white/60">Extra Small Responsive Text</p>
        </div>
      </motion.section>

      {/* Font Family Showcase */}
      <motion.section {...fadeInUp}>
        <h2 className="text-heading-luxury text-primary-gold mb-8 text-center">Font Families</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-white/5 rounded-lg backdrop-blur-sm">
            <h3 className="font-luxury text-2xl text-white mb-4">Playfair Display</h3>
            <p className="font-luxury text-white/80">Elegant serif for headings and luxury branding</p>
          </div>
          <div className="text-center p-6 bg-white/5 rounded-lg backdrop-blur-sm">
            <h3 className="font-heading text-2xl text-white mb-4">Poppins</h3>
            <p className="font-heading text-white/80">Modern sans-serif for headings and buttons</p>
          </div>
          <div className="text-center p-6 bg-white/5 rounded-lg backdrop-blur-sm">
            <h3 className="font-body text-2xl text-white mb-4">Inter</h3>
            <p className="font-body text-white/80">Optimized for body text and readability</p>
          </div>
          <div className="text-center p-6 bg-white/5 rounded-lg backdrop-blur-sm">
            <h3 className="font-accent text-2xl text-white mb-4">Lato</h3>
            <p className="font-accent text-white/80">Friendly accent font for special content</p>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default TypographyShowcase
