'use client';

import React from 'react';

export const RealIngredientsSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="relative overflow-hidden rounded-3xl sm:rounded-[36px] bg-[#3d1a29] shadow-2xl border border-[#5c2a40]/50 flex items-center justify-center p-4 sm:p-8 min-h-[380px] sm:min-h-[480px] group">
        
        {/* Exact Barcoop Bevy Inspired Real Ingredients Image Banner */}
        <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-2xl flex items-center justify-center">
          <img
            src="/real-ingredients-banner.png"
            alt="Real Ingredients Only - No High Fructose Corn Syrup, 100% Natural Ingredients, No Artificial Preservatives"
            className="w-full h-auto object-contain rounded-2xl block shadow-lg transition-transform duration-500 group-hover:scale-[1.01]"
          />
        </div>

      </div>
    </section>
  );
};
