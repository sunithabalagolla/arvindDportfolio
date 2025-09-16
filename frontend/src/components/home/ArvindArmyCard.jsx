import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function ArvindArmyCard() {
  return (
    <div className="bg-pink-50 min-h-screen w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center">
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          
          {/* Profile Image Container - 50% width on desktop */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-center">
            <div className="relative">
              <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-orange-500 rounded-3xl flex items-center justify-center relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
                  alt="Arvind Dharmapuri"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Shadow effect */}
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 lg:-bottom-6 lg:-right-6 w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gray-400 rounded-3xl -z-10 opacity-50"></div>
            </div>
          </div>
          
          {/* Content - 50% width on desktop */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <div className="max-w-md sm:max-w-lg lg:max-w-xl text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8">
                Arvind Army
              </h1>
              
              <p className="text-gray-700 text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed mb-6 sm:mb-8 lg:mb-10">
                Be a part of the change. Be a part of the fight for justice. Be a part of the various 
                activities under the leadership of our beloved MP Arvind Dharmapuri.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6">
                <button className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-lg lg:rounded-xl font-semibold text-sm sm:text-base lg:text-lg transition-colors shadow-lg">
                  Join the Movement
                </button>
                
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 text-gray-700 hover:text-gray-900 font-medium text-sm sm:text-base lg:text-lg transition-colors">
                  Know More
                  <ChevronRight size={18} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}