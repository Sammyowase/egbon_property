'use client'

import { useState, useEffect, useRef, ReactNode } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { usePageLoading } from '@/hooks/usePageLoading'

interface PageTransitionProviderProps {
  children: ReactNode
}

export default function PageTransitionProvider({ children }: PageTransitionProviderProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { showLoader, hideLoader } = usePageLoading()
  const [isFirstRender, setIsFirstRender] = useState(true)
  const isNavigatingRef = useRef(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  // Track route changes and show loader
  useEffect(() => {
    // Skip the first render to avoid showing loader on initial page load
    if (isFirstRender) {
      setIsFirstRender(false)
      return
    }
    
    // Prevent multiple loaders from showing
    if (isNavigatingRef.current) {
      return
    }
    
    // Set navigating flag to true
    isNavigatingRef.current = true
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    // Show minimal loader on route change (for page transitions)
    // The 'minimal' variant is already set in the LoadingProvider
    showLoader(1500) // Show for 1.5 seconds
    
    // Set timeout to reset the navigating flag
    timeoutRef.current = setTimeout(() => {
      isNavigatingRef.current = false
      timeoutRef.current = null
    }, 2000) // A bit longer than the loader duration to prevent rapid clicks
    
    // Return cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      hideLoader()
    }
  }, [pathname, searchParams, showLoader, hideLoader, isFirstRender])
  
  return <>{children}</>
}