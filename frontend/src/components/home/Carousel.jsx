import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import slide1 from '../../assets/images/home/hero-slide-1.png';
import slide2 from '../../assets/images/home/hero-slide-2.jpg';
import slide3 from '../../assets/images/home/hero-slide-3.png';

function Carousel() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const slides = [
    {
      id: 1,
      image: slide1,
      heading: "The Changemaker",
      paragraph: "Arvind Dharmapuri is known for his bold, principled stand on various social and political issues. He has consistently fought against corruption, championed farmers’ rights, and advocated for the welfare of the marginalized and powerless. His efforts also led to the establishment of the Turmeric Board in Telangana, a significant initiative aimed at supporting turmeric farmers and boosting the industry. He continues to be a relentless advocate for the betterment of farmers.",
    },
    {
      id: 2,
      image: slide2,
      heading: "Arvind Dharmapuri Foundation",
      paragraph: "Helping children is an investment in the future, nurturing not only their potential but also the well-being of society as a whole.",
    },
    {
      id: 3,
      image: slide3,
      heading: "Keep Abreast of Current Events",
      paragraph: "In today’s fast-paced world, staying informed is essential. Our platform provides you with timely, reliable, and relevant information, ensuring you’re always aware of the latest developments in your field of interest",
    },
  ];

  return (
    <div className="relative w-full h-[100vh] sm:h-[70vh] md:h-screen overflow-hidden">
      {/* Custom Navigation Arrows */}
      <div
        ref={prevRef}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50
                   text-white text-3xl md:text-4xl cursor-pointer 
                   transition-all duration-300 hover:text-[#FF9933] hover:scale-125 select-none"
        aria-label="Previous Slide"
      >
        <FaChevronLeft />
      </div>
      <div
        ref={nextRef}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50
                   text-white text-3xl md:text-4xl cursor-pointer 
                   transition-all duration-300 hover:text-[#FF9933] hover:scale-125 select-none"
        aria-label="Next Slide"
      >
        <FaChevronRight />
      </div>

      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <img
                src={slide.image}
                alt={slide.heading}
                className="w-full h-full object-cover object-center"
              />

              {/* Dark overlay for readability */}
              <div className="absolute inset-0 bg-black/20"></div>

              {/* Text Content */}
              <div
                className="absolute inset-0 flex items-center sm:items-center pt-10 sm:pb-8"
              >
                {slide.id === 1 || slide.id === 3 ? (
                  // Slide 1 & 3: Left side
                  <div className="text-white text-center sm:text-left max-w-[800px] mx-auto sm:mx-0 px-4 sm:pl-10 md:pl-38">
                    <h2 className="!font-['Abhaya_Libre']   text-sm sm:text-3xl md:text-[84px] mb-4 drop-shadow-lg">
                      {slide.heading}
                    </h2>
                    <p className=" font-['Hind_Siliguri'] text-xs font-normal sm:text-base md:text-base leading-relaxed mb-4 text-[#FAFAFA] drop-shadow-md">
                      {slide.paragraph}
                    </p>
                        <button className="bg-[#FB8B35] text-white px-3 py-1.5 text-xs sm:px-6 sm:py-2 lg:px-8 lg:py-2.5 sm:text-sm lg:text-base rounded-lg  hover:bg-white 
    hover:text-[#FB8B35] transition">Know More</button>
                  </div>

                ) : (
                  // Slide 2: Container on right, text aligned left inside
                  <div className="text-white text-center sm:text-left max-w-[800px] mx-auto sm:ml-auto sm:mr-0 px-3 sm:pr-10 md:pr-16">
                    <h2 className="!font-['Abhaya_Libre']  text-sm sm:text-3xl md:text-6xl mb-4 drop-shadow-lg">
                      {slide.heading}
                    </h2>
                    <p className=" font-['Hind_Siliguri'] text-xs sm:text-base md:text-base leading-relaxed mb-4 text-[#FAFAFA] drop-shadow-md">
                      {slide.paragraph}
                    </p>
                    <button className="bg-[#FB8B35] text-white px-3 py-1.5 text-xs sm:px-6 sm:py-2 lg:px-8 lg:py-2.5 sm:text-sm lg:text-base rounded-lg  hover:bg-white 
    hover:text-[#FB8B35] transition">
                      Know More
                    </button>
                  </div>

                )}
              </div>





            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Carousel;
