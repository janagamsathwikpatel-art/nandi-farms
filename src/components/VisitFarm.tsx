"use client";

import React from "react";

interface VisitFarmProps {
  onOpenContact: () => void;
}

export default function VisitFarm({ onOpenContact }: VisitFarmProps) {
  return (
    <section id="visit" className="relative w-full h-[400px] sm:h-[480px] md:h-[540px] overflow-hidden">
      {/* Background Image: Ultra-HD, pristine with zero baked-in text or buttons */}
      <div
        className="absolute inset-0 bg-cover bg-center sm:bg-[center_left] transition-transform duration-1000 hover:scale-105"
        style={{
          backgroundImage: "url('/images/visit-hd.jpg')",
        }}
      >
        {/* Cinematic gradient to ensure left-side copy remains crisp and readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
      </div>

      <div className="relative max-w-7xl mx-auto h-full px-6 sm:px-10 lg:px-16 flex items-center">
        <div className="max-w-lg text-white">
          {/* Section Heading */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-wide text-white drop-shadow-lg leading-tight select-none">
            Visit Nandi Farms
          </h2>

          {/* Golden accent underline matching reference */}
          <div className="mt-3 w-14 sm:w-16 h-[2.5px] bg-[#d89b4f] rounded-full shadow-sm" />

          {/* Description */}
          <p className="mt-4 text-sm sm:text-base md:text-lg text-white/95 leading-relaxed font-light drop-shadow-md">
            Walk the fields, meet our farmers and experience a simpler, greener way of life.
          </p>

          {/* Get in Touch CTA Button */}
          <div className="mt-7">
            <button
              onClick={onOpenContact}
              className="px-6 py-2.5 sm:px-8 sm:py-3 rounded-full bg-[#b87a38] hover:bg-[#cb883f] text-white text-sm sm:text-base font-semibold tracking-wide shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
