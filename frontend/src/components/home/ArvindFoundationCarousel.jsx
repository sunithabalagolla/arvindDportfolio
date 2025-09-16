import React, { useState, useEffect } from 'react';
import image1 from '../../assets/images/foundation/FoundationSection-img1.png';
import image2 from '../../assets/images/foundation/FoundationSection-img2.png';
import image3 from '../../assets/images/foundation/FoundationSection-img3.png';
import image4 from '../../assets/images/foundation/FoundationSection-img4.png';
import image5 from '../../assets/images/foundation/FoundationSection-img5.png';


export default function ArvindFoundationCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Sample images - replace with your actual images
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
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (targetIndex) => {
    if (isTransitioning || targetIndex === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(targetIndex);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setCurrentIndex(prev => (prev + 1) % images.length);
      }
    }, 9000);

    return () => clearInterval(interval);
  }, [isTransitioning, images.length]);

  // Calculate style for each position with responsive adjustments
  const getImageStyle = (position) => {
    let translateX = 0;
    let scale = 1;
    let opacity = 1;
    let zIndex = 5;
    let rotateY = 0;

    if (position === 0) {
      // Center image
      translateX = 0;
      scale = 1;
      opacity = 1;
      zIndex = 20;
      rotateY = 0;
    } else if (position === 1) {
      // Right image - adjusted for different screen sizes
      translateX = window.innerWidth < 640 ? 45 : window.innerWidth < 1024 ? 35 : 25;
      scale = window.innerWidth < 640 ? 0.7 : window.innerWidth < 1024 ? 0.8 : 0.85;
      opacity = window.innerWidth < 640 ? 0.6 : window.innerWidth < 1024 ? 0.8 : 0.85;
      zIndex = 15;
      rotateY = window.innerWidth < 640 ? -8 : -2;
    } else if (position === -1) {
      // Left image - adjusted for different screen sizes
      translateX = window.innerWidth < 640 ? -45 : window.innerWidth < 1024 ? -35 : -25;
      scale = window.innerWidth < 640 ? 0.7 : window.innerWidth < 1024 ? 0.8 : 0.85;
      opacity = window.innerWidth < 640 ? 0.6 : window.innerWidth < 1024 ? 0.8 : 0.85;
      zIndex = 15;
      rotateY = window.innerWidth < 640 ? 8 : 2;
    } else if (position === 2) {
      // Far right image
      translateX = window.innerWidth < 640 ? 70 : window.innerWidth < 1024 ? 60 : 45;
      scale = window.innerWidth < 640 ? 0.5 : window.innerWidth < 1024 ? 0.6 : 0.7;
      opacity = window.innerWidth < 640 ? 0.3 : window.innerWidth < 1024 ? 0.5 : 0.6;
      zIndex = 10;
      rotateY = window.innerWidth < 640 ? -20 : -10;
    } else if (position === -2) {
      // Far left image
      translateX = window.innerWidth < 640 ? -70 : window.innerWidth < 1024 ? -60 : -45;
      scale = window.innerWidth < 640 ? 0.5 : window.innerWidth < 1024 ? 0.6 : 0.7;
      opacity = window.innerWidth < 640 ? 0.3 : window.innerWidth < 1024 ? 0.5 : 0.6;
      zIndex = 10;
      rotateY = window.innerWidth < 640 ? 20 : 10;
    }

    return {
      transform: `translateX(${translateX}%) scale(${scale}) rotateY(${rotateY}deg)`,
      opacity,
      zIndex,
      transition: "all 1.2s ease-in-out",
    };
  };

  const visibleImages = getVisibleImages();

  return (
    <div className="min-h-screen bg-white py-6 sm:py-8 lg:py-12">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8 lg:mb-12 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
          Arvind Dharmapuri Foundation
        </h2>
        <div className="w-12 sm:w-16 md:w-20 lg:w-24 h-1 bg-orange-500 mx-auto mb-3 sm:mb-4"></div>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto px-2 sm:px-4">
          Together for progress, driven by compassion and commitment.
        </p>
      </div>

      {/* Carousel Container */}
      <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6   lg:-mt-42">
        <div className="relative h-64 sm:h-80 md:h-96 lg:h-[550px] xl:h-[650px] 2xl:h-[750px] flex items-center justify-center overflow-hidden">
          <div 
            className="relative w-full h-full flex items-center justify-center sm:mt-90px"
            style={{ perspective: '1000px' }}
          >
            {/* Visible Images (Always 5) */}
            {visibleImages.map((imageData, index) => (
              <div
                key={`${imageData.originalIndex}-${currentIndex}-${imageData.position}`}
                className="absolute cursor-pointer
                  w-40 h-32 
                  xs:w-44 xs:h-36
                  sm:w-52 sm:h-40 
                  md:w-64 md:h-48 
                  lg:w-[26rem] lg:h-80 
                  xl:w-[32rem] xl:h-96
                  2xl:w-[38rem] 2xl:h-[22rem]"
                style={getImageStyle(imageData.position)}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Image clicked:', imageData.originalIndex, 'Current:', currentIndex);
                  if (!isTransitioning && imageData.originalIndex !== currentIndex) {
                    goToSlide(imageData.originalIndex);
                  }
                }}
              >
                <div className="w-full h-full rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl pointer-events-auto">
                  <img
                    src={imageData.src}
                    alt={`Slide ${imageData.originalIndex + 1}`}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center -mt-10 sm:mt-6 lg:-mt-28 space-x-2 sm:space-x-3 lg:space-x-4 relative z-40">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Dot clicked:', index, 'Current:', currentIndex, 'Transitioning:', isTransitioning);
                if (!isTransitioning) {
                  goToSlide(index);
                }
              }}
              disabled={isTransitioning}
              className={`
                w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 
                rounded-full transition-all duration-300 
                disabled:opacity-50 hover:scale-110 
                cursor-pointer relative z-50
                focus:outline-none focus:ring-2 focus:ring-green-400
                ${currentIndex === index
                  ? 'bg-green-500 scale-125 shadow-lg'
                  : 'bg-gray-300 hover:bg-gray-400'
                }
              `}
              style={{ 
                minWidth: '10px', 
                minHeight: '10px',
                padding: '2px',
                margin: '0 2px'
              }}
            >
              <span className="sr-only">Go to slide {index + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}