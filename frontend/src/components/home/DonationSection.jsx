import React, { useState } from 'react';
// Assuming the asset paths are correct for your project
import image1 from '../../assets/images/Donation/sampleright.jpeg';
import image2 from '../../assets/images/Donation/sampleleft.jpeg';
import image3 from '../../assets/images/Donation/donationCenter.png';

const DonationSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="py-8 md:py-16 lg:py-20 bg-gradient-to-br from-orange-50 via-white to-pink-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 px-2 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-orange-500 to-pink-500 animate-gradient">
              Donations
            </h2>
            
            <p className="text-lg md:text-xl text-gray-700 mb-8 lg:mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Support the BJP by contributing your donation to help strengthen its mission
              and activities for the nation's progress.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {/* Donate Now Button with Curtain Effect - Right to Left */}
              <button 
                className="group relative w-[140px] sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3.5 
                  bg-[#FB8B35] text-white text-xs sm:text-sm md:text-base font-semibold 
                  rounded-lg border-2 border-[#FB8B35]
                  hover:bg-white hover:text-[#FB8B35]
                  shadow-md sm:shadow-lg hover:shadow-2xl hover:shadow-[#FB8B35]/30
                  transform hover:-translate-y-1 active:translate-y-0
                  transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 
                  overflow-hidden"
              >
                {/* Animated Background Slide - Right to Left */}
                <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>

                {/* Button Text */}
                <span className="relative z-10 font-bold">Donate Now</span>

                {/* SVG Arrow */}
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Know More Button with Curtain Effect - Left to Right */}
              <button className="group relative w-[140px] sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3.5 border-2 border-gray-300 text-gray-700 
                  text-xs sm:text-sm md:text-base font-semibold rounded-lg 
                  hover:border-orange-500 hover:text-orange-600 
                  shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 
                  flex items-center justify-center gap-1.5 sm:gap-2 overflow-hidden bg-white">
                
                {/* Animated Background Slide - Left to Right (New addition) */}
                <span className="absolute inset-0 bg-orange-50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>

                <span className="relative z-10 flex items-center gap-1.5 sm:gap-2 font-bold">
                  Know More 
                  {/* SVG Arrow */}
                  <svg 
                    className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-1/2 relative">
            
            {/* Mobile Layout (Single Image) */}
            <div className="block md:hidden">
              <div className="relative mx-auto w-64 h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-pink-400 rounded-2xl blur-xl opacity-30"></div>
                <img
                  src={image3}
                  alt="Main Person"
                  className="relative w-full h-full object-cover rounded-2xl shadow-2xl ring-4 ring-white"
                />
              </div>
            </div>

            {/* Tablet Layout (2 Images) */}
            <div className="hidden md:block lg:hidden">
              <div className="relative flex items-center justify-center gap-8">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-pink-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                  <img
                    src={image1}
                    alt="Left Person"
                    className="relative w-40 h-52 object-cover rounded-2xl shadow-xl transform rotate-3 hover:rotate-1 hover:scale-105 transition-all duration-500 ring-2 ring-white"
                  />
                </div>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl blur-2xl opacity-40"></div>
                  <img
                    src={image3}
                    alt="Main Person"
                    className="relative w-48 h-60 object-cover rounded-2xl shadow-2xl transform -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-500 ring-4 ring-white"
                  />
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
                
                {/* Ambient Glow */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-96 h-96 bg-gradient-to-br from-orange-400 via-pink-400 to-yellow-400 rounded-full blur-3xl opacity-20 transition-all duration-1000 ${
                    isHovered ? 'scale-110 opacity-30' : 'scale-100'
                  }`}></div>
                </div>

                {/* Left Image */}
                <div 
                  className="absolute transition-all duration-700 ease-out group"
                  style={{
                    transform: isHovered 
                      ? 'translateX(-8rem) rotateY(15deg) rotateX(-8deg) scale(0.95)'
                      : 'translateX(-6rem) rotateY(25deg) rotateX(-12deg) scale(0.9)',
                    transformStyle: 'preserve-3d',
                    zIndex: 1
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-pink-400 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                  <img
                    src={image1}
                    alt="Left Person"
                    className="relative w-52 h-72 object-cover rounded-3xl shadow-2xl ring-4 ring-white/50"
                  />
                </div>

                {/* Center Image */}
                <div 
                  className={`relative z-10 transition-all duration-700 ease-out group ${
                    isHovered ? 'transform -translate-y-4 scale-105' : ''
                  }`}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-500 to-orange-500 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                    <img
                      src={image3}
                      alt="Main Person"
                      className="relative w-64 h-80 object-cover rounded-3xl shadow-2xl ring-4 ring-white"
                    />
                  </div>
                </div>

                {/* Right Image */}
                <div 
                  className="absolute transition-all duration-700 ease-out group"
                  style={{
                    transform: isHovered 
                      ? 'translateX(8rem) rotateY(-15deg) rotateX(-8deg) scale(0.95)'
                      : 'translateX(6rem) rotateY(-25deg) rotateX(-12deg) scale(0.9)',
                    transformStyle: 'preserve-3d',
                    zIndex: 1
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-pink-400 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                  <img
                    src={image2}
                    alt="Right Person"
                    className="relative w-52 h-72 object-cover rounded-3xl shadow-2xl ring-4 ring-white/50"
                  />
                </div>

                {/* Floating Particles - (Placeholder for potential future additions) */}
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -30px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(30px, 10px) scale(1.05); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
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
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default DonationSection;