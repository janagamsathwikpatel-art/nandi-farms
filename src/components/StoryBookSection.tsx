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
} from "lucide-react";
import "./StoryBookSection.css";

interface StoryPageData {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
}

const STORY_PAGES: StoryPageData[] = [
  {
    id: 1,
    title: "Where It Begins",
    subtitle: "Healthy cows and trusted local farms",
    image: "/storybook/story_page1.png",
    alt: "Y Daily Story - Where It Begins: Healthy cows and trusted farms",
  },
  {
    id: 2,
    title: "Pure Milk from Healthy Cows",
    subtitle: "Fresh hygienic milk collection at dawn",
    image: "/storybook/story_page2.png",
    alt: "Y Daily Story - Pure Milk from Healthy Cows",
  },
  {
    id: 3,
    title: "From Farm to Freshness",
    subtitle: "Filtration, immediate chilling to 4°C & laboratory checks",
    image: "/storybook/story_page3.png",
    alt: "Y Daily Story - From Farm to Freshness: Filtration and chilling",
  },
  {
    id: 4,
    title: "Hygienic Processing & Packing",
    subtitle: "Modern automated processing and glass bottling",
    image: "/storybook/story_page4.png",
    alt: "Y Daily Story - Hygienic Processing & Packing",
  },
  {
    id: 5,
    title: "Straight from the Farm",
    subtitle: "Fresh organic vegetables & seasonal produce",
    image: "/storybook/story_page5.png",
    alt: "Y Daily Story - Straight from the Farm Vegetables",
  },
  {
    id: 6,
    title: "Freshness at Your Doorstep",
    subtitle: "Cold-chain delivered to your home before 07:00 AM",
    image: "/storybook/story_page6.png",
    alt: "Y Daily Story - Freshness at Your Doorstep Delivery",
  },
  {
    id: 7,
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
  // isOpen: false = closed book cover, true = open story pages
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  // pageIndex: 1 to 8 (1 = Page 01, ..., 7 = Page 07, 8 = Final Epilogue Page)
  const [pageIndex, setPageIndex] = useState(1);

  // Page flip animation state: 'next' | 'prev' | null
  const [flipDirection, setFlipDirection] = useState<"next" | "prev" | null>(null);

  // Touch tracking for swipe gestures
  const touchStartXRef = useRef<number | null>(null);

  // Handle open book action
  const handleOpenBook = () => {
    setIsOpening(true);
    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
      setPageIndex(1);
    }, 850);
  };

  // Handle closing / resetting book
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
    }, 650);
  };

  // Previous Page
  const handlePrevPage = () => {
    if (pageIndex <= 1 || flipDirection) return;
    setFlipDirection("prev");
    setTimeout(() => {
      setPageIndex((prev) => Math.max(prev - 1, 1));
      setFlipDirection(null);
    }, 650);
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
    <section className="relative w-full py-16 md:py-24 bg-[#08120a] text-white overflow-hidden select-none">
      {/* Background Ambience & Golden Morning Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#14331d]/70 via-[#08120a] to-[#040805] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[550px] bg-amber-500/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wider uppercase mb-3 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Interactive 3D Storybook
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight">
            Our Journey from Dawn to Doorstep
          </h2>
          <p className="mt-3 text-sm md:text-base text-stone-300 font-sans">
            Turn the pages to experience how pure morning freshness is harvested, chilled, and delivered to your family.
          </p>
        </div>

        {/* =========================================================================
            STATE 1: FULL-LENGTH CLOSED HARDCOVER BOOK (2:1 Widescreen)
            ========================================================================= */}
        {!isOpen && (
          <div className="flex flex-col items-center justify-center storybook-viewport">
            {/* Full-Length Hardcover Book Container */}
            <div
              onClick={handleOpenBook}
              className={`relative cursor-pointer group transition-all duration-500 hover:scale-[1.01] w-full max-w-5xl ${
                isOpening ? "animate-cover-open-landscape" : ""
              }`}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Luxury Silk Bookmark Ribbon */}
              <div className="book-ribbon" />

              {/* Book Outer Binding Box */}
              <div className="relative w-full flex rounded-xl overflow-hidden book-thickness-shadow book-pages-stack-right book-pages-stack-bottom border-2 border-amber-400/30 bg-[#0d2614]">
                {/* Hardcover Spine on the left */}
                <div
                  className="w-8 sm:w-12 md:w-16 flex-shrink-0 bg-gradient-to-r from-[#0a1f10] via-[#163b1e] to-[#0e2914] flex flex-col justify-between py-6 items-center shadow-2xl border-r border-amber-500/30 z-20"
                  style={{
                    boxShadow: "inset -4px 0 10px rgba(0,0,0,0.7), -6px 0 20px rgba(0,0,0,0.6)",
                  }}
                >
                  <div className="w-1.5 h-6 bg-amber-400/40 rounded-full" />
                  <span className="text-[10px] md:text-xs tracking-[0.3em] text-amber-200/70 font-semibold uppercase -rotate-90 whitespace-nowrap">
                    Y DAILY • STORY
                  </span>
                  <div className="w-1.5 h-6 bg-amber-400/40 rounded-full" />
                </div>

                {/* Full-Length Master Cover Artwork (Exact 2:1 Aspect Ratio) */}
                <div className="relative flex-1 aspect-[2/1] bg-[#122e19] overflow-hidden">
                  <Image
                    src="/storybook/story_cover.png"
                    alt="Y Daily - A Daily Ritual of Freshness Full Length Cover"
                    fill
                    priority
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className="object-contain group-hover:scale-[1.015] transition-transform duration-700"
                  />

                  {/* Golden Embossed Cover Accent Border */}
                  <div className="absolute inset-2 md:inset-4 border border-amber-400/40 rounded-lg pointer-events-none" />
                  <div className="absolute inset-3 md:inset-6 border border-amber-400/20 rounded-md pointer-events-none" />

                  {/* Subtle Shimmer Sheen on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* "OPEN OUR STORY →" CTA Button below book */}
            <div className="mt-8 flex flex-col items-center gap-3">
              <button
                onClick={handleOpenBook}
                disabled={isOpening}
                className="group relative inline-flex items-center gap-3 px-8 md:px-10 py-3.5 md:py-4 rounded-full bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700 hover:from-emerald-600 hover:to-emerald-500 text-white font-serif text-lg tracking-wide shadow-xl shadow-emerald-950/60 hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105 active:scale-95 border border-emerald-400/40 cursor-pointer"
              >
                <BookOpen className="w-5 h-5 text-amber-300 transition-transform group-hover:rotate-12" />
                <span className="font-semibold">{isOpening ? "OPENING STORYBOOK..." : "OPEN OUR STORY →"}</span>
              </button>
              <span className="text-xs text-stone-400 font-sans tracking-wide">
                Click anywhere on the book or button to open full length story pages
              </span>
            </div>
          </div>
        )}

        {/* =========================================================================
            STATE 2: OPEN FULL-LENGTH 3D STORY PAGES (Pages 01 - 07 + Epilogue)
            ========================================================================= */}
        {isOpen && (
          <div
            className="flex flex-col items-center justify-center storybook-viewport w-full"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Toolbar: Stage indicator & Close Book */}
            <div className="w-full max-w-5xl flex items-center justify-between mb-4 px-2 text-stone-300">
              <div className="flex items-center gap-2">
                <span className="text-xs md:text-sm font-semibold tracking-widest uppercase text-emerald-400 font-serif">
                  {pageIndex <= 7 ? `STAGE 0${pageIndex} / 07` : "EPILOGUE"}
                </span>
                <span className="text-stone-500">•</span>
                <span className="text-xs md:text-sm text-stone-200 font-medium">
                  {pageIndex <= 7 ? currentPage?.title : "From Our Farms to Your Family"}
                </span>
              </div>

              <button
                onClick={handleCloseBook}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-900/90 hover:bg-stone-800 border border-stone-700 text-xs text-stone-300 hover:text-white transition-all cursor-pointer shadow-md"
                title="Return to closed book cover"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                <span>Close Book</span>
              </button>
            </div>

            {/* The Full-Length 3D Book Stage */}
            <div
              className="relative w-full max-w-5xl bg-[#122416] rounded-xl p-2 md:p-3 book-thickness-shadow border border-amber-500/30"
              style={{
                boxShadow: "0 30px 70px -15px rgba(0, 0, 0, 0.8), 0 0 50px rgba(18, 48, 25, 0.5)",
              }}
            >
              {/* Book Page Frame */}
              <div
                className="relative w-full rounded-lg overflow-hidden storybook-paper book-pages-stack-right book-pages-stack-bottom border border-stone-300/80"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Corner Curl Invitation on hover */}
                {pageIndex < 8 && (
                  <div
                    onClick={handleNextPage}
                    className="page-corner-curl hidden md:block"
                    title="Click corner to turn page"
                  />
                )}

                {/* Left Book Spine Binding strip */}
                <div
                  className="absolute top-0 bottom-0 left-0 w-4 md:w-6 bg-gradient-to-r from-[#0d2413] via-[#1b4324] to-[#123019] z-20 shadow-md border-r border-amber-500/20 pointer-events-none"
                />

                {/* Page Content Container */}
                <div className="relative w-full p-3 sm:p-5 md:p-6 pl-6 sm:pl-8 md:pl-10 flex flex-col justify-between">
                  {/* Page Top Header Bar */}
                  <div className="flex items-center justify-between text-[11px] md:text-xs tracking-wider text-stone-500 uppercase border-b border-stone-300/70 pb-2 mb-3">
                    <span className="font-serif font-bold text-emerald-950 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-700" />
                      Y DAILY STORYBOOK
                    </span>
                    <span className="font-mono text-stone-600 font-semibold">
                      {pageIndex <= 7 ? `PAGE 0${currentPage?.id} OF 07` : "CONCLUSION"}
                    </span>
                  </div>

                  {/* Page Main Graphic Stage (Full Length) */}
                  <div
                    onClick={handleNextPage}
                    className="relative w-full aspect-[16/9] sm:aspect-[1.85/1] md:aspect-[2/1] rounded bg-[#f6f2e8] border border-stone-200/90 shadow-inner overflow-hidden cursor-pointer group flex items-center justify-center"
                  >
                    {pageIndex <= 7 && currentPage ? (
                      /* Active Story Page Artwork - Full Length, No Cropping */
                      <div className="relative w-full h-full">
                        <Image
                          src={currentPage.image}
                          alt={currentPage.alt}
                          fill
                          priority
                          sizes="(max-width: 1200px) 100vw, 1200px"
                          className={`object-contain transition-transform duration-500 group-hover:scale-[1.01] ${
                            flipDirection === "next"
                              ? "animate-page-flip-forward"
                              : flipDirection === "prev"
                              ? "animate-page-flip-backward"
                              : ""
                          }`}
                        />
                      </div>
                    ) : (
                      /* =========================================================
                         STAGE 8: FINAL EPILOGUE BRAND PAGE
                         ========================================================= */
                      <div className="text-center p-6 md:p-12 max-w-xl flex flex-col items-center justify-center">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                          Our Daily Promise
                        </div>

                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
                          FROM OUR FARMS TO YOUR FAMILY
                        </h3>

                        <p className="mt-3 text-base md:text-lg text-emerald-900 font-serif italic">
                          &ldquo;Pure Today. Healthier Tomorrows.&rdquo;
                        </p>

                        <div className="w-20 h-0.5 bg-amber-500/50 my-4" />

                        <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed mb-6 max-w-md">
                          Experience true unadulterated freshness delivered to your doorstep every morning before sunrise.
                        </p>

                        {/* Green SHOP FRESH → Button */}
                        <button
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
                          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-emerald-800 hover:bg-emerald-700 text-white font-serif font-semibold text-base shadow-xl shadow-emerald-950/40 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-emerald-500/40"
                        >
                          <ShoppingBag className="w-5 h-5 text-amber-300" />
                          <span>SHOP FRESH →</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Page Bottom Footer Bar */}
                  <div className="mt-3 flex items-center justify-between text-[11px] md:text-xs text-stone-500 font-sans pt-2 border-t border-stone-300/70">
                    <span className="text-stone-700 font-medium">
                      {pageIndex <= 7 ? currentPage?.subtitle : "Pure A2 Dairy & Farm Produce"}
                    </span>
                    <span className="text-emerald-900 font-serif font-semibold hidden sm:inline">
                      {pageIndex < 8 ? "Click image to turn next →" : ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Navigation & Pagination Controls */}
            <div className="mt-6 flex items-center justify-between w-full max-w-2xl px-4">
              {/* Previous Button */}
              <button
                onClick={handlePrevPage}
                disabled={pageIndex <= 1}
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full border text-xs sm:text-sm font-serif font-semibold transition-all ${
                  pageIndex <= 1
                    ? "opacity-30 border-stone-800 text-stone-600 cursor-not-allowed"
                    : "border-stone-700 bg-stone-900/90 hover:bg-stone-800 text-stone-200 hover:text-white cursor-pointer hover:border-emerald-500/40 shadow-lg"
                }`}
              >
                <ChevronLeft className="w-4 h-4 text-emerald-400" />
                <span>PREVIOUS</span>
              </button>

              {/* Progress Indicator Dots */}
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
                    <button
                      key={idx}
                      onClick={() => setPageIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        pageIndex === idx
                          ? "w-7 sm:w-8 bg-emerald-400"
                          : "w-2 bg-stone-700 hover:bg-stone-500"
                      }`}
                      aria-label={`Jump to page ${idx}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-stone-400 font-mono">
                  {pageIndex <= 7 ? `0${pageIndex} / 07` : "FINAL / 07"}
                </span>
              </div>

              {/* Next Button */}
              <button
                onClick={handleNextPage}
                disabled={pageIndex >= 8}
                className={`inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full border text-xs sm:text-sm font-serif font-semibold transition-all ${
                  pageIndex >= 8
                    ? "opacity-30 border-stone-800 text-stone-600 cursor-not-allowed"
                    : "border-emerald-600/40 bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 hover:text-white cursor-pointer shadow-lg shadow-emerald-950/60"
                }`}
              >
                <span>{pageIndex === 7 ? "CONCLUSION" : "NEXT PAGE"}</span>
                <ChevronRight className="w-4 h-4 text-emerald-300" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
