"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Sparkles, Clock, ShieldCheck, Truck, ArrowRight } from "lucide-react";

interface JourneyStage {
  id: number;
  stageNumber: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  statValue: string;
  statLabel: string;
  highlights: string[];
}

const JOURNEY_STAGES: JourneyStage[] = [
  {
    id: 0,
    stageNumber: "01",
    badge: "HARVEST AT DAWN",
    title: "Dawn Milking in Sacred Village Pastures",
    subtitle: "Ethical Cattle Care • 100% Grass-Fed • Untouched Dawn Collection",
    description:
      "Every morning before sunrise, our ritual begins in trusted rural pastures. Pure milk is collected gently from healthy, pasture-grazed cattle with zero chemical additives or hormonal tampering.",
    image: "/images/journey/farm_milking.jpg",
    statValue: "05:30 AM",
    statLabel: "Morning Dawn Collection",
    highlights: ["Single-Source Purity", "Pasture-Grazed Cattle", "Zero Preservatives"],
  },
  {
    id: 1,
    stageNumber: "02",
    badge: "4°C COLD CHAIN",
    title: "Rapid 4°C Chilled Storage & Clean Bottling",
    subtitle: "Cold-Chain Integrity • Contact-Free Bottling • Sterilized Glass",
    description:
      "Within 15 minutes of milking, fresh milk undergoes instant thermal stabilization to 4°C in food-grade stainless steel tanks, followed by contact-free automated packing into sterilized glass bottles.",
    image: "/images/journey/chilled_bottling.jpg",
    statValue: "4°C",
    statLabel: "Stabilized in 15 Minutes",
    highlights: ["Instant 4°C Chilling", "Automated Conveyor Line", "Tamper-Evident Sterilized Glass"],
  },
  {
    id: 2,
    stageNumber: "03",
    badge: "DOORSTEP DELIVERY",
    title: "Fresh to Your Doorstep Every Morning",
    subtitle: "Insulated Refrigerated Dispatch • Timely Arrival by 6:00 AM",
    description:
      "Transported in dedicated Y Daily refrigerated electric trucks directly to your doorstep. Chilled, untouched farm milk ready for your family's morning breakfast ritual.",
    image: "/images/journey/doorstep_delivery.jpg",
    statValue: "100%",
    statLabel: "Refrigerated Direct Delivery",
    highlights: ["Daily 6:00 AM Dispatch", "Eco-Friendly Refrigerated Vans", "Pure Breakfast Freshness"],
  },
];

interface ScrollMilkJourneyProps {
  onShopFresh?: () => void;
}

