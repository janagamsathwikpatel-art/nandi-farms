'use client';

import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="relative overflow-hidden rounded-3xl sm:rounded-[36px] shadow-xl border border-emerald-600/30">
        {/* Exact Hero Banner Image matching user screenshot without any changes */}
        <img
          src="/hero-banner-exact.png"
          alt="Nandi Farms Hero Banner"
          className="w-full h-auto object-cover rounded-3xl sm:rounded-[36px] block"
        />

        {/* Clickable Overlay Link on "Shop Now" Button Area */}
        <a
          href="#shop"
          aria-label="Shop Now"
          className="absolute bottom-[6%] left-[3%] w-[16%] h-[16%] rounded-full cursor-pointer z-20 hover:bg-white/10 transition-colors"
          title="Shop Now"
        />
      </div>
    </section>
  );
};
