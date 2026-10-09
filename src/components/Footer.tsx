'use client';

import React from 'react';
import { ArrowRight, Leaf } from 'lucide-react';

export const Footer: React.FC = () => {
  const handleScrollToProducts = () => {
    const el = document.getElementById('todays-picks') || document.getElementById('weekly-best-selling');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#f2f6eb] text-[#203b29] font-sans relative overflow-hidden pt-10 sm:pt-14 pb-6 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center pb-10 sm:pb-14">
          
          {/* LEFT SECTION: Logo & Quick Navigation Columns */}
          <div className="lg:col-span-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 lg:gap-8 pr-0 lg:pr-6 border-b lg:border-b-0 lg:border-r border-[#d2dec6] pb-8 lg:pb-0">
            
            {/* Branding Logo Block */}
            <div className="flex flex-col items-start space-y-1 pr-4">
              {/* Leaves Icon */}
              <div className="flex items-center space-x-1 text-[#4a6b53] mb-1">
                <Leaf className="w-5 h-5 fill-[#63876d] transform -rotate-12" />
                <Leaf className="w-4 h-4 fill-[#7c9e86] transform rotate-45 -translate-x-1" />
              </div>
              <h3 className="text-3xl font-black tracking-widest font-serif text-[#1e3827]">
                NANDHI
              </h3>
              <div className="flex items-center space-x-2 text-[10px] font-black tracking-[0.35em] text-[#42614b] uppercase">
                <span className="w-4 h-[1px] bg-[#42614b]" />
                <span>FARMS</span>
                <span className="w-4 h-[1px] bg-[#42614b]" />
              </div>
            </div>

            {/* Vertical Separator */}
            <div className="hidden sm:block w-[1.5px] h-28 bg-[#d2dec6]" />

            {/* EXPLORE Column */}
            <div className="space-y-2 min-w-[100px]">
              <div className="space-y-1">
                <h4 className="text-xs font-black tracking-widest uppercase text-[#35533c]">
                  EXPLORE
                </h4>
                <div className="w-5 h-[2.5px] bg-[#5a7c62] rounded-full" />
              </div>
              <ul className="space-y-1.5 text-xs font-semibold text-[#4e6754]">
                <li>
                  <button onClick={handleScrollToProducts} className="hover:text-[#1e3827] transition-colors cursor-pointer">
                    Shop All
                  </button>
                </li>
                <li>
                  <button onClick={handleScrollToProducts} className="hover:text-[#1e3827] transition-colors cursor-pointer">
                    Milk
                  </button>
                </li>
                <li>
                  <button onClick={handleScrollToProducts} className="hover:text-[#1e3827] transition-colors cursor-pointer">
                    Vegetables
                  </button>
                </li>
                <li>
                  <button onClick={handleScrollToProducts} className="hover:text-[#1e3827] transition-colors cursor-pointer">
                    Fruits
                  </button>
                </li>
              </ul>
            </div>

            {/* Vertical Separator */}
            <div className="hidden sm:block w-[1.5px] h-28 bg-[#d2dec6]" />

            {/* CONNECT Column */}
            <div className="space-y-2 min-w-[100px]">
              <div className="space-y-1">
                <h4 className="text-xs font-black tracking-widest uppercase text-[#35533c]">
                  CONNECT
                </h4>
                <div className="w-5 h-[2.5px] bg-[#5a7c62] rounded-full" />
              </div>
              <ul className="space-y-1.5 text-xs font-semibold text-[#4e6754]">
                <li>
                  <a href="#about" className="hover:text-[#1e3827] transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="mailto:support@nandifarms.com" className="hover:text-[#1e3827] transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-[#1e3827] transition-colors">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>

            {/* Right-most Vertical Separator */}
            <div className="hidden lg:block w-[1.5px] h-28 bg-[#d2dec6]" />
          </div>

          {/* MIDDLE SECTION: Hero Tagline & Interactive Button */}
          <div className="lg:col-span-6 relative flex flex-col justify-center items-start pl-0 lg:pl-4">
            {/* Organic Curved Backdrop Shape */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full lg:w-[115%] h-[130%] pointer-events-none opacity-40 overflow-hidden hidden sm:block">
              <svg viewBox="0 0 500 300" fill="none" className="w-full h-full text-[#c8d8bb]">
                <path d="M 150 0 C 80 100, 100 200, 500 300 L 500 0 Z" fill="currentColor" opacity="0.35" />
              </svg>
            </div>

            {/* Tagline Content */}
            <div className="relative z-10 max-w-md">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal font-serif text-[#1e3827] leading-[1.08] tracking-tight">
                Freshness,<br />naturally.
              </h2>
              <p className="text-xs sm:text-sm text-[#4e6754] font-medium mt-3 leading-relaxed">
                Milk, fruits &amp; vegetables for everyday living.
              </p>

              <button
                type="button"
                onClick={handleScrollToProducts}
                className="mt-6 border border-[#2a4733] text-[#1e3827] rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#1e3827] hover:text-white transition-all cursor-pointer inline-flex items-center space-x-2 group shadow-xs"
              >
                <span>EXPLORE OUR PRODUCTS</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Farm Illustration Sketch Artwork Overlay */}
            <div className="absolute right-0 bottom-0 w-64 sm:w-80 lg:w-96 opacity-85 pointer-events-none hidden md:block transform translate-x-4 translate-y-4">
              <svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#4a6b53]/40">
                {/* Barn House Outline */}
                <path d="M120 100 L170 60 L220 100 L220 160 L120 160 Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M120 100 L220 100" stroke="currentColor" strokeWidth="1.5" />
                <rect x="150" y="120" width="30" height="40" stroke="currentColor" strokeWidth="1.5" />
                
                {/* Fruit Tree Outline */}
                <path d="M250 160 C250 120, 240 100, 250 80 C230 70, 220 40, 250 30 C270 20, 290 50, 280 80 C290 100, 280 140, 280 160" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="240" cy="50" r="4" fill="currentColor" opacity="0.6" />
                <circle cx="265" cy="40" r="4" fill="currentColor" opacity="0.6" />
                <circle cx="255" cy="65" r="4" fill="currentColor" opacity="0.6" />

                {/* Grazing Cow & Milk Can Sketch */}
                <path d="M50 150 C40 140, 60 120, 80 130 C90 120, 100 130, 95 150 Z" stroke="currentColor" strokeWidth="1.5" />
                <rect x="100" y="140" width="12" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
                
                {/* Crop Field Rows */}
                <path d="M10 180 C80 170, 180 170, 290 180" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M20 190 C90 182, 190 182, 280 190" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
              </svg>
            </div>
          </div>

        </div>

        {/* BOTTOM LEGAL & COPYRIGHT BAR */}
        <div className="pt-6 border-t border-[#d2dec6] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#526a57] font-medium">
          <p>© 2026 NANDHI FARMS. All rights reserved.</p>
          <div className="flex items-center space-x-3">
            <a href="#privacy" className="hover:text-[#1e3827] transition-colors">
              Privacy Policy
            </a>
            <span>·</span>
            <a href="#terms" className="hover:text-[#1e3827] transition-colors">
              Terms &amp; Conditions
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
