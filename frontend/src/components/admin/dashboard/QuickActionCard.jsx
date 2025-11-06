import React from "react";
import { useNavigate } from "react-router-dom";

const QuickActionCard = ({ action }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(action.path)}
      className={`group relative bg-gradient-to-br ${action.gradient} ${action.hoverGradient} 
                  text-white rounded-2xl p-6 transition-all duration-500 transform 
                  hover:scale-110 hover:shadow-2xl hover:rotate-3`}
    >
      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                      transform -skew-x-12 translate-x-[-200%] 
                      group-hover:translate-x-[200%] transition-transform duration-1000">
      </div>

      <div className="relative flex flex-col items-center justify-center space-y-3">

        {/* Icon */}
        <div className="text-5xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
          {action.icon}
        </div>

        {/* Title & Description */}
        <div className="text-center">
          <p className="font-bold text-sm mb-1">{action.title}</p>
          <p className="text-xs opacity-90">{action.description}</p>
        </div>

        {/* Small Plus Icon */}
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm 
                        group-hover:bg-white/30 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </div>

      {/* Glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-white/10 blur-xl 
                      transition-opacity"></div>
    </button>
  );
};

export default QuickActionCard;
