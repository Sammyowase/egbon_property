'use client'

import React from 'react'
import LuxuryLoadingSpinner, {
  PropertyLoadingSpinner,
  ElegantLoadingSpinner,
  MinimalLoadingSpinner
} from './LuxuryLoadingSpinner'

/**
 * Showcase component to demonstrate all luxury loading spinner variants
 * This can be used for testing and documentation purposes
 */
const SpinnerShowcase: React.FC = () => {
  return (
    <div className="min-h-screen bg-primary-black p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-white mb-12 text-center luxury-gradient-text">
          Enhanced Luxury Loading Spinners Showcase
        </h1>
        <p className="text-white/70 text-center mb-12 max-w-2xl mx-auto">
          Sophisticated, unique animations designed specifically for luxury real estate branding
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Default Spinner */}
          <div className="glass-morphism-gold p-8 rounded-2xl text-center">
            <h3 className="text-xl font-semibold text-white mb-6">Default</h3>
            <div className="flex flex-col items-center space-y-4">
              <LuxuryLoadingSpinner size="sm" />
              <LuxuryLoadingSpinner size="md" />
              <LuxuryLoadingSpinner size="lg" />
            </div>
            <p className="text-white/70 text-sm mt-4">
              Sophisticated architectural frame with luxury emblem and floating particles
            </p>
          </div>

          {/* Property Spinner */}
          <div className="glass-morphism-gold p-8 rounded-2xl text-center">
            <h3 className="text-xl font-semibold text-white mb-6">Property</h3>
            <div className="flex flex-col items-center space-y-4">
              <PropertyLoadingSpinner size="sm" />
              <PropertyLoadingSpinner size="md" />
              <PropertyLoadingSpinner size="lg" />
            </div>
            <p className="text-white/70 text-sm mt-4">
              Animated property construction sequence with luxury house silhouette and sparkles
            </p>
          </div>

          {/* Elegant Spinner */}
          <div className="glass-morphism-gold p-8 rounded-2xl text-center">
            <h3 className="text-xl font-semibold text-white mb-6">Elegant</h3>
            <div className="flex flex-col items-center space-y-4">
              <ElegantLoadingSpinner size="sm" />
              <ElegantLoadingSpinner size="md" />
              <ElegantLoadingSpinner size="lg" />
            </div>
            <p className="text-white/70 text-sm mt-4">
              Ultra-sophisticated morphing geometric patterns with luxury glow effects
            </p>
          </div>

          {/* Minimal Spinner */}
          <div className="glass-morphism-gold p-8 rounded-2xl text-center">
            <h3 className="text-xl font-semibold text-white mb-6">Minimal</h3>
            <div className="flex flex-col items-center space-y-4">
              <MinimalLoadingSpinner size="sm" />
              <MinimalLoadingSpinner size="md" />
              <MinimalLoadingSpinner size="lg" />
            </div>
            <p className="text-white/70 text-sm mt-4">
              Luxury dots with gradient shine, bounce animation, and trailing sparkle effects
            </p>
          </div>
        </div>

        {/* With Messages */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">With Messages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-morphism-blue p-8 rounded-2xl text-center">
              <PropertyLoadingSpinner 
                size="lg" 
                message="Loading property details..." 
              />
            </div>
            <div className="glass-morphism-gold p-8 rounded-2xl text-center">
              <ElegantLoadingSpinner 
                size="lg" 
                message="Processing your request..." 
              />
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="mt-16 glass-morphism p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-white mb-6">Usage Examples</h2>
          <div className="text-white/80 space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-primary-gold mb-2">PropertyLoadingSpinner</h4>
              <p className="text-sm">Use for property-related loading states (maps, property details, virtual tours)</p>
              <code className="block bg-black/50 p-2 rounded mt-2 text-xs">
                &lt;PropertyLoadingSpinner size="lg" message="Loading property..." /&gt;
              </code>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-primary-gold mb-2">ElegantLoadingSpinner</h4>
              <p className="text-sm">Use for sophisticated/premium contexts (form submissions, data processing)</p>
              <code className="block bg-black/50 p-2 rounded mt-2 text-xs">
                &lt;ElegantLoadingSpinner size="md" message="Processing..." /&gt;
              </code>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-primary-gold mb-2">MinimalLoadingSpinner</h4>
              <p className="text-sm">Use for subtle/compact loading states (buttons, inline loading)</p>
              <code className="block bg-black/50 p-2 rounded mt-2 text-xs">
                &lt;MinimalLoadingSpinner size="sm" /&gt;
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpinnerShowcase
