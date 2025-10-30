import React from 'react';
import { motion } from 'framer-motion';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

function ProfileButton({ scrolled }) {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const handleClick = () => {
    if (isAuthenticated) {
      navigate('/auth/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <motion.button
      onClick={handleClick}
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
        hidden lg:flex
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <FaUser className={`${scrolled ? 'text-white/90' : 'text-white/100'} transition-all duration-300 flex-shrink-0`} />
      <span className={`${scrolled ? 'text-white' : 'text-white/90'} whitespace-nowrap transition-all duration-300`}>
        {isAuthenticated ? user?.firstName || 'Dashboard' : 'Login/Signup'}
      </span>
    </motion.button>
  );
}

export default ProfileButton;