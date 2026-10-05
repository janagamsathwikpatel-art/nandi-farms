'use client';

import React, { useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { CATEGORIES } from '@/data/products';

interface PopularCategoriesProps {
  onSelectCategory?: (categoryName: string) => void;
  onShowAll?: () => void;
}

export const PopularCategories: React.FC<PopularCategoriesProps> = ({
  onSelectCategory,
  onShowAll,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative">
      {/* Section Header with Navigation Arrows */}
      <div className="flex items-center justify-between mb-5 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-sans">
          Product Categories
        </h2>

        <div className="flex items-center space-x-3">
          {/* Header Navigation Arrow Buttons */}
          <div className="flex items-center space-x-1.5 bg-gray-100 p-1 rounded-full border border-gray-200/80">
            <button
              onClick={scrollLeft}
              className="w-8 h-8 rounded-full bg-white hover:bg-emerald-600 hover:text-white text-gray-800 flex items-center justify-center transition-colors shadow-xs cursor-pointer"
              title="Previous Categories"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollRight}
              className="w-8 h-8 rounded-full bg-white hover:bg-emerald-600 hover:text-white text-gray-800 flex items-center justify-center transition-colors shadow-xs cursor-pointer"
              title="Next Categories"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Show All Button */}
          <button
            onClick={handleShowAll}
            className="flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-full text-xs font-semibold transition-colors shadow-xs group cursor-pointer"
          >
            <span>Show All</span>
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>

      {/* Blinkit / Instamart Style Category Carousel (Pastel Rounded Box Image + Text Underneath) */}
      <div className="relative group/carousel">
        {/* Left Floating Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute -left-3 sm:-left-5 top-12 sm:top-14 z-20 w-9 h-9 rounded-full bg-white text-gray-800 shadow-xl border border-gray-200 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all transform hover:scale-110 cursor-pointer"
          title="Scroll Left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Categories Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex items-start space-x-4 sm:space-x-6 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className="shrink-0 w-[105px] sm:w-[125px] flex flex-col items-center text-center group cursor-pointer"
            >
              {/* Standalone Soft Pastel Blue Rounded Image Box */}
              <div className="w-full h-26 sm:h-30 rounded-2xl sm:rounded-3xl bg-[#ecf4ff] hover:bg-[#e2eeff] p-2 flex items-center justify-center overflow-hidden transition-all duration-200 group-hover:scale-105 shadow-2xs">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-xl sm:rounded-2xl"
                />
              </div>

              {/* Text Label Underneath the Box */}
              <div className="mt-2.5 space-y-0.5 max-w-[115px]">
                <h3 className="font-bold text-xs sm:text-xs text-gray-800 group-hover:text-emerald-700 transition-colors leading-tight line-clamp-2">
                  {cat.name}
                </h3>
                <p className="text-[11px] font-medium text-gray-400">
                  {String(cat.count).padStart(2, '0')} Products
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Right Floating Arrow */}
        <button
          onClick={scrollRight}
          className="absolute -right-3 sm:-right-5 top-12 sm:top-14 z-20 w-9 h-9 rounded-full bg-white text-gray-800 shadow-xl border border-gray-200 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all transform hover:scale-110 cursor-pointer"
          title="Scroll Right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};
