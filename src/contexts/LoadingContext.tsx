'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface LoadingContextType {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  hasLoadedOnce: boolean
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}

interface LoadingProviderProps {
  children: ReactNode
}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false)

  useEffect(() => {
    // Check if user has already seen the loading animation in this session
    const hasSeenLoading = sessionStorage.getItem('vista-grande-loaded')
    
    if (hasSeenLoading) {
      setIsLoading(false)
      setHasLoadedOnce(true)
    } else {
      // First time loading - show the elegant loader
      setIsLoading(true)
    }
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
    setHasLoadedOnce(true)
    // Mark as loaded for this session
    sessionStorage.setItem('vista-grande-loaded', 'true')
  }

  const contextValue: LoadingContextType = {
    isLoading,
    setIsLoading: (loading: boolean) => {
      if (!loading) {
        handleLoadingComplete()
      } else {
        setIsLoading(loading)
      }
    },
    hasLoadedOnce
  }

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
    </LoadingContext.Provider>
  )
}