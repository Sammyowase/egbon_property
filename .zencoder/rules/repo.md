---
description: Repository Information Overview
alwaysApply: true
---

# Property Website Information

## Summary
This is a Next.js project for a luxury real estate website called "Vista Grande Realty LTD". The website showcases various property types including land development, construction, agriculture, and commercial properties. It features modern UI components with animations using Framer Motion and styling with Tailwind CSS.

## Structure
- **src/app**: Next.js app router pages and layouts
- **src/components**: Reusable UI components (Navbar, Footer, PropertyCard, etc.)
- **src/contexts**: React context providers
- **src/data**: Static data files
- **src/hooks**: Custom React hooks
- **src/styles**: Global CSS styles
- **src/types**: TypeScript type definitions
- **src/utils**: Utility functions
- **public**: Static assets (images, videos, sounds)

## Language & Runtime
**Language**: TypeScript
**Version**: ES2015 target
**Framework**: Next.js 14.1.0
**Build System**: Next.js build system
**Package Manager**: npm

## Dependencies
**Main Dependencies**:
- next: 14.1.0
- react: 18.2.0
- react-dom: 18.2.0
- framer-motion: 12.5.0
- @headlessui/react: 2.2.0
- @googlemaps/react-wrapper: 1.1.42
- gsap: 3.12.7
- lucide-react: 0.536.0
- react-icons: 5.5.0
- swiper: 11.2.6

**Development Dependencies**:
- typescript: 5.x
- eslint: 8.56.0
- tailwindcss: 3.4.1
- autoprefixer: 10.4.17
- postcss: 8.4.35

## Build & Installation
```bash
npm install
npm run dev    # Development server
npm run build  # Production build
npm run start  # Start production server
npm run lint   # Run ESLint
```

## UI Components
The code snippet you provided is part of the social media links section in the Navbar component. It uses:

1. Framer Motion for animations:
   - `whileHover={{ scale: 1.1, rotate: 5 }}` for hover effects
   - `whileTap={{ scale: 0.95 }}` for click effects

2. Tailwind CSS for styling:
   - Responsive design with `hidden md:flex` (hidden on mobile, flex on medium screens)
   - Custom colors like `text-primary-gold` and `bg-primary-gold/20`
   - Transitions with `transition-all duration-300`

3. React mapping pattern:
   - Maps through an array of social media platforms
   - Uses the first character of each platform name as the display text

The Footer component implements a similar social media links section but uses full icons from react-icons (FaFacebookF, FaTwitter, etc.) instead of just the first letter.

## Styling
The project uses Tailwind CSS with an extensive custom configuration:
- Custom color palette with luxury themes (gold, black, blue)
- Custom animations and keyframes
- Extended typography scale
- Custom spacing and shadow configurations

The design system emphasizes a luxury aesthetic with gold accents, animations, and responsive layouts suitable for a high-end real estate website.