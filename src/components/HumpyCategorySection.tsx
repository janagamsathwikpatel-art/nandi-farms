"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CategoryItem {
  id: string;
  title: string;
  image: string;
  link: string;
}

export const HUMPY_CATEGORIES: CategoryItem[] = [
  {
    id: "dairy",
    title: "Dairy",
    image: "/images/categories/dairy.png",
    link: "#dairy",
  },
  {
    id: "desi-milk",
    title: "Desi Milk",
    image: "/images/categories/desi-milk.png",
    link: "#desi-milk",
  },
  {
    id: "eggs",
    title: "Eggs",
    image: "/images/categories/eggs.png",
    link: "#eggs",
  },
  {
    id: "flour",
    title: "Flour",
    image: "/images/categories/flour.png",
    link: "#flour",
  },
  {
    id: "ghee",
    title: "Ghee",
    image: "/images/categories/ghee.png",
    link: "#ghee",
  },
  {
    id: "dal",
    title: "Dal",
    image: "/images/categories/dal.png",
    link: "#dal",
  },
  {
    id: "sweeteners",
    title: "Sweeteners",
    image: "/images/categories/sweeteners.png",
    link: "#sweeteners",
  },
  {
    id: "oil",
    title: "Oil",
    image: "/images/categories/oil.png",
    link: "#oil",
  },
  {
    id: "dry-fruits",
    title: "Dry Fruits",
    image: "/images/categories/dry-fruits.png",
    link: "#dry-fruits",
  },
  {
    id: "seeds",
    title: "Seeds",
    image: "/images/categories/seeds.png",
    link: "#seeds",
  },
  {
    id: "rice",
    title: "Rice",
    image: "/images/categories/rice.png",
    link: "#rice",
  },
  {
    id: "spices",
    title: "Spices",
    image: "/images/categories/spices.png",
    link: "#spices",
  },
  {
    id: "millet",
    title: "Millet",
    image: "/images/categories/millet.png",
    link: "#millet",
  },
  {
    id: "bread",
    title: "Bread",
    image: "/images/categories/bread.png",
    link: "#bread",
  },
  {
    id: "honey",
    title: "Honey",
    image: "/images/categories/honey.png",
    link: "#honey",
  },
];

interface HumpyCategorySectionProps {
  onSelectCategory?: (category: CategoryItem) => void;
}

export default function HumpyCategorySection({ onSelectCategory }: HumpyCategorySectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="categories" className="stories-insta-sec bg-[#ffffff] py-14 sm:py-18 relative border-b border-[#eeebe2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading matching Humpy Farms */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="primary-title text-2xl sm:text-3xl md:text-4xl font-bold text-[#003628] tracking-tight">
            Shop By Category
          </h2>
          <div className="mt-2.5 mx-auto w-16 h-[2px] bg-[#d89b4f] rounded-full" />
        </div>

        {/* Carousel Container with Left/Right Nav Arrows */}
        <div className="relative group">
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="custom-insta-arrow absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#003628] text-white shadow-lg flex items-center justify-center hover:bg-[#004e3a] transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="custom-insta-arrow absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#003628] text-white shadow-lg flex items-center justify-center hover:bg-[#004e3a] transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Horizontally Scrollable Story Row matching Humpy Farms */}
          <div
            ref={scrollContainerRef}
            className="stories-insta-row flex items-center gap-4 sm:gap-6 lg:gap-8 overflow-x-auto no-scrollbar scroll-smooth px-2 py-4"
          >
            {HUMPY_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                onClick={() => onSelectCategory && onSelectCategory(cat)}
                className="story-item flex flex-col items-center flex-shrink-0 cursor-pointer group/item select-none text-center"
              >
                {/* Circular Avatar Frame */}
                <div className="story-border p-[3px] rounded-full transition-transform duration-300 group-hover/item:scale-105">
                  <div className="story-avatar w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden bg-[#faf8f5] border-2 border-[#e6e0d3] group-hover/item:border-[#003628] shadow-sm group-hover/item:shadow-md transition-all flex items-center justify-center p-2">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover/item:scale-110"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Category Title matching Humpy Farms */}
                <span className="story-item-title mt-2.5 text-sm sm:text-base font-semibold text-[#1a2d1e] group-hover/item:text-[#003628] transition-colors tracking-tight">
                  {cat.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
