import React from "react";
import QuickActionCard from "./QuickActionCard";

const QuickActions = ({ actions = [] }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 
                          bg-clip-text text-transparent">
            Quick Actions
          </h2>
          <p className="text-gray-500 mt-1">
            Frequently used features at your fingertips
          </p>
        </div>

        {/* Status Indicator */}
        <div className="hidden md:flex items-center space-x-2 px-4 py-2 
                        bg-gradient-to-r from-green-50 to-green-100 
                        rounded-xl border border-green-200">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-sm font-semibold text-gray-700">
            All systems operational
          </span>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {actions.length > 0 ? (
          actions.map((action, index) => (
            <QuickActionCard key={index} action={action} />
          ))
        ) : (
          <p className="text-gray-400 text-sm col-span-full text-center py-6">
            No quick actions configured.
          </p>
        )}
      </div>
    </div>
  );
};

export default QuickActions;
