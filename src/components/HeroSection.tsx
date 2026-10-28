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
        
        {/* Main Left Hero Banner in Soft Sage (#E2EBDD) */}
        <div className="lg:col-span-8 relative overflow-hidden rounded-3xl sm:rounded-[36px] bg-[#E2EBDD] p-6 sm:p-8 lg:p-10 text-[#1E3024] min-h-[380px] sm:min-h-[420px] flex flex-col justify-between shadow-md border border-[#CCDBC5]">
          
          {/* Decorative Subtle Farm Dots */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#28563D_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-[#F3D778]/25 rounded-full blur-3xl pointer-events-none"></div>

          {/* Banner Body Content */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 items-center gap-6 h-full my-auto">
            
            {/* Left Column: Big Discount Headline & Action Button */}
            <div className="sm:col-span-7 space-y-2 sm:space-y-3">
              <div className="inline-flex items-center gap-1.5 bg-[#F3D778] text-[#4A3800] px-3.5 py-1 rounded-full text-xs font-black shadow-2xs">
                <span>✨</span> 50% OFF YOUR FIRST ORDER
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1E3024] leading-none tracking-tight font-sans">
                Fresh Organic
              </h2>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#28563D] leading-tight tracking-tight pt-0.5 font-sans">
                Veggie &amp; Fruit Box
              </h1>
              <p className="text-xs sm:text-sm text-[#46594C] font-semibold max-w-sm pt-1">
                Pure, pesticide-free harvest delivered directly from verified local organic farms.
              </p>

              {/* Forest Green Primary CTA Button */}
              <div className="pt-3">
                <button
                  onClick={handleScrollToPicks}
                  className="inline-flex items-center space-x-2 bg-[#28563D] hover:bg-[#1E422F] text-white font-black text-sm sm:text-base px-7 py-3.5 rounded-2xl transition-all shadow-md hover:shadow-emerald-900/30 hover:scale-[1.03] cursor-pointer group"
                >
                  <span>Claim Offer Now</span>
                  <ChevronRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Column: Fresh Produce Basket with Banner Ribbon (Images 100% UNTOUCHED) */}
            <div className="sm:col-span-5 flex justify-center sm:justify-end items-center">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
                  alt="Fresh Farm Produce Basket"
                  className="w-full h-48 sm:h-52 object-cover rounded-3xl shadow-xl border-4 border-white"
                />
                
                {/* Ribbon Tag: Butter Yellow (#F3D778) */}
                <div className="absolute -bottom-2 bg-[#F3D778] text-[#4A3800] font-black text-xs sm:text-sm px-5 py-1.5 rounded-full shadow-md border border-[#E5CA65] uppercase tracking-wider flex items-center space-x-1 whitespace-nowrap">
                  <span>FRESH FARM PRODUCE</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Stacked Right Side Feature Cards */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4 sm:space-y-5">
          
          {/* Top Card: Daily Fresh Milk & Ghee Subscription in Soft Sage (#E2EBDD) */}
          <div 
            onClick={handleScrollToPicks}
            className="flex-1 bg-[#E2EBDD] hover:bg-[#D5E2CE] border border-[#CCDBC5] rounded-3xl p-5 sm:p-6 transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer group flex items-center justify-between gap-4 relative overflow-hidden"
          >
            {/* Top Left Milk Icon */}
            <div className="space-y-3 z-10 flex-1">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#28563D] shadow-2xs">
                <Milk className="w-4 h-4" />
              </div>

              <h3 className="font-extrabold text-[#1E3024] text-lg sm:text-xl leading-snug group-hover:text-[#28563D] transition-colors">
                Daily Fresh <br />
                Milk &amp; Ghee <br />
                Subscription
              </h3>

              <button className="bg-white border-2 border-[#28563D] text-[#28563D] group-hover:bg-[#28563D] group-hover:text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl transition-all cursor-pointer inline-block shadow-2xs">
                Subscribe &amp; Save
              </button>
            </div>

            {/* Right Side Photo & Cow Icon (Images 100% UNTOUCHED) */}
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
            className="flex-1 bg-[#FDF8EE] hover:bg-[#F9F0DF] border border-[#F3D778]/70 rounded-3xl p-5 sm:p-6 transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer group flex items-center justify-between gap-4 relative overflow-hidden"
          >
            <div className="space-y-3 z-10 flex-1">
              <div className="inline-block bg-[#F3D778] text-[#4A3800] text-[10px] font-black px-2 py-0.5 rounded-md">
                SPECIAL
              </div>
              <h3 className="font-extrabold text-[#1E3024] text-lg sm:text-xl leading-snug group-hover:text-[#28563D] transition-colors">
                Today Special: <br />
                Organic Mangoes <br />
                &amp; Sweets
              </h3>

              <button className="bg-white border-2 border-[#28563D] text-[#28563D] group-hover:bg-[#28563D] group-hover:text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl transition-all cursor-pointer inline-block shadow-2xs">
                Shop Now
              </button>
            </div>

            {/* Right Side Sweets & Mangoes Photo (Images 100% UNTOUCHED) */}
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


