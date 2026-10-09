'use client';

import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

export interface TestimonialItem {
  id: string;
  author: string;
  content: string;
  rating: number;
}

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'test-1',
    author: 'ANBAJAGANE R.',
    content: 'Taste at optimum level ! I loved the taste ! It was neither too sweet nor flavourless ! Delightful blend of organic bilona ghee & coconut ! Every bite counted many nutritions !',
    rating: 5,
  },
  {
    id: 'test-2',
    author: 'ANANYA',
    content: 'Yummy! Love the organic bilona cow ghee. You get authentic grainy texture and rich golden aroma. Truly pure & delicious. Made our daily cooking so healthy.',
    rating: 5,
  },
  {
    id: 'test-3',
    author: 'SHRADHA RAJENDRRA.',
    content: 'Hello, I like your products. Cold pressed oils, bilona ghee, A2 milk etc.. I like it.. I enjoy your Original Organic Food.. awesome taste.. totally healthy food..',
    rating: 5,
  },
  {
    id: 'test-4',
    author: 'YUKTI S.',
    content: 'It is always wonderful ordering from Nandi Farms. They have a wonderful collection of organic oils, A2 ghee, and fresh produce. Kudos team for keeping stock always fresh.',
    rating: 5,
  },
  {
    id: 'test-5',
    author: 'PRIYA SHARMA',
    content: 'The cold wood pressed mustard oil is exceptionally authentic. Unprocessed, zero chemicals, and doorstep express delivery within 2 hours in Hyderabad!',
    rating: 5,
  },
];

export const CustomerReviews: React.FC = () => {
  const [startIndex, setStartIndex] = useState<number>(0);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  // Get 4 visible items wrapped around
  const visibleItems = Array.from({ length: 4 }).map((_, i) => {
    const idx = (startIndex + i) % TESTIMONIALS_DATA.length;
    return TESTIMONIALS_DATA[idx];
  });

  return (
    <section className="w-full max-w-none bg-[#f4efe1] py-12 sm:py-16 px-4 sm:px-8 lg:px-12 my-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Centered Section Header with Side Dividers (Matching Reference Screenshot) */}
        <div className="flex items-center justify-center mb-8 sm:mb-12">
          <div className="flex-1 max-w-[180px] sm:max-w-xs h-[1.5px] bg-[#9e8b74]/60"></div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#5c4a38] tracking-tight font-serif px-4 sm:px-8 whitespace-nowrap">
            Customer Testimonials
          </h2>
          <div className="flex-1 max-w-[180px] sm:max-w-xs h-[1.5px] bg-[#9e8b74]/60"></div>
        </div>

        {/* Testimonials Carousel Container */}
        <div className="relative group/carousel">
          {/* Navigation Left Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-xs border border-gray-400/60 shadow-md flex items-center justify-center text-gray-800 hover:bg-[#5c4a38] hover:text-white transition-all cursor-pointer hover:scale-110 active:scale-95"
            aria-label="Previous Testimonials"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* 4-Column Rectangular Testimonial Cards Grid (Matching Reference Screenshot) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch">
            {visibleItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#f7f3e8] border border-gray-700/70 rounded-xl p-5 sm:p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 min-h-[220px] sm:min-h-[240px]"
              >
                <div>
                  {/* 5 Gold Stars at Top Left */}
                  <div className="flex text-amber-500 space-x-1 mb-4">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Review Text Body */}
                  <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed font-sans">
                    {item.content}
                  </p>
                </div>

                {/* Bold Uppercase Author Name at Bottom Left */}
                <div className="pt-4 mt-4 border-t border-gray-300/40">
                  <h4 className="text-xs font-black text-gray-950 uppercase tracking-wider font-sans">
                    {item.author}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Right Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-xs border border-gray-400/60 shadow-md flex items-center justify-center text-gray-800 hover:bg-[#5c4a38] hover:text-white transition-all cursor-pointer hover:scale-110 active:scale-95"
            aria-label="Next Testimonials"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

      </div>
    </section>
  );
};
