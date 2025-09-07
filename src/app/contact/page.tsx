'use client'

import { motion } from 'framer-motion'
import PageWrapper from '@/components/ui/PageWrapper'
import EnhancedSection from '@/components/ui/EnhancedSection'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaInstagram, FaLinkedin, FaClock, FaFacebookF, FaTwitter, FaArrowRight } from 'react-icons/fa'
import ContactForm from '@/components/forms/ContactForm'
import Image from 'next/image'

// Temporary components
const ScrollReveal = ({ children, direction = 'up', delay = 0, className = '' }: { 
  children: React.ReactNode; 
  direction?: string; 
  delay?: number; 
  className?: string;
}) => (
  <motion.div 
    className={className}
    initial={{ opacity: 0, y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0, x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0 }}
    whileInView={{ opacity: 1, y: 0, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
  >
    {children}
  </motion.div>
);

const StaggerContainer = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <motion.div 
    className={className}
    initial="initial"
    whileInView="whileInView"
    viewport={{ once: true }}
    variants={{
      initial: { opacity: 0 },
      whileInView: { opacity: 1, transition: { staggerChildren: 0.1 } }
    }}
  >
    {children}
  </motion.div>
);

const StaggerItem = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    variants={{
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 }
    }}
  >
    {children}
  </motion.div>
);

