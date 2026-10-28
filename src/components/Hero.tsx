"use client";

import React from "react";

export default function Hero() {
  return (
    <section id="home" className="relative w-full h-[480px] sm:h-[560px] md:h-[620px] overflow-hidden">
      {/* Background Farm Image: Ultra-HD, pristine with zero baked-in text */}
      <div
        className="absolute inset-0 bg-cover bg-center sm:bg-[center_top] transition-transform duration-1000 hover:scale-105"
        style={{
          backgroundImage: "url('/images/hero-hd.jpg')",
        }}
      >
        {/* Soft atmospheric gradient overlay matching reference image lighting for contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
      </div>

      {/* Hero Content: Live HTML Typography */}
      <div className="relative max-w-7xl mx-auto h-full px-6 sm:px-10 lg:px-16 flex flex-col justify-center items-start text-white">
        <div className="max-w-2xl">
          {/* Main Title */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider uppercase text-white drop-shadow-lg leading-tight select-none">
            NANDI FARMS
          </h1>

          {/* Subtitle */}
          <p className="mt-2 sm:mt-3 text-lg sm:text-xl md:text-2xl font-light tracking-wide text-white/95 drop-shadow-md">
            Grown with care. Rooted in nature.
          </p>

          {/* Golden accent line matching the exact image */}
          <div className="mt-3.5 w-16 sm:w-24 h-[2.5px] bg-[#d89b4f] rounded-full shadow-sm" />
        </div>
      </div>
    </section>
  );
}
