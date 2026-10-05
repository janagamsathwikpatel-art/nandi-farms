'use client';

import React from 'react';
import { ArrowRight, Sparkles, Tag, Milk, Gift } from 'lucide-react';

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
        
        {/* Main Left Promotional Banner (Instamart Wide Hero Card) */}
        <div className="lg:col-span-8 relative overflow-hidden rounded-3xl sm:rounded-[32px] bg-gradient-to-br from-[#0c592e] via-[#10753d] to-[#158a49] p-6 sm:p-8 lg:p-10 text-white min-h-[340px] sm:min-h-[380px] flex flex-col justify-between shadow-xl border border-emerald-500/20">
          
          {/* Top Header Badge */}
          <div className="flex items-center space-x-2 z-10">
            <span className="bg-[#fbbf24] text-emerald-950 font-black text-[11px] sm:text-xs px-3.5 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1 shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>50% OFF First Order</span>
            </span>
            <span className="bg-emerald-900/60 backdrop-blur-md text-emerald-200 text-[11px] sm:text-xs font-semibold px-3 py-1 rounded-full border border-emerald-400/30">
              Code: NANDI50
            </span>
          </div>

          {/* Main Banner Body */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 items-center gap-6 my-4">
            {/* Text & Action Column */}
            <div className="sm:col-span-7 space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight font-sans">
                Fresh Organic <br className="hidden sm:inline" />
                <span className="text-[#a3f059]">Veggie Box</span>
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/90 max-w-sm leading-relaxed font-medium">
                Shop 100% pesticide-free vegetables, fruits & farm-fresh daily essentials with 10-minute express delivery.
              </p>

              {/* Call to Action Button */}
              <div className="pt-2">
                <button
                  onClick={handleScrollToPicks}
                  className="inline-flex items-center space-x-2.5 bg-[#fbbf24] hover:bg-[#f59e0b] text-gray-950 font-black text-xs sm:text-sm px-6 py-3.5 rounded-full transition-all shadow-lg hover:shadow-yellow-500/30 hover:scale-[1.03] cursor-pointer group"
                >
                  <span>Claim Offer Now</span>
                  <ArrowRight className="w-4 h-4 text-gray-950 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Fresh Veggie Basket Graphic */}
            <div className="sm:col-span-5 flex justify-center sm:justify-end">
              <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-2xl border-2 border-emerald-300/30 transform hover:scale-105 transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
                  alt="Fresh Organic Veggie Box"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-transparent flex items-end p-3">
                  <span className="text-white text-[11px] font-bold bg-emerald-900/80 px-2.5 py-1 rounded-md backdrop-blur-md">
                    🌿 Direct from Farmers
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Features Bar */}
          <div className="relative z-10 pt-3 border-t border-emerald-600/40 flex flex-wrap items-center gap-4 text-[11px] sm:text-xs text-emerald-100 font-medium">
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[#a3f059]"></span>
              <span>⚡ 10-Min Delivery</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[#a3f059]"></span>
              <span>🌱 100% Certified Organic</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[#a3f059]"></span>
              <span>👩‍🌾 500+ Local Farmers</span>
            </span>
          </div>

        </div>

        {/* Stacked Right Side Feature Cards */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4 sm:space-y-5">
          
          {/* Top Card: Daily Fresh Milk & Ghee Subscription */}
          <div 
            onClick={handleScrollToPicks}
            className="flex-1 bg-[#f4f9f4] hover:bg-[#eaf4ea] border border-emerald-200/80 rounded-3xl p-5 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer group flex items-center justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/90 px-3 py-1 rounded-full">
                <Milk className="w-3.5 h-3.5 text-emerald-700" />
                <span>Milk & A2 Ghee</span>
              </div>
              <h3 className="font-extrabold text-gray-900 text-sm sm:text-base group-hover:text-emerald-700 transition-colors leading-snug">
                Daily Fresh Milk Subscription
              </h3>
              <p className="text-xs text-gray-500 font-medium line-clamp-2">
                Pure cow milk & A2 ghee delivered fresh to your door by 6 AM daily.
              </p>
              <div className="inline-flex items-center space-x-1 text-xs font-extrabold text-emerald-700 group-hover:underline pt-1">
                <span>Subscribe & Save</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            
            <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden bg-white p-1 border border-emerald-100 shadow-xs">
              <img
                src="https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=300&q=80"
                alt="Daily Milk & Ghee"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>

          {/* Bottom Card: Today Special - Sweets & Pickles */}
          <div 
            onClick={handleScrollToPicks}
            className="flex-1 bg-[#fffbeb] hover:bg-[#fef3c7] border border-amber-200/80 rounded-3xl p-5 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer group flex items-center justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-800 bg-amber-100/90 px-3 py-1 rounded-full">
                <Gift className="w-3.5 h-3.5 text-amber-700" />
                <span>Today's Farm Special</span>
              </div>
              <h3 className="font-extrabold text-gray-900 text-sm sm:text-base group-hover:text-amber-800 transition-colors leading-snug">
                Organic Sweets & Mango Pickles
              </h3>
              <p className="text-xs text-gray-600 font-medium line-clamp-2">
                Authentic Gulab Jamun, Motichoor Ladoo & Andhra Pickles.
              </p>
              <div className="inline-flex items-center space-x-1 text-xs font-extrabold text-amber-800 group-hover:underline pt-1">
                <span>Shop Today's Deals</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden bg-white p-1 border border-amber-100 shadow-xs">
              <img
                src="/sweets-category.png"
                alt="Organic Sweets & Pickles"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

