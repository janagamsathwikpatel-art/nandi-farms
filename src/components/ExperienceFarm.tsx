"use client";

import React from "react";

interface ExperienceFarmProps {
  onExploreVegetables?: () => void;
  isVegetablesOpen?: boolean;
}

export default function ExperienceFarm({
  onExploreVegetables,
  isVegetablesOpen = false,
}: ExperienceFarmProps) {
  const handleExploreClick = () => {
    if (onExploreVegetables) {
      onExploreVegetables();
      if (!isVegetablesOpen) {
        setTimeout(() => {
          const target = document.getElementById("farm-vegetables-shelf");
          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      }
      return;
    }

    const target =
      document.getElementById("category-fresh-page") ||
      document.getElementById("categories");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="explore-harvest"
      className="relative w-full aspect-[2172/724] overflow-hidden bg-[#faf5ea]"
      aria-label="Explore the Harvest"
    >
      {/* 4K Panoramic Master Banner with Multi-Tier Responsive srcset */}
      <picture>
        <source
          type="image/webp"
          srcSet="
            /images/explore-harvest/explore-harvest-2172.webp 2172w,
            /images/explore-harvest/explore-harvest-1920.webp 1920w,
            /images/explore-harvest/explore-harvest-1440.webp 1440w,
            /images/explore-harvest/explore-harvest-1024.webp 1024w,
            /images/explore-harvest/explore-harvest-640.webp 640w
          "
          sizes="100vw"
        />
        <img
          src="/explore-harvest.png"
          srcSet="
            /images/explore-harvest/explore-harvest-2172.png 2172w,
            /images/explore-harvest/explore-harvest-1920.png 1920w,
            /images/explore-harvest/explore-harvest-1440.png 1440w,
            /images/explore-harvest/explore-harvest-1024.png 1024w,
            /images/explore-harvest/explore-harvest-640.png 640w
          "
          sizes="100vw"
          alt="Explore the Harvest - Fresh Organic Vegetables and Produce from Nandi Farms"
          width={2172}
          height={724}
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover select-none pointer-events-none"
        />
      </picture>

      {/* Live HTML/Tailwind Typography & Interactive Button Designed Outside Image */}
      <div className="absolute top-[34%] left-[4.8%] flex flex-col items-start justify-center z-20 select-none max-w-[48%] pointer-events-auto">
        <h2 className="font-playfair text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[66px] text-[#16301d] font-normal leading-[1.06] tracking-tight">
          Explore the<br />Harvest
        </h2>

        <button
          type="button"
          onClick={handleExploreClick}
          className="mt-2.5 sm:mt-4 md:mt-5 lg:mt-6 inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-6 lg:px-8 py-1.5 sm:py-2.5 lg:py-3.5 bg-[#16301d] hover:bg-[#1f4228] active:scale-95 text-white rounded-full font-sans font-medium text-xs sm:text-sm md:text-base transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#16301d]/50 group cursor-pointer"
          aria-label="Shop the Harvest catalog"
        >
          <span>Shop the Harvest</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1 font-sans">
            →
          </span>
        </button>
      </div>
    </section>
  );
}
