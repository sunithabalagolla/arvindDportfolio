import React, { useState } from 'react';
import image1 from '../../assets/images/Donation/donationLeft.png';
import image2 from '../../assets/images/Donation/donationRight.png';
import image3 from '../../assets/images/Donation/donationCenter.png';

const DonationSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-gradient-to-br from-orange-50 to-orange-100 min-h-screen flex items-center justify-center p-4 md:p-6 xl:p-8">
      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

        {/* Text Content */}
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
            Donations
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">
            Support the BJP by contributing your donation to help strengthen its mission
            and activities for the nation's progress.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Donate Now
            </button>

            <button className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300 bg-white hover:bg-gray-50 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Know More →
            </button>
          </div>
        </div>

        {/* 3D Image Stack */}
        <div
          className="flex-1 flex items-center justify-center w-full max-w-lg"
          style={{ perspective: '800px' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative w-full h-80 md:h-96 lg:h-[400px] flex items-center justify-center">

            {/* Left Image */}
            <div
              className={`absolute w-40 h-48 md:w-48 md:h-56 lg:w-56 lg:h-89 transition-all duration-700 ease-out ${isHovered
                  ? 'transform -translate-x-16 md:-translate-x-20 lg:-translate-x-24 -translate-y-2 scale-95 -rotate-12'
                  : 'transform -translate-x-12 md:-translate-x-16 lg:-translate-x-20 rotate-12 scale-90'
                }`}
              style={{
                transformStyle: 'preserve-3d',
                transform: isHovered
                  ? 'translateX(-4rem) translateY(-0.5rem) rotateY(15deg) rotateZ(-12deg) scale(0.95)'
                  : 'translateX(-3rem) translateY(0.5rem) rotateY(25deg) rotateZ(-15deg) scale(0.9)'
              }}
            >
              <img
                src={image1}
                alt="Left Person"
                className="w-full h-full object-cover rounded-xl "
              />
            </div>

            {/* Center Image */}
            <div
              className={`relative z-10 w-40 h-48 md:w-48 md:h-56 lg:w-56 lg:h-64 transition-all duration-700 ease-out ${isHovered
                  ? 'transform -translate-y-1 scale-105'
                  : 'transform scale-100'
                }`}
            >
              <div className="w-full h-full  rounded-xl shadow-xl p-2">
                <img
                  src={image3}
                  alt="Main Person"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Right Image */}
            <div
              className={`absolute w-40 h-48 md:w-48 md:h-56 lg:w-56 transition-all duration-700 ease-out ${isHovered
                  ? 'transform translate-x-16 md:translate-x-20 lg:translate-x-24 translate-y-2 scale-95 rotate-12'
                  : 'transform translate-x-12 md:translate-x-16 lg:translate-x-20 -rotate-12 scale-90'
                }`}
              style={{
                height: '15rem',
                transformStyle: 'preserve-3d',
                transform: isHovered
                  ? 'translateX(4rem) translateY(0.5rem) rotateY(-15deg) rotateZ(12deg) scale(0.95)'
                  : 'translateX(3rem) translateY(-0.5rem) rotateY(-25deg) rotateZ(15deg) scale(0.9)'
              }}
            >
              <img
                src={image2}
                alt="Right Person"
                className="w-full h-full object-cover rounded-xl "
              />
            </div>


            
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationSection;