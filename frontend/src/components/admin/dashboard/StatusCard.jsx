import React from "react";

const StatusCard = ({ item }) => {
  return (
    <div
      className="group relative bg-white border-2 border-green-200 rounded-xl p-5 
                 hover:shadow-xl transition-all duration-300 overflow-hidden"
    >

      {/* Hover Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 
                      opacity-0 group-hover:opacity-100 transition-opacity"></div>

      <div className="relative">

        {/* Top Row */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-3xl group-hover:scale-125 transition-transform duration-300">
            {item.icon}
          </span>

          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        </div>

        {/* Title + Value */}
        <p className="text-sm text-gray-600 mb-1">{item.title}</p>

        <p className="text-xl font-bold text-green-600">
          {item.value}
        </p>

      </div>

      {/* Progress Pulse */}
      <div className="relative mt-3 h-1 bg-green-200 rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 
                        rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default StatusCard;
