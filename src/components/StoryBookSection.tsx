"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ShoppingBag,
  CheckCircle2,
  Sprout,
  ArrowRight,
} from "lucide-react";
import "./StoryBookSection.css";

interface ChapterData {
  id: number;
  chapterNumber: string;
  category: string;
  title: string;
  subtitle: string;
  image: string;
  rightBadge: string;
  yearRange: string;
  statNumber: string;
  statLabel: string;
  narrative: string;
  features: string[];
}

const CHAPTERS: ChapterData[] = [
  {
    id: 0,
    chapterNumber: "PROLOGUE",
    category: "OUR ORIGINS",
    title: "A Daily Ritual of Freshness",
    subtitle: "From trusted village farms to your doorstep",
    image: "/storybook/story_cover.png",
    rightBadge: "Sacred Dawn Harvest",
    yearRange: "HYDERABAD • FRESH EVERY MORNING",
    statNumber: "05:30",
    statLabel: "Morning Dawn Milk Collection",
    narrative:
      "Every morning before the city stirs, our ritual begins in the quiet pastures of trusted rural farms. Pure A2 milk, gently collected, rapidly chilled to 4°C, and placed quietly on your doorstep before the sunrise.",
    features: ["100% Pure A2 Milk", "Zero Additives", "Direct Farm Source"],
  },
  {
    id: 1,
    chapterNumber: "CHAPTER 01",
    category: "WHERE IT BEGINS",
    title: "Healthy Cows & Trusted Farms",
    subtitle: "Ethical cattle nurturing in natural pastures",
    image: "/storybook/story_page1.png",
    rightBadge: "Rooted in Ethics",
    yearRange: "HAPPY COWS • SUSTAINABLE FUTURE",
    statNumber: "100%",
    statLabel: "Ethical Grazing & Pasture Fed",
    narrative:
      "We partner exclusively with local family farmers who raise indigenous Indian cattle with care. The cattle graze freely on organic green fodder, bask in natural sunshine, and live free from hormonal stimulants or synthetic antibiotics.",
    features: ["Free Range Grazing", "Calf Nurtured First", "Chemical-Free Feed"],
  },
  {
    id: 2,
    chapterNumber: "CHAPTER 02",
    category: "THE HARVEST",
    title: "Pure Milk from Healthy Cows",
    subtitle: "Hygienic fresh milk collection at dawn",
    image: "/storybook/story_page2.png",
    rightBadge: "Single-Source Purity",
    yearRange: "DAWN HARVEST • ZERO TOUCH",
    statNumber: "02",
    statLabel: "Stages of Quality Assurance",
    narrative:
      "At first light, our trained farmers collect milk using traditional gentle techniques combined with modern food-grade sanitization. The fresh milk is strained immediately into airtight stainless-steel vessels to lock in wholesome nutrients.",
    features: ["Hygienic Collection", "Caring Farmers", "Quality Assured"],
  },
  {
    id: 3,
    chapterNumber: "CHAPTER 03",
    category: "THE CHILLING",
    title: "From Farm to Freshness",
    subtitle: "Rapid thermal drop to 4°C within 15 minutes",
    image: "/storybook/story_page3.png",
    rightBadge: "Cold-Chain Integrity",
    yearRange: "THERMAL DROP • 4°C IN 15 MINS",
    statNumber: "4°C",
    statLabel: "Immediate Cold Stabilization",
    narrative:
      "Temperature is the true guardian of milk freshness. Within 15 minutes of milking, the milk is chilled down to 4°C in localized bulk milk coolers, preventing bacterial multiplication while naturally preserving delicate bioactive enzymes.",
    features: ["Instant Chilling", "Zero Preservatives", "Nutrient Protected"],
  },
  {
    id: 4,
    chapterNumber: "CHAPTER 04",
    category: "THE BOTTLING",
    title: "Hygienic Processing & Packing",
    subtitle: "Modern automated facility in sterilized glass",
    image: "/storybook/story_page4.png",
    rightBadge: "Zero Plastic Guarantee",
    yearRange: "GLASS BOTTLED • TAMPER-EVIDENT",
    statNumber: "0%",
    statLabel: "Plastic Leaching or Toxins",
    narrative:
      "Inside our certified hygienic facility, milk undergoes double micro-filtration before automated bottling into sanitized glass containers. Glass is chemically inert, keeping the milk colder for longer and ensuring pure, unadulterated taste.",
    features: ["Modern Facility", "Hygienic Packing", "Sealed Freshness"],
  },
  {
    id: 5,
    chapterNumber: "CHAPTER 05",
    category: "THE HARVEST",
    title: "Straight from the Farm",
    subtitle: "Organic seasonal vegetables & crisp greens",
    image: "/storybook/story_page5.png",
    rightBadge: "Farm Fresh Vegetables",
    yearRange: "HARVESTED DAILY • PEAK RIPENESS",
    statNumber: "24h",
    statLabel: "From Soil to Your Kitchen",
    narrative:
      "Alongside pure dairy, we bring you fresh seasonal vegetables grown in nutrient-dense soil. Harvested in the cool early hours, washed with pure ozonated water, and delivered directly with zero chemical coating or artificial wax.",
    features: ["Seasonal Harvest", "Naturally Grown", "Fresh & Nutritious"],
  },
  {
    id: 6,
    chapterNumber: "CHAPTER 06",
    category: "THE DELIVERY",
    title: "Freshness at Your Doorstep",
    subtitle: "Reliable cold-chain delivery before 07:00 AM",
    image: "/storybook/story_page6.png",
    rightBadge: "Morning Routine",
    yearRange: "BEFORE 7:00 AM • SILENT DELIVERY",
    statNumber: "07:00",
    statLabel: "Morning Doorstep Guarantee",
    narrative:
      "While Hyderabad sleeps, our temperature-monitored refrigerated vehicles transport your orders across the city. Your eco-friendly insulated crate is placed quietly on your porch before you wake up for your morning tea or coffee.",
    features: ["Safe Delivery", "Maintained Freshness", "On Time to Home"],
  },
  {
    id: 7,
    chapterNumber: "CHAPTER 07",
    category: "THE PROMISE",
    title: "Goodness for Generations",
    subtitle: "Uncompromising purity for you and your family",
    image: "/storybook/story_page7.png",
    rightBadge: "Timeless Goodness",
    yearRange: "PURE TODAY • HEALTHIER TOMORROWS",
    statNumber: "100%",
    statLabel: "Family Traceability & Health",
    narrative:
      "Good food is a family legacy. By choosing pure unadulterated A2 milk and seasonal organic vegetables, you invest in lifelong immunity, effortless digestion, and the continued well-being of sustainable, ethical Indian farming communities.",
    features: ["Digestive Ease", "Immunity Support", "Generational Purity"],
  },
];

