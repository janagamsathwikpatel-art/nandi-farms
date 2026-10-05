'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';

export const FreshProduceBanner: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="relative overflow-hidden rounded-3xl sm:rounded-[36px] bg-gradient-to-r from-sky-100 via-sky-50 to-blue-100 p-6 sm:p-10 border border-sky-200/60 shadow-xs flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left Side: Rich Vegetable & Fruit Basket Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <div className="relative w-full max-w-md h-56 sm:h-64 rounded-2xl overflow-hidden shadow-md border border-white/60 bg-white/40 backdrop-blur-xs">
            <img
              src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=800&q=80"
              alt="Fresh Fruits & Vegetables Basket"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side: Text & Button */}
        <div className="w-full md:w-1/2 space-y-4 text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight font-sans">
            Fresh Fruits & Vegetables.<br />
            Delivered Daily.
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium max-w-md">
            We deliver everything you need straight to your door.
          </p>
          <div className="pt-2">
            <a
              href="#fresh-produce"
              className="inline-flex items-center space-x-2 bg-gray-900 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-all shadow-md group"
            >
              <span>Shop Fresh Produce</span>
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
