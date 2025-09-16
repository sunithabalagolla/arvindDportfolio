import React, { useState, useEffect } from "react";
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

import logo from "../../assets/logo/logo.png";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      // Navigate to submenu item
      window.location.href = subItem.href;
    } else if (item.href) {
      // Navigate to main item (only if it has direct href)
      window.location.href = item.href;
    }
    setMenuOpen(false);
    setHoveredItem(null);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-500">
      {/* Header container with BJP orange background when scrolled */}
      <div
        className={`
          grid grid-cols-[auto_1fr_auto] items-center gap-4
          px-4 py-3 md:px-8 lg:px-16 xl:px-32 md:py-4
          ${scrolled
            ? 'bg-gradient-to-r from-orange-500/95 via-orange-600/95 to-orange-500/95 backdrop-blur-xl border-b border-orange-400/30 shadow-2xl'
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

        {/* Right side buttons with flexbox layout */}
        <div className="flex items-center gap-2 md:gap-3 text-white">

          {/* Search Button - Updated with subtle hover effects */}
          <motion.button
            className={searchButtonClasses}
            onClick={() => setSearchOpen(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaSearch className={`${scrolled ? 'text-white/90' : 'text-white/100'} group-hover:text-white transition-all duration-300 flex-shrink-0`} />
            <span className={`${scrolled ? 'text-white' : 'text-white/90'} truncate text-xs md:text-base transition-all duration-300`}>Search here</span>
          </motion.button>

          {/* Login/Signup - Desktop only, updated with subtle hover effects */}
          <motion.button
            className={`${textButtonClasses} hidden lg:flex`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaUser className={`${scrolled ? 'text-white/90' : 'text-white/100'} transition-all duration-300 flex-shrink-0`} />
            <span className={`${scrolled ? 'text-white' : 'text-white/90'} whitespace-nowrap transition-all duration-300`}>Login/Signup</span>
          </motion.button>

          {/* Language - Desktop only, updated with subtle hover effects */}
          <motion.button
            className={`${textButtonClasses} hidden md:flex`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaGlobe className={`${scrolled ? 'text-white/90' : 'text-white/100'} transition-all duration-300 flex-shrink-0`} />
            <span className={`${scrolled ? 'text-white' : 'text-white/90'} transition-all duration-300`}>EN</span>
          </motion.button>

          {/* Cart - Desktop only, updated with subtle hover effects */}
          <motion.button
            className={`${iconButtonClasses} hidden md:flex`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaShoppingCart className={`${scrolled ? 'text-white/100 hover:text-white' : 'text-white/100 hover:text-white'} transition-all duration-300`} />
          </motion.button>

          {/* Hamburger - Updated with subtle hover effects */}
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

      {/* Mobile Menu Overlay - Fixed sizing and spacing */}
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

              {/* Mobile-only buttons - Updated with subtle hover effects */}
              <div className="space-y-4">
                {/* Login/Signup for mobile */}
                <motion.button
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

      {/* Search Overlay - Mobile optimized */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 bg-gradient-to-b from-black/70 to-black/90 
            backdrop-blur-xl flex flex-col z-50 overflow-y-auto"
          >
            {/* Header with close button */}
            <div className="flex justify-end p-4 md:p-6">
              <motion.button
                className="text-white/80 text-2xl md:text-3xl hover:text-white 
                p-2 rounded-full hover:bg-white/10 transition-all duration-300
                hover:scale-110 active:scale-90"
                onClick={() => setSearchOpen(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            </div>

            {/* Search content - Mobile optimized */}
            <div className="flex-1 px-4 md:px-8 pb-6 max-w-4xl mx-auto w-full">

              {/* Search input - Responsive */}
              <motion.div
                className="w-full bg-gradient-to-r from-white/95 to-white/90 
                rounded-2xl md:rounded-3xl shadow-2xl flex items-center 
                px-4 md:px-6 py-3 md:py-4 mb-8
                backdrop-blur-xl border border-white/30
                hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <FaSearch className="text-gray-600 text-lg md:text-2xl mr-3 md:mr-4 flex-shrink-0 transition-all duration-300" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  autoFocus
                  className="w-full text-base md:text-xl text-gray-800 placeholder-gray-500 
                  focus:outline-none bg-transparent font-medium transition-all duration-300"
                />
              </motion.div>

              {/* Search suggestions - Mobile optimized */}
              <div className="space-y-6 md:space-y-8">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <h2 className="text-white/90 text-lg md:text-xl mb-3 md:mb-4 font-medium">Recent Searches</h2>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {["React", "Hotels", "Movies"].map((item, i) => (
                      <motion.button
                        key={i}
                        className="px-3 md:px-4 py-2 md:py-2.5 
                        bg-gradient-to-r from-white/15 to-white/10 
                        rounded-lg md:rounded-xl text-white/90 
                        hover:from-white/20 hover:to-white/15 hover:text-white
                        backdrop-blur-md border border-white/20
                        transition-all duration-300 font-medium
                        text-sm md:text-base
                        hover:scale-105 active:scale-95"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {item}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <h2 className="text-white/90 text-lg md:text-xl mb-3 md:mb-4 font-medium">Popular Searches</h2>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {["BTS", "Football", "iPhone", "Hyderabad"].map((item, i) => (
                      <motion.button
                        key={i}
                        className="px-3 md:px-4 py-2 md:py-2.5 
                        bg-gradient-to-r from-white/15 to-white/10 
                        rounded-lg md:rounded-xl text-white/90 
                        hover:from-white/20 hover:to-white/15 hover:text-white
                        backdrop-blur-md border border-white/20
                        transition-all duration-300 font-medium
                        text-sm md:text-base
                        hover:scale-105 active:scale-95"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {item}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;