'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { usePageLoading } from '@/hooks/usePageLoading'

export default function LinkEnhancer() {
  const router = useRouter()
  const { showLoader } = usePageLoading()
  
  useEffect(() => {
    // Wait for DOM to be fully loaded
    const enhanceLinks = () => {
      // Find all internal links that aren't already enhanced
      const links = document.querySelectorAll('a[href^="/"]:not([data-premium-enhanced])');
      
      links.forEach(link => {
        // Mark as enhanced to avoid double processing
        link.setAttribute('data-premium-enhanced', 'true');
        
        // Store the original href
        const href = link.getAttribute('href');
        if (!href) return;
        
        // Skip special links
        if (href.startsWith('#') || link.hasAttribute('target')) {
          return;
        }
        
        // Replace with enhanced click handler
        link.addEventListener('click', (e) => {
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
    };
    
    // Run initially
    enhanceLinks();
    
    // Set up a mutation observer to catch dynamically added links
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          enhanceLinks();
        }
      });
    });
    
    // Start observing
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });
    
    // Clean up
    return () => {
      observer.disconnect();
    };
  }, [router, showLoader]);
  
  // This component doesn't render anything
  return null;
}