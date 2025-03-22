'use client'

import { motion } from 'framer-motion'
import MotionBackground from '@/components/MotionBackground'
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
    <>
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
      <section className="pt-32 pb-16 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 text-gradient"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Our Story
            </motion.h1>
            <motion.p 
              className="text-lg text-white/90 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Setting the standard for luxury real estate in Nigeria with unparalleled service and exceptional properties
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="relative h-64 md:h-96 rounded-lg overflow-hidden group cursor-pointer"
              onClick={() => setShowVideo(true)}
            >
              <div className="absolute inset-0 bg-primary-gold/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-black to-transparent" />
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                <motion.div
                  className="flex items-center gap-4 bg-primary-black/60 px-6 py-3 rounded-full border border-primary-gold/20"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-full bg-primary-gold flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaPlay className="text-primary-black text-xl ml-1" />
                  </motion.div>
                  <span className="text-white text-lg font-semibold">Watch Our Story</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section 
        className="py-16 bg-primary-black/95"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className={`relative p-8 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-5 backdrop-blur-sm
                  border border-primary-gold/10 shadow-lg hover:shadow-2xl hover:border-primary-gold/20
                  transform transition-all duration-300`}
              >
                <div className="absolute inset-0 bg-primary-black/60 rounded-lg -z-10" />
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-primary-gold text-4xl mb-4"
                >
                  <stat.icon />
                </motion.div>
                <motion.div 
                  className="text-3xl font-bold text-white mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-white/70">{stat.text}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section 
        className="py-16"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center text-gradient"
          >
            Our Core Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
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
                className={`relative p-8 rounded-lg bg-gradient-to-br ${value.color} bg-opacity-5 backdrop-blur-sm
                  border border-primary-gold/10 shadow-lg hover:shadow-2xl hover:border-primary-gold/20
                  transform transition-all duration-300 text-center`}
              >
                <div className="absolute inset-0 bg-primary-black/60 rounded-lg -z-10" />
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-primary-gold text-4xl mb-6 mx-auto"
                >
                  <value.icon />
                </motion.div>
                <h3 className="text-xl font-bold mb-4 text-white">{value.title}</h3>
                <p className="text-white/80">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        className="py-16 bg-primary-black/95"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center text-gradient"
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
      </motion.section>
    </>
  )
} 