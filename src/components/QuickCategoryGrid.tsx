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
    <section id="categories" className="w-full bg-white py-6 sm:py-8 lg:py-10 border-b border-[#f1eee7] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Bar */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0f172a]">
            Shop by Category
          </h2>
          <Link
            href="/shop"
            className="text-sm sm:text-base font-semibold text-[#e11d48] hover:text-[#be123c] transition-colors flex items-center gap-1 group cursor-pointer"
          >
            <span>See All</span>
            <span className="transition-transform group-hover:translate-x-0.5">›</span>
          </Link>
        </div>

        {/* 14 Categories Grid matching reference layout */}
        <div className="grid grid-cols-4 sm:grid-cols-7 lg:grid-cols-8 gap-y-7 gap-x-3 sm:gap-x-4 lg:gap-x-5 items-start">
          {QUICK_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop`}
              onClick={() => onSelectCategory?.(cat)}
              className="group flex flex-col items-center text-center cursor-pointer focus:outline-none"
              aria-label={`Shop ${cat.title}`}
            >
              {/* Product Icon Box */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-22 lg:h-22 flex items-center justify-center p-1 rounded-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-105">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-contain filter drop-shadow-xs transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Category Title */}
              <span className="text-xs sm:text-[13px] font-semibold text-[#0f172a] leading-tight text-center mt-2 group-hover:text-[#e11d48] transition-colors max-w-[100px] line-clamp-2">
                {cat.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
