import React, { useState } from 'react';
import { Share2, Calendar, ChevronRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import news1 from '../../assets/images/home/news/newcarousels1.png';
import news2 from '../../assets/images/home/news/newcarousels2.jpg';
import news3 from '../../assets/images/home/news/newcarousels3.png';

export default function NewsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const newsData = [
    {
      id: 1,
      image: news1,
      title: "Nizamabad MP Shri Arvind Dharmapuri Meets Union Home Minister Shri Amit Shah Ji",
      description: "Nizamabad MP Shri Arvind Dharmapuri had the privilege of meeting ",
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

  const getItemsPerSlide = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }
    return 3;
  };

  const [itemsPerSlide, setItemsPerSlide] = useState(getItemsPerSlide());

  React.useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(getItemsPerSlide());
      setCurrentSlide(0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    navigate('/news/AllNews');
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
    <div className="w-full bg-gradient-to-b from-white to-gray-50 py-6 sm:py-8 md:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
            Latest News
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 mx-auto rounded-full" style={{ background: '#FB8B35' }}></div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows - Desktop only */}
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`hidden lg:flex absolute -left-12 top-1/2 -translate-y-1/2 z-10
                       transition-all duration-300
                       ${currentSlide === 0 
                         ? 'opacity-30 cursor-not-allowed' 
                         : 'hover:scale-125'}`}
            style={{ color: '#FB8B35' }}
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className={`hidden lg:flex absolute -right-12 top-1/2 -translate-y-1/2 z-10
                       transition-all duration-300
                       ${currentSlide === totalSlides - 1
                         ? 'opacity-30 cursor-not-allowed'
                         : 'hover:scale-125'}`}
            style={{ color: '#FB8B35' }}
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          {/* Cards Grid */}
          <div className="relative px-0 sm:px-2 md:px-0">
            {/* Mobile/Tablet Side Arrows */}
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`lg:hidden absolute -left-1 sm:left-0 top-1/2 -translate-y-1/2 z-20
                         p-1.5 sm:p-2 rounded-full bg-white shadow-lg transition-all duration-300
                         ${currentSlide === 0 
                           ? 'opacity-30 cursor-not-allowed' 
                           : 'hover:shadow-xl active:scale-95'}`}
              style={{ color: '#FB8B35' }}
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              className={`lg:hidden absolute -right-1 sm:right-0 top-1/2 -translate-y-1/2 z-20
                         p-1.5 sm:p-2 rounded-full bg-white shadow-lg transition-all duration-300
                         ${currentSlide === totalSlides - 1
                           ? 'opacity-30 cursor-not-allowed'
                           : 'hover:shadow-xl active:scale-95'}`}
              style={{ color: '#FB8B35' }}
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 px-6 sm:px-8 md:px-10 lg:px-0">
              {currentItems.map((news) => (
                <div
                  key={news.id}
                  className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md
                             transition-all duration-500 transform hover:-translate-y-2
                             border border-gray-100 hover:shadow-xl
                             flex flex-col h-full"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#FB8B35';
                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(251, 139, 53, 0.3), 0 10px 10px -5px rgba(251, 139, 53, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgb(243, 244, 246)';
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  {/* Image Container */}
                  <div className="relative w-full h-48 sm:h-52 md:h-60 lg:h-64 bg-white flex items-center justify-center p-2 overflow-hidden">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                    <button
                      onClick={() => handleShare(news)}
                      className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 
                                 bg-white/95 backdrop-blur-sm rounded-full p-2 sm:p-2.5
                                 transition-all duration-300
                                 shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#FB8B35';
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                        e.currentTarget.style.color = 'inherit';
                      }}
                    >
                      <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </div>

                  {/* Content Container */}
                  <div className="p-3 sm:p-4 md:p-5 lg:p-6 bg-gradient-to-b from-white to-gray-50 flex flex-col flex-grow">
                    <h3 className="font-bold text-gray-900 mb-2 sm:mb-2.5 md:mb-3 line-clamp-2 leading-snug
                                   text-sm sm:text-base md:text-base lg:text-base
                                   group-hover:text-base group-hover:sm:text-lg group-hover:md:text-xl group-hover:lg:text-xl
                                   transition-all duration-300"
                        onMouseEnter={(e) => e.currentTarget.style.color = '#FB8B35'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(17, 24, 39)'}
                    >
                      {news.title}
                    </h3>
                    
                    <p className="text-gray-600 
                                  text-xs sm:text-sm md:text-sm lg:text-sm
                                  group-hover:text-[10px] group-hover:sm:text-xs group-hover:md:text-xs group-hover:lg:text-xs
                                  mb-3 sm:mb-3.5 md:mb-4 line-clamp-2 leading-relaxed transition-all duration-300 flex-grow">
                      {news.description}
                    </p>

                    <div className="flex items-center justify-between pt-2.5 sm:pt-3 md:pt-4 border-t border-gray-100 mt-auto">
                      <div className="flex items-center text-gray-500 text-xs sm:text-sm">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" style={{ color: '#FB8B35' }} />
                        <span className="whitespace-nowrap">{news.date}</span>
                      </div>
                      <button
                        onClick={() => handleReadMore(news.id)}
                        className="font-semibold text-xs sm:text-sm hover:underline transition-all duration-200 whitespace-nowrap active:scale-95"
                        style={{ color: '#FB8B35' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#e67a2a'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#FB8B35'}
                      >
                        Read More →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide Counter - Mobile/Tablet only */}
          <div className="lg:hidden text-center mt-4 sm:mt-5">
            <span className="text-xs sm:text-sm text-gray-600 font-medium bg-white px-3 py-1 rounded-full shadow-sm">
              {currentSlide + 1} / {totalSlides}
            </span>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-6 sm:mt-7 md:mt-8 lg:mt-10 gap-1.5 sm:gap-2">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full active:scale-90
                  ${currentSlide === index
                    ? 'w-6 sm:w-7 md:w-8 h-2 sm:h-2.5 md:h-3'
                    : 'w-2 sm:w-2.5 md:w-3 h-2 sm:h-2.5 md:h-3 bg-gray-300 hover:bg-gray-400'
                  }`}
                style={currentSlide === index ? { backgroundColor: '#FB8B35' } : {}}
              />
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center md:text-right mt-5 sm:mt-6 md:mt-8">
            <button
              onClick={handleViewAll}
              className="font-semibold text-sm sm:text-base md:text-lg underline hover:underline transition-all duration-200 active:scale-95"
              style={{ color: '#FB8B35' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#e67a2a'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#FB8B35'}
            >
              View All
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}