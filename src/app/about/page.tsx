'use client'

import { motion } from 'framer-motion'
import MotionBackground from '@/components/MotionBackground'
import PageWrapper from '@/components/ui/PageWrapper'
import EnhancedSection from '@/components/ui/EnhancedSection'
import { FaLeaf, FaHandshake, FaLightbulb, FaGem, FaUsers, FaChartLine, FaBuilding, FaPlay, FaArrowRight } from 'react-icons/fa'
import { StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal'
import ScrollReveal from '@/components/animations/ScrollReveal'
import Image from 'next/image'
import Link from 'next/link'


export default function AboutPage() {
  
  // Core values data
  const values = [
    {
      icon: FaGem,
      title: 'Integrity',
      description: 'We keep our word, always. Honesty and transparency are the foundation of everything we do.',
      color: 'from-primary-gold to-primary-gold-accent'
    },
    {
      icon: FaLightbulb,
      title: 'Innovation',
      description: 'We embrace smart tech, fresh ideas, and new ways of building for the future.',
      color: 'from-primary-blue-light to-primary-blue-accent'
    },
    {
      icon: FaGem,
      title: 'Excellence',
      description: 'Good isn\'t good enough. We aim for greatness in everything we do.',
      color: 'from-primary-gold to-primary-gold-accent'
    },
    {
      icon: FaLeaf,
      title: 'Sustainability',
      description: 'We build for tomorrow, not just today, with environmentally conscious practices.',
      color: 'from-primary-blue-light to-primary-blue-accent'
    },
    {
      icon: FaUsers,
      title: 'Customer First',
      description: 'Every client is a partner. Your satisfaction is our success.',
      color: 'from-primary-gold to-primary-gold-accent'
    },
  ]

  // Our edge data
  const edges = [
    {
      title: 'Premium Locations',
      description: 'Access to high-potential locations at fair, transparent pricing',
      icon: FaBuilding
    },
    {
      title: 'Smart Design',
      description: 'Smart estate design with a focus on infrastructure, greenery, and lifestyle',
      icon: FaLightbulb
    },
    {
      title: 'Legal Integrity',
      description: 'Strong legal and documentation integrity for peace of mind',
      icon: FaHandshake
    },
    {
      title: 'Local Expertise',
      description: 'Deep community knowledge and cultural insight across Nigeria',
      icon: FaChartLine
    }
  ]

  return (
    <PageWrapper backgroundVariant="minimal">
      
      {/* Hero Section - Who We Are */}
      <motion.section
        className="min-h-screen flex items-center relative pt-32 sm:pt-36 md:pt-40 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/background/black-golden-colored-wallpaper_53876-138191.jpg"
            alt="Background"
            fill
            className="object-cover object-center"
            priority
          />
          
          {/* Overlay with premium gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary-black/70 via-primary-black/50 to-primary-black/80" style={{ zIndex: 2 }} />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-gold/10 via-transparent to-primary-blue-primary/10" style={{ zIndex: 3 }} />
          
          {/* Subtle pattern overlay */}
          <div 
            className="absolute inset-0 opacity-10"
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
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <StaggerContainer className="text-center max-w-5xl mx-auto">
            <StaggerItem>
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-8 leading-tight tracking-tight font-extrabold">
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary-gold via-white/90 to-primary-gold-accent font-cormorant drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] filter-none luxury-heading-shimmer mb-2" style={{textShadow: "0 2px 4px rgba(0,0,0,0.2), 0 0 10px rgba(201,161,77,0.3)"}}>
                    Who We Are
                  </span>
                </h1>
              </motion.div>
            </StaggerItem>

            <StaggerItem>
              <ScrollReveal direction="up" delay={0.3}>
                <p 
                  className="text-xl sm:text-2xl text-white/95 mb-12 font-montserrat font-light tracking-wide max-w-3xl mx-auto"
                  style={{textShadow: "0 2px 4px rgba(0,0,0,0.2)"}}
                >
                  Vista Grande Realty LTD is a bold, innovative real estate company on a mission to redefine how Nigerians experience property ownership and investment.
                </p>
              </ScrollReveal>
            </StaggerItem>

            <StaggerItem>
              <ScrollReveal direction="up" delay={0.5}>
                <p className="text-lg text-white/90 mb-8 leading-relaxed max-w-4xl mx-auto"
                   style={{textShadow: "0 1px 2px rgba(0,0,0,0.3)"}}>
                  Headquartered in Ibadan, we specialize in crafting exceptional developments that blend modern design, environmental consciousness, and lasting value.
                </p>
              </ScrollReveal>
            </StaggerItem>
            
            <StaggerItem>
              <ScrollReveal direction="up" delay={0.7}>
                <motion.div 
                  className="mt-8 inline-block"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link href="/contact" className="px-8 py-4 text-lg rounded-xl font-montserrat font-medium bg-gradient-to-r from-primary-gold to-primary-gold-accent text-primary-black shadow-lg relative overflow-hidden inline-flex items-center group">
                    <span>Get In Touch</span>
                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </Link>
                </motion.div>
              </ScrollReveal>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </motion.section>
      
      {/* Our Story Section with Video */}
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
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          <Image
            src="/background/black-golden-colored-wallpaper_53876-138191.jpg"
            alt="Background"
            fill
            className="object-cover object-center"
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
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-cormorant font-bold mb-6 luxury-gradient-mixed inline-block">
                  Our Story
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-primary-gold to-primary-gold-accent mx-auto rounded-full"></div>
              </motion.div>
              
              <motion.p 
                className="text-xl md:text-2xl text-white/90 mt-8 mb-12 leading-relaxed font-light"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{textShadow: "0 1px 2px rgba(0,0,0,0.3)"}}
              >
                From humble beginnings to becoming a leading real estate developer in Nigeria, our journey has been defined by vision, perseverance, and a commitment to excellence.
              </motion.p>
            </div>
            
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="aspect-video relative glass-morphism rounded-2xl overflow-hidden">
                {/* Gold border animation */}
                <div className="absolute inset-0 border-2 border-primary-gold/30 z-10 pointer-events-none"></div>
                
                {/* YouTube Video Embed */}
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/Ow9JCXaFVL0"
                  title="Vista Grande Realty Story"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                
                {/* Decorative elements */}
                <div className="absolute bottom-6 left-6 flex items-center z-20">
                  <div className="w-2 h-2 bg-primary-gold rounded-full mr-2"></div>
                  <div className="text-primary-gold/80 text-sm">Vista Grande Realty</div>
                </div>
                
                <div className="absolute top-6 right-6 px-3 py-1 bg-primary-gold/20 backdrop-blur-sm rounded-full text-white/90 text-sm border border-primary-gold/30 z-20">
                  Premium
                </div>
                
                {/* Gold corner accents */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary-gold/40 z-20 pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary-gold/40 z-20 pointer-events-none"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Our Vision Section */}
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
          <Image
            src="/background/black-golden-colored-wallpaper_53876-138191.jpg"
            alt="Background"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-black/80 via-primary-black/60 to-primary-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-gold/10 via-transparent to-primary-blue-primary/10" />
        </motion.div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl"
              >
                <div className="relative h-[400px] md:h-[500px] glass-morphism">
                  <Image
                    src="/background/avi-werde-hHz4yrvxwlA-unsplash.jpg"
                    alt="Our Vision"
                    fill
                    className="object-cover object-center hover:scale-105 transition-transform duration-1000"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  
                  {/* Premium overlay with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-black/80 via-primary-black/30 to-primary-black/50" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-gold/20 via-transparent to-primary-blue-light/20 opacity-60" />
                  
                  {/* Decorative elements */}
                  <div className="absolute bottom-6 left-6 flex items-center">
                    <div className="w-2 h-2 bg-primary-gold rounded-full mr-2"></div>
                    <div className="text-primary-gold/80 text-sm">Excellence in Vision</div>
                  </div>
                  
                  {/* Gold corner accents */}
                  <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary-gold/40"></div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary-gold/40"></div>
                </div>
              </motion.div>
            </div>
            
            <div className="order-1 md:order-2">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="p-6 md:p-10"
              >
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-cormorant font-bold mb-6 luxury-gradient-text">
                  Our Vision
                </h2>
                
                <div className="w-20 h-1 bg-gradient-to-r from-primary-gold to-primary-gold-accent rounded-full mb-8"></div>
                
                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed font-light" style={{textShadow: "0 1px 2px rgba(0,0,0,0.3)"}}>
                  To become Africa's most trusted real estate brand by shaping communities that empower people to live better, invest smarter, and dream bigger.
                </p>
                
                {/* Vision highlights */}
                <div className="mt-10">
                  <motion.div 
                    className="flex items-center mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="w-3 h-3 rounded-full bg-primary-gold mr-3"></div>
                    <p className="text-white/90">Creating sustainable communities</p>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div className="w-3 h-3 rounded-full bg-primary-gold mr-3"></div>
                    <p className="text-white/90">Empowering property ownership</p>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <div className="w-3 h-3 rounded-full bg-primary-gold mr-3"></div>
                    <p className="text-white/90">Setting new standards of excellence</p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Our Mission Section */}
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
          <Image
            src="/background/black-golden-colored-wallpaper_53876-138191.jpg"
            alt="Background"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-black/80 via-primary-black/60 to-primary-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-blue-primary/10 via-transparent to-primary-gold/10" />
        </motion.div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="p-6 md:p-10"
              >
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-cormorant font-bold mb-6 luxury-gradient-blue">
                  Our Mission
                </h2>
                
                <div className="w-20 h-1 bg-gradient-to-r from-primary-blue-light to-primary-blue-accent rounded-full mb-8"></div>
                
                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed font-light" style={{textShadow: "0 1px 2px rgba(0,0,0,0.3)"}}>
                  To deliver premium, future-ready real estate solutions through integrity, innovation, and excellence — one development at a time.
                </p>
                
                {/* Mission highlights */}
                <div className="mt-10">
                  <motion.div 
                    className="flex items-center mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="w-3 h-3 rounded-full bg-primary-blue-light mr-3"></div>
                    <p className="text-white/90">Delivering exceptional quality</p>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div className="w-3 h-3 rounded-full bg-primary-blue-light mr-3"></div>
                    <p className="text-white/90">Building with integrity and transparency</p>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <div className="w-3 h-3 rounded-full bg-primary-blue-light mr-3"></div>
                    <p className="text-white/90">Innovating for the future</p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
            
            <div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl"
              >
                <div className="relative h-[400px] md:h-[500px] glass-morphism">
                  <Image
                    src="/background/brian-babb-XbwHrt87mQ0-unsplash.jpg"
                    alt="Our Mission"
                    fill
                    className="object-cover object-center hover:scale-105 transition-transform duration-1000"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  
                  {/* Premium overlay with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-black/80 via-primary-black/30 to-primary-black/50" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-blue-light/20 via-transparent to-primary-gold/20 opacity-60" />
                  
                  {/* Decorative elements */}
                  <div className="absolute bottom-6 right-6 flex items-center">
                    <div className="text-primary-blue-light/80 text-sm">Driven by Purpose</div>
                    <div className="w-2 h-2 bg-primary-blue-light rounded-full ml-2"></div>
                  </div>
                  
                  {/* Blue corner accents */}
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-primary-blue-light/40"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-primary-blue-light/40"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Our Core Values Section */}
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
          <Image
            src="/background/black-golden-colored-wallpaper_53876-138191.jpg"
            alt="Background"
            fill
            className="object-cover object-center"
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
              Our Core Values
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary-gold via-white/30 to-primary-blue-light mx-auto rounded-full"></div>
            <p className="text-xl text-white/90 mt-8 max-w-3xl mx-auto" style={{textShadow: "0 1px 2px rgba(0,0,0,0.3)"}}>
              These principles guide every decision we make and every property we develop
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="glass-morphism-gold p-8 md:p-10 rounded-2xl text-center group relative overflow-hidden h-full shadow-xl"
              >
                {/* Animated background elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-gold/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-blue-light/5 rounded-full translate-y-12 -translate-x-12 group-hover:scale-150 transition-transform duration-700" />
                
                {/* Gold corner accents that appear on hover */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-primary-gold/0 group-hover:border-primary-gold/40 transition-all duration-500"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-primary-gold/0 group-hover:border-primary-gold/40 transition-all duration-500"></div>
                
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="text-primary-gold text-5xl mb-8 mx-auto relative z-10 w-20 h-20 flex items-center justify-center"
                >
                  <value.icon />
                  
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
                
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:luxury-gradient-text transition-all duration-300 relative z-10 font-cormorant">
                  {value.title}
                </h3>
                
                <p className="text-white/80 leading-relaxed relative z-10 text-lg">
                  {value.description}
                </p>
                
                <motion.div
                  className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r ${value.color} rounded-full`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Our Approach Section */}
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
          <Image
            src="/background/black-golden-colored-wallpaper_53876-138191.jpg"
            alt="Background"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-black/80 via-primary-black/60 to-primary-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-gold/10 via-transparent to-primary-blue-primary/10" />
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
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-cormorant font-bold mb-6 luxury-gradient-text inline-block">
                Our Approach
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-primary-gold to-primary-gold-accent mx-auto rounded-full"></div>
              <p className="text-xl text-white/90 mt-8 max-w-3xl mx-auto" style={{textShadow: "0 1px 2px rgba(0,0,0,0.3)"}}>
                Whether you're buying your first plot, expanding your property portfolio, or developing a commercial project, we provide expert guidance, transparency, and unmatched service every step of the way.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="relative aspect-video glass-morphism">
                <Image
                  src="/background/webaliser-_TPTXZd9mOo-unsplash.jpg"
                  alt="Our Approach"
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-1000"
                  sizes="(max-width: 768px) 100vw, 100vw"
                />
                
                {/* Premium overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-black/80 via-primary-black/30 to-primary-black/50" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-gold/20 via-transparent to-primary-blue-light/20 opacity-60" />
                
                {/* Approach steps overlay */}
                <div className="absolute inset-0 flex flex-col justify-center items-center p-6 md:p-10">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 w-full max-w-4xl">
                    <motion.div 
                      className="glass-morphism-gold p-6 rounded-xl text-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      whileHover={{ y: -5, transition: { duration: 0.3 } }}
                    >
                      <div className="w-12 h-12 rounded-full bg-primary-gold flex items-center justify-center text-primary-black text-xl font-bold mx-auto mb-4">1</div>
                      <h3 className="text-white text-lg font-bold mb-2">Consultation</h3>
                      <p className="text-white/80 text-sm">Understanding your unique needs and vision</p>
                    </motion.div>
                    
                    <motion.div 
                      className="glass-morphism-gold p-6 rounded-xl text-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      whileHover={{ y: -5, transition: { duration: 0.3 } }}
                    >
                      <div className="w-12 h-12 rounded-full bg-primary-gold flex items-center justify-center text-primary-black text-xl font-bold mx-auto mb-4">2</div>
                      <h3 className="text-white text-lg font-bold mb-2">Customization</h3>
                      <p className="text-white/80 text-sm">Tailoring solutions to match your requirements</p>
                    </motion.div>
                    
                    <motion.div 
                      className="glass-morphism-gold p-6 rounded-xl text-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      whileHover={{ y: -5, transition: { duration: 0.3 } }}
                    >
                      <div className="w-12 h-12 rounded-full bg-primary-gold flex items-center justify-center text-primary-black text-xl font-bold mx-auto mb-4">3</div>
                      <h3 className="text-white text-lg font-bold mb-2">Execution</h3>
                      <p className="text-white/80 text-sm">Delivering excellence with transparency and integrity</p>
                    </motion.div>
                  </div>
                </div>
                
                {/* Gold corner accents */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary-gold/40"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary-gold/40"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Our Edge Section */}
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
          <Image
            src="/background/black-golden-colored-wallpaper_53876-138191.jpg"
            alt="Background"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-black/80 via-primary-black/60 to-primary-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-blue-primary/10 via-transparent to-primary-gold/10" />
          
          {/* Subtle pattern overlay */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(45deg, rgba(59, 130, 246, 0.05) 25%, transparent 25%),
                linear-gradient(-45deg, rgba(59, 130, 246, 0.05) 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, rgba(212, 175, 55, 0.1) 75%),
                linear-gradient(-45deg, transparent 75%, rgba(212, 175, 55, 0.1) 75%)
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
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-cormorant font-bold mb-6 luxury-gradient-blue inline-block">
              Our Edge
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary-blue-light to-primary-blue-accent mx-auto rounded-full"></div>
            <p className="text-xl text-white/90 mt-8 max-w-3xl mx-auto" style={{textShadow: "0 1px 2px rgba(0,0,0,0.3)"}}>
              What sets Vista Grande Realty apart from the competition
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {edges.map((edge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  y: -5,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className={`glass-morphism-${index % 2 === 0 ? 'gold' : 'blue'} p-8 md:p-10 rounded-2xl group relative overflow-hidden shadow-xl`}
              >
                {/* Animated background elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-gold/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700 opacity-50" />
                
                {/* Corner accents that appear on hover */}
                <div className={`absolute top-0 left-0 w-12 h-12 border-t border-l border-${index % 2 === 0 ? 'primary-gold' : 'primary-blue-light'}/0 group-hover:border-${index % 2 === 0 ? 'primary-gold' : 'primary-blue-light'}/40 transition-all duration-500`}></div>
                <div className={`absolute bottom-0 right-0 w-12 h-12 border-b border-r border-${index % 2 === 0 ? 'primary-gold' : 'primary-blue-light'}/0 group-hover:border-${index % 2 === 0 ? 'primary-gold' : 'primary-blue-light'}/40 transition-all duration-500`}></div>
                
                <div className="flex items-start gap-6">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`text-${index % 2 === 0 ? 'primary-gold' : 'primary-blue-light'} text-4xl md:text-5xl flex-shrink-0 mt-1`}
                  >
                    <edge.icon />
                    
                    {/* Animated glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={{
                        boxShadow: [
                          `0 0 0px rgba(${index % 2 === 0 ? '212, 175, 55' : '59, 130, 246'}, 0)`,
                          `0 0 15px rgba(${index % 2 === 0 ? '212, 175, 55' : '59, 130, 246'}, 0.3)`,
                          `0 0 0px rgba(${index % 2 === 0 ? '212, 175, 55' : '59, 130, 246'}, 0)`
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                  
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white font-cormorant">
                      {edge.title}
                    </h3>
                    <p className="text-white/80 leading-relaxed text-lg">
                      {edge.description}
                    </p>
                    
                    {/* Animated underline */}
                    <motion.div
                      className={`mt-4 h-0.5 bg-${index % 2 === 0 ? 'primary-gold' : 'primary-blue-light'}/40 rounded-full w-0 group-hover:w-full transition-all duration-700`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Join Our Journey Section */}
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
          <Image
            src="/background/black-golden-colored-wallpaper_53876-138191.jpg"
            alt="Background"
            fill
            className="object-cover object-center"
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
                Join Our Journey
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-primary-gold via-white/30 to-primary-blue-light mx-auto rounded-full"></div>
            </motion.div>
            
            <div className="glass-morphism-gold p-10 md:p-16 rounded-2xl shadow-2xl relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-primary-gold/40"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-primary-gold/40"></div>
              
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary-gold/5 rounded-full -translate-y-20 translate-x-20"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary-blue-light/5 rounded-full translate-y-20 -translate-x-20"></div>
              
              <div className="relative z-10 text-center">
                <motion.p 
                  className="text-3xl md:text-4xl text-white/90 mb-6 font-light font-cormorant"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  style={{textShadow: "0 2px 4px rgba(0,0,0,0.3)"}}
                >
                  From Ibadan to the world.
                </motion.p>
                
                <motion.p 
                  className="text-xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  style={{textShadow: "0 1px 2px rgba(0,0,0,0.3)"}}
                >
                  Vista Grande Realty LTD is more than a real estate company — we are a movement for better living, responsible investing, and visionary development.
                </motion.p>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-6 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <motion.a
                    href="/contact"
                    className="px-8 py-4 text-lg rounded-xl font-montserrat font-medium bg-gradient-to-r from-primary-gold to-primary-gold-accent text-primary-black shadow-lg relative overflow-hidden inline-flex items-center group"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(201,161,77,0.5)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Contact Us</span>
                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </motion.a>
                  
                  <motion.a
                    href="/portfolio"
                    className="px-8 py-4 text-lg rounded-xl font-montserrat font-medium border-2 border-primary-blue-light text-primary-blue-light bg-transparent relative overflow-hidden inline-flex items-center group"
                    whileHover={{ 
                      scale: 1.05,
                      borderColor: "#5e9ed6",
                      color: "#5e9ed6"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Explore Projects</span>
                    <FaArrowRight className="ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </motion.a>
                </motion.div>
              </div>
            </div>
            
            {/* Decorative quote */}
            <motion.div
              className="mt-16 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <p className="text-2xl md:text-3xl font-cormorant text-white/80 italic" style={{textShadow: "0 2px 4px rgba(0,0,0,0.3)"}}>
                "Building not just properties, but legacies."
              </p>
              <div className="w-16 h-0.5 bg-primary-gold/50 mx-auto mt-6"></div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </PageWrapper>
  )
}