"use client";

import React from "react";

export default function Footer() {
  return (
    <footer id="practices" className="w-full bg-[#162e1e] text-[#e0e8de] border-t border-[#204229] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
          {/* Left: Brand + Divider */}
          <div className="flex items-center gap-4">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-[0.16em] text-white uppercase">
              NANDI FARMS
            </span>
            <div className="h-5 w-[1px] bg-[#3a5d43] hidden sm:block" />
          </div>

          {/* Center: Navigation Links matching exact image */}
          <nav className="flex flex-wrap items-center justify-center gap-5 sm:gap-7 text-xs sm:text-sm font-medium text-[#c4d4c3]">
            <a href="#home" className="hover:text-white transition-colors">
              Home
            </a>
            <a href="#our-story" className="hover:text-white transition-colors">
              Our Story
            </a>
            <a href="#harvest-store" className="hover:text-white transition-colors">
              What We Grow
            </a>
            <a href="#practices" className="hover:text-white transition-colors">
              Our Practices
            </a>
            <a href="#visit" className="hover:text-white transition-colors">
              Visit
            </a>
          </nav>

          {/* Right: Social Media Icons + Botanical Leaf Motif */}
          <div className="flex items-center gap-3.5">
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full border border-[#305338] flex items-center justify-center text-[#c4d4c3] hover:text-white hover:border-[#d89b4f] hover:bg-[#1f3f29] transition-all"
            >
              <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full border border-[#305338] flex items-center justify-center text-[#c4d4c3] hover:text-white hover:border-[#d89b4f] hover:bg-[#1f3f29] transition-all"
            >
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-8 h-8 rounded-full border border-[#305338] flex items-center justify-center text-[#c4d4c3] hover:text-white hover:border-[#d89b4f] hover:bg-[#1f3f29] transition-all"
            >
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z"/>
              </svg>
            </a>

            {/* Botanical Leaf Mark */}
            <div className="pl-1 text-[#d89b4f]" title="Nandi Organic Mark">
              <svg
                className="w-6 h-6 transform rotate-45"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="mt-8 pt-6 border-t border-[#1e3b26] text-center text-xs text-[#7d9380]">
          © 2026 Nandi Farms. All rights reserved. Cultivated with organic regenerative practices.
        </div>
      </div>
    </footer>
  );
}
