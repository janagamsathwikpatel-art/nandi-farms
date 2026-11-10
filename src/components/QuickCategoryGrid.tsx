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
    <section id="quick-categories" className="w-full bg-[#faf5ea] border-b border-[#ded7c8] py-8 sm:py-10 lg:py-12 select-none">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* Full-Width Header Bar with Harmonized Border */}
        <div className="flex items-center justify-between mb-6 sm:mb-8 pb-3.5 sm:pb-4 border-b border-[#ded7c8]">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0f172a]">
            Shop by Category
          </h2>
          <Link
            href="/shop"
            className="text-sm sm:text-base font-bold text-[#e11d48] hover:text-[#be123c] transition-colors flex items-center gap-1.5 group cursor-pointer"
          >
            <span>See All</span>
            <span className="transition-transform group-hover:translate-x-1 font-extrabold text-lg">›</span>
          </Link>
        </div>

        {/* 14 Categories Grid - Symmetrical 7x2 Grid, Zero Outer Side Gaps & Zero Empty Columns */}
        <div className="w-full py-2">
          <div className="grid grid-cols-4 sm:grid-cols-7 lg:grid-cols-7 gap-y-8 sm:gap-y-10 lg:gap-y-12 gap-x-3 sm:gap-x-4 lg:gap-x-6 items-start justify-items-center">
            {QUICK_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop`}
                onClick={() => onSelectCategory?.(cat)}
                className="group flex flex-col items-center text-center cursor-pointer focus:outline-none"
                aria-label={`Shop ${cat.title}`}
              >
                {/* Product Icon Box - +50% Larger Sizing (w-20 to w-26) */}
                <div className="w-20 h-20 sm:w-22 sm:h-22 lg:w-26 lg:h-26 flex items-center justify-center p-2 rounded-2xl transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:scale-110">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.07)] group-hover:drop-shadow-[0_8px_18px_rgba(0,0,0,0.13)] transition-all duration-300"
                    loading="eager"
                    decoding="async"
                  />
                </div>

                {/* Category Title - Larger, Crisp Font Outside Image */}
                <span className="text-xs sm:text-sm lg:text-[15px] font-bold text-[#0f172a] leading-tight text-center mt-3 group-hover:text-[#e11d48] transition-colors max-w-[120px] min-h-[38px] flex items-start justify-center">
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