interface StoryBookSectionProps {
  onShopFresh?: () => void;
}

export default function StoryBookSection({ onShopFresh }: StoryBookSectionProps) {
  // pageIndex: 0 = Prologue/Cover, 1..7 = Chapters, 8 = Epilogue
  const [pageIndex, setPageIndex] = useState(0);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev" | null>(null);

  const touchStartXRef = useRef<number | null>(null);

  // Next Chapter
  const handleNextPage = () => {
    if (pageIndex >= 8 || flipDirection) return;
    setFlipDirection("next");
    setTimeout(() => {
      setPageIndex((prev) => Math.min(prev + 1, 8));
      setFlipDirection(null);
    }, 550);
  };

  // Previous Chapter
  const handlePrevPage = () => {
    if (pageIndex <= 0 || flipDirection) return;
    setFlipDirection("prev");
    setTimeout(() => {
      setPageIndex((prev) => Math.max(prev - 1, 0));
      setFlipDirection(null);
    }, 550);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNextPage();
      if (e.key === "ArrowLeft") handlePrevPage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pageIndex, flipDirection]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartXRef.current - touchEndX;

    if (diffX > 50) {
      handleNextPage();
    } else if (diffX < -50) {
      handlePrevPage();
    }
    touchStartXRef.current = null;
  };

  const currentChapter = pageIndex <= 7 ? CHAPTERS[pageIndex] : null;

  return (
    <section
      className="storybook-fullwidth-section"
      aria-label="Y Daily Interactive Open Storybook Spread"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="storybook-stage">
        {/* Physical Hardcover Book Casing (Matches Reference Screenshot) */}
        <div className="storybook-hardcover-casing">
          {/* =================================================================
              STAGE 0: FULL-LENGTH COVER SCREEN
              ================================================================= */}
          {pageIndex === 0 ? (
            <div
              onClick={handleNextPage}
              className="relative w-full h-full rounded-xl overflow-hidden cursor-pointer group flex flex-col justify-end p-6 sm:p-10 select-none"
              title="Click cover to open our story"
            >
              {/* Full-Length Master Cover Artwork */}
              <Image
                src="/storybook/story_cover.png"
                alt="Y Daily - A Daily Ritual of Freshness Hardcover"
                fill
                priority
                sizes="(max-width: 1320px) 100vw, 1320px"
                className="object-cover group-hover:scale-[1.01] transition-transform duration-700"
              />

              {/* Bottom Subtle Overlay with OPEN OUR STORY Action */}
              <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
                <div className="text-left hidden sm:block">
                  <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-white/90 font-bold block drop-shadow-md">
                    Y Daily Textbook
                  </span>
                  <span className="text-xs text-white/80 italic font-serif drop-shadow-md">
                    Click anywhere on the cover to begin reading →
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextPage();
                  }}
                  className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-emerald-800/90 hover:bg-emerald-700 text-white font-serif font-bold text-sm sm:text-base tracking-wide shadow-2xl backdrop-blur-md border border-emerald-400/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span>OPEN OUR STORY →</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </button>
              </div>
            </div>
          ) : (
            /* =================================================================
                STAGES 01 TO 07: OPEN DOUBLE-PAGE BOOK SPREAD
                ================================================================= */
            <div className="storybook-spread-container">
              {/* Center Spine Divider & Crease with Soft Fold Shadows */}
              <div className="storybook-center-spine hidden md:block" />
              <div className="storybook-spine-shadow-left hidden md:block" />
              <div className="storybook-spine-shadow-right hidden md:block" />

              {/* Subtle Corner Filigrees matching reference */}
              <div className="storybook-corner-filigree storybook-corner-tl">
                <svg viewBox="0 0 100 100" fill="none" stroke="#7a6042" strokeWidth="1.2">
                  <path d="M10,10 Q50,10 50,50 Q10,50 10,10 Z M25,25 Q70,25 70,70" />
                </svg>
              </div>
              <div className="storybook-corner-filigree storybook-corner-tr">
                <svg viewBox="0 0 100 100" fill="none" stroke="#7a6042" strokeWidth="1.2">
                  <path d="M90,10 Q50,10 50,50 Q90,50 90,10 Z M75,25 Q30,25 30,70" />
                </svg>
              </div>

              {/* =============================================================
                  LEFT PAGE (Image, Title & Chapter Marker)
                  ============================================================= */}
              <div
                onClick={handlePrevPage}
                className={`storybook-page-half ${
                  flipDirection === "prev" ? "animate-page-turn-backward" : ""
                }`}
                title="Click left page to go back"
              >
                {/* Top Chapter Label */}
                <div>
                  <span className="text-[11px] font-sans font-bold tracking-[0.25em] text-[#826a4c] uppercase block mb-1">
                    {pageIndex <= 7
                      ? `${currentChapter?.chapterNumber} • ${currentChapter?.category}`
                      : "EPILOGUE • OUR PROMISE"}
                  </span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#1b2b1e] tracking-tight leading-snug">
                    {pageIndex <= 7 ? currentChapter?.title : "From Our Farms, to Your Family."}
                  </h3>
                </div>

                {/* Inset Photo / Illustration with elegant book border */}
                <div className="relative w-full my-3 flex-1 min-h-[220px] sm:min-h-[260px] md:min-h-[300px] rounded-lg overflow-hidden bg-[#f0ebd9] border-2 border-white shadow-md">
                  <Image
                    src={
                      pageIndex <= 7 && currentChapter
                        ? currentChapter.image
                        : "/storybook/story_page7.png"
                    }
                    alt={pageIndex <= 7 ? currentChapter?.title || "" : "Y Daily Promise"}
                    fill
                    priority
                    sizes="(max-width: 900px) 100vw, 600px"
                    className="object-contain"
                  />
                </div>

                {/* Left Page Bottom Annotation */}
                <div className="flex items-center justify-between text-[11px] text-[#705e48] font-sans pt-1 border-t border-[#dfd2be]/70">
                  <span className="italic">
                    {pageIndex <= 7 ? currentChapter?.subtitle : "Pure A2 Morning Ritual"}
                  </span>
                  <span className="font-serif font-semibold text-emerald-900 hidden sm:inline">
                    {pageIndex > 0 ? "← Previous Chapter" : ""}
                  </span>
                </div>
              </div>

              {/* =============================================================
                  RIGHT PAGE (Emblem, Narrative, Badges & Action)
                  ============================================================= */}
              <div
                onClick={handleNextPage}
                className={`storybook-page-half ${
                  flipDirection === "next" ? "animate-page-turn-forward" : ""
                }`}
                title="Click right page to continue"
              >
                {/* Top Heritage Emblem & Timeline Marker */}
                <div className="text-center pt-1">
                  <div className="inline-flex items-center gap-1.5 justify-center mb-1 text-[#225732]">
                    <Sprout className="w-4 h-4 text-emerald-700" />
                    <span className="font-serif font-bold text-xs tracking-[0.2em] text-[#1c4728] uppercase">
                      Y DAILY
                    </span>
                  </div>
                  <p className="text-[10px] font-sans tracking-[0.25em] text-[#857053] uppercase font-semibold">
                    {pageIndex <= 7 ? currentChapter?.yearRange : "PURE TODAY • HEALTHIER TOMORROWS"}
                  </p>
                </div>

                {/* Center Stylized Display Typography */}
                <div className="text-center my-auto py-2">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#7a4e28] tracking-tight leading-none mb-2">
                    {pageIndex <= 7 ? currentChapter?.statNumber : "100%"}
                  </div>
                  <h4 className="text-base sm:text-lg md:text-xl font-serif font-bold text-[#1a2e1d] mb-3">
                    {pageIndex <= 7 ? currentChapter?.statLabel : "Dedicated to Pure A2 Wellness"}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#4d4234] font-sans leading-relaxed max-w-md mx-auto">
                    {pageIndex <= 7
                      ? currentChapter?.narrative
                      : "Begin your mornings with pure unadulterated freshness. Harvested, chilled, and delivered before the sun rises."}
                  </p>
                </div>

                {/* 3 Organic Feature Badges */}
                <div className="flex flex-wrap items-center justify-center gap-2 my-2">
                  {(pageIndex <= 7 && currentChapter
                    ? currentChapter.features
                    : ["Pure A2 Dairy", "Farm Fresh Greens", "Doorstep Delivery"]
                  ).map((badge, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#eee5d3] text-[#423525] text-[10px] sm:text-[11px] font-sans font-medium border border-[#decfae]"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Bottom Action Button (CONTINUE OUR STORY or SHOP FRESH) */}
                <div className="pt-2 border-t border-[#dfd2be]/70 flex items-center justify-between">
                  <span className="text-[11px] text-[#705e48] font-mono">
                    {pageIndex <= 7 ? `SPREAD 0${pageIndex} / 07` : "EPILOGUE"}
                  </span>

                  {pageIndex < 8 ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextPage();
                      }}
                      className="storybook-continue-btn"
                    >
                      <span>
                        {pageIndex === 7
                          ? "CONCLUSION"
                          : "CONTINUE OUR STORY"}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onShopFresh) {
                          onShopFresh();
                        } else {
                          const catalog = document.getElementById("catalog");
                          if (catalog) {
                            catalog.scrollIntoView({ behavior: "smooth" });
                          }
                        }
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#184523] hover:bg-[#12361b] text-white text-xs font-serif font-bold tracking-wider uppercase transition-all shadow-md cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
                      <span>SHOP FRESH →</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dedicated Bottom Pagination Bar */}
      <div className="relative z-30 w-full mt-6 flex items-center justify-center">
        <div className="bg-[#122e1b]/95 backdrop-blur-md px-6 py-2.5 rounded-full flex items-center gap-4 sm:gap-6 shadow-xl border border-emerald-600/30">
          {/* Prev Button */}
          <button
            onClick={handlePrevPage}
            disabled={pageIndex <= 0}
            className={`text-xs font-serif font-semibold tracking-wider uppercase transition-colors ${
              pageIndex <= 0
                ? "text-white/30 cursor-not-allowed"
                : "text-amber-100/80 hover:text-white cursor-pointer"
            }`}
          >
            ← PREV
          </button>

          {/* Progress Indicator Dots */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
              <button
                key={idx}
                onClick={() => setPageIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  pageIndex === idx
                    ? "w-7 sm:w-8 bg-amber-400 shadow-md shadow-amber-400/50"
                    : "w-2 bg-white/30 hover:bg-white/60"
                }`}
                aria-label={idx === 0 ? "Go to Prologue" : `Go to Chapter ${idx}`}
              />
            ))}
          </div>

          {/* Next / Conclusion Button */}
          <button
            onClick={handleNextPage}
            disabled={pageIndex >= 8}
            className={`text-xs font-serif font-semibold tracking-wider uppercase transition-colors ${
              pageIndex >= 8
                ? "text-white/30 cursor-not-allowed"
                : "text-amber-300 hover:text-amber-200 cursor-pointer font-bold"
            }`}
          >
            {pageIndex === 0
              ? "START STORY →"
              : pageIndex === 7
              ? "CONCLUSION →"
              : "NEXT →"}
          </button>
        </div>
      </div>
    </section>
  );
}
