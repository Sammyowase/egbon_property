'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { FaHome, FaBuilding, FaPhone, FaArrowLeft, FaSearch } from 'react-icons/fa'
import MotionBackground from '@/components/MotionBackground'
import LuxuryCard from '@/components/ui/LuxuryCard'
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal'
import MagneticButton from '@/components/animations/MagneticButton'
import { BackgroundParticles } from '@/components/animations/FloatingElements'

export default function NotFound() {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Show content after a brief delay
    const timer = setTimeout(() => setShowContent(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const numberVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 0.8
      }
    }
  }

  const navigationOptions = [
    {
      icon: <FaHome />,
      title: "Go Home",
      description: "Return to our homepage",
      href: "/",
      color: "from-primary-gold to-primary-gold-accent"
    },
    {
      icon: <FaBuilding />,
      title: "View Properties",
      description: "Browse our luxury listings",
      href: "/portfolio/property",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <FaPhone />,
      title: "Contact Us",
      description: "Get in touch with our team",
      href: "/contact",
      color: "from-green-500 to-green-600"
    }
  ]



  return (
    <>
      <MotionBackground />

      <motion.div
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <BackgroundParticles />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
                
                {/* 404 Number Display */}
                <motion.div
                  className="mb-8"
                  variants={numberVariants}
                  initial="hidden"
                  animate={showContent ? "visible" : "hidden"}
                >
                  <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-bold luxury-gradient-text leading-none">
                    404
                  </h1>
                </motion.div>

                {/* Error Message */}
                <ScrollReveal direction="up" delay={0.3}>
                  <div className="mb-12">
                    <h2 className="heading-display mb-6 text-white">
                      Page Not Found
                    </h2>
                    <p className="body-luxury text-white/90 mb-4 max-w-2xl mx-auto">
                      We're sorry, but the page you're looking for seems to have moved or doesn't exist.
                    </p>
                    <p className="text-lg text-white/80 max-w-xl mx-auto">
                      Don't worry though - our luxury properties and exceptional service are still here waiting for you.
                    </p>
                  </div>
                </ScrollReveal>

                {/* Navigation Options */}
                <ScrollReveal direction="up" delay={0.6}>
                  <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {navigationOptions.map((option, index) => (
                      <StaggerItem key={index}>
                        <Link href={option.href}>
                          <LuxuryCard
                            variant="glass"
                            hover={true}
                            className="p-6 text-center h-full cursor-pointer group"
                          >
                            <motion.div
                              className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${option.color} flex items-center justify-center text-white text-xl`}
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              {option.icon}
                            </motion.div>
                            <h3 className="text-white font-bold text-lg mb-2 group-hover:text-primary-gold transition-colors">
                              {option.title}
                            </h3>
                            <p className="text-white/70 text-sm">
                              {option.description}
                            </p>
                          </LuxuryCard>
                        </Link>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </ScrollReveal>

                {/* Action Buttons */}
                <ScrollReveal direction="up" delay={0.9}>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link href="/">
                      <MagneticButton
                        className="btn-primary px-8 py-4 text-lg rounded-lg font-semibold bg-gradient-to-r from-primary-gold to-primary-gold-accent text-primary-black shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
                        strength={0.3}
                      >
                        <FaArrowLeft />
                        Back to Home
                      </MagneticButton>
                    </Link>
                    
                    <Link href="/portfolio/property">
                      <MagneticButton
                        className="btn-outline px-8 py-4 text-lg rounded-lg font-semibold border-2 border-primary-gold text-primary-gold hover:bg-primary-gold hover:text-primary-black transition-all duration-300 flex items-center gap-3"
                        strength={0.2}
                      >
                        <FaSearch />
                        Browse Properties
                      </MagneticButton>
                    </Link>
                  </div>
                </ScrollReveal>

                {/* Vista Grande Branding */}
                <ScrollReveal direction="up" delay={1.2}>
                  <div className="mt-16 pt-8 border-t border-primary-gold/20">
                    <motion.div
                      className="flex items-center justify-center mb-4"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Image
                        src="/logo/Vistagrand White@1x.png"
                        alt="Vista Grande Realty LTD - Luxury Real Estate"
                        width={140}
                        height={46}
                        className="h-8 w-auto object-contain"
                        style={{
                          filter: 'drop-shadow(0 2px 8px rgba(234, 179, 8, 0.3))'
                        }}
                      />
                    </motion.div>
                    <p className="text-white/60 text-sm">
                      Where Vision Meets Value
                    </p>
                  </div>
                </ScrollReveal>
            </div>
          </div>
        </motion.div>
      </>
    )
  }
