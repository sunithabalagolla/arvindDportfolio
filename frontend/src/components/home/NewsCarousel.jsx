import React, { useState, useEffect } from 'react';
import { Share2, Calendar, ChevronRight, ChevronLeft, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import news1 from '../../assets/images/home/news/newcarousels1.png';
import news2 from '../../assets/images/home/news/newcarousels2.jpg';
import news3 from '../../assets/images/home/news/newcarousels3.png';

export default function NewsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const newsData = [
    {
      id: 1,
      image: news1,
      title: "Nizamabad MP Shri Arvind Dharmapuri Meets Union Home Minister Shri Amit Shah Ji",
      description: "Nizamabad MP Shri Arvind Dharmapuri had the privilege of meeting",
      date: "Aug 07, 2025",
      trending: true
    },
    {
      id: 2,
      image: news2,
      title: "Meet the Mighty INS Nistar!",
      description: "Nizamabad MP Shri Arvind Dharmapuri had the privilege of meeting the Hon'ble Union Home Minister Shri Amit Shah Ji",
      date: "Aug 07, 2025"
    },
    {
      id: 3,
      image: news3,
      title: "Make in India Boost: Defence Ministry Clears ₹67,000 Crore Projects",
      description: "The Defence Acquisition Council (DAC), chaired by Defence Minister Rajnath Singh, has approved defence proposals",
      date: "Aug 07, 2025"
    },
    {
      id: 4,
      image: news1,
      title: "Infrastructure Development in Nizamabad",
      description: "Major infrastructure projects announced for the development of Nizamabad constituency",
      date: "Aug 06, 2025"
    },
    {
      id: 5,
      image: news2,
      title: "Agricultural Reforms Implementation",
      description: "New agricultural reforms being implemented to support farmers in the region",
      date: "Aug 05, 2025"
    }
  ];

  const getItemsPerSlide = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1;  // Mobile
      if (window.innerWidth < 1024) return 2;  // Tablet
      return 3; // Desktop
    }
    return 3;
  };

  const [itemsPerSlide, setItemsPerSlide] = useState(getItemsPerSlide());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(getItemsPerSlide());
      setCurrentSlide(0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(newsData.length / itemsPerSlide);
  const currentItems = newsData.slice(currentSlide * itemsPerSlide, (currentSlide + 1) * itemsPerSlide);

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleShare = (e, newsItem) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: newsItem.title,
        text: newsItem.description,
        url: window.location.href
      });
    }
  };

  return (
    <div className="relative w-full py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white via-gray-50/30 to-white overflow-hidden">
      
      {/* Subtle Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FB8B35]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#FB8B35]/10 rounded-full mb-4 border border-[#FB8B35]/20">
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-[#FB8B35]" />
            <span className="text-xs sm:text-sm font-semibold text-[#FB8B35] uppercase tracking-wider">Latest Updates</span>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Latest News
          </h2>

          {/* Simple Divider */}
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-[#FB8B35] to-orange-500 mx-auto rounded-full" />
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          
          {/* Simple Navigation Arrows - Desktop */}
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`hidden lg:flex absolute -left-4 xl:-left-8 top-1/2 -translate-y-1/2 z-20
                       text-3xl xl:text-4xl transition-all duration-300
                       ${currentSlide === 0 
                         ? 'text-gray-300 cursor-not-allowed' 
                         : 'text-[#FB8B35] hover:text-orange-600 hover:scale-110'}`}
          >
            <ChevronLeft />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className={`hidden lg:flex absolute -right-4 xl:-right-8 top-1/2 -translate-y-1/2 z-20
                       text-3xl xl:text-4xl transition-all duration-300
                       ${currentSlide === totalSlides - 1 
                         ? 'text-gray-300 cursor-not-allowed' 
                         : 'text-[#FB8B35] hover:text-orange-600 hover:scale-110'}`}
          >
            <ChevronRight />
          </button>

          {/* Cards Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8"
            >
              {currentItems.map((news, index) => (
                <motion.div
                  key={news.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredCard(news.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => navigate(`/news/${news.id}`)}
                  className="group cursor-pointer h-full"
                >
                  {/* Premium Card */}
                  <div className="relative h-full bg-white rounded-xl sm:rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-[#FB8B35]/30 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                    
                    {/* Shimmer Effect on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 pointer-events-none" />
                    
                    {/* Trending Badge */}
                    {news.trending && (
                      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 px-2 sm:px-3 py-1 bg-gradient-to-r from-red-500 to-[#FB8B35] text-white text-[10px] sm:text-xs font-bold rounded-full shadow-lg">
                        TRENDING
                      </div>
                    )}

                    {/* Share Button */}
                    <button
                      onClick={(e) => handleShare(e, news)}
                      className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 
                               bg-white/90 backdrop-blur-sm
                               rounded-full flex items-center justify-center
                               shadow-md hover:shadow-lg
                               hover:bg-[#FB8B35] hover:scale-110
                               transition-all duration-300 group/share"
                    >
                      <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700 group-hover/share:text-white" />
                    </button>

                    {/* Image Container - FIXED: Using object-contain and proper height */}
                    <div className="relative w-full h-48 sm:h-56 md:h-60 lg:h-64 bg-gradient-to-br from-gray-50 to-gray-100 p-4">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x300?text=News+Image';
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5 md:p-6">
                      {/* Date */}
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-[#FB8B35]" />
                        <span>{news.date}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 group-hover:text-[#FB8B35] transition-colors duration-300">
                        {news.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-sm sm:text-base line-clamp-2 mb-3 sm:mb-4">
                        {news.description}
                      </p>

                      {/* Read More Button */}
                      <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100">
                        <span className="text-[#FB8B35] font-semibold text-sm sm:text-base flex items-center gap-1 sm:gap-2 group-hover:gap-2 sm:group-hover:gap-3 transition-all">
                          Read More
                          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                        </span>
                        <div className="h-0.5 w-0 group-hover:w-12 sm:group-hover:w-16 bg-gradient-to-r from-[#FB8B35] to-orange-600 transition-all duration-500" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Mobile/Tablet Navigation - Simple arrows below cards */}
          <div className="flex lg:hidden items-center justify-center gap-8 mt-6 sm:mt-8">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`text-2xl sm:text-3xl transition-all duration-300
                         ${currentSlide === 0 
                           ? 'text-gray-300 cursor-not-allowed' 
                           : 'text-[#FB8B35] hover:text-orange-600 active:scale-95'}`}
            >
              <ChevronLeft />
            </button>

            <span className="text-sm sm:text-base font-medium text-gray-600">
              {currentSlide + 1} / {totalSlides}
            </span>

            <button
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              className={`text-2xl sm:text-3xl transition-all duration-300
                         ${currentSlide === totalSlides - 1 
                           ? 'text-gray-300 cursor-not-allowed' 
                           : 'text-[#FB8B35] hover:text-orange-600 active:scale-95'}`}
            >
              <ChevronRight />
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-6 sm:mt-8 lg:mt-10 gap-2 sm:gap-3">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? 'w-8 sm:w-10 h-2 sm:h-2.5 bg-gradient-to-r from-[#FB8B35] to-orange-600'
                    : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-8 sm:mt-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/news/AllNews')}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 
                       bg-gradient-to-r from-[#FB8B35] to-orange-600
                       text-white text-sm sm:text-base font-semibold rounded-full
                       shadow-lg hover:shadow-xl
                       transition-all duration-300"
            >
              View All News
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}