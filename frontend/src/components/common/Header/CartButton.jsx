import React from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart } from 'react-icons/fa';

function CartButton({ scrolled, cartItemCount, onClick }) {
  return (
    <div className="relative hidden md:block">
      <motion.button
        onClick={onClick}
        className={`
          flex items-center justify-center
          w-10 md:w-12
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
          flex relative
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaShoppingCart
          className={`${scrolled ? 'text-white/100 hover:text-white' : 'text-white/100 hover:text-white'} transition-all duration-300`}
        />

        {cartItemCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold 
              rounded-full w-5 h-5 flex items-center justify-center
              shadow-lg border-2 border-white"
          >
            {cartItemCount > 9 ? '9+' : cartItemCount}
          </motion.span>
        )}
      </motion.button>
    </div>
  );
}

export default CartButton;