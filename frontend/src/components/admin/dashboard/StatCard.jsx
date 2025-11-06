import React from "react";

const StatCard = ({ card, index, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl 
                 transition-all duration-500 cursor-pointer overflow-hidden 
                 transform hover:-translate-y-2"
      style={{ animationDelay: `${index * 100}ms` }}
    >

      {/* Hover Gradient Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${card.gradient} 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      ></div>

      <div className="relative p-6">
        
        {/* Content Row */}
        <div className="flex items-center justify-between mb-4">

          {/* Text */}
          <div className="flex-1">
            <p className="text-gray-600 text-sm font-semibold mb-2 
                           group-hover:text-white transition-colors">
              {card.title}
            </p>

            <p className="text-4xl font-bold text-gray-800 
                           group-hover:text-white transition-colors">
              {card.value}
            </p>

            {card.subtitle && (
              <p className="text-sm text-gray-500 
                              group-hover:text-white/80 mt-1">
                {card.subtitle}
              </p>
            )}
          </div>

          {/* Icon Box */}
          <div
            className={`relative w-16 h-16 bg-gradient-to-br ${card.bgGradient} 
                        rounded-2xl flex items-center justify-center shadow-lg 
                        group-hover:scale-110 group-hover:rotate-12 
                        transition-all duration-500`}
          >
            <span className="text-3xl">{card.icon}</span>

            {/* Pulse */}
            <span
              className="absolute inset-0 rounded-2xl bg-white opacity-0 
                         group-hover:opacity-20 group-hover:animate-ping">
            </span>
          </div>

        </div>

        {/* Progress Bar */}
        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden 
                        group-hover:bg-white/30 transition-colors">
          <div
            className={`h-full bg-gradient-to-r ${card.gradient} 
                        rounded-full transition-all duration-1000`}
            style={{ width: "70%" }}
          ></div>
        </div>

        {/* Change Indicator */}
        <div className="flex items-center justify-between mt-3">
          
          <div className="flex items-center gap-1">
            {/* Arrow */}
            <svg
              className={`w-4 h-4 ${
                card.trend === "up" ? "text-green-500" : "text-red-500"
              } group-hover:text-white`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12 7a1 1 0 110-2h5a1 1 0 
                   011 1v5a1 1 0 11-2 0V8.414l-4.293 
                   4.293a1 1 0 01-1.414 0L8 
                   10.414l-4.293 4.293a1 1 0 
                   01-1.414-1.414l5-5a1 1 0 
                   011.414 0L11 10.586 14.586 7H12z"
                clipRule="evenodd"
              />
            </svg>

            <span
              className={`text-sm font-semibold ${
                card.trend === "up" ? "text-green-600" : "text-red-600"
              } group-hover:text-white`}
            >
              {card.change}
            </span>
          </div>

          <span className="text-xs text-gray-500 group-hover:text-white/80">
            vs last month
          </span>

        </div>
      </div>

      {/* Corner Glow */}
      <div
        className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br 
                   from-white/20 to-transparent rounded-bl-full 
                   opacity-0 group-hover:opacity-100 transition-opacity"
      ></div>

    </div>
  );
};

export default StatCard;
