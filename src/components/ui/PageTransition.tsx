'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useLoading } from '@/components/providers/LoadingProvider'

export default function PageTransition() {
  const pathname = usePathname()
  const { showPageLoader, hidePageLoader } = useLoading()

  useEffect(() => {
    // Show loader on route change
    showPageLoader()
    
    // Hide loader after a short delay
    const timer = setTimeout(() => {
      hidePageLoader()
    }, 800)

    return () => clearTimeout(timer)
  }, [pathname, showPageLoader, hidePageLoader])

  return null // This component doesn't render anything
}
