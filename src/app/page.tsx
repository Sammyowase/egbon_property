'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import MotionBackground from '@/components/MotionBackground'
import HeroBackgroundCarousel from '@/components/ui/HeroBackgroundCarousel'
import CategoryHeroCarousel from '@/components/ui/CategoryHeroCarousel'
import PropertyShowcase from '@/components/ui/PropertyShowcase'
import { fallbackHeroImages, heroImages, getRandomHeroImages } from '@/data/heroImages'
// Optimized imports - only import what's actually used
import { FaSearch, FaHome, FaHandshake, FaTrophy, FaUsers, FaHeart, FaStar, FaPlay, FaChevronRight, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'
import { PropertyLoadingSpinner, MinimalLoadingSpinner } from '@/components/ui/LuxuryLoadingSpinner'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

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
      <MotionBackground />
      <EnhancedBackground />
      
      {/* HERO SECTION - Ultra Premium Cinematic Experience */}
      <motion.section
        className="min-h-screen flex items-center relative pt-32 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        {/* Hero Background Carousel - Direct Implementation */}
        <div className="absolute inset-0 z-0">
          {/* Slide Counter */}
          <div className="absolute top-4 right-4 bg-primary-gold text-primary-black px-3 py-1 rounded text-sm font-semibold z-50">
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

        {/* Enhanced Floating Geometric Elements */}
        <div className="absolute inset-0 pointer-events-none z-5">
          <motion.div 
            className="absolute top-20 left-10 w-32 h-32 border border-primary-gold/20"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
          <motion.div 
            className="absolute bottom-20 right-10 w-24 h-24 border border-primary-blue-light/20"
            animate={{ 
              rotate: [0, -360],
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary-gold/10 rounded-full"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          
          {/* Additional Floating Elements */}
          <motion.div 
            className="absolute top-1/3 right-1/3 w-20 h-20 border-2 border-primary-blue-light/15 rounded-full"
            animate={{ 
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
          <motion.div 
            className="absolute bottom-1/3 left-1/2 w-12 h-12 bg-gradient-to-br from-primary-gold/20 to-primary-blue-light/15 rounded-full"
            animate={{ 
              y: [0, -30, 0],
              x: [0, 15, 0],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        </div>

        <BackgroundParticles />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <StaggerContainer className="text-center max-w-5xl mx-auto">
            <StaggerItem>
              <motion.div
                className="mb-8"
                animate={magneticEffect}
              >
                <FloatingElement duration={6} amplitude={8}>
                  <h1 className="heading-hero mb-6 luxury-gradient-mixed font-luxury">
                    Where Vision Meets Value
                  </h1>
                </FloatingElement>
              </motion.div>
            </StaggerItem>

            <StaggerItem>
              <ScrollReveal direction="up" delay={0.3}>
                <motion.p 
                  className="text-2xl md:text-3xl text-white/95 mb-6 font-light"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  Transforming Spaces. Elevating Lifestyles. Building Tomorrow.
                </motion.p>
              </ScrollReveal>
            </StaggerItem>

            <StaggerItem>
              <ScrollReveal direction="up" delay={0.5}>
                <motion.p 
                  className="body-luxury text-white/85 mb-10 max-w-4xl mx-auto leading-relaxed"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.3 }}
                >
                  Vista Grande Realty LTD is a next-generation real estate company dedicated to creating vibrant, livable, and sustainable communities across Nigeria, starting from the heart of Ibadan. We blend innovation with tradition to deliver exceptional value.
                </motion.p>
              </ScrollReveal>
            </StaggerItem>

            <StaggerItem>
              <ScrollReveal direction="up" delay={0.7}>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link href="/portfolio/property">
                    <motion.button
                      className="btn-magnetic px-10 py-5 text-lg rounded-xl font-semibold bg-gradient-to-r from-primary-gold to-primary-gold-accent text-primary-black shadow-2xl glow-gold-intense relative overflow-hidden group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        <FaSearch />
                        Explore Properties
                        <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-gold-accent to-primary-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.button>
                  </Link>
                  <Link href="/contact">
                    <motion.button
                      className="btn-magnetic px-10 py-5 text-lg rounded-xl font-semibold border-2 border-primary-blue-light text-primary-blue-light hover:bg-primary-blue-light hover:text-white transition-all duration-300 glow-blue-intense relative overflow-hidden group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        <FaPhone />
                        Get in Touch
                        <FaEnvelope className="group-hover:rotate-12 transition-transform" />
                      </span>
                    </motion.button>
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

      {/* SERVICES SECTION - Enhanced with Glass Morphism */}
      <ParallaxSection className="py-24 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" className="text-center mb-20">
            <motion.h2 
              className="heading-display text-center mb-8 luxury-gradient-text"
              whileHover={{ scale: 1.02 }}
            >
              What We Offer
            </motion.h2>
            <motion.p 
              className="body-luxury text-white/90 max-w-4xl mx-auto"
              whileHover={{ y: -2 }}
            >
              We combine local insight with global standards to deliver premium residential, commercial, and investment properties that stand the test of time. Our comprehensive approach ensures every project exceeds expectations.
            </motion.p>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <StaggerItem>
              <motion.div
                className="glass-morphism-gold p-10 text-center h-full rounded-2xl card-3d group"
                variants={cardHover}
                initial="rest"
                whileHover="hover"
              >
                <FloatingElement duration={4} amplitude={4}>
                  <motion.div
                    className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary-gold/30 to-primary-gold/10 flex items-center justify-center relative overflow-hidden"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <FaHome className="text-primary-gold text-3xl relative z-10" />
                    <div className="absolute inset-0 bg-primary-gold/20 rounded-full animate-pulse-glow" />
                  </motion.div>
                </FloatingElement>
                <h3 className="text-2xl font-bold text-white mb-6 group-hover:luxury-gradient-text transition-all duration-300">
                  Premium Developments
                </h3>
                <p className="text-white/80 mb-8 leading-relaxed">
                  Luxury residential and commercial developments that redefine modern living with world-class amenities and architectural excellence.
                </p>
                <motion.button 
                  className="btn-magnetic px-6 py-3 text-sm rounded-lg text-primary-gold border border-primary-gold/30 hover:bg-primary-gold/10 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Projects
                </motion.button>
              </motion.div>
            </StaggerItem>

            <StaggerItem>
              <motion.div
                className="glass-morphism-blue p-10 text-center h-full rounded-2xl card-3d group"
                variants={cardHover}
                initial="rest"
                whileHover="hover"
              >
                <FloatingElement duration={5} amplitude={4} delay={0.5}>
                  <motion.div
                    className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary-blue-light/30 to-primary-blue-light/10 flex items-center justify-center relative overflow-hidden"
                    whileHover={{ rotate: -360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <FaTrophy className="text-primary-blue-light text-3xl relative z-10" />
                    <div className="absolute inset-0 bg-primary-blue-light/20 rounded-full animate-pulse-glow" />
                  </motion.div>
                </FloatingElement>
                <h3 className="text-2xl font-bold text-white mb-6 group-hover:luxury-gradient-blue transition-all duration-300">
                  Resort & Eco Estates
                </h3>
                <p className="text-white/80 mb-8 leading-relaxed">
                  Live, relax, and thrive in beautifully integrated resort-style environments that harmonize luxury with nature's tranquility.
                </p>
                <motion.button 
                  className="btn-magnetic px-6 py-3 text-sm rounded-lg text-primary-blue-light border border-primary-blue-light/30 hover:bg-primary-blue-light/10 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Discover More
                </motion.button>
              </motion.div>
            </StaggerItem>

            <StaggerItem>
              <motion.div
                className="glass-morphism-gold p-10 text-center h-full rounded-2xl card-3d group"
                variants={cardHover}
                initial="rest"
                whileHover="hover"
              >
                <FloatingElement duration={4.5} amplitude={4} delay={1}>
                  <motion.div
                    className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary-gold/30 to-primary-blue-light/20 flex items-center justify-center relative overflow-hidden"
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.8 }}
                  >
                    <FaHandshake className="text-primary-gold text-3xl relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-gold/20 to-primary-blue-light/20 rounded-full animate-pulse-glow" />
                  </motion.div>
                </FloatingElement>
                <h3 className="text-2xl font-bold text-white mb-6 group-hover:luxury-gradient-mixed transition-all duration-300">
                  Investment Advisory
                </h3>
                <p className="text-white/80 mb-8 leading-relaxed">
                  We help you build generational wealth through smart, strategic property investments backed by market expertise and data-driven insights.
                </p>
                <motion.button 
                  className="btn-magnetic px-6 py-3 text-sm rounded-lg text-primary-gold border border-primary-gold/30 hover:bg-primary-gold/10 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              </motion.div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </ParallaxSection>

      {/* STATS SECTION - Enhanced with Color Coding */}
      <motion.section
        className="py-20 relative overflow-hidden"
        variants={staggerChildren}
        initial="initial"
        animate="animate"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary-gold/10 to-primary-blue-light/10" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className={`glass-morphism-${stat.color === 'gold' ? 'gold' : 'blue'} text-center p-8 rounded-2xl card-3d group`}
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className={`text-${stat.color === 'gold' ? 'primary-gold' : 'primary-blue-light'} text-5xl mb-6 flex justify-center`}
                  whileHover={{ scale: 1.3, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {stat.icon}
                </motion.div>
                <div className="text-4xl font-bold text-white mb-3">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    duration={2.5 + index * 0.3}
                  />
                </div>
                <div className="text-white/70 text-luxury-sm font-medium">{stat.label}</div>
                
                {/* Animated Progress Bar */}
                <motion.div
                  className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 1, duration: 1 }}
                >
                  <motion.div
                    className={`h-full bg-gradient-to-r ${stat.color === 'gold' ? 'from-primary-gold to-primary-gold-accent' : 'from-primary-blue-light to-primary-blue-accent'}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    style={{ transformOrigin: 'left' }}
                    transition={{ delay: index * 0.2 + 1.5, duration: 1.5 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ENHANCED PROPERTY SHOWCASE - Dynamic Category-Based Display */}
      <PropertyShowcase
        title="Featured Properties"
        subtitle="Discover our most exceptional properties, each carefully curated to represent the pinnacle of luxury living and investment opportunity."
        showFilters={true}
        maxProperties={6}
        className="bg-gradient-to-b from-primary-black/95 to-primary-black-light/95"
      />

      {/* VIRTUAL TOUR SECTION - Enhanced Interactive Experience */}
      <ParallaxSection className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="heading-display mb-8 luxury-gradient-mixed">
                  Experience Properties in Virtual Reality
                </h2>
                <p className="body-luxury text-white/90 mb-10 leading-relaxed">
                  Take an immersive virtual tour of our luxury properties from the comfort of your home. Experience every detail in stunning 360° clarity with our cutting-edge VR technology.
                </p>

                <StaggerContainer className="space-y-8 mb-10">
                  <StaggerItem>
                    <motion.div 
                      className="flex items-center gap-6 text-white/70 group"
                      whileHover={{ x: 10 }}
                    >
                      <FloatingElement duration={3} amplitude={3}>
                        <div className="w-16 h-16 rounded-full glass-morphism-gold flex items-center justify-center text-primary-gold group-hover:glow-gold-intense transition-all duration-300">
                          <FaHome className="text-xl" />
                        </div>
                      </FloatingElement>
                      <div>
                        <h3 className="font-bold text-white text-lg mb-2">360° Immersive Tours</h3>
                        <p className="text-white/70">Explore every room in photorealistic detail with smooth navigation</p>
                      </div>
                    </motion.div>
                  </StaggerItem>

                  <StaggerItem>
                    <motion.div 
                      className="flex items-center gap-6 text-white/70 group"
                      whileHover={{ x: 10 }}
                    >
                      <FloatingElement duration={3.5} amplitude={3} delay={0.5}>
                        <div className="w-16 h-16 rounded-full glass-morphism-blue flex items-center justify-center text-primary-blue-light group-hover:glow-blue-intense transition-all duration-300">
                          <FaSearch className="text-xl" />
                        </div>
                      </FloatingElement>
                      <div>
                        <h3 className="font-bold text-white text-lg mb-2">Interactive Hotspots</h3>
                        <p className="text-white/70">Click on hotspots for detailed information and specifications</p>
                      </div>
                    </motion.div>
                  </StaggerItem>

                  <StaggerItem>
                    <motion.div 
                      className="flex items-center gap-6 text-white/70 group"
                      whileHover={{ x: 10 }}
                    >
                      <FloatingElement duration={4} amplitude={3} delay={1}>
                        <div className="w-16 h-16 rounded-full glass-morphism-gold flex items-center justify-center text-primary-gold group-hover:glow-gold-intense transition-all duration-300">
                          <FaTrophy className="text-xl" />
                        </div>
                      </FloatingElement>
                      <div>
                        <h3 className="font-bold text-white text-lg mb-2">Premium Experience</h3>
                        <p className="text-white/70">High-quality visuals with smooth, lag-free navigation</p>
                      </div>
                    </motion.div>
                  </StaggerItem>
                </StaggerContainer>

                <div className="flex flex-col sm:flex-row gap-6">
                  <VirtualTourButton
                    property={{
                      id: 'vt-1',
                      title: 'Luxury Estate Villa',
                      location: 'Lekki, Lagos',
                      price: '₦85,000,000',
                      size: '450 sqm',
                      image: '/properties/luxury-villa.jpg',
                      description: 'Stunning luxury villa with modern amenities and breathtaking views',
                      features: ['Swimming Pool', 'Garden', 'Garage', '4 Bedrooms', '3 Bathrooms'],
                      amenities: ['24/7 Security', 'Power Supply', 'Water Supply', 'Internet'],
                      gallery: ['/properties/luxury-villa.jpg', '/properties/villa-2.jpg'],
                      status: 'Available',
                      documents: ['Title Document', 'Survey Plan'],
                      phoneNumber: '+234-XXX-XXX-XXXX'
                    }}
                    tourType="360"
                    variant="primary"
                  />
                  <VirtualTourButton
                    property={{
                      id: 'vt-2',
                      title: 'Modern Apartment',
                      location: 'Victoria Island, Lagos',
                      price: '₦45,000,000',
                      size: '180 sqm',
                      image: '/properties/modern-apartment.jpg',
                      description: 'Contemporary apartment with city views and premium finishes',
                      features: ['Balcony', 'Fitted Kitchen', '3 Bedrooms', '2 Bathrooms'],
                      amenities: ['Gym', 'Swimming Pool', 'Elevator', 'Parking'],
                      gallery: ['/properties/modern-apartment.jpg', '/properties/apartment-2.jpg'],
                      status: 'Available',
                      documents: ['Certificate of Occupancy', 'Building Plan'],
                      phoneNumber: '+234-XXX-XXX-XXXX'
                    }}
                    tourType="video"
                    variant="secondary"
                  />
                </div>
              </motion.div>
            </ScrollReveal>

            <motion.div
              className="relative h-[500px] rounded-2xl overflow-hidden glass-morphism group"
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-gold/20 via-transparent to-primary-blue-light/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    className="w-24 h-24 rounded-full glass-morphism-gold flex items-center justify-center text-primary-gold text-5xl mx-auto mb-6 glow-gold-intense cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      boxShadow: "0 0 20px rgba(212, 175, 55, 0.3)"
                    }}
                  >
                    <FaPlay />
                  </motion.div>
                  <p className="text-white font-bold text-xl mb-2">Watch Demo Tour</p>
                  <p className="text-white/60">Experience luxury living in VR</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </ParallaxSection>

      {/* WHY CHOOSE US SECTION - Premium Cards */}
      <motion.section
        className="py-24 relative"
        variants={staggerChildren}
        initial="initial"
        animate="animate"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-20" variants={fadeInUp}>
            <h2 className="heading-display mb-8 luxury-gradient-text">
              Why Choose Vista Grande
            </h2>
            <p className="body-luxury text-white/90 max-w-4xl mx-auto">
              We don't just sell properties; we craft experiences, build relationships, and create lasting value for our clients through unparalleled expertise and dedication.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <motion.div
              className="glass-morphism-gold p-10 rounded-2xl text-center card-3d group relative overflow-hidden"
              variants={cardHover}
              initial="rest"
              whileHover="hover"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-gold/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
              <motion.div 
                className="text-primary-gold text-6xl mb-8 mx-auto relative z-10"
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.8 }}
              >
                <FaTrophy />
              </motion.div>
              <h3 className="text-2xl font-bold mb-6 text-white group-hover:luxury-gradient-text transition-all duration-300">
                Premium Properties
              </h3>
              <p className="text-white/70 leading-relaxed relative z-10">
                Access to exclusive luxury properties in prime locations, carefully curated for discerning buyers who demand nothing but the finest.
              </p>
            </motion.div>

            <motion.div
              className="glass-morphism-blue p-10 rounded-2xl text-center card-3d group relative overflow-hidden"
              variants={cardHover}
              initial="rest"
              whileHover="hover"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-blue-light/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
              <motion.div 
                className="text-primary-blue-light text-6xl mb-8 mx-auto relative z-10"
                whileHover={{ rotate: -360, scale: 1.2 }}
                transition={{ duration: 0.8 }}
              >
                <FaHandshake />
              </motion.div>
              <h3 className="text-2xl font-bold mb-6 text-white group-hover:luxury-gradient-blue transition-all duration-300">
                Expert Guidance
              </h3>
              <p className="text-white/70 leading-relaxed relative z-10">
                Our experienced team provides personalized service and expert advice throughout your property journey, ensuring informed decisions.
              </p>
            </motion.div>

            <motion.div
              className="glass-morphism-gold p-10 rounded-2xl text-center card-3d group relative overflow-hidden"
              variants={cardHover}
              initial="rest"
              whileHover="hover"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-gold/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
              <motion.div 
                className="text-primary-gold text-6xl mb-8 mx-auto relative z-10"
                whileHover={{ rotate: 180, scale: 1.2 }}
                transition={{ duration: 0.8 }}
              >
                <FaUsers />
              </motion.div>
              <h3 className="text-2xl font-bold mb-6 text-white group-hover:luxury-gradient-mixed transition-all duration-300">
                Client Satisfaction
              </h3>
              <p className="text-white/70 leading-relaxed relative z-10">
                Our track record of satisfied clients and successful transactions speaks to our unwavering commitment to excellence and integrity.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* INTERACTIVE MAP SECTION - Enhanced */}
      <motion.section 
        className="py-24 bg-gradient-to-b from-primary-black/95 to-primary-black-light/95"
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
            variants={staggerChildren}
          >
            <div>
              <motion.h2 
                className="heading-display mb-8 luxury-gradient-blue"
                variants={fadeInUp}
              >
                Find Properties in Prime Locations
              </motion.h2>
              <motion.p 
                className="body-luxury text-white/90 mb-10"
                variants={fadeInUp}
              >
                Explore our interactive map to discover premium properties in the most sought-after neighborhoods. From beachfront villas to urban penthouses, find your perfect location with precision and ease.
              </motion.p>
              
              <motion.div
                className="space-y-6"
                variants={staggerChildren}
              >
                <StaggerItem>
                  <motion.div 
                    className="flex items-center gap-6 text-white/70 group"
                    whileHover={{ x: 10 }}
                  >
                    <div className="w-16 h-16 rounded-full glass-morphism-gold flex items-center justify-center text-primary-gold group-hover:glow-gold-intense transition-all duration-300">
                      <FaHome className="text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg mb-2">Premium Locations</h3>
                      <p className="text-white/70">Properties in the most desirable and rapidly appreciating areas</p>
                    </div>
                  </motion.div>
                </StaggerItem>

                <StaggerItem>
                  <motion.div 
                    className="flex items-center gap-6 text-white/70 group"
                    whileHover={{ x: 10 }}
                  >
                    <div className="w-16 h-16 rounded-full glass-morphism-blue flex items-center justify-center text-primary-blue-light group-hover:glow-blue-intense transition-all duration-300">
                      <FaSearch className="text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg mb-2">Smart Search</h3>
                      <p className="text-white/70">Advanced filtering by location, price, amenities, and investment potential</p>
                    </div>
                  </motion.div>
                </StaggerItem>
              </motion.div>
            </div>

            <motion.div
              className="relative h-[500px] rounded-2xl overflow-hidden glass-morphism"
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
            >
              <PropertyMap properties={mapProperties} />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-primary-black/20 via-transparent to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* TESTIMONIALS SECTION - Premium Carousel */}
      <motion.section
        className="py-24"
        variants={staggerChildren}
        initial="initial"
        animate="animate"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-20" variants={fadeInUp}>
            <h2 className="heading-display mb-8 luxury-gradient-text">
              What Our Clients Say
            </h2>
            <p className="body-luxury text-white/90 max-w-3xl mx-auto">
              Don't just take our word for it. Hear from our satisfied clients who have experienced the Vista Grande difference firsthand.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="glass-morphism p-8 rounded-2xl card-3d group relative overflow-hidden"
                variants={cardHover}
                initial="rest"
                whileHover="hover"
              >
                <div className="absolute top-0 left-0 w-20 h-20 bg-primary-gold/5 rounded-full -translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700" />
                
                {/* Rating Stars */}
                <div className="flex text-primary-gold mb-6 relative z-10">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <FaStar />
                    </motion.div>
                  ))}
                </div>

                <motion.p 
                  className="text-white/90 mb-8 italic text-lg leading-relaxed relative z-10"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  "{testimonial.text}"
                </motion.p>

                <motion.div
                  className="flex items-center gap-4 relative z-10"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-gold/30 to-primary-blue-light/30 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-primary-gold font-bold text-lg">{testimonial.author}</p>
                    <p className="text-white/70">{testimonial.position}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* NEWSLETTER SECTION - Ultra Premium */}
      <motion.section 
        className="py-24 bg-gradient-to-b from-primary-black/95 to-primary-black-light/95 relative overflow-hidden"
        variants={fadeInUp}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 border border-primary-gold/30 rounded-full animate-pulse-glow" />
          <div className="absolute bottom-20 right-20 w-32 h-32 border border-primary-blue-light/30 rounded-full animate-bounce-subtle" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center p-12 rounded-3xl glass-morphism relative overflow-hidden"
            whileHover={{
              boxShadow: "0 0 60px rgba(212, 175, 55, 0.2)",
              transition: { duration: 0.3 }
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-gold/5 via-transparent to-primary-blue-light/5" />
            
            <motion.h2 
              className="heading-display mb-8 luxury-gradient-mixed relative z-10"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Stay Updated with Vista Grande
            </motion.h2>
            
            <motion.p 
              className="body-luxury text-white/90 mb-12 relative z-10"
              whileHover={{ y: -2 }}
            >
              Subscribe to our exclusive newsletter for premium property listings, market insights, investment opportunities, and insider access to our most coveted developments.
            </motion.p>

            <form onSubmit={handleSubscribe} className="relative z-10">
              <motion.div 
                className="flex flex-col sm:flex-row gap-6 max-w-2xl mx-auto"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex-1">
                  <motion.input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full glass-morphism-gold border border-primary-gold/30 rounded-xl p-4 text-white placeholder-white/50 focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all duration-300 text-lg"
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    whileFocus={{ scale: 1.02 }}
                  />
                  <p className="text-sm text-white/60 mt-3 text-left">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </div>
                
                <motion.button 
                  type="submit"
                  className="btn-magnetic px-10 py-4 text-lg rounded-xl font-semibold bg-gradient-to-r from-primary-gold to-primary-gold-accent text-primary-black glow-gold-intense relative overflow-hidden group whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isSubscribing}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {isSubscribing ? (
                      <>
                        <MinimalLoadingSpinner size="sm" />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        <FaEnvelope />
                        Subscribe Now
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-gold-accent to-primary-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </motion.div>

              {/* Success/Error Messages */}
              {subscriptionStatus === 'success' && (
                <motion.div
                  className="mt-6 p-4 rounded-xl glass-morphism-gold text-primary-gold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ✓ Successfully subscribed! Welcome to Vista Grande's exclusive community.
                </motion.div>
              )}
              
              {subscriptionStatus === 'error' && (
                <motion.div
                  className="mt-6 p-4 rounded-xl glass-morphism-blue text-red-400"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ✗ Something went wrong. Please try again.
                </motion.div>
              )}
            </form>

            {/* Trust Indicators */}
            <motion.div 
              className="flex flex-wrap justify-center items-center gap-8 mt-12 text-white/60 relative z-10"
              variants={staggerChildren}
            >
              <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.1 }}>
                <FaUsers className="text-primary-gold" />
                <span className="text-sm">10,000+ Subscribers</span>
              </motion.div>
              <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.1 }}>
                <FaTrophy className="text-primary-blue-light" />
                <span className="text-sm">Premium Content</span>
              </motion.div>
              <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.1 }}>
                <FaHeart className="text-primary-gold" />
                <span className="text-sm">No Spam Promise</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </>
  )
}