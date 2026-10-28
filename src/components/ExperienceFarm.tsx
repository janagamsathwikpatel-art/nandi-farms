"use client";

import React from "react";

export default function ExperienceFarm() {
  const galleryItems = [
    {
      id: 1,
      image: "/images/exp-card-1.jpg",
      title: "Sunrise Field Swing",
      description: "Serene mornings overlooking mist-covered organic fields.",
    },
    {
      id: 2,
      image: "/images/exp-card-2.jpg",
      title: "Banana Grove Trail",
      description: "Nature walks through indigenous plantations and forest flora.",
    },
    {
      id: 3,
      image: "/images/exp-card-3.jpg",
      title: "Hands-on Harvest",
      description: "Harvesting fresh organic greens directly with our farmers.",
    },
    {
      id: 4,
      image: "/images/exp-card-4.jpg",
      title: "Farmstead Gazebo Dining",
      description: "Wholesome, slow-cooked farm-to-table communal meals.",
    },
  ];

  const testimonials = [
    {
      id: 1,
      avatar: "/images/avatar-1.jpg",
      quote: "Food that tastes better because it does good.",
      author: "Ananya Sharma",
      role: "Farm Member & Parent",
    },
    {
      id: 2,
      avatar: "/images/avatar-2.jpg",
      quote: "A farm that truly cares for people and the planet.",
      author: "Dr. K. Narayanan",
      role: "Soil Ecologist",
    },
    {
      id: 3,
      avatar: "/images/avatar-3.jpg",
      quote: "A place where nature, community and good food come together.",
      author: "Pooja Hegde",
      role: "Weekend Visitor",
    },
  ];

  return (
    <section id="our-story" className="relative bg-[#ffffff] py-16 sm:py-20 overflow-hidden">
      {/* Botanical Leaf Art Watermark on Left Edge (matching reference image) */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-20 hidden lg:block -translate-x-12">
        <svg width="220" height="420" viewBox="0 0 200 400" fill="none" stroke="#255030" strokeWidth="1.5">
          <path d="M10 200 C 60 140, 140 160, 180 80 C 130 90, 80 120, 10 200 Z" />
          <path d="M10 200 C 50 170, 100 150, 150 120" />
          <path d="M10 200 C 70 240, 150 220, 190 310 C 140 290, 70 270, 10 200 Z" />
          <path d="M10 200 C 60 220, 110 250, 160 280" />
          <path d="M10 200 Q 110 195, 195 190" strokeDasharray="3 3" />
        </svg>
      </div>

      {/* Botanical Leaf Art Watermark on Right Edge (matching reference image) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-20 hidden lg:block translate-x-12">
        <svg width="220" height="420" viewBox="0 0 200 400" fill="none" stroke="#255030" strokeWidth="1.5">
          <path d="M190 200 C 140 140, 60 160, 20 80 C 70 90, 120 120, 190 200 Z" />
          <path d="M190 200 C 150 170, 100 150, 50 120" />
          <path d="M190 200 C 130 240, 50 220, 10 310 C 60 290, 130 270, 190 200 Z" />
          <path d="M190 200 C 140 220, 90 250, 40 280" />
          <path d="M190 200 Q 90 195, 5 190" strokeDasharray="3 3" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading matching exact image */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#183420] tracking-tight">
            Come Experience the Farm
          </h2>
          {/* Golden accent underline */}
          <div className="mt-3.5 mx-auto w-16 sm:w-20 h-[2.5px] bg-[#d89b4f] rounded-full" />
        </div>

        {/* 4 Photo Cards Grid matching exact reference */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5 mb-14 sm:mb-16">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-[#1a3321]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <p className="text-white text-xs sm:text-sm font-medium leading-tight">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 3 Testimonials Row matching exact reference layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8 max-w-5xl mx-auto">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-[#f7f5ed] border border-[#e8e2d4] rounded-2xl p-6 sm:p-7 flex items-center gap-4 sm:gap-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
            >
              {/* Circular Avatar */}
              <div className="flex-shrink-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[#d89b4f]/70 shadow">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Quote Content */}
              <div className="flex-1">
                {/* Golden quote mark */}
                <span className="font-serif text-[#b87a38] text-2xl sm:text-3xl font-bold leading-none block -mb-1">
                  “
                </span>
                <p className="font-serif italic text-[#253928] text-sm sm:text-base leading-snug">
                  {t.quote}
                </p>
                {/* Golden underline */}
                <div className="mt-2.5 w-8 h-[2px] bg-[#d89b4f] rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
