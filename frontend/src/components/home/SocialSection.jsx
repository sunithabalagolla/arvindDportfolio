import React, { useState, useEffect } from "react";
import instagram from '../../assets/images/Socialsection/instagram.png';
import twitter from '../../assets/images/Socialsection/twitter.png';

const PhoneFrame = ({ children, className = "" }) => {
  return (
    <div className={`w-[180px] h-[320px] sm:w-[240px] sm:h-[440px] lg:w-[260px] lg:h-[480px]
         bg-black rounded-[30px] 
         border-[6px] border-black-500 shadow-2xl relative overflow-hidden ${className}`}>
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-b-xl z-10"></div>
      
      {/* Screen content with hidden scrollbar */}
      <div 
        className="w-full h-full bg-white rounded-[24px] overflow-y-auto"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {children}
      </div>
    </div>
  );
};

const SocialSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 2 : prev - 1));
  };

  // For mobile slider
  const slides = [
    <PhoneFrame key="facebook">
      <iframe
        src="https://www.facebook.com/plugins/page.php?href=https://www.facebook.com/arvinddharmapuri&tabs=timeline&width=260&height=480&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true"
        width="100%"
        height="100%"
        style={{ border: "none", overflow: "hidden" }}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      ></iframe>
    </PhoneFrame>,
    <PhoneFrame key="instagram" className="transform lg:-translate-y-12">
      <img
        src={instagram}
        alt="Instagram post"
        className="w-full h-auto"
      />
    </PhoneFrame>,
    <PhoneFrame key="twitter">
      <img
        src={twitter}
        alt="Twitter post"
        className="w-full h-auto"
      />
    </PhoneFrame>
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Stay Connected
        </h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Stay connected and never miss an update! Follow us on Facebook, Instagram, and X (formerly Twitter) for the latest news, events, and updates.
        </p>
      </div>

      {/* Desktop view - show all frames */}
      <div className="hidden md:flex flex-wrap justify-center items-end gap-6 lg:gap-8">
        {/* Facebook timeline (live) */}
        <PhoneFrame>
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https://www.facebook.com/arvinddharmapuri&tabs=timeline&width=260&height=480&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true"
            width="100%"
            height="100%"
            style={{ border: "none", overflow: "hidden" }}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
        </PhoneFrame>

        {/* Instagram Screenshot - positioned higher */}
        <PhoneFrame className="transform lg:-translate-y-12">
          <img
            src={instagram}
            alt="Instagram post"
            className="w-full h-auto"
          />
        </PhoneFrame>

        {/* Twitter Screenshot */}
        <PhoneFrame>
          <img
            src={twitter}
            alt="Twitter post"
            className="w-full h-auto"
          />
        </PhoneFrame>
      </div>

      {/* Mobile view - slider */}
      <div className="md:hidden relative mx-auto max-w-xs">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="w-full flex-shrink-0 flex justify-center">
                {slide}
              </div>
            ))}
          </div>
        </div>
        
        {/* Navigation arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-1"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="#FF6600" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-1"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="#FF6600" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        {/* Dots indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialSection;