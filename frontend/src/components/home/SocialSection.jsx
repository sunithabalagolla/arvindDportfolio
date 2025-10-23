import React, { useState, useEffect } from "react";

const PhoneFrame = ({ children, className = "" }) => {
  return (
    <div
      className={`w-[160px] h-[300px] sm:w-[200px] sm:h-[380px] md:w-[240px] md:h-[440px] lg:w-[280px] lg:h-[500px]
        bg-gradient-to-br from-gray-800 to-gray-900 rounded-[28px] sm:rounded-[32px] lg:rounded-[36px] p-[3px] 
        shadow-xl hover:shadow-[0_20px_50px_rgba(251,139,53,0.3)] transition-all duration-300 relative overflow-hidden ${className}`}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-4 sm:h-5 bg-gray-900 rounded-b-xl sm:rounded-b-2xl z-10"></div>
      <div className="absolute inset-[3px] bg-white rounded-[25px] sm:rounded-[29px] lg:rounded-[33px] overflow-hidden">
        <div
          className="w-full h-full overflow-y-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {children}
        </div>
      </div>
    </div>
  );
};

const SocialSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [twitterLoaded, setTwitterLoaded] = useState(false);

  const FACEBOOK_PAGE = "arvinddharmapuri";
  const INSTAGRAM_USERNAME = "arvinddharmapuribjp";
  const TWITTER_USERNAME = "Arvindharmapuri";

  const INSTAGRAM_POSTS = [
    "https://www.instagram.com/p/DPvbzLrE6q1/",
    "https://www.instagram.com/p/DPvIGSWiCII/",
    "https://www.instagram.com/p/DPsvVKyE_Zv/",
  ];

  const TWITTER_POSTS = [
    "https://twitter.com/Arvindharmapuri/status/1977380740175200429",
    "https://twitter.com/Arvindharmapuri/status/1977380740175200429",
    "https://twitter.com/Arvindharmapuri/status/1976582470878310850",
  ];

  useEffect(() => {
    const instagramScript = document.createElement("script");
    instagramScript.src = "https://www.instagram.com/embed.js";
    instagramScript.async = true;
    document.body.appendChild(instagramScript);

    const loadTwitterScript = () => {
      return new Promise((resolve, reject) => {
        if (window.twttr && window.twttr.widgets) {
          resolve();
          return;
        }

        const existingScript = document.querySelector(
          'script[src="https://platform.twitter.com/widgets.js"]'
        );

        if (existingScript) {
          existingScript.addEventListener("load", () => resolve());
          return;
        }

        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.charset = "utf-8";
        script.onload = () => {
          setTwitterLoaded(true);
          resolve();
        };
        script.onerror = () => reject();
        document.body.appendChild(script);
      });
    };

    loadTwitterScript().then(() => {
      if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load();
      }
    });

    const processInstagram = setInterval(() => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    }, 2000);

    return () => {
      clearInterval(processInstagram);
    };
  }, []);

  useEffect(() => {
    if (twitterLoaded && window.twttr && window.twttr.widgets) {
      setTimeout(() => {
        window.twttr.widgets.load();
      }, 500);
    }
  }, [twitterLoaded, currentSlide]);

  const nextSlide = () => setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? 2 : prev - 1));

  const slides = [
    // Facebook Frame
    <PhoneFrame key="facebook">
      <div className="w-full h-full relative">
        <div className="h-full overflow-y-auto pb-16 sm:pb-20" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <iframe
            src={`https://www.facebook.com/plugins/page.php?href=https://www.facebook.com/${FACEBOOK_PAGE}&tabs=timeline&width=280&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true`}
            width="100%"
            height="100%"
            style={{ border: "none", overflow: "hidden" }}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            title="Facebook Page"
          ></iframe>
        </div>

        {/* Facebook Button - Sticky at bottom */}
        <div className="absolute bottom-0 left-0 right-0 text-center py-2 sm:py-3 lg:py-4 bg-gradient-to-t from-white via-white to-transparent z-20">
          <a
            href={`https://www.facebook.com/${FACEBOOK_PAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 sm:gap-2 bg-blue-600 text-white px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-2.5 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:scale-105 text-xs sm:text-sm"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span className="hidden xs:inline">See More</span>
            <span className="xs:hidden">More</span>
          </a>
        </div>
      </div>
    </PhoneFrame>,

    // Instagram Frame
    <PhoneFrame key="instagram" className="transform md:scale-105 lg:-translate-y-8">
      <div className="w-full h-full relative overflow-hidden">
        <div className="h-full overflow-y-auto overflow-x-hidden pb-16 sm:pb-20" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
            .instagram-media {
              max-width: 100% !important;
              min-width: auto !important;
            }
          `}</style>
          <div className="space-y-3 sm:space-y-4 px-1 py-2">
            {INSTAGRAM_POSTS.map((url, i) => (
              <div key={i} className="w-full" style={{ maxWidth: "100%", overflow: "hidden" }}>
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink={url}
                  data-instgrm-version="14"
                  style={{
                    background: "#FFF",
                    border: 0,
                    borderRadius: "3px",
                    boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
                    margin: "0 auto",
                    maxWidth: "calc(100% - 8px)",
                    minWidth: "auto",
                    padding: 0,
                    width: "100%",
                  }}
                >
                  <div style={{ padding: "16px" }}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: "#FFFFFF",
                        lineHeight: 0,
                        padding: 0,
                        textAlign: "center",
                        textDecoration: "none",
                        width: "100%",
                        display: "block",
                      }}
                    >
                      View this post on Instagram
                    </a>
                  </div>
                </blockquote>
              </div>
            ))}
          </div>
        </div>

        {/* Instagram Button - Sticky at bottom */}
        <div className="absolute bottom-0 left-0 right-0 text-center py-2 sm:py-3 lg:py-4 bg-gradient-to-t from-white via-white to-transparent z-20">
          <a
            href={`https://www.instagram.com/${INSTAGRAM_USERNAME}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-2.5 rounded-full font-semibold hover:scale-105 hover:shadow-xl transition-all shadow-lg text-xs sm:text-sm"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span className="hidden xs:inline">See More</span>
            <span className="xs:hidden">More</span>
          </a>
        </div>
      </div>
    </PhoneFrame>,

    // Twitter Frame
    <PhoneFrame key="twitter">
      <div className="w-full h-full relative">
        <div className="h-full overflow-y-auto pb-16 sm:pb-20 bg-white" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div className="p-1 sm:p-2 space-y-3 sm:space-y-4">
            {TWITTER_POSTS.map((tweet, i) => (
              <div key={i} className="twitter-embed-wrapper">
                <blockquote
                  className="twitter-tweet"
                  data-theme="light"
                  data-width="280"
                  data-conversation="none"
                  data-cards="hidden"
                  data-dnt="true"
                >
                  <a href={tweet}>Loading tweet...</a>
                </blockquote>
              </div>
            ))}
          </div>
        </div>

        {/* Twitter Button - Sticky at bottom */}
        <div className="absolute bottom-0 left-0 right-0 text-center py-2 sm:py-3 lg:py-4 bg-gradient-to-t from-white via-white to-transparent z-20">
          <a
            href={`https://twitter.com/${TWITTER_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 sm:gap-2 bg-black text-white px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-2.5 rounded-full font-semibold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:scale-105 text-xs sm:text-sm"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span className="hidden xs:inline">See More</span>
            <span className="xs:hidden">More</span>
          </a>
        </div>
      </div>
    </PhoneFrame>,
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-3 sm:px-4 lg:px-8 bg-gradient-to-b from-white via-orange-50 to-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-[#FB8B35] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-[#FB8B35] opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20 relative z-10">
        <div className="inline-block ">

    
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
          Arvind Dharmapuri Foundation
        </h2>
        <div className="w-16 sm:w-20 md:w-24 h-1 mx-auto rounded-full" style={{ background: '#FB8B35' }}>
              </div>
        </div>
        <p className="text-gray-600 text-base sm:text-lg lg:text-lg max-w-3xl mx-auto leading-relaxed px-4">
          Follow Arvind Dharmapuri on Facebook, Instagram, and X for the latest updates
        </p>
      </div>

      {/* Desktop View - 3 columns on large screens, 2 on medium */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 justify-items-center max-w-6xl mx-auto relative z-10">
        {slides}
      </div>

      {/* Mobile Carousel */}
      <div className="sm:hidden relative mx-auto max-w-[180px]">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, i) => (
              <div key={i} className="w-full flex-shrink-0 flex justify-center">
                {slide}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 bg-white rounded-full p-1.5 shadow-lg hover:shadow-xl transition-all hover:scale-110"
          aria-label="Previous"
        >
          <svg className="w-4 h-4" fill="none" stroke="#FB8B35" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 bg-white rounded-full p-1.5 shadow-lg hover:shadow-xl transition-all hover:scale-110"
          aria-label="Next"
        >
          <svg className="w-4 h-4" fill="none" stroke="#FB8B35" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${currentSlide === i ? "bg-[#FB8B35] w-6 sm:w-8" : "bg-gray-300 w-1.5 sm:w-2 hover:bg-gray-400"
                }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialSection;