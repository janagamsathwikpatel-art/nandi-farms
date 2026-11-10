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
      className="relative w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px] overflow-hidden bg-[#faf5ea]"
      aria-label="Explore the Harvest"
    >
      {/* 1. Exact 2nd Image Deployed Without Any Changes */}
      <Image
        src="/images/explore-harvest-master.jpg"
        alt="Farm Fresh Harvest Display"
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-cover object-[50%_60%] select-none pointer-events-none"
      />

      {/* 2. Scaled-up Interactive HTML CTA Button Outside Image File */}
      <div className="absolute right-6 sm:right-14 md:right-20 lg:right-28 top-[34%] sm:top-[36%] -translate-y-1/2 z-10 flex flex-col items-center text-center">
        {/* Botanical Leaf Accent */}
        <div className="flex items-center gap-2 mb-2 sm:mb-2.5 text-[#284a2d]">
          <span className="w-5 sm:w-7 h-[1.5px] bg-[#284a2d]/40" />
          <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-[#284a2d]" />
          <span className="w-5 sm:w-7 h-[1.5px] bg-[#284a2d]/40" />
        </div>

        {/* Functional Clickable Button */}
        <button
          type="button"
          onClick={handleExploreClick}
          className="group flex items-center gap-2 sm:gap-3 font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-[#1e3c23] hover:text-[#0b1c0e] transition-all cursor-pointer select-none drop-shadow-sm active:scale-95"
          aria-label="Explore the harvest catalog"
        >
          <span className="leading-tight">
            Explore<br className="inline" /> the harvest
          </span>
          {isVegetablesOpen ? (
            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 transition-transform duration-300 text-[#1e3c23] group-hover:text-[#0b1c0e] animate-bounce" />
          ) : (
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 transition-transform duration-300 group-hover:translate-x-2.5 text-[#1e3c23] group-hover:text-[#0b1c0e]" />
          )}
        </button>
      </div>
    </section>
  );
}
