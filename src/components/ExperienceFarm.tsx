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

      {/* Accessible Interactive Target over 'Shop the Harvest' Pill Button */}
      <button
        type="button"
        onClick={handleExploreClick}
        className="group absolute top-[62%] left-[4.5%] w-[25.5%] h-[25%] z-20 cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-[#16301d]"
        aria-label="Shop the Harvest catalog"
      >
        <span className="sr-only">Shop the Harvest</span>
      </button>

      {/* Broad Click Target over Left Content Area */}
      <div
        onClick={handleExploreClick}
        className="absolute top-0 left-0 w-[40%] h-full z-10 cursor-pointer"
        aria-hidden="true"
      />
    </section>
  );
}
