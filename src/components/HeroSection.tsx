'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="relative overflow-hidden rounded-3xl sm:rounded-[36px] bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-700 min-h-[400px] sm:min-h-[440px] lg:min-h-[480px] flex items-center shadow-xl border border-emerald-600/30">
        
        {/* Giant Watermark Title: NandiFarms */}
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden">
          <h1 className="text-[72px] sm:text-[110px] md:text-[140px] lg:text-[170px] font-black tracking-tighter text-lime-400 opacity-90 whitespace-nowrap font-sans transform scale-y-110">
            Nandi<span className="font-extrabold text-lime-300">Farms</span>
          </h1>
        </div>

        {/* Slanted "Same-Day Delivery" Floating Badge Tag */}
        <div className="absolute top-6 sm:top-8 right-[20%] md:right-[26%] lg:right-[32%] z-20">
          <div className="bg-emerald-950/80 backdrop-blur-md text-lime-300 text-[11px] sm:text-xs font-bold px-4 py-1.5 rounded-full border border-lime-400/40 shadow-lg transform rotate-[-6deg] flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-lime-400 animate-pulse" />
            <span>Same-Day Delivery</span>
          </div>
        </div>

        {/* Central Hero Delivery Person Image */}
        <div className="absolute inset-0 flex justify-center items-end pointer-events-none z-10">
          <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg h-[92%] flex items-end justify-center">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
              alt="Nandi Farms Delivery"
              className="h-full object-contain object-bottom drop-shadow-2xl rounded-t-3xl opacity-95"
            />
          </div>
        </div>

        {/* Left Hero Content Box (without Shop Now button and without floating card) */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-8 sm:py-12 flex items-center justify-start">
          <div className="max-w-sm sm:max-w-md space-y-4 text-white bg-emerald-950/40 backdrop-blur-sm p-6 sm:p-7 rounded-3xl border border-emerald-500/20 shadow-xl">
            <p className="text-sm sm:text-base md:text-lg text-emerald-50 leading-relaxed font-medium">
              Shop from thousands of farm-fresh fruits, vegetables, dairy, and daily essentials at unbeatable prices.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
