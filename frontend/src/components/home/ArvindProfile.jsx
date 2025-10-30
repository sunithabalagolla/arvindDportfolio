import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Award, Users, TrendingUp, ArrowRight } from 'lucide-react';
import profileimage from '../../assets/images/home/Group.png';

export default function ArvindProfile() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [glow, setGlow] = useState({ x: -9999, y: -9999 });
  const cardRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleKnowMoreClick = () => {
    navigate('/about/timeline');
  };

  const handleMouseMove = (e) => {
    if (isMobile || !cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = x / rect.width;
    const py = y / rect.height;

    const rotateMax = 3;
    const rx = (py - 0.5) * -2 * rotateMax;
    const ry = (px - 0.5) * 2 * rotateMax;

    setTilt({ rx, ry });
    setGlow({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
    setGlow({ x: -9999, y: -9999 });
    setIsHovered(false);
  };

  const stats = [
    { icon: Users, label: "Constituency", value: "Nizamabad", color: "#FB8B35" },
    { icon: Award, label: "Position", value: "MP (Lok Sabha)", color: "#FF6B35" },
    { icon: TrendingUp, label: "Experience", value: "10+ Years", color: "#FFD93D" }
  ];

  return (
    <div className="relative min-h-[80vh] bg-gradient-to-br from-orange-50 via-white to-orange-50/50 py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 right-10 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-gradient-to-br from-[#FB8B35]/10 to-orange-300/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-gradient-to-tr from-[#FFD93D]/10 to-orange-200/10 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
        
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] md:h-[800px] md:w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-20 md:opacity-30 bg-[radial-gradient(ellipse_at_center,rgba(251,139,53,0.12),transparent_65%)]" />

        {/* Fewer particles on mobile */}
        {[...Array(isMobile ? 8 : 15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 md:w-2 md:h-2 bg-[#FB8B35] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <main className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#FB8B35]/10 to-orange-300/10 rounded-full mb-3 sm:mb-4 backdrop-blur-sm border border-[#FB8B35]/20">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-[#FB8B35]" />
            <span className="text-xs sm:text-sm font-semibold text-gray-700">Leadership Profile</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold px-4">
            <span className="bg-gradient-to-r from-gray-900 via-[#FB8B35] to-gray-900 bg-clip-text text-transparent">
              Meet Your Representative
            </span>
          </h1>
        </motion.div>

        {/* Profile Card */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={() => !isMobile && setIsHovered(true)}
          className="relative"
        >
          {/* Glow highlight - Desktop only */}
          {!isMobile && (
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl md:rounded-3xl transition-opacity duration-300 z-0"
              style={{
                background: `radial-gradient(300px circle at ${glow.x}px ${glow.y}px, rgba(251,139,53,0.15), transparent 60%)`,
                opacity: isHovered ? 1 : 0,
                filter: 'blur(20px)',
              }}
            />
          )}

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl overflow-hidden border border-gray-200 md:border-2 md:border-gray-100 transition-all duration-500 hover:border-[#FB8B35]/40 hover:shadow-2xl md:hover:shadow-[0_25px_80px_rgba(251,139,53,0.25)]"
            style={{
              transform: isMobile ? 'none' : `perspective(1500px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              transformStyle: isMobile ? 'flat' : 'preserve-3d',
            }}
          >
            <div className="flex flex-col lg:flex-row">
              {/* Image Section */}
              <motion.div
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-full lg:w-2/5 overflow-hidden group"
                style={{ transform: isMobile ? 'none' : 'translateZ(40px)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#FB8B35]/10 via-[#FB8B35]/5 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                  />
                </div>
                
                <img
                  src={profileimage}
                  alt="Arvind Dharmapuri"
                  className="w-full h-64 sm:h-80 md:h-96 lg:h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105 lg:group-hover:scale-110"
                />
                
                <div className="pointer-events-none absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-[#FB8B35]/20 to-transparent rounded-bl-full transition-transform duration-700 group-hover:scale-110 lg:group-hover:scale-125" />
                <div className="pointer-events-none absolute bottom-0 left-0 w-28 sm:w-40 h-28 sm:h-40 bg-gradient-to-tr from-[#FB8B35]/15 to-transparent rounded-tr-full transition-transform duration-700 group-hover:scale-110 lg:group-hover:scale-125" />
              </motion.div>

              {/* Content Section */}
              <motion.div
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-full lg:w-3/5 p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12 bg-gradient-to-br from-white via-orange-50/5 to-orange-50/10 relative overflow-hidden"
                style={{ transform: isMobile ? 'none' : 'translateZ(30px)' }}
              >
                <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-[#FB8B35]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10">
                  {/* MP Badge */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 0.5, type: "spring" }}
                    className="inline-block mb-4 sm:mb-6"
                  >
                    <div className="relative group/badge">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#FB8B35] to-orange-600 rounded-lg sm:rounded-xl blur-md opacity-50 group-hover/badge:opacity-75 transition-opacity" />
                      <span className="relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-[#FB8B35] to-orange-600 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg">
                        <motion.span
                          className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"
                          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        Member of Parliament
                      </span>
                    </div>
                  </motion.div>

                  {/* Name */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 leading-tight"
                  >
                    <span className="bg-gradient-to-r from-gray-900 via-[#FB8B35] to-gray-900 bg-clip-text text-transparent">
                      Arvind Dharmapuri
                    </span>
                  </motion.h2>

                  {/* Title */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-6"
                  >
                    <div className="h-px flex-1 bg-gradient-to-r from-[#FB8B35] to-transparent" />
                    <p className="text-base sm:text-lg md:text-xl font-bold text-[#FB8B35] whitespace-nowrap">
                      MP from Nizamabad
                    </p>
                    <div className="h-px flex-1 bg-gradient-to-l from-[#FB8B35] to-transparent" />
                  </motion.div>

                  {/* Statistics */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-5 sm:mb-6 md:mb-8"
                  >
                    {stats.map((stat, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="relative group/stat bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl p-2.5 sm:p-3 md:p-4 border border-gray-100 hover:border-[#FB8B35]/30 transition-all duration-300 cursor-pointer"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#FB8B35]/5 to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300 rounded-xl sm:rounded-2xl" />
                        <div className="relative">
                          <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mb-1 sm:mb-2" style={{ color: stat.color }} />
                          <p className="text-[10px] sm:text-xs text-gray-600 mb-0.5 sm:mb-1">{stat.label}</p>
                          <p className="text-xs sm:text-sm md:text-base font-bold text-gray-900 leading-tight">{stat.value}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Biography */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="space-y-3 sm:space-y-4 mb-5 sm:mb-6 md:mb-8"
                  >
                    <motion.p
                      whileHover={{ x: isMobile ? 0 : 5 }}
                      className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed hover:text-gray-900 transition-all duration-300"
                    >
                      Arvind Dharmapuri is an Indian politician who is the current Member of Parliament in the Lok
                      Sabha from Nizamabad, Telangana. He was born on 25th August 1976. He is the youngest of
                      two sons of D. Srinivas who served as a three-time Congress MLA from Nizamabad.
                    </motion.p>
                    <motion.p
                      whileHover={{ x: isMobile ? 0 : 5 }}
                      className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed hover:text-gray-900 transition-all duration-300"
                    >
                      Arvind's father D. Srinivas served as a Member of Parliament (Rajya Sabha) and a minister for the state
                      of Andhra Pradesh. His family belongs to the Munnuru Kapu community, categorised as an Other Backward Class.
                    </motion.p>
                  </motion.div>

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                  >
                    <motion.button
                      onClick={handleKnowMoreClick}
                      whileHover={{ scale: isMobile ? 1 : 1.05, y: isMobile ? 0 : -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full sm:w-auto group/btn relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#FB8B35] via-orange-500 to-[#FB8B35] text-white font-bold rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-[length:200%_100%] hover:bg-[length:100%_100%]"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000" />
                      <span className="absolute -inset-1 bg-gradient-to-r from-[#FB8B35] to-orange-600 rounded-xl sm:rounded-2xl blur opacity-0 group-hover/btn:opacity-60 transition-opacity duration-500 -z-10" />
                      
                      <span className="relative flex items-center justify-center gap-2 text-sm sm:text-base">
                        Know More About Journey
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </span>
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Bottom accent line */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-[#FB8B35] via-orange-400 to-[#FFD93D]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            />
          </motion.div>
        </div>

        {/* Additional Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mt-8 sm:mt-10 md:mt-12"
        >
          {[
            { title: "Vision", desc: "Building a progressive and inclusive Nizamabad", icon: "🎯" },
            { title: "Mission", desc: "Empowering communities through development", icon: "🚀" },
            { title: "Values", desc: "Integrity, service, and commitment to people", icon: "⭐" }
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ y: isMobile ? 0 : -8, scale: isMobile ? 1 : 1.02 }}
              className="relative group bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border-2 border-gray-100 hover:border-[#FB8B35]/30 shadow-lg hover:shadow-xl md:hover:shadow-2xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#FB8B35]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl sm:rounded-2xl" />
              <div className="relative">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{card.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2 group-hover:text-[#FB8B35] transition-colors">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
              
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FB8B35] to-orange-400 rounded-b-xl sm:rounded-b-2xl"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}