'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa'
import LuxuryButton from '@/components/ui/LuxuryButton'
import LuxuryCard from '@/components/ui/LuxuryCard'
import { BaseProperty } from '@/types/property'

interface PropertyInquiryData {
  fullName: string
  email: string
  phone: string
  inquiryType: 'viewing' | 'information' | 'purchase' | 'investment'
  preferredDate: string
  preferredTime: string
  message: string
}

interface PropertyInquiryFormProps {
  property: BaseProperty
  onSubmit?: (data: PropertyInquiryData) => Promise<void>
  onClose?: () => void
}

export default function PropertyInquiryForm({ 
  property, 
  onSubmit, 
  onClose 
}: PropertyInquiryFormProps) {
  const [formData, setFormData] = useState<PropertyInquiryData>({
    fullName: '',
    email: '',
    phone: '',
    inquiryType: 'viewing',
    preferredDate: '',
    preferredTime: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (onSubmit) {
        await onSubmit(formData)
      } else {
        // Default submission logic
        await new Promise(resolve => setTimeout(resolve, 2000))
      }
      setSubmitStatus('success')
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: keyof PropertyInquiryData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (submitStatus === 'success') {
    return (
      <LuxuryCard variant="glass" className="p-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
            <FaCheckCircle className="text-green-400 text-2xl" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Inquiry Sent!</h3>
          <p className="text-white/80 mb-6">
            Thank you for your interest in {property.title}. Our team will contact you within 24 hours to schedule your viewing or provide the requested information.
          </p>
          <div className="flex gap-4 justify-center">
            <LuxuryButton variant="primary" onClick={onClose}>
              Close
            </LuxuryButton>
            <LuxuryButton 
              variant="outline" 
              onClick={() => setSubmitStatus('idle')}
            >
              Send Another Inquiry
            </LuxuryButton>
          </div>
        </motion.div>
      </LuxuryCard>
    )
  }

  const inputClasses = "w-full bg-primary-black/50 border border-primary-gold/30 rounded-lg p-3 text-white placeholder-white/50 focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all duration-300"

  return (
    <LuxuryCard variant="glass" className="p-8">
      {/* Property Info Header */}
      <div className="mb-6 pb-6 border-b border-primary-gold/20">
        <h3 className="text-xl font-bold text-white mb-2">Property Inquiry</h3>
        <div className="flex items-center gap-2 text-white/70">
          <FaMapMarkerAlt className="text-primary-gold" />
          <span className="font-medium">{property.title}</span>
        </div>
        <p className="text-white/60 text-sm">{property.location}</p>
        <p className="text-primary-gold font-bold text-lg">{property.price}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white/80 mb-2 text-sm font-medium">
              <FaUser className="inline mr-2" />
              Full Name *
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              className={inputClasses}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="block text-white/80 mb-2 text-sm font-medium">
              <FaEnvelope className="inline mr-2" />
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={inputClasses}
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-white/80 mb-2 text-sm font-medium">
            <FaPhone className="inline mr-2" />
            Phone Number *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className={inputClasses}
            placeholder="+234 XXX XXX XXXX"
            required
          />
        </div>

        {/* Inquiry Type */}
        <div>
          <label className="block text-white/80 mb-2 text-sm font-medium">
            Inquiry Type *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { value: 'viewing', label: 'Schedule Viewing' },
              { value: 'information', label: 'Request Info' },
              { value: 'purchase', label: 'Purchase Inquiry' },
              { value: 'investment', label: 'Investment Info' }
            ].map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => handleChange('inquiryType', type.value)}
                className={`p-3 rounded-lg border-2 transition-all duration-300 text-sm ${
                  formData.inquiryType === type.value
                    ? 'border-primary-gold bg-primary-gold/20 text-white'
                    : 'border-primary-gold/30 text-white/70 hover:border-primary-gold/60'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scheduling (for viewing requests) */}
        {formData.inquiryType === 'viewing' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 mb-2 text-sm font-medium">
                <FaCalendarAlt className="inline mr-2" />
                Preferred Date
              </label>
              <input
                type="date"
                value={formData.preferredDate}
                onChange={(e) => handleChange('preferredDate', e.target.value)}
                className={inputClasses}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label className="block text-white/80 mb-2 text-sm font-medium">
                <FaClock className="inline mr-2" />
                Preferred Time
              </label>
              <select
                value={formData.preferredTime}
                onChange={(e) => handleChange('preferredTime', e.target.value)}
                className={inputClasses}
              >
                <option value="">Select time</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="17:00">5:00 PM</option>
              </select>
            </div>
          </div>
        )}

        {/* Message */}
        <div>
          <label className="block text-white/80 mb-2 text-sm font-medium">
            Additional Message
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            className={`${inputClasses} min-h-[100px] resize-y`}
            placeholder="Any specific questions or requirements..."
          />
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4">
          <LuxuryButton
            variant="luxury"
            size="md"
            className="flex-1"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Inquiry'}
          </LuxuryButton>
          
          {onClose && (
            <LuxuryButton
              variant="outline"
              size="md"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </LuxuryButton>
          )}
        </div>
      </form>
    </LuxuryCard>
  )
}
