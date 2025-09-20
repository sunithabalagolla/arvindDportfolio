import React, { useState, useEffect, useRef } from "react";
import {
  FaSearch,
  FaUser,
  FaBars,
  FaGlobe,
  FaTimes,
  FaShoppingCart,
  FaChevronDown,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from 'react-router-dom';
import { Search, TrendingUp, Clock, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/logo/logo.png";

function Header({ forceOrangeBackground = false }) {



  //
   const location = useLocation();
  const isDashboardPage = location.pathname === '/dashboard' || location.pathname.includes('/dashboard');


  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  
  // Language dropdown state
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');

  // Search scroll functionality
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollRef = useRef(null);
  
  // Add ref for search input
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Focus search input when search overlay opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      // Use setTimeout to ensure the input is rendered before focusing
      const focusTimeout = setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
      
      return () => clearTimeout(focusTimeout);
    }
  }, [searchOpen]);

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

  // Language options
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

  // Navigation items with submenus
  const navigationItems = [
    {
      name: "Home",
      href: "/",
      subItems: null
    },
    {
      name: "About Us",
      href: null,
      subItems: [
        { name: "Timeline", href: "/about/timeline" },
        { name: "Foundation", href: "/about/foundation" }
      ]
    },
    {
      name: "My View",
      href: "/myview",
      subItems: null
    },
    {
      name: "Press",
      href: "/press",
      subItems: null
    },
    {
      name: "Get in Touch",
      href: null,
      subItems: [
        { name: "Contact Us", href: "/contact" },
        { name: "Support", href: "/support" },
        { name: "Office Locations", href: "/locations" }
      ]
    },
    {
      name: "Newsletter",
      href: "/newsletter",
      subItems: null
    }
  ];

  // Updated button styles with subtle hover effects
  const buttonBaseClasses = `
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
    font-inter
    text-sm md:text-base lg:text-base
    font-normal
    hover:scale-[1.02]
    active:scale-[0.98]
  `;

  const iconButtonClasses = `
    ${buttonBaseClasses}
    w-10 md:w-12
  `;

  const textButtonClasses = `
    ${buttonBaseClasses}
    space-x-2 md:space-x-3
    min-w-fit
  `;

  const searchButtonClasses = `
    ${buttonBaseClasses}
    space-x-2 md:space-x-3
    w-28 sm:w-36 md:w-43
      font-inter
    text-sm md:text-base lg:text-2xl
    font-medium
  `;

  const handleNavClick = (item, subItem = null) => {
    if (subItem) {
      window.location.href = subItem.href;
    } else if (item.href) {
      window.location.href = item.href;
    }
    setMenuOpen(false);
    setHoveredItem(null);
  };

  // Handle search open with proper focus management
  const handleSearchOpen = () => {
    setSearchOpen(true);
  };

  // Handle search close
  const handleSearchClose = () => {
    setSearchOpen(false);
    // Optional: Clear the input value when closing
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
  };

