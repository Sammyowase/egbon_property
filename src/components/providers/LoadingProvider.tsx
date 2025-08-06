'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

  // Initial app loading with luxury spinner
  useEffect(() => {
    // Check if user has already seen the loading animation in this session
    const hasSeenLoading = sessionStorage.getItem('vista-grande-loaded')
    
    if (hasSeenLoading) {
      setIsLoading(false)
      setHasLoadedOnce(true)
      return
    }

    // Show luxury loading spinner for 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false)
      setHasLoadedOnce(true)
      sessionStorage.setItem('vista-grande-loaded', 'true')
    }, 2000) // 2 seconds for optimal UX

    return () => clearTimeout(timer)
  }, [])

  const setLoading = (loading: boolean) => {
    setIsLoading(loading)
  }

  const showPageLoader = () => {
    setIsPageTransition(true)
  }

  const hidePageLoader = () => {
    setIsPageTransition(false)
  }

  // Animation variants
  const containerVariants = {
    visible: { opacity: 1 },
    exit: { 
      opacity: 0,
      transition: { duration: 0.5, ease: "easeInOut" }
    }
  }

  const LoadingSpinner = ({ isInitial = false }: { isInitial?: boolean }) => (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-primary-black"
      variants={containerVariants}
      initial="visible"
      exit="exit"
      role="status"
      aria-live="polite"
      aria-label={isInitial ? "Welcome to Vista Grande, loading application" : "Loading content"}
    >
      {/* Luxury Brand Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-4xl font-bold text-white mb-2 luxury-gradient-text">
          Vista Grande Realty
        </h1>
        <p className="text-white/70 text-lg">
          {isInitial ? 'Preparing your luxury experience...' : 'Loading content...'}
        </p>
      </motion.div>

      {/* Enhanced Luxury Loading Spinner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <ElegantLoadingSpinner 
          size="xl" 
          message={isInitial ? "Welcome to luxury real estate" : "Loading..."} 
        />
      </motion.div>
    </motion.div>
  )

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading, showPageLoader, hidePageLoader }}>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingSpinner isInitial={!hasLoadedOnce} />}
        {isPageTransition && <LoadingSpinner />}
      </AnimatePresence>
      {children}
    </LoadingContext.Provider>
  )
}
