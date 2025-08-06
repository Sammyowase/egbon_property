'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaPaperPlane, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'
import LuxuryButton from '@/components/ui/LuxuryButton'
import LuxuryCard from '@/components/ui/LuxuryCard'

interface ContactFormData {
  fullName: string
  email: string
  phone: string
  subject: string
  message: string
  propertyInterest: string
  budget: string
  timeline: string
}

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void>
  className?: string
}

export default function ContactForm({ onSubmit, className = '' }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    propertyInterest: '',
    budget: '',
    timeline: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<ContactFormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {}

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      if (onSubmit) {
        await onSubmit(formData)
      } else {
        // Default submission logic
        await new Promise(resolve => setTimeout(resolve, 2000))
      }
      
      setSubmitStatus('success')
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        propertyInterest: '',
        budget: '',
        timeline: ''
      })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const inputClasses = "w-full bg-primary-black/50 border border-primary-gold/30 rounded-lg p-4 text-white placeholder-white/50 focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all duration-300"
  const errorClasses = "border-red-500 focus:border-red-500 focus:ring-red-500/20"

  return (
    <LuxuryCard variant="glass" className={`p-8 ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white/80 mb-2 text-sm font-medium">
              <FaUser className="inline mr-2" />
              Full Name *
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              className={`${inputClasses} ${errors.fullName ? errorClasses : ''}`}
              placeholder="Enter your full name"
              required
            />
            {errors.fullName && (
              <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-white/80 mb-2 text-sm font-medium">
              <FaEnvelope className="inline mr-2" />
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`${inputClasses} ${errors.email ? errorClasses : ''}`}
              placeholder="Enter your email"
              required
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white/80 mb-2 text-sm font-medium">
              <FaPhone className="inline mr-2" />
              Phone Number *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={`${inputClasses} ${errors.phone ? errorClasses : ''}`}
              placeholder="+234 XXX XXX XXXX"
              required
            />
            {errors.phone && (
              <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-white/80 mb-2 text-sm font-medium">
              <FaBuilding className="inline mr-2" />
              Property Interest
            </label>
            <select
              value={formData.propertyInterest}
              onChange={(e) => handleChange('propertyInterest', e.target.value)}
              className={inputClasses}
            >
              <option value="">Select property type</option>
              <option value="residential">Residential Development</option>
              <option value="commercial">Commercial Property</option>
              <option value="land">Land Development</option>
              <option value="agriculture">Agricultural Investment</option>
              <option value="luxury">Luxury Estate</option>
            </select>
          </div>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-white/80 mb-2 text-sm font-medium">
            Subject *
          </label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
            className={`${inputClasses} ${errors.subject ? errorClasses : ''}`}
            placeholder="What can we help you with?"
            required
          />
          {errors.subject && (
            <p className="text-red-400 text-sm mt-1">{errors.subject}</p>
          )}
        </div>

        {/* Budget and Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white/80 mb-2 text-sm font-medium">
              Budget Range
            </label>
            <select
              value={formData.budget}
              onChange={(e) => handleChange('budget', e.target.value)}
              className={inputClasses}
            >
              <option value="">Select budget range</option>
              <option value="under-5m">Under ₦5M</option>
              <option value="5m-10m">₦5M - ₦10M</option>
              <option value="10m-25m">₦10M - ₦25M</option>
              <option value="25m-50m">₦25M - ₦50M</option>
              <option value="50m-100m">₦50M - ₦100M</option>
              <option value="over-100m">Over ₦100M</option>
            </select>
          </div>

          <div>
            <label className="block text-white/80 mb-2 text-sm font-medium">
              Timeline
            </label>
            <select
              value={formData.timeline}
              onChange={(e) => handleChange('timeline', e.target.value)}
              className={inputClasses}
            >
              <option value="">Select timeline</option>
              <option value="immediate">Immediate (Within 1 month)</option>
              <option value="3months">Within 3 months</option>
              <option value="6months">Within 6 months</option>
              <option value="1year">Within 1 year</option>
              <option value="exploring">Just exploring</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-white/80 mb-2 text-sm font-medium">
            Message *
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            className={`${inputClasses} ${errors.message ? errorClasses : ''} min-h-[120px] resize-y`}
            placeholder="Tell us more about your requirements..."
            required
          />
          {errors.message && (
            <p className="text-red-400 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        {/* Submit Status */}
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-green-400 bg-green-400/10 p-4 rounded-lg"
          >
            <FaCheckCircle />
            <span>Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.</span>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-lg"
          >
            <FaExclamationTriangle />
            <span>Sorry, there was an error sending your message. Please try again.</span>
          </motion.div>
        )}

        {/* Submit Button */}
        <LuxuryButton
          variant="luxury"
          size="lg"
          className="w-full"
          loading={isSubmitting}
          disabled={isSubmitting}
          icon={<FaPaperPlane />}
          iconPosition="right"
        >
          {isSubmitting ? 'Sending Message...' : 'Send Message'}
        </LuxuryButton>
      </form>
    </LuxuryCard>
  )
}
