/**
 * Placeholder image utilities for real estate application
 * Generates CSS gradients and data URLs for reliable image placeholders
 */

export interface PlaceholderConfig {
  width: number
  height: number
  colors: string[]
  text?: string
  category?: string
}

/**
 * Generate a CSS gradient background
 */
export const generateGradient = (colors: string[], direction: string = '135deg'): string => {
  return `linear-gradient(${direction}, ${colors.join(', ')})`
}

/**
 * Generate a data URL for an SVG placeholder
 */
export const generateSVGPlaceholder = (config: PlaceholderConfig): string => {
  const { width, height, colors, text, category } = config
  const gradient = generateGradient(colors)
  
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          ${colors.map((color, index) => 
            `<stop offset="${(index / (colors.length - 1)) * 100}%" style="stop-color:${color};stop-opacity:1" />`
          ).join('')}
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
      ${text ? `
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" font-weight="bold" 
              text-anchor="middle" dominant-baseline="middle" fill="white" opacity="0.8">
          ${text}
        </text>
      ` : ''}
      ${category ? `
        <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="16" 
              text-anchor="middle" dominant-baseline="middle" fill="white" opacity="0.6">
          ${category.toUpperCase()}
        </text>
      ` : ''}
    </svg>
  `
  
  return `data:image/svg+xml;base64,${btoa(svg)}`
}

/**
 * Predefined color schemes for different property categories
 */
export const colorSchemes = {
  luxury: ['#D4AF37', '#FFD700', '#B8860B'], // Gold tones
  agricultural: ['#228B22', '#32CD32', '#90EE90'], // Green tones
  construction: ['#FF6B35', '#F7931E', '#FFB347'], // Orange tones
  commercial: ['#4169E1', '#6495ED', '#87CEEB'], // Blue tones
  market: ['#8A2BE2', '#9370DB', '#DDA0DD'], // Purple tones
  default: ['#2D3748', '#4A5568', '#718096'] // Gray tones
}

/**
 * Generate placeholder images for hero carousel
 */
export const generateHeroPlaceholders = () => {
  const categories = ['luxury', 'agricultural', 'construction', 'commercial', 'market'] as const
  
  return categories.map((category, index) => ({
    src: generateSVGPlaceholder({
      width: 2048,
      height: 1365,
      colors: colorSchemes[category],
      text: `${category.charAt(0).toUpperCase() + category.slice(1)} Property`,
      category: category
    }),
    category,
    alt: `${category} property placeholder`,
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} Properties`,
    description: `Premium ${category} real estate opportunities`
  }))
}

/**
 * Generate a simple colored rectangle placeholder
 */
export const generateColorPlaceholder = (
  width: number = 800, 
  height: number = 600, 
  color: string = '#D4AF37'
): string => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}" />
    </svg>
  `
  return `data:image/svg+xml;base64,${btoa(svg)}`
}

/**
 * Fallback placeholder images using data URLs
 */
export const fallbackPlaceholders = [
  generateSVGPlaceholder({
    width: 2048,
    height: 1365,
    colors: colorSchemes.luxury,
    text: 'Luxury Properties',
    category: 'luxury'
  }),
  generateSVGPlaceholder({
    width: 2048,
    height: 1365,
    colors: colorSchemes.agricultural,
    text: 'Agricultural Land',
    category: 'agricultural'
  }),
  generateSVGPlaceholder({
    width: 2048,
    height: 1365,
    colors: colorSchemes.construction,
    text: 'Construction Projects',
    category: 'construction'
  }),
  generateSVGPlaceholder({
    width: 2048,
    height: 1365,
    colors: colorSchemes.commercial,
    text: 'Commercial Properties',
    category: 'commercial'
  }),
  generateSVGPlaceholder({
    width: 2048,
    height: 1365,
    colors: colorSchemes.market,
    text: 'Market Opportunities',
    category: 'market'
  })
]
