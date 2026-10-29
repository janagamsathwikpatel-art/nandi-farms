"use client";

import React from "react";

export default function HarvestCategoryGrid() {
  return (
    <section id="categories" className="relative w-full bg-[#f6f2e8] py-10 sm:py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Grid Image Container preserving 100% original fidelity */}
        <div className="w-full overflow-hidden rounded-2xl shadow-sm border border-[#e5decb]/80 bg-[#f6f2e8] transition-shadow duration-300 hover:shadow-md">
          <img
            src="/images/category-grid.jpg"
            alt="Farm Harvest Categories: Milk, Vegetables, Fruits, Grains & Pulses, Oils & Ghee, Spices, Dairy Products, Leafy Greens, Healthy Snacks"
            className="w-full h-auto object-contain block"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
