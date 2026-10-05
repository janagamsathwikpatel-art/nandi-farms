'use client';

import React from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';
import { CATEGORIES } from '@/data/products';

interface PopularCategoriesProps {
  onSelectCategory?: (categoryName: string) => void;
  onShowAll?: () => void;
}

export const PopularCategories: React.FC<PopularCategoriesProps> = ({
  onSelectCategory,
  onShowAll,
}) => {
  const handleShowAll = () => {
    if (onShowAll) {
      onShowAll();
    } else {
      const el = document.getElementById('todays-picks');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (catName: string) => {
    if (onSelectCategory) {
      onSelectCategory(catName);
    }
    const el = document.getElementById('todays-picks');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-emerald-100 text-emerald-800 text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>Shop by Category</span>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-sans mt-1">
            Product Categories
          </h2>
        </div>

        <button
          onClick={handleShowAll}
          className="self-start sm:self-auto inline-flex items-center space-x-2 bg-gray-900 hover:bg-emerald-700 text-white px-4 py-2 rounded-full text-xs font-bold transition-all shadow-xs group cursor-pointer"
        >
          <span>Explore All Categories</span>
          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>

      {/* Instamart 2-Row Bento Grid Card Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3.5 sm:gap-4.5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.name)}
            className="group flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-200/70 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white cursor-pointer text-left"
          >
            {/* Top HD Photo Container (60% Height) */}
            <div className="w-full h-28 sm:h-32 overflow-hidden bg-gray-100 relative p-1.5">
              <div className="w-full h-full rounded-xl overflow-hidden relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>

            {/* Bottom Soft Pastel Theme Content Box (40% Height) */}
            <div className={`p-3 bg-gradient-to-br ${cat.bgGradient || 'from-emerald-50 to-teal-50/60'} flex flex-col justify-between flex-1 border-t border-gray-100/80`}>
              <h3 className={`font-black text-xs sm:text-xs ${cat.textColor || 'text-gray-900'} leading-snug line-clamp-1 group-hover:text-emerald-800 transition-colors`}>
                {cat.name}
              </h3>
              
              <div className="mt-1.5 flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-emerald-800 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full shadow-2xs border border-emerald-200/50">
                  {cat.count} Products
                </span>
                <div className="w-4 h-4 rounded-full bg-emerald-700/10 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                  <ChevronRight className="w-3 h-3 text-emerald-700" />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

