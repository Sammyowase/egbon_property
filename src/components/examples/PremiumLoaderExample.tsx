'use client'

import { useState, useEffect } from 'react'
import { usePageLoading } from '@/hooks/usePageLoading'
import LuxuryButton from '@/components/ui/LuxuryButton'
import PremiumLink from '@/components/ui/PremiumLink'

export default function PremiumLoaderExample() {
  const { 
    showLoader, 
    hideLoader, 
    showFullScreenLoader, 
    hideFullScreenLoader 
  } = usePageLoading()
  
  const [isLoading, setIsLoading] = useState(false)
  const [count, setCount] = useState(0)
  
  const handleShowPageLoader = () => {
    showLoader(1500) // Show for 1.5 seconds
  }
  
  const handleShowFullScreenLoader = () => {
    // Reset session storage to force the full screen loader to show
    sessionStorage.removeItem('vista-grande-loaded')
    showFullScreenLoader(4500) // Show for 4.5 seconds
  }
  
  const handleSimulatePageLoad = async () => {
    setIsLoading(true)
    
    // Show loader
    showLoader()
    
    // Simulate API call or page load
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Hide loader
    hideLoader()
    setIsLoading(false)
  }
  
  return (
    <div className="p-8 glass-morphism-gold rounded-2xl space-y-8">
      <h2 className="text-2xl font-bold text-white mb-6">Premium Loader Examples</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xl text-white/90 font-medium">Page Transition Loader</h3>
          <p className="text-white/70">
            Shows a minimal elegant loader during page transitions. This is used when navigating between pages.
          </p>
          <LuxuryButton
            onClick={handleShowPageLoader}
            variant="luxury"
          >
            Show Page Loader
          </LuxuryButton>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl text-white/90 font-medium">Full Screen Premium Loader</h3>
          <p className="text-white/70">
            Shows the full premium loading experience with animations. This is used when the entire page is refreshed.
          </p>
          <LuxuryButton
            onClick={handleShowFullScreenLoader}
            variant="luxury"
            className="bg-primary-gold/20 hover:bg-primary-gold/30"
          >
            Show Full Screen Loader
          </LuxuryButton>
        </div>
      </div>
      
      <div className="pt-6 border-t border-primary-gold/20 space-y-6">
        <div>
          <h3 className="text-xl text-white/90 font-medium mb-4">Simulate Page Load</h3>
          <p className="text-white/70 mb-4">
            Simulates a real page loading scenario with API call.
          </p>
          <LuxuryButton
            onClick={handleSimulatePageLoad}
            variant="luxury"
            loading={isLoading}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Loading...' : 'Simulate Page Load'}
          </LuxuryButton>
        </div>
        
        <div>
          <h3 className="text-xl text-white/90 font-medium mb-4">Navigation Test</h3>
          <p className="text-white/70 mb-4">
            Test navigation between pages to see the loader in action.
          </p>
          <div className="flex flex-wrap gap-4">
            <PremiumLink href="/" className="block">
              <LuxuryButton variant="outline">
                Go to Home
              </LuxuryButton>
            </PremiumLink>
            
            <PremiumLink href="/about" className="block">
              <LuxuryButton variant="outline">
                Go to About
              </LuxuryButton>
            </PremiumLink>
            
            <PremiumLink href="/news" className="block">
              <LuxuryButton variant="outline">
                Go to News
              </LuxuryButton>
            </PremiumLink>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl text-white/90 font-medium mb-4">State Update Test</h3>
          <p className="text-white/70 mb-4">
            Test that state updates don't trigger the loader.
          </p>
          <div className="flex items-center gap-4">
            <LuxuryButton
              onClick={() => setCount(prev => prev + 1)}
              variant="ghost"
            >
              Increment Counter
            </LuxuryButton>
            <span className="text-xl font-medium">Count: {count}</span>
          </div>
        </div>
      </div>
    </div>
  )
}