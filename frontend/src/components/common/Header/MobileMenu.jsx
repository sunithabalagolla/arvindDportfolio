import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaGlobe, FaShoppingCart } from 'react-icons/fa';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

function MobileMenu({ isOpen, onClose, navigationItems, cartItemCount, onCartOpen }) {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const handleNavClick = (item, subItem = null) => {
    if (subItem) {
      window.location.href = subItem.href;
    } else if (item.href) {
      window.location.href = item.href;
    }
    onClose();
  };

  const handleLoginClick = () => {
    if (isAuthenticated) {
      navigate('/auth/dashboard');
    } else {
      navigate('/login');
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
          className="fixed inset-0 bg-gradient-to-b from-[#FB8B35] to-[#FB8B35] 
            backdrop-blur-xl flex flex-col z-50 overflow-y-auto"
        >
          {/* Header with close button */}
          <div className="flex justify-end p-4 md:p-6">
            <motion.button
              className="text-white/80 text-2xl md:text-3xl hover:text-white 
                p-2 rounded-full hover:bg-white/10 transition-all duration-300
                hover:scale-110 active:scale-90"
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              ✕
            </motion.button>
          </div>

          {/* Main Menu Content - Responsive Layout */}
          <div className="flex-1 px-6 pb-6">
            <div className="max-w-6xl mx-auto">
              {/* Mobile & Tablet Layout (below lg) */}
              <div className="lg:hidden">
                {/* Mobile-only buttons first */}
                <div className="space-y-3 mb-6">
                  {/* Login/Signup for mobile */}
                  <motion.button
                    onClick={handleLoginClick}
                    className="w-full flex items-center justify-start 
                      h-12 px-4 rounded-xl 
                      bg-gradient-to-r from-white/15 via-white/12 to-white/8 
                      backdrop-blur-2xl border-2 border-white/30
                      hover:from-white/20 hover:via-white/15 hover:to-white/10 hover:border-white/35 
                      shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.2),0_8px_32px_rgba(0,0,0,0.15)]
                      hover:shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.25),0_12px_40px_rgba(0,0,0,0.2)]
                      transition-all duration-300
                      relative overflow-hidden
                      before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent 
                      before:rounded-xl before:pointer-events-none
                      hover:scale-[1.02] active:scale-[0.98]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaUser className="text-white/80 mr-3 flex-shrink-0 transition-all duration-300" />
                    <span className="text-white/90 font-medium transition-all duration-300">
                      {isAuthenticated ? user?.firstName || 'Dashboard' : 'Login / Signup'}
                    </span>
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
                      transition-all duration-300 md:block
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
                    onClick={onCartOpen}
                    className="w-full flex items-center justify-start 
                      h-12 px-4 rounded-xl 
                      bg-gradient-to-r from-white/15 via-white/12 to-white/8 
                      backdrop-blur-2xl border-2 border-white/30
                      hover:from-white/20 hover:via-white/15 hover:to-white/10 hover:border-white/35 
                      shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.2),0_8px_32px_rgba(0,0,0,0.15)]
                      hover:shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.25),0_12px_40px_rgba(0,0,0,0.2)]
                      transition-all duration-300 md:block
                      relative overflow-hidden
                      before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent 
                      before:rounded-xl before:pointer-events-none
                      hover:scale-[1.02] active:scale-[0.98]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative">
                      <FaShoppingCart className="text-white/80 mr-3 flex-shrink-0 transition-all duration-300" />

                      {/* Mobile Cart Badge */}
                      {cartItemCount > 0 && (
                        <span className="absolute -top-2 -right-1 bg-red-500 text-white text-xs font-bold 
                          rounded-full w-4 h-4 flex items-center justify-center
                          shadow-lg border border-white">
                          {cartItemCount > 9 ? '9+' : cartItemCount}
                        </span>
                      )}
                    </div>

                    <span className="text-white/90 font-medium transition-all duration-300">
                      Shopping Cart {cartItemCount > 0 && `(${cartItemCount})`}
                    </span>
                  </motion.button>
                </div>

                {/* Mobile/Tablet Two-Column Layout */}
                <div className="grid grid-cols-[1fr_1px_1fr] gap-4 md:gap-8 h-full">
                  {/* Left Column - Main Navigation */}
                  <div className="space-y-2">
                    <motion.div
                      className="space-y-2"
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
                          variants={{
                            hidden: { y: 30, opacity: 0 },
                            visible: { y: 0, opacity: 1 }
                          }}
                        >
                          <motion.button
                            className={`w-full text-left py-3 md:py-4 px-3 md:px-4 text-base md:text-lg font-medium
                              rounded-lg md:rounded-xl transition-all duration-300 group cursor-pointer
                              flex items-center justify-between
                              ${selectedMenuItem === i
                                ? 'bg-white text-black shadow-lg'
                                : 'text-white/90 hover:text-black hover:bg-white'
                              }
                              hover:scale-[1.02] active:scale-[0.98]`}
                            onClick={() => {
                              if (item.subItems) {
                                setSelectedMenuItem(selectedMenuItem === i ? null : i);
                              } else {
                                handleNavClick(item);
                              }
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span>{item.name}</span>
                            {item.subItems && (
                              <motion.div
                                animate={{ rotate: selectedMenuItem === i ? 90 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                              </motion.div>
                            )}
                          </motion.button>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>

                  {/* Vertical Separator Line */}
                  <div className="w-0.5 bg-white/20 mx-auto"></div>

                  {/* Right Column - Submenu Items */}
                  <div>
                    <AnimatePresence mode="wait">
                      {selectedMenuItem !== null && navigationItems[selectedMenuItem]?.subItems && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-2 md:space-y-3"
                        >
                          <h3 className="text-white text-lg md:text-xl font-semibold mb-3 md:mb-4">
                            {navigationItems[selectedMenuItem]?.name}
                          </h3>
                          {navigationItems[selectedMenuItem]?.subItems.map((subItem, j) => (
                            <motion.button
                              key={j}
                              className="block w-full text-left py-2.5 md:py-3 px-3 md:px-4 
                                text-white/80 hover:text-black text-sm md:text-base font-normal
                                rounded-lg hover:bg-white
                                transition-all duration-300
                                hover:scale-[1.02] active:scale-[0.98]"
                              onClick={() => handleNavClick(navigationItems[selectedMenuItem], subItem)}
                              whileHover={{ scale: 1.02, x: 5 }}
                              whileTap={{ scale: 0.98 }}
                              initial={{ x: 20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: j * 0.1 }}
                            >
                              {subItem.name}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {selectedMenuItem === null && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-center h-full min-h-[150px] md:min-h-[200px]"
                      >
                        <p className="text-white/60 text-center text-sm md:text-base px-2">
                          Select a menu item to see options
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>

              {/* Desktop Layout (lg and above) */}
              <div className="hidden lg:grid lg:grid-cols-[1fr_2px_2fr] gap-8 lg:gap-12 h-full">
                {/* Left Column - Main Navigation */}
                <div className="space-y-4">
                  {/* Main Navigation Items */}
                  <motion.div
                    className="space-y-2"
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
                        variants={{
                          hidden: { y: 30, opacity: 0 },
                          visible: { y: 0, opacity: 1 }
                        }}
                      >
                        <motion.button
                          className={`w-full text-left py-4 px-6 text-lg font-medium
                            rounded-xl transition-all duration-300 group cursor-pointer
                            flex items-center justify-between
                            ${selectedMenuItem === i
                              ? 'bg-white text-black shadow-lg'
                              : 'text-white/90 hover:text-black hover:bg-white'
                            }
                            hover:scale-[1.02] active:scale-[0.98]`}
                          onClick={() => {
                            if (item.subItems) {
                              setSelectedMenuItem(selectedMenuItem === i ? null : i);
                            } else {
                              handleNavClick(item);
                            }
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span>{item.name}</span>
                          {item.subItems && (
                            <motion.div
                              animate={{ rotate: selectedMenuItem === i ? 90 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronRight className="w-5 h-5" />
                            </motion.div>
                          )}
                        </motion.button>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Vertical Separator Line */}
                <div className="w-0.5 bg-white/20 mx-auto"></div>

                {/* Right Column - Submenu Items */}
                <div className="lg:pl-8">
                  <AnimatePresence mode="wait">
                    {selectedMenuItem !== null && navigationItems[selectedMenuItem]?.subItems && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-3"
                      >
                        <h3 className="text-white text-xl font-semibold mb-4 lg:mb-6">
                          {navigationItems[selectedMenuItem]?.name}
                        </h3>
                        {navigationItems[selectedMenuItem]?.subItems.map((subItem, j) => (
                          <motion.button
                            key={j}
                            className="block w-full text-left py-3 px-4 
                              text-white/80 hover:text-black text-base font-normal
                              rounded-lg hover:bg-white
                              transition-all duration-300
                              hover:scale-[1.02] active:scale-[0.98]"
                            onClick={() => handleNavClick(navigationItems[selectedMenuItem], subItem)}
                            whileHover={{ scale: 1.02, x: 5 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: j * 0.1 }}
                          >
                            {subItem.name}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {selectedMenuItem === null && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center justify-center h-full min-h-[200px]"
                    >
                      <p className="text-white/60 text-center text-lg">
                        Select a menu item to see its options
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;