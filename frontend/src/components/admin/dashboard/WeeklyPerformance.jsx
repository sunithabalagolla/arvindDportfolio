import React from "react";
import WeeklyStatCard from "./WeeklyStatCard";

const WeeklyPerformance = ({ weeklyStats }) => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl 
                    p-8 border border-gray-100"
    >

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">This Week</h2>
          <p className="text-gray-500 text-sm mt-1">Performance metrics</p>
        </div>

        {/* Arrow Icon Box */}
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 
                        rounded-xl flex items-center justify-center shadow-lg"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" 
            />
          </svg>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="space-y-4">
        {weeklyStats.map((stat, index) => (
          <WeeklyStatCard key={index} stat={stat} />
        ))}
      </div>

      {/* SUMMARY CARD */}
      <div className="mt-6 p-4 bg-gradient-to-r from-[#FB8B35] to-[#E67A24] 
                      rounded-xl text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Total Activities</p>
            <p className="text-3xl font-bold">
              {weeklyStats.reduce((a, b) => a + b.count, 0)}
            </p>
          </div>

          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center 
                          justify-center backdrop-blur-sm"
          >
            <span className="text-3xl">🎯</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default WeeklyPerformance;
