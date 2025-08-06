'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, AlertCircle, CheckCircle } from 'lucide-react'

interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface FloatingSelectProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  error?: string
  success?: boolean
  required?: boolean
  disabled?: boolean
  placeholder?: string
  className?: string
}

const FloatingSelect = ({
  label,
  value,
  onChange,
  options,
  error,
  success = false,
  required = false,
  disabled = false,
  placeholder = 'Select an option',
  className = ''
}: FloatingSelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  const isFloating = isFocused || value.length > 0 || isOpen
  const selectedOption = options.find(option => option.value === value)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setIsFocused(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleToggle = () => {
    if (disabled) return
    setIsOpen(!isOpen)
    setIsFocused(!isOpen)
  }

  const handleSelect = (optionValue: string) => {
    onChange(optionValue)
    setIsOpen(false)
    setIsFocused(false)
  }

  const getBorderColor = () => {
    if (error) return 'border-primary-error'
    if (success) return 'border-primary-success'
    if (isFocused || isOpen) return 'border-primary-gold'
    return 'border-white/20'
  }

  const getLabelColor = () => {
    if (error) return 'text-primary-error'
    if (success) return 'text-primary-success'
    if (isFocused || isOpen) return 'text-primary-gold'
    return 'text-white/60'
  }

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      {/* Select Container */}
      <div className="relative">
        {/* Select Button */}
        <button
          type="button"
          onClick={handleToggle}
          disabled={disabled}
          className={`
            w-full px-4 py-4 bg-white/5 backdrop-blur-sm border-2 rounded-2xl
            text-left transition-all duration-300 focus:outline-none focus:bg-white/10
            ${getBorderColor()}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          {/* Selected Value */}
          <span className={`block ${selectedOption ? 'text-white' : 'text-white/30'}`}>
            {selectedOption ? selectedOption.label : (isFloating ? placeholder : '')}
          </span>
        </button>

        {/* Floating Label */}
        <motion.label
          className={`
            absolute left-4 pointer-events-none transition-all duration-300 font-medium
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

        {/* Chevron Icon */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={20} className="text-white/40" />
          </motion.div>
        </div>

        {/* Status Icon */}
        {(error || success) && (
          <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
            {error && <AlertCircle size={20} className="text-primary-error" />}
            {success && <CheckCircle size={20} className="text-primary-success" />}
          </div>
        )}

        {/* Focus Ring */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: (isFocused || isOpen)
              ? error 
                ? '0 0 0 3px rgba(231, 76, 60, 0.2)'
                : success
                ? '0 0 0 3px rgba(46, 204, 113, 0.2)'
                : '0 0 0 3px rgba(201, 161, 77, 0.2)'
              : 'none',
          }}
          animate={{
            boxShadow: (isFocused || isOpen)
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

      {/* Options Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-full left-0 right-0 mt-2 bg-primary-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 max-h-60 overflow-y-auto"
          >
            {options.map((option, index) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                disabled={option.disabled}
                className={`
                  w-full px-4 py-3 text-left transition-all duration-200
                  hover:bg-white/10 focus:bg-white/10 focus:outline-none
                  ${option.value === value ? 'bg-primary-gold/20 text-primary-gold' : 'text-white'}
                  ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  ${index === 0 ? 'rounded-t-2xl' : ''}
                  ${index === options.length - 1 ? 'rounded-b-2xl' : ''}
                `}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

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

export default FloatingSelect
