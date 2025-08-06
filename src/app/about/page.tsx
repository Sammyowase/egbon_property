'use client'

import { motion } from 'framer-motion'
import MotionBackground from '@/components/MotionBackground'
import EnhancedBackground from '@/components/ui/EnhancedBackground'
import PageWrapper from '@/components/ui/PageWrapper'
import EnhancedSection from '@/components/ui/EnhancedSection'
import { FaTrophy, FaHandshake, FaHome, FaChartLine, FaUsers, FaGem, FaPlay, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa'
import { useState } from 'react'
import Image from 'next/image'

export default function AboutPage() {
  const [showVideo, setShowVideo] = useState(false)

  const stats = [
    { 
      number: '15+', 
      text: 'Years of Experience',
      icon: FaTrophy,
      color: 'from-amber-500 to-yellow-500'
    },
    { 
      number: '1000+', 
      text: 'Properties Sold',
      icon: FaHome,
      color: 'from-emerald-500 to-teal-500'
    },
    { 
      number: '98%', 
      text: 'Client Satisfaction',
      icon: FaHandshake,
      color: 'from-blue-500 to-indigo-500'
    },
    { 
      number: '₦2B+', 
      text: 'Property Value Sold',
      icon: FaChartLine,
      color: 'from-rose-500 to-pink-500'
    },
  ]

  const values = [
    {
      icon: FaGem,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our service, ensuring the highest standards in real estate.',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: FaHandshake,
      title: 'Trust',
      description: 'Building lasting relationships through transparency, integrity, and unwavering commitment to our clients.',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: FaUsers,
      title: 'Innovation',
      description: 'Embracing cutting-edge technology and modern solutions to provide the best real estate experience.',
      color: 'from-amber-500 to-yellow-500'
    },
  ]

  const team = [
    {
      name: 'Mr Yusuf',
      position: 'CEO & Founder',
      image: '/team/yusuf-ceo.jpg',
      bio: 'With over 15 years in luxury real estate, Mr Yusuf leads with vision and expertise.',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com'
      }
    },
    {
      name: 'Okiki Yusuf',
      position: 'Head of Luxury Sales',
      image: '/team/okiki-yusuf.jpg',
      bio: 'Okiki brings unparalleled knowledge of the luxury market and client relations.',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com'
      }
    },
    {
      name: 'Yusuf Subomi',
      position: 'Property Consultant',
      image: '/team/yusuf-subomi.jpg',
      bio: 'Yusuf specializes in finding the perfect match between clients and properties.',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com'
      }
    },
  ]

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <PageWrapper backgroundVariant="default">
      <MotionBackground />
      
      {/* Video Modal */}
      {showVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setShowVideo(false)}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-4xl aspect-video"
            onClick={e => e.stopPropagation()}
          >
            <iframe
              className="w-full h-full rounded-lg shadow-2xl"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </motion.div>
        </motion.div>
      )}
      
      {/* Hero Section */}
      <EnhancedSection variant="hero" backgroundPattern>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1 
              className="heading-display mb-8 luxury-gradient-text"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Our Story
            </motion.h1>
            <motion.p 
              className="body-luxury text-white/90 mb-12 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Setting the standard for luxury real estate in Nigeria with unparalleled service and exceptional properties. 
              We transform visions into reality, creating spaces that elevate lifestyles and build tomorrow's communities.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="relative h-64 md:h-96 rounded-2xl overflow-hidden group cursor-pointer glass-morphism"
              onClick={() => setShowVideo(true)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-gold/20 via-transparent to-primary-blue-light/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-black/80 via-transparent to-transparent" />
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                <motion.div
                  className="flex items-center gap-6 glass-morphism-gold px-8 py-4 rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="w-16 h-16 rounded-full bg-primary-gold flex items-center justify-center glow-gold-intense"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(212, 175, 55, 0.3)",
                        "0 0 30px rgba(212, 175, 55, 0.5)",
                        "0 0 20px rgba(212, 175, 55, 0.3)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <FaPlay className="text-primary-black text-2xl ml-1" />
                  </motion.div>
                  <div className="text-left">
                    <span className="text-white text-xl font-bold block">Watch Our Story</span>
                    <span className="text-white/70 text-sm">Discover our journey</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </EnhancedSection>

      {/* Stats Section */}
      <EnhancedSection variant="feature" backgroundPattern>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className={`glass-morphism-${index % 2 === 0 ? 'gold' : 'blue'} p-8 rounded-2xl text-center card-3d group relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary-gold/5 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-700" />
                
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`text-${index % 2 === 0 ? 'primary-gold' : 'primary-blue-light'} text-5xl mb-6 flex justify-center relative z-10`}
                >
                  <stat.icon />
                </motion.div>
                
                <motion.div 
                  className="text-4xl font-bold text-white mb-3 relative z-10"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.number}
                </motion.div>
                
                <div className="text-white/80 font-medium relative z-10">{stat.text}</div>
                
                {/* Animated Progress Bar */}
                <motion.div
                  className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden relative z-10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.5, duration: 1 }}
                >
                  <motion.div
                    className={`h-full bg-gradient-to-r ${index % 2 === 0 ? 'from-primary-gold to-primary-gold-accent' : 'from-primary-blue-light to-primary-blue-accent'}`}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    style={{ transformOrigin: 'left' }}
                    transition={{ delay: index * 0.2 + 0.8, duration: 1.5 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
        </motion.div>
      </EnhancedSection>

      {/* Values Section */}
      <EnhancedSection variant="default">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="heading-display mb-16 text-center luxury-gradient-mixed"
          >
            Our Core Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="glass-morphism-gold p-10 rounded-2xl text-center card-3d group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-gold/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
                
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="text-primary-gold text-6xl mb-8 mx-auto relative z-10"
                >
                  <value.icon />
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-6 text-white group-hover:luxury-gradient-text transition-all duration-300 relative z-10">
                  {value.title}
                </h3>
                
                <p className="text-white/80 leading-relaxed relative z-10">
                  {value.description}
                </p>
                
                {/* Decorative Element */}
                <motion.div
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-primary-gold to-primary-blue-light rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </EnhancedSection>

      {/* Team Section */}
      <EnhancedSection variant="testimonial" backgroundPattern>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="heading-display mb-16 text-center luxury-gradient-blue"
          >
            Meet Our Team
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="relative rounded-lg overflow-hidden group"
              >
                <div className="relative h-80">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-primary-gold/20" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-primary-black to-transparent opacity-60 group-hover:opacity-80"
                    initial={{ opacity: 0.6 }}
                    whileHover={{ opacity: 0.8 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                >
                  <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-primary-gold mb-3">{member.position}</p>
                  <p className="text-white/80 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {member.bio}
                  </p>
                  <div className="flex space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.a
                      href={member.social.linkedin}
                      className="text-white hover:text-primary-gold transition-colors"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin className="text-2xl" />
                    </motion.a>
                    <motion.a
                      href={member.social.twitter}
                      className="text-white hover:text-primary-gold transition-colors"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaTwitter className="text-2xl" />
                    </motion.a>
                    <motion.a
                      href={member.social.instagram}
                      className="text-white hover:text-primary-gold transition-colors"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram className="text-2xl" />
                    </motion.a>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </EnhancedSection>
    </PageWrapper>
  )
} 