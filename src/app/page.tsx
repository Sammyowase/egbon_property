'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import MotionBackground from '@/components/MotionBackground'
import HeroBackgroundCarousel from '@/components/ui/HeroBackgroundCarousel'
import CategoryHeroCarousel from '@/components/ui/CategoryHeroCarousel'
import PropertyShowcase from '@/components/ui/PropertyShowcase'
import { fallbackHeroImages, heroImages, getRandomHeroImages } from '@/data/heroImages'
// Optimized imports - only import what's actually used
import { FaSearch, FaHome, FaHandshake, FaTrophy, FaUsers, FaHeart, FaStar, FaPlay, FaChevronRight, FaMapMarkerAlt, FaPhone, FaEnvelope, FaBuilding, FaArrowRight, FaBed, FaBath, FaRuler } from 'react-icons/fa'
import { PropertyLoadingSpinner, MinimalLoadingSpinner } from '@/components/ui/LuxuryLoadingSpinner'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { ClientOnly, ClientScrollReveal, ClientStaggerContainer, ClientStaggerItem } from '@/components/animations/ClientOnly'

const PropertyMap = dynamic(() => import('@/components/PropertyMap'), {
  loading: () => (
    <div className="w-full h-[400px] glass-morphism-gold rounded-lg flex items-center justify-center">
      <PropertyLoadingSpinner
        size="lg"
        message="Loading interactive map..."
      />
    </div>
  ),
  ssr: false
})
// import LuxuryCard from '@/components/ui/LuxuryCard'
// import LuxuryButton from '@/components/ui/LuxuryButton'
// import AnimatedCounter from '@/components/ui/AnimatedCounter'
// import ParallaxSection from '@/components/ui/ParallaxSection'
// import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal'
// import MagneticButton from '@/components/animations/MagneticButton'
// import FloatingElement, { BackgroundParticles } from '@/components/animations/FloatingElements'
// import VirtualTourButton from '@/components/virtual-tour/VirtualTourButton'

// Temporary simple components
const AnimatedCounter = ({ value, suffix = '', duration = 2 }: { value: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setCount(value), 100);
    return () => clearTimeout(timer);
  }, [value]);
  
  return <span>{count}{suffix}</span>;
};

const ParallaxSection = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <section className={className}>{children}</section>
);

const ScrollReveal = ({ children, direction = 'up', delay = 0, className = '' }: {
  children: React.ReactNode;
  direction?: string;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0, x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0 }}
    animate={{ opacity: 1, y: 0, x: 0 }}
    transition={{ delay, duration: 0.6 }}
  >
    {children}
  </motion.div>
);

const StaggerContainer = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    className={className}
    initial="initial"
    animate="animate"
    variants={{
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
    }}
  >
    {children}
  </motion.div>
);

const StaggerItem = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    variants={{
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 }
    }}
  >
    {children}
  </motion.div>
);

const FloatingElement = ({ children, duration = 3, amplitude = 10, delay = 0 }: { 
  children: React.ReactNode; 
  duration?: number; 
  amplitude?: number; 
  delay?: number;
}) => (
  <motion.div
    animate={{ y: [-amplitude, amplitude, -amplitude] }}
    transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

const BackgroundParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className={`absolute rounded-full ${
          i % 3 === 0 
            ? 'w-3 h-3 bg-primary-gold/30' 
            : i % 3 === 1 
            ? 'w-2 h-2 bg-primary-blue-light/25' 
            : 'w-1 h-1 bg-white/40'
        }`}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -150, 0],
          x: [0, Math.random() * 50 - 25, 0],
          opacity: [0, 1, 0],
          scale: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 4 + Math.random() * 3,
          repeat: Infinity,
          delay: Math.random() * 3,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

