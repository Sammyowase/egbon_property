'use client'

import { motion } from 'framer-motion'
import MotionBackground from '@/components/MotionBackground'
import { FaBed, FaBath, FaRuler, FaSearch, FaHome, FaHandshake, FaTrophy, FaUsers, FaRegHeart, FaHeart, FaShareAlt } from 'react-icons/fa'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import PropertyMap from '@/components/PropertyMap'

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [likedProperties, setLikedProperties] = useState<Set<number>>(new Set());
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredProperty, setHoveredProperty] = useState<number | null>(null);

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
    }, 6000); // Changed from 3000 to 6000 (6 seconds)

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { icon: <FaHome />, value: '500+', label: 'Properties Sold' },
    { icon: <FaHandshake />, value: '1000+', label: 'Happy Clients' },
    { icon: <FaTrophy />, value: '10+', label: 'Years Experience' },
    { icon: <FaUsers />, value: '50+', label: 'Expert Agents' },
  ]

  const portfolioCategories = [
    { id: 'all', label: 'All Portfolios' },
    { id: 'land', label: 'Land Development' },
    { id: 'construction', label: 'Construction' },
    { id: 'agriculture', label: 'Agriculture' },
    { id: 'farmland', label: 'Farm Land' }
  ];

  const featuredPortfolios = [
    {
      title: 'Premium Land Development',
      location: 'Mowe Ibafo, OG',
      price: '₦5,900,000',
      size: '1,200',
      image: '/images/property1.jpg',
      category: 'land',
      highlights: ['Ready to Build', 'Prime Location', 'Verified Documents'],
      description: 'Premium plots perfect for residential or commercial development.',
      link: '/portfolio/land-development'
    },
    {
      title: 'Modern Housing Construction',
      location: 'Epe, LA',
      price: '₦8,500,000',
      size: '2,500',
      image: '/images/property2.jpg',
      category: 'construction',
      highlights: ['Turnkey Project', 'Modern Design', 'Quality Materials'],
      description: 'State-of-the-art construction projects with modern amenities.',
      link: '/portfolio/construction'
    },
    {
      title: 'Agricultural Investment',
      location: 'Simawa, OG',
      price: '₦12,900,000',
      size: '5,000',
      image: '/images/property3.jpg',
      category: 'agriculture',
      highlights: ['High Yield', 'Irrigation System', 'Storage Facility'],
      description: 'Agricultural projects with modern farming infrastructure.',
      link: '/portfolio/agriculture'
    },
    {
      title: 'Farm Land Investment',
      location: 'Ikorodu, LA',
      price: '₦15,500,000',
      size: '10,000',
      image: '/images/property4.jpg',
      category: 'farmland',
      highlights: ['Fertile Soil', 'Water Access', 'Road Network'],
      description: 'Large farm lands ideal for agricultural development.',
      link: '/portfolio/farm-land'
    },
    {
      title: 'Mixed-Use Development',
      location: 'Imota, LA',
      price: '₦7,200,000',
      size: '3,000',
      image: '/images/property5.jpg',
      category: 'land',
      highlights: ['Commercial Zone', 'Residential Area', 'Infrastructure'],
      description: 'Strategic mixed-use development opportunities.',
      link: '/portfolio/land-development'
    },
    {
      title: 'Eco-Friendly Farm Project',
      location: 'Ikeja, LA',
      price: '₦16,800,000',
      size: '8,000',
      image: '/images/property6.jpg',
      category: 'agriculture',
      highlights: ['Organic Farming', 'Sustainable', 'Tech-Enabled'],
      description: 'Sustainable agricultural projects with modern technology.',
      link: '/portfolio/agriculture'
    }
  ];

  const testimonials = [
    {
      text: "Working with this luxury real estate team was an absolute pleasure. They found us our dream home!",
      author: "Samuel Owase",
      position: "CEO, Tech Solutions Inc."
    },
    {
      text: "The attention to detail and professionalism exceeded our expectations. Highly recommended!",
      author: "Okiki Yusuf",
      position: "Investment Banker"
    },
    {
      text: "Their expertise in luxury properties is unmatched. They made the process seamless.",
      author: "Yusuf Subomi",
      position: "Interior Designer"
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

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerChildren = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: {
      staggerChildren: 0.2
    }
  };

  const cardHover = {
    rest: {
      scale: 1,
      boxShadow: "0 4px 6px rgba(212, 175, 55, 0.1)",
      transition: {
        duration: 0.2,
        type: "tween",
        ease: "easeIn"
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 20px rgba(212, 175, 55, 0.2)",
      transition: {
        duration: 0.2,
        type: "tween",
        ease: "easeOut"
      }
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    setSubscriptionStatus('idle');

    try {
      // Add your newsletter subscription API call here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
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
      
      {/* Hero Section */}
      <motion.section 
        className="min-h-screen flex items-center relative pt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient">
              Discover Your Luxury Dream Home
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Experience the finest properties with unparalleled service and expertise
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/portfolio/property" className="btn-primary">
                View Properties
              </Link>
              <Link href="/contact" className="btn-outline">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

     
           

      {/* Stats Section */}
      <motion.section 
        className="py-16"
        variants={staggerChildren}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className="text-center p-6 rounded-lg bg-primary-black/50 border border-primary-gold/20"
              >
                <motion.div 
                  className="text-primary-gold text-4xl mb-4"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {stat.icon}
                </motion.div>
                <motion.div 
                  className="text-3xl font-bold text-white mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Portfolio */}
      <motion.section 
        className="py-16 bg-primary-black/95"
        variants={staggerChildren}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-gradient text-center"
            variants={fadeInUp}
          >
            Featured Portfolio
          </motion.h2>

          {/* Category Filter */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            variants={staggerChildren}
          >
            {portfolioCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full border-2 transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'border-primary-gold bg-primary-gold/20 text-white'
                    : 'border-primary-gold/30 hover:border-primary-gold/60 text-white/70 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Portfolio Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerChildren}
          >
            {filteredPortfolios.map((portfolio, index) => (
              <motion.div
                key={index}
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                className="bg-primary-black/50 rounded-lg overflow-hidden border border-primary-gold/20 group"
                onHoverStart={() => setHoveredProperty(index)}
                onHoverEnd={() => setHoveredProperty(null)}
              >
                <div className="relative">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={portfolio.image}
                      alt={portfolio.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>
                  
                  {/* Portfolio Actions */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <motion.button
                      onClick={() => toggleLike(index)}
                      className="p-2 rounded-full bg-black/50 text-white hover:bg-primary-gold/20 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {likedProperties.has(index) ? (
                        <FaHeart className="text-primary-gold" />
                      ) : (
                        <FaRegHeart />
                      )}
                    </motion.button>
                    <motion.button
                      className="p-2 rounded-full bg-black/50 text-white hover:bg-primary-gold/20 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaShareAlt />
                    </motion.button>
                  </div>

                  {/* Price Tag */}
                  <div className="absolute bottom-4 left-4">
                    <p className="text-primary-gold font-bold text-xl">{portfolio.price}</p>
                    <p className="text-white/90">{portfolio.location}</p>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-primary-gold transition-colors">
                    {portfolio.title}
                  </h3>
                  
                  {/* Portfolio Features */}
                  <p className="text-white/70 mb-4">{portfolio.description}</p>
                  <div className="flex items-center gap-6 mb-4 text-white/60">
                    <div className="flex items-center gap-1">
                      <FaRuler />
                      <span>{portfolio.size} sqm</span>
                    </div>
                  </div>

                  {/* Portfolio Highlights */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {portfolio.highlights.map((highlight, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-primary-gold/10 text-primary-gold text-sm"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* View Details Button */}
                  <Link href={portfolio.link}>
                    <motion.button
                      className="w-full py-2 mt-2 rounded-md border border-primary-gold/30 text-white hover:bg-primary-gold/20 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Portfolio
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* View All Button */}
          <motion.div 
            className="text-center mt-12"
            variants={fadeInUp}
          >
            <Link href="/portfolio" className="btn-primary">
              View All Portfolios
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Virtual Tour Section */}
      <motion.section
        className="py-16"
        variants={staggerChildren}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl font-bold mb-6 text-gradient">
                Experience Properties in Virtual Reality
              </h2>
              <p className="text-white/90 mb-8">
                Take an immersive virtual tour of our luxury properties from the comfort of your home. Experience every detail in stunning 360° detail.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 text-white/70">
                  <div className="w-12 h-12 rounded-full bg-primary-gold/20 flex items-center justify-center text-primary-gold">
                    <FaHome />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">360° Tours</h3>
                    <p>Explore every room in detail</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-white/70">
                  <div className="w-12 h-12 rounded-full bg-primary-gold/20 flex items-center justify-center text-primary-gold">
                    <FaSearch />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Detailed Views</h3>
                    <p>Zoom in on specific features</p>
                  </div>
                </div>
              </div>
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Virtual Tour
              </motion.button>
            </motion.div>
            <motion.div
              className="relative h-[400px] rounded-lg overflow-hidden"
              variants={fadeInUp}
            >
              <div className="absolute inset-0 bg-primary-gold/20 rounded-lg" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-primary-gold/20 flex items-center justify-center text-primary-gold text-4xl mx-auto mb-4">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.8, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      ▶
                    </motion.div>
                  </div>
                  <p className="text-white font-bold">Watch Demo Tour</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Why Choose Us Section */}
      <motion.section 
        className="py-16"
        variants={staggerChildren}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-gradient text-center"
            variants={fadeInUp}
          >
            Why Choose Us
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              variants={cardHover}
              initial="rest"
              whileHover="hover"
              className="bg-primary-black/50 p-8 rounded-lg border border-primary-gold/20 text-center"
            >
              <motion.div 
                className="text-primary-gold text-4xl mb-6 mx-auto"
                whileHover={{ scale: 1.2, rotate: 5 }}
              >
                <FaTrophy />
              </motion.div>
              <h3 className="text-xl font-bold mb-4 text-white">Premium Properties</h3>
              <p className="text-white/70">Access to exclusive luxury properties in prime locations, carefully curated for discerning buyers.</p>
            </motion.div>

            <motion.div
              variants={cardHover}
              initial="rest"
              whileHover="hover"
              className="bg-primary-black/50 p-8 rounded-lg border border-primary-gold/20 text-center"
            >
              <motion.div 
                className="text-primary-gold text-4xl mb-6 mx-auto"
                whileHover={{ scale: 1.2, rotate: 5 }}
              >
                <FaHandshake />
              </motion.div>
              <h3 className="text-xl font-bold mb-4 text-white">Expert Guidance</h3>
              <p className="text-white/70">Our experienced team provides personalized service and expert advice throughout your property journey.</p>
            </motion.div>

            <motion.div
              variants={cardHover}
              initial="rest"
              whileHover="hover"
              className="bg-primary-black/50 p-8 rounded-lg border border-primary-gold/20 text-center"
            >
              <motion.div 
                className="text-primary-gold text-4xl mb-6 mx-auto"
                whileHover={{ scale: 1.2, rotate: 5 }}
              >
                <FaUsers />
              </motion.div>
              <h3 className="text-xl font-bold mb-4 text-white">Client Satisfaction</h3>
              <p className="text-white/70">Our track record of satisfied clients and successful transactions speaks to our commitment to excellence.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Interactive Map Section */}
      <motion.section 
        className="py-16 bg-primary-black/95"
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            variants={staggerChildren}
          >
            <div>
              <motion.h2 
                className="text-3xl font-bold mb-6 text-gradient"
                variants={fadeInUp}
              >
                Find Properties in Prime Locations
              </motion.h2>
              <motion.p 
                className="text-white/90 mb-8"
                variants={fadeInUp}
              >
                Explore our interactive map to discover premium properties in the most sought-after neighborhoods. From beachfront villas to urban penthouses, find your perfect location.
              </motion.p>
              <motion.div
                className="space-y-4"
                variants={staggerChildren}
              >
                <div className="flex items-center gap-4 text-white/70">
                  <div className="w-12 h-12 rounded-full bg-primary-gold/20 flex items-center justify-center text-primary-gold">
                    <FaHome />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Premium Locations</h3>
                    <p>Properties in the most desirable areas</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-white/70">
                  <div className="w-12 h-12 rounded-full bg-primary-gold/20 flex items-center justify-center text-primary-gold">
                    <FaSearch />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Easy Search</h3>
                    <p>Filter by location, price, and amenities</p>
                  </div>
                </div>
              </motion.div>
            </div>
            <motion.div
              className="relative h-[400px] rounded-lg overflow-hidden"
              variants={fadeInUp}
            >
              <PropertyMap properties={mapProperties} />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section 
        className="py-16"
        variants={staggerChildren}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-gradient text-center"
            variants={fadeInUp}
          >
            What Our Clients Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                className="bg-primary-black/50 p-6 rounded-lg border border-primary-gold/20"
              >
                <motion.p 
                  className="text-white/90 mb-6 italic"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  "{testimonial.text}"
                </motion.p>
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-primary-gold font-bold">{testimonial.author}</p>
                  <p className="text-white/70">{testimonial.position}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Latest Blog Posts */}
      <motion.section 
        className="py-16"
        variants={staggerChildren}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-gradient text-center"
            variants={fadeInUp}
          >
            Latest Insights & News
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.article
              variants={cardHover}
              initial="rest"
              whileHover="hover"
              className="bg-primary-black/50 rounded-lg overflow-hidden border border-primary-gold/20"
            >
              <div className="relative h-48">
                <div className="absolute inset-0 bg-primary-gold/20" />
              </div>
              <div className="p-6">
                <p className="text-primary-gold mb-2">Market Trends</p>
                <h3 className="text-xl font-bold mb-3 text-white">
                  2024 Luxury Real Estate Market Outlook
                </h3>
                <p className="text-white/70 mb-4">
                  Discover the latest trends and predictions for the luxury real estate market in 2024.
                </p>
                <Link href="/blog/market-outlook" className="text-primary-gold hover:text-primary-gold/80 transition-colors">
                  Read More →
                </Link>
              </div>
            </motion.article>

            <motion.article
              variants={cardHover}
              initial="rest"
              whileHover="hover"
              className="bg-primary-black/50 rounded-lg overflow-hidden border border-primary-gold/20"
            >
              <div className="relative h-48">
                <div className="absolute inset-0 bg-primary-gold/20" />
              </div>
              <div className="p-6">
                <p className="text-primary-gold mb-2">Investment</p>
                <h3 className="text-xl font-bold mb-3 text-white">
                  Top Investment Opportunities in Real Estate
                </h3>
                <p className="text-white/70 mb-4">
                  Expert insights on the most promising real estate investment opportunities.
                </p>
                <Link href="/blog/investment-opportunities" className="text-primary-gold hover:text-primary-gold/80 transition-colors">
                  Read More →
                </Link>
              </div>
            </motion.article>

            <motion.article
              variants={cardHover}
              initial="rest"
              whileHover="hover"
              className="bg-primary-black/50 rounded-lg overflow-hidden border border-primary-gold/20"
            >
              <div className="relative h-48">
                <div className="absolute inset-0 bg-primary-gold/20" />
              </div>
              <div className="p-6">
                <p className="text-primary-gold mb-2">Lifestyle</p>
                <h3 className="text-xl font-bold mb-3 text-white">
                  Luxury Living: Modern Home Design Trends
                </h3>
                <p className="text-white/70 mb-4">
                  Explore the latest design trends shaping luxury homes in 2024.
                </p>
                <Link href="/blog/design-trends" className="text-primary-gold hover:text-primary-gold/80 transition-colors">
                  Read More →
                </Link>
              </div>
            </motion.article>
          </div>
        </div>
      </motion.section>

      {/* Newsletter Section */}
      <motion.section 
        className="py-16 bg-primary-black/95"
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-2xl mx-auto text-center p-8 rounded-lg bg-primary-black/50 border border-primary-gold/20"
            whileHover={{
              boxShadow: "0 0 30px rgba(212, 175, 55, 0.15)",
              transition: { duration: 0.3 }
            }}
          >
            <motion.h2 
              className="text-3xl font-bold mb-6 text-gradient"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Stay Updated
            </motion.h2>
            <p className="text-white/90 mb-8">
              Subscribe to our newsletter for exclusive property listings and market insights
            </p>
            <form onSubmit={handleSubscribe}>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-primary-black/50 border border-primary-gold/30 rounded-md p-3 text-white focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all duration-300"
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className="text-sm text-white/60 mt-2 text-left">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </div>
                <motion.button 
                  type="submit"
                  className="btn-primary whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isSubscribing}
                >
                  {isSubscribing ? 'Subscribing...' : 'Subscribe Now'}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </motion.section>
    </>
  )
}