export default function ContactPage() {
  const contactInfo = [
    {
      icon: FaPhone,
      title: 'Call or WhatsApp',
      details: ['+234 [Primary Contact]', '+234 [Secondary/WhatsApp]'],
      color: 'from-emerald-500 to-teal-500',
      action: 'tel:+234XXXXXXXXX'
    },
    {
      icon: FaEnvelope,
      title: 'Email Us',
      details: ['info@vistagranderealty.com', 'support@vistagranderealty.com'],
      color: 'from-blue-500 to-indigo-500',
      action: 'mailto:info@vistagranderealty.com'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Visit Our Office',
      details: ['Vista Grande Realty LTD', 'Ibadan, Oyo State, Nigeria'],
      color: 'from-rose-500 to-pink-500',
      action: '#'
    },
    {
      icon: FaClock,
      title: 'Office Hours',
      details: ['Monday - Friday: 9:00 AM - 5:00 PM', 'Saturday: 10:00 AM - 2:00 PM', 'Sunday: Closed'],
      color: 'from-amber-500 to-yellow-500'
    },
  ]

  const socialLinks = [
    { icon: FaWhatsapp, href: '#', label: 'WhatsApp', color: 'hover:text-green-400' },
    { icon: FaFacebookF, href: 'PVistaGrandeRealty', label: 'Facebook', color: 'hover:text-blue-400' },
    { icon: FaInstagram, href: 'PVistaGrandeRealty', label: 'Instagram', color: 'hover:text-pink-400' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-300' },
    { icon: FaTwitter, href: '#', label: 'Twitter', color: 'hover:text-blue-400' },
  ]

  const handleContactSubmit = async (data: any) => {
    // Implement contact form submission logic
    console.log('Contact form submitted:', data)
    // Add API call here
    await new Promise(resolve => setTimeout(resolve, 2000))
  }

  return (
    <PageWrapper backgroundVariant="minimal">
      
      {/* Hero Section */}
      <motion.section
        className="min-h-[80vh] flex items-center relative pt-32 sm:pt-36 md:pt-40 pb-24 md:pb-32 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        {/* Premium Background with Parallax Effect */}
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          <div className="absolute inset-0 bg-primary-black/90"></div>
          <Image
            src="/background/black-golden-colored-wallpaper_53876-138191.jpg"
            alt="Background"
            fill
            className="object-cover object-center opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-black/80 via-primary-black/60 to-primary-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-gold/10 via-transparent to-primary-blue-primary/10" />
          
          {/* Subtle animated gold particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-primary-gold/40"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 5,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>
        </motion.div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-cormorant font-bold mb-8 luxury-gradient-mixed">
              Let's Connect
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-primary-gold to-primary-gold-accent mx-auto rounded-full mb-8"></div>
            <p className="text-2xl md:text-3xl text-white/90 mb-6 leading-relaxed font-light" style={{textShadow: "0 1px 2px rgba(0,0,0,0.3)"}}>
              Have a question, need a site inspection, or ready to start your real estate journey?
            </p>
            <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
              We'd love to hear from you. Whether you're a first-time buyer, an investor, or a corporate client — our team is here to assist you every step of the way.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Information */}
      <motion.section
        className="py-24 md:py-32 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Premium Background with Parallax Effect */}
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.05 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          <div className="absolute inset-0 bg-primary-black/90"></div>
          <Image
            src="/background/black-golden-colored-wallpaper_53876-138191.jpg"
            alt="Background"
            fill
            className="object-cover object-center opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-black/80 via-primary-black/60 to-primary-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-gold/10 via-transparent to-primary-blue-primary/10" />
          
          {/* Subtle pattern overlay */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(45deg, rgba(212, 175, 55, 0.1) 25%, transparent 25%),
                linear-gradient(-45deg, rgba(212, 175, 55, 0.1) 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, rgba(59, 130, 246, 0.05) 75%),
                linear-gradient(-45deg, transparent 75%, rgba(59, 130, 246, 0.05) 75%)
              `,
              backgroundSize: '60px 60px',
              backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px',
              zIndex: 4
            }}
          />
        </motion.div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-cormorant font-bold mb-6 luxury-gradient-mixed inline-block">
              Get In Touch
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary-gold via-white/30 to-primary-blue-light mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`glass-morphism-${index % 2 === 0 ? 'gold' : 'blue'} p-8 rounded-2xl text-center h-full shadow-xl group cursor-pointer relative overflow-hidden`}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={info.action ? () => window.open(info.action, '_self') : undefined}
              >
                {/* Animated background elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-gold/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700 opacity-50" />
                
                {/* Corner accents that appear on hover */}
                <div className={`absolute top-0 left-0 w-12 h-12 border-t border-l border-${index % 2 === 0 ? 'primary-gold' : 'primary-blue-light'}/0 group-hover:border-${index % 2 === 0 ? 'primary-gold' : 'primary-blue-light'}/40 transition-all duration-500`}></div>
                <div className={`absolute bottom-0 right-0 w-12 h-12 border-b border-r border-${index % 2 === 0 ? 'primary-gold' : 'primary-blue-light'}/0 group-hover:border-${index % 2 === 0 ? 'primary-gold' : 'primary-blue-light'}/40 transition-all duration-500`}></div>
                
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`text-${index % 2 === 0 ? 'primary-gold' : 'primary-blue-light'} text-4xl md:text-5xl mb-6 mx-auto relative z-10 w-20 h-20 flex items-center justify-center`}
                >
                  <info.icon />
                  
                  {/* Animated glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      boxShadow: [
                        "0 0 0px rgba(212, 175, 55, 0)",
                        "0 0 15px rgba(212, 175, 55, 0.3)",
                        "0 0 0px rgba(212, 175, 55, 0)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
                
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-white font-cormorant">{info.title}</h3>
                <div className="space-y-2">
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-white/80 text-sm md:text-base">
                      {detail}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Form Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <ContactForm onSubmit={handleContactSubmit} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="glass-morphism-gold p-8 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden h-full">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-primary-gold/20"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-primary-gold/20"></div>
                
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary-gold/5 rounded-full -translate-y-20 translate-x-20"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary-blue-light/5 rounded-full translate-y-20 -translate-x-20"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 font-cormorant luxury-gradient-text">Why Choose Vista Grande?</h3>

                  <div className="space-y-8">
                    <motion.div 
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-primary-gold/20 flex items-center justify-center flex-shrink-0 glow-gold-subtle">
                        <span className="text-primary-gold font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-2 text-lg">Integrity-Driven</h4>
                        <p className="text-white/70">We deliver what we promise — no shortcuts, no surprises.</p>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-primary-gold/20 flex items-center justify-center flex-shrink-0 glow-gold-subtle">
                        <span className="text-primary-gold font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-2 text-lg">Customer-Centric</h4>
                        <p className="text-white/70">You're not just a client; you're a partner in our journey.</p>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-primary-gold/20 flex items-center justify-center flex-shrink-0 glow-gold-subtle">
                        <span className="text-primary-gold font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-2 text-lg">Innovation-Focused</h4>
                        <p className="text-white/70">We leverage technology to make real estate simple and transparent.</p>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-primary-gold/20 flex items-center justify-center flex-shrink-0 glow-gold-subtle">
                        <span className="text-primary-gold font-bold">4</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-2 text-lg">Local Expertise</h4>
                        <p className="text-white/70">Deep roots in Lagos, Ogun, Oyo, and growing across Nigeria.</p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Social Links */}
                  <div className="mt-10 pt-6 border-t border-primary-gold/20">
                    <h4 className="text-white font-semibold mb-4 text-lg">Follow Us</h4>
                    <div className="flex gap-4">
                      {socialLinks.map((social, index) => (
                        <motion.a
                          key={index}
                          href={social.href}
                          className={`w-12 h-12 rounded-full bg-primary-gold/10 flex items-center justify-center text-primary-gold transition-colors ${social.color}`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <social.icon />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Map Section */}
      <motion.section 
        className="py-24 md:py-32 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Premium Background with Parallax Effect */}
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.05 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          <div className="absolute inset-0 bg-primary-black/90"></div>
          <Image
            src="/background/black-golden-colored-wallpaper_53876-138191.jpg"
            alt="Background"
            fill
            className="object-cover object-center opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-black/80 via-primary-black/60 to-primary-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-gold/10 via-transparent to-primary-blue-primary/10" />
        </motion.div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-cormorant font-bold mb-6 luxury-gradient-blue inline-block">
              Visit Our Office
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary-blue-light to-primary-blue-accent mx-auto rounded-full"></div>
            <p className="text-xl text-white/80 mt-8 max-w-3xl mx-auto">
              We'd love to meet you in person at our headquarters
            </p>
          </motion.div>
          
          <motion.div
            className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.3332257318513!2d3.3291159755208893!3d6.601469822503138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b922bd735b5bf%3A0x6ad56720f80c1ff2!2sIkeja%2C%20Lagos!5e0!3m2!1sen!2sng!4v1690234567890!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="filter grayscale hover:grayscale-0 transition-all duration-500"
            ></iframe>
            
            {/* Premium border overlay */}
            <div className="absolute inset-0 pointer-events-none border-8 border-primary-gold/10 rounded-2xl"></div>
            
            {/* Gold corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary-gold/40 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary-gold/40 pointer-events-none"></div>
            
            {/* Blue corner accents */}
            <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-primary-blue-light/40 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-primary-blue-light/40 pointer-events-none"></div>
          </motion.div>
        </div>
      </motion.section>

      {/* Social Links */}
      <motion.section
        className="py-24 md:py-32 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Premium Background with Parallax Effect */}
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.05 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          <div className="absolute inset-0 bg-primary-black/90"></div>
          <Image
            src="/background/black-golden-colored-wallpaper_53876-138191.jpg"
            alt="Background"
            fill
            className="object-cover object-center opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-black/80 via-primary-black/60 to-primary-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-gold/10 via-transparent to-primary-blue-primary/10" />
          
          {/* Subtle animated gold particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-primary-gold/40"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 5,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>
        </motion.div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-cormorant font-bold mb-6 luxury-gradient-mixed inline-block">
                Let's Build Something Great
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-primary-gold via-white/30 to-primary-blue-light mx-auto rounded-full"></div>
              <p className="text-xl text-white/80 mt-8 max-w-3xl mx-auto">
                Follow us on social media for updates, new listings, and real estate tips
              </p>
            </motion.div>
            
            <div className="glass-morphism-gold p-10 md:p-16 rounded-2xl shadow-2xl relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-primary-gold/40"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-primary-gold/40"></div>
              
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary-gold/5 rounded-full -translate-y-20 translate-x-20"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary-blue-light/5 rounded-full translate-y-20 -translate-x-20"></div>
              
              <div className="relative z-10">
                <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex flex-col items-center group"
                    >
                      <motion.div
                        className={`w-20 h-20 rounded-full bg-primary-gold/10 flex items-center justify-center text-primary-gold text-3xl ${social.color} transition-all duration-300 mb-3`}
                        whileHover={{ 
                          scale: 1.1, 
                          rotate: 5,
                          boxShadow: "0 0 20px rgba(212, 175, 55, 0.3)"
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <social.icon />
                      </motion.div>
                      <span className="text-white/80 group-hover:text-white transition-colors duration-300">{social.label}</span>
                    </motion.a>
                  ))}
                </div>
                
                <motion.div
                  className="mt-12 text-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <p className="text-2xl md:text-3xl font-cormorant text-white/80 italic" style={{textShadow: "0 2px 4px rgba(0,0,0,0.3)"}}>
                    "Building not just properties, but relationships."
                  </p>
                  <div className="w-16 h-0.5 bg-primary-gold/50 mx-auto mt-6"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </PageWrapper>
  )
}