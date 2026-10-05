'use client';

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const handleShopNow = () => {
    const picksSection = document.getElementById('todays-picks');
    if (picksSection) {
      picksSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 600, behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="relative overflow-hidden rounded-3xl sm:rounded-[36px] bg-gradient-to-r from-[#115e34] via-[#15723f] to-[#1a854a] min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] flex items-center shadow-2xl border border-emerald-600/30">
        
        {/* Giant Ultra HD Watermark Title: NandiFarms in Lime Green */}
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden z-0">
          <h1 className="text-[80px] sm:text-[130px] md:text-[160px] lg:text-[195px] font-black tracking-tighter text-[#8ee435] whitespace-nowrap font-sans leading-none transform scale-y-105 opacity-95 drop-shadow-md">
            Nandi<span className="font-extrabold text-[#9ef542]">Farms</span>
          </h1>
        </div>

        {/* Slanted "Same-Day Delivery" Floating Badge Tag */}
        <div className="absolute top-6 sm:top-8 right-[15%] sm:right-[22%] md:right-[28%] z-20">
          <div className="bg-[#0b3820]/90 backdrop-blur-md text-[#8ee435] text-[11px] sm:text-xs font-extrabold px-4 py-1.5 rounded-full border border-[#8ee435]/40 shadow-lg transform rotate-[-6deg] flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#8ee435] animate-pulse" />
            <span>Same-Day Delivery</span>
          </div>
        </div>

        {/* Central Hero Delivery Person Image (High Resolution Cutout) */}
        <div className="absolute inset-0 flex justify-center items-end pointer-events-none z-10">
          <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg h-[95%] flex items-end justify-center">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=90"
              alt="Nandi Farms Delivery Person"
              className="h-full object-contain object-bottom drop-shadow-2xl rounded-t-3xl opacity-95"
            />
          </div>
        </div>

        {/* Content Overlay Grid */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-8 sm:py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left Hero Text Box & Functional Shop Now Button */}
          <div className="max-w-xs sm:max-w-md space-y-5 text-white bg-[#0b3820]/50 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-[#8ee435]/30 shadow-2xl">
            <p className="text-xs sm:text-sm md:text-base text-emerald-50 leading-relaxed font-medium">
              Shop from thousands of farm-fresh fruits, vegetables, dairy, and daily essentials at unbeatable prices.
            </p>
            <div className="pt-1">
              <button
                onClick={handleShopNow}
                className="inline-flex items-center space-x-3 bg-[#0b3820] hover:bg-[#072414] text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-full transition-all shadow-xl hover:shadow-emerald-950/60 hover:scale-[1.03] border border-[#8ee435]/40 group cursor-pointer"
              >
                <span>Shop Now</span>
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>

          {/* Right Floating Product Card (Fresh Vegetables ₹180) */}
          <div className="hidden lg:block bg-sky-50/95 backdrop-blur-md p-4 rounded-3xl shadow-2xl border border-sky-100 w-64 transform transition-all hover:scale-105 duration-200">
            <div className="w-full h-36 rounded-2xl overflow-hidden mb-3 bg-white flex items-center justify-center p-2 border border-sky-100 shadow-inner">
              <img
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80"
                alt="Fresh Vegetables Basket"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="space-y-1 px-1">
              <h4 className="font-bold text-gray-900 text-sm">Fresh Vegetables</h4>
              <div className="flex items-center space-x-2">
                <span className="text-emerald-700 font-extrabold text-base">₹180</span>
                <span className="text-gray-400 line-through text-xs font-medium">₹240</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
