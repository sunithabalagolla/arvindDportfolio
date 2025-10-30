import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, TrendingUp, Clock, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';

function SearchOverlay({ isOpen, onClose }) {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  
  const scrollRef = useRef(null);
  const searchInputRef = useRef(null);

  // Focus search input when overlay opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      const focusTimeout = setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);

      return () => clearTimeout(focusTimeout);
    }
  }, [isOpen]);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -200 : 200,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 300);
    }
  };

  const handleClose = () => {
    onClose();
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 bg-white backdrop-blur-xl flex flex-col z-50 overflow-y-auto h-screen w-screen"
        >
          {/* Header with close button - Full width */}
          <div className="flex justify-between items-center p-4 md:p-12 md:pr-32 w-full">
            <div></div>
            <motion.button
              className="text-[#FB6F03] text-2xl md:text-3xl hover:text-black p-2 rounded-full transition-colors duration-200"
              onClick={handleClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ✕
            </motion.button>
          </div>

          {/* Search content - Full screen optimized */}
          <div className="flex-1 px-4 md:px-8 lg:px-16 xl:px-32 pb-6 w-full min-h-0 relative">
            {/* Floating background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-xl"
                animate={{
                  x: [0, 20, 0],
                  y: [0, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-20 right-16 w-24 h-24 bg-gradient-to-bl from-white/15 to-transparent rounded-full blur-lg"
                animate={{
                  x: [0, -15, 0],
                  y: [0, 15, 0],
                  scale: [1, 0.9, 1]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
            </div>

            {/* Search input - Full width with proper centering */}
            <motion.div
              className="relative w-full max-w-5xl mx-auto bg-gradient-to-r from-white/95 via-white/98 to-white/90
                rounded-2xl md:rounded-3xl shadow-2xl flex items-center
                px-4 md:px-6 py-3 md:py-4 mb-8 group
                backdrop-blur-xl border border-white/40
                hover:shadow-[0_0_40px_rgba(251,139,53,0.15),0_0_60px_rgba(255,255,255,0.1)] 
                transition-all duration-500 overflow-hidden"
              initial={{ scale: 0.9, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FB8B35]/5 to-transparent 
                opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Search className="text-gray-600 group-hover:text-[#FB8B35] text-lg md:text-2xl mr-3 md:mr-4 
                  flex-shrink-0 transition-all duration-300 drop-shadow-sm" />
              </motion.div>

              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search anything..."
                className="w-full text-base md:text-xl text-gray-800 placeholder-gray-500
                  focus:outline-none bg-transparent font-medium transition-all duration-300
                  placeholder:transition-colors placeholder:duration-300
                  focus:placeholder-gray-400"
              />

              <motion.div
                className="absolute right-4 opacity-0 group-hover:opacity-100"
                initial={{ scale: 0, rotate: 0 }}
                whileHover={{ scale: 1, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Sparkles className="text-[#FB8B35] w-4 h-4 md:w-5 md:h-5" />
              </motion.div>
            </motion.div>

            {/* Search suggestions - Full width layout */}
            <div className="space-y-6 md:space-y-8 max-w-7xl mx-auto">
              {/* Recent Searches */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
              >
                <div className="flex items-center gap-3 mb-4 md:mb-5">
                  <Clock className="text-[#FB8B35] w-5 h-5 md:w-6 md:h-6" />
                  <h2 className="text-black text-lg md:text-xl font-semibold tracking-wide">
                    Recent Searches
                  </h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#FB8B35]/30 to-transparent" />
                </div>

                <div className="flex items-center gap-3">
                  {/* Left Arrow */}
                  {showLeftArrow && (
                    <motion.button
                      className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12
                        bg-gradient-to-br from-[#FB8B35]/10 to-[#FB8B35]/5
                        hover:from-[#FB8B35]/20 hover:to-[#FB8B35]/10
                        border border-[#FB8B35]/20 hover:border-[#FB8B35]/30
                        rounded-full transition-all duration-300
                        hover:shadow-lg hover:shadow-[#FB8B35]/20 flex-shrink-0"
                      onClick={() => scroll('left')}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChevronLeft className="text-[#FB8B35] w-5 h-5 md:w-6 md:h-6" />
                    </motion.button>
                  )}

                  {/* Scrollable container - Full width */}
                  <div className="flex-1 overflow-hidden">
                    <div
                      ref={scrollRef}
                      className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide pb-2"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                      {["Government Schemes", "Membership Registration", "Upcoming Rallies", "Public Works", "Farmer Support Programs", "Water Supply Projects", "Road Development", "Digital Services", "Healthcare Programs", "Education Initiatives", "Rural Development", "Urban Planning"].map((item, i) => (
                        <motion.button
                          key={i}
                          className="relative px-3 md:px-4 py-2.5 md:py-3
                            bg-gradient-to-br from-[#FFE4CF] via-[#FFE4CF] to-[#FFE4CF]/90
                            border border-black/15 hover:border-[#FB8B35]/30
                            rounded-xl md:rounded-2xl text-black
                            hover:bg-gradient-to-br hover:from-white hover:to-[#FFE4CF]/50
                            backdrop-blur-md group overflow-hidden
                            transition-all duration-300 font-medium
                            text-sm md:text-base shadow-sm hover:shadow-md
                            hover:shadow-[#FB8B35]/10 whitespace-nowrap flex-shrink-0"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="relative z-10">{item}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Right Arrow */}
                  {showRightArrow && (
                    <motion.button
                      className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12
                        bg-gradient-to-br from-[#FB8B35]/10 to-[#FB8B35]/5
                        hover:from-[#FB8B35]/20 hover:to-[#FB8B35]/10
                        border border-[#FB8B35]/20 hover:border-[#FB8B35]/30
                        rounded-full transition-all duration-300
                        hover:shadow-lg hover:shadow-[#FB8B35]/20 flex-shrink-0"
                      onClick={() => scroll('right')}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChevronRight className="text-[#FB8B35] w-5 h-5 md:w-6 md:h-6" />
                    </motion.button>
                  )}
                </div>
              </motion.div>

              {/* Popular Searches */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
              >
                <div className="flex items-center gap-3 mb-4 md:mb-5">
                  <TrendingUp className="text-[#FB8B35] w-5 h-5 md:w-6 md:h-6" />
                  <h2 className="text-black text-lg md:text-xl font-semibold tracking-wide">
                    Popular Searches
                  </h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#FB8B35]/30 to-transparent" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3">
                  {["Education Initiatives", "Healthcare Programs", "Children's Welfare", "Telangana Elections 2024", "Water Supply", "Road Construction", "Digital Services", "Farmer Support", "Public Transport", "Employment Schemes", "Housing Projects", "Environmental Programs"].map((item, i) => (
                    <motion.button
                      key={i}
                      className="relative px-3 md:px-4 py-2.5 md:py-3
                        bg-gradient-to-br from-[#FFE4CF] via-[#FFE4CF] to-[#FFE4CF]/90
                        border border-black/15 hover:border-[#FB8B35]/30
                        rounded-xl md:rounded-2xl text-black
                        hover:bg-gradient-to-br hover:from-white hover:to-[#FFE4CF]/50
                        backdrop-blur-md group overflow-hidden
                        transition-all duration-300 font-medium
                        text-sm md:text-base shadow-sm hover:shadow-md
                        hover:shadow-[#FB8B35]/10 flex items-center justify-center gap-2
                        text-center min-h-[44px]"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Search className="text-[#FB8B35] w-3 h-3 md:w-4 md:h-4 flex-shrink-0 relative z-10" />
                      <span className="relative z-10 truncate">{item}</span>
                      {i === 0 && (
                        <motion.div
                          className="absolute -top-1 -right-1 w-2 h-2 bg-[#FB8B35] rounded-full"
                          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>

            <style jsx>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SearchOverlay;