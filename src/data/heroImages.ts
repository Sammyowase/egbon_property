/**
 * Hero Images Data - Real Estate Property Showcase
 * Using ONLY local background images for instant loading
 */

export interface HeroImage {
  src: string
  alt: string
  category: 'luxury' | 'agricultural' | 'construction' | 'market' | 'commercial'
  title?: string
  description?: string
  fallback?: string
}

/**
 * Primary fallback images - guaranteed to exist
 */
export const primaryFallbacks = {
  luxury: '/background/avi-werde-hHz4yrvxwlA-unsplash.jpg',
  agricultural: '/background/avi-werde-hHz4yrvxwlA-unsplash.jpg',
  construction: '/background/brian-babb-XbwHrt87mQ0-unsplash.jpg',
  commercial: '/background/frames-for-your-heart-2d4lAQAlbDA-unsplash.jpg',
  market: '/background/webaliser-_TPTXZd9mOo-unsplash.jpg',
  default: '/background/frames-for-your-heart-2d4lAQAlbDA-unsplash.jpg'
}

export const heroImages: HeroImage[] = [
  {
    src: '/background/avi-werde-hHz4yrvxwlA-unsplash.jpg',
    alt: 'Luxury modern villa with elegant architecture',
    category: 'luxury',
    title: 'Luxury Living',
    description: 'Exquisite properties that define elegance',
    fallback: '/background/avi-werde-hHz4yrvxwlA-unsplash.jpg'
  },
  {
    src: '/background/brian-babb-XbwHrt87mQ0-unsplash.jpg',
    alt: 'Premium residential development with modern design',
    category: 'luxury',
    title: 'Architectural Excellence',
    description: 'Where design meets sophistication',
    fallback: '/background/brian-babb-XbwHrt87mQ0-unsplash.jpg'
  },
  {
    src: '/background/frames-for-your-heart-2d4lAQAlbDA-unsplash.jpg',
    alt: 'Luxury penthouse with stunning city views',
    category: 'luxury',
    title: 'Urban Sophistication',
    description: 'Premium city living at its finest',
    fallback: '/background/frames-for-your-heart-2d4lAQAlbDA-unsplash.jpg'
  },
  {
    src: '/background/webaliser-_TPTXZd9mOo-unsplash.jpg',
    alt: 'Waterfront luxury estate with panoramic views',
    category: 'luxury',
    title: 'Waterfront Elegance',
    description: 'Exclusive waterfront living experiences',
    fallback: '/background/webaliser-_TPTXZd9mOo-unsplash.jpg'
  }
]

// Default fallback images (actual image files)
export const fallbackHeroImages: string[] = [
  '/background/avi-werde-hHz4yrvxwlA-unsplash.jpg',
  '/background/brian-babb-XbwHrt87mQ0-unsplash.jpg',
  '/background/frames-for-your-heart-2d4lAQAlbDA-unsplash.jpg',
  '/background/webaliser-_TPTXZd9mOo-unsplash.jpg'
]

/**
 * Get hero images by category
 */
export const getHeroImagesByCategory = (category: HeroImage['category']): HeroImage[] => {
  return heroImages.filter(image => image.category === category)
}

/**
 * Get random hero images
 */
export const getRandomHeroImages = (count: number = 4): HeroImage[] => {
  const shuffled = [...heroImages].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

/**
 * Get hero image sources only (for simple carousel usage)
 */
export const getHeroImageSources = (): string[] => {
  return heroImages.map(image => image.src)
}
