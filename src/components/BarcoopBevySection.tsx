'use client';

import React from 'react';
import { Sparkles, Citrus, Leaf, Apple, Cherry } from 'lucide-react';

export const BarcoopBevySection: React.FC = () => {
  return (
    <section className="relative w-full py-16 sm:py-24 md:py-28 bg-[#3d1e31] text-white overflow-hidden shadow-2xl my-6 rounded-3xl max-w-7xl mx-auto border border-[#522943]">
      {/* Outer ambient glow */}
      <div className="absolute inset-0 bg-radial from-[#592c48]/50 via-transparent to-transparent pointer-events-none" />

      {/* Main 3D Rotating Circle Container */}
      <div className="relative max-w-4xl mx-auto flex items-center justify-center min-h-[380px] sm:min-h-[460px] md:min-h-[520px] px-4">
        
        {/* Rotating Circular Text Ring & Orbiting Icons Container */}
        <div className="absolute w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] md:w-[500px] md:h-[500px] rounded-full flex items-center justify-center animate-[spin_35s_linear_infinite]">
          
          {/* Curved SVG Text along path */}
          <svg className="w-full h-full transform -rotate-90 overflow-visible" viewBox="0 0 500 500">
            <defs>
              <path
                id="textCircle"
                d="M 250, 250 m -210, 0 a 210,210 0 1,1 420,0 a 210,210 0 1,1 -420,0"
              />
            </defs>
            <text className="fill-[#fcd34d] text-[15px] sm:text-[17px] font-black tracking-[0.25em] uppercase">
              <textPath href="#textCircle" startOffset="0%">
                • 100% NATURAL INGREDIENTS • NO ARTIFICIAL PRESERVATIVES • DIRECT FROM FARMERS • ZERO CHEMICALS 
              </textPath>
            </text>
          </svg>

          {/* Floating Orbiting Ingredient Badges / Icons */}
          {/* Top (Lime/Citrus) */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-lime-400/20 backdrop-blur-md rounded-full border border-lime-400/50 flex items-center justify-center shadow-lg transform hover:scale-125 transition-transform">
            <span className="text-xl sm:text-2xl">🍋</span>
          </div>

          {/* Top Right (Chili) */}
          <div className="absolute top-[12%] right-[10%] w-10 h-10 sm:w-12 sm:h-12 bg-red-500/20 backdrop-blur-md rounded-full border border-red-500/50 flex items-center justify-center shadow-lg">
            <span className="text-xl sm:text-2xl">🌶️</span>
          </div>

          {/* Right (Pineapple) */}
          <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-amber-400/20 backdrop-blur-md rounded-full border border-amber-400/50 flex items-center justify-center shadow-lg">
            <span className="text-xl sm:text-2xl">🍍</span>
          </div>

          {/* Bottom Right (Tomato) */}
          <div className="absolute bottom-[12%] right-[10%] w-10 h-10 sm:w-12 sm:h-12 bg-rose-500/20 backdrop-blur-md rounded-full border border-rose-500/50 flex items-center justify-center shadow-lg">
            <span className="text-xl sm:text-2xl">🍅</span>
          </div>

          {/* Bottom (Leaf) */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-emerald-400/20 backdrop-blur-md rounded-full border border-emerald-400/50 flex items-center justify-center shadow-lg">
            <span className="text-xl sm:text-2xl">🌿</span>
          </div>

          {/* Bottom Left (Strawberry) */}
          <div className="absolute bottom-[12%] left-[10%] w-10 h-10 sm:w-12 sm:h-12 bg-pink-500/20 backdrop-blur-md rounded-full border border-pink-500/50 flex items-center justify-center shadow-lg">
            <span className="text-xl sm:text-2xl">🍓</span>
          </div>

          {/* Left (Cucumber) */}
          <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-green-500/20 backdrop-blur-md rounded-full border border-green-500/50 flex items-center justify-center shadow-lg">
            <span className="text-xl sm:text-2xl">🥒</span>
          </div>

          {/* Top Left (Orange) */}
          <div className="absolute top-[12%] left-[10%] w-10 h-10 sm:w-12 sm:h-12 bg-orange-400/20 backdrop-blur-md rounded-full border border-orange-400/50 flex items-center justify-center shadow-lg">
            <span className="text-xl sm:text-2xl">🍊</span>
          </div>
        </div>

        {/* Center Static Bold Title */}
        <div className="relative z-10 text-center select-none px-4 py-8 pointer-events-auto cursor-default">
          <div className="inline-flex items-center space-x-2 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Pure & Uncompromised</span>
          </div>
          
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white uppercase tracking-tight leading-[0.9] font-sans drop-shadow-xl">
            REAL<br />
            <span className="text-amber-300">INGREDIENTS</span><br />
            ONLY
          </h2>

          <p className="mt-4 max-w-xs sm:max-w-md mx-auto text-xs sm:text-sm text-pink-100/80 font-medium leading-relaxed">
            Freshly harvested produce directly from local Indian farms with zero artificial preservatives or hidden additives.
          </p>
        </div>

      </div>
    </section>
  );
};
