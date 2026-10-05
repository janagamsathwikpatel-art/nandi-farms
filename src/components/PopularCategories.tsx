'use client';

import React from 'react';
import { CATEGORIES } from '@/data/products';

interface PopularCategoriesProps {
  onSelectCategory?: (categoryName: string) => void;
  onShowAll?: () => void;
}

const CATEGORY_STYLES: Record<
  string,
  { bg: string; badgeBg: string; displayCount: string; displayName?: string }
> = {
  'fresh-vegetables': {
    bg: 'bg-[#dcfce7]',
    badgeBg: 'bg-[#15803d]',
    displayCount: '1.2k+ Products',
  },
  fruits: {
    bg: 'bg-[#fef9c3]',
    badgeBg: 'bg-[#ca8a04]',
    displayCount: '980+ Products',
    displayName: 'Fresh Fruits',
  },
  sweets: {
    bg: 'bg-[#ffedd5]',
    badgeBg: 'bg-[#c2410c]',
    displayCount: '650+ Products',
    displayName: 'Sweets & Mithai',
  },
  'pooja-needs': {
    bg: 'bg-[#fce7f3]',
    badgeBg: 'bg-[#be185d]',
    displayCount: '510+ Products',
    displayName: 'Pooja Essentials',
  },
  pickles: {
    bg: 'bg-[#f5e6d3]',
    badgeBg: 'bg-[#78350f]',
    displayCount: '430+ Products',
    displayName: 'Pickles & Chutneys',
  },
  'tea-coffee-drinks': {
    bg: 'bg-[#e0f2fe]',
    badgeBg: 'bg-[#1d4ed8]',
    displayCount: '1.1k+ Products',
    displayName: 'Tea & Coffee',
  },
  'daily-products': {
    bg: 'bg-[#ffedd5]',
    badgeBg: 'bg-[#b45309]',
    displayCount: '890+ Products',
    displayName: 'Snacks & Namkeen',
  },
  'dairy-eggs': {
    bg: 'bg-[#e0f2fe]',
    badgeBg: 'bg-[#1d4ed8]',
    displayCount: '940+ Products',
  },
  rice: {
    bg: 'bg-[#f5e5d3]',
    badgeBg: 'bg-[#78350f]',
    displayCount: '1.4k+ Products',
    displayName: 'Staples & Grains',
  },
  'meat-fish': {
    bg: 'bg-[#ccfbf1]',
    badgeBg: 'bg-[#0f766e]',
    displayCount: '680+ Products',
    displayName: 'Frozen Food',
  },
  'personal-care': {
    bg: 'bg-[#f3e8ff]',
    badgeBg: 'bg-[#7e22ce]',
    displayCount: '550+ Products',
    displayName: 'Health & Wellness',
  },
  'karam-podulu': {
    bg: 'bg-[#ffedd5]',
    badgeBg: 'bg-[#c2410c]',
    displayCount: '420+ Products',
  },
  ravva: {
    bg: 'bg-[#fef9c3]',
    badgeBg: 'bg-[#ca8a04]',
    displayCount: '350+ Products',
  },
  'roots-vegetables': {
    bg: 'bg-[#ffedd5]',
    badgeBg: 'bg-[#b45309]',
    displayCount: '480+ Products',
  },
};

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
      {/* Section Header - Exact matching Shop by Category & View All */}
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

      {/* Grid Layout matching 1:1 with media_1791207214279.jpg */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
        {CATEGORIES.map((cat) => {
          const style = CATEGORY_STYLES[cat.id] || {
            bg: 'bg-[#dcfce7]',
            badgeBg: 'bg-[#15803d]',
            displayCount: `${cat.count} Products`,
          };

          const nameToDisplay = style.displayName || cat.name;

          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className={`${style.bg} rounded-3xl p-3.5 sm:p-4 flex flex-col justify-between items-center text-center shadow-2xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer border border-black/5`}
            >
              {/* Top High Resolution Food Photo Box */}
              <div className="w-full h-32 sm:h-36 rounded-2xl overflow-hidden mb-3 bg-white/40 flex items-center justify-center p-1.5 shadow-inner">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Category Title */}
              <h3 className="font-extrabold text-sm sm:text-base text-[#1a202c] mb-2 leading-tight line-clamp-1 group-hover:text-emerald-800 transition-colors">
                {nameToDisplay}
              </h3>

              {/* Colored Pill Count Badge */}
              <span
                className={`${style.badgeBg} text-white px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-bold tracking-wide shadow-xs inline-block`}
              >
                {style.displayCount}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};


