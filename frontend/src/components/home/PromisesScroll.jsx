import React from 'react';

function PromisesScroll() {
  // Card data array
  const promiseCards = [
    {
      number: "150 +",
      title: "Helping Guj Migrants",
      subtitle: "Return Home",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop",
      alt: "Migrants returning home"
    },
    {
      number: "173 +",
      title: "Children Impacted and",
      subtitle: "Supported",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",
      alt: "Children being supported"
    },
    {
      number: "50 +",
      title: "Roads Laid, Progress Delivered",
      subtitle: "",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
      alt: "Road construction progress"
    }
  ];

  // Function to get background gradient based on index
  const getBackgroundColor = (index) => {
    const colors = [
      'bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50',
      'bg-gradient-to-br from-green-50 via-green-100 to-green-50',
      'bg-gradient-to-br from-amber-50 via-amber-100 to-amber-50'
    ];
    return colors[index % 3];
  };

  // Render individual slide
  const renderSlide = (card, index, keyPrefix) => (
    <div key={`${keyPrefix}-${index}`} className="flex flex-shrink-0 group">
      {/* Image */}
      <div className="w-40 sm:w-44 md:w-52 lg:w-60 h-32 sm:h-36 md:h-44 lg:h-52 flex-shrink-0 relative overflow-hidden">
        <img 
          src={card.image} 
          alt={card.alt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className={`w-40 sm:w-44 md:w-52 lg:w-60 h-32 sm:h-36 md:h-44 lg:h-52 flex-shrink-0 
                       flex flex-col justify-center items-center text-center px-3 ${getBackgroundColor(index)}
                       relative overflow-hidden group-hover:shadow-2xl transition-all duration-500`}>
        
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-1.5 sm:mb-2
                        transition-all duration-300 group-hover:scale-110 drop-shadow-lg"
             style={{ color: index % 3 === 0 ? '#3B82F6' : index % 3 === 1 ? '#10B981' : '#F59E0B' }}>
          {card.number}
        </div>
        <div className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-800 font-bold leading-tight">
          {card.title}
          {card.subtitle && <><br />{card.subtitle}</>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full py-8 sm:py-12 md:py-16">
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        
        .animate-scroll {
          animation: scroll 2s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Heading Section */}
      <div className="text-center mb-6 sm:mb-8 md:mb-10 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
          Promises in Action
        </h2>
        <div className="w-16 sm:w-20 md:w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
      </div>

      {/* Scrolling Container - Full Width */}
      <div className="overflow-hidden w-full">
        <div className="flex animate-scroll">
          {/* First set */}
          {promiseCards.map((card, index) => renderSlide(card, index, 'first'))}
          
          {/* Second set (duplicates for infinite scroll) */}
          {promiseCards.map((card, index) => renderSlide(card, index, 'second'))}
          
          {/* Third set */}
          {promiseCards.map((card, index) => renderSlide(card, index, 'third'))}
        </div>
      </div>
    </div>
  );
}

export default PromisesScroll;