'use client'

import { motion } from 'framer-motion'
import MotionBackground from '@/components/MotionBackground'
import { useState } from 'react'
import Image from 'next/image'
import { FaCalendar, FaUser, FaTag, FaArrowRight, FaClock, FaHeart } from 'react-icons/fa'

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const featuredNews = {
    title: "The Future of Luxury Real Estate in Nigeria",
    excerpt: "Discover how technology and sustainability are shaping the future of luxury properties in Nigeria's most exclusive neighborhoods.",
    image: "/news/featured-news.jpg",
    date: "March 20, 2024",
    author: "Mr Yusuf",
    category: "Market Trends",
    readTime: "5 min read"
  }

  const latestNews = [
    {
      title: "Top 5 Luxury Neighborhoods in Lagos",
      excerpt: "Explore the most prestigious residential areas in Lagos and what makes them special.",
      image: "/news/lagos-luxury.jpg",
      date: "March 18, 2024",
      author: "Okiki Yusuf",
      category: "Neighborhoods",
      readTime: "4 min read"
    },
    {
      title: "Smart Home Technology in Modern Estates",
      excerpt: "How smart home features are becoming standard in luxury properties.",
      image: "/news/smart-home.jpg",
      date: "March 15, 2024",
      author: "Yusuf Subomi",
      category: "Technology",
      readTime: "3 min read"
    },
    {
      title: "Investment Opportunities in Nigerian Real Estate",
      excerpt: "Analysis of current investment trends and opportunities in the luxury market.",
      image: "/news/investment.jpg",
      date: "March 12, 2024",
      author: "Mr Yusuf",
      category: "Investment",
      readTime: "6 min read"
    }
  ]

  const categories = [
    { name: 'All', count: 12 },
    { name: 'Market Trends', count: 4 },
    { name: 'Neighborhoods', count: 3 },
    { name: 'Technology', count: 2 },
    { name: 'Investment', count: 3 },
    { name: 'Luxury Living', count: 2 }
  ]

  const trendingTopics = [
    "Sustainable Luxury Homes",
    "Property Investment Tips",
    "Modern Interior Design",
    "Smart Home Integration",
    "Luxury Market Analysis"
  ]

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  }

  return (
    <>
      <MotionBackground />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 text-gradient"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Latest News & Insights
            </motion.h1>
            <motion.p 
              className="text-lg text-white/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Stay informed about the latest trends and developments in luxury real estate
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      <motion.section 
        className="py-16 bg-primary-black/95"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="relative rounded-lg overflow-hidden group cursor-pointer"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative h-[400px] md:h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-t from-primary-black via-primary-black/60 to-transparent z-10" />
              <div className="absolute inset-0 bg-primary-gold/20" />
            </div>
            <motion.div 
              className="absolute bottom-0 left-0 right-0 p-8 z-20"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center space-x-4 text-white/80 mb-4">
                <span className="flex items-center">
                  <FaCalendar className="mr-2" />
                  {featuredNews.date}
                </span>
                <span className="flex items-center">
                  <FaUser className="mr-2" />
                  {featuredNews.author}
                </span>
                <span className="flex items-center">
                  <FaTag className="mr-2" />
                  {featuredNews.category}
                </span>
                <span className="flex items-center">
                  <FaClock className="mr-2" />
                  {featuredNews.readTime}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {featuredNews.title}
              </h2>
              <p className="text-white/90 text-lg mb-6 max-w-3xl">
                {featuredNews.excerpt}
              </p>
              <motion.button
                className="flex items-center text-primary-gold hover:text-white transition-colors"
                whileHover={{ x: 5 }}
              >
                Read More <FaArrowRight className="ml-2" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {latestNews.map((article, index) => (
                  <motion.div
                    key={index}
                    className="relative rounded-lg overflow-hidden group cursor-pointer bg-primary-black/50 border border-primary-gold/10"
                    variants={fadeInUp}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative h-48">
                      <div className="absolute inset-0 bg-primary-gold/20" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-black to-transparent opacity-60" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-white/60 text-sm mb-4 space-x-4">
                        <span className="flex items-center">
                          <FaCalendar className="mr-2" />
                          {article.date}
                        </span>
                        <span className="flex items-center">
                          <FaClock className="mr-2" />
                          {article.readTime}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">
                        {article.title}
                      </h3>
                      <p className="text-white/80 mb-4">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-primary-gold text-sm">
                          {article.category}
                        </span>
                        <motion.button
                          className="text-primary-gold hover:text-white transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          Read More
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Browse by Category */}
              <motion.div
                className="bg-primary-black/50 rounded-lg p-6 mb-8 border border-primary-gold/10"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-xl font-bold text-white mb-6">Browse by Category</h3>
                <div className="space-y-3">
                  {categories.map((category, index) => (
                    <motion.button
                      key={index}
                      className={`w-full flex items-center justify-between p-3 rounded-md transition-all
                        ${selectedCategory === category.name 
                          ? 'bg-primary-gold/20 text-primary-gold' 
                          : 'text-white/80 hover:bg-primary-gold/10 hover:text-white'}`}
                      onClick={() => setSelectedCategory(category.name)}
                      whileHover={{ x: 5 }}
                    >
                      <span>{category.name}</span>
                      <span className="text-sm opacity-60">{category.count}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Trending Topics */}
              <motion.div
                className="bg-primary-black/50 rounded-lg p-6 border border-primary-gold/10"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-xl font-bold text-white mb-6">Trending Topics</h3>
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <motion.button
                      key={index}
                      className="w-full flex items-center justify-between p-3 text-white/80 hover:text-primary-gold transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <span>{topic}</span>
                      <FaHeart className="text-primary-gold/50" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
} 