"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  RotateCcw,
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  Sprout,
} from "lucide-react";
import "./StoryBookSection.css";

interface StoryPageData {
  id: number;
  stageNumber: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
}

const STORY_PAGES: StoryPageData[] = [
  {
    id: 1,
    stageNumber: "01",
    title: "Where It Begins",
    subtitle: "Healthy cows and trusted local farms",
    image: "/storybook/story_page1.png",
    alt: "Y Daily Story - Where It Begins: Healthy cows and trusted farms",
  },
  {
    id: 2,
    stageNumber: "02",
    title: "Pure Milk from Healthy Cows",
    subtitle: "Fresh hygienic milk collection at dawn",
    image: "/storybook/story_page2.png",
    alt: "Y Daily Story - Pure Milk from Healthy Cows",
  },
  {
    id: 3,
    stageNumber: "03",
    title: "From Farm to Freshness",
    subtitle: "Filtration, immediate chilling to 4°C & laboratory checks",
    image: "/storybook/story_page3.png",
    alt: "Y Daily Story - From Farm to Freshness: Filtration and chilling",
  },
  {
    id: 4,
    stageNumber: "04",
    title: "Hygienic Processing & Packing",
    subtitle: "Modern automated processing and glass bottling",
    image: "/storybook/story_page4.png",
    alt: "Y Daily Story - Hygienic Processing & Packing",
  },
  {
    id: 5,
    stageNumber: "05",
    title: "Straight from the Farm",
    subtitle: "Fresh organic vegetables & seasonal produce",
    image: "/storybook/story_page5.png",
    alt: "Y Daily Story - Straight from the Farm Vegetables",
  },
  {
    id: 6,
    stageNumber: "06",
    title: "Freshness at Your Doorstep",
    subtitle: "Cold-chain delivered to your home before 07:00 AM",
    image: "/storybook/story_page6.png",
    alt: "Y Daily Story - Freshness at Your Doorstep Delivery",
  },
  {
    id: 7,
    stageNumber: "07",
    title: "Goodness for Generations",
    subtitle: "Y Daily's enduring promise of uncompromised purity",
    image: "/storybook/story_page7.png",
    alt: "Y Daily Story - Goodness for Generations",
  },
];

interface StoryBookSectionProps {
  onShopFresh?: () => void;
}

