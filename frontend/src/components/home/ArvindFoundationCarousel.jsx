import React, { useState, useEffect } from 'react';
import image1 from '../../assets/images/foundation/FoundationSection-img1.png';
import image2 from '../../assets/images/foundation/FoundationSection-img2.png';
import image3 from '../../assets/images/foundation/FoundationSection-img3.png';
import image4 from '../../assets/images/foundation/FoundationSection-img4.png';
import image5 from '../../assets/images/foundation/FoundationSection-img5.png';


export default function ArvindFoundationCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
 
  const images = [
   image1, // Image 1
   image2, // Image 2
   image3, // Image 3
   image4, // Image 4
   image5 // Image 5
  ];

  // Get the circular index for infinite scrolling
  const getCircularIndex = (index) => {
    return ((index % images.length) + images.length) % images.length;
  };

  // Get 5 consecutive images for display
  const getVisibleImages = () => {
    const visibleImages = [];
    for (let i = -2; i <= 2; i++) {
      const imageIndex = getCircularIndex(currentIndex + i);
      visibleImages.push({
        originalIndex: imageIndex,
        position: i,
        src: images[imageIndex]
      });
    }
    return visibleImages;
  };

  // Navigation functions with smooth transition
  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => (prev + 1) % images.length);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const goToSlide = (targetIndex) => {
    if (isTransitioning || targetIndex === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(targetIndex);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setCurrentIndex(prev => (prev + 1) % images.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isTransitioning, images.length]);

  // Calculate style for each position with enhanced responsiveness
  const getImageStyle = (position) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const isTablet = typeof window !== 'undefined' && window.innerWidth >= 640 && window.innerWidth < 1024;
    
    let translateX = 0;
    let scale = 1;
    let opacity = 1;
    let zIndex = 5;
    let rotateY = 0;
    let brightness = 100;

    if (position === 0) {
      // Center image - main focus
      translateX = 0;
      scale = 1;
      opacity = 1;
      zIndex = 30;
      rotateY = 0;
      brightness = 100;
    } else if (position === 1) {
      // Right image - moved closer to center
      translateX = isMobile ? 45 : isTablet ? 32 : 22;
      scale = isMobile ? 0.65 : isTablet ? 0.75 : 0.82;
      opacity = isMobile ? 0.5 : isTablet ? 0.7 : 0.8;
      zIndex = 20;
      rotateY = isMobile ? -12 : -5;
      brightness = 85;
    } else if (position === -1) {
      // Left image - moved closer to center
      translateX = isMobile ? -45 : isTablet ? -32 : -22;
      scale = isMobile ? 0.65 : isTablet ? 0.75 : 0.82;
      opacity = isMobile ? 0.5 : isTablet ? 0.7 : 0.8;
      zIndex = 20;
      rotateY = isMobile ? 12 : 5;
      brightness = 85;
    } else if (position === 2) {
      // Far right image - moved closer
      translateX = isMobile ? 70 : isTablet ? 55 : 42;
      scale = isMobile ? 0.45 : isTablet ? 0.55 : 0.65;
      opacity = isMobile ? 0.25 : isTablet ? 0.4 : 0.5;
      zIndex = 10;
      rotateY = isMobile ? -25 : -15;
      brightness = 70;
    } else if (position === -2) {
      // Far left image - moved closer
      translateX = isMobile ? -70 : isTablet ? -55 : -42;
      scale = isMobile ? 0.45 : isTablet ? 0.55 : 0.65;
      opacity = isMobile ? 0.25 : isTablet ? 0.4 : 0.5;
      zIndex = 10;
      rotateY = isMobile ? 25 : 15;
      brightness = 70;
    }

    return {
      transform: `translateX(${translateX}%) scale(${scale}) rotateY(${rotateY}deg)`,
      opacity,
      zIndex,
      filter: `brightness(${brightness}%)`,
      transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
    };
  };

  const visibleImages = getVisibleImages();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 py-4 sm:py-6 lg:py-8">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      {/* Header */}
      <div className="relative text-center mb-4 sm:mb-6 lg:mb-8 px-4 z-10">
        <div className="inline-block">
           <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
           Arvind Dharmapuri Foundation
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 mx-auto rounded-full" style={{ background: '#FB8B35' }}></div>
        </div>
        <p className="text-base sm:text-lg md:text-xl lg:text-xl text-gray-600 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4 font-light">
         Together for progress, driven by compassion and commitment 
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-64 sm:h-80 md:h-96 lg:h-[400px] xl:h-[500px] 2xl:h-[600px] flex items-center justify-center overflow-visible">
          
          <div 
            className="relative w-full h-full flex items-center justify-center"
            style={{ perspective: '1500px' }}
          >
            {/* Visible Images */}
            {visibleImages.map((imageData) => (
              <div
                key={`${imageData.originalIndex}-${currentIndex}-${imageData.position}`}
                className="absolute cursor-pointer
                  w-56 h-36
                  xs:w-64 xs:h-42
                  sm:w-80 sm:h-52
                  md:w-96 md:h-60
                  lg:w-[36rem] lg:h-[20rem]
                  xl:w-[42rem] xl:h-[23rem]
                  2xl:w-[48rem] 2xl:h-[26rem]"
                style={getImageStyle(imageData.position)}
                onClick={() => {
                  if (!isTransitioning && imageData.originalIndex !== currentIndex) {
                    goToSlide(imageData.originalIndex);
                  }
                }}
              >
                <div className={`w-full h-full transition-shadow duration-300 overflow-hidden ${imageData.position === 0 ? 'rounded-3xl sm:rounded-[2rem] lg:rounded-[2.5rem]' : 'rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl hover:shadow-3xl'}`}>
                  <img
                    src={imageData.src}
                    alt={`Foundation work ${imageData.originalIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot Indicators with Navigation Arrows */}
        <div className="flex justify-center items-center mt-4 sm:mt-6 gap-4 sm:gap-6 relative z-40">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="text-2xl sm:text-3xl text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-bold"
            style={{ color: isTransitioning ? '' : undefined }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#FB8B35'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#4B5563'}
            aria-label="Previous slide"
          >
            ←
          </button>

          {/* Dots */}
          <div className="flex space-x-3 sm:space-x-4">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isTransitioning) {
                    goToSlide(index);
                  }
                }}
                disabled={isTransitioning}
                style={currentIndex === index ? { backgroundColor: '#FB8B35' } : {}}
                className={`
                  transition-all duration-300 rounded-full
                  disabled:opacity-50 hover:scale-110 
                  cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2
                  ${currentIndex === index
                    ? 'w-10 sm:w-12 h-3 sm:h-3.5 shadow-lg scale-110'
                    : 'w-3 sm:w-3.5 h-3 sm:h-3.5 bg-gray-300 hover:bg-orange-300'
                  }
                `}
              >
                <span className="sr-only">Go to slide {index + 1}</span>
              </button>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="text-2xl sm:text-3xl text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-bold"
            style={{ color: isTransitioning ? '' : undefined }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#FB8B35'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#4B5563'}
            aria-label="Next slide"
          >
            →
          </button>
        </div>

    
      </div>
    </div>
  );
}