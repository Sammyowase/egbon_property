'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa'

export default function AudioBackground() {
  const [hasInteracted, setHasInteracted] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('/sounds/horse.mp3')
    const audio = audioRef.current
    
    // Try to autoplay
    const attemptAutoplay = async () => {
      try {
        audio.volume = 1.0
        await audio.play()
        setHasInteracted(true)
      } catch (error) {
        // If autoplay fails, wait for first click
        const handleFirstClick = () => {
          if (!isMuted && audioRef.current) {
            audioRef.current.volume = 1.0
            audioRef.current.play()
          }
          setHasInteracted(true)
          document.removeEventListener('click', handleFirstClick)
        }

        document.addEventListener('click', handleFirstClick)
      }
    }

    attemptAutoplay()

    // Cleanup
    return () => {
      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }
    }
  }, [isMuted])

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent this click from triggering the document click
    setIsMuted(!isMuted)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-4"
      >
        <motion.button
          onClick={toggleMute}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary-black/80 p-3 rounded-full border border-primary-gold/20 text-primary-gold hover:bg-primary-gold/20 transition-colors"
        >
          {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
        </motion.button>
        {!hasInteracted && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-primary-black/80 px-4 py-2 rounded-full border border-primary-gold/20 text-white/70 text-sm flex items-center gap-2"
          >
            <span className="w-2 h-2 bg-primary-gold rounded-full animate-pulse" />
            Click anywhere for ambiance
          </motion.div>
        )}
      </motion.div>
    </>
  )
} 