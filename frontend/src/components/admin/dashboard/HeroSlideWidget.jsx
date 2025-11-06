import React from "react";
import SlideCard from "./SlideCard";
import { useNavigate } from "react-router-dom";

const HeroSlideWidget = ({ slides, loading }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-white via-orange-50/30 to-white rounded-3xl 
                    shadow-2xl p-8 border-2 border-orange-100"
    >

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 
                            rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">🎠</span>
            </div>

            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 
                           bg-clip-text text-transparent">
              Hero Carousel Slides
            </h2>
          </div>

          <p className="text-gray-600 ml-14">Manage your homepage hero section</p>
        </div>

        <button
          onClick={() => navigate("/admin/home/hero-carousel")}
          className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r 
                     from-orange-500 to-red-600 text-white rounded-xl 
                     hover:shadow-2xl transition-all hover:scale-105 font-semibold"
        >
          <span>Manage Slides</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform"
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl p-4 animate-pulse border-2 border-gray-100">
              <div className="h-40 bg-gray-200 rounded-lg mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      )}

      {/* EMPTY */}
      {!loading && slides.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-orange-200">
          <div className="text-6xl mb-4">🎠</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Slides Yet</h3>
          <p className="text-gray-500 mb-6">Create your first hero carousel slide</p>

          <button
            onClick={() => navigate("/admin/home/hero-carousel")}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white 
                       rounded-xl hover:shadow-lg hover:scale-105 transition-all font-semibold"
          >
            Create First Slide
          </button>
        </div>
      )}

      {/* LIST OF SLIDES */}
      {!loading && slides.length > 0 && (
        <>
          {/* 3 SLIDE PREVIEW */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {slides.slice(0, 3).map((slide) => (
              <SlideCard
                key={slide._id}
                slide={slide}
                onClick={() => navigate("/admin/home/hero-carousel")}
              />
            ))}
          </div>

          {/* VIEW ALL BTN */}
          {slides.length > 3 && (
            <div className="text-center">
              <button
                onClick={() => navigate("/admin/home/hero-carousel")}
                className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 
                           rounded-xl hover:from-orange-100 hover:to-orange-200 hover:text-orange-700 
                           transition-all font-semibold border-2 border-gray-200 hover:border-orange-300"
              >
                View All {slides.length} Slides →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HeroSlideWidget;
