'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { CATEGORIES } from '@/data/products';

export const PopularCategories: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-sans">
          Popular Categories
        </h2>
        <button className="flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-full text-xs font-semibold transition-colors shadow-xs group">
          <span>Show All</span>
          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-10 gap-3 sm:gap-4">
        {CATEGORIES.map((cat) => (
          <a
            key={cat.id}
            href={`#${cat.id}`}
            className={`group flex flex-col items-center justify-between p-4 rounded-3xl bg-gradient-to-b ${cat.bgGradient} border ${cat.borderColor} hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 text-center min-h-[190px]`}
          >
            {/* Image Container */}
            <div className="w-24 h-24 mb-3 flex items-center justify-center p-1.5 rounded-2xl bg-white/80 backdrop-blur-xs shadow-xs group-hover:scale-105 transition-transform">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            {/* Category Info */}
            <div className="space-y-0.5">
              <h3 className={`font-bold text-sm tracking-tight text-gray-900 group-hover:text-emerald-700 transition-colors`}>
                {cat.name}
              </h3>
              <p className="text-[11px] font-medium text-gray-500">
                {String(cat.count).padStart(2, '0')} Product
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
