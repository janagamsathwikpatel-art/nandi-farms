"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Leaf, ChevronDown } from "lucide-react";

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
      className="relative w-full h-[260px] sm:h-[340px] md:h-[420px] lg:h-[480px] overflow-hidden bg-[#faf5ea]"
      aria-label="Explore the Harvest"
    >
      {/* 1. High-Res Clean Background Plate */}
      <Image
        src="/images/explore_harvest_sage_clean.jpg"
        alt="Farm Fresh Harvest Display"
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-cover object-center select-none pointer-events-none"
      />

      {/* 2. Crisp Live HTML Typography & Interactive Button Outside Image */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 select-none">
        {/* Kicker */}
        <span className="text-[11px] sm:text-xs md:text-sm lg:text-base font-extrabold tracking-[0.26em] text-[#1e3c23] uppercase drop-shadow-sm">
          Y DAILY FARMS
        </span>

        {/* Main Serif Headline */}
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[68px] xl:text-[76px] font-normal text-[#16301d] tracking-tight leading-[1.08] mt-1.5 sm:mt-2.5 md:mt-3 drop-shadow-sm">
          Explore the Harvest
        </h2>

        {/* Functional Clickable Pill Button */}
        <button
          type="button"
          onClick={handleExploreClick}
          className="group mt-3 sm:mt-5 md:mt-6 px-6 sm:px-8 md:px-10 py-2.5 sm:py-3.5 bg-[#16301d] hover:bg-[#1f422b] text-white font-medium text-xs sm:text-sm md:text-base lg:text-lg rounded-full transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-2 sm:gap-2.5 cursor-pointer"
          aria-label="Shop the Harvest catalog"
        >
          <span>Shop the Harvest</span>
          {isVegetablesOpen ? (
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 text-white animate-bounce" />
          ) : (
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1.5 text-white" />
          )}
        </button>
      </div>
    </section>
  );
}
