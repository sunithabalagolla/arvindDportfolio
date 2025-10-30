// components/home/FullWidthImage.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import banner from '../../assets/images/singleFrame/banner.png';

export default function FullWidthImage() {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform values for parallax
  const imageY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 0, 0.8]);
  const glowIntensity = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);

  // Mouse move effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Floating elements configuration
  const floatingElements = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 80 + 20,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5
  }));

  return (
    <motion.div 
      ref={containerRef}
      className="relative w-full min-h-[50vh] md:min-h-[70vh] lg:min-h-[90vh] overflow-hidden bg-gradient-to-b from-white via-orange-50/10 to-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Premium Animated Background Layers */}
      <div className="absolute inset-0">
        {/* Gradient Mesh Background */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-0 w-[60%] h-[60%] bg-gradient-radial from-[#FB8B35]/20 via-orange-300/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-gradient-radial from-orange-400/20 via-[#FB8B35]/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] bg-gradient-radial from-orange-300/15 to-transparent rounded-full blur-2xl" />
        </div>

        {/* Animated Grid Pattern */}
        <motion.div 
          className="absolute inset-0 opacity-[0.03]"
          animate={{
            backgroundPosition: ['0px 0px', '100px 100px']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: `linear-gradient(to right, #FB8B35 1px, transparent 1px),
                             linear-gradient(to bottom, #FB8B35 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }}
        />

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {floatingElements.map((element) => (
            <motion.div
              key={element.id}
              className="absolute rounded-full"
              style={{
                width: element.size,
                height: element.size,
                left: `${element.x}%`,
                top: `${element.y}%`,
                background: `radial-gradient(circle, rgba(251,139,53,${0.1 + Math.random() * 0.2}) 0%, transparent 70%)`
              }}
              animate={{
                y: [-30, 30, -30],
                x: [-20, 20, -20],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: element.duration,
                delay: element.delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Image Container with Premium Effects */}
      <motion.div 
        className="relative w-full h-full"
        style={{ 
          y: imageY,
          scale: imageScale
        }}
      >
        {/* Loading Skeleton */}
        <AnimatePresence>
          {!isLoaded && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </AnimatePresence>

        {/* Multiple Image Layers for Depth */}
        <div className="relative">
          {/* Shadow Layer */}
          <motion.div
            className="absolute inset-0 bg-black/20 blur-2xl"
            style={{
              transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`
            }}
          />

          {/* Main Image */}
          <motion.img
            src={banner}
            alt="Premium Banner"
            className="w-full h-auto object-cover relative z-10"
            onLoad={() => setIsLoaded(true)}
            initial={{ scale: 1.2, filter: "blur(20px)" }}
            animate={{ 
              scale: 1,
              filter: "blur(0px)"
            }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              transform: `perspective(1000px) rotateY(${(mousePosition.x - 0.5) * 5}deg) rotateX(${(mousePosition.y - 0.5) * -5}deg)`
            }}
          />

          {/* Premium Overlay Effects */}
          <motion.div 
            className="absolute inset-0 pointer-events-none z-20"
            style={{ opacity: overlayOpacity }}
          >
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FB8B35]/10 via-transparent to-[#FB8B35]/10" />
          </motion.div>

          {/* Dynamic Light Rays */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-30 overflow-hidden"
            animate={{
              opacity: isHovered ? 1 : 0.5
            }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-0 h-full w-1 bg-gradient-to-b from-transparent via-white/20 to-transparent"
                style={{
                  left: `${20 * i + 10}%`,
                  transform: 'rotate(15deg) scaleY(2)'
                }}
                animate={{
                  x: [-100, 100],
                  opacity: [0, 0.5, 0]
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>

          {/* Interactive Shimmer Effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-40"
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 5,
              ease: "easeInOut"
            }}
          >
            <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 blur-xl" />
          </motion.div>

          {/* Corner Glow Effects */}
          <motion.div
            className="absolute top-0 left-0 w-96 h-96 pointer-events-none z-25"
            style={{ opacity: glowIntensity }}
          >
            <div className="w-full h-full bg-gradient-radial from-[#FB8B35]/30 to-transparent rounded-full blur-3xl" />
          </motion.div>
          <motion.div
            className="absolute bottom-0 right-0 w-96 h-96 pointer-events-none z-25"
            style={{ opacity: glowIntensity }}
          >
            <div className="w-full h-full bg-gradient-radial from-orange-400/30 to-transparent rounded-full blur-3xl" />
          </motion.div>

          {/* Premium Text Overlay (Optional) */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center">
              <motion.h2 
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
                initial={{ y: 50 }}
                animate={{ y: isHovered ? 0 : 50 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <span className="bg-gradient-to-r from-white via-orange-200 to-white bg-clip-text text-transparent drop-shadow-2xl">
                  Excellence in Leadership
                </span>
              </motion.h2>
              <motion.p
                className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-xl"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: isHovered ? 0 : 30, opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Transforming vision into reality for a better tomorrow
              </motion.p>
            </div>
          </motion.div>

          {/* Animated Border Frame */}
          <div className="absolute inset-4 pointer-events-none z-60">
            {/* Top Left */}
            <motion.div
              className="absolute top-0 left-0 w-20 h-20"
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="w-full h-1 bg-gradient-to-r from-transparent to-[#FB8B35]" />
              <div className="h-full w-1 bg-gradient-to-b from-[#FB8B35] to-transparent" />
            </motion.div>

            {/* Top Right */}
            <motion.div
              className="absolute top-0 right-0 w-20 h-20"
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            >
              <div className="w-full h-1 bg-gradient-to-l from-transparent to-[#FB8B35]" />
              <div className="h-full w-1 bg-gradient-to-b from-[#FB8B35] to-transparent ml-auto" />
            </motion.div>

            {/* Bottom Left */}
            <motion.div
              className="absolute bottom-0 left-0 w-20 h-20"
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            >
              <div className="w-full h-1 bg-gradient-to-r from-transparent to-[#FB8B35] mt-auto" />
              <div className="h-full w-1 bg-gradient-to-t from-[#FB8B35] to-transparent" />
            </motion.div>

            {/* Bottom Right */}
            <motion.div
              className="absolute bottom-0 right-0 w-20 h-20"
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            >
              <div className="w-full h-1 bg-gradient-to-l from-transparent to-[#FB8B35] mt-auto" />
              <div className="h-full w-1 bg-gradient-to-t from-[#FB8B35] to-transparent ml-auto" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Premium Bottom Accent */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-2 overflow-hidden"
        style={{ opacity: glowIntensity }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-[#FB8B35] via-orange-400 to-[#FB8B35]"
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundSize: '200% 100%'
          }}
        />
      </motion.div>

      {/* Pulse Indicator */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-70"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0, 0.5]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-32 h-32 border-2 border-white/30 rounded-full" />
      </motion.div>
    </motion.div>
  );
}