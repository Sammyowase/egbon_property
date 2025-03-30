import { motion } from 'framer-motion'
import { FaSearch, FaTrash } from 'react-icons/fa'
import { BaseProperty } from '@/types/property'

interface PropertySearchProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  filters: {
    name: string
    value: string
    options: string[]
    onChange: (value: string) => void
  }[]
  recentlyViewed?: BaseProperty[]
  onSelectRecent?: (property: BaseProperty) => void
  savedSearches?: {
    id: string
    name: string
    filters: any
  }[]
  onLoadSavedSearch?: (search: { filters: any }) => void
  onDeleteSavedSearch?: (id: string) => void
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

export default function PropertySearch({
  searchQuery,
  onSearchChange,
  filters,
  recentlyViewed,
  onSelectRecent,
  savedSearches,
  onLoadSavedSearch,
  onDeleteSavedSearch
}: PropertySearchProps) {
  return (
    <motion.div
      className="bg-primary-black/40 p-8 rounded-2xl border border-primary-gold/20 backdrop-blur-lg
        shadow-[0_8px_32px_rgba(234,179,8,0.1)] hover:shadow-[0_8px_32px_rgba(234,179,8,0.2)]
        transition-all duration-500"
      variants={itemVariants}
    >
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${filters.length + 1} gap-4`}>
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-gold" />
          <input
            type="text"
            placeholder="Search properties..."
            className="w-full bg-primary-black/50 border border-primary-gold/30 rounded-lg py-3 pl-10 pr-4 text-white
              focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all duration-300"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        {filters.map((filter, index) => (
          <select
            key={index}
            className="w-full bg-primary-black/50 border border-primary-gold/30 rounded-lg py-3 px-4 text-white
              focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all duration-300"
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
          >
            {filter.options.map((option, optionIndex) => (
              <option key={optionIndex} value={option}>{option}</option>
            ))}
          </select>
        ))}
      </div>

      {/* Recently Viewed */}
      {recentlyViewed && recentlyViewed.length > 0 && onSelectRecent && (
        <div className="mt-6 pt-6 border-t border-primary-gold/10">
          <h3 className="text-white/80 mb-4">Recently Viewed</h3>
          <div className="flex flex-wrap gap-2">
            {recentlyViewed.map(property => (
              <motion.button
                key={property.id}
                className="bg-primary-black/50 text-white/80 px-3 py-1 rounded-full text-sm
                  hover:bg-primary-gold/20 hover:text-primary-gold transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                onClick={() => onSelectRecent(property)}
              >
                {property.title}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Saved Searches */}
      {savedSearches && savedSearches.length > 0 && onLoadSavedSearch && onDeleteSavedSearch && (
        <div className="mt-6 pt-6 border-t border-primary-gold/10">
          <h3 className="text-white/80 mb-4">Saved Searches</h3>
          <div className="flex flex-wrap gap-2">
            {savedSearches.map(search => (
              <motion.button
                key={search.id}
                className="bg-primary-black/50 text-white/80 px-3 py-1 rounded-full text-sm
                  hover:bg-primary-gold/20 hover:text-primary-gold transition-all duration-300
                  flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                onClick={() => onLoadSavedSearch(search)}
              >
                {search.name}
                <FaTrash 
                  className="text-xs opacity-60 hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDeleteSavedSearch(search.id)
                  }}
                />
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
} 