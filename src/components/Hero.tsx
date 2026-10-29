"use client";

import React, { useState } from "react";
import MilkSubscriptionModal from "./MilkSubscriptionModal";
import { ArrowRight, MapPin, ChevronDown, Menu, X } from "lucide-react";

export default function Hero() {
  const [isMilkModalOpen, setIsMilkModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Hyderabad");
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cities = ["Hyderabad", "Bengaluru", "Mumbai", "Delhi NCR", "Pune"];

  const scrollToCategories = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("categories");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <section id="home" className="relative w-full min-h-[640px] md:min-h-[720px] lg:min-h-[780px] bg-[#0d1811] text-white overflow-hidden flex flex-col justify-between">
      {/* Pristine 4K HD Text-Free Photographic Backdrop */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-soil-inpainted-hd.jpg"
          alt="Organic farm harvest - dark rich soil, vine tomatoes and fresh milk"
          className="w-full h-full object-cover object-center sm:object-[center_top] pointer-events-none scale-100 transition-transform duration-1000 ease-out"
          loading="eager"
          fetchPriority="high"
        />
        {/* Soft atmospheric radial vignettes to enhance text contrast and visual depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a150e] via-transparent to-black/50" />
      </div>

      {/* 1. Top Integrated Navigation Bar (Pure Live Code) */}
      <header className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        {/* Brand Logo & Sprout Icon */}
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, "home")}
          className="flex items-center gap-2 group cursor-pointer select-none"
        >
          {/* Organic double leaf sprout SVG */}
          <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all">
            <svg
              className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C7.5 2 4 5.5 4 10c0 4.5 3.5 8 8 8 1.5 0 2.9-.4 4.1-1.1L20 20l-1.9-3.9C19.1 14.9 20 13.5 20 12c0-5.5-4.5-10-8-10zm-1 14.9c-3.3 0-6-2.7-6-6 0-3.3 2.7-6 6-6s6 2.7 6 6c0 1.2-.4 2.3-1 3.2L11 16.9z" />
              <path d="M13 7c-2.2 0-4 1.8-4 4h2c0-1.1.9-2 2-2V7z" />
            </svg>
          </div>
          <span className="font-sans font-extrabold text-base sm:text-lg tracking-wider text-white">
            Y DAILY
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-[#d8dfd9]">
          <a
            href="#categories"
            onClick={scrollToCategories}
            className="hover:text-emerald-300 transition-colors"
          >
            OUR FOOD
          </a>
          <a
            href="#experience"
            onClick={(e) => scrollToSection(e, "experience")}
            className="hover:text-emerald-300 transition-colors"
          >
            OUR FARMS
          </a>
          <button
            onClick={() => setIsMilkModalOpen(true)}
            className="hover:text-emerald-300 transition-colors cursor-pointer uppercase font-semibold text-xs tracking-widest"
          >
            SUBSCRIPTIONS
          </button>
          <a
            href="#visit"
            onClick={(e) => scrollToSection(e, "visit")}
            className="hover:text-emerald-300 transition-colors"
          >
            OUR STORY
          </a>
        </nav>

        {/* Right Location Dropdown & Mobile Menu Trigger */}
        <div className="flex items-center gap-4">
          {/* Location Badge */}
          <div className="relative">
            <button
              onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/15 text-xs text-white/90 hover:text-white hover:bg-black/40 transition-all cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-medium">{selectedCity}</span>
              <ChevronDown className="w-3 h-3 text-white/70" />
            </button>

            {/* City Dropdown Menu */}
            {isCityDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-[#0d2116] border border-[#23452f] rounded-xl shadow-2xl py-1 z-50 animate-fade-in text-xs">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setSelectedCity(city);
                      setIsCityDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 transition-colors cursor-pointer ${
                      selectedCity === city
                        ? "bg-[#183d28] text-emerald-300 font-bold"
                        : "text-[#c2cec4] hover:bg-[#122e1f] hover:text-white"
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg bg-black/30 text-white/90 hover:text-white cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden relative z-40 bg-[#0b1b12]/95 backdrop-blur-md border-b border-[#21432f] px-6 py-4 space-y-3 text-sm">
          <a
            href="#categories"
            onClick={scrollToCategories}
            className="block py-1 text-white hover:text-emerald-300"
          >
            Our Food
          </a>
          <a
            href="#experience"
            onClick={(e) => scrollToSection(e, "experience")}
            className="block py-1 text-white hover:text-emerald-300"
          >
            Our Farms
          </a>
          <button
            onClick={() => {
              setIsMilkModalOpen(true);
              setMobileMenuOpen(false);
            }}
            className="block py-1 text-white hover:text-emerald-300 text-left w-full cursor-pointer"
          >
            Subscriptions
          </button>
          <a
            href="#visit"
            onClick={(e) => scrollToSection(e, "visit")}
            className="block py-1 text-white hover:text-emerald-300"
          >
            Our Story
          </a>
        </div>
      )}

      {/* 2. Main Hero Content Layer (Headline + Subtitle + Right CTA Buttons) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 flex-1 flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 md:gap-12">
          {/* Left Column: Bold Editorial Serif Headline & Subtitle */}
          <div className="max-w-xl xl:max-w-2xl">
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[82px] xl:text-[90px] font-bold text-[#faf8f2] leading-[1.04] tracking-tight drop-shadow-lg">
              Every day <br />
              begins in <br />
              the soil.
            </h1>

            <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-[#f3ede0]/90 font-light max-w-md leading-relaxed drop-shadow-md">
              Fresh food, moving at the rhythm of your home.
            </p>
          </div>

          {/* Right Column: Interactive CTA Stack with Vertical Divider Rule */}
          <div className="lg:self-center flex items-center gap-5 sm:gap-6">
            {/* Elegant Vertical Divider Rule matching Reference */}
            <div className="hidden lg:block w-[1.5px] h-24 bg-white/30 rounded-full" />

            <div className="flex flex-col items-start gap-4">
              {/* Primary Pill Button: 'Shop harvest ->' */}
              <a
                href="#categories"
                onClick={scrollToCategories}
                className="inline-flex items-center justify-between gap-3 px-6 sm:px-7 py-3 rounded-full border border-emerald-400 bg-[#0c2e1b]/95 hover:bg-[#0c2e1b] text-white text-sm font-semibold tracking-wide shadow-xl hover:scale-105 active:scale-95 transition-all group cursor-pointer"
              >
                <span>Shop harvest</span>
                <ArrowRight className="w-4 h-4 text-emerald-400 transition-transform group-hover:translate-x-1" />
              </a>

              {/* Secondary Link: 'Milk subscription ->' */}
              <button
                type="button"
                onClick={() => setIsMilkModalOpen(true)}
                className="inline-flex items-center gap-2 text-white/95 hover:text-emerald-300 text-sm font-medium tracking-wide transition-colors group cursor-pointer py-1"
              >
                <span>Milk subscription</span>
                <ArrowRight className="w-4 h-4 text-white/80 group-hover:text-emerald-300 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Layer: Scroll Prompt & Torn Paper Border Aesthetic */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 flex items-end justify-between">
        {/* Scroll Prompt on Bottom-Left */}
        <a
          href="#categories"
          onClick={scrollToCategories}
          className="flex items-center gap-2.5 text-xs text-white/80 hover:text-white transition-colors cursor-pointer group"
        >
          <div className="w-[1.5px] h-6 bg-white/50 group-hover:bg-white transition-colors" />
          <div className="flex flex-col">
            <span className="text-[11px] font-medium tracking-wider uppercase text-white/90">
              Scroll to follow the harvest
            </span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-emerald-400 animate-bounce ml-0.5" />
        </a>

        {/* Bottom Torn-Paper Banner Accent */}
        <div className="hidden sm:flex items-center gap-3 text-xs text-white/70">
          <span>From our fields to your table</span>
          <div className="w-12 h-[1px] bg-white/30" />
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
