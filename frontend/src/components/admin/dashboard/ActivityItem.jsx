import React from "react";

const ActivityItem = ({ activity }) => {
  const { icon, bgColor, action, time, user, isNew } = activity;

  return (
    <div
      className="group flex items-center justify-between p-4 border-2 border-gray-100 
                 hover:border-orange-200 rounded-xl hover:shadow-lg 
                 transition-all duration-300 hover:bg-gradient-to-r 
                 hover:from-orange-50 hover:to-transparent cursor-pointer"
    >
      <div className="flex items-center gap-4 flex-1">

        {/* Icon Box */}
        <div
          className={`relative w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center 
                      shadow-md group-hover:scale-110 group-hover:rotate-6 
                      transition-all duration-300`}
        >
          <span className="text-2xl">{icon}</span>

          {/* New Activity Indicator */}
          {isNew && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full 
                             border-2 border-white animate-pulse"></span>
          )}
        </div>

        {/* Text Content */}
        <div className="flex-1">
          <p className="text-gray-800 font-semibold group-hover:text-[#FB8B35] 
                        transition-colors">
            {action}
          </p>

          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-500">{time}</span>
            <span className="text-gray-300">•</span>
            <span className="text-xs text-gray-500">by {user}</span>
          </div>
        </div>

      </div>

      {/* Arrow */}
      <svg
        className="w-5 h-5 text-gray-400 group-hover:text-[#FB8B35] 
                   group-hover:translate-x-1 transition-all"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
};

export default ActivityItem;