//naviate the auth login page 
 const navigate = useNavigate();
  
  // Add this function
  const handleLoginClick = () => {
    navigate('/login'); // or '/signup' based on your preference
  };
  
  return (
     <header className="fixed top-0 left-0 w-full z-50 transition-all duration-500">
     
      {/* Header container with BJP orange background when scrolled */}
      <div
        className={`
          grid grid-cols-[auto_1fr_auto] items-center gap-4
          px-4 py-3 md:px-8 lg:px-16 xl:px-32 md:py-4
         ${(scrolled && !isDashboardPage) || isDashboardPage || forceOrangeBackground
            ? 'bg-[#FB8B35] backdrop-blur-xl border-b border-orange-400/30 shadow-2xl'
            : 'bg-white/15 backdrop-blur-none border-b border-white/5'
          }
          transition-all duration-500 ease-out
        `}
      >
        {/* Logo */}
        <div className="flex items-center">
          <motion.img
            src={logo}
            alt="Logo"
            className="h-8 md:h-12 lg:h-14 w-auto object-contain drop-shadow-md "
          />
        </div>

        {/* Spacer */}
        <div></div>

        {/* Right side buttons */}
        <div className="flex items-center gap-2 md:gap-3 text-white">
          {/* Search Button */}
          <motion.button
            className={searchButtonClasses}
            onClick={handleSearchOpen}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaSearch className={`${scrolled ? 'text-white/90' : 'text-white/100'} group-hover:text-white transition-all duration-300 flex-shrink-0`} />
            <span className={`${scrolled ? 'text-white' : 'text-white/90'} truncate text-xs md:text-base transition-all duration-300`}>Search here</span>
          </motion.button>

          {/* Login/Signup - Desktop only */}
          <motion.button  onClick={handleLoginClick} // Add this
            className={`${textButtonClasses} hidden lg:flex`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaUser className={`${scrolled ? 'text-white/90' : 'text-white/100'} transition-all duration-300 flex-shrink-0`} />
            <span className={`${scrolled ? 'text-white' : 'text-white/90'} whitespace-nowrap transition-all duration-300`}>Login/Signup</span>
          </motion.button>

          {/* Language Dropdown - Desktop only */}
          <div className="relative hidden md:block">
            <motion.button
              className={`${textButtonClasses} relative`}
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
                      className="w-full px-4 py-2  text-left text-black hover:bg-gray-100 transition-colors duration-200 flex items-center gap-3"
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

            {/* Backdrop to close dropdown when clicking outside */}
            {isLanguageOpen && (
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsLanguageOpen(false)}
              />
            )}
          </div>

          {/* Cart - Desktop only */}
          <motion.button
            className={`${iconButtonClasses} hidden md:flex`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaShoppingCart className={`${scrolled ? 'text-white/100 hover:text-white' : 'text-white/100 hover:text-white'} transition-all duration-300`} />
          </motion.button>

          {/* Hamburger */}
          <motion.button
            className={iconButtonClasses}
            onClick={() => setMenuOpen(!menuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: menuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {menuOpen ? (
                <FaTimes className={`${scrolled ? 'text-white/90 hover:text-white' : 'text-white/100 hover:text-white'} transition-all duration-300`} />
              ) : (
                <FaBars className={`${scrolled ? 'text-white/90 hover:text-white' : 'text-white/100 hover:text-white'} transition-all duration-300`} />
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 bg-gradient-to-b from-orange-500 to-orange-600 
            backdrop-blur-xl flex flex-col z-50 overflow-y-auto"
          >
            {/* Header with close button */}
            <div className="flex justify-end p-4 md:p-6">
              <motion.button
                className="text-white/80 text-2xl md:text-3xl hover:text-white 
                p-2 rounded-full hover:bg-white/10 transition-all duration-300
                hover:scale-110 active:scale-90"
                onClick={() => setMenuOpen(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            </div>

            {/* Content container with proper spacing */}
            <div className="flex-1 px-6 pb-6 space-y-6 max-w-sm mx-auto w-full">
              {/* Mobile-only buttons */}
              <div className="space-y-4">
                {/* Login/Signup for mobile */}
                <motion.button
                 onClick={handleLoginClick} // btn
                  className="w-full flex items-center justify-start 
                  h-12 px-4 rounded-xl 
                  bg-gradient-to-r from-white/15 via-white/12 to-white/8 
                  backdrop-blur-2xl border-2 border-white/30
                  hover:from-white/20 hover:via-white/15 hover:to-white/10 hover:border-white/35 
                  shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.2),0_8px_32px_rgba(0,0,0,0.15)]
                  hover:shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.25),0_12px_40px_rgba(0,0,0,0.2)]
                  transition-all duration-300 lg:hidden
                  relative overflow-hidden
                  before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent 
                  before:rounded-xl before:pointer-events-none
                  hover:scale-[1.02] active:scale-[0.98]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaUser className="text-white/80 mr-3 flex-shrink-0 transition-all duration-300" />
                  <span className="text-white/90 font-medium transition-all duration-300">Login / Signup</span>
                </motion.button>

                {/* Language for mobile */}
                <motion.button
                  className="w-full flex items-center justify-start 
                  h-12 px-4 rounded-xl 
                  bg-gradient-to-r from-white/15 via-white/12 to-white/8 
                  backdrop-blur-2xl border-2 border-white/30
                  hover:from-white/20 hover:via-white/15 hover:to-white/10 hover:border-white/35 
                  shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.2),0_8px_32px_rgba(0,0,0,0.15)]
                  hover:shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.25),0_12px_40px_rgba(0,0,0,0.2)]
                  transition-all duration-300 md:hidden
                  relative overflow-hidden
                  before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent 
                  before:rounded-xl before:pointer-events-none
                  hover:scale-[1.02] active:scale-[0.98]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaGlobe className="text-white/80 mr-3 flex-shrink-0 transition-all duration-300" />
                  <span className="text-white/90 font-medium transition-all duration-300">English</span>
                </motion.button>

                {/* Cart for mobile */}
                <motion.button
                  className="w-full flex items-center justify-start 
                  h-12 px-4 rounded-xl 
                  bg-gradient-to-r from-white/15 via-white/12 to-white/8 
                  backdrop-blur-2xl border-2 border-white/30
                  hover:from-white/20 hover:via-white/15 hover:to-white/10 hover:border-white/35 
                  shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.2),0_8px_32px_rgba(0,0,0,0.15)]
                  hover:shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.25),0_12px_40px_rgba(0,0,0,0.2)]
                  transition-all duration-300 md:hidden
                  relative overflow-hidden
                  before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent 
                  before:rounded-xl before:pointer-events-none
                  hover:scale-[1.02] active:scale-[0.98]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaShoppingCart className="text-white/80 mr-3 flex-shrink-0 transition-all duration-300" />
                  <span className="text-white/90 font-medium transition-all duration-300">Shopping Cart</span>
                </motion.button>
              </div>

              {/* Navigation Links with Submenus - Mobile */}
              <motion.nav
                className="space-y-3"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.08,
                      delayChildren: 0.2
                    }
                  }
                }}
              >
                {navigationItems.map((item, i) => (
                  <motion.div
                    key={i}
                    className="relative"
                    variants={{
                      hidden: { y: 30, opacity: 0 },
                      visible: { y: 0, opacity: 1 }
                    }}
                  >
                    {/* Main Navigation Item */}
                    <div
                      className="block w-full text-center py-4 px-6 
text-white/90 hover:text-black text-lg font-medium
rounded-xl hover:bg-white
hover:backdrop-blur-md hover:border hover:border-white/10
transition-all duration-300 group cursor-pointer
flex items-center justify-between
hover:scale-[1.02] active:scale-[0.98]"
                      onClick={() => item.subItems ? setHoveredItem(hoveredItem === i ? null : i) : handleNavClick(item)}
                    >
                      <span className="relative inline-block flex-1 transition-all duration-300">
                        {item.name}
                        <motion.div
                          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: hoveredItem === i ? "100%" : 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </span>
                      {item.subItems && (
                        <motion.div
                          animate={{ rotate: hoveredItem === i ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FaChevronDown className="text-white/60 ml-2 transition-all duration-300" />
                        </motion.div>
                      )}
                    </div>

                    {/* Submenu Items */}
                    <AnimatePresence>
                      {item.subItems && hoveredItem === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden ml-4 mt-2 space-y-2"
                        >
                          {item.subItems.map((subItem, j) => (
                            <motion.button
                              key={j}
                              className="block w-full text-left py-3 px-4 
                              text-white/80 hover:text-white text-base font-normal
                              rounded-lg hover:bg-gradient-to-r hover:from-white/10 hover:to-white/5
                              hover:backdrop-blur-md transition-all duration-300
                              border border-white/10 hover:border-white/20
                              hover:scale-[1.02] active:scale-[0.98]"
                              onClick={() => handleNavClick(item, subItem)}
                              whileHover={{ scale: 1.02, x: 5 }}
                              whileTap={{ scale: 0.98 }}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: j * 0.1 }}
                            >
                              {subItem.name}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay - Full screen */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 bg-white
            backdrop-blur-xl flex flex-col z-50 overflow-y-auto h-screen w-screen"
          >
            {/* Header with close button - Full width */}
            <div className="flex justify-between items-center p-4  md:p-12 md:pr-32 w-full">
              <div></div> {/* Empty div for spacing */}
              <motion.button
                className="text-[#FB6F03] text-2xl md:text-3xl hover:text-black
                p-2 rounded-full transition-colors duration-200"
                onClick={handleSearchClose}
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
    </header>
  );
}

export default Header;