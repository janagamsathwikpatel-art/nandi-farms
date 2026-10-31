"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Leaf } from "lucide-react";

export default function ExperienceFarm() {
  const scrollToHarvest = () => {
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
      className="relative w-full h-[380px] sm:h-[460px] md:h-[540px] lg:h-[620px] overflow-hidden bg-[#f1e6d4]"
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
        className="object-cover object-center select-none pointer-events-none"
      />

      {/* 2. Scaled-up Interactive HTML CTA Button Outside Image File */}
      <div className="absolute right-6 sm:right-14 md:right-20 lg:right-28 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center text-center">
        {/* Botanical Leaf Accent */}
        <div className="flex items-center gap-2 mb-2 sm:mb-3 text-[#284a2d]">
          <span className="w-5 sm:w-8 h-[1.5px] bg-[#284a2d]/40" />
          <Leaf className="w-4 h-4 sm:w-6 sm:h-6 text-[#284a2d]" />
          <span className="w-5 sm:w-8 h-[1.5px] bg-[#284a2d]/40" />
        </div>

        {/* Functional Clickable Button */}
        <button
          type="button"
          onClick={scrollToHarvest}
          className="group flex items-center gap-2 sm:gap-3.5 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-[#1e3c23] hover:text-[#0b1c0e] transition-all cursor-pointer select-none drop-shadow-sm"
          aria-label="Explore the harvest catalog"
        >
          <span className="leading-tight">
            Explore<br className="inline" /> the harvest
          </span>
          <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 transition-transform duration-300 group-hover:translate-x-3 text-[#1e3c23] group-hover:text-[#0b1c0e]" />
        </button>
      </div>
    </section>
  );
}
