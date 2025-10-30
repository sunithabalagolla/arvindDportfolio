import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import CartDropdown from '../../../pages/shopNavigate/CartDropdown';

// Import child components
import Logo from './Logo';
import SearchButton from './SearchButton';
import SearchOverlay from './SearchOverlay';
import ProfileButton from './ProfileButton';
import LanguageDropdown from './LanguageDropdown';
import CartButton from './CartButton';
import MobileMenu from './MobileMenu';

// Import data and hooks
import { navigationItems } from './navigationData';
import useHeaderScroll from './hooks/useHeaderScroll';
import useCart from './hooks/useCart';

function Header({ forceOrangeBackground = false }) {
  const location = useLocation();
  const isDashboardPage = location.pathname === '/dashboard' || location.pathname.includes('/dashboard');

  // Custom hooks
  const scrolled = useHeaderScroll();
  const cartItemCount = useCart();

  // State management
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 overflow-x-hidden max-w-[100vw]">
      {/* Header container with BJP orange background when scrolled */}
      <div
        className={`
          grid grid-cols-[auto_1fr_auto] items-center gap-4
          px-2 sm:px-3 md:px-8 lg:px-16 xl:px-32 py-2 sm:py-2.5 md:py-4
          ${(scrolled && !isDashboardPage) || isDashboardPage || forceOrangeBackground
            ? 'bg-[#FB8B35] backdrop-blur-xl border-b border-orange-400/30 shadow-2xl'
            : 'bg-transparent backdrop-blur-none border-b border-white/10'
          }
          transition-all duration-500 ease-out
        `}
      >
        {/* Logo */}
        <Logo />

        {/* Spacer */}
        <div></div>

        {/* Right side buttons */}
        <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 text-white">
          {/* Search Button */}
          <SearchButton scrolled={scrolled} onClick={() => setSearchOpen(true)} />

          {/* Login/Signup - Desktop only */}
          <ProfileButton scrolled={scrolled} />

          {/* Language Dropdown - Desktop only */}
          <LanguageDropdown scrolled={scrolled} />

          {/* Cart - Desktop only */}
          <CartButton 
            scrolled={scrolled} 
            cartItemCount={cartItemCount} 
            onClick={() => setIsCartOpen(!isCartOpen)} 
          />

          {/* Hamburger - ALWAYS VISIBLE */}
          <motion.button
            className={`
              flex items-center justify-center
              w-9 sm:w-10 md:w-12
              h-9 sm:h-10 md:h-12
              rounded-lg md:rounded-xl
              ${scrolled
                ? 'bg-gradient-to-r from-orange-100/20 to-orange-50/10 border-orange-200/30 hover:from-orange-100/25'
                : 'bg-gradient-to-r from-white/8 to-white/5 border-white/20 hover:from-white/10'
              }
              backdrop-blur-none 
              bg-white/5
              border-t border-b border-l border-white/60
              cursor-pointer
              shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]
              transition-all duration-300
              hover:scale-[1.02]
              active:scale-[0.98]
            `}
            onClick={() => setMenuOpen(!menuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: menuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {menuOpen ? (
                <FaTimes className={`${scrolled ? 'text-white/90 hover:text-white' : 'text-white/100 hover:text-white'} transition-all duration-300 text-base sm:text-lg md:text-xl`} />
              ) : (
                <FaBars className={`${scrolled ? 'text-white/90 hover:text-white' : 'text-white/100 hover:text-white'} transition-all duration-300 text-base sm:text-lg md:text-xl`} />
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <MobileMenu 
        isOpen={menuOpen} 
        onClose={() => setMenuOpen(false)} 
        navigationItems={navigationItems}
        cartItemCount={cartItemCount}
        onCartOpen={() => setIsCartOpen(true)}
      />

      {/* Search Overlay */}
      <SearchOverlay 
        isOpen={searchOpen} 
        onClose={() => setSearchOpen(false)} 
      />

      {/* Cart Dropdown - Independent component */}
      <CartDropdown 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        scrolled={scrolled}
      />
    </header>
  );
}

export default Header;