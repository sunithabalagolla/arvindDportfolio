import React from "react";
import instagram from '../../assets/images/Socialsection/instagram.png';
import twitter from '../../assets/images/Socialsection/twitter.png';

const PhoneFrame = ({ children, className = "" }) => {
  return (
    <div className={`w-[220px] h-[400px] sm:w-[240px] sm:h-[440px] lg:w-[260px] lg:h-[480px]
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

      <div className="flex flex-wrap justify-center items-end gap-6 lg:gap-8">
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
    </section>
  );
};

export default SocialSection;