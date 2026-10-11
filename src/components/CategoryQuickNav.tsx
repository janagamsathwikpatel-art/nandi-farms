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
    <div className="relative w-full my-2 sm:my-3 group">
      {/* Scroll Navigation Buttons — Compact & Responsive */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleScroll('left');
        }}
        className="flex absolute left-0 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/95 backdrop-blur-xs shadow-md border border-emerald-700/20 items-center justify-center text-emerald-950 hover:bg-emerald-950 hover:text-white transition-all cursor-pointer hover:scale-110 active:scale-95"
        aria-label="Scroll Left"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleScroll('right');
        }}
        className="flex absolute right-0 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/95 backdrop-blur-xs shadow-md border border-emerald-700/20 items-center justify-center text-emerald-950 hover:bg-emerald-950 hover:text-white transition-all cursor-pointer hover:scale-110 active:scale-95"
        aria-label="Scroll Right"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
      </button>

      {/* Refined Compact Circular Avatar Bar — Overflow Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex items-center justify-start gap-3 sm:gap-4 md:gap-5 lg:gap-6 overflow-x-auto no-scrollbar py-2.5 px-8 sm:px-11 w-full max-w-none scroll-smooth"
      >
        {ANVESHAN_CATEGORIES.map((cat) => {
          const isActive = activeCategory.toLowerCase() === cat.id.toLowerCase() || 
            (cat.id === 'all' && (activeCategory === 'All' || activeCategory === 'all'));

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="flex flex-col items-center flex-shrink-0 group/item cursor-pointer focus:outline-hidden my-0.5"
            >
              {/* Compact Circular Avatar Ring (48px - 72px) */}
              <div
                className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 rounded-full flex items-center justify-center text-xl sm:text-2xl md:text-3xl transition-all duration-300 shadow-xs ${
                  isActive
                    ? 'ring-[3px] ring-amber-400 border border-emerald-900 bg-amber-50 shadow-md scale-105'
                    : 'bg-emerald-50/80 border border-emerald-100 hover:border-emerald-400 hover:bg-amber-50/60 hover:scale-105 hover:shadow-sm'
                }`}
              >
                <span>{cat.icon}</span>
              </div>

              {/* Refined Category Label */}
              <span
                className={`mt-1.5 sm:mt-2 text-[11px] sm:text-xs md:text-sm font-bold tracking-tight transition-colors whitespace-nowrap text-center ${
                  isActive
                    ? 'text-emerald-950 underline underline-offset-4 decoration-amber-500 decoration-2 font-black'
                    : 'text-gray-800 group-hover/item:text-emerald-900 font-semibold'
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
