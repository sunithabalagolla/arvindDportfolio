import React from "react";

const WeeklyStatCard = ({ stat }) => {
  return (
    <div
      className="group relative bg-white rounded-xl p-4 shadow-md 
                 hover:shadow-xl transition-all duration-300 
                 border-2 border-gray-100 hover:border-orange-200"
    >

      {/* TOP ROW */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          
          {/* Icon Box */}
          <div
            className={`w-10 h-10 bg-gradient-to-br ${stat.gradient} rounded-lg 
                        flex items-center justify-center text-white font-bold
                        shadow-lg group-hover:scale-110 transition-transform`}
          >
            <span className="text-lg">{stat.icon}</span>
          </div>

          {/* Title and Count */}
          <div>
            <p className="font-bold text-gray-800">{stat.title}</p>
            <p className="text-xs text-gray-500">+{stat.count} this week</p>
          </div>
        </div>

        {/* Up Arrow */}
        <svg
          className="w-4 h-4 text-green-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 
               4.293a1 1 0 01-1.414 0L8 10.414l-4.293 
               4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 
               011.414 0L11 10.586 14.586 7H12z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* PROGRESS BAR */}
      <div className="relative">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-500">Progress</span>
          <span className={`text-xs font-bold bg-gradient-to-r ${stat.gradient} 
                           bg-clip-text text-transparent`}>
            {stat.percentage}%
          </span>
        </div>

        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full 
                        transition-all duration-1000 ease-out`}
            style={{ width: `${stat.percentage}%` }}
          ></div>
        </div>
      </div>

    </div>
  );
};

export default WeeklyStatCard;
