'use client'

import { motion } from 'framer-motion'
import MotionBackground from '@/components/MotionBackground'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaInstagram, FaLinkedin } from 'react-icons/fa'

export default function ContactPage() {
  const contactInfo = [
    {
      icon: FaPhone,
      title: 'Call Us',
      details: ['+234 555 123-4567', '+234 555 987-6543'],
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: FaEnvelope,
      title: 'Email Us',
      details: ['info@luxuryestates.com', 'sales@luxuryestates.com'],
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Visit Us',
      details: ['123 Luxury Avenue', 'Ikeja, Lagos'],
      color: 'from-rose-500 to-pink-500'
    },
  ]

  const socialLinks = [
    { icon: FaWhatsapp, href: '#', label: 'WhatsApp' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add form submission logic here
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
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
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 text-gradient"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Get in Touch
            </motion.h1>
            <motion.p 
              className="text-lg text-white/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Let's discuss how we can help you find your perfect luxury property
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <motion.section 
        className="py-16 bg-primary-black/95"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
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
                className={`relative p-8 rounded-lg bg-gradient-to-br ${info.color} bg-opacity-5 backdrop-blur-sm
                  border border-primary-gold/10 shadow-lg hover:shadow-2xl hover:border-primary-gold/20
                  transform transition-all duration-300`}
              >
                <div className="absolute inset-0 bg-primary-black/60 rounded-lg -z-10" />
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-primary-gold text-4xl mb-6"
                >
                  <info.icon />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 text-white">{info.title}</h3>
                {info.details.map((detail, i) => (
                  <motion.p 
                    key={i} 
                    className="text-white/80 mb-2"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {detail}
                  </motion.p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Map Section */}
      <motion.section 
        className="py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-2xl border border-primary-gold/20"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.3332257318513!2d3.3291159755208893!3d6.601469822503138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b922bd735b5bf%3A0x6ad56720f80c1ff2!2sIkeja%2C%20Lagos!5e0!3m2!1sen!2sng!4v1690234567890!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="filter grayscale hover:grayscale-0 transition-all duration-300"
            ></iframe>
            <div className="absolute inset-0 pointer-events-none border-8 border-primary-gold/10 rounded-lg"></div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Form Section */}
      <motion.section 
        className="py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-primary-black/50 p-8 rounded-lg border border-primary-gold/20 shadow-xl
                backdrop-blur-sm hover:shadow-2xl hover:border-primary-gold/30 transition-all duration-300"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h2 
                className="text-3xl font-bold mb-8 text-gradient text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                Send Us a Message
              </motion.h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div variants={fadeInUp}>
                    <label className="block text-white mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full bg-primary-black/50 border border-primary-gold/30 rounded-md p-3 text-white
                        focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all duration-300"
                      required
                    />
                  </motion.div>
                  <motion.div variants={fadeInUp}>
                    <label className="block text-white mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full bg-primary-black/50 border border-primary-gold/30 rounded-md p-3 text-white
                        focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all duration-300"
                      required
                    />
                  </motion.div>
                </div>
                <motion.div variants={fadeInUp}>
                  <label className="block text-white mb-2">Subject</label>
                  <input
                    type="text"
                    className="w-full bg-primary-black/50 border border-primary-gold/30 rounded-md p-3 text-white
                      focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all duration-300"
                    required
                  />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <label className="block text-white mb-2">Message</label>
                  <textarea
                    rows={6}
                    className="w-full bg-primary-black/50 border border-primary-gold/30 rounded-md p-3 text-white
                      focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all duration-300"
                    required
                  ></textarea>
                </motion.div>
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    type="submit"
                    className="btn-primary px-8 py-3 text-lg"
                  >
                    Send Message
                  </button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Social Links */}
      <motion.section 
        className="py-16 bg-primary-black/95"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-gradient text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Connect With Us
          </motion.h2>
          <div className="flex justify-center space-x-8">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                className="text-primary-gold text-3xl hover:text-white transition-colors duration-300"
                whileHover={{ 
                  scale: 1.2,
                  rotate: 5,
                  transition: { type: "spring", stiffness: 300 }
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <social.icon />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.section>
    </>
  )
} 