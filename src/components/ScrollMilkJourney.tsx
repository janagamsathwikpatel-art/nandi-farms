"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";

interface PageData {
  id: number;
  pageNumber: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  statValue: string;
  statLabel: string;
  highlights: string[];
}

const PAGES: PageData[] = [
  {
    id: 0,
    pageNumber: "PAGE 01",
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
    pageNumber: "PAGE 02",
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
    pageNumber: "PAGE 03",
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalDist = rect.height - windowHeight;

      if (totalDist <= 0) return;

      // Calculate bidirectional progress from 0.0 to 1.0
      const scrolled = -rect.top;
      const rawProgress = scrolled / totalDist;
      const progress = Math.min(Math.max(rawProgress, 0), 1);
      setScrollProgress(progress);

      // Determine which page is primarily in view
      if (progress < 0.35) {
        setActivePage(0);
      } else if (progress < 0.70) {
        setActivePage(1);
      } else {
        setActivePage(2);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToPage = (pageIdx: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const totalDist = rect.height - windowHeight;

    const targetFraction = pageIdx === 0 ? 0.08 : pageIdx === 1 ? 0.48 : 0.90;
    const targetY = scrollTop + rect.top + totalDist * targetFraction;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  // Continuous 3D Page Turn Angles for Bidirectional Scrubbing
  // Page 1 turns between progress 0.12 and 0.42 (0deg -> -180deg)
  const p1Raw = Math.min(Math.max((scrollProgress - 0.12) / 0.30, 0), 1);
  const page1Angle = -(p1Raw * 180);
  const page1Shadow = p1Raw > 0 && p1Raw < 1 ? Math.sin(p1Raw * Math.PI) * 0.4 : 0;

  // Page 2 turns between progress 0.48 and 0.78 (0deg -> -180deg)
  const p2Raw = Math.min(Math.max((scrollProgress - 0.48) / 0.30, 0), 1);
  const page2Angle = -(p2Raw * 180);
  const page2Shadow = p2Raw > 0 && p2Raw < 1 ? Math.sin(p2Raw * Math.PI) * 0.4 : 0;

  return (
    <section
      ref={containerRef}
      id="scroll-milk-journey"
      className="relative w-full bg-[#faf5ea] min-h-[270vh] select-none"
    >
      {/* Sticky Full-Viewport Book Reader Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-4 sm:py-6 lg:py-8 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-hidden">
        
        {/* Top Header Bar & Progress Navigation */}
        <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-[#ded7c8]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#167832] animate-pulse" />
            <div>
              <p className="text-[11px] sm:text-xs font-black tracking-widest text-[#167832] uppercase flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Y Daily • A Daily Ritual of Freshness</span>
              </p>
              <h2 className="text-xl sm:text-2xl lg:text-[28px] font-bold tracking-tight text-[#0f172a]">
                The Farm to Home Journey
              </h2>
            </div>
          </div>

          {/* Interactive Step Navigation Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 bg-white/90 backdrop-blur-md p-1.5 rounded-full border border-[#ded7c8] shadow-sm">
            {PAGES.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => scrollToPage(idx)}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                  activePage === idx
                    ? "bg-[#162e1e] text-white shadow-md scale-105"
                    : "text-[#4b5563] hover:text-[#0f172a] hover:bg-black/5"
                }`}
              >
                <span>{p.pageNumber}.</span>
                <span className="hidden md:inline">{p.badge}</span>
                <span className="md:hidden">Page {idx + 1}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3D Perspective Book Reader Arena */}
        <div className="w-full max-w-7xl mx-auto flex-1 flex items-center justify-center py-2" style={{ perspective: "2500px" }}>
          
          {/* Physical Hardcover Book Casing */}
          <div className="relative w-full max-w-[1240px] h-[340px] sm:h-[420px] md:h-[480px] lg:h-[520px] bg-[#fbf8f2] rounded-3xl p-3 sm:p-5 border-4 sm:border-[6px] border-[#cfbfa6] shadow-[0_12px_40px_rgba(45,25,10,0.18),0_2px_0_#ede3d1,0_4px_0_#e4d7bf,0_6px_0_#dbcbaf] overflow-hidden flex">
            
            {/* Center Book Spine Line / Gutter Shadow */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-6 bg-gradient-to-r from-black/10 via-black/25 to-black/10 z-30 pointer-events-none hidden lg:block opacity-75" />

            {/* Book Pages Container */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#faf7f0]">
              
              {/* ================= PAGE 03 (BASE DESTINATION PAGE) ================= */}
              <div className="absolute inset-0 w-full h-full grid grid-cols-1 lg:grid-cols-12 bg-[#faf7f0] z-0">
                {/* Left Photo */}
                <div className="lg:col-span-7 relative w-full h-[180px] sm:h-[220px] lg:h-full overflow-hidden bg-black">
                  <Image
                    src={PAGES[2].image}
                    alt={PAGES[2].title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-center filter contrast-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black text-[#162e1e] border border-white/40 shadow-md">
                    PAGE 03 OF 03 • FINAL DESTINATION
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider">{PAGES[2].badge}</p>
                    <p className="text-base sm:text-lg font-bold drop-shadow-md">{PAGES[2].title}</p>
                  </div>
                </div>

                {/* Right Editorial Info */}
                <div className="lg:col-span-5 p-4 sm:p-6 lg:p-8 flex flex-col justify-center space-y-3 sm:space-y-4 bg-[#fcfaf5]">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-[#162e1e] text-white text-[11px] font-black rounded tracking-wider">
                      PAGE 03
                    </span>
                    <span className="text-xs font-extrabold text-[#b48246] tracking-wider uppercase">
                      {PAGES[2].badge}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#0f172a] leading-tight">
                      {PAGES[2].title}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#167832] mt-0.5">
                      {PAGES[2].subtitle}
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed line-clamp-3 sm:line-clamp-none">
                    {PAGES[2].description}
                  </p>
                  <div className="flex items-center gap-3 p-2.5 sm:p-3 bg-[#faf5ea] rounded-xl border border-[#ded7c8]">
                    <div className="text-xl sm:text-2xl font-black text-[#162e1e]">{PAGES[2].statValue}</div>
                    <div className="text-[11px] sm:text-xs font-bold text-[#475569]">{PAGES[2].statLabel}</div>
                  </div>
                  <div className="space-y-1">
                    {PAGES[2].highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs font-semibold text-[#1e293b]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#167832] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-1 flex items-center gap-2">
                    <Link
                      href="/shop/milk"
                      className="px-4 py-2 bg-[#162e1e] hover:bg-[#1f422b] text-white text-xs font-bold rounded-full transition-all flex items-center gap-1.5 shadow cursor-pointer"
                    >
                      <span>Shop Fresh Milk</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    {onShopFresh && (
                      <button
                        type="button"
                        onClick={onShopFresh}
                        className="px-3.5 py-2 border border-[#162e1e] hover:bg-black/5 text-[#162e1e] text-xs font-bold rounded-full transition-all cursor-pointer"
                      >
                        Explore Harvest
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* ================= PAGE 02 (TURNING LEAF 2) ================= */}
              <div
                className="absolute inset-0 w-full h-full grid grid-cols-1 lg:grid-cols-12 bg-[#faf7f0] z-10 transition-transform duration-300 ease-out"
                style={{
                  transformOrigin: "left center",
                  transform: `rotateY(${page2Angle}deg)`,
                  backfaceVisibility: "hidden",
                  boxShadow: page2Shadow > 0 ? `inset -20px 0 40px rgba(0,0,0,${page2Shadow})` : "none",
                  display: page2Angle <= -90 ? "none" : "grid",
                }}
              >
                {/* Left Photo */}
                <div className="lg:col-span-7 relative w-full h-[180px] sm:h-[220px] lg:h-full overflow-hidden bg-black">
                  <Image
                    src={PAGES[1].image}
                    alt={PAGES[1].title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-center filter contrast-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black text-[#162e1e] border border-white/40 shadow-md">
                    PAGE 02 OF 03 • 4°C COLD CHAIN
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider">{PAGES[1].badge}</p>
                    <p className="text-base sm:text-lg font-bold drop-shadow-md">{PAGES[1].title}</p>
                  </div>
                </div>

                {/* Right Editorial Info */}
                <div className="lg:col-span-5 p-4 sm:p-6 lg:p-8 flex flex-col justify-center space-y-3 sm:space-y-4 bg-[#fcfaf5] border-l border-[#ded7c8]">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-[#162e1e] text-white text-[11px] font-black rounded tracking-wider">
                      PAGE 02
                    </span>
                    <span className="text-xs font-extrabold text-[#b48246] tracking-wider uppercase">
                      {PAGES[1].badge}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#0f172a] leading-tight">
                      {PAGES[1].title}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#167832] mt-0.5">
                      {PAGES[1].subtitle}
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed line-clamp-3 sm:line-clamp-none">
                    {PAGES[1].description}
                  </p>
                  <div className="flex items-center gap-3 p-2.5 sm:p-3 bg-[#faf5ea] rounded-xl border border-[#ded7c8]">
                    <div className="text-xl sm:text-2xl font-black text-[#162e1e]">{PAGES[1].statValue}</div>
                    <div className="text-[11px] sm:text-xs font-bold text-[#475569]">{PAGES[1].statLabel}</div>
                  </div>
                  <div className="space-y-1">
                    {PAGES[1].highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs font-semibold text-[#1e293b]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#167832] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-[11px] font-bold text-[#64748b] pt-1">
                    {page2Angle < 0 ? "📖 Page 02 turning open to Page 03..." : "▼ Scroll down to turn open Page 03"}
                  </div>
                </div>
              </div>

              {/* ================= PAGE 01 (TURNING LEAF 1 - TOP COVER) ================= */}
              <div
                className="absolute inset-0 w-full h-full grid grid-cols-1 lg:grid-cols-12 bg-[#faf7f0] z-20 transition-transform duration-300 ease-out"
                style={{
                  transformOrigin: "left center",
                  transform: `rotateY(${page1Angle}deg)`,
                  backfaceVisibility: "hidden",
                  boxShadow: page1Shadow > 0 ? `inset -20px 0 40px rgba(0,0,0,${page1Shadow})` : "none",
                  display: page1Angle <= -90 ? "none" : "grid",
                }}
              >
                {/* Left Photo */}
                <div className="lg:col-span-7 relative w-full h-[180px] sm:h-[220px] lg:h-full overflow-hidden bg-black">
                  <Image
                    src={PAGES[0].image}
                    alt={PAGES[0].title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-center filter contrast-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black text-[#162e1e] border border-white/40 shadow-md">
                    PAGE 01 OF 03 • SACRED HARVEST
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider">{PAGES[0].badge}</p>
                    <p className="text-base sm:text-lg font-bold drop-shadow-md">{PAGES[0].title}</p>
                  </div>
                </div>

                {/* Right Editorial Info */}
                <div className="lg:col-span-5 p-4 sm:p-6 lg:p-8 flex flex-col justify-center space-y-3 sm:space-y-4 bg-[#fcfaf5] border-l border-[#ded7c8]">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-[#162e1e] text-white text-[11px] font-black rounded tracking-wider">
                      PAGE 01
                    </span>
                    <span className="text-xs font-extrabold text-[#b48246] tracking-wider uppercase">
                      {PAGES[0].badge}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#0f172a] leading-tight">
                      {PAGES[0].title}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#167832] mt-0.5">
                      {PAGES[0].subtitle}
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed line-clamp-3 sm:line-clamp-none">
                    {PAGES[0].description}
                  </p>
                  <div className="flex items-center gap-3 p-2.5 sm:p-3 bg-[#faf5ea] rounded-xl border border-[#ded7c8]">
                    <div className="text-xl sm:text-2xl font-black text-[#162e1e]">{PAGES[0].statValue}</div>
                    <div className="text-[11px] sm:text-xs font-bold text-[#475569]">{PAGES[0].statLabel}</div>
                  </div>
                  <div className="space-y-1">
                    {PAGES[0].highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs font-semibold text-[#1e293b]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#167832] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-[11px] font-bold text-[#64748b] pt-1">
                    {page1Angle < 0 ? "📖 Page 01 turning open to Page 02..." : "▼ Scroll down to turn open Page 02"}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Interactive Scroll Indicator Bar */}
        <div className="w-full max-w-7xl mx-auto pt-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-[#64748b] mb-1.5">
            <span>Scroll Progress: {Math.round(scrollProgress * 100)}%</span>
            <span className="flex items-center gap-2">
              <span className="text-[#167832]">▼ Scroll Down to open pages</span>
              <span>•</span>
              <span className="text-[#3b82f6]">▲ Scroll Up to turn back pages</span>
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
