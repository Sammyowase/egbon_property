'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { FiMenu, FiX } from 'react-icons/fi'
import { FaChevronDown } from 'react-icons/fa'

const Navbar = () => {
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
    { name: 'Land', href: '/portfolio/land' },
    { name: 'Construction', href: '/portfolio/construction' },
    { name: 'Agriculture', href: '/portfolio/agriculture' },
    { name: 'Farmland', href: '/portfolio/farmland' }
  ]

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Portfolio', href: '#' },
    { name: 'News', href: '/news' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-primary-black/90 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex-shrink-0">
            <motion.h1 
              className="text-primary-gold text-2xl font-bold"
              whileHover={{ scale: 1.05 }}
            >
              VISTA GRAND
            </motion.h1>
          </Link>

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
                      <span>Portfolio</span>
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
                      className="py-2"
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
                          <Link
                            href={item.href}
                            className={`block px-4 py-2.5 text-white hover:bg-primary-gold/10 hover:text-primary-gold transition-all duration-300 relative group ${
                              pathname === item.href ? 'text-primary-gold bg-primary-gold/5' : ''
                            }`}
                          >
                            <motion.span
                              className="relative z-10 flex items-center justify-between"
                              whileHover={{ x: 4 }}
                              transition={{ duration: 0.2 }}
                            >
                              {item.name}
                              <motion.span
                                variants={{
                                  hover: { opacity: 1, x: 0 },
                                  rest: { opacity: 0, x: -10 }
                                }}
                                transition={{ delay: 0.1 }}
                                className="group-hover:opacity-100"
                              >
                                →
                              </motion.span>
                            </motion.span>
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative py-2 px-1 group transition-all duration-300 ${
                    pathname === link.href ? 'text-primary-gold' : 'text-white hover:text-primary-gold'
                  }`}
                >
                  {link.name}
                  <div className={`absolute -bottom-0.5 left-0 h-0.5 bg-primary-gold transform origin-left transition-all duration-300 ${
                    pathname === link.href
                      ? 'w-full opacity-100'
                      : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                  }`} />
                  <div className={`absolute inset-0 bg-primary-gold/5 rounded-md transition-opacity duration-300 ${
                    pathname === link.href ? 'opacity-100' : 'opacity-0'
                  }`} />
                </Link>
              )
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-primary-gold transition-colors"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary-black/90 backdrop-blur-sm"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                link.name !== 'Portfolio' && (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`block px-3 py-2 relative group overflow-hidden ${
                      pathname === link.href 
                        ? 'text-primary-gold bg-primary-gold/5' 
                        : 'text-white hover:text-primary-gold hover:bg-primary-gold/5'
                    } transition-all duration-300`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                    <div className={`absolute bottom-0 left-0 h-0.5 bg-primary-gold transform origin-left transition-all duration-300 ${
                      pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                  </Link>
                )
              ))}
              
              {/* Portfolio links in mobile menu */}
              <div className="px-3 py-2">
                <div className="font-medium text-white mb-2">Portfolio</div>
                {portfolioLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block pl-4 py-2 relative group overflow-hidden ${
                      pathname === item.href 
                        ? 'text-primary-gold bg-primary-gold/5' 
                        : 'text-white hover:text-primary-gold hover:bg-primary-gold/5'
                    } transition-all duration-300`}
                    onClick={() => {
                      setIsOpen(false)
                      setPortfolioOpen(false)
                    }}
                  >
                    {item.name}
                    <div className={`absolute bottom-0 left-0 h-0.5 bg-primary-gold transform origin-left transition-all duration-300 ${
                      pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar 