'use client'

import { motion } from 'framer-motion'
import MotionBackground from '@/components/MotionBackground'
import { FaBed, FaBath, FaRuler, FaSearch, FaHome, FaHandshake, FaTrophy, FaUsers } from 'react-icons/fa'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);

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
    { icon: <FaTrophy />, value: '15+', label: 'Years Experience' },
    { icon: <FaUsers />, value: '50+', label: 'Expert Agents' },
  ]

  const featuredProperties = [
    {
      title: 'Luxury Villa with Ocean View',
      location: 'Mowe Ibafo, OG',
      price: '₦5,900,000',
      beds: 5,
      baths: 6,
      area: '6,200',
      image: '/images/property1.jpg'
    },
    {
      title: 'Modern Penthouse Suite',
      location: 'Epe, LA',
      price: '₦8,500,000',
      beds: 4,
      baths: 4.5,
      area: '4,800',
      image: '/images/property2.jpg'
    },
    {
      title: 'Beachfront Estate',
      location: 'Simawa, OG',
      price: '₦12,900,000',
      beds: 6,
      baths: 8,
      area: '8,500',
      image: '/images/property3.jpg'
    },
    {
      title: 'Mountain View Mansion',
      location: 'Ikorodu, LA',
      price: '₦15,500,000',
      beds: 7,
      baths: 9,
      area: '9,800',
      image: '/images/property4.jpg'
    },
    {
      title: 'Waterfront Contemporary',
      location: 'Imota, LA',
      price: '₦7,200,000',
      beds: 5,
      baths: 5.5,
      area: '5,500',
      image: '/images/property5.jpg'
    },
    {
      title: 'Historic Downtown Penthouse',
      location: 'Ikeja, LA',
      price: '₦16,800,000',
      beds: 4,
      baths: 4,
      area: '4,200',
      image: '/images/property6.jpg'
    }
  ]

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

  const fadeInUp = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  }

  const staggerChildren = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: {
      staggerChildren: 0.2
    }
  }

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
  }

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

      {/* Property Search Section */}
      <motion.section 
        className="py-16 bg-primary-black/95"
        {...fadeInUp}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-primary-black/50 p-8 rounded-lg border border-primary-gold/20"
            whileHover={{
              boxShadow: "0 0 30px rgba(212, 175, 55, 0.15)",
              transition: { duration: 0.3 }
            }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gradient text-center">Find Your Perfect Property</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Location"
                className="bg-primary-black/50 border border-primary-gold/30 rounded-md p-3 text-white"
              />
              <select className="bg-primary-black/50 border border-primary-gold/30 rounded-md p-3 text-white">
                <option value="">Property Type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
              </select>
              <input
                type="text"
                placeholder="Price Range"
                className="bg-primary-black/50 border border-primary-gold/30 rounded-md p-3 text-white"
              />
              <button className="btn-primary flex items-center justify-center gap-2">
                <FaSearch /> Search
              </button>
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

      {/* Featured Properties */}
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
            Featured Properties
          </motion.h2>
          <div className="relative">
            {/* Navigation Arrows */}
            <motion.button
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 text-primary-gold hover:scale-110 transition-transform"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const container = document.querySelector('.properties-carousel');
                if (container) {
                  const scrollAmount = container.clientWidth;
                  container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            
            <motion.button
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 text-primary-gold hover:scale-110 transition-transform"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const container = document.querySelector('.properties-carousel');
                if (container) {
                  const scrollAmount = container.clientWidth;
                  container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>

            {/* Properties Carousel */}
            <div 
              className="properties-carousel overflow-hidden w-full"
              style={{
                scrollSnapType: 'x mandatory',
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch',
                transition: 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div className="flex gap-4 md:gap-8">
                {featuredProperties.map((property, index) => (
                  <motion.div
                    key={index}
                    variants={cardHover}
                    initial="rest"
                    whileHover="hover"
                    className="min-w-[85%] sm:min-w-[45%] md:min-w-[calc(33.333%-1.33rem)] flex-shrink-0 bg-primary-black/50 rounded-lg overflow-hidden group"
                    style={{ 
                      scrollSnapAlign: 'start',
                      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    <motion.div 
                      className="relative h-48 md:h-64"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute inset-0 bg-primary-gold/20" />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-primary-black to-transparent opacity-0 group-hover:opacity-100"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                    <motion.div 
                      className="p-4 md:p-6"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-lg md:text-xl font-bold mb-2 text-white group-hover:text-primary-gold transition-colors">
                        {property.title}
                      </h3>
                      <p className="text-primary-gold mb-4">{property.price}</p>
                      <p className="text-white/70 mb-4">{property.location}</p>
                      <div className="flex items-center gap-4 text-white/60">
                        <div className="flex items-center gap-1">
                          <FaBed />
                          <span>{property.beds}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaBath />
                          <span>{property.baths}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaRuler />
                          <span>{property.area} sq ft</span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
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

      {/* Newsletter Section */}
      <motion.section 
        className="py-16 bg-primary-black/95"
        {...fadeInUp}
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
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-primary-black/50 border border-primary-gold/30 rounded-md p-3 text-white focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all duration-300"
              />
              <motion.button 
                className="btn-primary whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe Now
              </motion.button>
            </motion.div>
          </motion.div>
    </div>
      </motion.section>
    </>
  )
}
