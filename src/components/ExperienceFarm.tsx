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
      className="relative w-full py-10 sm:py-14 md:py-18 bg-[#ffffff] overflow-hidden"
      aria-label="Explore the Harvest"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-[#e8dfcf] bg-[#f7f3eb]">
          {/* Clean 2K HD Panoramic Banner Plate (Text-free background) */}
          <div className="relative w-full aspect-[2048/456] min-h-[160px] sm:min-h-[220px] md:min-h-[270px]">
            <Image
              src="/images/explore-harvest-banner-clean-2k.png"
              alt="Farm Fresh Harvest Display"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-left md:object-center select-none pointer-events-none"
            />

            {/* Independent, Interactive HTML CTA Button Outside Image File */}
            <div className="absolute right-4 sm:right-10 md:right-16 lg:right-24 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center text-center">
              {/* Botanical Leaf Accent */}
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2 text-[#284a2d]">
                <span className="w-3 sm:w-6 h-[1.5px] bg-[#284a2d]/40" />
                <Leaf className="w-3 h-3 sm:w-5 sm:h-5 text-[#284a2d]" />
                <span className="w-3 sm:w-6 h-[1.5px] bg-[#284a2d]/40" />
              </div>

              {/* Functional Clickable Button */}
              <button
                type="button"
                onClick={scrollToHarvest}
                className="group flex items-center gap-1.5 sm:gap-2.5 font-serif text-base sm:text-2xl md:text-3xl lg:text-4xl font-medium text-[#1e3c23] hover:text-[#0e2112] transition-all cursor-pointer select-none"
                aria-label="Explore the harvest catalog"
              >
                <span className="leading-tight">
                  Explore<br className="inline" /> the harvest
                </span>
                <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 transition-transform duration-300 group-hover:translate-x-2 text-[#1e3c23] group-hover:text-[#0e2112]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
