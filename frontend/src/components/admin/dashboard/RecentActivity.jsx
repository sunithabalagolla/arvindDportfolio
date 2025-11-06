import React from "react";
import ActivityItem from "./ActivityItem";

const RecentActivity = ({ activities }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Recent Activity</h2>
          <p className="text-gray-500 text-sm mt-1">Latest updates and changes</p>
        </div>

        <button
          className="px-4 py-2 bg-gradient-to-r from-[#FB8B35] to-[#E67A24] 
                     text-white rounded-xl hover:shadow-lg transition-all 
                     hover:scale-105 font-semibold text-sm"
        >
          View All →
        </button>
      </div>

      {/* Activity List */}
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <ActivityItem
            key={index}
            activity={{
              ...activity,
              isNew: index < 2 // Only first 2 get the red notification dot
            }}
          />
        ))}
      </div>

    </div>
  );
};

export default RecentActivity;
