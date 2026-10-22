'use client';

import React from 'react';
import { Leaf } from 'lucide-react';

interface FooterProps {
  onSelectCategory?: (categoryName: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const handleScrollToProducts = () => {
    const el =
      document.getElementById('todays-picks') ||
      document.getElementById('weekly-best-selling') ||
      document.getElementById('categories');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (catName: string) => {
    if (onSelectCategory) {
      onSelectCategory(catName);
    }
    handleScrollToProducts();
  };

  return (
    <footer id="about" className="w-full bg-[#f4f7ef] relative overflow-hidden font-sans border-t border-[#dce5d8] select-none">
      
      {/* Ultra-HD Pastoral Farm Landscape Background Artwork (Fades seamlessly from right) */}
      <div className="absolute inset-y-0 right-0 w-full md:w-3/4 lg:w-2/3 pointer-events-none select-none overflow-hidden z-0">
        <img
          src="/footer-farm-landscape-hd.jpg"
          alt=""
          className="w-full h-full object-cover object-right opacity-80 sm:opacity-90 lg:opacity-100 transform-gpu"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 20%, black 50%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 20%, black 50%)',
          }}
          loading="eager"
        />
      </div>

      {/* Main Responsive Content Container */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-12 pb-10 sm:pt-16 sm:pb-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Brand, Headline, Tagline & CTA Button (Spans 6 cols on large screens) */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-4 max-w-lg">
            
            {/* Brand Logo & Name */}
            <div 
              onClick={handleScrollToProducts}
              className="inline-flex items-center space-x-2.5 cursor-pointer group"
              title="Nandi Farms"
            >
              <div className="w-8 h-8 rounded-full bg-[#1c382b] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <Leaf className="w-4 h-4 fill-emerald-100 text-[#1c382b]" />
              </div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.2em] text-[#1c382b] uppercase">
                NANDI FARMS
              </span>
            </div>

            {/* Main Editorial Headline */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1c382b] tracking-tight leading-[1.15] pt-1">
              Freshness, naturally.
            </h2>

            {/* Subtitle / Tagline */}
            <p className="text-sm sm:text-base text-[#4a584c] font-normal leading-relaxed pb-2">
              Milk, fruits &amp; vegetables for everyday living.
            </p>

            {/* CTA Pill Button */}
            <button
              type="button"
              onClick={handleScrollToProducts}
              className="inline-flex items-center space-x-2.5 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full border border-[#3b5440] text-[#1c382b] bg-white/60 hover:bg-[#1c382b] hover:text-white backdrop-blur-xs text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-200 shadow-2xs hover:shadow-md cursor-pointer group active:scale-98"
            >
              <span>EXPLORE OUR PRODUCTS</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </button>

          </div>

          {/* Navigation Links Columns (Spans 6 cols on large screens) */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-2 gap-8 sm:gap-12 pt-2 max-w-sm">
            
            {/* 1. EXPLORE Column */}
            <div>
              <h3 className="font-bold text-xs tracking-[0.18em] text-[#1c382b] uppercase mb-4 pb-1 inline-block border-b-2 border-[#1c382b]">
                EXPLORE
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <button
                    type="button"
                    onClick={handleScrollToProducts}
                    className="text-[#3b4c3e] hover:text-[#1c382b] hover:translate-x-1 font-medium transition-all inline-block text-left"
                  >
                    Shop All
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleCategoryClick('Dairy')}
                    className="text-[#3b4c3e] hover:text-[#1c382b] hover:translate-x-1 font-medium transition-all inline-block text-left"
                  >
                    Milk
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleCategoryClick('Fresh Vegetables')}
                    className="text-[#3b4c3e] hover:text-[#1c382b] hover:translate-x-1 font-medium transition-all inline-block text-left"
                  >
                    Vegetables
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleCategoryClick('Fruits')}
                    className="text-[#3b4c3e] hover:text-[#1c382b] hover:translate-x-1 font-medium transition-all inline-block text-left"
                  >
                    Fruits
                  </button>
                </li>
              </ul>
            </div>

            {/* 2. CONNECT Column */}
            <div>
              <h3 className="font-bold text-xs tracking-[0.18em] text-[#1c382b] uppercase mb-4 pb-1 inline-block border-b-2 border-[#1c382b]">
                CONNECT
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <button
                    type="button"
                    onClick={handleScrollToProducts}
                    className="text-[#3b4c3e] hover:text-[#1c382b] hover:translate-x-1 font-medium transition-all inline-block text-left"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <a
                    href="mailto:support@nandifarms.com"
                    className="text-[#3b4c3e] hover:text-[#1c382b] hover:translate-x-1 font-medium transition-all inline-block text-left"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={handleScrollToProducts}
                    className="text-[#3b4c3e] hover:text-[#1c382b] hover:translate-x-1 font-medium transition-all inline-block text-left"
                  >
                    FAQs
                  </button>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="border-t border-[#d8e2d4] bg-[#f0f4ea]/70 relative z-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] sm:text-xs text-[#526354] font-medium">
          <div>
            &copy; {new Date().getFullYear()} NANDI FARMS. All rights reserved.
          </div>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-[#1c382b] hover:underline transition-colors"
            >
              Privacy Policy
            </button>
            <span>&middot;</span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-[#1c382b] hover:underline transition-colors"
            >
              Terms &amp; Conditions
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
};
