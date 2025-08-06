'use client'

import { motion } from 'framer-motion'
import MotionBackground from '@/components/MotionBackground'
import EnhancedBackground from '@/components/ui/EnhancedBackground'
import PageWrapper from '@/components/ui/PageWrapper'
import EnhancedSection from '@/components/ui/EnhancedSection'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaInstagram, FaLinkedin, FaClock, FaFacebookF, FaTwitter } from 'react-icons/fa'
import ContactForm from '@/components/forms/ContactForm'

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
    { icon: FaFacebookF, href: '#', label: 'Facebook', color: 'hover:text-blue-400' },
    { icon: FaInstagram, href: '#', label: 'Instagram', color: 'hover:text-pink-400' },
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
    <PageWrapper backgroundVariant="default">
      <MotionBackground />
      
      {/* Hero Section */}
      <EnhancedSection variant="hero" backgroundPattern>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal direction="up" className="text-center max-w-4xl mx-auto">
            <h1 className="heading-display mb-8 luxury-gradient-mixed">
              Let's Connect
            </h1>
            <p className="body-luxury text-white/90 mb-6 leading-relaxed">
              Have a question, need a site inspection, or ready to start your real estate journey?
            </p>
            <p className="text-xl text-white/80 leading-relaxed">
              We'd love to hear from you. Whether you're a first-time buyer, an investor, or a corporate client — our team is here to assist you every step of the way.
            </p>
          </ScrollReveal>
        </div>
      </EnhancedSection>

      {/* Contact Information */}
      <EnhancedSection variant="feature" backgroundPattern>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <StaggerItem key={index}>
                <motion.div
                  className={`glass-morphism-${index % 2 === 0 ? 'gold' : 'blue'} p-8 rounded-2xl text-center h-full card-3d group cursor-pointer`}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={info.action ? () => window.open(info.action, '_self') : undefined}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="text-primary-gold text-4xl mb-6"
                  >
                    <info.icon />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-4 text-white">{info.title}</h3>
                  <div className="space-y-2">
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-white/80 text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Contact Form Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ScrollReveal direction="left">
              <ContactForm onSubmit={handleContactSubmit} />
            </ScrollReveal>

            <ScrollReveal direction="right">
              <motion.div className="glass-morphism-gold p-8 rounded-2xl card-3d">
                <h3 className="text-2xl font-bold text-white mb-6">Why Choose Vista Grande?</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary-gold/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-gold font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">Integrity-Driven</h4>
                      <p className="text-white/70">We deliver what we promise — no shortcuts, no surprises.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary-gold/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-gold font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">Customer-Centric</h4>
                      <p className="text-white/70">You're not just a client; you're a partner in our journey.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary-gold/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-gold font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">Innovation-Focused</h4>
                      <p className="text-white/70">We leverage technology to make real estate simple and transparent.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary-gold/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-gold font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">Local Expertise</h4>
                      <p className="text-white/70">Deep roots in Lagos, Ogun, Oyo, and growing across Nigeria.</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-6 border-t border-primary-gold/20">
                  <h4 className="text-white font-semibold mb-4">Follow Us</h4>
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
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </EnhancedSection>

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

      {/* Social Links */}
      <EnhancedSection variant="testimonial">
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
      </EnhancedSection>
    </PageWrapper>
  )
}