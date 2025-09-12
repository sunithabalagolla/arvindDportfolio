import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Share2, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
import news1 from '../../assets/images/home/news/newcarousels1.png';
import news2 from '../../assets/images/home/news/newcarousels2.jpg';
import news3 from '../../assets/images/home/news/newcarousels3.png';

export default function NewsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Sample news data
  const newsData = [
    {
      id: 1,
      image: news1,
      title: "Nizamabad MP Shri Arvind Dharmapuri Meets Union Home Minister Shri Amit Shah Ji",
      description: "Nizamabad MP Shri Arvind Dharmapuri had the privilege of meeting the Hon'ble Union Home Minister Shri Amit Shah Ji",
      date: "Aug 07, 2025"
    },
    {
      id: 2,
      image: news2,
      title: "Meet the Mighty INS Nistar!",
      description: "Nizamabad MP Shri Arvind Dharmapuri had the privilege of meeting the Hon'ble Union Home Minister Shri Amit Shah Ji",
      date: "Aug 07, 2025"
    },
    {
      id: 3,
      image: news3,
      title: "Make in India Boost: Defence Ministry Clears ₹67,000 Crore Projects; HAL, BEL, BDL in Focus",
      description: "The Defence Acquisition Council (DAC), chaired by Defence Minister Rajnath Singh, has approved defence proposals worth around ₹67,000 crore to strengthen the Indian Army, Navy, and Air Force",
      date: "Aug 07, 2025"
    },
    {
      id: 4,
      image: news1,
      title: "Infrastructure Development in Nizamabad",
      description: "Major infrastructure projects announced for the development of Nizamabad constituency",
      date: "Aug 06, 2025"
    },
    {
      id: 5,
      image: news2,
      title: "Agricultural Reforms Implementation",
      description: "New agricultural reforms being implemented to support farmers in the region",
      date: "Aug 05, 2025"
    }
  ];

  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(newsData.length / itemsPerSlide);

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (slide) => {
    setCurrentSlide(slide);
  };

  const handleViewAll = () => {
    navigate('/news');
  };

  const handleReadMore = (id) => {
    navigate(`/news/${id}`);
  };

  const handleShare = (newsItem) => {
    if (navigator.share) {
      navigator.share({
        title: newsItem.title,
        text: newsItem.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${newsItem.title} - ${window.location.href}`);
      alert('Link copied to clipboard!');
    }
  };

  const currentItems = newsData.slice(currentSlide * itemsPerSlide, (currentSlide + 1) * itemsPerSlide);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 mb-2">
          Latest News
        </h2>
        <div className="w-16 sm:w-24 h-1 bg-orange-500 mx-auto"></div>
      </div>

      {/* Carousel Container */}
      <div className="relative px-4 sm:px-16 py-4 sm:py-8">
        {/* Navigation Arrows - Responsive positioning */}
        <button
          onClick={prevSlide}
          className="absolute left-0 sm:left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-2xl hover:shadow-orange-500/40 transition-all duration-300 hover:scale-110 sm:hover:scale-125 hover:bg-orange-50 hover:border-2 hover:border-orange-500 disabled:opacity-50 border border-gray-200"
          disabled={currentSlide === 0}
        >
          <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7 text-gray-600 hover:text-orange-600 transition-colors duration-300" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 sm:right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-2xl hover:shadow-orange-500/40 transition-all duration-300 hover:scale-110 sm:hover:scale-125 hover:bg-orange-50 hover:border-2 hover:border-orange-500 disabled:opacity-50 border border-gray-200"
          disabled={currentSlide === totalSlides - 1}
        >
          <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7 text-gray-600 hover:text-orange-600 transition-colors duration-300" />
        </button>

        {/* Cards Display - Responsive Grid with proper mobile layout */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {currentItems.map((news) => (
            <div
              key={news.id}
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-[420px] sm:h-[500px] group hover:shadow-orange-500/50 hover:ring-2 sm:hover:ring-4 hover:ring-orange-500/30 hover:ring-offset-1 sm:hover:ring-offset-2 mx-auto w-full max-w-full sm:max-w-sm"
            >
              {/* Image Section - Responsive heights */}
              <div className="relative h-[240px] sm:h-[280px] overflow-hidden">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                  <button
                    onClick={() => handleShare(news)}
                    className="bg-white/90 backdrop-blur-sm rounded-full p-1.5 sm:p-2 hover:bg-white transition-colors duration-200 shadow-sm"
                  >
                    <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Content Section - Responsive heights and padding */}
              <div className="h-[180px] sm:h-[220px] p-3 sm:p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                    {news.title}
                  </h3>
                  
                  <p className="text-gray-600 text-xs mb-2 line-clamp-2 leading-relaxed">
                    {news.description}
                  </p>
                </div>

                {/* Date and Actions - Better mobile spacing */}
                <div className="flex items-center justify-between mt-auto pt-2">
                  <div className="flex items-center text-gray-500 text-xs">
                    <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
                    <span className="truncate">{news.date}</span>
                  </div>
                  <button
                    onClick={() => handleReadMore(news.id)}
                    className="text-orange-600 hover:text-orange-700 font-medium text-xs transition-colors duration-200 whitespace-nowrap ml-2"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots - Better mobile spacing */}
        <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
          {Array.from({ length: totalSlides }, (_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'bg-orange-500 scale-110'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* View All Button - Responsive sizing */}
        <div className="flex justify-center mt-6 sm:mt-8">
          <button
            onClick={handleViewAll}
            className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2.5 px-6 sm:py-3 sm:px-8 text-sm sm:text-base rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 flex items-center"
          >
            <span className="mr-2">View All</span>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Help - Improved styling */}
      <div className="sm:hidden mt-4">
        <div className="flex justify-center">
          <div className="bg-gray-50 rounded-lg px-4 py-2">
            <span className="text-xs text-gray-500">← Swipe or use arrows to navigate →</span>
          </div>
        </div>
      </div>

      {/* Line clamp CSS - Enhanced for better mobile readability */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        /* Ensure cards don't exceed viewport width on mobile */
        @media (max-width: 640px) {
          .group {
            min-width: 0;
          }
        }
      `}</style>
    </div>
  );
}