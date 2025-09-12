import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import image1 from '../../assets/images/foundation/FoundationSection-img1.png';
import image2 from '../../assets/images/foundation/FoundationSection-img2.png';
import image3 from '../../assets/images/foundation/FoundationSection-img3.png';
import image4 from '../../assets/images/foundation/FoundationSection-img4.png';
import image5 from '../../assets/images/foundation/FoundationSection-img5.png';

export default function ArvindFoundationCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);//sliding
  
 
  const images = [
   image1, // Image 1
   image2, // Image 2
   image3, // Image 3
   image4, // Image 4
   image5 // Image 5
  ];

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 9000);

    return () => clearInterval(interval);
  }, []);

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
    setCurrentIndex(prev => prev + 1);
    setTimeout(() => setIsTransitioning(false), 1200);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev - 1);
    setTimeout(() => setIsTransitioning(false), 1200);
  };

  const goToSlide = (targetIndex) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(targetIndex);
    setTimeout(() => setIsTransitioning(false), 1200);
  };

  // Calculate style for each position
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
      // Right image
      translateX =30;
      scale = 0.8;
      opacity = 0.8;
      zIndex = 15;
      rotateY = -25;
      
    } else if (position === -1) {
      // Left image
      translateX = -30;
      scale = 0.8;
      opacity = 0.8;
      zIndex = 15;
      rotateY = 25;
    } else if (position === 2) {
      // Far right image
      translateX = 50;
      scale = 0.6;
      opacity = 0.5;
      zIndex = 10;
      rotateY = -35;
    } else if (position === -2) {
      // Far left image
      translateX = -50;
      scale = 0.6;
      opacity = 0.5;
      zIndex = 10;
      rotateY = 35;
    }

    return {
      transform: `translateX(${translateX}%) scale(${scale}) rotateY(${rotateY}deg)`,
      opacity,
      zIndex,
      transition: "all 1.2s ease-in-out", // <- ensures visible effect
    };
  };

  const visibleImages = getVisibleImages();

  return (
    <div className="min-h-screen bg-white-50 py-12">
      {/* Header */}
      <div className="text-center mb-2">
        <h2 className="text-xl md:text-5xl font-bold text-gray-900 mb-4">
          Arvind Dharmapuri Foundation
        </h2>
         <div className="w-16 sm:w-24 h-1 bg-orange-500 mx-auto"></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto px-4">
          Together for progress, driven by compassion and commitment.
        </p>
      </div>

      {/* Carousel Container */}
      <div className="max-w-7xl mx-auto px-1">
        <div className="relative h-96 md:h-[500px] lg:h-[600px] flex items-center justify-center overflow-hidden">
          <div 
            className="relative w-full h-full flex items-center justify-center"
            style={{ perspective: '1000px' }}
          >
            {/* Visible Images (Always 5) */}
            {visibleImages.map((imageData, index) => (
              <div
                key={`${imageData.originalIndex}-${currentIndex}-${imageData.position}`}
                className="absolute w-56 md:w-80 lg:w-160 h-64 md:h-96 lg:h-[350px] cursor-pointer"
                style={getImageStyle(imageData.position)}
                onClick={() => goToSlide(imageData.originalIndex)}
              >
                <div className="w-full h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={imageData.src}
                    alt={`Slide ${imageData.originalIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
               
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 backdrop-blur-sm hover:bg-opacity-95 rounded-full p-3 md:p-4 transition-all duration-200 group z-30 shadow-lg disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700 group-hover:text-gray-900" />
          </button>

          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 backdrop-blur-sm hover:bg-opacity-95 rounded-full p-3 md:p-4 transition-all duration-200 group z-30 shadow-lg disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-700 group-hover:text-gray-900" />
          </button>
        </div>

    

        {/* Dot Indicators */}
        <div className="flex justify-center mt-8 space-x-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`w-3 h-3 rounded-full transition-all duration-300 disabled:opacity-50 ${
                getCircularIndex(currentIndex) === index
                  ? 'bg-green-500 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

  
    </div>
  );
}