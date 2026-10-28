"use client";

import React from "react";

interface VisitFarmProps {
  onOpenContact: () => void;
}

export default function VisitFarm({ onOpenContact }: VisitFarmProps) {
  return (
    <section id="visit" className="relative w-full h-[380px] sm:h-[450px] md:h-[520px] overflow-hidden">
      {/* Background Image cropped from the reference */}
      <div
        className="absolute inset-0 bg-cover bg-center sm:bg-[center_left]"
        style={{
          backgroundImage: "url('/images/visit-crop.jpg')",
        }}
      >
        {/* Subtle gradient to ensure left-side copy remains perfectly legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto h-full px-6 sm:px-10 lg:px-16 flex items-center">
        <div className="max-w-lg text-white">
          {/* Section Heading */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide text-white drop-shadow">
            Visit Nandi Farms
          </h2>

          {/* Golden accent underline */}
          <div className="mt-2.5 w-14 sm:w-16 h-[2px] bg-[#d89b4f] rounded-full" />

          {/* Description */}
          <p className="mt-4 text-sm sm:text-base md:text-lg text-white/90 leading-relaxed font-light drop-shadow">
            Walk the fields, meet our farmers and experience a simpler, greener way of life.
          </p>

          {/* Get in Touch CTA Button matching reference */}
          <div className="mt-6">
            <button
              onClick={onOpenContact}
              className="px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-[#b87a38] hover:bg-[#cb883f] text-white text-sm sm:text-base font-medium tracking-wide shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
