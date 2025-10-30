import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

function SearchButton({ scrolled, onClick }) {
  return (
    <motion.button
      className={`
        flex items-center justify-center
        w-9 sm:w-10 md:w-auto
        h-9 sm:h-10 md:h-12
        px-2 md:px-4 lg:px-6
        rounded-lg md:rounded-xl
        ${scrolled
          ? 'bg-gradient-to-r from-orange-100/20 to-orange-50/10 border-orange-200/30 hover:from-orange-100/25 hover:to-orange-50/15 hover:border-orange-200/40'
          : 'bg-gradient-to-r from-white/8 to-white/5 border-white/20 hover:from-white/10 hover:to-white/7 hover:border-white/25'
        }
        backdrop-blur-none 
        bg-white/5
        border-t border-b border-l border-white/60
        cursor-pointer
        shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_0_20px_rgba(0,0,0,0.2)]
        hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_0_25px_rgba(0,0,0,0.25)]
        transition-all duration-300 ease-out
        font-inter
        text-sm md:text-base
        font-normal
        hover:scale-[1.02]
        active:scale-[0.98]
        gap-1.5 md:gap-2
      `}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <FaSearch className={`${scrolled ? 'text-white/90' : 'text-white/100'} transition-all duration-300 flex-shrink-0 text-sm md:text-base`} />
      <span className={`${scrolled ? 'text-white' : 'text-white/90'} hidden md:inline truncate text-xs lg:text-base transition-all duration-300`}>
        Search
      </span>
    </motion.button>
  );
}

export default SearchButton;