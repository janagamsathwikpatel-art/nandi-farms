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
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative">
      {/* Section Header with Left & Right Arrow Buttons */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
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

      {/* Categories Carousel Slider with Floating Side Arrows */}
      <div className="relative group/carousel">
        {/* Left Side Floating Arrow Button */}
        <button
          onClick={scrollLeft}
          className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 text-gray-800 shadow-xl border border-gray-200/90 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all transform hover:scale-110 cursor-pointer"
          title="Scroll Left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Scrollable Category Cards Container */}
        <div
          ref={scrollContainerRef}
          className="flex items-center space-x-3 sm:space-x-4 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className={`shrink-0 w-[145px] sm:w-[165px] group flex flex-col items-center justify-between p-2.5 sm:p-3 rounded-[28px] bg-gradient-to-b ${cat.bgGradient} border ${cat.borderColor} hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 text-center min-h-[225px] sm:min-h-[250px] cursor-pointer`}
            >
              {/* Image Container taking full height */}
              <div className="w-full h-36 sm:h-44 mb-2.5 overflow-hidden rounded-2xl shadow-xs group-hover:scale-105 transition-transform duration-300">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>

              {/* Category Info */}
              <div className="space-y-0.5 pb-1 w-full">
                <h3 className="font-bold text-xs sm:text-sm tracking-tight text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                  {cat.name}
                </h3>
                <p className="text-[11px] font-medium text-gray-500">
                  {String(cat.count).padStart(2, '0')} Product
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Right Side Floating Arrow Button */}
        <button
          onClick={scrollRight}
          className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 text-gray-800 shadow-xl border border-gray-200/90 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all transform hover:scale-110 cursor-pointer"
          title="Scroll Right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};
