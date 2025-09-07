import { useLoading } from '@/components/providers/LoadingProvider'
import { useRef, useCallback } from 'react'

export const usePageLoading = () => {
  const { showPageLoader, hidePageLoader, setLoading } = useLoading()
  const loaderTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isLoadingRef = useRef(false)

  /**
   * Show premium page transition loader
   * @param duration - Duration in milliseconds (default: 1500ms for optimal experience)
   */
  const showLoader = useCallback((duration: number = 1500) => {
    // Prevent multiple loaders
    if (isLoadingRef.current) {
      return
    }
    
    // Set loading flag
    isLoadingRef.current = true
    
    // Clear any existing timeout
    if (loaderTimeoutRef.current) {
      clearTimeout(loaderTimeoutRef.current)
      loaderTimeoutRef.current = null
    }
    
    // Show the loader
    showPageLoader()
    
    // Set timeout to hide loader after duration
    if (duration > 0) {
      loaderTimeoutRef.current = setTimeout(() => {
        hidePageLoader()
        
        // Reset loading flag after a short delay
        setTimeout(() => {
          isLoadingRef.current = false
        }, 300)
        
        loaderTimeoutRef.current = null
      }, duration)
    }
  }, [showPageLoader, hidePageLoader])

  /**
   * Hide page transition loader immediately
   */
  const hideLoader = useCallback(() => {
    // Clear any existing timeout
    if (loaderTimeoutRef.current) {
      clearTimeout(loaderTimeoutRef.current)
      loaderTimeoutRef.current = null
    }
    
    hidePageLoader()
    
    // Reset loading flag after a short delay
    setTimeout(() => {
      isLoadingRef.current = false
    }, 300)
  }, [hidePageLoader])

  /**
   * Show full-screen premium loading experience with complete animation sequence
   * @param duration - Duration in milliseconds (default: 4500ms for full premium experience)
   */
  const showFullScreenLoader = useCallback((duration: number = 4500) => {
    setLoading(true)
    if (duration > 0) {
      setTimeout(() => {
        setLoading(false)
      }, duration)
    }
  }, [setLoading])

  /**
   * Hide full-screen loader immediately
   */
  const hideFullScreenLoader = useCallback(() => {
    setLoading(false)
  }, [setLoading])

  /**
   * Show premium loading for async operations
   * @param asyncOperation - Promise to wait for
   * @param minDuration - Minimum duration to show loader (default: 1200ms for optimal experience)
   */
  const showLoaderForOperation = useCallback(async <T>(
    asyncOperation: Promise<T>,
    minDuration: number = 1200
  ): Promise<T> => {
    // Only show loader if not already loading
    if (!isLoadingRef.current) {
      isLoadingRef.current = true
      showPageLoader()
    }

    const [result] = await Promise.all([
      asyncOperation,
      new Promise(resolve => setTimeout(resolve, minDuration))
    ])

    hidePageLoader()
    
    // Reset loading flag after a short delay
    setTimeout(() => {
      isLoadingRef.current = false
    }, 300)
    
    return result
  }, [showPageLoader, hidePageLoader])

  return {
    showLoader,
    hideLoader,
    showFullScreenLoader,
    hideFullScreenLoader,
    showLoaderForOperation
  }
}
