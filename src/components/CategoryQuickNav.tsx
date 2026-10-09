'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export interface QuickNavCategory {
  id: string;
  name: string;
  icon: string;
  count?: number;
  isPopular?: boolean;
}

export const ANVESHAN_CATEGORIES: QuickNavCategory[] = [
  { id: 'all', name: 'All Products', icon: '🛒', count: 32, isPopular: true },
  { id: 'ghee', name: 'Desi Ghee', icon: '🧈', count: 11, isPopular: true },
  { id: 'oils', name: 'Wood Pressed Oils', icon: '🛢️', count: 8, isPopular: true },
  { id: 'atta', name: 'Stoneground Atta', icon: '🌾', count: 6 },
  { id: 'honey', name: 'Raw Honey', icon: '🍯', count: 5 },
  { id: 'combos', name: 'Value Combos', icon: '📦', count: 9 },
  { id: 'fresh-vegetables', name: 'Veggies', icon: '🥦', count: 23 },
  { id: 'fruits', name: 'Fruits', icon: '🍎', count: 18 },
  { id: 'dairy', name: 'Dairy & Curd', icon: '🥛', count: 8 },
];

interface CategoryQuickNavProps {
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryQuickNav: React.FC<CategoryQuickNavProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full my-4 sm:my-6 group">
      {/* Scroll Navigation Buttons for Desktop */}
      <button
        onClick={() => handleScroll('left')}
        className="hidden md:flex absolute -left-2 sm:left-1 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-xl border border-gray-200 items-center justify-center text-gray-800 hover:bg-emerald-950 hover:text-white transition-all cursor-pointer hover:scale-110"
        aria-label="Scroll Left"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => handleScroll('right')}
        className="hidden md:flex absolute -right-2 sm:right-1 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-xl border border-gray-200 items-center justify-center text-gray-800 hover:bg-emerald-950 hover:text-white transition-all cursor-pointer hover:scale-110"
        aria-label="Scroll Right"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Full-Length Circular Avatar Bar — Complete Visibility Without Edge Cutoffs */}
      <div
        ref={scrollContainerRef}
        className="flex items-center justify-start md:justify-between gap-3 sm:gap-5 md:gap-6 lg:gap-8 overflow-x-auto md:overflow-x-visible no-scrollbar py-4 px-3 sm:px-6 lg:px-8 w-full max-w-none scroll-smooth"
      >
        {ANVESHAN_CATEGORIES.map((cat) => {
          const isActive = activeCategory.toLowerCase() === cat.id.toLowerCase() || 
            (cat.id === 'all' && (activeCategory === 'All' || activeCategory === 'all'));

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="flex flex-col items-center flex-shrink-0 md:flex-shrink group/item cursor-pointer focus:outline-hidden my-1"
            >
              {/* Responsive Circular Avatar Ring (64px - 100px) */}
              <div
                className={`relative w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 lg:w-26 lg:h-26 xl:w-28 xl:h-28 rounded-full flex items-center justify-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl transition-all duration-300 shadow-md ${
                  isActive
                    ? 'ring-4 ring-amber-400 border-2 border-emerald-900 bg-amber-50 shadow-xl scale-110'
                    : 'bg-emerald-50/80 border border-emerald-100 hover:border-emerald-500 hover:bg-amber-50/70 hover:scale-105 hover:shadow-lg'
                }`}
              >
                <span>{cat.icon}</span>

                {/* Popular Sparkle Badge */}
                {cat.isPopular && (
                  <span className="absolute top-0 right-0 bg-amber-500 text-white rounded-full p-1 shadow-sm animate-pulse">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </span>
                )}
              </div>

              {/* Un-truncated Full Category Label */}
              <span
                className={`mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base lg:text-lg font-extrabold tracking-tight transition-colors whitespace-nowrap text-center ${
                  isActive
                    ? 'text-emerald-950 underline underline-offset-6 decoration-amber-500 decoration-4 font-black scale-105'
                    : 'text-gray-800 group-hover/item:text-emerald-900'
                }`}
              >
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
