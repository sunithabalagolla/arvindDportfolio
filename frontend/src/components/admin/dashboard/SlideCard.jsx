import React from "react";

const SlideCard = ({ slide, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-xl overflow-hidden shadow-lg 
                 hover:shadow-2xl transition-all duration-500 border-2 
                 border-gray-100 hover:border-orange-300 cursor-pointer 
                 transform hover:-translate-y-2"
    >

      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={slide.imageUrl}
          alt={slide.heading}
          className="w-full h-full object-cover group-hover:scale-110 
                     transition-transform duration-500"
        />

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
              slide.isActive ? "bg-green-500 text-white" : "bg-gray-500 text-white"
            }`}
          >
            {slide.isActive ? "✓ Active" : "○ Inactive"}
          </span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 
                        to-transparent opacity-0 group-hover:opacity-100 
                        transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-gray-800 mb-1 truncate 
                       group-hover:text-orange-600 transition-colors">
          {slide.heading}
        </h3>

        <p className="text-sm text-gray-500 truncate mb-2">
          {slide.paragraph}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{new Date(slide.createdAt).toLocaleDateString()}</span>
          <svg
            className="w-5 h-5 text-gray-400 group-hover:text-orange-600 
                       group-hover:translate-x-1 transition-all"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

    </div>
  );
};

export default SlideCard;
