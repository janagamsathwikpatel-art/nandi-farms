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
        {/* Full-Width Header Bar with New Serif Typography & Tagline matching Screenshot 1 */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4 sm:mb-5">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-semibold tracking-tight text-[#16301d] leading-none">
              Shop by Category
            </h2>
            <p className="font-sans text-[11px] sm:text-xs md:text-sm font-extrabold tracking-[0.24em] text-[#193622] uppercase mt-2 sm:mt-2.5">
              PURE GOODNESS FOR A HEALTHIER TOMORROW
            </p>
          </div>
          <Link
            href="/shop"
            className="text-xs sm:text-sm md:text-base font-bold text-[#16301d] hover:text-[#2b5936] transition-colors inline-flex items-center gap-1.5 group cursor-pointer self-start sm:self-auto pb-1"
            aria-label="View all categories in shop"
          >
            <span>See All</span>
            <span className="transition-transform group-hover:translate-x-1 font-extrabold text-lg">›</span>
          </Link>
        </div>

        {/* Thin Divider Line matching Screenshot 1 */}
        <div className="w-full h-px bg-[#ded7c8] mb-8 sm:mb-10 lg:mb-12" />

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
