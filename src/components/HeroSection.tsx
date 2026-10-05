'use client';

import React from 'react';
import { ChevronRight, Milk } from 'lucide-react';

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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        
        {/* Main Left Hero Banner - Exact 1:1 match to media_1791207289263.jpg */}
        <div className="lg:col-span-8 relative overflow-hidden rounded-3xl sm:rounded-[36px] bg-[#0f8534] p-6 sm:p-8 lg:p-10 text-white min-h-[380px] sm:min-h-[420px] flex flex-col justify-between shadow-xl border border-emerald-600/30">
          
          {/* Decorative Organic Leaf Watermarks */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none"></div>

          {/* Banner Body Content */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 items-center gap-6 h-full my-auto">
            
            {/* Left Column: Big Discount Headline & Action Button */}
            <div className="sm:col-span-7 space-y-2 sm:space-y-3">
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight font-sans drop-shadow-sm">
                50% OFF
              </h2>
              <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                your first order
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight pt-1 font-sans">
                Fresh Organic <br />
                Veggie Box
              </h1>

              {/* Yellow CTA Button */}
              <div className="pt-4">
                <button
                  onClick={handleScrollToPicks}
                  className="inline-flex items-center space-x-2 bg-[#fbbf24] hover:bg-[#f59e0b] text-gray-950 font-black text-sm sm:text-base px-7 py-3.5 rounded-2xl transition-all shadow-md hover:shadow-yellow-500/30 hover:scale-[1.03] cursor-pointer group"
                >
                  <span>Claim Offer Now</span>
                  <ChevronRight className="w-5 h-5 text-gray-950 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Column: Fresh Produce Basket with Banner Ribbon */}
            <div className="sm:col-span-5 flex justify-center sm:justify-end items-center">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
                  alt="Fresh Farm Produce Basket"
                  className="w-full h-48 sm:h-52 object-cover rounded-3xl shadow-2xl border-4 border-white/20"
                />
                
                {/* Ribbon Tag: FRESH FARM PRODUCE */}
                <div className="absolute -bottom-2 bg-white text-emerald-950 font-black text-xs sm:text-sm px-5 py-1.5 rounded-full shadow-lg border border-gray-200 uppercase tracking-wider flex items-center space-x-1 whitespace-nowrap">
                  <span>FRESH FARM PRODUCE</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Stacked Right Side Feature Cards */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4 sm:space-y-5">
          
          {/* Top Card: Daily Fresh Milk & Ghee Subscription */}
          <div 
            onClick={handleScrollToPicks}
            className="flex-1 bg-[#f4f7ed] hover:bg-[#eaf0de] border border-emerald-200/60 rounded-3xl p-5 sm:p-6 transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer group flex items-center justify-between gap-4 relative overflow-hidden"
          >
            {/* Top Left Milk Icon */}
            <div className="space-y-3 z-10 flex-1">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800">
                <Milk className="w-4 h-4" />
              </div>

              <h3 className="font-extrabold text-gray-900 text-lg sm:text-xl leading-snug group-hover:text-emerald-800 transition-colors">
                Daily Fresh <br />
                Milk & Ghee <br />
                Subscription
              </h3>

              <button className="bg-transparent border-2 border-gray-900 text-gray-900 group-hover:bg-gray-900 group-hover:text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl transition-all cursor-pointer inline-block">
                Subscribe & Save
              </button>
            </div>

            {/* Right Side Photo & Cow Icon */}
            <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
              <span className="absolute -top-1 right-0 text-xl z-20">🐮</span>
              <img
                src="https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=300&q=80"
                alt="Daily Milk & Ghee"
                className="w-full h-full object-cover rounded-2xl shadow-xs border border-white"
              />
            </div>
          </div>

          {/* Bottom Card: Today Special - Organic Mangoes & Sweets */}
          <div 
            onClick={handleScrollToPicks}
            className="flex-1 bg-[#fff2e2] hover:bg-[#ffe5ca] border border-orange-200/60 rounded-3xl p-5 sm:p-6 transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer group flex items-center justify-between gap-4 relative overflow-hidden"
          >
            <div className="space-y-3 z-10 flex-1">
              <h3 className="font-extrabold text-gray-900 text-lg sm:text-xl leading-snug group-hover:text-orange-900 transition-colors">
                Today Special: <br />
                Organic Mangoes <br />
                & Sweets
              </h3>

              <button className="bg-transparent border-2 border-gray-900 text-gray-900 group-hover:bg-gray-900 group-hover:text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl transition-all cursor-pointer inline-block">
                Shop Now
              </button>
            </div>

            {/* Right Side Sweets & Mangoes Photo & Festive Diya */}
            <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
              <span className="absolute -top-1 right-0 text-xl z-20">🪔</span>
              <img
                src="/sweets-category.png"
                alt="Organic Sweets & Mangoes"
                className="w-full h-full object-cover rounded-2xl shadow-xs border border-white"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};


