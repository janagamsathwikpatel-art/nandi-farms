"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ShoppingBag,
  CheckCircle2,
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
    id: 0,
    stageNumber: "COVER",
    title: "A Daily Ritual of Freshness",
    subtitle: "Y Daily Origins & Dawn Milk Harvest",
    image: "/storybook/story_cover.png",
    alt: "Y Daily Story Cover - A Daily Ritual of Freshness",
  },
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
  // pageIndex: 0 = Cover, 1 to 7 = Story Pages, 8 = Epilogue
  const [pageIndex, setPageIndex] = useState(0);

  // Transition state: 'next' | 'prev' | null
  const [flipDirection, setFlipDirection] = useState<"next" | "prev" | null>(null);

  // Touch tracking for swipe gestures
  const touchStartXRef = useRef<number | null>(null);

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
    if (pageIndex <= 0 || flipDirection) return;
    setFlipDirection("prev");
    setTimeout(() => {
      setPageIndex((prev) => Math.max(prev - 1, 0));
      setFlipDirection(null);
    }, 500);
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

  const currentPage = pageIndex <= 7 ? STORY_PAGES[pageIndex] : null;

  return (
    <section
      className="storybook-fullwidth-section"
      aria-label="Y Daily Interactive 3D Storybook Showcase"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative storybook-fullwidth-canvas flex flex-col justify-between storybook-viewport-full">
        {/* ===================================================================
            FULL-WIDTH & FULL-LENGTH ARTWORK (Cover to Page 07)
            =================================================================== */}
        {pageIndex <= 7 && currentPage ? (
          <div
            onClick={handleNextPage}
            className="absolute inset-0 w-full h-full cursor-pointer"
          >
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
      </div>

      {/* Dedicated Bottom Navigation Bar (Below the section image on Parchment Background) */}
      <div className="relative z-30 w-full py-6 bg-[#f4ebde] bg-[url('/images/parchment-texture-bg.png')] bg-repeat border-t border-[#e2d5c2] flex items-center justify-center">
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
                aria-label={idx === 0 ? "Go to Cover" : `Go to Page ${idx}`}
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
