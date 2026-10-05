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
      <div className="flex items-center justify-between mb-6 sm:mb-7">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2d3748] tracking-tight font-sans">
          Shop by Category
        </h2>

        <button
          onClick={handleShowAll}
          className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
        >
          View All
        </button>
      </div>

      {/* Clean Category Images Grid (No Background Card Boxes, No Product Count Badges) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.name)}
            className="flex flex-col items-center text-center group cursor-pointer transition-all duration-200 hover:-translate-y-1"
          >
            {/* Standalone HD Image Box */}
            <div className="w-full h-36 sm:h-40 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-gray-200/80 bg-white p-1">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Category Title Only (Product Count Details & Card Background Removed) */}
            <h3 className="mt-2.5 font-extrabold text-xs sm:text-sm text-[#1a202c] group-hover:text-emerald-700 transition-colors leading-snug line-clamp-1">
              {cat.name}
            </h3>
          </button>
        ))}
      </div>
    </section>
  );
};



