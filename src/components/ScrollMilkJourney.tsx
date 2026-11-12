"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  CheckCircle2,
  ArrowRight,
  Droplets,
  ShieldCheck,
  Thermometer,
  Truck,
  Clock,
  Sparkles,
} from "lucide-react";

interface ScrollMilkJourneyProps {
  onShopFresh?: () => void;
}

export default function ScrollMilkJourney({ onShopFresh }: ScrollMilkJourneyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPouring, setIsPouring] = useState(false);
  const lastScrollTime = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      lastScrollTime.current = Date.now();
      setIsPouring(true);

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const totalDist = rect.height - windowHeight;

            if (totalDist > 0) {
              const scrolled = -rect.top;
              const rawProgress = scrolled / totalDist;
              const progress = Math.min(Math.max(rawProgress, 0), 1);
              setScrollProgress(progress);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    const interval = setInterval(() => {
      if (Date.now() - lastScrollTime.current > 300) {
        setIsPouring(false);
      }
    }, 150);

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  // Compute live milk volume in 500ml bottle
  // From 0.05 progress -> starts filling, reaches 500ml at 0.95 progress
  const fillFraction = Math.min(Math.max((scrollProgress - 0.06) / 0.88, 0), 1);
  const currentMl = Math.round(fillFraction * 500);

  // Active stages based on scroll progress
  const isStage1Active = scrollProgress >= 0.05 && scrollProgress < 0.35;
  const isStage2Active = scrollProgress >= 0.35 && scrollProgress < 0.65;
  const isStage3Active = scrollProgress >= 0.65 && scrollProgress < 0.85;
  const isStage4Active = scrollProgress >= 0.85;

  // Jump to specific milestone on pill click
  const scrollToStage = (fraction: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const totalDist = rect.height - windowHeight;
    const targetY = scrollTop + rect.top + totalDist * fraction;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={containerRef}
      id="scroll-milk-journey"
      className="relative w-full bg-[#faf5ea] min-h-[280vh] select-none"
    >
      {/* Sticky Full-Viewport Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-4 sm:py-6 lg:py-8 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-hidden">
        
        {/* Top Header Bar & Progress Navigation */}
        <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-[#ded7c8]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#167832] animate-pulse" />
            <div>
              <p className="text-[11px] sm:text-xs font-black tracking-widest text-[#167832] uppercase flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-[#167832]" />
                <span>Y Daily • A Daily Ritual of Freshness</span>
              </p>
              <h2 className="text-xl sm:text-2xl lg:text-[28px] font-bold tracking-tight text-[#0f172a]">
                The 500ml Farm to Home Journey
              </h2>
            </div>
          </div>

          {/* Real-time 500ml Bottle Fill Progress Badge */}
          <div className="flex items-center gap-2 sm:gap-3 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-[#ded7c8] shadow-xs">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#16301d]">
                500ml Bottle Fill: {Math.round(fillFraction * 100)}% ({currentMl} ml)
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1 pl-2 border-l border-neutral-200">
              {[
                { label: "Empty", frac: 0.05 },
                { label: "150ml", frac: 0.35 },
                { label: "350ml", frac: 0.70 },
                { label: "500ml Full", frac: 0.95 },
              ].map((m, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => scrollToStage(m.frac)}
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                    (m.frac <= fillFraction)
                      ? "bg-[#16301d] text-white"
                      : "text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main 3-Column 3D Showcase Stage */}
        <div className="w-full max-w-7xl mx-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center py-2 sm:py-4 relative overflow-visible">
          
          {/* ========================================================= */}
          {/* A. LEFT COLUMN: The Source & Harvest Ritual (Stages 1 & 2) */}
          {/* ========================================================= */}
          <div className="hidden lg:flex lg:col-span-4 flex-col justify-center gap-5 xl:gap-6 z-10">
            
            {/* Card 1: 05:00 AM Dawn Milking */}
            <div
              className={`p-5 xl:p-6 rounded-2xl transition-all duration-500 ${
                isStage1Active
                  ? "bg-white shadow-lg border-2 border-[#167832] scale-[1.02]"
                  : "bg-white/85 shadow-xs border border-[#ded7c8] hover:bg-white"
              }`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <Clock className="w-3 h-3 text-emerald-700" />
                  Stage 01 • 05:00 AM
                </span>
                <span className="text-xs font-bold text-neutral-400">01 / 04</span>
              </div>
              <h3 className="text-lg xl:text-xl font-bold text-[#0f172a] mb-1">
                Dawn Sacred Milking
              </h3>
              <p className="text-xs font-semibold text-emerald-700 mb-2">
                Free-Range Indigenous Pastures
              </p>
              <p className="text-xs xl:text-sm text-neutral-600 leading-relaxed mb-3">
                Every morning before sunrise, pure milk is gently harvested from healthy, pasture-grazed Desi Gir, Hallikar, and Murrah cattle nourished on organic green fodder.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-100">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-900 bg-[#faf5ea] px-2 py-0.5 rounded-md">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> 100% Grass-Fed
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-900 bg-[#faf5ea] px-2 py-0.5 rounded-md">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Pure Desi A2 Purity
                </span>
              </div>
            </div>

            {/* Card 2: Untouched Purity & Zero Processing */}
            <div
              className={`p-5 xl:p-6 rounded-2xl transition-all duration-500 ${
                isStage2Active
                  ? "bg-white shadow-lg border-2 border-[#167832] scale-[1.02]"
                  : "bg-white/85 shadow-xs border border-[#ded7c8] hover:bg-white"
              }`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 text-emerald-700" />
                  Stage 02 • Untouched
                </span>
                <span className="text-xs font-bold text-neutral-400">02 / 04</span>
              </div>
              <h3 className="text-lg xl:text-xl font-bold text-[#0f172a] mb-1">
                Zero Chemical Processing
              </h3>
              <p className="text-xs font-semibold text-emerald-700 mb-2">
                Untouched by Human Hands
              </p>
              <p className="text-xs xl:text-sm text-neutral-600 leading-relaxed mb-3">
                Drawn through sanitized automated lines into sealed stainless tanks. Zero synthetic hormones, zero boiling, zero chemical additives—the rich natural cream layer remains intact.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-100">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-900 bg-[#faf5ea] px-2 py-0.5 rounded-md">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> 0% Additives
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-900 bg-[#faf5ea] px-2 py-0.5 rounded-md">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Whole A2 Cream Top
                </span>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* B. CENTER COLUMN: 3D Realistic 500ml Glass Milk Bottle     */}
          {/* ========================================================= */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center relative py-2">
            
            {/* 3D Bottle Stage Container */}
            <div className="relative w-[260px] sm:w-[280px] xl:w-[300px] h-[460px] sm:h-[500px] xl:h-[530px] flex items-center justify-center">
              
              {/* Pedestal Shadow & Platform */}
              <div className="absolute -bottom-4 w-[240px] sm:w-[260px] h-[34px] rounded-[100%] bg-emerald-950/15 blur-md" />
              <div className="absolute -bottom-2 w-[210px] sm:w-[230px] h-[22px] rounded-[100%] bg-white/70 border border-neutral-300 shadow-sm" />

              {/* Pouring Milk Stream (Active on scroll/fill) */}
              {isPouring && fillFraction < 0.98 && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 sm:w-3.5 z-25 overflow-hidden transition-opacity duration-300">
                  <div
                    className="w-full bg-gradient-to-b from-white/95 via-white to-amber-50 rounded-full animate-pulse shadow-xs"
                    style={{
                      height: `${Math.max(120, (1 - fillFraction) * 340)}px`,
                    }}
                  />
                </div>
              )}

              {/* The Glass Milk Bottle Shape (500ml) */}
              <div className="relative w-full h-full flex flex-col items-center justify-end z-20">
                
                {/* 1. Golden Crown Foil Cap */}
                <div className="w-[88px] sm:w-[94px] h-[24px] sm:h-[26px] rounded-t-md bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 shadow-md border-b border-amber-600/50 flex items-center justify-center relative z-30">
                  <span className="text-[9px] font-black tracking-widest text-amber-900 uppercase">
                    Y Daily
                  </span>
                  {/* Cap gloss highlight */}
                  <div className="absolute top-1 left-3 right-3 h-1 bg-white/60 rounded-full" />
                </div>

                {/* 2. Bottle Lip & Thread */}
                <div className="w-[96px] sm:w-[102px] h-[10px] bg-white/50 backdrop-blur-xs border-x-2 border-white/80 rounded-sm z-30 shadow-xs" />

                {/* 3. Bottle Neck & Sloping Shoulder */}
                <div className="relative w-[180px] sm:w-[195px] h-[80px] sm:h-[90px] flex justify-center z-25">
                  <svg
                    viewBox="0 0 200 90"
                    className="w-full h-full filter drop-shadow-xs"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M 60 0 L 140 0 L 180 90 L 20 90 Z"
                      fill="rgba(255, 255, 255, 0.28)"
                      stroke="rgba(255, 255, 255, 0.75)"
                      strokeWidth="3"
                    />
                    {/* Left Specular Glare along shoulder */}
                    <path
                      d="M 68 5 L 82 5 L 42 85 L 28 85 Z"
                      fill="rgba(255, 255, 255, 0.55)"
                    />
                  </svg>
                </div>

                {/* 4. Cylindrical Glass Body Container (Holds the 500ml Liquid) */}
                <div className="relative w-[210px] sm:w-[225px] xl:w-[235px] h-[330px] sm:h-[355px] xl:h-[375px] rounded-b-[36px] border-4 border-white/70 bg-white/20 backdrop-blur-xs shadow-[inset_0_0_24px_rgba(255,255,255,0.4)] overflow-hidden flex flex-col justify-end z-20">
                  
                  {/* Background Glass Depth Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-neutral-400/10 pointer-events-none" />

                  {/* ========================================= */}
                  {/* DYNAMIC SCROLL-DRIVEN MILK LIQUID FILL   */}
                  {/* ========================================= */}
                  <div
                    className="w-full transition-all duration-300 ease-out relative flex flex-col justify-start"
                    style={{
                      height: `${fillFraction * 100}%`,
                    }}
                  >
                    {/* Wavy Milk Surface Meniscus */}
                    {fillFraction > 0.02 && (
                      <div className="absolute -top-3 left-0 right-0 h-6 overflow-hidden z-20">
                        <svg
                          viewBox="0 0 500 40"
                          className="w-full h-full text-white fill-current"
                          preserveAspectRatio="none"
                        >
                          <path d="M 0 20 Q 125 5 250 20 T 500 20 L 500 40 L 0 40 Z" />
                        </svg>
                        {/* Rich Golden Cream Layer Line */}
                        <div className="absolute top-2.5 left-0 right-0 h-1 bg-amber-100/90 shadow-xs" />
                      </div>
                    )}

                    {/* Pure Organic White Milk Body */}
                    <div className="w-full flex-1 bg-gradient-to-b from-white via-[#fcfaf5] to-[#f4efe4] relative shadow-inner">
                      {/* Left Subtle Liquid Cylindrical Shadow */}
                      <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-neutral-300/35 to-transparent pointer-events-none" />
                      {/* Right Subtle Liquid Cylindrical Shadow */}
                      <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-neutral-300/35 to-transparent pointer-events-none" />
                    </div>
                  </div>

                  {/* ========================================= */}
                  {/* 500ml EMBOSSED GLASS GRADUATION MARKINGS  */}
                  {/* ========================================= */}
                  <div className="absolute inset-y-6 right-3 flex flex-col justify-between items-end pointer-events-none select-none z-30">
                    {[
                      { ml: 500, label: "500 ml • FULL" },
                      { ml: 400, label: "400 ml" },
                      { ml: 300, label: "300 ml" },
                      { ml: 200, label: "200 ml" },
                      { ml: 100, label: "100 ml" },
                    ].map((tick) => {
                      const isReached = currentMl >= tick.ml;
                      return (
                        <div key={tick.ml} className="flex items-center gap-1.5">
                          <span
                            className={`text-[9px] sm:text-[10px] font-bold tracking-tight transition-colors duration-300 ${
                              isReached
                                ? "text-emerald-800 drop-shadow-xs"
                                : "text-neutral-500/80"
                            }`}
                          >
                            {tick.label}
                          </span>
                          <span
                            className={`w-3 sm:w-4 h-0.5 rounded-full transition-colors duration-300 ${
                              isReached
                                ? "bg-emerald-700"
                                : "bg-neutral-400/60"
                            }`}
                          />
                        </div>
                      );
                    })}
                  </div>

                  {/* Center Embossed Glass Brand Seal */}
                  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none select-none z-25 opacity-70">
                    <div className="w-14 h-14 rounded-full border border-neutral-400/40 flex flex-col items-center justify-center p-1 bg-white/20 backdrop-blur-2xs">
                      <Sparkles className="w-4 h-4 text-emerald-800" />
                      <span className="text-[8px] font-black tracking-widest text-[#16301d]">
                        Y DAILY
                      </span>
                      <span className="text-[6px] font-semibold text-emerald-900">
                        PURE A2
                      </span>
                    </div>
                  </div>

                  {/* Front Specular 3D Glass Highlights (Reflection sheen) */}
                  <div className="absolute top-4 bottom-6 left-3 w-3 bg-gradient-to-b from-white/75 via-white/50 to-white/20 rounded-full blur-[1px] pointer-events-none z-35" />
                  <div className="absolute top-8 bottom-10 right-2 w-1.5 bg-white/40 rounded-full blur-[0.5px] pointer-events-none z-35" />
                </div>
              </div>
            </div>

            {/* Live Volume Readout Gauge Beneath Bottle */}
            <div className="mt-3 sm:mt-4 flex flex-col items-center gap-1 z-30">
              <div className="inline-flex items-center gap-2 bg-[#16301d] text-white px-4 py-2 rounded-full shadow-md border border-emerald-600/40">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs sm:text-sm font-bold tracking-wide">
                  500ml Bottle: {currentMl} ml Filled
                </span>
              </div>
              <span className="text-[11px] font-medium text-neutral-500">
                {fillFraction >= 0.98 ? "✓ Sealed & Ready for Doorstep Dispatch" : "▲ Scroll up / down to dynamically fill milk"}
              </span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* C. RIGHT COLUMN: Cold Chain & Delivery (Stages 3 & 4)     */}
          {/* ========================================================= */}
          <div className="hidden lg:flex lg:col-span-4 flex-col justify-center gap-5 xl:gap-6 z-10">
            
            {/* Card 3: 4°C Cold Chain Lock */}
            <div
              className={`p-5 xl:p-6 rounded-2xl transition-all duration-500 ${
                isStage3Active
                  ? "bg-white shadow-lg border-2 border-[#167832] scale-[1.02]"
                  : "bg-white/85 shadow-xs border border-[#ded7c8] hover:bg-white"
              }`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-sky-50 text-sky-800 border border-sky-200">
                  <Thermometer className="w-3 h-3 text-sky-700" />
                  Stage 03 • 4°C Cold Chain
                </span>
                <span className="text-xs font-bold text-neutral-400">03 / 04</span>
              </div>
              <h3 className="text-lg xl:text-xl font-bold text-[#0f172a] mb-1">
                Rapid Chill in 45 Minutes
              </h3>
              <p className="text-xs font-semibold text-sky-700 mb-2">
                Nutrient & Enzyme Lock
              </p>
              <p className="text-xs xl:text-sm text-neutral-600 leading-relaxed mb-3">
                Within 45 minutes of dawn milking, the raw milk is flash-chilled to precisely 4°C. This instant cooling halts bacterial multiplication while preserving vital active probiotics and natural vitamins.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-100">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-900 bg-[#faf5ea] px-2 py-0.5 rounded-md">
                  <CheckCircle2 className="w-3 h-3 text-sky-600" /> Chilled to 4°C
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-900 bg-[#faf5ea] px-2 py-0.5 rounded-md">
                  <CheckCircle2 className="w-3 h-3 text-sky-600" /> Active Bio-Enzymes
                </span>
              </div>
            </div>

            {/* Card 4: 06:30 AM Doorstep Delivery in 500ml Glass Bottle */}
            <div
              className={`p-5 xl:p-6 rounded-2xl transition-all duration-500 ${
                isStage4Active
                  ? "bg-white shadow-lg border-2 border-[#167832] scale-[1.02]"
                  : "bg-white/85 shadow-xs border border-[#ded7c8] hover:bg-white"
              }`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <Truck className="w-3 h-3 text-emerald-700" />
                  Stage 04 • 06:30 AM Doorstep
                </span>
                <span className="text-xs font-bold text-neutral-400">04 / 04</span>
              </div>
              <h3 className="text-lg xl:text-xl font-bold text-[#0f172a] mb-1">
                Sterilized 500ml Glass Delivery
              </h3>
              <p className="text-xs font-semibold text-emerald-700 mb-2">
                Zero Plastic • Pure Morning Breakfast
              </p>
              <p className="text-xs xl:text-sm text-neutral-600 leading-relaxed mb-3">
                Bottled in sterilized, reusable 500ml glass jars that eliminate microplastics and preserve fresh taste. Delivered cold in insulated bags straight to your door by 6:30 AM daily.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-100">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-900 bg-[#faf5ea] px-2 py-0.5 rounded-md">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> 500ml Sealed Glass
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-900 bg-[#faf5ea] px-2 py-0.5 rounded-md">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Morning Doorstep
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action & Scroll Guidance Bar */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between pt-3 sm:pt-4 border-t border-[#ded7c8] text-xs font-medium text-neutral-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>Interactive 3D Fill Experience • Scrub smoothly by scrolling</span>
          </div>

          {onShopFresh ? (
            <button
              type="button"
              onClick={onShopFresh}
              className="inline-flex items-center gap-2 bg-[#16301d] text-white px-4 py-2 rounded-full font-bold shadow-md hover:bg-[#1f4228] transition-all cursor-pointer"
            >
              <span>Subscribe 500ml Daily Milk</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <a
              href="/shop/milk"
              className="inline-flex items-center gap-2 bg-[#16301d] text-white px-4 py-2 rounded-full font-bold shadow-md hover:bg-[#1f4228] transition-all cursor-pointer"
            >
              <span>Subscribe 500ml Daily Milk</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
