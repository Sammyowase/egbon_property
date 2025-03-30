import { motion, AnimatePresence } from 'framer-motion'
import { FaFilter, FaSearch, FaTimes } from 'react-icons/fa'
import { useState } from 'react'

interface FilterOption {
  value: string
  label: string
}

interface PropertyFilterProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedLocation: string
  setSelectedLocation: (location: string) => void
  priceRange: string
  setPriceRange: (range: string) => void
  selectedProjectType: string
  setSelectedProjectType: (type: string) => void
  selectedStatus: string
  setSelectedStatus: (status: string) => void
  locations: FilterOption[]
  priceRanges: FilterOption[]
  projectTypes: FilterOption[]
  statusOptions: FilterOption[]
  filteredProperties: any[]
  recentlyViewed: any[]
  onPropertySelect: (property: any) => void
}

export default function PropertyFilter({
  searchQuery,
  setSearchQuery,
  selectedLocation,
  setSelectedLocation,
  priceRange,
  setPriceRange,
  selectedProjectType,
  setSelectedProjectType,
  selectedStatus,
  setSelectedStatus,
  locations,
  priceRanges,
  projectTypes,
  statusOptions,
  filteredProperties,
  recentlyViewed,
  onPropertySelect
}: PropertyFilterProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Add active filters count
  const activeFilters = [
    selectedLocation !== 'All',
    priceRange !== 'All',
    selectedProjectType !== 'All',
    selectedStatus !== 'All'
  ].filter(Boolean).length

  return (
    <div className="w-full">
      {/* Search and Filter Bar */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search properties..."
            className="w-full bg-primary-black/50 border border-primary-gold/30 rounded-lg py-3 pl-12 pr-4
              text-white placeholder-white/50 focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20
              transition-all duration-300"
          />
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
        </div>
        <motion.button
          className="bg-primary-gold/10 text-primary-gold px-6 rounded-lg flex items-center gap-2
            hover:bg-primary-gold hover:text-primary-black transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <FaFilter />
          <span>Filters</span>
          {activeFilters > 0 && (
            <span className="bg-primary-gold text-primary-black px-2 py-1 rounded-full text-xs">
              {activeFilters}
            </span>
          )}
        </motion.button>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-primary-black/30 rounded-lg p-6 border border-primary-gold/20 mb-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-white">Filter Properties</h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Location Filter */}
              <div>
                <label className="block text-sm text-white/60 mb-2">Location</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full bg-primary-black/50 border border-primary-gold/30 rounded-lg py-2 px-4
                    text-white focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20
                    transition-all duration-300"
                >
                  {locations.map((location) => (
                    <option key={location.value} value={location.value}>
                      {location.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm text-white/60 mb-2">Price Range</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full bg-primary-black/50 border border-primary-gold/30 rounded-lg py-2 px-4
                    text-white focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20
                    transition-all duration-300"
                >
                  {priceRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Project Type Filter */}
              <div>
                <label className="block text-sm text-white/60 mb-2">Project Type</label>
                <select
                  value={selectedProjectType}
                  onChange={(e) => setSelectedProjectType(e.target.value)}
                  className="w-full bg-primary-black/50 border border-primary-gold/30 rounded-lg py-2 px-4
                    text-white focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20
                    transition-all duration-300"
                >
                  {projectTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm text-white/60 mb-2">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full bg-primary-black/50 border border-primary-gold/30 rounded-lg py-2 px-4
                    text-white focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20
                    transition-all duration-300"
                >
                  {statusOptions.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Recently Viewed Properties */}
            {recentlyViewed.length > 0 && (
              <div className="mt-8">
                <h4 className="text-sm font-semibold text-white/80 mb-4">Recently Viewed</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recentlyViewed.map((property) => (
                    <motion.button
                      key={property.id}
                      onClick={() => onPropertySelect(property)}
                      className="w-full flex items-center gap-3 p-3 rounded-lg bg-primary-black/30
                        hover:bg-primary-black/50 transition-all duration-300 text-left"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <img
                          src={property.image}
                          alt={property.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1">
                        <h5 className="text-sm font-medium text-white truncate">
                          {property.title}
                        </h5>
                        <p className="text-xs text-white/60">
                          {property.location}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* No Results Message */}
      {filteredProperties && filteredProperties.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-center"
        >
          <div className="bg-primary-black/30 rounded-lg p-6 border border-primary-gold/20">
            <FaSearch className="text-4xl text-primary-gold/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Properties Found</h3>
            <p className="text-white/60">
              Try adjusting your filters or search terms to find what you're looking for.
            </p>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-white/40">Suggestions:</p>
              <ul className="text-sm text-white/60 space-y-1">
                <li>• Check for typos in your search</li>
                <li>• Try broader search terms</li>
                <li>• Remove some filters to see more results</li>
                <li>• Try different locations or price ranges</li>
                <li>• Clear all filters to see all properties</li>
              </ul>
            </div>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedLocation('All')
                setPriceRange('All')
                setSelectedProjectType('All')
                setSelectedStatus('All')
              }}
              className="mt-4 bg-primary-gold/10 text-primary-gold px-4 py-2 rounded-lg
                hover:bg-primary-gold hover:text-primary-black transition-all duration-300"
            >
              Clear All Filters
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
} 