'use client';

import React from 'react';
import { ChevronRight, Award, Truck, Leaf } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const handleScrollToPicks = () => {
    const picksSection = document.getElementById('todays-picks');
    if (picksSection) {
      picksSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 600, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-none">
      {/* 1. Top Sub-Header Sage Feature Strip (Matching Reference Screenshot Header Row) */}
      <div className="bg-[#e7ece2] border-y border-emerald-100/80 py-3 px-4 sm:px-8 lg:px-12 w-full max-w-none">
        <div className="flex flex-wrap items-center justify-around gap-4 max-w-7xl mx-auto text-xs sm:text-sm font-extrabold text-emerald-950">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center border border-emerald-300 text-emerald-800 shadow-2xs">
              <Award className="w-3.5 h-3.5" />
            </div>
            <span>100% Traditional Bilona Churned Ghee</span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center border border-emerald-300 text-emerald-800 shadow-2xs">
              <Leaf className="w-3.5 h-3.5" />
            </div>
            <span>Direct Local Sustainable Farm Fresh</span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center border border-emerald-300 text-emerald-800 shadow-2xs">
              <Truck className="w-3.5 h-3.5" />
            </div>
            <span>Express Doorstep Same-Day Delivery</span>
          </div>
        </div>
      </div>

      {/* 2. Main Hero Section (Warm Peach/Cream Backdrop Container Matching Reference Screenshot) */}
      <section className="bg-[#fdf4ed] py-8 sm:py-12 px-4 sm:px-8 lg:px-12 w-full max-w-none border-b border-amber-100/60">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-7xl mx-auto">
          
          {/* Left Side: Large White Image Container Box */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-3 sm:p-5 shadow-xl border border-amber-100/80 overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="relative w-full h-[280px] sm:h-[360px] lg:h-[400px] rounded-2xl overflow-hidden bg-amber-50/50">
                <img
                  src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80"
                  alt="Nandi Farms Organic Harvest"
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating Fresh Harvest Badge */}
                <div className="absolute top-4 left-4 bg-emerald-950/90 text-white font-extrabold text-xs px-4 py-2 rounded-full backdrop-blur-xs shadow-md border border-emerald-700/50 uppercase tracking-wider">
                  🌿 100% Organic & Chemical-Free
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Headline Text & Solid Olive/Emerald Green CTA Button */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-xs font-black text-amber-800 uppercase tracking-widest bg-amber-100/80 px-3 py-1 rounded-full border border-amber-200 inline-block">
                Nandi Farms Signature
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight tracking-tight font-sans">
                Pure Farm-Fresh Essentials <br className="hidden sm:block" />
                Harvested Daily
              </h1>
            </div>

            <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed max-w-lg">
              Authentic bilona churned A2 desi ghee, cold wood pressed oils, stoneground atta, and fresh organic produce delivered directly from local sustainable farms.
            </p>

            {/* Solid Olive Green CTA Button (Matching Reference Screenshot) */}
            <div className="pt-2">
              <button
                onClick={handleScrollToPicks}
                className="inline-flex items-center space-x-3 bg-[#4a6439] hover:bg-emerald-950 text-white font-extrabold text-sm sm:text-base px-8 py-4 rounded-2xl transition-all shadow-lg hover:shadow-emerald-900/30 hover:scale-105 cursor-pointer group active:scale-95"
              >
                <span>Shop Fresh Produce Now</span>
                <ChevronRight className="w-5 h-5 text-amber-300 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