export default function StoryBookSection({ onShopFresh }: StoryBookSectionProps) {
  // Book State:
  // isOpen: false = Full-bleed cover, true = Full-bleed story pages
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  // pageIndex: 1 to 8 (1 = Page 01, ..., 7 = Page 07, 8 = Epilogue Page)
  const [pageIndex, setPageIndex] = useState(1);

  // Transition state: 'next' | 'prev' | null
  const [flipDirection, setFlipDirection] = useState<"next" | "prev" | null>(null);

  // Touch tracking for swipe gestures
  const touchStartXRef = useRef<number | null>(null);

  // Open book transition
  const handleOpenBook = () => {
    setIsOpening(true);
    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
      setPageIndex(1);
    }, 600);
  };

  // Close book transition
  const handleCloseBook = () => {
    setIsOpen(false);
    setPageIndex(1);
    setFlipDirection(null);
  };

  // Next Page
  const handleNextPage = () => {
    if (pageIndex >= 8 || flipDirection) return;
    setFlipDirection("next");
    setTimeout(() => {
      setPageIndex((prev) => Math.min(prev + 1, 8));
      setFlipDirection(null);
    }, 500);
  };

  // Previous Page
  const handlePrevPage = () => {
    if (pageIndex <= 1 || flipDirection) return;
    setFlipDirection("prev");
    setTimeout(() => {
      setPageIndex((prev) => Math.max(prev - 1, 1));
      setFlipDirection(null);
    }, 500);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowRight") handleNextPage();
      if (e.key === "ArrowLeft") handlePrevPage();
      if (e.key === "Escape") handleCloseBook();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, pageIndex, flipDirection]);

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

  const currentPage = pageIndex <= 7 ? STORY_PAGES[pageIndex - 1] : null;

  return (
    <section
      className="storybook-fullwidth-section"
      aria-label="Y Daily Interactive 3D Storybook Showcase"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* =========================================================================
          STATE 1: FULL-WIDTH & FULL-LENGTH COVER SCREEN
          ========================================================================= */}
      {!isOpen && (
        <div className="relative w-full storybook-fullwidth-canvas flex flex-col justify-between">
          {/* Full-Bleed Edge-to-Edge Cover Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/storybook/story_cover.png"
              alt="Y Daily - A Daily Ritual of Freshness Full Width Cover"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* Subtle cinematic gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 pointer-events-none" />
          </div>

          {/* Top Floating Badge Bar */}
          <div className="relative z-20 w-full px-6 sm:px-12 pt-8 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full storybook-glass-panel text-emerald-300 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Interactive Storybook
            </div>
            <div className="text-white/80 text-xs font-sans tracking-widest uppercase hidden sm:block">
              Full-Length Experience • 07 Chapters
            </div>
          </div>

          {/* Bottom Floating Glass Action Card */}
          <div className="relative z-20 w-full px-6 sm:px-12 pb-12 flex flex-col items-center text-center">
            <div className="max-w-2xl storybook-glass-panel rounded-2xl p-6 sm:p-8 flex flex-col items-center">
              <div className="flex items-center gap-2 mb-2">
                <Sprout className="w-5 h-5 text-emerald-400" />
                <span className="font-serif text-amber-300 text-xs sm:text-sm tracking-[0.25em] uppercase font-bold">
                  Y DAILY ORIGINS
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight mb-3">
                A Daily Ritual of Freshness
              </h2>
              <p className="text-xs sm:text-sm text-stone-200 font-sans max-w-lg mb-6 leading-relaxed">
                Step inside our 3D storybook to experience how pure morning nourishment is harvested, chilled to 4°C, and delivered to your doorstep.
              </p>

              <button
                onClick={handleOpenBook}
                disabled={isOpening}
                className="group inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-400 text-white font-serif font-semibold text-base sm:text-lg tracking-wide shadow-2xl shadow-emerald-950/80 hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-105 active:scale-95 border border-emerald-300/40 cursor-pointer"
              >
                <BookOpen className="w-5 h-5 text-amber-300 transition-transform group-hover:rotate-12" />
                <span>{isOpening ? "OPENING STORYBOOK..." : "OPEN OUR STORY →"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          STATE 2: FULL-WIDTH & FULL-LENGTH SEQUENTIAL STORY PAGES (01 to 07 + Epilogue)
          ========================================================================= */}
      {isOpen && (
        <div className="relative w-full storybook-fullwidth-canvas flex flex-col justify-between storybook-viewport-full">
          {/* Active Story Page Artwork - Edge-to-Edge Full Width & Full Length */}
          {pageIndex <= 7 && currentPage ? (
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={currentPage.image}
                alt={currentPage.alt}
                fill
                priority
                sizes="100vw"
                className={`storybook-full-image ${
                  flipDirection === "next"
                    ? "animate-turn-forward"
                    : flipDirection === "prev"
                    ? "animate-turn-backward"
                    : ""
                }`}
              />
              {/* Subtle top and bottom protective gradients for readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70 pointer-events-none" />
            </div>
          ) : (
            /* ===================================================================
               STAGE 8: FULL-WIDTH CELEBRATORY EPILOGUE
               =================================================================== */
            <div className="absolute inset-0 w-full h-full bg-[#0a180e] flex items-center justify-center p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/40 via-[#0a180e] to-black pointer-events-none" />
              <div className="relative z-20 max-w-xl text-center flex flex-col items-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-5 shadow-inner">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Our Timeless Promise
                </div>

                <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
                  FROM OUR FARMS TO YOUR FAMILY
                </h3>

                <p className="mt-3 text-lg sm:text-xl text-amber-200/90 font-serif italic">
                  &ldquo;Pure Today. Healthier Tomorrows.&rdquo;
                </p>

                <div className="w-20 h-0.5 bg-amber-400/40 my-6" />

                <p className="text-sm sm:text-base text-stone-300 font-sans leading-relaxed mb-8 max-w-md">
                  Experience pure unadulterated freshness delivered quietly to your doorstep before the city awakens.
                </p>

                <button
                  onClick={() => {
                    if (onShopFresh) {
                      onShopFresh();
                    } else {
                      const catalog = document.getElementById("catalog");
                      if (catalog) {
                        catalog.scrollIntoView({ behavior: "smooth" });
                      }
                    }
                  }}
                  className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-400 text-white font-serif font-semibold text-lg shadow-2xl shadow-emerald-950/80 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-emerald-300/40"
                >
                  <ShoppingBag className="w-5 h-5 text-amber-300" />
                  <span>SHOP FRESH →</span>
                </button>
              </div>
            </div>
          )}

          {/* Floating Top Navigation HUD */}
          <div className="relative z-30 w-full px-6 sm:px-12 pt-6 flex items-center justify-between">
            <div className="inline-flex items-center gap-3 storybook-glass-panel px-4 py-2 rounded-full text-white shadow-xl">
              <span className="font-mono text-xs font-bold text-emerald-400 tracking-wider">
                {pageIndex <= 7 ? `CHAPTER 0${pageIndex} / 07` : "EPILOGUE"}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span className="font-serif text-xs sm:text-sm font-medium tracking-wide">
                {pageIndex <= 7 ? currentPage?.title : "From Our Farms to Your Family"}
              </span>
            </div>

            <button
              onClick={handleCloseBook}
              className="storybook-glass-btn px-4 py-2 rounded-full text-xs text-stone-200 hover:text-white flex items-center gap-1.5 cursor-pointer shadow-lg"
              title="Return to Cover Screen"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>Cover Screen</span>
            </button>
          </div>

          {/* Floating Left Side Navigation Arrow */}
          <button
            onClick={handlePrevPage}
            disabled={pageIndex <= 1}
            aria-label="Previous Page"
            className={`storybook-nav-arrow storybook-glass-btn left-4 sm:left-8 ${
              pageIndex <= 1 ? "opacity-25 pointer-events-none" : "text-white"
            }`}
          >
            <ChevronLeft className="w-6 h-6 text-emerald-400" />
          </button>

          {/* Floating Right Side Navigation Arrow */}
          <button
            onClick={handleNextPage}
            disabled={pageIndex >= 8}
            aria-label="Next Page"
            className={`storybook-nav-arrow storybook-glass-btn right-4 sm:right-8 ${
              pageIndex >= 8 ? "opacity-25 pointer-events-none" : "text-white"
            }`}
          >
            <ChevronRight className="w-6 h-6 text-emerald-400" />
          </button>

          {/* Floating Bottom Pagination HUD */}
          <div className="relative z-30 w-full px-6 pb-6 flex items-center justify-center">
            <div className="storybook-glass-panel px-5 py-2.5 rounded-full flex items-center gap-4 sm:gap-6 shadow-2xl">
              {/* Prev Pill */}
              <button
                onClick={handlePrevPage}
                disabled={pageIndex <= 1}
                className={`text-xs font-serif font-semibold tracking-wider uppercase transition-colors ${
                  pageIndex <= 1 ? "text-stone-600 cursor-not-allowed" : "text-stone-300 hover:text-white cursor-pointer"
                }`}
              >
                ← PREV
              </button>

              {/* Progress Indicator Dots */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => setPageIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      pageIndex === idx
                        ? "w-7 sm:w-8 bg-emerald-400 shadow-md shadow-emerald-400/50"
                        : "w-2 bg-white/30 hover:bg-white/60"
                    }`}
                    aria-label={`Jump to page ${idx}`}
                  />
                ))}
              </div>

              {/* Next / Conclusion Pill */}
              <button
                onClick={handleNextPage}
                disabled={pageIndex >= 8}
                className={`text-xs font-serif font-semibold tracking-wider uppercase transition-colors ${
                  pageIndex >= 8 ? "text-stone-600 cursor-not-allowed" : "text-emerald-400 hover:text-emerald-300 cursor-pointer"
                }`}
              >
                {pageIndex === 7 ? "CONCLUSION →" : "NEXT →"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