// Enhanced Background Component
const EnhancedBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    {/* Animated Gradient Overlay */}
    <motion.div
      className="absolute inset-0"
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(212, 175, 55, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(212, 175, 55, 0.08) 0%, transparent 50%)
        `
      }}
      animate={{
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    
    {/* Floating Geometric Shapes */}
    <div className="absolute inset-0">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute ${
            i % 4 === 0 ? 'w-32 h-32 border border-primary-gold/10' :
            i % 4 === 1 ? 'w-24 h-24 border border-primary-blue-light/8' :
            i % 4 === 2 ? 'w-16 h-16 bg-primary-gold/5 rounded-full' :
            'w-20 h-20 bg-primary-blue-light/5 rounded-full'
          }`}
          style={{
            left: `${10 + (i * 12)}%`,
            top: `${10 + (i * 8)}%`,
            transform: `rotate(${i * 45}deg)`,
          }}
          animate={{
            rotate: [i * 45, i * 45 + 360],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 20 + i * 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
    
    {/* Subtle Grid Pattern */}
    <div 
      className="absolute inset-0 opacity-5"
      style={{
        backgroundImage: `
          linear-gradient(rgba(212, 175, 55, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(212, 175, 55, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '100px 100px'
      }}
    />
  </div>
);

const VirtualTourButton = ({ property, tourType, variant }: any) => (
  <motion.button
    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
      variant === 'primary' 
        ? 'bg-primary-gold text-primary-black hover:bg-primary-gold-accent' 
        : 'border border-primary-blue-light text-primary-blue-light hover:bg-primary-blue-light hover:text-white'
    }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {tourType === '360' ? '360° Virtual Tour' : 'Video Tour'}
  </motion.button>
);

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [likedProperties, setLikedProperties] = useState<Set<number>>(new Set());
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredProperty, setHoveredProperty] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Hero background carousel state
  const [heroCurrentSlide, setHeroCurrentSlide] = useState(0);
  const heroBackgroundImages = [
    '/background/avi-werde-hHz4yrvxwlA-unsplash.jpg',
    '/background/brian-babb-XbwHrt87mQ0-unsplash.jpg',
    '/background/frames-for-your-heart-2d4lAQAlbDA-unsplash.jpg',
    '/background/webaliser-_TPTXZd9mOo-unsplash.jpg'
  ];

  // Auto-slide for hero background images - Every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCurrentSlide((prev) => (prev + 1) % heroBackgroundImages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [heroBackgroundImages.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      const container = document.querySelector('.properties-carousel');
      if (container) {
        const scrollAmount = container.clientWidth;
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        if (container.scrollLeft >= maxScroll) {
          container.scrollTo({ 
            left: 0, 
            behavior: 'smooth' 
          });
        } else {
          container.scrollBy({ 
            left: scrollAmount, 
            behavior: 'smooth' 
          });
        }
      }
    }, 8000); // Slower for better UX

    return () => clearInterval(interval);
  }, []);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const stats = [
    { icon: <FaHome />, value: 500, label: 'Properties Sold', suffix: '+', color: 'gold' },
    { icon: <FaHandshake />, value: 1000, label: 'Happy Clients', suffix: '+', color: 'blue' },
    { icon: <FaTrophy />, value: 15, label: 'Years Experience', suffix: '+', color: 'gold' },
    { icon: <FaUsers />, value: 50, label: 'Expert Agents', suffix: '+', color: 'blue' },
  ]

  const portfolioCategories = [
    { id: 'all', label: 'All Portfolios', icon: <FaHome /> },
    { id: 'land', label: 'Land Development', icon: <FaMapMarkerAlt /> },
    { id: 'construction', label: 'Construction', icon: <FaTrophy /> },
    { id: 'agriculture', label: 'Agriculture', icon: <FaStar /> },
    { id: 'farmland', label: 'Farm Land', icon: <FaSearch /> }
  ];

  const featuredPortfolios = [
    {
      title: 'Premium Land Development',
      location: 'Apata Ibadan, OY',
      price: '₦5,900,000',
      size: '1,200',
      image: '/background/webaliser-_TPTXZd9mOo-unsplash.jpg',
      category: 'land',
      highlights: ['Ready to Build', 'Prime Location', 'Verified Documents'],
      description: 'Premium plots perfect for residential or commercial development with modern infrastructure.',
      link: '/portfolio/land-development',
      rating: 4.9,
      reviews: 127
    },
    {
      title: 'Modern Housing Construction',
      location: 'Epe, LA',
      price: '₦8,500,000',
      size: '2,500',
      image: '/images/property2.jpg',
      category: 'construction',
      highlights: ['Turnkey Project', 'Modern Design', 'Quality Materials'],
      description: 'State-of-the-art construction projects with contemporary amenities and smart home features.',
      link: '/portfolio/construction',
      rating: 4.8,
      reviews: 89
    },
    {
      title: 'Agricultural Investment',
      location: 'Simawa, OG',
      price: '₦12,900,000',
      size: '5,000',
      image: '/images/property3.jpg',
      category: 'agriculture',
      highlights: ['High Yield', 'Irrigation System', 'Storage Facility'],
      description: 'Agricultural projects with modern farming infrastructure and sustainable practices.',
      link: '/portfolio/agriculture',
      rating: 4.7,
      reviews: 156
    },
    {
      title: 'Farm Land Investment',
      location: 'Ikorodu, LA',
      price: '₦15,500,000',
      size: '10,000',
      image: '/images/property4.jpg',
      category: 'farmland',
      highlights: ['Fertile Soil', 'Water Access', 'Road Network'],
      description: 'Large farm lands ideal for agricultural development with excellent connectivity.',
      link: '/portfolio/farm-land',
      rating: 4.9,
      reviews: 203
    },
    {
      title: 'Mixed-Use Development',
      location: 'Imota, LA',
      price: '₦7,200,000',
      size: '3,000',
      image: '/images/property5.jpg',
      category: 'land',
      highlights: ['Commercial Zone', 'Residential Area', 'Infrastructure'],
      description: 'Strategic mixed-use development opportunities in rapidly growing areas.',
      link: '/portfolio/land-development',
      rating: 4.6,
      reviews: 94
    },
    {
      title: 'Eco-Friendly Farm Project',
      location: 'Ikeja, LA',
      price: '₦16,800,000',
      size: '8,000',
      image: '/images/property6.jpg',
      category: 'agriculture',
      highlights: ['Organic Farming', 'Sustainable', 'Tech-Enabled'],
      description: 'Sustainable agricultural projects with cutting-edge technology and eco-friendly practices.',
      link: '/portfolio/agriculture',
      rating: 4.8,
      reviews: 178
    }
  ];

  const testimonials = [
    {
      text: "Working with Vista Grande was transformative. They didn't just find us a property; they found us our future.",
      author: "Samuel Owase",
      position: "CEO, Tech Solutions Inc.",
      image: "/testimonials/samuel.jpg",
      rating: 5
    },
    {
      text: "The attention to detail and professionalism exceeded every expectation. A truly world-class experience.",
      author: "Okiki Yusuf",
      position: "Investment Banker",
      image: "/testimonials/okiki.jpg",
      rating: 5
    },
    {
      text: "Their expertise in luxury properties is unmatched. They made what seemed impossible, effortless.",
      author: "Yusuf Subomi",
      position: "Interior Designer",
      image: "/testimonials/yusuf.jpg",
      rating: 5
    }
  ]

  const mapProperties = [
    {
      title: 'Luxury Villa with Ocean View',
      location: 'Mowe Ibafo, OG',
      price: '₦5,900,000',
      position: { lat: 6.8062, lng: 3.4368 }
    },
    {
      title: 'Modern Penthouse Suite',
      location: 'Epe, LA',
      price: '₦8,500,000',
      position: { lat: 6.6055, lng: 3.9470 }
    },
    {
      title: 'Beachfront Estate',
      location: 'Simawa, OG',
      price: '₦12,900,000',
      position: { lat: 6.6783, lng: 3.4598 }
    },
    {
      title: 'Mountain View Mansion',
      location: 'Ikorodu, LA',
      price: '₦15,500,000',
      position: { lat: 6.6194, lng: 3.5105 }
    },
    {
      title: 'Waterfront Contemporary',
      location: 'Imota, LA',
      price: '₦7,200,000',
      position: { lat: 6.6634, lng: 3.6619 }
    },
    {
      title: 'Historic Downtown Penthouse',
      location: 'Ikeja, LA',
      price: '₦16,800,000',
      position: { lat: 6.6018, lng: 3.3515 }
    }
  ];

  // Enhanced Animation variants - Disabled scroll triggers
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  };

  const staggerChildren = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  };

  const cardHover = {
    rest: {
      scale: 1,
      rotateY: 0,
      rotateX: 0,
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    hover: {
      scale: 1.02,
      rotateY: 5,
      rotateX: 5,
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const magneticEffect = {
    x: typeof window !== 'undefined' ? (mousePosition.x - window.innerWidth / 2) * 0.01 : 0,
    y: typeof window !== 'undefined' ? (mousePosition.y - window.innerHeight / 2) * 0.01 : 0,
    transition: { type: "spring", stiffness: 150, damping: 15 }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    setSubscriptionStatus('idle');

    try {
      // Add your newsletter subscription API call here
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated API call
      setSubscriptionStatus('success');
      setEmail('');
    } catch (error) {
      setSubscriptionStatus('error');
    } finally {
      setIsSubscribing(false);
    }
  };

  const toggleLike = (index: number) => {
    setLikedProperties(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const filteredPortfolios = activeCategory === 'all' 
    ? featuredPortfolios 
    : featuredPortfolios.filter(p => p.category === activeCategory);

  return (
    <>
      {/* Simplified background for a more mature design */}
      
      {/* HERO SECTION - Ultra Premium Cinematic Experience - Mobile Optimized */}
      <motion.section
        className="min-h-screen flex items-center relative pt-32 sm:pt-36 md:pt-40 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        {/* Hero Background Carousel - Mobile Optimized */}
        <div className="absolute inset-0 z-0">
          {/* Slide Counter - Mobile Responsive */}
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-primary-gold text-primary-black px-2 py-1 sm:px-3 sm:py-1 rounded text-xs sm:text-sm font-semibold z-50">
            {heroCurrentSlide + 1}/{heroBackgroundImages.length}
          </div>

          {/* Background Image */}
          <img
            src={heroBackgroundImages[heroCurrentSlide]}
            alt={`Hero background ${heroCurrentSlide + 1}`}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            style={{ zIndex: 1 }}
          />

          {/* Overlay - Reduced opacity to show background images */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary-black/50 via-primary-black/30 to-primary-black/60" style={{ zIndex: 2 }} />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-gold/5 via-transparent to-primary-blue-primary/5" style={{ zIndex: 3 }} />
        </div>

        {/* Simplified background with no floating elements */}

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <StaggerContainer className="text-center max-w-5xl mx-auto">
            <StaggerItem>
              <motion.div
                className="mb-8"
              >
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-8 leading-tight tracking-tight">
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary-gold via-white/90 to-primary-gold-accent font-cormorant drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] filter-none luxury-heading-shimmer" style={{textShadow: "0 2px 4px rgba(0,0,0,0.2), 0 0 10px rgba(201,161,77,0.3)"}}>
                    Where Vision Meets Value
                  </span>
                </h1>
              </motion.div>
            </StaggerItem>

            <StaggerItem>
              <ScrollReveal direction="up" delay={0.3}>
                <p 
                  className="text-2xl sm:text-3xl md:text-4xl text-white/95 mb-6 font-montserrat font-light px-4 sm:px-0 tracking-wide"
                >
                  Transforming Spaces. Elevating Lifestyles. Building Tomorrow.
                </p>
              </ScrollReveal>
            </StaggerItem>

            {/* <StaggerItem>
              <ScrollReveal direction="up" delay={0.5}>
                <p 
                  className="text-base sm:text-lg md:text-xl text-white/85 mb-10 max-w-4xl mx-auto leading-relaxed px-4 sm:px-6 md:px-4 font-montserrat tracking-normal"
                >
                  Vista Grande Realty LTD is a next-generation real estate company dedicated to creating vibrant, livable, and sustainable communities across Nigeria, starting from the heart of Ibadan. We blend innovation with tradition to deliver exceptional value.
                </p>
              </ScrollReveal>
            </StaggerItem> */}

            <StaggerItem>
              <ScrollReveal direction="up" delay={0.7}>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4 sm:px-0">
                  <Link href="/portfolio/property" className="w-full sm:w-auto">
                    <button
                      className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-4 md:py-5 text-lg md:text-xl rounded-xl font-montserrat font-medium bg-gradient-to-r from-primary-gold to-primary-gold-accent text-primary-black shadow-lg relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
                        <FaSearch className="text-base sm:text-lg" />
                        <span>View Listings</span>
                        <FaChevronRight className="text-base sm:text-lg" />
                      </span>
                    </button>
                  </Link>
                  <Link href="/contact" className="w-full sm:w-auto">
                    <button
                      className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-4 md:py-5 text-lg md:text-xl rounded-xl font-montserrat font-medium border-2 border-primary-blue-light text-primary-blue-light bg-transparent relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
                        <FaPhone className="text-base sm:text-lg" />
                        <span>Get in Touch</span>
                        <FaEnvelope className="text-base sm:text-lg" />
                      </span>
                    </button>
                  </Link>
                </div>
              </ScrollReveal>
            </StaggerItem>

            {/* Trust Indicators */}
            <StaggerItem>
              <ScrollReveal direction="up" delay={0.9}>
                <motion.div 
                  className="mt-16 flex flex-wrap justify-center items-center gap-8 text-white/60"
                  variants={staggerChildren}
                >
                  <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.1 }}>
                    <div className="flex text-primary-gold">
                      {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                    </div>
                    <span className="text-sm">4.9/5 Rating</span>
                  </motion.div>
                  <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.1 }}>
                    <FaTrophy className="text-primary-blue-light" />
                    <span className="text-sm">Award Winning</span>
                  </motion.div>
                  <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.1 }}>
                    <FaUsers className="text-primary-gold" />
                    <span className="text-sm">1000+ Happy Clients</span>
                  </motion.div>
                </motion.div>
              </ScrollReveal>
            </StaggerItem>
          </StaggerContainer>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-primary-gold/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary-gold rounded-full mt-2 animate-bounce" />
          </div>
        </motion.div>
      </motion.section>

      {/* WHO WE ARE SECTION - Grand & Luxurious */}
      <section className="py-32 relative overflow-hidden">
        {/* Background with similar treatment to hero */}
        <div className="absolute inset-0 z-0">
          <img
            src="/bg/back_.jpeg"
            alt="Luxury background"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 1 }}
          />
          
          {/* Overlay with same gradient as hero */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary-black/70 via-primary-black/60 to-primary-black/80" style={{ zIndex: 2 }} />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-gold/5 via-transparent to-primary-blue-primary/5" style={{ zIndex: 3 }} />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ClientOnly>
            <ClientStaggerContainer className="text-center max-w-5xl mx-auto">
              <ClientStaggerItem>
                <div className="mb-12">
                  <h2 className="text-4xl sm:text-5xl md:text-6xl mb-6 leading-tight tracking-tight">
                    <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary-gold via-white/90 to-primary-gold-accent font-cormorant drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] filter-none luxury-heading-shimmer" style={{textShadow: "0 2px 4px rgba(0,0,0,0.2), 0 0 10px rgba(201,161,77,0.3)"}}>
                      Who We Are
                    </span>
                  </h2>
                </div>
              </ClientStaggerItem>
              
              <ClientStaggerItem>
                <ClientScrollReveal direction="up" delay={0.3}>
                  <div className="relative mb-16">
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-primary-gold to-transparent"></div>
                    <p className="text-xl sm:text-2xl md:text-3xl text-white/95 font-montserrat font-light tracking-wide max-w-4xl mx-auto">
                      Vista Grande Realty LTD is a next-generation real estate company dedicated to creating vibrant, livable, and sustainable
                      communities across Nigeria.
                    </p>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-primary-gold to-transparent"></div>
                  </div>
                </ClientScrollReveal>
              </ClientStaggerItem>
              
              <ClientStaggerItem>
                <ClientScrollReveal direction="up" delay={0.5}>
                  <div className="glass-card p-8 md:p-10 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10 shadow-2xl">
                    <p className="text-lg md:text-xl text-white/90 font-montserrat leading-relaxed">
                      We combine local insight with global standards to deliver premium residential, commercial, and investment properties that stand the test of time. Our vision is to transform spaces, elevate lifestyles, and build tomorrow's communities today.
                    </p>
                  </div>
                </ClientScrollReveal>
              </ClientStaggerItem>
              
              <ClientStaggerItem>
                <ClientScrollReveal direction="up" delay={0.7}>
                  <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/70">
                    <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.1 }}>
                      <FaTrophy className="text-primary-gold" />
                      <span className="text-sm">Award Winning</span>
                    </motion.div>
                    <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.1 }}>
                      <FaBuilding className="text-primary-blue-light" />
                      <span className="text-sm">Premium Properties</span>
                    </motion.div>
                    <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.1 }}>
                      <FaUsers className="text-primary-gold" />
                      <span className="text-sm">Trusted by Clients</span>
                    </motion.div>
                  </div>
                </ClientScrollReveal>
              </ClientStaggerItem>
            </ClientStaggerContainer>
          </ClientOnly>
        </div>
      </section>

      {/* SERVICES SECTION - Grand & Luxurious */}
      <section className="py-32 relative overflow-hidden">
        {/* Background with similar treatment to hero */}
        <div className="absolute inset-0 z-0">
          <img
            src="/bg/datebg.jpg"
            alt="Luxury background"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 1 }}
          />
          
          {/* Overlay with same gradient as hero */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary-black/70 via-primary-black/60 to-primary-black/80" style={{ zIndex: 2 }} />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-blue-primary/5 via-transparent to-primary-gold/5" style={{ zIndex: 3 }} />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ClientOnly>
            <ClientStaggerContainer className="text-center max-w-5xl mx-auto mb-16">
              <ClientStaggerItem>
                <div className="mb-12">
                  <h2 className="text-4xl sm:text-5xl md:text-6xl mb-6 leading-tight tracking-tight">
                    <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary-gold via-white/90 to-primary-gold-accent font-cormorant drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] filter-none luxury-heading-shimmer" style={{textShadow: "0 2px 4px rgba(0,0,0,0.2), 0 0 10px rgba(201,161,77,0.3)"}}>
                      What We Offer
                    </span>
                  </h2>
                </div>
              </ClientStaggerItem>
              
              <ClientStaggerItem>
                <ClientScrollReveal direction="up" delay={0.3}>
                  <p className="text-xl sm:text-2xl text-white/95 font-montserrat font-light tracking-wide max-w-4xl mx-auto mb-8">
                    Exceptional properties and services designed to elevate your lifestyle and investment portfolio.
                  </p>
                </ClientScrollReveal>
              </ClientStaggerItem>
            </ClientStaggerContainer>

            <div className="max-w-6xl mx-auto">
              <ClientStaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <ClientStaggerItem>
                  <div className="glass-card p-8 rounded-xl bg-black/30 backdrop-blur-sm border border-primary-gold/10 shadow-xl h-full group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                    <div className="flex flex-col h-full">
                      <div className="mb-6 flex justify-between items-start">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-gold to-primary-gold-accent/70 flex items-center justify-center">
                          <FaHome className="text-primary-black text-2xl" />
                        </div>
                        <div className="w-20 h-1 bg-gradient-to-r from-primary-gold to-transparent self-center"></div>
                      </div>
                      
                      <h3 className="text-2xl font-cormorant text-white font-medium mb-4 group-hover:text-primary-gold transition-colors duration-300">
                        Residential Developments
                      </h3>
                      
                      <p className="text-white/80 mb-8 leading-relaxed font-montserrat text-base flex-grow">
                        Gated communities, smart estates, and green living environments designed for comfort and future growth.
                      </p>
                      
                      <Link href="/portfolio/residential" className="mt-auto">
                        <button className="w-full px-6 py-4 text-base rounded-lg font-montserrat font-medium bg-gradient-to-r from-primary-gold/10 to-primary-gold/20 text-primary-gold border border-primary-gold/30 hover:from-primary-gold/20 hover:to-primary-gold/30 transition-all duration-300 flex items-center justify-center gap-2">
                          <span>Explore Properties</span>
                          <FaArrowRight className="text-sm" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </ClientStaggerItem>

                <ClientStaggerItem>
                  <div className="glass-card p-8 rounded-xl bg-black/30 backdrop-blur-sm border border-primary-blue-light/10 shadow-xl h-full group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                    <div className="flex flex-col h-full">
                      <div className="mb-6 flex justify-between items-start">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-blue-light to-primary-blue-light/70 flex items-center justify-center">
                          <FaTrophy className="text-primary-black text-2xl" />
                        </div>
                        <div className="w-20 h-1 bg-gradient-to-r from-primary-blue-light to-transparent self-center"></div>
                      </div>
                      
                      <h3 className="text-2xl font-cormorant text-white font-medium mb-4 group-hover:text-primary-blue-light transition-colors duration-300">
                        Resort & Eco Estates
                      </h3>
                      
                      <p className="text-white/80 mb-8 leading-relaxed font-montserrat text-base flex-grow">
                        Live, relax, and thrive in beautifully integrated resort-style environments that harmonize luxury with nature's tranquility.
                      </p>
                      
                      <Link href="/portfolio/resorts" className="mt-auto">
                        <button className="w-full px-6 py-4 text-base rounded-lg font-montserrat font-medium bg-gradient-to-r from-primary-blue-light/10 to-primary-blue-light/20 text-primary-blue-light border border-primary-blue-light/30 hover:from-primary-blue-light/20 hover:to-primary-blue-light/30 transition-all duration-300 flex items-center justify-center gap-2">
                          <span>Discover Resorts</span>
                          <FaArrowRight className="text-sm" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </ClientStaggerItem>

                <ClientStaggerItem>
                  <div className="glass-card p-8 rounded-xl bg-black/30 backdrop-blur-sm border border-primary-gold/10 shadow-xl h-full group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                    <div className="flex flex-col h-full">
                      <div className="mb-6 flex justify-between items-start">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-gold to-primary-gold-accent/70 flex items-center justify-center">
                          <FaHandshake className="text-primary-black text-2xl" />
                        </div>
                        <div className="w-20 h-1 bg-gradient-to-r from-primary-gold to-transparent self-center"></div>
                      </div>
                      
                      <h3 className="text-2xl font-cormorant text-white font-medium mb-4 group-hover:text-primary-gold transition-colors duration-300">
                        Investment Advisory
                      </h3>
                      
                      <p className="text-white/80 mb-8 leading-relaxed font-montserrat text-base flex-grow">
                        We help you build generational wealth through smart, strategic property investments backed by market expertise and data-driven insights.
                      </p>
                      
                      <Link href="/services/investment" className="mt-auto">
                        <button className="w-full px-6 py-4 text-base rounded-lg font-montserrat font-medium bg-gradient-to-r from-primary-gold/10 to-primary-gold/20 text-primary-gold border border-primary-gold/30 hover:from-primary-gold/20 hover:to-primary-gold/30 transition-all duration-300 flex items-center justify-center gap-2">
                          <span>Get Started</span>
                          <FaArrowRight className="text-sm" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </ClientStaggerItem>
              </ClientStaggerContainer>
            </div>
          </ClientOnly>
        </div>
      </section>

      {/* WHY CHOOSE VISTA GRANDE SECTION - Grand & Luxurious */}
      <section className="py-32 relative overflow-hidden">
        {/* Background with similar treatment to hero */}
        <div className="absolute inset-0 z-0">
          <img
            src="/bg/bg_account.png"
            alt="Luxury background"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 1 }}
          />
          
          {/* Overlay with same gradient as hero */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary-black/70 via-primary-black/60 to-primary-black/80" style={{ zIndex: 2 }} />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-gold/5 via-transparent to-primary-blue-primary/5" style={{ zIndex: 3 }} />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ClientOnly>
            <ClientStaggerContainer className="text-center max-w-5xl mx-auto mb-16">
              <ClientStaggerItem>
                <div className="mb-12">
                  <h2 className="text-4xl sm:text-5xl md:text-6xl mb-6 leading-tight tracking-tight">
                    <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary-gold via-white/90 to-primary-gold-accent font-cormorant drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] filter-none luxury-heading-shimmer" style={{textShadow: "0 2px 4px rgba(0,0,0,0.2), 0 0 10px rgba(201,161,77,0.3)"}}>
                      Why Choose Vista Grande
                    </span>
                  </h2>
                </div>
              </ClientStaggerItem>
              
              <ClientStaggerItem>
                <ClientScrollReveal direction="up" delay={0.3}>
                  <p className="text-xl sm:text-2xl text-white/95 font-montserrat font-light tracking-wide max-w-4xl mx-auto mb-16">
                    We're not just building properties; we're creating legacies.
                  </p>
                </ClientScrollReveal>
              </ClientStaggerItem>
            </ClientStaggerContainer>

            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <ClientStaggerItem>
                  <div className="glass-card p-8 rounded-xl bg-black/30 backdrop-blur-sm border border-primary-gold/10 shadow-xl h-full group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-gold to-primary-gold-accent/70 flex items-center justify-center flex-shrink-0">
                        <FaHandshake className="text-primary-black text-2xl" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-cormorant text-white font-medium mb-4 group-hover:text-primary-gold transition-colors duration-300">
                          Integrity-Driven
                        </h3>
                        <p className="text-white/80 leading-relaxed font-montserrat text-base">
                          We deliver what we promise — no shortcuts, no surprises. Our commitment to transparency and honesty is the foundation of every relationship we build.
                        </p>
                      </div>
                    </div>
                  </div>
                </ClientStaggerItem>

                <ClientStaggerItem>
                  <div className="glass-card p-8 rounded-xl bg-black/30 backdrop-blur-sm border border-primary-blue-light/10 shadow-xl h-full group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-blue-light to-primary-blue-light/70 flex items-center justify-center flex-shrink-0">
                        <FaUsers className="text-primary-black text-2xl" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-cormorant text-white font-medium mb-4 group-hover:text-primary-blue-light transition-colors duration-300">
                          Customer-Centric
                        </h3>
                        <p className="text-white/80 leading-relaxed font-montserrat text-base">
                          You're not just a client; you're a partner. We prioritize your needs, preferences, and long-term satisfaction in every decision we make.
                        </p>
                      </div>
                    </div>
                  </div>
                </ClientStaggerItem>

                <ClientStaggerItem>
                  <div className="glass-card p-8 rounded-xl bg-black/30 backdrop-blur-sm border border-primary-blue-light/10 shadow-xl h-full group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-blue-light to-primary-blue-light/70 flex items-center justify-center flex-shrink-0">
                        <FaBuilding className="text-primary-black text-2xl" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-cormorant text-white font-medium mb-4 group-hover:text-primary-blue-light transition-colors duration-300">
                          Future-Focused
                        </h3>
                        <p className="text-white/80 leading-relaxed font-montserrat text-base">
                          From smart tech to sustainability, we build for tomorrow. Our developments anticipate future needs and incorporate innovations that stand the test of time.
                        </p>
                      </div>
                    </div>
                  </div>
                </ClientStaggerItem>

                <ClientStaggerItem>
                  <div className="glass-card p-8 rounded-xl bg-black/30 backdrop-blur-sm border border-primary-gold/10 shadow-xl h-full group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-gold to-primary-gold-accent/70 flex items-center justify-center flex-shrink-0">
                        <FaMapMarkerAlt className="text-primary-black text-2xl" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-cormorant text-white font-medium mb-4 group-hover:text-primary-gold transition-colors duration-300">
                          Local Expertise
                        </h3>
                        <p className="text-white/80 leading-relaxed font-montserrat text-base">
                          Deep roots in Lagos, Ogun, Oyo, and growing across Nigeria. Our intimate knowledge of local markets ensures you get the best locations with the highest potential.
                        </p>
                      </div>
                    </div>
                  </div>
                </ClientStaggerItem>
              </div>
            </div>
          </ClientOnly>
        </div>
      </section>

      {/* FEATURED PROPERTIES SECTION - Premium Showcase */}
      <section className="py-32 relative overflow-hidden">
        {/* Background with similar treatment to other sections */}
        <div className="absolute inset-0 z-0">
          <img
            src="/bg/properties_bg.jpg"
            alt="Luxury properties background"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 1 }}
          />
          
          {/* Overlay with same gradient as other sections */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary-black/80 via-primary-black/70 to-primary-black/90" style={{ zIndex: 2 }} />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-blue-primary/5 via-transparent to-primary-gold/5" style={{ zIndex: 3 }} />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ClientOnly>
            <ClientStaggerContainer className="text-center max-w-5xl mx-auto mb-16">
              <ClientStaggerItem>
                <div className="mb-12">
                  <h2 className="text-4xl sm:text-5xl md:text-6xl mb-6 leading-tight tracking-tight">
                    <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary-gold via-white/90 to-primary-gold-accent font-cormorant drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] filter-none luxury-heading-shimmer" style={{textShadow: "0 2px 4px rgba(0,0,0,0.2), 0 0 10px rgba(201,161,77,0.3)"}}>
                      Featured Properties
                    </span>
                  </h2>
                </div>
              </ClientStaggerItem>
              
              <ClientStaggerItem>
                <ClientScrollReveal direction="up" delay={0.3}>
                  <p className="text-xl sm:text-2xl text-white/95 font-montserrat font-light tracking-wide max-w-4xl mx-auto mb-16">
                    Discover our most exceptional properties, each carefully curated to represent the pinnacle of luxury living and investment opportunity.
                  </p>
                </ClientScrollReveal>
              </ClientStaggerItem>
            </ClientStaggerContainer>

            {/* Property Filter Tabs */}
            <div className="max-w-6xl mx-auto mb-16">
              <ClientStaggerItem>
                <div className="flex flex-wrap justify-center gap-4">
                  {['All Properties', 'Residential', 'Commercial', 'Resort & Eco', 'Investment'].map((category, index) => (
                    <button 
                      key={index}
                      className={`px-6 py-3 rounded-lg font-montserrat text-base transition-all duration-300 ${
                        index === 0 
                          ? 'bg-gradient-to-r from-primary-gold to-primary-gold-accent text-primary-black font-medium' 
                          : 'bg-black/30 backdrop-blur-sm border border-white/10 text-white/80 hover:border-primary-gold/30 hover:text-white'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </ClientStaggerItem>
            </div>

            {/* Property Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Property Card 1 */}
              <ClientStaggerItem>
                <div className="glass-card rounded-xl overflow-hidden group hover:-translate-y-2 transition-all duration-500 h-full flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src="/properties/property1.jpg" 
                      alt="Luxury Villa" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-primary-gold/90 text-primary-black px-4 py-1 rounded-full text-sm font-medium">
                      Featured
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent h-24"></div>
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-cormorant text-white font-medium group-hover:text-primary-gold transition-colors duration-300">
                        Sunset Villa
                      </h3>
                      <div className="text-primary-gold text-xl font-medium">
                        ₦75M
                      </div>
                    </div>
                    
                    <p className="text-white/70 mb-6 font-montserrat text-sm flex-grow">
                      Luxurious 5-bedroom villa with panoramic ocean views, infinity pool, and smart home technology.
                    </p>
                    
                    <div className="flex justify-between items-center text-white/60 text-sm mb-6">
                      <div className="flex items-center gap-2">
                        <FaBed />
                        <span>5 Beds</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaBath />
                        <span>6 Baths</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaRuler />
                        <span>750 sqm</span>
                      </div>
                    </div>
                    
                    <Link href="/properties/sunset-villa">
                      <button className="w-full py-3 rounded-lg bg-gradient-to-r from-primary-gold/10 to-primary-gold/20 text-primary-gold border border-primary-gold/30 hover:from-primary-gold/20 hover:to-primary-gold/30 transition-all duration-300 flex items-center justify-center gap-2">
                        <span>View Details</span>
                        <FaArrowRight className="text-sm" />
                      </button>
                    </Link>
                  </div>
                </div>
              </ClientStaggerItem>
              
              {/* Property Card 2 */}
              <ClientStaggerItem>
                <div className="glass-card rounded-xl overflow-hidden group hover:-translate-y-2 transition-all duration-500 h-full flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src="/properties/property2.jpg" 
                      alt="Azure Towers" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-primary-blue-light/90 text-white px-4 py-1 rounded-full text-sm font-medium">
                      New
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent h-24"></div>
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-cormorant text-white font-medium group-hover:text-primary-blue-light transition-colors duration-300">
                        Azure Towers
                      </h3>
                      <div className="text-primary-blue-light text-xl font-medium">
                        ₦120M
                      </div>
                    </div>
                    
                    <p className="text-white/70 mb-6 font-montserrat text-sm flex-grow">
                      Premium 3-bedroom penthouse with 360° city views, private elevator, and exclusive rooftop terrace.
                    </p>
                    
                    <div className="flex justify-between items-center text-white/60 text-sm mb-6">
                      <div className="flex items-center gap-2">
                        <FaBed />
                        <span>3 Beds</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaBath />
                        <span>4 Baths</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaRuler />
                        <span>450 sqm</span>
                      </div>
                    </div>
                    
                    <Link href="/properties/azure-towers">
                      <button className="w-full py-3 rounded-lg bg-gradient-to-r from-primary-blue-light/10 to-primary-blue-light/20 text-primary-blue-light border border-primary-blue-light/30 hover:from-primary-blue-light/20 hover:to-primary-blue-light/30 transition-all duration-300 flex items-center justify-center gap-2">
                        <span>View Details</span>
                        <FaArrowRight className="text-sm" />
                      </button>
                    </Link>
                  </div>
                </div>
              </ClientStaggerItem>
              
              {/* Property Card 3 */}
              <ClientStaggerItem>
                <div className="glass-card rounded-xl overflow-hidden group hover:-translate-y-2 transition-all duration-500 h-full flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src="/properties/property3.jpg" 
                      alt="Emerald Estate" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-green-500/90 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Eco-Friendly
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent h-24"></div>
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-cormorant text-white font-medium group-hover:text-green-400 transition-colors duration-300">
                        Emerald Estate
                      </h3>
                      <div className="text-green-400 text-xl font-medium">
                        ₦45M
                      </div>
                    </div>
                    
                    <p className="text-white/70 mb-6 font-montserrat text-sm flex-grow">
                      Sustainable 4-bedroom eco-home with solar power, rainwater harvesting, and organic garden.
                    </p>
                    
                    <div className="flex justify-between items-center text-white/60 text-sm mb-6">
                      <div className="flex items-center gap-2">
                        <FaBed />
                        <span>4 Beds</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaBath />
                        <span>3 Baths</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaRuler />
                        <span>500 sqm</span>
                      </div>
                    </div>
                    
                    <Link href="/properties/emerald-estate">
                      <button className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500/10 to-green-500/20 text-green-400 border border-green-500/30 hover:from-green-500/20 hover:to-green-500/30 transition-all duration-300 flex items-center justify-center gap-2">
                        <span>View Details</span>
                        <FaArrowRight className="text-sm" />
                      </button>
                    </Link>
                  </div>
                </div>
              </ClientStaggerItem>
            </div>
            
            {/* View All Properties Button */}
            <div className="text-center mt-16">
              <ClientStaggerItem>
                <Link href="/properties">
                  <button className="px-10 py-5 text-lg rounded-lg font-montserrat font-medium bg-gradient-to-r from-primary-gold to-primary-gold-accent text-primary-black hover:shadow-[0_0_20px_rgba(201,161,77,0.5)] transition-all duration-300 flex items-center justify-center gap-3 mx-auto">
                    <span>View All Properties</span>
                    <FaArrowRight />
                  </button>
                </Link>
              </ClientStaggerItem>
            </div>
          </ClientOnly>
        </div>
      </section>

      {/* TESTIMONIALS SECTION - Elegant & Premium */}
      <section className="py-32 relative overflow-hidden">
        {/* Background with similar treatment to other sections */}
        <div className="absolute inset-0 z-0">
          <img
            src="/bg/back_.jpeg"
            alt="Luxury background"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 1 }}
          />
          
          {/* Overlay with same gradient as other sections */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary-black/70 via-primary-black/60 to-primary-black/80" style={{ zIndex: 2 }} />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-blue-primary/5 via-transparent to-primary-gold/5" style={{ zIndex: 3 }} />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ClientOnly>
            <ClientStaggerContainer className="text-center max-w-5xl mx-auto mb-16">
              <ClientStaggerItem>
                <div className="mb-12">
                  <h2 className="text-4xl sm:text-5xl md:text-6xl mb-6 leading-tight tracking-tight">
                    <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary-gold via-white/90 to-primary-gold-accent font-cormorant drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] filter-none luxury-heading-shimmer" style={{textShadow: "0 2px 4px rgba(0,0,0,0.2), 0 0 10px rgba(201,161,77,0.3)"}}>
                      Client Testimonials
                    </span>
                  </h2>
                </div>
              </ClientStaggerItem>
              
              <ClientStaggerItem>
                <ClientScrollReveal direction="up" delay={0.3}>
                  <p className="text-xl sm:text-2xl text-white/95 font-montserrat font-light tracking-wide max-w-4xl mx-auto mb-16">
                    Hear from those who've experienced the Vista Grande difference.
                  </p>
                </ClientScrollReveal>
              </ClientStaggerItem>
            </ClientStaggerContainer>

            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <ClientStaggerItem>
                  <div className="glass-card p-10 rounded-xl bg-black/30 backdrop-blur-sm border border-primary-gold/10 shadow-xl h-full group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 relative">
                    {/* Decorative quote mark */}
                    <div className="absolute -top-6 -left-2 text-8xl text-primary-gold/20 font-serif">"</div>
                    
                    <div className="relative z-10">
                      <p className="text-xl text-white/90 font-montserrat italic leading-relaxed mb-8">
                        Investing with Vista Grande was the best decision I made for my family's future. Their attention to detail and commitment to quality is unmatched.
                      </p>
                      
                      <div className="flex items-center">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-gold to-primary-gold-accent/70 flex items-center justify-center flex-shrink-0 overflow-hidden">
                          <img src="/testimonials/person1.jpg" alt="Adewale A." className="w-full h-full object-cover opacity-80" />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-lg font-cormorant text-primary-gold font-medium">
                            Adewale A.
                          </h4>
                          <p className="text-white/70 text-sm">
                            Ibadan
                          </p>
                        </div>
                        <div className="ml-auto flex">
                          <FaStar className="text-primary-gold" />
                          <FaStar className="text-primary-gold" />
                          <FaStar className="text-primary-gold" />
                          <FaStar className="text-primary-gold" />
                          <FaStar className="text-primary-gold" />
                        </div>
                      </div>
                    </div>
                  </div>
                </ClientStaggerItem>

                <ClientStaggerItem>
                  <div className="glass-card p-10 rounded-xl bg-black/30 backdrop-blur-sm border border-primary-blue-light/10 shadow-xl h-full group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 relative">
                    {/* Decorative quote mark */}
                    <div className="absolute -top-6 -left-2 text-8xl text-primary-blue-light/20 font-serif">"</div>
                    
                    <div className="relative z-10">
                      <p className="text-xl text-white/90 font-montserrat italic leading-relaxed mb-8">
                        They're not just developers. They're visionaries. Vista Grande has transformed how I think about property investment in Nigeria.
                      </p>
                      
                      <div className="flex items-center">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-blue-light to-primary-blue-light/70 flex items-center justify-center flex-shrink-0 overflow-hidden">
                          <img src="/testimonials/person2.jpg" alt="Ifeoma O." className="w-full h-full object-cover opacity-80" />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-lg font-cormorant text-primary-blue-light font-medium">
                            Ifeoma O.
                          </h4>
                          <p className="text-white/70 text-sm">
                            Lekki
                          </p>
                        </div>
                        <div className="ml-auto flex">
                          <FaStar className="text-primary-blue-light" />
                          <FaStar className="text-primary-blue-light" />
                          <FaStar className="text-primary-blue-light" />
                          <FaStar className="text-primary-blue-light" />
                          <FaStar className="text-primary-blue-light" />
                        </div>
                      </div>
                    </div>
                  </div>
                </ClientStaggerItem>
              </div>
              
              {/* View more testimonials button */}
              <div className="text-center mt-12">
                <ClientStaggerItem>
                  <Link href="/testimonials">
                    <button className="px-8 py-4 text-base rounded-lg font-montserrat font-medium bg-gradient-to-r from-primary-gold/10 to-primary-gold/20 text-primary-gold border border-primary-gold/30 hover:from-primary-gold/20 hover:to-primary-gold/30 transition-all duration-300 flex items-center justify-center gap-2 mx-auto">
                      <span>View More Testimonials</span>
                      <FaArrowRight className="text-sm" />
                    </button>
                  </Link>
                </ClientStaggerItem>
              </div>
            </div>
          </ClientOnly>
        </div>
      </section>
      
      {/* CALL TO ACTION SECTION - Bold & Premium */}
      <section className="py-24 relative overflow-hidden">
        {/* Background with similar treatment to other sections */}
        <div className="absolute inset-0 z-0">
          <img
            src="/bg/datebg.jpg"
            alt="Luxury background"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 1 }}
          />
          
          {/* Overlay with same gradient as other sections */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary-black/70 via-primary-black/60 to-primary-black/80" style={{ zIndex: 2 }} />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-gold/10 via-transparent to-primary-blue-primary/10" style={{ zIndex: 3 }} />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ClientOnly>
            <div className="max-w-5xl mx-auto">
              <ClientStaggerContainer className="glass-card p-12 md:p-16 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl text-center">
                <ClientStaggerItem>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6 leading-tight tracking-tight font-cormorant">
                    <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary-gold via-white/90 to-primary-gold-accent drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] filter-none luxury-heading-shimmer" style={{textShadow: "0 2px 4px rgba(0,0,0,0.2), 0 0 10px rgba(201,161,77,0.3)"}}>
                      Ready to Own a Piece of the Future?
                    </span>
                  </h2>
                </ClientStaggerItem>
                
                <ClientStaggerItem>
                  <ClientScrollReveal direction="up" delay={0.3}>
                    <p className="text-xl text-white/95 font-montserrat font-light tracking-wide max-w-3xl mx-auto mb-12">
                      Explore our listings, schedule a site visit, or talk to an advisor today. Your journey to premium property ownership begins here.
                    </p>
                  </ClientScrollReveal>
                </ClientStaggerItem>
                
                <ClientStaggerItem>
                  <div className="flex flex-wrap justify-center gap-6">
                    <Link href="/properties">
                      <button className="px-8 py-5 text-base rounded-lg font-montserrat font-medium bg-gradient-to-r from-primary-gold to-primary-gold-accent text-primary-black hover:shadow-[0_0_20px_rgba(201,161,77,0.5)] transition-all duration-300 flex items-center justify-center gap-2">
                        <span>Explore Properties</span>
                        <FaArrowRight className="text-sm" />
                      </button>
                    </Link>
                    
                    <Link href="/contact">
                      <button className="px-8 py-5 text-base rounded-lg font-montserrat font-medium bg-transparent text-white border-2 border-white/30 hover:border-white/60 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2">
                        <span>Schedule a Visit</span>
                        <FaMapMarkerAlt className="text-sm" />
                      </button>
                    </Link>
                    
                    <Link href="/investment">
                      <button className="px-8 py-5 text-base rounded-lg font-montserrat font-medium bg-transparent text-primary-blue-light border-2 border-primary-blue-light/30 hover:border-primary-blue-light/60 hover:bg-primary-blue-light/10 transition-all duration-300 flex items-center justify-center gap-2">
                        <span>Talk to an Advisor</span>
                        <FaPhone className="text-sm" />
                      </button>
                    </Link>
                  </div>
                </ClientStaggerItem>
              </ClientStaggerContainer>
            </div>
          </ClientOnly>
        </div>
      </section>
    </>
  )
}