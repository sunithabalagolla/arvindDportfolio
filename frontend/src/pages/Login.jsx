import React, { useState } from 'react';

const DonationSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-gradient-to-br from-orange-50 to-orange-100 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        {/* Left Section - Text and Buttons */}
        <div className="flex-1 space-y-4 lg:space-y-6 z-10 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
            Donations
          </h1>
          
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">
            Support the BJP by contributing your donation to help strengthen its mission
            and activities for the nation's progress.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 text-sm sm:text-base">
              Donate Now
            </button>
            
            <button className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 bg-white hover:bg-gray-50 shadow-md hover:shadow-lg transform hover:-translate-y-1 text-sm sm:text-base">
              Know More →
            </button>
          </div>
        </div>

        {/* Right Section - 3D Image Stack */}
        <div 
          className="flex-1 flex items-center justify-center w-full"
          style={{ perspective: '800px' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[400px] xl:h-[450px] flex items-center justify-center overflow-hidden">
            
            {/* Left Image */}
            <div 
              className={`absolute transition-all duration-700 ease-out transform-gpu ${
                // Mobile & Small Screens
                'w-32 h-40 sm:w-40 sm:h-48 md:w-48 md:h-56 lg:w-56 lg:h-64 xl:w-64 xl:h-72 ' +
                (isHovered 
                  ? 'translate-x-[-40px] sm:translate-x-[-60px] md:translate-x-[-80px] lg:translate-x-[-100px] xl:translate-x-[-120px] translate-y-[10px] sm:translate-y-[15px] md:translate-y-[20px] rotate-y-[20deg] sm:rotate-y-[25deg] rotate-z-[-10deg] sm:rotate-z-[-15deg] scale-90 sm:scale-95' 
                  : 'translate-x-[-30px] sm:translate-x-[-50px] md:translate-x-[-60px] lg:translate-x-[-70px] xl:translate-x-[-80px] translate-y-[15px] sm:translate-y-[25px] md:translate-y-[35px] lg:translate-y-[40px] rotate-y-[25deg] sm:rotate-y-[30deg] md:rotate-y-[35deg] rotate-z-[-15deg] sm:rotate-z-[-20deg] scale-85 sm:scale-90')
              }`}
              style={{
                transformStyle: 'preserve-3d',
                filter: isHovered ? 'brightness(1.1)' : 'brightness(0.8)',
              }}
            >
              <div className="w-full h-full bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-2 sm:p-3 transform-gpu">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop"
                  alt="Left Person"
                  className="w-full h-full object-cover rounded-lg sm:rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg sm:rounded-xl"></div>
              </div>
            </div>

            {/* Middle Image - Main card (same size as others) */}
            <div 
              className={`relative z-30 transition-all duration-700 ease-out transform-gpu ${
                // Same size as other images now
                'w-32 h-40 sm:w-40 sm:h-48 md:w-48 md:h-56 lg:w-56 lg:h-64 xl:w-64 xl:h-72 ' +
                (isHovered 
                  ? 'translate-y-[-5px] sm:translate-y-[-8px] md:translate-y-[-10px] rotate-y-[2deg] sm:rotate-y-[5deg] scale-100 sm:scale-105 md:scale-110' 
                  : 'rotate-y-[0deg] scale-95 sm:scale-100 md:scale-105')
              }`}
              style={{
                transformStyle: 'preserve-3d',
                filter: 'brightness(1.2)',
                boxShadow: isHovered 
                  ? '0 20px 40px rgba(0,0,0,0.25), 0 10px 20px rgba(0,0,0,0.15)' 
                  : '0 15px 30px rgba(0,0,0,0.2)',
              }}
            >
              <div className="w-full h-full bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3 relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop"
                  alt="Main Person"
                  className="w-full h-full object-cover rounded-lg sm:rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange/10 to-transparent rounded-lg sm:rounded-xl"></div>
                {/* 3D Shine Effect */}
                <div 
                  className={`absolute inset-0 rounded-lg sm:rounded-xl transition-opacity duration-700 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                  }}
                ></div>
              </div>
            </div>

            {/* Right Image */}
            <div 
              className={`absolute transition-all duration-700 ease-out transform-gpu ${
                // Same size as other images
                'w-32 h-40 sm:w-40 sm:h-48 md:w-48 md:h-56 lg:w-56 lg:h-64 xl:w-64 xl:h-72 ' +
                (isHovered 
                  ? 'translate-x-[40px] sm:translate-x-[60px] md:translate-x-[80px] lg:translate-x-[100px] xl:translate-x-[120px] translate-y-[10px] sm:translate-y-[15px] md:translate-y-[20px] rotate-y-[-20deg] sm:rotate-y-[-25deg] rotate-z-[10deg] sm:rotate-z-[15deg] scale-90 sm:scale-95' 
                  : 'translate-x-[30px] sm:translate-x-[50px] md:translate-x-[60px] lg:translate-x-[70px] xl:translate-x-[80px] translate-y-[15px] sm:translate-y-[25px] md:translate-y-[35px] lg:translate-y-[40px] rotate-y-[-25deg] sm:rotate-y-[-30deg] md:rotate-y-[-35deg] rotate-z-[15deg] sm:rotate-z-[20deg] scale-85 sm:scale-90')
              }`}
              style={{
                transformStyle: 'preserve-3d',
                filter: isHovered ? 'brightness(1.1)' : 'brightness(0.8)',
              }}
            >
              <div className="w-full h-full bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-2 sm:p-3 transform-gpu">
                <img
                  src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=600&fit=crop"
                  alt="Right Person"
                  className="w-full h-full object-cover rounded-lg sm:rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg sm:rounded-xl"></div>
              </div>
            </div>

            {/* Floating Elements - Responsive */}
            <div 
              className={`absolute w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full transition-all duration-1000 ${
                isHovered 
                  ? 'translate-x-[-80px] sm:translate-x-[-120px] md:translate-x-[-150px] lg:translate-x-[-200px] translate-y-[-40px] sm:translate-y-[-60px] md:translate-y-[-80px] lg:translate-y-[-100px] scale-125' 
                  : 'translate-x-[-60px] sm:translate-x-[-90px] md:translate-x-[-120px] lg:translate-x-[-150px] translate-y-[-30px] sm:translate-y-[-50px] md:translate-y-[-60px] lg:translate-y-[-80px]'
              }`}
              style={{ filter: 'blur(1px)', opacity: 0.6 }}
            ></div>
            
            <div 
              className={`absolute w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6  rounded-full transition-all duration-1200 ${
                isHovered 
                  ? 'translate-x-[70px] sm:translate-x-[110px] md:translate-x-[140px] lg:translate-x-[180px] translate-y-[-50px] sm:translate-y-[-80px] md:translate-y-[-100px] lg:translate-y-[-120px] scale-150' 
                  : 'translate-x-[50px] sm:translate-x-[80px] md:translate-x-[110px] lg:translate-x-[140px] translate-y-[-35px] sm:translate-y-[-60px] md:translate-y-[-70px] lg:translate-y-[-90px]'
              }`}
              style={{ filter: 'blur(1px)', opacity: 0.5 }}
            ></div>
            
            <div 
              className={`absolute w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-purple-300 rounded-full transition-all duration-1400 ${
                isHovered 
                  ? 'translate-x-[20px] sm:translate-x-[30px] md:translate-x-[40px] lg:translate-x-[50px] translate-y-[60px] sm:translate-y-[90px] md:translate-y-[110px] lg:translate-y-[150px] scale-200' 
                  : 'translate-x-[10px] sm:translate-x-[15px] md:translate-x-[20px] translate-y-[40px] sm:translate-y-[70px] md:translate-y-[90px] lg:translate-y-[120px]'
              }`}
              style={{ filter: 'blur(0.5px)', opacity: 0.4 }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationSection;