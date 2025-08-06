'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, CheckCircle } from 'lucide-react'

interface FloatingTextareaProps {
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  success?: boolean
  required?: boolean
  disabled?: boolean
  placeholder?: string
  rows?: number
  maxLength?: number
  className?: string
}

const FloatingTextarea = ({
  label,
  value,
  onChange,
  error,
  success = false,
  required = false,
  disabled = false,
  placeholder,
  rows = 4,
  maxLength,
  className = ''
}: FloatingTextareaProps) => {
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const isFloating = isFocused || value.length > 0

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  const getBorderColor = () => {
    if (error) return 'border-primary-error'
    if (success) return 'border-primary-success'
    if (isFocused) return 'border-primary-gold'
    return 'border-white/20'
  }

  const getLabelColor = () => {
    if (error) return 'text-primary-error'
    if (success) return 'text-primary-success'
    if (isFocused) return 'text-primary-gold'
    return 'text-white/60'
  }

  const characterCount = value.length
  const isNearLimit = maxLength && characterCount > maxLength * 0.8
  const isOverLimit = maxLength && characterCount > maxLength

  return (
    <div className={`relative ${className}`}>
      {/* Textarea Container */}
      <div className="relative">
        {/* Textarea Field */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={isFocused ? placeholder : ''}
          rows={rows}
          maxLength={maxLength}
          className={`
            w-full px-4 py-4 bg-white/5 backdrop-blur-sm border-2 rounded-2xl
            text-white placeholder-white/30 transition-all duration-300
            focus:outline-none focus:bg-white/10 resize-none
            ${getBorderColor()}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        />

        {/* Floating Label */}
        <motion.label
          className={`
            absolute left-4 pointer-events-none transition-all duration-300 font-medium
            ${getLabelColor()}
          `}
          animate={{
            top: isFloating ? '0.5rem' : '1rem',
            fontSize: isFloating ? '0.75rem' : '1rem',
            transform: isFloating ? 'translateY(0)' : 'translateY(0)',
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {label}
          {required && <span className="text-primary-error ml-1">*</span>}
        </motion.label>

        {/* Status Icon */}
        {(error || success) && (
          <div className="absolute right-4 top-4">
            {error && <AlertCircle size={20} className="text-primary-error" />}
            {success && <CheckCircle size={20} className="text-primary-success" />}
          </div>
        )}

        {/* Focus Ring */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: isFocused 
              ? error 
                ? '0 0 0 3px rgba(231, 76, 60, 0.2)'
                : success
                ? '0 0 0 3px rgba(46, 204, 113, 0.2)'
                : '0 0 0 3px rgba(201, 161, 77, 0.2)'
              : 'none',
          }}
          animate={{
            boxShadow: isFocused 
              ? error 
                ? '0 0 0 3px rgba(231, 76, 60, 0.2)'
                : success
                ? '0 0 0 3px rgba(46, 204, 113, 0.2)'
                : '0 0 0 3px rgba(201, 161, 77, 0.2)'
              : 'none',
          }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* Character Count */}
      {maxLength && (
        <div className="mt-2 text-right">
          <span 
            className={`text-sm ${
              isOverLimit 
                ? 'text-primary-error' 
                : isNearLimit 
                ? 'text-primary-warning' 
                : 'text-white/60'
            }`}
          >
            {characterCount}/{maxLength}
          </span>
        </div>
      )}

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-2 flex items-center space-x-2 text-primary-error text-sm"
          >
            <AlertCircle size={16} />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence>
        {success && !error && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-2 flex items-center space-x-2 text-primary-success text-sm"
          >
            <CheckCircle size={16} />
            <span>Looks good!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FloatingTextarea
