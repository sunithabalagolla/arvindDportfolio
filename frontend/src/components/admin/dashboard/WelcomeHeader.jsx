import React from "react";

/**
 * Welcome Header Component
 * -------------------------------------------
 * Pure presentational, production-ready.
 * Accepts:
 *  - greeting (string)
 *  - stats (object) { monthlyViews, monthlyGrowth }
 */
const WelcomeHeader = ({ greeting, stats }) => {
  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-[#FB8B35] via-orange-500 to-[#E67A24] rounded-3xl shadow-xl">
      
      {/* Decorative Background Blobs */}
      <div className="absolute top-0 right-0 w-56 h-56 bg-white/10 rounded-full -mr-24 -mt-24 pointer-events-none select-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full -ml-40 -mb-40 pointer-events-none select-none"></div>

      <div className="relative p-8 md:p-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

          {/* LEFT SIDE - Greeting */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-5xl animate-wave">👋</span>
              <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-md">
                {greeting}
              </h1>
            </div>

            <p className="text-orange-100 text-lg mb-4">
              Here's what's happening with your website today.
            </p>

            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 inline-block">
              <span className="text-white font-semibold text-sm">
                📅 {formattedDate}
              </span>
            </div>
          </div>

          {/* RIGHT SIDE - Stats (Optional) */}
          {stats && (
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg relative">
                <div className="absolute inset-0 bg-white/10 rounded-2xl blur-2xl"></div>

                <div className="relative grid grid-cols-2 gap-6">
                  
                  {/* Total Views */}
                  <div className="text-center">
                    <p className="text-white/70 text-xs mb-1 tracking-wide uppercase">
                      Total Views
                    </p>
                    <p className="text-white text-2xl font-bold">
                      {(stats.monthlyViews / 1000).toFixed(1)}K
                    </p>
                  </div>

                  {/* Monthly Growth */}
                  <div className="text-center">
                    <p className="text-white/70 text-xs mb-1 tracking-wide uppercase">
                      This Month
                    </p>
                    <p className="text-white text-2xl font-bold">
                      +{stats.monthlyGrowth}%
                    </p>
                  </div>

                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Wave Animation */}
      <style>{`
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          75% { transform: rotate(-15deg); }
        }
        .animate-wave {
          animation: wave 1.8s ease-in-out infinite;
          transform-origin: bottom center;
        }
      `}</style>
    </header>
  );
};

export default WelcomeHeader;
