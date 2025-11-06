import React from "react";
import StatusCard from "./StatusCard";

const SystemStatus = ({ systems }) => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 border border-gray-100">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">System Status</h2>
          <p className="text-gray-500 text-sm mt-1">
            All systems are running smoothly
          </p>
        </div>

        <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 
                        rounded-xl border-2 border-green-200">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold text-green-700">Healthy</span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systems.map((item, i) => (
          <StatusCard key={i} item={item} />
        ))}
      </div>

    </div>
  );
};

export default SystemStatus;
