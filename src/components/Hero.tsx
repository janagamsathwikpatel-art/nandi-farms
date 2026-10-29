"use client";

import React, { useState } from "react";
import MilkSubscriptionModal from "./MilkSubscriptionModal";
import { ArrowRight, ShoppingBag, Milk } from "lucide-react";

export default function Hero() {
  const [isMilkModalOpen, setIsMilkModalOpen] = useState(false);

  const scrollToCategories = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("categories");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative w-full bg-[#0a1810] overflow-hidden select-none">
      {/* Container maintaining exact aspect ratio of the provided hero artwork (1024 x 782) */}
      <div className="relative w-full max-w-[1440px] mx-auto">
        <div className="relative w-full aspect-[1024/782] overflow-hidden shadow-2xl">
          {/* Exact, pristine photographic artwork as provided - 100% untouched */}
          <img
            src="/images/hero-soil.jpg"
            alt="Every day begins in the soil - Fresh harvest & pure milk"
            className="w-full h-full object-cover object-center pointer-events-none"
            loading="eager"
            fetchPriority="high"
          />

          {/* Interactive Click Hotspot: 'Shop harvest ->' Button */}
          {/* Exact coordinates: left: 81.7%, top: 20.7%, width: 14.8%, height: 5.4% */}
          <a
            href="#categories"
            onClick={scrollToCategories}
            title="Shop our fresh farm harvest"
            aria-label="Shop harvest"
            className="absolute z-20 rounded-full transition-all duration-200 cursor-pointer hover:ring-2 hover:ring-emerald-400/80 hover:bg-emerald-500/10 active:scale-95 group"
            style={{
              left: "81.6%",
              top: "20.6%",
              width: "14.9%",
              height: "5.5%",
            }}
          >
            {/* Subtle invisible glow effect on hover */}
            <span className="sr-only">Shop harvest</span>
          </a>

          {/* Interactive Click Hotspot: 'Milk subscription ->' Link */}
          {/* Exact coordinates: left: 82.2%, top: 29.8%, width: 13.5%, height: 3.5% */}
          <button
            type="button"
            onClick={() => setIsMilkModalOpen(true)}
            title="Subscribe to daily fresh milk delivery"
            aria-label="Milk subscription"
            className="absolute z-20 rounded-md transition-all duration-200 cursor-pointer hover:ring-2 hover:ring-white/60 hover:bg-white/10 active:scale-95"
            style={{
              left: "82.0%",
              top: "29.6%",
              width: "13.8%",
              height: "3.8%",
            }}
          >
            <span className="sr-only">Milk subscription</span>
          </button>

          {/* Interactive Click Hotspot: 'Scroll to follow the harvest' */}
          {/* Exact coordinates: left: 5.2%, top: 74.0%, width: 9.5%, height: 9.5% */}
          <a
            href="#categories"
            onClick={scrollToCategories}
            title="Scroll to follow the harvest"
            aria-label="Scroll to follow the harvest"
            className="absolute z-20 rounded-md transition-all duration-200 cursor-pointer hover:bg-white/10 hover:ring-1 hover:ring-white/40"
            style={{
              left: "5.0%",
              top: "73.5%",
              width: "10.0%",
              height: "10.0%",
            }}
          >
            <span className="sr-only">Scroll to follow the harvest</span>
          </a>
        </div>

        {/* Mobile Quick Action Buttons Bar: Ensures 100% thumb accessibility on mobile devices */}
        <div className="sm:hidden bg-[#0d2116] border-t border-b border-[#1c3827] px-4 py-3 flex items-center justify-between gap-2.5">
          <a
            href="#categories"
            onClick={scrollToCategories}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full border border-emerald-400/80 bg-[#0c2e1b] text-white text-xs font-semibold shadow active:scale-95 transition-all"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
            <span>Shop Harvest</span>
            <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
          </a>

          <button
            type="button"
            onClick={() => setIsMilkModalOpen(true)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full border border-white/20 bg-white/10 text-white text-xs font-semibold hover:bg-white/15 active:scale-95 transition-all cursor-pointer"
          >
            <Milk className="w-3.5 h-3.5 text-amber-200" />
            <span>Milk Subscription</span>
            <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>
      </div>

      {/* Milk Subscription Modal Dialog */}
      <MilkSubscriptionModal
        isOpen={isMilkModalOpen}
        onClose={() => setIsMilkModalOpen(false)}
      />
    </section>
  );
}
