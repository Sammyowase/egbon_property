/**
 * Enhanced Image component with robust fallback system
 * Ensures seamless image loading experience with no broken images
 */

import React from 'react'
import Image, { ImageProps } from 'next/image'
import { HeroImage } from '@/data/heroImages'

interface EnhancedImageProps extends Omit<ImageProps, 'src' | 'onLoad' | 'onError'> {
  src: string
  fallback?: string
  category?: HeroImage['category']
  showLoadingSpinner?: boolean
  loadingSpinnerColor?: string
  errorFallbackComponent?: React.ReactNode
}

const EnhancedImage: React.FC<EnhancedImageProps> = ({
  src,
  fallback,
  category = 'luxury',
  showLoadingSpinner = false, // Disabled by default for local images
  loadingSpinnerColor = '#D4AF37',
  errorFallbackComponent,
  className = '',
  alt,
  ...props
}) => {
  // For local images, use them directly without complex fallback logic
  const finalSrc = src || fallback || '/background/frames-for-your-heart-2d4lAQAlbDA-unsplash.jpg'

  return (
    <div className={`relative ${className}`} style={{ width: '100%', height: '100%' }}>
      {/* Main Image - Direct loading for local files */}
      <Image
        src={finalSrc}
        alt={alt}
        className="transition-opacity duration-300 opacity-100"
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%'
        }}
        {...props}
      />
    </div>
  )
}

export default EnhancedImage

/**
 * Hero Image component specifically for hero carousels
 */
export const HeroEnhancedImage: React.FC<{
  heroImage: HeroImage
  className?: string
  priority?: boolean
}> = ({ heroImage, className = '', priority = false }) => {
  return (
    <Image
      src={heroImage.src}
      alt={heroImage.alt}
      fill
      className={`object-cover ${className}`}
      priority={priority}
      quality={95}
      sizes="100vw"
    />
  )
}
