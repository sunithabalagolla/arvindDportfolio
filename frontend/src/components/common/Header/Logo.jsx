import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo/logo.png';

function Logo() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center">
      <motion.img
        src={logo}
        alt="Logo"
        onClick={() => navigate('/')}
        className="h-6 sm:h-7 md:h-10 lg:h-12 xl:h-14 w-auto object-contain drop-shadow-md cursor-pointer"
      />
    </div>
  );
}

export default Logo;