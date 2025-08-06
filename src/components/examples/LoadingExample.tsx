'use client'

import { usePageLoading } from '@/hooks/usePageLoading'
import LuxuryButton from '@/components/ui/LuxuryButton'

/**
 * Example component showing how to use the premium Vista Grande loading system
 * You can use this pattern in any page or component
 */
export default function LoadingExample() {
  const {
    showLoader,
    hideLoader,
    showFullScreenLoader,
    hideFullScreenLoader,
    showLoaderForOperation
  } = usePageLoading()

  const handleShowPageLoader = () => {
    showLoader(2000) // Show premium page transition for 2 seconds
  }

  const handleShowFullScreenLoader = () => {
    showFullScreenLoader(4000) // Show full premium experience for 4 seconds
  }

  const handleManualLoader = () => {
    showLoader(0) // Show indefinitely
    // Manually hide after some async operation
    setTimeout(() => {
      hideLoader()
    }, 1500)
  }

  const handleAsyncOperation = async () => {
    try {
      await showLoaderForOperation(
        // Simulate API call
        new Promise(resolve => setTimeout(resolve, 2000)),
        1000 // Minimum 1 second of premium loading
      )
      alert('Operation completed!')
    } catch (error) {
      console.error('Operation failed:', error)
    }
  }

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold text-white mb-6">Premium Loading System Examples</h2>

      <div className="space-y-4">
        <LuxuryButton onClick={handleShowPageLoader}>
          Show Premium Page Transition (2s)
        </LuxuryButton>

        <LuxuryButton onClick={handleShowFullScreenLoader} variant="outline">
          Show Full Premium Experience (4s)
        </LuxuryButton>

        <LuxuryButton onClick={handleManualLoader} variant="ghost">
          Manual Loader Control
        </LuxuryButton>

        <LuxuryButton onClick={handleAsyncOperation} variant="luxury">
          Async Operation with Loading
        </LuxuryButton>

        <LuxuryButton onClick={hideFullScreenLoader} variant="outline">
          Force Hide Loader
        </LuxuryButton>
      </div>
      
      <div className="mt-8 p-4 bg-primary-black/50 rounded-lg border border-primary-gold/20">
        <h3 className="text-lg font-semibold text-primary-gold mb-2">Premium Loading Usage:</h3>
        <pre className="text-sm text-white/80 overflow-x-auto">
{`// Import the enhanced hook
import { usePageLoading } from '@/hooks/usePageLoading'

// Use in component
const {
  showLoader,
  hideLoader,
  showFullScreenLoader,
  showLoaderForOperation
} = usePageLoading()

// Premium page transition (default 1s)
showLoader(2000) // 2 seconds

// Full premium experience (default 3s)
showFullScreenLoader(4000) // 4 seconds

// For async operations with minimum duration
await showLoaderForOperation(
  fetch('/api/data'),
  1000 // Minimum 1s of premium loading
)

// Manual control
showLoader(0) // Show indefinitely
hideLoader() // Hide when ready`}
        </pre>
      </div>
    </div>
  )
}
