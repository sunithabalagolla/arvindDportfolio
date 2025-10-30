import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGlobe } from 'react-icons/fa';

function LanguageDropdown({ scrolled }) {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'తె', name: 'Telugu' },
    { code: 'हि', name: 'Hindi' },
    { code: 'த', name: 'Tamil' }
  ];

  const handleLanguageSelect = (lang) => {
    setSelectedLang(lang.code);
    setIsLanguageOpen(false);
  };

  return (
    <div className="relative hidden md:block">
      <motion.button
        className={`
          flex items-center justify-center
          h-10 md:h-12
          px-3 md:px-4
          rounded-xl
          font-inter 
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
          text-sm md:text-base lg:text-base
          font-normal
          hover:scale-[1.02]
          active:scale-[0.98]
          space-x-2 md:space-x-3
          min-w-fit
          relative
        `}
        onClick={() => setIsLanguageOpen(!isLanguageOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <FaGlobe className={`${scrolled ? 'text-white/90' : 'text-white/100'} transition-all duration-300 flex-shrink-0`} />
        <span className={`${scrolled ? 'text-white' : 'text-white/90'} transition-all duration-300`}>
          {selectedLang}
        </span>
        <motion.div
          animate={{ rotate: isLanguageOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className={`w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent ${
            scrolled ? 'border-t-white/90' : 'border-t-white/100'
          } transition-all duration-300 ml-1`}
        />
      </motion.button>

      {/* Language Dropdown Menu */}
      <AnimatePresence>
        {isLanguageOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 -left- bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[140px] z-50"
          >
            {languages.map((lang) => (
              <motion.button
                key={lang.code}
                className="w-full px-4 py-2 text-left text-black hover:bg-gray-100 transition-colors duration-200 flex items-center gap-3"
                onClick={() => handleLanguageSelect(lang)}
                whileHover={{ backgroundColor: '#f3f4f6' }}
              >
                <span className="font-medium">{lang.code}</span>
                <span className="text-gray-600">{lang.name}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop overlay */}
      {isLanguageOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsLanguageOpen(false)}
        />
      )}
    </div>
  );
}

export default LanguageDropdown;