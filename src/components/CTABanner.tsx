'use client';

import React from 'react';
import { ChevronUp } from 'lucide-react';

export const CTABanner: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 relative">
      {/* Scroll Up Chevron Button */}
      <div className="flex justify-center -mt-6 mb-4">
        <button
          onClick={scrollToTop}
          className="w-9 h-9 rounded-full bg-white hover:bg-emerald-100 text-gray-600 hover:text-emerald-800 flex items-center justify-center transition-colors border border-gray-200/80 shadow-sm"
          title="Scroll Up"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      </div>

      <div className="relative overflow-hidden rounded-3xl sm:rounded-[36px] bg-gradient-to-r from-sky-100 via-sky-50 to-blue-100 p-8 sm:p-12 border border-sky-200/50 shadow-xs flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left Side: Content & Mobile App Store Buttons */}
        <div className="w-full md:w-1/2 space-y-5 text-left z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight font-sans">
            Ready To Fill Your Cart<br /> With Freshness?
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-medium max-w-md">
            Shop farm-fresh groceries, daily essentials, and exclusive deals delivered straight to your door.
          </p>

          {/* App Store & Google Play Buttons */}
          <div className="flex items-center space-x-3 pt-2">
            <a
              href="#"
              className="bg-black text-white px-4 py-2.5 rounded-xl hover:bg-gray-800 transition-colors flex items-center space-x-2 shadow-md border border-gray-800"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.13-1.97.99-3.12-.97.04-2.17.65-2.86 1.45-.61.71-1.15 1.88-.99 3.01 1.09.08 2.21-.52 2.86-1.34z"/>
              </svg>
              <div className="text-left leading-tight">
                <div className="text-[9px] text-gray-300 font-normal uppercase">Download on the</div>
                <div className="text-xs font-bold font-sans">App Store</div>
              </div>
            </a>

            <a
              href="#"
              className="bg-black text-white px-4 py-2.5 rounded-xl hover:bg-gray-800 transition-colors flex items-center space-x-2 shadow-md border border-gray-800"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a1.531 1.531 0 0 1-.61-1.229V3.043c0-.477.228-.9.609-1.229zM15.206 13.414l2.766-2.766a.82.82 0 0 1 1.16 0l2.308 2.308a.82.82 0 0 1 0 1.16l-2.308 2.308a.82.82 0 0 1-1.16 0l-2.766-2.766zm-1.01-1.414L3.923 1.727l10.273 10.273z"/>
              </svg>
              <div className="text-left leading-tight">
                <div className="text-[9px] text-gray-300 font-normal uppercase">GET IT ON</div>
                <div className="text-xs font-bold font-sans">Google Play</div>
              </div>
            </a>
          </div>
        </div>

        {/* Right Side: Fresh Produce Basket */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end z-10">
          <div className="relative w-full max-w-md h-60 sm:h-72 rounded-3xl overflow-hidden shadow-xl border border-white/80 bg-white/40 backdrop-blur-xs">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
              alt="Fresh Produce Basket"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
