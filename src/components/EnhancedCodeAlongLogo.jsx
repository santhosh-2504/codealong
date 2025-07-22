import React from 'react';

export default function EnhancedCodeAlongLogo() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="mb-6">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-wider flex items-center justify-center gap-2 group">
          <span className="text-white drop-shadow-2xl transition-all duration-300 group-hover:text-gray-100 group-hover:scale-105">
            CODE
          </span>
          <div className="relative transform transition-all duration-300 group-hover:scale-110">
            {/* Glow effect behind the red box */}
            <div className="absolute inset-0 bg-red-500 blur-xl opacity-30 rounded transform -skew-x-6 scale-110"></div>
            
            {/* Main red box with gradient */}
            <div className="relative bg-gradient-to-r from-red-600 via-red-500 to-red-600 px-3 md:px-4 py-1.5 md:py-2 rounded transform -skew-x-6 shadow-2xl transition-all duration-300 hover:shadow-red-500/50 hover:from-red-500 hover:via-red-400 hover:to-red-500">
              <span className="text-white font-black flex items-center gap-1 drop-shadow-lg">
                AL
                {/* Enhanced play button with better proportions and shadow */}
                <div className="relative">
                  <div className="w-0 h-0 border-l-[14px] md:border-l-[18px] border-l-white border-t-[11px] md:border-t-[15px] border-t-transparent border-b-[11px] md:border-b-[15px] border-b-transparent drop-shadow-md transition-all duration-300 hover:border-l-gray-100"></div>
                  {/* Subtle inner glow on play button */}
                  <div className="absolute top-1/2 left-1 transform -translate-y-1/2 w-1 h-1 bg-white/30 rounded-full blur-sm"></div>
                </div>
                NG
              </span>
            </div>
            
            {/* Subtle reflection effect */}
            <div className="absolute top-full left-0 right-0 h-8 bg-gradient-to-b from-red-600/20 to-transparent transform -skew-x-6 blur-sm opacity-50"></div>
          </div>
        </h1>
        
        {/* Subtle tagline that appears on hover */}
        <div className="text-center mt-4 opacity-0 group-hover:opacity-70 transition-opacity duration-500">
          <p className="text-gray-400 text-sm md:text-base tracking-widest">
            LEARN • BUILD • GROW
          </p>
        </div>
      </div>
    </div>
  );
}