export default function ScrollMilkJourney({ onShopFresh }: ScrollMilkJourneyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalDist = rect.height - windowHeight;

      if (totalDist <= 0) return;

      // Calculate how far down through the container we have scrolled (0 to 1)
      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / totalDist, 0), 1);
      setScrollProgress(progress);

      // Determine active stage based on progress
      if (progress < 0.33) {
        setActiveStage(0);
      } else if (progress < 0.66) {
        setActiveStage(1);
      } else {
        setActiveStage(2);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToStage = (stageIdx: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const totalDist = rect.height - windowHeight;

    const targetFraction = stageIdx === 0 ? 0.05 : stageIdx === 1 ? 0.5 : 0.95;
    const targetY = scrollTop + rect.top + totalDist * targetFraction;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  const current = JOURNEY_STAGES[activeStage];

  return (
    <section
      ref={containerRef}
      id="scroll-milk-journey"
      className="relative w-full bg-[#faf5ea] min-h-[260vh] select-none"
    >
      {/* Sticky Full-Viewport Story Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-6 sm:py-8 px-4 sm:px-8 lg:px-14 xl:px-20 overflow-hidden">
        
        {/* Top Header Bar & Progress Navigation */}
        <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ded7c8]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#167832] animate-pulse" />
            <div>
              <p className="text-[11px] sm:text-xs font-black tracking-widest text-[#167832] uppercase">
                Y Daily • Farm To Home Process
              </p>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-[#0f172a]">
                A Daily Ritual of Freshness
              </h2>
            </div>
          </div>

          {/* Interactive Step Navigation Pills */}
          <div className="flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-md p-1.5 rounded-full border border-[#e2ded4] shadow-sm">
            {JOURNEY_STAGES.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollToStage(idx)}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                  activeStage === idx
                    ? "bg-[#162e1e] text-white shadow-md scale-105"
                    : "text-[#4b5563] hover:text-[#0f172a] hover:bg-black/5"
                }`}
              >
                <span>{s.stageNumber}.</span>
                <span className="hidden md:inline">{s.badge}</span>
                <span className="md:hidden">Stage {idx + 1}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Stage Grid: Interactive Visual Viewer (Left) + Editorial Narrative (Right) */}
        <div className="w-full max-w-7xl mx-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center py-4">
          
          {/* Left Column: Sequential Image Reveal Viewer (7 Cols) */}
          <div className="lg:col-span-7 relative w-full h-[280px] sm:h-[380px] md:h-[440px] lg:h-[480px] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#ded7c8] bg-black">
            {JOURNEY_STAGES.map((s, idx) => {
              const isActive = activeStage === idx;
              return (
                <div
                  key={s.id}
                  className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out transform ${
                    isActive
                      ? "opacity-100 scale-100 z-10"
                      : "opacity-0 scale-105 pointer-events-none z-0"
                  }`}
                >
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-center filter contrast-[1.02] brightness-[1.01]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* On-Image Phase Tag */}
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-extrabold text-[#162e1e] border border-white/40 shadow-lg flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#e11d48]" />
                    <span>STEP {s.stageNumber} OF 03</span>
                  </div>

                  {/* Bottom Image Caption */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white">
                    <p className="text-xs sm:text-sm font-semibold tracking-wider text-emerald-300 uppercase">
                      {s.badge}
                    </p>
                    <p className="text-base sm:text-lg font-bold drop-shadow-md">
                      {s.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Editorial Narrative & Verification Details (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4 sm:space-y-5 bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-[#ded7c8] shadow-sm">
            {/* Stage Indicator Badge */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-[#162e1e] text-white text-xs font-black rounded-md tracking-wider">
                STAGE {current.stageNumber}
              </span>
              <span className="text-xs font-extrabold text-[#b48246] tracking-wider uppercase">
                {current.badge}
              </span>
            </div>

            {/* Dynamic Stage Title */}
            <div>
              <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-[#0f172a] leading-tight transition-all duration-300">
                {current.title}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-[#167832] mt-1">
                {current.subtitle}
              </p>
            </div>

            {/* Narrative Paragraph */}
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              {current.description}
            </p>

            {/* Stat Box */}
            <div className="flex items-center gap-4 p-3.5 bg-[#faf5ea] rounded-2xl border border-[#ded7c8]">
              <div className="text-2xl sm:text-3xl font-black text-[#162e1e]">
                {current.statValue}
              </div>
              <div className="text-xs font-bold text-[#475569] leading-tight">
                {current.statLabel}
              </div>
            </div>

            {/* Highlights List */}
            <div className="space-y-1.5 pt-1">
              {current.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1e293b]">
                  <CheckCircle2 className="w-4 h-4 text-[#167832] shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            {/* Call To Action Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <Link
                href="/shop/milk"
                className="px-5 py-2.5 bg-[#162e1e] hover:bg-[#1f422b] active:scale-95 text-white text-xs sm:text-sm font-bold rounded-full transition-all flex items-center gap-2 shadow-md cursor-pointer"
              >
                <span>Shop Fresh Milk</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              {onShopFresh && (
                <button
                  type="button"
                  onClick={onShopFresh}
                  className="px-4 py-2.5 border border-[#162e1e] hover:bg-black/5 active:scale-95 text-[#162e1e] text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer"
                >
                  View Harvest Catalog
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Scroll Progress Bar */}
        <div className="w-full max-w-7xl mx-auto pt-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-[#64748b] mb-1.5">
            <span>Scroll Progress: {Math.round(scrollProgress * 100)}%</span>
            <span>
              {activeStage === 0
                ? "▼ Scroll down to reveal 4°C Bottling Line"
                : activeStage === 1
                ? "▼ Scroll down to reveal Doorstep Delivery"
                : "✓ Journey Complete • Continuing to Next Section"}
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#e2ded4] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#167832] via-[#b48246] to-[#162e1e] transition-all duration-150 ease-out"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
