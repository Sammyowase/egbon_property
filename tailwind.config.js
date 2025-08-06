/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          // Enhanced Gold Palette (as specified)
          gold: '#C9A14D',           // Rich Gold (updated)
          'gold-metallic': '#A67C00', // Deep Metallic Gold (new)
          'gold-glow': '#E5C07B',     // Golden Glow for hover states (new)
          'gold-light': '#F4E4BC',    // Light gold variant
          'gold-dark': '#B4942F',     // Dark gold variant
          'gold-accent': '#E6C547',   // Gold accent

          // Enhanced Black Palette (as specified)
          black: '#000000',           // Pure Black (updated)
          'black-charcoal': '#1A1A1A', // Charcoal Black (new)
          'black-light': '#1A1A1A',   // Light black variant
          'black-medium': '#141414',  // Medium black variant

          // Enhanced White Palette (as specified)
          white: '#FFFFFF',           // Pure White
          'white-soft': '#F9F9F9',    // Soft Off-White (new)

          // Enhanced Blue Palette (complementary to gold/black/white)
          'blue-primary': '#1E40AF',   // Deep Royal Blue (primary)
          'blue-secondary': '#3B82F6', // Vibrant Blue (secondary)
          'blue-accent': '#60A5FA',    // Soft Blue Accent
          'blue-midnight': '#0F172A',  // Midnight Blue
          'blue-subtle': '#1E3A8A',    // Subtle Blue
          'blue-light': '#3B82F6',     // Light Blue
          'blue-dark': '#1E40AF',      // Dark Blue

          // Utility Colors
          'gray-luxury': '#2A2A2A',
          'gray-light': '#E0E0E0',     // Light Grey borders (updated)
          'gray-border': '#E0E0E0',    // Dedicated border color
          'cream': '#FDF6E3',

          // Status Colors
          'success': '#2ECC71',        // Emerald Green success
          'error': '#E74C3C',          // Soft Red error
          'warning': '#F39C12',        // Warning orange
          'info': '#3498DB',           // Info blue
        },
        luxury: {
          // Metallic Tones
          platinum: '#E5E4E2',
          bronze: '#CD7F32',
          pearl: '#F8F6F0',
          charcoal: '#36454F',
          champagne: '#F7E7CE',

          // Enhanced Blue Luxury Tones
          sapphire: '#0F4C75',
          'blue-pearl': '#E8F4FD',
          'midnight-blue': '#1A237E',
          'royal-blue': '#1E40AF',
          'azure': '#007FFF',

          // Additional Luxury Colors
          'rose-gold': '#E8B4B8',
          'copper': '#B87333',
          'silver': '#C0C0C0',
          'onyx': '#353839',
        },

        // Gradient Definitions
        gradients: {
          'gold-primary': 'linear-gradient(135deg, #C9A14D 0%, #A67C00 100%)',
          'gold-glow': 'linear-gradient(135deg, #E5C07B 0%, #C9A14D 50%, #A67C00 100%)',
          'blue-gold': 'linear-gradient(135deg, #1E40AF 0%, #C9A14D 100%)',
          'luxury-dark': 'linear-gradient(135deg, #000000 0%, #1A1A1A 50%, #0F172A 100%)',
          'hero-overlay': 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(26,26,26,0.7) 50%, rgba(15,23,42,0.8) 100%)',
        },

      // Enhanced Typography Scale
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],

        // Custom Real Estate Typography
        'hero': ['clamp(3rem, 8vw, 8rem)', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
        'display': ['clamp(2.5rem, 6vw, 6rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'heading': ['clamp(2rem, 4vw, 4rem)', { lineHeight: '1.2' }],
        'subheading': ['clamp(1.5rem, 3vw, 3rem)', { lineHeight: '1.3' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body-luxury': ['1rem', { lineHeight: '1.6' }],
        'caption': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.05em' }],
      },

      // Enhanced Font Families
      fontFamily: {
        'playfair': ['var(--font-playfair)', 'serif'],
        'montserrat': ['var(--font-montserrat)', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],
        'luxury': ['var(--font-playfair)', 'serif'],
        'body': ['var(--font-montserrat)', 'sans-serif'],
      },

      // Enhanced Spacing Scale
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '176': '44rem',
        '192': '48rem',
        '208': '52rem',
        '224': '56rem',
        '240': '60rem',
        '256': '64rem',
      },

      // Enhanced Animation System
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease-in-out infinite',
        'parallax-slow': 'parallaxSlow 20s linear infinite',
        'carousel-slide': 'carouselSlide 15s ease-in-out infinite',
        'cursor-trail': 'cursorTrail 0.3s ease-out',
        'magnetic': 'magnetic 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      },

      // Enhanced Box Shadow System
      boxShadow: {
        'luxury': '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(201, 161, 77, 0.1)',
        'luxury-lg': '0 35px 60px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(201, 161, 77, 0.15)',
        'gold-glow': '0 0 20px rgba(201, 161, 77, 0.3), 0 0 40px rgba(201, 161, 77, 0.2)',
        'gold-glow-intense': '0 0 30px rgba(201, 161, 77, 0.5), 0 0 60px rgba(201, 161, 77, 0.3)',
        'blue-glow': '0 0 20px rgba(30, 64, 175, 0.3), 0 0 40px rgba(30, 64, 175, 0.2)',
        'blue-glow-intense': '0 0 30px rgba(30, 64, 175, 0.5), 0 0 60px rgba(30, 64, 175, 0.3)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'glass-gold': '0 8px 32px rgba(201, 161, 77, 0.1), inset 0 1px 0 rgba(201, 161, 77, 0.1)',
        'card-hover': '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(201, 161, 77, 0.1)',
        'button-luxury': '0 4px 14px rgba(201, 161, 77, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      },

      // Enhanced Border Radius
      borderRadius: {
        'luxury': '1.5rem',
        'luxury-lg': '2rem',
        'luxury-xl': '2.5rem',
      },

      // Enhanced Backdrop Blur
      backdropBlur: {
        'luxury': '20px',
        'luxury-lg': '40px',
      },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'rotate-slow': 'rotateSlow 20s linear infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.2)' },
          '100%': { boxShadow: '0 0 30px rgba(212, 175, 55, 0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.6)' },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      fontFamily: {
        'luxury': ['Playfair Display', 'serif'],
        'modern': ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        'hero': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'headline': ['2rem', { lineHeight: '1.3', letterSpacing: '0' }],
        'luxury-sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.05em' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },

      // Keyframe Animations
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(201, 161, 77, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(201, 161, 77, 0.6)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        parallaxSlow: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        carouselSlide: {
          '0%': { transform: 'translateX(0%)' },
          '20%': { transform: 'translateX(0%)' },
          '25%': { transform: 'translateX(-100%)' },
          '45%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(-200%)' },
          '70%': { transform: 'translateX(-200%)' },
          '75%': { transform: 'translateX(-300%)' },
          '95%': { transform: 'translateX(-300%)' },
          '100%': { transform: 'translateX(-400%)' },
        },
        cursorTrail: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.5)' },
        },
        magnetic: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(var(--magnetic-x, 0), var(--magnetic-y, 0))' },
        },
      },
    },
  },
  plugins: [],
}