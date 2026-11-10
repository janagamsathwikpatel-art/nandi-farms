"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export interface QuickCategoryItem {
  id: string;
  title: string;
  image: string;
  slug: string;
}

export const QUICK_CATEGORIES: QuickCategoryItem[] = [
  // Row 1 (8 items)
  {
    id: "fresh-vegetables",
    title: "Fresh Vegetables",
    image: "/images/shop_categories/fresh-vegetables.png",
    slug: "vegetables",
  },
  {
    id: "fruits",
    title: "Fruits",
    image: "/images/shop_categories/fruits.png",
    slug: "fruits",
  },
  {
    id: "dairy",
    title: "Dairy",
    image: "/images/shop_categories/dairy.png",
    slug: "milk",
  },
  {
    id: "meat-fish",
    title: "Meat & Fish",
    image: "/images/shop_categories/meat-fish.png",
    slug: "meat-fish",
  },
  {
    id: "sweets",
    title: "Sweets",
    image: "/images/shop_categories/sweets.png",
    slug: "sweets",
  },
  {
    id: "pooja-needs",
    title: "Pooja Needs",
    image: "/images/shop_categories/pooja-needs.png",
    slug: "pooja-needs",
  },
  {
    id: "karam-podulu",
    title: "Karam Podulu",
    image: "/images/shop_categories/karam-podulu.png",
    slug: "spices",
  },
  {
    id: "ravva",
    title: "Ravva",
    image: "/images/shop_categories/ravva.png",
    slug: "grains",
  },

  // Row 2 (6 items)
  {
    id: "rice",
    title: "Rice",
    image: "/images/shop_categories/rice.png",
    slug: "rice-grains",
  },
  {
    id: "eggs",
    title: "Eggs",
    image: "/images/shop_categories/eggs.png",
    slug: "eggs",
  },
  {
    id: "roots-vegetables",
    title: "Roots Vegetables",
    image: "/images/shop_categories/roots-vegetables.png",
    slug: "vegetables",
  },
  {
    id: "pickles",
    title: "Pickles",
    image: "/images/shop_categories/pickles.png",
    slug: "pickles",
  },
  {
    id: "personal-care",
    title: "Personal Care",
    image: "/images/shop_categories/personal-care.png",
    slug: "personal-care",
  },
  {
    id: "tea-coffee",
    title: "Tea & Coffee Powder",
    image: "/images/shop_categories/tea-coffee.png",
    slug: "tea-coffee",
  },
];

interface QuickCategoryGridProps {
  onSelectCategory?: (category: QuickCategoryItem) => void;
}

export default function QuickCategoryGrid({ onSelectCategory }: QuickCategoryGridProps) {
  return (
    <section id="quick-categories" className="w-full bg-[#faf5ea] py-6 sm:py-8 lg:py-10 select-none">
      <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Bar Outside the Card Container Matching Reference Length */}
        <div className="flex items-center justify-between mb-4 sm:mb-5 pb-2.5 sm:pb-3 border-b border-[#ded7c8]">
          <h2 className="text-xl sm:text-2xl lg:text-[26px] font-bold tracking-tight text-[#0f172a]">
            Shop by Category
          </h2>
          <Link
            href="/shop"
            className="text-xs sm:text-sm font-bold text-[#e11d48] hover:text-[#be123c] transition-colors flex items-center gap-1 group cursor-pointer"
          >
            <span>See All</span>
            <span className="transition-transform group-hover:translate-x-1 font-extrabold">›</span>
          </Link>
        </div>

        {/* 14 Categories Grid with Exact Sleek Proportions Matching Reference */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-7 shadow-xs border border-[#e4ded3]">
          <div className="grid grid-cols-4 sm:grid-cols-7 lg:grid-cols-8 gap-y-5 sm:gap-y-6 lg:gap-y-7 gap-x-2 sm:gap-x-3 lg:gap-x-4 items-start">
            {QUICK_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop`}
                onClick={() => onSelectCategory?.(cat)}
                className="group flex flex-col items-center text-center cursor-pointer focus:outline-none"
                aria-label={`Shop ${cat.title}`}
              >
                {/* Product Icon Box - Calibrated Sleek Proportions */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-[68px] lg:h-[68px] flex items-center justify-center p-1 rounded-xl transition-all duration-200 ease-out group-hover:-translate-y-1.5 group-hover:scale-110">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-contain filter drop-shadow-[0_3px_6px_rgba(0,0,0,0.06)] group-hover:drop-shadow-[0_6px_12px_rgba(0,0,0,0.12)] transition-all duration-200"
                    loading="eager"
                    decoding="async"
                  />
                </div>

                {/* Category Title - Compact & Crisp Live Typography */}
                <span className="text-[11px] sm:text-xs lg:text-[13px] font-bold text-[#0f172a] leading-tight text-center mt-2 group-hover:text-[#e11d48] transition-colors max-w-[95px] min-h-[30px] flex items-start justify-center">
                  {cat.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
