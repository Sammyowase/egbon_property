'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ElegantLoaderProps {
  onLoadingComplete: () => void
  show: boolean
}

const ElegantLoader = ({ onLoadingComplete, show }: ElegantLoaderProps) => {
  const [loadingStage, setLoadingStage] = useState<'video' | 'sound' | 'complete'>('video')
  const [progress, setProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (!show) return

    const timer = setTimeout(() => {
      // Start the loading sequence
      if (videoRef.current) {
        videoRef.current.play().catch(console.error)
        
        // Progress animation
        const progressInterval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 100) {
              clearInterval(progressInterval)
              return 100
            }
            return prev + 2
          })
        }, 60) // 3 seconds total (100 / 2 = 50 intervals * 60ms = 3000ms)

        // After 3 seconds, play horse sound and complete
        setTimeout(() => {
          setLoadingStage('sound')
          if (audioRef.current) {
            audioRef.current.play().catch(console.error)
          }
          
          // Complete loading after sound starts
          setTimeout(() => {
            setLoadingStage('complete')
            onLoadingComplete()
          }, 1000) // Give 1 second for sound to start
        }, 3000)
      }
    }, 100) // Small delay to ensure component is mounted

    return () => clearTimeout(timer)
  }, [show, onLoadingComplete])

  if (!show) return null

  return (
    <AnimatePresence>
      {loadingStage !== 'complete' && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-primary-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background Video */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="relative w-full h-full max-w-4xl max-h-4xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <video
                ref={videoRef}
                className="w-full h-full object-contain"
                muted
                playsInline
                preload="auto"
              >
                <source src="/nav/vistagrande.MP4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Elegant overlay effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-black/20 via-transparent to-primary-black/20 pointer-events-none" />
              
              {/* Animated border */}
              <motion.div
                className="absolute inset-0 border-2 border-primary-gold/30 rounded-2xl"
                initial={{ borderColor: 'rgba(201, 161, 77, 0)' }}
                animate={{ 
                  borderColor: ['rgba(201, 161, 77, 0.3)', 'rgba(201, 161, 77, 0.8)', 'rgba(201, 161, 77, 0.3)']
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-80">
            <motion.div
              className="mb-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-primary-gold mb-2">
                Vista Grande Realty
              </h2>
              <p className="text-white/70 text-sm">
                {loadingStage === 'video' ? 'Preparing your luxury experience...' : 'Almost ready...'}
              </p>
            </motion.div>

            {/* Progress Bar Container */}
            <motion.div
              className="relative h-2 bg-primary-black/50 rounded-full overflow-hidden border border-primary-gold/20"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              {/* Progress Fill */}
              <motion.div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary-gold to-primary-gold-glow rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "easeOut" }}
              />
              
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ width: '50%' }}
              />
            </motion.div>

            {/* Progress Percentage */}
            <motion.div
              className="text-center mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <span className="text-primary-gold font-medium text-sm">
                {Math.round(progress)}%
              </span>
            </motion.div>
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute rounded-full ${
                  i % 3 === 0 
                    ? 'w-2 h-2 bg-primary-gold/30' 
                    : i % 3 === 1 
                    ? 'w-1.5 h-1.5 bg-primary-gold/20' 
                    : 'w-1 h-1 bg-white/20'
                }`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  x: [0, Math.random() * 50 - 25, 0],
                  opacity: [0, 0.8, 0],
                  scale: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Sound Stage Indicator */}
          {loadingStage === 'sound' && (
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <div className="flex items-center space-x-3 bg-primary-black/80 backdrop-blur-lg rounded-2xl px-6 py-4 border border-primary-gold/30">
                <motion.div
                  className="w-3 h-3 bg-primary-gold rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
                <span className="text-white font-medium">Initializing audio experience...</span>
              </div>
            </motion.div>
          )}

          {/* Hidden Audio Element */}
          <audio
            ref={audioRef}
            preload="auto"
            className="hidden"
          >
            <source src="/sounds/horse.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ElegantLoader