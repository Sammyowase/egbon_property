'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface PremiumPageLoaderProps {
  onLoadingComplete: () => void
  show: boolean
  variant?: 'default' | 'minimal'
}

const PremiumPageLoader = ({ 
  onLoadingComplete, 
  show, 
  variant = 'default' 
}: PremiumPageLoaderProps) => {
  const [loadingStage, setLoadingStage] = useState<'initial' | 'logo' | 'progress' | 'complete'>('initial')
  // Type guard function to check if loadingStage is a specific value
  const isLoadingStage = (stage: string, value: string): boolean => stage === value
  const [progress, setProgress] = useState(0)
  const logoRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  
  // Control the loading sequence
  useEffect(() => {
    if (!show) return
    
    // For minimal variant, use faster loading
    if (variant === 'minimal') {
      setLoadingStage('progress')
      
      // Faster progress for page transitions
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval)
            return 100
          }
          return prev + 2.5 // 40 steps * 25ms = 1000ms (1 second)
        })
      }, 25)
      
      // Complete loading after progress finishes
      setTimeout(() => {
        setLoadingStage('complete')
        onLoadingComplete()
      }, 1200) // Shorter time for page transitions
      
      return () => clearInterval(progressInterval)
    } 
    else {
      // Default full loading sequence
      // Start with logo reveal
      setLoadingStage('logo')
      
      // After logo reveal, start progress
      const logoTimer = setTimeout(() => {
        setLoadingStage('progress')
        
        // Play subtle luxury sound
        if (audioRef.current) {
          audioRef.current.volume = 0.4
          audioRef.current.play().catch(console.error)
        }
        
        // Progress animation
        const progressInterval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 100) {
              clearInterval(progressInterval)
              return 100
            }
            return prev + 1
          })
        }, 30) // 3 seconds total (100 steps * 30ms = 3000ms)
        
        // Complete loading after progress finishes
        setTimeout(() => {
          setLoadingStage('complete')
          onLoadingComplete()
        }, 3200) // Give a little extra time after progress completes
        
        return () => clearInterval(progressInterval)
      }, 1500) // Logo reveal time
      
      return () => clearTimeout(logoTimer)
    }
  }, [show, onLoadingComplete, variant])
  
  if (!show) return null
  
  return (
    <AnimatePresence mode="wait">
      {loadingStage !== 'complete' && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: variant === 'minimal' ? 0.4 : 0.8, ease: "easeInOut" }}
        >
          {/* Premium Background */}
          <div className="absolute inset-0 bg-primary-black">
            {/* Background Image with Parallax Effect */}
            <motion.div 
              className="absolute inset-0 z-0"
              initial={{ scale: variant === 'minimal' ? 1.05 : 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: variant === 'minimal' ? 1 : 2 }}
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
            
            {/* Subtle Pattern Overlay */}
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
                backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px'
              }}
            />
          </div>
          
          {/* Animated Gold Particles - Fewer particles for minimal variant */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(variant === 'minimal' ? 15 : 30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${Math.random() * 4 + 1}px`,
                  height: `${Math.random() * 4 + 1}px`,
                  background: i % 3 === 0 
                    ? 'radial-gradient(circle, rgba(212, 175, 55, 0.8), rgba(212, 175, 55, 0.3))' 
                    : i % 3 === 1 
                    ? 'radial-gradient(circle, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.3))' 
                    : 'radial-gradient(circle, rgba(59, 130, 246, 0.6), rgba(59, 130, 246, 0.2))',
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  boxShadow: i % 3 === 0 
                    ? '0 0 4px rgba(212, 175, 55, 0.8)' 
                    : i % 3 === 1 
                    ? '0 0 4px rgba(255, 255, 255, 0.8)' 
                    : '0 0 4px rgba(59, 130, 246, 0.6)'
                }}
                animate={{
                  y: [0, -Math.random() * 100 - 50],
                  x: [0, (Math.random() - 0.5) * 50],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: variant === 'minimal' ? 2 + Math.random() * 2 : 3 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * (variant === 'minimal' ? 2 : 5),
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
          
          {/* Main Content Container */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl px-6">
            {/* Logo Animation - Only for default variant */}
            {variant === 'default' && loadingStage === 'logo' && (
              <motion.div
                ref={logoRef}
                className="mb-16 relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: isLoadingStage(loadingStage, 'progress') ? -40 : 0
                }}
                transition={{ 
                  duration: 1.2, 
                  ease: "easeOut",
                  y: { duration: 0.8, ease: "easeInOut" }
                }}
              >
                {/* Company Logo */}
                <motion.div
                  className="relative flex flex-col items-center"
                  animate={isLoadingStage(loadingStage, 'progress') ? { scale: 0.8 } : { scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.h1 
                    className="text-5xl md:text-7xl font-cormorant font-bold mb-2 text-center"
                    animate={{ 
                      backgroundImage: [
                        'linear-gradient(to right, #D4AF37, #F4D03F, #D4AF37)',
                        'linear-gradient(to right, #F4D03F, #FFFFFF, #F4D03F)',
                        'linear-gradient(to right, #D4AF37, #F4D03F, #D4AF37)'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    style={{ 
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      textShadow: '0 2px 10px rgba(212, 175, 55, 0.3)'
                    }}
                  >
                    Vista Grande
                  </motion.h1>
                  <motion.p 
                    className="text-xl md:text-2xl text-white/80 tracking-widest uppercase"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    Luxury Real Estate
                  </motion.p>
                  
                  {/* Animated Underline */}
                  <motion.div
                    className="h-0.5 bg-gradient-to-r from-transparent via-primary-gold to-transparent mt-4"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: '80%', opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                  />
                </motion.div>
                
                {/* Animated Luxury Emblem */}
                <motion.div
                  className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-24 h-24"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: isLoadingStage(loadingStage, 'logo') ? [0, 1, 0] : 0, 
                    scale: isLoadingStage(loadingStage, 'logo') ? [0, 1.2, 0] : 0,
                    rotate: 90
                  }}
                  transition={{ 
                    duration: 1.5, 
                    ease: "easeInOut",
                    times: [0, 0.7, 1]
                  }}
                >
                  <div className="relative w-full h-full">
                    {/* Diamond shape */}
                    <div className="absolute inset-0 transform rotate-45 bg-gradient-to-br from-primary-gold to-primary-gold-glow opacity-80" />
                    
                    {/* Inner cross */}
                    <div className="absolute inset-4 transform rotate-45 border-2 border-white/40" />
                    
                    {/* Center dot */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
            
            {/* Progress Section */}
            {loadingStage === 'progress' && (
              <motion.div
                className="w-full max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: variant === 'minimal' ? 0.4 : 0.8 }}
              >
                {/* Logo for minimal variant or progress stage */}
                {(variant === 'minimal' || loadingStage === 'progress') && (
                  <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.h2 
                      className={`${variant === 'minimal' ? 'text-3xl md:text-4xl' : 'text-4xl md:text-5xl'} font-cormorant font-bold mb-1 text-center`}
                      animate={{ 
                        backgroundImage: [
                          'linear-gradient(to right, #D4AF37, #F4D03F, #D4AF37)',
                          'linear-gradient(to right, #F4D03F, #FFFFFF, #F4D03F)',
                          'linear-gradient(to right, #D4AF37, #F4D03F, #D4AF37)'
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      style={{ 
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                        textShadow: '0 2px 10px rgba(212, 175, 55, 0.3)'
                      }}
                    >
                      Vista Grande
                    </motion.h2>
                    {variant !== 'minimal' && (
                      <motion.p 
                        className="text-lg text-white/80 tracking-wider uppercase"
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        Luxury Real Estate
                      </motion.p>
                    )}
                  </motion.div>
                )}
                
                {/* Loading Message */}
                <motion.div
                  className="text-center mb-6"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <p className="text-white/80 text-lg font-light">
                    {variant === 'minimal' ? 'Loading your experience...' :
                     progress < 30 ? 'Preparing your luxury experience...' : 
                     progress < 60 ? 'Curating premium properties...' : 
                     progress < 90 ? 'Polishing the final details...' : 
                     'Almost ready...'}
                  </p>
                </motion.div>
                
                {/* Premium Progress Bar */}
                <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                  {/* Progress Fill */}
                  <motion.div
                    className="absolute left-0 top-0 h-full rounded-full"
                    style={{
                      background: 'linear-gradient(to right, #D4AF37, #F4D03F, #FFFFFF, #F4D03F)',
                      backgroundSize: '200% 100%',
                    }}
                    initial={{ width: '0%' }}
                    animate={{ 
                      width: `${progress}%`,
                      backgroundPosition: ['0% 0%', '100% 0%']
                    }}
                    transition={{ 
                      width: { duration: 0.1, ease: "linear" },
                      backgroundPosition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                  />
                  
                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{ width: '50%' }}
                  />
                </div>
                
                {/* Progress Percentage */}
                <motion.div
                  className="flex justify-between items-center mt-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-primary-gold text-sm">Loading</span>
                  <span className="text-primary-gold text-sm font-medium">
                    {Math.round(progress)}%
                  </span>
                </motion.div>
                
                {/* Luxury Loading Indicators - Fewer for minimal variant */}
                <div className="flex justify-center mt-8 space-x-4">
                  {[...Array(variant === 'minimal' ? 3 : 5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-primary-gold"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 1, 0.3],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Hidden Audio Element - Only for default variant */}
          {variant === 'default' && (
            <audio
              ref={audioRef}
              preload="auto"
              className="hidden"
            >
              <source src="/sounds/horse.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PremiumPageLoader