import React, { useState } from 'react';
import image1 from '../../assets/images/Donation/sampleright.jpeg';
import image2 from '../../assets/images/Donation/sampleleft.jpeg';
import image3 from '../../assets/images/Donation/donationCenter.png';

const ArvindArmyCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="py-8 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-16">
          
          {/* Text Content - Now on Right */}
          <div className="w-full lg:w-1/2 text-center lg:text-left px-2 sm:px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 mb-2 px-2">
              Arvind Army
            </h2>
            
            <p className="text-base xs:text-lg sm:text-lg md:text-base text-gray-700 mb-6 sm:mb-8 lg:mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
             Be a part of the change. Be a part of the fight for justice. Be a part of the various activities under the leadership of our beloved MP Arvind Dharmapuri.
            </p>

            <div className="flex flex-col xs:flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <button className="bg-[#FB8B35] hover:bg-orange-600 text-white px-6 xs:px-7 sm:px-8 py-3 xs:py-3.5 sm:py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm xs:text-base">
                Join the Movement
              </button>
              <button className="border-2 border-gray-300 hover:border-orange-500 text-gray-700 hover:text-orange-700 px-6 xs:px-7 sm:px-8 py-3 xs:py-3.5 sm:py-4 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-sm xs:text-base">
                Know More 
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Image Section - Now on Left */}
          <div className="w-full lg:w-1/2 relative">
            
            {/* Mobile Layout (Single Image) */}
            <div className="block md:hidden">
              <div className="relative mx-auto w-48 h-60 xs:w-56 xs:h-70 sm:w-64 sm:h-80">
                <img
                  src={image3}
                  alt="Main Person"
                  className="w-full h-full object-cover rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl"
                />
                <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 rounded-full shadow-lg"></div>
                <div className="absolute -bottom-1.5 sm:-bottom-2 -left-1.5 sm:-left-2 w-4 h-4 sm:w-6 sm:h-6 bg-pink-500 rounded-full shadow-lg"></div>
              </div>
            </div>

            {/* Tablet Layout (2 Images) */}
            <div className="hidden md:block lg:hidden">
              <div className="relative flex items-center justify-center gap-8">
                <div className="relative">
                  <img
                    src={image1}
                    alt="Left Person"
                    className="w-40 h-52 object-cover rounded-2xl shadow-xl transform rotate-3 hover:rotate-1 transition-transform duration-300"
                  />
                </div>
                <div className="relative">
                  <img
                    src={image3}
                    alt="Main Person"
                    className="w-48 h-60 object-cover rounded-2xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-300"
                  />
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-orange-500 rounded-full shadow-lg"></div>
                  <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-pink-500 rounded-full shadow-lg"></div>
                </div>
              </div>
            </div>

            {/* Desktop Layout (3D Stack) */}
            <div 
              className="hidden lg:block"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="relative flex items-center justify-center h-96" style={{ perspective: '1200px' }}>
                
                {/* Left Image */}
                <div 
                  className="absolute transition-all duration-700 ease-out"
                  style={{
                    transform: isHovered 
                      ? 'translateX(-8rem) rotateY(15deg) rotateX(-8deg) scale(0.95)'
                      : 'translateX(-6rem) rotateY(25deg) rotateX(-12deg) scale(0.9)',
                    transformStyle: 'preserve-3d',
                    zIndex: 1
                  }}
                >
                  <img
                    src={image1}
                    alt="Left Person"
                    className="w-52 h-72 object-cover rounded-3xl shadow-2xl"
                  />
                </div>

                {/* Center Image */}
                <div 
                  className={`relative z-10 transition-all duration-700 ease-out ${
                    isHovered ? 'transform -translate-y-4 scale-105' : ''
                  }`}
                >
                  <div className="relative">
                    <img
                      src={image3}
                      alt="Main Person"
                      className="w-64 h-80 object-cover rounded-3xl shadow-2xl"
                    />
                    {/* <div className="absolute -top-3 -right-3 w-12 h-12 bg-orange-500 rounded-full shadow-lg"></div>
                    <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-pink-500 rounded-full shadow-lg"></div> */}
                  </div>
                </div>

                {/* Right Image */}
                <div 
                  className="absolute transition-all duration-700 ease-out"
                  style={{
                    transform: isHovered 
                      ? 'translateX(8rem) rotateY(-15deg) rotateX(-8deg) scale(0.95)'
                      : 'translateX(6rem) rotateY(-25deg) rotateX(-12deg) scale(0.9)',
                    transformStyle: 'preserve-3d',
                    zIndex: 1
                  }}
                >
                  <img
                    src={image2}
                    alt="Right Person"
                    className="w-52 h-72 object-cover rounded-3xl shadow-2xl"
                  />
                </div>

                {/* Decorative Elements */}
                {/* <div className="absolute -top-8 left-1/4 w-4 h-4 bg-orange-300 rounded-full opacity-60 animate-pulse"></div>
                <div className="absolute top-1/3 -right-16 w-3 h-3 bg-pink-300 rounded-full opacity-70 animate-pulse delay-300"></div>
                <div className="absolute -bottom-8 right-1/3 w-5 h-5 bg-orange-200 rounded-full opacity-50 animate-pulse delay-700"></div>
                <div className="absolute top-1/4 -left-16 w-2 h-2 bg-yellow-300 rounded-full opacity-60 animate-pulse delay-1000"></div> */}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ArvindArmyCard;