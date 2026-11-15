"use client";

import React from "react";
import Link from "next/link";
import { shopCategories, ShopCategoryItem } from "@/data/shopCategories";

export interface QuickCategoryItem {
  id: string;
  title: string;
  image: string;
  slug: string;
}

// Backward-compatibility export
export const QUICK_CATEGORIES: QuickCategoryItem[] = shopCategories.categories.map((c) => ({
  id: c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  title: c.name,
  image: c.image,
  slug: c.href.replace(/^\//, ""),
}));

interface QuickCategoryGridProps {
  onSelectCategory?: (category: ShopCategoryItem | QuickCategoryItem) => void;
}

export default function QuickCategoryGrid({ onSelectCategory }: QuickCategoryGridProps) {
  return (
    <section id="quick-categories" className="shop-categories w-full bg-[#faf5ea] border-b border-[#ded7c8] py-8 sm:py-10 lg:py-12 select-none">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* Semantic Header */}
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 sm:pb-5 border-b border-[#ded7c8] mb-8 sm:mb-10 lg:mb-12">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-semibold tracking-tight text-[#16301d] leading-none">
              {shopCategories.title}
            </h2>
            <p className="font-sans text-[11px] sm:text-xs md:text-sm font-extrabold tracking-[0.24em] text-[#193622] uppercase mt-2 sm:mt-2.5">
              {shopCategories.subtitle}
            </p>
          </div>

          <Link
            href={shopCategories.seeAll.href}
            className="text-xs sm:text-sm md:text-base font-bold text-[#16301d] hover:text-[#2b5936] transition-colors inline-flex items-center gap-1 group cursor-pointer self-start sm:self-auto pb-1"
            aria-label="View all categories in shop"
          >
            <span>{shopCategories.seeAll.label}</span>
            <span className="transition-transform group-hover:translate-x-1 font-extrabold text-lg">›</span>
          </Link>
        </header>

        {/* 14 Category Grid - Symmetrical 7x2 Layout */}
        <div className="category-grid grid grid-cols-4 sm:grid-cols-7 lg:grid-cols-7 gap-y-8 sm:gap-y-10 lg:gap-y-12 gap-x-3 sm:gap-x-4 lg:gap-x-6 items-start justify-items-center">
          {shopCategories.categories.map((category) => (
            <Link
              href={category.href}
              key={category.name}
              onClick={() => onSelectCategory?.(category)}
              className="category-card group flex flex-col items-center text-center cursor-pointer focus:outline-none"
              aria-label={`Shop ${category.name}`}
            >
              {/* Product Icon Box */}
              <div className="w-20 h-20 sm:w-22 sm:h-22 lg:w-26 lg:h-26 flex items-center justify-center p-2 rounded-2xl transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:scale-110">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.07)] group-hover:drop-shadow-[0_8px_18px_rgba(0,0,0,0.13)] transition-all duration-300"
                  loading="eager"
                  decoding="async"
                />
              </div>

              {/* Dynamic Live Text */}
              <span className="text-xs sm:text-sm lg:text-[15px] font-bold text-[#0f172a] leading-tight text-center mt-3 group-hover:text-[#e11d48] transition-colors max-w-[120px] min-h-[38px] flex items-start justify-center">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
