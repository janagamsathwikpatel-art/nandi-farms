"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
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
  // State for active copied feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (e: React.MouseEvent, text: string, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      }).catch(() => {
        // Fallback for clipboard permissions if any
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      });
    }
  };

  return (
    <section id="quick-categories" className="shop-categories w-full bg-[#faf5ea] border-b border-[#ded7c8] py-8 sm:py-10 lg:py-12 select-text">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* Semantic Header with Click-to-Copy and Motion */}
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 sm:pb-5 border-b border-[#ded7c8] mb-8 sm:mb-10 lg:mb-12">
          <div
            onClick={(e) => handleCopy(e, `${shopCategories.title} - ${shopCategories.subtitle}`, "header")}
            className="group relative cursor-pointer select-text transition-transform duration-200 hover:-translate-y-1 active:translate-y-0"
            title="Click to copy header text"
          >
            {/* Floating Badge for Header */}
            {copiedId === "header" && (
              <div className="absolute -top-8 left-0 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#193E2D] text-white text-[11px] font-semibold shadow-lg animate-bounce pointer-events-none">
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Copied to Clipboard!</span>
              </div>
            )}

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-semibold tracking-tight text-[#16301d] leading-none transition-colors group-hover:text-[#2b5936]">
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

        {/* 14 Category Grid - Symmetrical 7x2 Layout (Fluid Mobile Responsive) */}
        <div className="category-grid grid grid-cols-4 sm:grid-cols-7 lg:grid-cols-7 gap-y-6 sm:gap-y-10 lg:gap-y-12 gap-x-1.5 xs:gap-x-2.5 sm:gap-x-4 lg:gap-x-6 items-start justify-items-center">
          {shopCategories.categories.map((category) => {
            const isCopied = copiedId === category.name;

            return (
              <div
                key={category.name}
                className="category-card group relative flex flex-col items-center text-center select-text w-full"
              >
                {/* Floating Badge for Individual Category */}
                {isCopied && (
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#193E2D] text-white text-[9px] xs:text-[10px] font-semibold shadow-lg animate-bounce whitespace-nowrap pointer-events-none">
                    <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-300" />
                    <span>Copied!</span>
                  </div>
                )}

                {/* Product Icon Box (Navigates to Category Page on Click) */}
                <Link
                  href={category.href}
                  onClick={() => onSelectCategory?.(category)}
                  className="w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 lg:w-26 lg:h-26 flex items-center justify-center p-1.5 sm:p-2 rounded-2xl transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:scale-110 cursor-pointer"
                  aria-label={`Shop ${category.name}`}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.07)] group-hover:drop-shadow-[0_8px_18px_rgba(0,0,0,0.13)] transition-all duration-300"
                    loading="eager"
                    decoding="async"
                  />
                </Link>

                {/* Category Title: Click-to-Copy with Tactile Motion Animation ("text moved") */}
                <button
                  type="button"
                  onClick={(e) => handleCopy(e, category.name, category.name)}
                  title={`Click to copy "${category.name}"`}
                  className={`text-[13px] xs:text-[14px] sm:text-base lg:text-[17px] font-bold leading-snug text-center mt-2 sm:mt-3 max-w-[76px] xs:max-w-[88px] sm:max-w-[120px] min-h-[30px] sm:min-h-[38px] flex items-start justify-center cursor-pointer select-text transition-all duration-200
                    hover:text-[#2b5936] hover:-translate-y-1 active:translate-y-0.5 active:scale-95
                    ${isCopied ? "text-[#193E2D] font-extrabold -translate-y-1 scale-105" : "text-[#0f172a]"}
                  `}
                >
                  {category.name}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
