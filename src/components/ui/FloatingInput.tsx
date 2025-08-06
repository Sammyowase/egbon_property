'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'

interface FloatingInputProps {
  label: string
  type?: 'text' | 'email' | 'password' | 'tel' | 'number'
  value: string
  onChange: (value: string) => void
  error?: string
  success?: boolean
  required?: boolean
  disabled?: boolean
  placeholder?: string
  className?: string
  icon?: React.ReactNode
}

const FloatingInput = ({
  label,
  type = 'text',
  value,
  onChange,
  error,
  success = false,
  required = false,
  disabled = false,
  placeholder,
  className = '',
  icon
}: FloatingInputProps) => {
  const [isFocused, setIsFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const isFloating = isFocused || value.length > 0

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const getInputType = () => {
    if (type === 'password') {
      return showPassword ? 'text' : 'password'
    }
    return type
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

  return (
    <div className={`relative ${className}`}>
      {/* Input Container */}
      <div className="relative">
        {/* Icon */}
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 z-10">
            {icon}
          </div>
        )}

        {/* Input Field */}
        <input
          ref={inputRef}
          type={getInputType()}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={isFocused ? placeholder : ''}
          className={`
            w-full px-4 py-4 bg-white/5 backdrop-blur-sm border-2 rounded-2xl
            text-white placeholder-white/30 transition-all duration-300
            focus:outline-none focus:bg-white/10
            ${icon ? 'pl-12' : 'pl-4'}
            ${type === 'password' ? 'pr-12' : 'pr-4'}
            ${getBorderColor()}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        />

        {/* Floating Label */}
        <motion.label
          className={`
            absolute left-4 pointer-events-none transition-all duration-300 font-medium
            ${icon ? 'left-12' : 'left-4'}
            ${getLabelColor()}
          `}
          animate={{
            top: isFloating ? '0.5rem' : '50%',
            fontSize: isFloating ? '0.75rem' : '1rem',
            transform: isFloating ? 'translateY(0)' : 'translateY(-50%)',
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {label}
          {required && <span className="text-primary-error ml-1">*</span>}
        </motion.label>

        {/* Password Toggle */}
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors duration-200"
            disabled={disabled}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}

        {/* Status Icon */}
        {(error || success) && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
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

export default FloatingInput
