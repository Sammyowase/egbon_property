'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { AnimatePresence } from 'framer-motion'
import PremiumPageLoader from '@/components/ui/PremiumPageLoader'
import { ElegantLoadingSpinner } from '@/components/ui/LuxuryLoadingSpinner'

interface LoadingContextType {
  isLoading: boolean
  setLoading: (loading: boolean) => void
  showPageLoader: () => void
  hidePageLoader: () => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}

interface LoadingProviderProps {
  children: ReactNode
}

export default function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isPageTransition, setIsPageTransition] = useState(false)
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false)

  // Initial app loading with premium loader
  useEffect(() => {
    // Check if this is a full page refresh or just a client-side navigation
    const isPageRefresh = performance.navigation?.type === 1 || 
                          document.referrer === '' || 
                          !sessionStorage.getItem('vista-grande-loaded');
    
    if (isPageRefresh) {
      // This is a full page refresh - show the premium loader
      setIsLoading(true)
      // The session storage will be set after the loader completes
    } else {
      // This is a client-side navigation or returning visitor - don't show the initial loader
      setIsLoading(false)
      setHasLoadedOnce(true)
    }

    // This effect just sets up the callback
    // The actual timing is handled by the PremiumPageLoader
    return () => {
      // Cleanup if needed
    }
  }, [])

  const setLoading = (loading: boolean) => {
    setIsLoading(loading)
  }

  const showPageLoader = () => {
    // Only show if not already showing
    if (!isPageTransition) {
      setIsPageTransition(true)
    }
  }

  const hidePageLoader = () => {
    if (isPageTransition) {
      setIsPageTransition(false)
    }
  }

  // Handler for when the premium loader completes
  const handleLoadingComplete = () => {
    setTimeout(() => {
      setIsLoading(false)
      setHasLoadedOnce(true)
      sessionStorage.setItem('vista-grande-loaded', 'true')
    }, 800) // Small delay for smooth transition
  }

  // Handler for when the page transition loader completes
  const handleTransitionComplete = () => {
    setTimeout(() => {
      setIsPageTransition(false)
    }, 300) // Small delay for smooth transition
  }

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading, showPageLoader, hidePageLoader }}>
      {/* Initial Application Loader */}
      <PremiumPageLoader 
        show={isLoading} 
        onLoadingComplete={handleLoadingComplete} 
      />
      
      {/* Page Transition Loader - Now using PremiumPageLoader for consistency */}
      <PremiumPageLoader 
        show={isPageTransition} 
        onLoadingComplete={handleTransitionComplete}
        variant="minimal" 
      />
      
      {children}
    </LoadingContext.Provider>
  )
}
