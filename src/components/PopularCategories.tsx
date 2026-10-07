'use client';

import React from 'react';
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
      <div className="flex items-center justify-between mb-5 sm:mb-6">
        <h2 
          onClick={handleShowAll}
          className="text-lg sm:text-xl font-bold text-gray-900 hover:text-emerald-700 transition-colors tracking-tight font-sans cursor-pointer flex items-center gap-1.5"
          title="Click to view all categories"
        >
          Shop by Category
        </h2>

        <button
          onClick={handleShowAll}
          className="text-xs sm:text-sm font-bold text-[#ff3269] hover:text-[#e0285a] transition-colors cursor-pointer flex items-center gap-0.5"
        >
          See All <span className="text-base font-semibold">›</span>
        </button>
      </div>

      {/* 1:1 Reference Screenshot Category Grid (Zepto-Style Rounded Cards & Typography) */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.name)}
            className="flex flex-col items-center text-center group cursor-pointer transition-all duration-200 hover:-translate-y-1"
          >
            {/* Soft Gray Rounded Container (1:1 Reference Match) */}
            <div className="w-full aspect-square rounded-2xl bg-[#f2f4f7] hover:bg-[#eaeef3] border border-gray-100/90 p-2 sm:p-2.5 flex items-center justify-center overflow-hidden shadow-2xs group-hover:shadow-md transition-all duration-200">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Category Title (1:1 Reference Dark Bold Font) */}
            <h3 className="mt-2 font-bold text-xs sm:text-[13px] text-[#111827] group-hover:text-emerald-800 transition-colors leading-snug line-clamp-2 max-w-[105px]">
              {cat.name}
            </h3>
          </button>
        ))}
      </div>
    </section>
  );
};



