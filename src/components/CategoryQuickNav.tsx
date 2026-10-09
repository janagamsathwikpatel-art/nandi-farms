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
      const scrollAmount = direction === 'left' ? -240 : 240;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full my-4 sm:my-6 group">
      {/* Scroll Navigation Buttons for Desktop */}
      <button
        onClick={() => handleScroll('left')}
        className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/95 shadow-md border border-gray-200 items-center justify-center text-gray-700 hover:bg-emerald-900 hover:text-white transition-all cursor-pointer"
        aria-label="Scroll Left"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={() => handleScroll('right')}
        className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/95 shadow-md border border-gray-200 items-center justify-center text-gray-700 hover:bg-emerald-900 hover:text-white transition-all cursor-pointer"
        aria-label="Scroll Right"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Horizontal Circular Avatar Bar */}
      <div
        ref={scrollContainerRef}
        className="flex items-center space-x-4 sm:space-x-6 overflow-x-auto no-scrollbar py-3 px-2 scroll-smooth"
      >
        {ANVESHAN_CATEGORIES.map((cat) => {
          const isActive = activeCategory.toLowerCase() === cat.id.toLowerCase() || 
            (cat.id === 'all' && (activeCategory === 'All' || activeCategory === 'all'));

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="flex flex-col items-center flex-shrink-0 group/item cursor-pointer focus:outline-hidden"
            >
              {/* Circular Avatar Ring */}
              <div
                className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-2xl sm:text-3xl transition-all duration-200 shadow-sm ${
                  isActive
                    ? 'ring-4 ring-amber-400 border-2 border-emerald-800 bg-amber-50 shadow-md scale-105'
                    : 'bg-emerald-50/70 border border-emerald-100 hover:border-emerald-400 hover:bg-amber-50/50 hover:scale-105'
                }`}
              >
                <span>{cat.icon}</span>

                {/* Popular Sparkle Badge */}
                {cat.isPopular && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-white rounded-full p-0.5 shadow-xs">
                    <Sparkles className="w-3 h-3" />
                  </span>
                )}
              </div>

              {/* Category Label */}
              <span
                className={`mt-2 text-xs sm:text-sm font-semibold tracking-tight transition-colors line-clamp-1 ${
                  isActive
                    ? 'text-emerald-950 font-extrabold underline underline-offset-4 decoration-amber-500 decoration-2'
                    : 'text-gray-700 group-hover/item:text-emerald-800'
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
