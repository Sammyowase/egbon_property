'use client'

import { ReactNode, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePageLoading } from '@/hooks/usePageLoading'

interface PremiumLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
  skipLoader?: boolean
  [key: string]: any // For any other props
}

export default function PremiumLink({
  href,
  children,
  className = '',
  onClick,
  skipLoader = false,
  ...rest
}: PremiumLinkProps) {
  const router = useRouter()
  const { showLoader } = usePageLoading()
  const isNavigatingRef = useRef(false)
  
  // We're not using the Link's onClick anymore to avoid double navigation
  // Instead, we'll handle navigation manually
  const handleClick = (e: React.MouseEvent) => {
    // If it's an external link or skipLoader is true, use default behavior
    if (href.startsWith('http') || href.startsWith('#') || skipLoader) {
      onClick?.()
      return
    }
    
    // Prevent default link behavior
    e.preventDefault()
    
    // Prevent multiple navigations
    if (isNavigatingRef.current) {
      return
    }
    
    isNavigatingRef.current = true
    
    // Call the original onClick if provided
    onClick?.()
    
    // Show minimal loader before navigation (for page transitions)
    showLoader(1500) // Show for 1.5 seconds
    
    // Navigate programmatically after a short delay
    // This ensures the loader has time to appear before navigation
    setTimeout(() => {
      router.push(href)
      
      // Reset the navigating flag after navigation
      setTimeout(() => {
        isNavigatingRef.current = false
      }, 500)
    }, 50)
  }
  
  return (
    <Link 
      href={href} 
      className={className} 
      onClick={handleClick}
      {...rest}
    >
      {children}
    </Link>
  )
}

// Add a utility function to enhance regular links with premium loading
export function enhanceLinks() {
  if (typeof window === 'undefined') return; // Skip on server-side
  
  // Wait for DOM to be fully loaded
  setTimeout(() => {
    const { showLoader } = require('@/hooks/usePageLoading').usePageLoading();
    const router = require('next/navigation').useRouter();
    
    // Find all internal links that aren't already enhanced
    const links = document.querySelectorAll('a[href^="/"]:not([data-premium-enhanced])');
    
    links.forEach(link => {
      // Mark as enhanced to avoid double processing
      link.setAttribute('data-premium-enhanced', 'true');
      
      // Store the original href
      const href = link.getAttribute('href');
      
      // Add click handler
      link.addEventListener('click', (e) => {
        // Skip if it's a special link
        if (href?.startsWith('#') || link.hasAttribute('target')) {
          return;
        }
        
        // Prevent default navigation
        e.preventDefault();
        
        // Show loader
        showLoader(1500);
        
        // Navigate after a short delay
        setTimeout(() => {
          router.push(href);
        }, 50);
      });
    });
  }, 1000); // Delay to ensure DOM is loaded
}