'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="relative overflow-hidden rounded-3xl sm:rounded-[36px] bg-[#125c34] min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] flex items-center shadow-xl border border-emerald-600/30">
        
        {/* Giant Watermark Title: NandiFarms in Lime Green */}
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden z-0">
          <h1 className="text-[75px] sm:text-[120px] md:text-[150px] lg:text-[185px] font-black tracking-tighter text-[#8ee435] whitespace-nowrap font-sans leading-none transform scale-y-105 drop-shadow-sm">
            Nandi<span className="font-extrabold text-[#9ef542]">Farms</span>
          </h1>
        </div>

        {/* Slanted "Same-Day Delivery" Floating Badge Tag */}
        <div className="absolute top-6 sm:top-8 right-[15%] sm:right-[22%] md:right-[28%] z-20">
          <div className="bg-[#0b3820]/90 backdrop-blur-md text-[#8ee435] text-[11px] sm:text-xs font-bold px-4 py-1.5 rounded-full border border-[#8ee435]/40 shadow-lg transform rotate-[-6deg] flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#8ee435] animate-pulse" />
            <span>Same-Day Delivery</span>
          </div>
        </div>

        {/* Delivery Person Portrait (Clean cutout blend without square borders) */}
        <div className="absolute inset-x-0 bottom-0 top-6 flex justify-center items-end pointer-events-none z-10">
          <div className="relative h-full max-h-[460px] w-auto flex items-end justify-center">
            <img
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=700&q=80"
              alt="Nandi Farms Delivery Person"
              className="h-full object-cover object-top rounded-t-full mask-gradient shadow-2xl opacity-95 filter contrast-[1.05]"
              style={{
                maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)',
              }}
            />
          </div>
        </div>

        {/* Left Hero Subtext (Without Shop Now button and without floating card as requested) */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-8 sm:py-12 flex items-center justify-start">
          <div className="max-w-xs sm:max-w-sm md:max-w-md space-y-3 text-white bg-[#0b3820]/50 backdrop-blur-md p-5 sm:p-6 rounded-3xl border border-[#8ee435]/20 shadow-2xl">
            <p className="text-xs sm:text-sm md:text-base text-emerald-50 leading-relaxed font-medium">
              Shop from thousands of farm-fresh fruits, vegetables, dairy, and daily essentials at unbeatable prices.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
