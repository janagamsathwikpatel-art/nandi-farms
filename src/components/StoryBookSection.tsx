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
    image: "/storybook/story_page4_hd.png",
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
    image: "/storybook/story_page5_hd.png",
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
    image: "/storybook/story_page6_hd.png",
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
        {/* Physical Hardcover Book Casing (Exact Match to User Reference Screenshot) */}
        <div className="storybook-hardcover-casing">
          {pageIndex <= 7 && currentChapter ? (
            /* =================================================================
                PAGES 00 TO 07: PURE FULL-FRAME MASTER ARTWORK
                ================================================================= */
            <div className="storybook-card-inner">
              <Image
                key={currentChapter.image}
                src={currentChapter.image}
                alt={currentChapter.title}
                fill
                priority
                unoptimized
                sizes="(max-width: 1320px) 100vw, 1320px"
                className={`w-full h-full object-cover pointer-events-none select-none ${
                  flipDirection === "next"
                    ? "animate-story-turn-forward"
                    : flipDirection === "prev"
                    ? "animate-story-turn-backward"
                    : ""
                }`}
              />

              {/* Left 50% Click Zone -> Go Back */}
              {pageIndex > 0 && (
                <div
                  onClick={handlePrevPage}
                  className="absolute inset-y-0 left-0 w-1/2 z-20 cursor-w-resize"
                  title="Click left side to go back"
                  aria-label="Previous Page"
                />
              )}

              {/* Right 50% Click Zone -> Go Next (Full width on cover) */}
              <div
                onClick={handleNextPage}
                className={`absolute inset-y-0 right-0 z-20 cursor-e-resize ${
                  pageIndex === 0 ? "w-full" : "w-1/2"
                }`}
                title={
                  pageIndex === 0
                    ? "Click anywhere on cover to open our story"
                    : pageIndex === 7
                    ? "Click right side to view conclusion"
                    : "Click right side to continue"
                }
                aria-label="Next Page"
              />
            </div>
          ) : (
            /* =================================================================
                PAGE 08: EPILOGUE CONCLUSION SPREAD
                ================================================================= */
            <div className="storybook-card-inner storybook-epilogue-container">
              {/* Back to Chapter 07 click area on left */}
              <div
                onClick={handlePrevPage}
                className="absolute inset-y-0 left-0 w-1/4 z-20 cursor-w-resize"
                title="Click left to go back to Chapter 07"
                aria-label="Previous Page"
              />

              <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
                {/* Brand Emblem */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/10 border border-emerald-800/20 text-[#1b4324] mb-3">
                  <Sprout className="w-4 h-4 text-emerald-700" />
                  <span className="font-serif font-bold text-xs tracking-[0.25em] uppercase">
                    Y DAILY • HYDERABAD
                  </span>
                </div>

                {/* Headline */}
                <h3 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-[#142617] tracking-tight leading-tight mb-2">
                  From Our Farms, to Your Family.
                </h3>
                <p className="text-sm sm:text-base md:text-lg font-serif italic text-[#6d5b45] mb-6">
                  Pure Today. Healthier Tomorrows.
                </p>

                {/* 3 Value Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full my-3">
                  <div className="bg-[#ede4d1]/70 border border-[#dfd2be] rounded-xl p-3 sm:p-4 text-center">
                    <span className="text-xl sm:text-2xl block mb-1">🥛</span>
                    <span className="text-xs sm:text-sm font-serif font-bold text-[#1e3422] block">
                      100% Pure A2
                    </span>
                    <span className="text-[10px] text-[#6e5d48] font-sans">
                      Single-source Gir cow dairy
                    </span>
                  </div>
                  <div className="bg-[#ede4d1]/70 border border-[#dfd2be] rounded-xl p-3 sm:p-4 text-center">
                    <span className="text-xl sm:text-2xl block mb-1">🥬</span>
                    <span className="text-xs sm:text-sm font-serif font-bold text-[#1e3422] block">
                      Daily Harvest
                    </span>
                    <span className="text-[10px] text-[#6e5d48] font-sans">
                      Naturally grown vegetables
                    </span>
                  </div>
                  <div className="bg-[#ede4d1]/70 border border-[#dfd2be] rounded-xl p-3 sm:p-4 text-center">
                    <span className="text-xl sm:text-2xl block mb-1">🌅</span>
                    <span className="text-xs sm:text-sm font-serif font-bold text-[#1e3422] block">
                      Before 7:00 AM
                    </span>
                    <span className="text-[10px] text-[#6e5d48] font-sans">
                      Silent doorstep delivery
                    </span>
                  </div>
                </div>

                {/* Call to Action Buttons */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
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
                    className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#184523] hover:bg-[#12361b] text-white font-serif font-bold text-xs sm:text-sm tracking-wider uppercase shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-amber-300" />
                    <span>SHOP FRESH NOW →</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPageIndex(0);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/70 hover:bg-white text-[#4a3d2c] border border-[#cfbfa6] text-xs font-serif font-semibold transition-all cursor-pointer"
                  >
                    <span>↺ READ FROM START</span>
                  </button>
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
                aria-label={
                  idx === 0
                    ? "Go to Cover"
                    : idx === 8
                    ? "Go to Epilogue"
                    : `Go to Chapter ${idx}`
                }
              />
            ))}
          </div>

          {/* Next Button */}
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
              : pageIndex === 8
              ? "COMPLETED"
              : "NEXT →"}
          </button>
        </div>
      </div>
    </section>
  );
}
