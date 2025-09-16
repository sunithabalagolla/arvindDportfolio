import React, { useState } from 'react';
import image1 from '../../assets/images/Donation/sampleright.jpeg';
import image2 from '../../assets/images/Donation/sampleleft.jpeg';
import image3 from '../../assets/images/Donation/donationCenter.png';

const DonationSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="py-16 flex items-center justify-center">
      <div className="max-w-8xl w-full flex flex-col lg:flex-row items-center lg:items-stretch gap-12 px-6 md:px-12">

        {/* Text Content - Left Side */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-8 text-left px-4 sm:px-6 lg:px-12">
          <div>
            <h2 className="text-5xl md:text-6xl xl:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Donations
            </h2>

         
          </div>

          <p className="text-xl text-gray-700 leading-relaxed font-medium">
            Support the BJP by contributing your donation to help strengthen its mission
            and activities for the nation's progress.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="group bg-[#FB8B35] hover:from-orange-600 hover:to-orange-700 text-white px-10 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 min-w-[160px] relative overflow-hidden">
              <span className="relative z-10">Donate Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 
              group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button className="group border-2 border-gray-300 hover:border-orange-500 text-gray-700 hover:text-orange-700 px-10 py-4 rounded-lg font-bold transition-all duration-300 bg-white/40 backdrop-blur-sm hover:bg-white/60 shadow-lg hover:shadow-xl transform hover:-translate-y-1 min-w-[160px] flex items-center justify-center gap-3">
              Know More 
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* 3D Image Stack - Right Side */}
        <div className="w-full lg:w-1/2 flex items-center justify-center relative px-4 sm:px-6 lg:px-12">
          <div
            className="relative w-full h-auto flex items-center justify-center overflow-visible"
            style={{ perspective: '1200px' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >

            {/* Left Image */}
            <div
              className="absolute transition-all duration-700 ease-out"
              style={{
                transformStyle: 'preserve-3d',
                transform: isHovered
                  ? 'translateX(-10rem) rotateY(15deg) rotateX(-8deg) scale(0.95)'
                  : 'translateX(-8rem) rotateY(25deg) rotateX(-12deg) scale(0.9)',
                transformOrigin: 'bottom center',
                zIndex: 5
              }}
            >
              <img
                src={image1}
                alt="Left Person"
                className="w-[260px] h-[340px] object-cover rounded-3xl shadow-2xl"
              />
            </div>

            {/* Center Image */}
            <div
              className={`relative z-20 transition-all duration-700 ease-out ${
                isHovered 
                  ? 'transform -translate-y-4 scale-105' 
                  : 'transform scale-100'
              }`}
              style={{
                width: '300px',
                height: '360px'
              }}
            >
              <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl relative">
                <img
                  src={image3}
                  alt="Main Person"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
                
                {/* Orange accent elements */}
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full shadow-lg"></div>
                <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full shadow-lg opacity-80"></div>
              </div>
            </div>

            {/* Right Image */}
            <div
              className="absolute transition-all duration-700 ease-out"
              style={{
                transformStyle: 'preserve-3d',
                transform: isHovered
                  ? 'translateX(10rem) rotateY(-15deg) rotateX(-8deg) scale(0.95)'
                  : 'translateX(8rem) rotateY(-25deg) rotateX(-12deg) scale(0.9)',
                transformOrigin: 'bottom center',
                zIndex: 5
              }}
            >
              <img
                src={image2}
                alt="Right Person"
                className="w-[260px] h-[340px] object-cover rounded-3xl shadow-2xl"
              />
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute -top-8 left-1/4 w-4 h-4 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full opacity-60 animate-pulse shadow-lg"></div>
            <div className="absolute top-1/3 -right-16 w-3 h-3 bg-gradient-to-br from-pink-300 to-pink-400 rounded-full opacity-70 animate-pulse delay-300 shadow-lg"></div>
            <div className="absolute -bottom-8 right-1/3 w-5 h-5 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full opacity-50 animate-pulse delay-700 shadow-lg"></div>
            <div className="absolute top-1/4 -left-16 w-2 h-2 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full opacity-60 animate-pulse delay-1000 shadow-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationSection;
