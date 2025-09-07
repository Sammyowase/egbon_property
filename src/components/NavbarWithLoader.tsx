'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { FiMenu, FiX, FiPhone, FiMail } from 'react-icons/fi'
import { FaChevronDown, FaMapMarkerAlt, FaBuilding, FaSeedling, FaHammer, FaNewspaper, FaUsers, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import PremiumLink from './ui/PremiumLink'

const MotionVideo = motion.video;
const NavbarWithLoader = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [portfolioOpen, setPortfolioOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const portfolioLinks = [
    { name: 'Land Development', href: '/portfolio/land', icon: <FaMapMarkerAlt className="w-4 h-4" />, description: 'Prime land for development' },
    { name: 'Construction', href: '/portfolio/construction', icon: <FaHammer className="w-4 h-4" />, description: 'Modern construction projects' },
    { name: 'Agriculture', href: '/portfolio/agriculture', icon: <FaSeedling className="w-4 h-4" />, description: 'Agricultural investments' },
    { name: 'Commercial', href: '/portfolio/commercial', icon: <FaBuilding className="w-4 h-4" />, description: 'Commercial properties' }
  ]

  const navLinks = [
    { name: 'Home', href: '/', icon: null },
    { name: 'About Us', href: '/about', icon: <FaUsers className="w-4 h-4" /> },
    { name: 'Portfolio', href: '#', icon: null },
    { name: 'Investment', href: '/investment', icon: <FaHammer className="w-4 h-4" /> },
    { name: 'Blog', href: '/news', icon: <FaNewspaper className="w-4 h-4" /> },
    { name: 'Loader Test', href: '/loader-test', icon: null },
  ]

  return (
    <>
      {/* Top Contact Bar */}
      <motion.div 
        className={`fixed w-full z-40 transition-all duration-300 ${
          isScrolled ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isScrolled ? 0 : 1, y: isScrolled ? -20 : 0 }}
      >
        <div className="bg-primary-black/80 backdrop-blur-sm border-b border-primary-gold/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 sm:py-0 sm:h-12 text-sm">
              {/* Contact Info - Full width on mobile, left side on larger screens */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-0 sm:space-x-6 text-white/80 mb-2 sm:mb-0">
                <motion.div 
                  className="flex items-center space-x-2 hover:text-primary-gold transition-colors cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <FiPhone className="w-3 h-3" />
                  <span className="text-xs sm:text-sm">+234 (0) 123 456 7890</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-2 hover:text-primary-gold transition-colors cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <FiMail className="w-3 h-3" />
                  <span className="text-xs sm:text-sm">info@vistagrande.com</span>
                </motion.div>
              </div>
              
              {/* Social Media - Full width on mobile, right side on larger screens */}
              <div className="flex items-center space-x-3 sm:space-x-4">
                <span className="text-xs sm:text-sm text-white/60">Follow us:</span>
                <div className="flex space-x-2 sm:space-x-3">
                  {[
                    { name: 'Facebook', icon: <FaFacebookF size={12} className="sm:text-sm" /> },
                    { name: 'Twitter', icon: <FaTwitter size={12} className="sm:text-sm" /> },
                    { name: 'Instagram', icon: <FaInstagram size={12} className="sm:text-sm" /> },
                    { name: 'LinkedIn', icon: <FaLinkedinIn size={12} className="sm:text-sm" /> }
                  ].map((social, index) => (
                    <motion.a
                      key={social.name}
                      href="#"
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary-gold/20 flex items-center justify-center text-primary-gold hover:bg-primary-gold hover:text-primary-black transition-all duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-primary-black/95 backdrop-blur-lg shadow-luxury border-b border-primary-gold/10' 
            : 'bg-transparent'
        }`}
        style={{ top: isScrolled ? '0' : '48px' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <PremiumLink href="/" className="flex-shrink-0">
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="absolute inset-0 bg-primary-gold/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <Image
                  src="/logo/Vistagrand White@1x.png"
                  alt="Vista Grande Realty LTD - Luxury Real Estate"
                  width={240}
                  height={96}
                  className="h-14 w-auto md:h-16 object-contain relative z-10"
                  priority
                  style={{
                    filter: 'drop-shadow(0 2px 8px rgba(201, 161, 77, 0.4))'
                  }}
                />
              </motion.div>
            </PremiumLink>


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.name === 'Portfolio' ? (
                <motion.div
                  key={link.name}
                  className="relative portfolio-dropdown group"
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <motion.div 
                    className="relative py-2 px-1 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <span className={`transition-all duration-300 flex items-center space-x-2 ${
                      portfolioLinks.some(item => pathname === item.href)
                        ? 'text-primary-gold' 
                        : 'text-white group-hover:text-primary-gold'
                    }`}>
                      <span className="text-base font-semibold tracking-wide">Portfolio</span>
                      <motion.span
                        variants={{
                          hover: { rotate: 180 },
                          rest: { rotate: 0 }
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <FaChevronDown className="w-3 h-3" />
                      </motion.span>
                    </span>
                    <motion.div
                      className="absolute -bottom-0.5 left-0 h-0.5 bg-primary-gold transform origin-left"
                      variants={{
                        hover: { width: "100%", opacity: 1 },
                        rest: { width: portfolioLinks.some(item => pathname === item.href) ? "100%" : "0%", opacity: portfolioLinks.some(item => pathname === item.href) ? 1 : 0 }
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>

                  <motion.div
                    variants={{
                      hover: { 
                        opacity: 1, 
                        y: 0,
                        scale: 1,
                        visibility: "visible",
                        transition: {
                          duration: 0.2,
                          ease: "easeOut"
                        }
                      },
                      rest: { 
                        opacity: 0, 
                        y: 10,
                        scale: 0.95,
                        visibility: "hidden",
                        transitionEnd: {
                          visibility: "hidden"
                        },
                        transition: {
                          duration: 0.15,
                          ease: "easeIn"
                        }
                      }
                    }}
                    className="absolute left-0 mt-2 w-48 rounded-lg shadow-lg bg-primary-black/95 backdrop-blur-md border border-primary-gold/10 z-50"
                    style={{ 
                      pointerEvents: "auto",
                      transformOrigin: "top"
                    }}
                  >
                    <motion.div 
                      className="py-3"
                      variants={{
                        hover: {
                          transition: {
                            staggerChildren: 0.05
                          }
                        }
                      }}
                    >
                      {portfolioLinks.map((item, index) => (
                        <motion.div
                          key={item.name}
                          variants={{
                            hover: { opacity: 1, x: 0 },
                            rest: { opacity: 0, x: -10 }
                          }}
                        >
                          <PremiumLink
                            href={item.href}
                            className={`block px-4 py-3 text-white hover:bg-primary-gold/10 hover:text-primary-gold transition-all duration-300 relative group rounded-lg mx-2 ${
                              pathname === item.href ? 'text-primary-gold bg-primary-gold/5' : ''
                            }`}
                          >
                            <motion.div
                              className="relative z-10"
                              whileHover={{ x: 4 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="flex items-center space-x-3">
                                <motion.div
                                  className="text-primary-gold"
                                  whileHover={{ scale: 1.1, rotate: 5 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  {item.icon}
                                </motion.div>
                                <div className="flex-1">
                                  <div className="font-semibold text-base">{item.name}</div>
                                  <div className="text-xs text-white/60 group-hover:text-primary-gold/80 transition-colors">
                                    {item.description}
                                  </div>
                                </div>
                                <motion.span
                                  variants={{
                                    hover: { opacity: 1, x: 0 },
                                    rest: { opacity: 0, x: -10 }
                                  }}
                                  transition={{ delay: 0.1 }}
                                  className="text-primary-gold group-hover:opacity-100"
                                >
                                  →
                                </motion.span>
                              </div>
                            </motion.div>
                          </PremiumLink>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key={link.name}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <PremiumLink
                    href={link.href}
                    className={`relative py-3 px-4 group transition-all duration-300 flex items-center space-x-2 rounded-lg ${
                      pathname === link.href ? 'text-primary-gold bg-primary-gold/5' : 'text-white hover:text-primary-gold hover:bg-primary-gold/5'
                    }`}
                  >
                    {link.icon && (
                      <motion.span
                        className="text-primary-gold"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {link.icon}
                      </motion.span>
                    )}
                    <span className="text-base font-semibold tracking-wide">{link.name}</span>
                    <motion.div
                      className="absolute -bottom-0.5 left-0 h-0.5 bg-primary-gold transform origin-left"
                      initial={{ width: pathname === link.href ? "100%" : "0%", opacity: pathname === link.href ? 1 : 0 }}
                      whileHover={{ width: "100%", opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </PremiumLink>
                </motion.div>
              )
            ))}
          </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-primary-gold focus:outline-none"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <FiX className="block h-6 w-6" />
                ) : (
                  <FiMenu className="block h-6 w-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden bg-primary-black/95 backdrop-blur-lg border-t border-primary-gold/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navLinks.map((link) => (
                  link.name === 'Portfolio' ? (
                    <div key={link.name}>
                      <motion.button
                        onClick={() => setPortfolioOpen(!portfolioOpen)}
                        className={`w-full text-left px-3 py-3 rounded-md text-base font-medium flex justify-between items-center ${
                          portfolioLinks.some(item => pathname === item.href)
                            ? 'text-primary-gold bg-primary-gold/5'
                            : 'text-white hover:text-primary-gold hover:bg-primary-gold/5'
                        }`}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>Portfolio</span>
                        <motion.span
                          animate={{ rotate: portfolioOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FaChevronDown className="w-3 h-3" />
                        </motion.span>
                      </motion.button>
                      
                      <AnimatePresence>
                        {portfolioOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="pl-4 space-y-1 mt-1"
                          >
                            {portfolioLinks.map((item) => (
                              <motion.div
                                key={item.name}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <PremiumLink
                                  href={item.href}
                                  className={`px-3 py-2 rounded-md text-base font-medium flex items-center space-x-3 ${
                                    pathname === item.href
                                      ? 'text-primary-gold bg-primary-gold/5'
                                      : 'text-white hover:text-primary-gold hover:bg-primary-gold/5'
                                  }`}
                                  onClick={() => setIsOpen(false)}
                                >
                                  <span className="text-primary-gold">{item.icon}</span>
                                  <span>{item.name}</span>
                                </PremiumLink>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <motion.div
                      key={link.name}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <PremiumLink
                        href={link.href}
                        className={`px-3 py-3 rounded-md text-base font-medium flex items-center space-x-3 ${
                          pathname === link.href
                            ? 'text-primary-gold bg-primary-gold/5'
                            : 'text-white hover:text-primary-gold hover:bg-primary-gold/5'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.icon && <span className="text-primary-gold">{link.icon}</span>}
                        <span>{link.name}</span>
                      </PremiumLink>
                    </motion.div>
                  )
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}

export default NavbarWithLoader