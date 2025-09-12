import React, { useEffect, useRef } from 'react';
import image1 from '../../assets/images/promisesscrool/PromisesInAction-img2.png'

function PromisesScroll() {
  const scrollRef = useRef(null);

  // Card data array
  const promiseCards = [
    {
      number: "150 +",
      title: "Helping Guj Migrants",
      subtitle: "Return Home",
      image:image1,
      alt: "Migrants returning home"
    },
    {
      number: "173 +",
      title: "Children Impacted and",
      subtitle: "Supported",
      image:image1,
      alt: "Children being supported"
    },
    {
      number: "50 +",
      title: "Roads Laid, Progress Delivered",
      subtitle: "",
      image: image1,
      alt: "Road construction progress"
    }
  ];

  // Auto-scroll effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scroll = () => {
      scrollAmount += 1;
      scrollContainer.scrollLeft = scrollAmount;
      
      // Reset when we reach the end
      if (scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollAmount = 0;
      }
    };

    const interval = setInterval(scroll, 30);
    return () => clearInterval(interval);
  }, []);

  // Function to get background color based on index
  const getBackgroundColor = (index) => {
    const colors = ['bg-orange-100', 'bg-purple-100']; // 1st & 3rd: orange, 2nd & 4th: purple
    return colors[index % 2];
  };

  // Render individual slide
  const renderSlide = (card, index, keyPrefix) => (
    <div key={`${keyPrefix}-${index}`} className="flex flex-shrink-0">
      {/* Image with exact same dimensions */}
      <div className="w-56 h-32 flex-shrink-0">
        <img 
          src={card.image} 
          alt={card.alt}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content with exact same dimensions */}
      <div className={`w-56 h-32 flex-shrink-0 flex flex-col justify-center items-center text-center px-4 ${getBackgroundColor(index)}`}>
        <div className="text-3xl font-bold text-black mb-1">
          {card.number}
        </div>
        <div className="text-xs text-gray-600 font-medium leading-tight">
          {card.title}
          {card.subtitle && <><br />{card.subtitle}</>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="mx-4 my-8">
      {/* Heading Section */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 mb-2">
          Promises in Action
        </h2>
        <div className="w-16 sm:w-24 h-1 bg-orange-500 mx-auto"></div>
      </div>

      {/* Scrolling Container */}
      <div className="overflow-hidden" ref={scrollRef}>
        <div className="flex">
          {/* First set */}
          {promiseCards.map((card, index) => renderSlide(card, index, 'first'))}
          
          {/* Second set (duplicates for infinite scroll) */}
          {promiseCards.map((card, index) => renderSlide(card, index, 'second'))}
        </div>
      </div>
    </div>
  );
}

export default PromisesScroll;