import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

// ✅ Admin
// import { getActiveSlides } from '../../utils/api/public/public/heroSlideApi';
import { getActiveSlides } from '../../utils/api/public/heroSlideApi';

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import slide1 from '../../assets/images/home/hero-slide-1.png';
import slide2 from '../../assets/images/home/hero-slide-2.jpg';
import slide3 from '../../assets/images/home/hero-slide-3.png';

function Carousel() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [mounted, setMounted] = useState(false);


  // ✅ Admin
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setMounted(true);
    fetchSlidesFromAPI();
  }, []);


  // ✅ ADD this function
  const fetchSlidesFromAPI = async () => {
    try {
      const response = await getActiveSlides();
      setSlides(response.data.slides);
    } catch (err) {
      setError('Failed to load carousel');
      console.error('Error fetching slides:', err);
    } finally {
      setLoading(false);
    }
  };



  // Split text into words for animation
  const AnimatedHeading = ({ text, slideId }) => {
    const words = text.split(' ');
    return (
      <h2 className={`!font-['Abhaya_Libre'] ${
      slideId === '69087a2021d63826c1ddd55b' // The Foundation slide's _id
        ? 'text-sm sm:text-2xl md:text-[70px]' // Smaller size for Foundation slide
        : 'text-sm sm:text-3xl md:text-[84px]' // Default size
      } mb-6 font-bold relative`}>
        {words.map((word, index) => (
          <span
            key={index}
            className="inline-block animate-word-reveal opacity-0 text-white relative"
            style={{
              animationDelay: `${index * 0.15}s`,
              animationFillMode: 'forwards',
              textShadow: '0 4px 30px rgba(251, 139, 53, 0.8), 0 2px 15px rgba(0, 0, 0, 0.5), 0 0 60px rgba(251, 139, 53, 0.4)'
            }}
          >
            {word}&nbsp;
          </span>
        ))}
        {/* Premium Animated Underline with Sparkle Effect */}
        <div className="relative mt-4">
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#FB8B35] via-orange-400 to-yellow-400 rounded-full animate-expand-width shadow-2xl shadow-[#FB8B35]/70"></div>
          <div className="absolute top-0 left-0 w-24 h-1.5 bg-gradient-to-r from-white via-yellow-200 to-white opacity-60 rounded-full animate-shimmer-slide"></div>
        </div>
      </h2>
    );
  };

  // Animated paragraph with letter spacing effect
  const AnimatedParagraph = ({ text }) => {
    return (
      <p className="font-['Hind_Siliguri'] text-xs font-normal sm:text-base md:text-lg leading-relaxed mb-6 text-[#FAFAFA] animate-fade-slide-in opacity-0"
        style={{
          animationDelay: '0.6s',
          animationFillMode: 'forwards',
          textShadow: '0 3px 20px rgba(0, 0, 0, 0.7), 0 1px 8px rgba(0, 0, 0, 0.8), 0 0 30px rgba(251, 139, 53, 0.2)',
          letterSpacing: '0.3px'
        }}>
        {text}
      </p>
    );
  };



  // ✅ ADmin
  if (loading) {
    return (
      <div className="relative w-full h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading carousel...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-full h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">{error}</div>
      </div>
    );
  }
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Premium Gradient Mesh Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none z-[1]">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-[#FB8B35]/40 to-transparent rounded-full blur-3xl animate-mesh-1"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-purple-600/30 to-transparent rounded-full blur-3xl animate-mesh-2"></div>
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-radial from-orange-500/20 to-transparent rounded-full blur-3xl animate-mesh-3"></div>
      </div>

      {/* Enhanced Floating Particles with Multiple Sizes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        {[...Array(25)].map((_, i) => {
          const size = Math.random() * 16 + 4;
          const isLarge = size > 12;
          return (
            <div
              key={i}
              className={`absolute rounded-full bg-gradient-to-br from-[#FB8B35] via-orange-400 to-yellow-300 animate-float-particle ${isLarge ? 'blur-md' : 'blur-sm'}`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: isLarge ? 0.4 : 0.3,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 15 + 10}s`,
                boxShadow: isLarge ? '0 0 20px rgba(251, 139, 53, 0.5)' : 'none'
              }}
            />
          );
        })}
      </div>

      {/* Animated Diagonal Lines */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none z-[1]">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FB8B35] to-transparent animate-line-slide"></div>
        <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-line-slide animation-delay-2s"></div>
      </div>

      {/* Premium Glowing Orbs */}
      <div className="absolute top-10 right-10 w-48 h-48 bg-[#FB8B35] rounded-full opacity-25 blur-3xl animate-pulse-glow z-[1]"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-600 rounded-full opacity-20 blur-3xl animate-pulse-glow animation-delay-2s z-[1]"></div>
      <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-yellow-500 rounded-full opacity-15 blur-2xl animate-pulse-glow animation-delay-3s z-[1]"></div>

      {/* Simple Navigation Arrows */}
      <div
        ref={prevRef}
        className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-50
                   text-white/80 cursor-pointer 
                   transition-all duration-300
                   hover:text-[#FB8B35]
                   hover:scale-125
                   hover:drop-shadow-[0_0_15px_rgba(251,139,53,0.8)]
                   active:scale-95 select-none
                   animate-fade-in-left"
        aria-label="Previous Slide"
      >
        <FaChevronLeft className="text-3xl md:text-5xl drop-shadow-lg" />
      </div>

      <div
        ref={nextRef}
        className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-50
                   text-white/80 cursor-pointer 
                   transition-all duration-300
                   hover:text-[#FB8B35]
                   hover:scale-125
                   hover:drop-shadow-[0_0_15px_rgba(251,139,53,0.8)]
                   active:scale-95 select-none
                   animate-fade-in-right"
        aria-label="Next Slide"
      >
        <FaChevronRight className="text-3xl md:text-5xl drop-shadow-lg" />
      </div>

      <Swiper
        modules={[Pagination, Autoplay, Navigation, EffectFade]}
        slidesPerView={1}
        loop={true}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1500}
        pagination={{
          clickable: true,
          bulletActiveClass: 'custom-bullet-active',
          renderBullet: (index, className) => {
            return `<span class="${className}"></span>`;
          }
        }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* Background Image with Advanced Effects */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={slide.imageUrl}
                  alt={slide.heading}
                  className="w-full h-full object-cover object-center scale-105 animate-ken-burns"
                />
              </div>

              {/* Premium Multi-Layer Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-60"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#FB8B35]/25 via-transparent to-purple-600/20"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]"></div>

              {/* Animated Light Beams */}
              <div className="absolute inset-0 overflow-hidden opacity-40">
                <div className="absolute top-0 left-1/4 w-[2px] h-full bg-gradient-to-b from-transparent via-[#FB8B35]/70 to-transparent animate-light-ray shadow-[0_0_15px_rgba(251,139,53,0.8)]"></div>
                <div className="absolute top-0 right-1/3 w-[2px] h-full bg-gradient-to-b from-transparent via-orange-400/60 to-transparent animate-light-ray animation-delay-2s shadow-[0_0_15px_rgba(255,157,79,0.8)]"></div>
                <div className="absolute top-0 left-2/3 w-[2px] h-full bg-gradient-to-b from-transparent via-yellow-400/50 to-transparent animate-light-ray animation-delay-3s shadow-[0_0_15px_rgba(255,193,102,0.8)]"></div>
              </div>

              {/* Sparkle Effects */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full animate-sparkle"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${Math.random() * 2 + 2}s`
                    }}
                  />
                ))}
              </div>

          
              {/* Text Content */}
              <div className="absolute inset-0 flex items-center sm:items-center pt-10 sm:pb-8">
                {slide.alignment === 'left' ? (
                  // LEFT ALIGNMENT: Content on left side
                  <div className="text-white text-center sm:text-left max-w-[850px] mx-auto sm:mx-0 px-4 
                  sm:pl-10 md:pl-38 relative z-10">
                    <AnimatedHeading text={slide.heading} slideId={slide._id} />
                    <AnimatedParagraph text={slide.paragraph} />

                    <div className="flex justify-center sm:justify-center lg:justify-start w-full animate-slide-scale opacity-0"
                      style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
                      <button
                        onClick={() => window.location.href = slide.buttonLink}
                        className="group relative w-[150px] sm:w-auto px-6 sm:px-8 py-3 sm:py-4
            bg-gradient-to-r from-[#FB8B35] via-orange-500 to-orange-600
            text-white text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider
            rounded-2xl border-2 border-[#FB8B35]
            shadow-2xl shadow-[#FB8B35]/50
            hover:shadow-[0_0_40px_rgba(251,139,53,0.8)]
            transform hover:scale-110 hover:-translate-y-2 active:scale-95
            transition-all duration-700 flex items-center justify-center gap-2 
            overflow-hidden
            before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent
            before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-1000">

                        <span className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></span>

                        <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <span className="absolute inset-[-2px] rounded-2xl bg-gradient-to-r from-[#FB8B35] via-yellow-400 to-[#FB8B35] animate-rotate-border"></span>
                        </span>

                        <span className="relative z-10 font-bold group-hover:text-[#FB8B35] transition-colors duration-300">
                          {slide.buttonText}
                        </span>

                        <svg className="w-5 h-5 relative z-10 group-hover:translate-x-2 group-hover:animate-bounce-arrow transition-transform duration-500 group-hover:text-[#FB8B35]"
                          fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>

                        <span className="absolute inset-0 rounded-2xl border-2 border-white opacity-0 group-hover:opacity-75 scale-100 group-hover:scale-110 transition-all duration-500"></span>
                        <span className="absolute inset-0 rounded-2xl border-2 border-[#FB8B35] opacity-0 group-hover:opacity-50 scale-100 group-hover:scale-125 transition-all duration-700"></span>
                      </button>
                    </div>
                  </div>
                ) : (
                  // RIGHT ALIGNMENT: Content on right side
                  <div className="text-white text-center sm:text-left max-w-[850px] mx-auto sm:ml-auto sm:mr-0                 px-3 sm:pr-10 md:pr-16 relative z-10">
                    <AnimatedHeading text={slide.heading} slideId={slide._id} />
                    <AnimatedParagraph text={slide.paragraph} />

                    <div className="flex justify-center sm:justify-center lg:justify-start w-full animate-slide-scale opacity-0"
                      style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
                      <button
                        onClick={() => window.location.href = slide.buttonLink}
                        className="group relative w-[150px] sm:w-auto px-6 sm:px-8 py-3 sm:py-4
            bg-gradient-to-r from-[#FB8B35] via-orange-500 to-orange-600
            text-white text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider
            rounded-2xl border-2 border-[#FB8B35]
            shadow-2xl shadow-[#FB8B35]/50
            hover:shadow-[0_0_40px_rgba(251,139,53,0.8)]
            transform hover:scale-110 hover:-translate-y-2 active:scale-95
            transition-all duration-700 flex items-center justify-center gap-2 
            overflow-hidden
            before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent
            before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-1000">

                        <span className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></span>

                        <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <span className="absolute inset-[-2px] rounded-2xl bg-gradient-to-r from-[#FB8B35] via-yellow-400 to-[#FB8B35] animate-rotate-border"></span>
                        </span>

                        <span className="relative z-10 font-bold group-hover:text-[#FB8B35] transition-colors duration-300">
                          {slide.buttonText}
                        </span>

                        <svg className="w-5 h-5 relative z-10 group-hover:translate-x-2 group-hover:animate-bounce-arrow transition-transform duration-500 group-hover:text-[#FB8B35]"
                          fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>

                        <span className="absolute inset-0 rounded-2xl border-2 border-white opacity-0 group-hover:opacity-75 scale-100 group-hover:scale-110 transition-all duration-500"></span>
                        <span className="absolute inset-0 rounded-2xl border-2 border-[#FB8B35] opacity-0 group-hover:opacity-50 scale-100 group-hover:scale-125 transition-all duration-700"></span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Styles */}
      <style jsx>{`
        /* Premium Pagination Bullets */
        :global(.swiper-pagination) {
          bottom: 30px !important;
        }

        :global(.swiper-pagination-bullet) {
          width: 14px;
          height: 14px;
          background: rgba(255, 255, 255, 0.6);
          opacity: 1;
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }

        :global(.swiper-pagination-bullet::before) {
          content: '';
          position: absolute;
          inset: -5px;
          border: 2px solid transparent;
          border-radius: 50%;
          transition: all 0.6s ease;
        }

        :global(.swiper-pagination-bullet:hover) {
          transform: scale(1.2);
          background: rgba(251, 139, 53, 0.6);
        }

        :global(.custom-bullet-active) {
          width: 45px;
          border-radius: 8px;
          background: linear-gradient(135deg, #FB8B35, #ff9d4f, #ffb366, #FFD700);
          box-shadow: 0 0 25px rgba(251, 139, 53, 1), 0 0 50px rgba(251, 139, 53, 0.6);
          animation: bullet-pulse 2s ease-in-out infinite;
        }

        :global(.custom-bullet-active::before) {
          border-color: rgba(251, 139, 53, 0.8);
          transform: scale(1.4);
        }

        @keyframes bullet-pulse {
          0%, 100% {
            box-shadow: 0 0 25px rgba(251, 139, 53, 1), 0 0 50px rgba(251, 139, 53, 0.6);
          }
          50% {
            box-shadow: 0 0 35px rgba(251, 139, 53, 1), 0 0 70px rgba(251, 139, 53, 0.8);
          }
        }

        /* Premium Ken Burns Effect */
        @keyframes ken-burns {
          0% {
            transform: scale(1) rotate(0deg);
          }
          50% {
            transform: scale(1.08) rotate(0.5deg);
          }
          100% {
            transform: scale(1.15) rotate(0deg);
          }
        }

        .animate-ken-burns {
          animation: ken-burns 25s ease-in-out infinite alternate;
        }

        /* Premium Word Reveal */
        @keyframes word-reveal {
          0% {
            opacity: 0;
            transform: translateY(60px) rotateX(-90deg) scale(0.8);
            filter: blur(15px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotateX(0) scale(1);
            filter: blur(0);
          }
        }

        .animate-word-reveal {
          animation: word-reveal 1s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-origin: center bottom;
        }

        /* Shimmer Slide Effect */
        @keyframes shimmer-slide {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        .animate-shimmer-slide {
          animation: shimmer-slide 3s ease-in-out infinite;
        }

        /* Expand Width with Bounce */
        @keyframes expand-width {
          0% {
            width: 0;
            opacity: 0;
          }
          70% {
            width: 110px;
          }
          100% {
            width: 96px;
            opacity: 1;
          }
        }

        .animate-expand-width {
          animation: expand-width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s forwards;
          width: 0;
        }

        /* Fade Slide In */
        @keyframes fade-slide-in {
          0% {
            opacity: 0;
            transform: translateY(50px);
            filter: blur(5px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        .animate-fade-slide-in {
          animation: fade-slide-in 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* Premium Slide Scale */
        @keyframes slide-scale {
          0% {
            opacity: 0;
            transform: translateY(60px) scale(0.7);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-slide-scale {
          animation: slide-scale 1s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* Enhanced Floating Particles */
        @keyframes float-particle {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translate(30px, -40px) rotate(90deg) scale(1.2);
            opacity: 0.7;
          }
          50% {
            transform: translate(-15px, -80px) rotate(180deg) scale(0.8);
            opacity: 0.4;
          }
          75% {
            transform: translate(40px, -50px) rotate(270deg) scale(1.1);
            opacity: 0.8;
          }
        }

        .animate-float-particle {
          animation: float-particle linear infinite;
        }

        /* Mesh Animations */
        @keyframes mesh-1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translate(-50px, 50px) scale(1.2);
            opacity: 0.6;
          }
        }

        @keyframes mesh-2 {
          0%, 100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translate(30px, -30px) scale(1.3) rotate(45deg);
            opacity: 0.5;
          }
        }

        @keyframes mesh-3 {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.4);
            opacity: 0.4;
          }
        }

        .animate-mesh-1 {
          animation: mesh-1 20s ease-in-out infinite;
        }

        .animate-mesh-2 {
          animation: mesh-2 25s ease-in-out infinite;
        }

        .animate-mesh-3 {
          animation: mesh-3 15s ease-in-out infinite;
        }

        /* Premium Pulse Glow */
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.15);
          }
        }

        .animate-pulse-glow {
          animation: pulse-glow 5s ease-in-out infinite;
        }

        /* Premium Light Ray */
        @keyframes light-ray {
          0%, 100% {
            opacity: 0;
            transform: translateY(-120%);
          }
          10% {
            opacity: 0.7;
          }
          50% {
            opacity: 0.8;
            transform: translateY(50%);
          }
          90% {
            opacity: 0.7;
          }
          100% {
            opacity: 0;
            transform: translateY(120%);
          }
        }

        .animate-light-ray {
          animation: light-ray 10s ease-in-out infinite;
        }

        /* Sparkle Effect */
        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
          }
        }

        .animate-sparkle {
          animation: sparkle ease-in-out infinite;
        }

        /* Line Slide */
        @keyframes line-slide {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        .animate-line-slide {
          animation: line-slide 8s ease-in-out infinite;
        }

        /* Rotating Border */
        @keyframes rotate-border {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .animate-rotate-border {
          animation: rotate-border 3s linear infinite;
        }

        /* Bounce Arrow */
        @keyframes bounce-arrow {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(5px);
          }
        }

        .animate-bounce-arrow {
          animation: bounce-arrow 0.6s ease-in-out infinite;
        }

        /* Fade In Directions */
        @keyframes fade-in-left {
          0% {
            opacity: 0;
            transform: translate(-50px, -50%);
          }
          100% {
            opacity: 1;
            transform: translate(0, -50%);
          }
        }

        @keyframes fade-in-right {
          0% {
            opacity: 0;
            transform: translate(50px, -50%);
          }
          100% {
            opacity: 1;
            transform: translate(0, -50%);
          }
        }

        .animate-fade-in-left {
          animation: fade-in-left 1s ease-out;
        }

        .animate-fade-in-right {
          animation: fade-in-right 1s ease-out;
        }

        /* Animation Delays */
        .animation-delay-1s {
          animation-delay: 1s;
        }

        .animation-delay-2s {
          animation-delay: 2s;
        }

        .animation-delay-3s {
          animation-delay: 3s;
        }
      `}</style>
    </div>
  );
}

export default Carousel;