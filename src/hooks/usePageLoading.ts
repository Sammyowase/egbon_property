import { useLoading } from '@/components/providers/LoadingProvider'

export const usePageLoading = () => {
  const { showPageLoader, hidePageLoader, setLoading } = useLoading()

  /**
   * Show page transition loader with premium animations
   * @param duration - Duration in milliseconds (default: 1000ms)
   */
  const showLoader = (duration: number = 1000) => {
    showPageLoader()
    if (duration > 0) {
      setTimeout(() => {
        hidePageLoader()
      }, duration)
    }
  }

  /**
   * Hide page transition loader immediately
   */
  const hideLoader = () => {
    hidePageLoader()
  }

  /**
   * Show full-screen premium loading experience
   * @param duration - Duration in milliseconds (default: 3000ms for premium experience)
   */
  const showFullScreenLoader = (duration: number = 3000) => {
    setLoading(true)
    if (duration > 0) {
      setTimeout(() => {
        setLoading(false)
      }, duration)
    }
  }

  /**
   * Hide full-screen loader immediately
   */
  const hideFullScreenLoader = () => {
    setLoading(false)
  }

  /**
   * Show premium loading for async operations
   * @param asyncOperation - Promise to wait for
   * @param minDuration - Minimum duration to show loader (default: 800ms)
   */
  const showLoaderForOperation = async <T>(
    asyncOperation: Promise<T>,
    minDuration: number = 800
  ): Promise<T> => {
    showPageLoader()

    const [result] = await Promise.all([
      asyncOperation,
      new Promise(resolve => setTimeout(resolve, minDuration))
    ])

    hidePageLoader()
    return result
  }

  return {
    showLoader,
    hideLoader,
    showFullScreenLoader,
    hideFullScreenLoader,
    showLoaderForOperation
  }
}
