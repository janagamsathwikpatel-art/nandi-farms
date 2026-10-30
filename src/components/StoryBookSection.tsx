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
  ArrowRight,
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
  // isOpen: false = closed book, true = open book
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  // pageIndex: 1 to 8 (1 = Page 01, ..., 7 = Page 07, 8 = Final Page)
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
    }, 900);
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
    }, 700);
  };

  // Previous Page
  const handlePrevPage = () => {
    if (pageIndex <= 1 || flipDirection) return;
    setFlipDirection("prev");
    setTimeout(() => {
      setPageIndex((prev) => Math.max(prev - 1, 1));
      setFlipDirection(null);
    }, 700);
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
      handleNextPage(); // Swiped left -> Go forward
    } else if (diffX < -50) {
      handlePrevPage(); // Swiped right -> Go back
    }
    touchStartXRef.current = null;
  };

  // Resolve left and right page content
  // When pageIndex = 1: Left is Book Preface/Intro, Right is Page 01
  // When pageIndex = 2: Left is Page 01, Right is Page 02
  // ...
  // When pageIndex = 8: Left is Page 07, Right is Final Page
  const leftPageData = pageIndex > 1 ? STORY_PAGES[pageIndex - 2] : null;
  const rightPageData = pageIndex <= 7 ? STORY_PAGES[pageIndex - 1] : null;

  // Active turning page data during animation
  const turningPageData =
    flipDirection === "next"
      ? rightPageData
      : flipDirection === "prev"
      ? leftPageData
      : null;

  return (
    <section className="relative w-full py-16 md:py-24 bg-[#0a140d] text-white overflow-hidden select-none">
      {/* Background Ambience & Golden Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#173a21]/60 via-[#0a140d] to-[#050b07] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
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
            STATE 1: CLOSED HARDCOVER BOOK
            ========================================================================= */}
        {!isOpen && (
          <div className="flex flex-col items-center justify-center storybook-viewport min-h-[580px] md:min-h-[640px]">
            {/* 3D Hardcover Book Container */}
            <div
              onClick={handleOpenBook}
              className={`relative cursor-pointer group transition-transform duration-500 hover:scale-[1.02] ${
                isOpening ? "animate-cover-open" : ""
              }`}
              style={{
                width: "min(92vw, 520px)",
                aspectRatio: "1.25 / 1",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Ribbon Bookmark hanging out */}
              <div className="book-ribbon" />

              {/* Hardcover Spine on the left */}
              <div
                className="absolute top-0 bottom-0 left-0 w-8 md:w-10 bg-gradient-to-r from-[#0d2614] via-[#1b4324] to-[#14361c] rounded-l-lg z-20 flex flex-col justify-between py-6 items-center shadow-2xl border-r border-amber-500/20"
                style={{
                  boxShadow: "inset -4px 0 8px rgba(0,0,0,0.6), -6px 0 15px rgba(0,0,0,0.5)",
                }}
              >
                <div className="w-1.5 h-6 bg-amber-400/40 rounded-full" />
                <span className="text-[10px] tracking-[0.25em] text-amber-200/60 font-semibold uppercase -rotate-90 whitespace-nowrap">
                  Y DAILY • STORY
                </span>
                <div className="w-1.5 h-6 bg-amber-400/40 rounded-full" />
              </div>

              {/* Main Hardcover Front Plate */}
              <div
                className="absolute inset-0 ml-7 md:ml-9 rounded-r-xl overflow-hidden bg-[#16301d] border-2 border-amber-400/30 book-thickness-shadow book-pages-stack-right book-pages-stack-bottom"
              >
                {/* Master Cover Artwork */}
                <div className="relative w-full h-full">
                  <Image
                    src="/storybook/story_cover.png"
                    alt="Y Daily - A Daily Ritual of Freshness Hardcover"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 550px"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                  {/* Subtle golden foil overlay on cover edges */}
                  <div className="absolute inset-2 md:inset-3 border border-amber-300/40 rounded-lg pointer-events-none" />
                  <div className="absolute inset-3 md:inset-4 border border-amber-300/20 rounded-md pointer-events-none" />
                </div>
              </div>
            </div>

            {/* "OPEN OUR STORY →" CTA Button below book */}
            <div className="mt-10 flex flex-col items-center gap-3">
              <button
                onClick={handleOpenBook}
                disabled={isOpening}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700 hover:from-emerald-600 hover:to-emerald-500 text-white font-serif text-lg tracking-wide shadow-xl shadow-emerald-950/50 hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105 active:scale-95 border border-emerald-400/30 cursor-pointer"
              >
                <BookOpen className="w-5 h-5 text-amber-300 transition-transform group-hover:rotate-12" />
                <span>{isOpening ? "OPENING THE STORY..." : "OPEN OUR STORY →"}</span>
              </button>
              <span className="text-xs text-stone-400 font-sans tracking-wide">
                Click the book or button to turn the 3D pages
              </span>
            </div>
          </div>
        )}

        {/* =========================================================================
            STATE 2: OPEN DOUBLE-PAGE 3D SPREAD
            ========================================================================= */}
        {isOpen && (
          <div
            className="flex flex-col items-center justify-center storybook-viewport"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Toolbar: Stage indicator & Re-read / Close book */}
            <div className="w-full max-w-5xl flex items-center justify-between mb-4 px-2 text-stone-300">
              <div className="flex items-center gap-2">
                <span className="text-xs md:text-sm font-medium tracking-widest uppercase text-emerald-400 font-serif">
                  {pageIndex <= 7 ? `CHAPTER 0${pageIndex} / 07` : "EPILOGUE"}
                </span>
                <span className="text-stone-500">•</span>
                <span className="text-xs md:text-sm text-stone-300 hidden sm:inline">
                  {pageIndex <= 7 ? STORY_PAGES[pageIndex - 1].title : "From Our Farms to Your Family"}
                </span>
              </div>

              <button
                onClick={handleCloseBook}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900/80 hover:bg-stone-800 border border-stone-700 text-xs text-stone-300 hover:text-white transition-all cursor-pointer shadow-md"
                title="Close book and return to cover"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                <span>Close Book</span>
              </button>
            </div>

            {/* The 3D Open Book Structure */}
            <div
              className="relative w-full max-w-5xl bg-[#142618] rounded-xl p-2 md:p-3.5 book-thickness-shadow border border-amber-500/20"
              style={{
                boxShadow:
                  "0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px rgba(18, 48, 25, 0.4)",
              }}
            >
              {/* Desktop Spread (Two visible pages) */}
              <div
                className="relative w-full rounded-lg overflow-hidden flex flex-col md:flex-row min-h-[460px] md:min-h-[580px] storybook-paper"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* =============================================================
                    LEFT PAGE SPREAD
                    ============================================================= */}
                <div
                  onClick={handlePrevPage}
                  className={`storybook-page-content relative w-full md:w-1/2 p-4 md:p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-300/40 cursor-pointer group book-pages-stack-left`}
                >
                  {/* Subtle Spine shadow along the right edge */}
                  <div className="absolute top-0 bottom-0 right-0 w-12 storybook-spine-shadow-left pointer-events-none hidden md:block z-10" />

                  {/* Left Page Header */}
                  <div className="flex items-center justify-between text-[11px] tracking-wider text-stone-500 uppercase border-b border-stone-300/60 pb-2 mb-3">
                    <span className="font-serif font-bold text-emerald-950">Y DAILY</span>
                    <span>
                      {pageIndex === 1
                        ? "PROLOGUE"
                        : `PAGE 0${leftPageData?.id || pageIndex - 1}`}
                    </span>
                  </div>

                  {/* Left Page Body */}
                  <div className="relative flex-1 flex items-center justify-center overflow-hidden rounded bg-[#f7f4ec] border border-stone-200/80 shadow-inner p-1.5 md:p-2.5">
                    {pageIndex === 1 ? (
                      /* Prologue / Inside Cover Screen */
                      <div className="text-center p-6 md:p-8 max-w-sm flex flex-col items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-emerald-900/10 border border-emerald-800/20 flex items-center justify-center mb-4 text-emerald-900">
                          <BookOpen className="w-6 h-6 text-emerald-800" />
                        </div>
                        <span className="text-[11px] uppercase tracking-[0.2em] text-emerald-800 font-semibold mb-2">
                          A Daily Ritual of Freshness
                        </span>
                        <h3 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 leading-tight mb-3">
                          The Y Daily Story
                        </h3>
                        <div className="w-12 h-0.5 bg-amber-600/40 my-2" />
                        <p className="text-xs md:text-sm text-stone-600 font-sans leading-relaxed mt-2">
                          Every drop of pure A2 milk tells a story of dawn collection, immediate 4°C chilling, and cold-chain doorstep delivery before the city awakens.
                        </p>
                        <p className="mt-4 text-[11px] text-stone-400 italic font-serif">
                          Turn the page to begin our journey →
                        </p>
                      </div>
                    ) : leftPageData ? (
                      /* Previous story image */
                      <div className="relative w-full h-full min-h-[300px] md:min-h-[420px] flex items-center justify-center">
                        <Image
                          src={leftPageData.image}
                          alt={leftPageData.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 500px"
                          className="object-contain rounded"
                        />
                      </div>
                    ) : null}
                  </div>

                  {/* Left Page Footer */}
                  <div className="mt-3 flex items-center justify-between text-[11px] text-stone-500 font-sans pt-2 border-t border-stone-300/60">
                    <span>
                      {pageIndex === 1 ? "Ritual of Purity" : leftPageData?.title}
                    </span>
                    <span className="text-emerald-900 font-serif font-semibold">
                      {pageIndex > 1 ? `← Click to turn back` : ""}
                    </span>
                  </div>
                </div>

                {/* Center Book Spine Divider on Desktop */}
                <div
                  className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-3 bg-gradient-to-r from-stone-400 via-stone-700 to-stone-400 z-20 shadow-2xl"
                  style={{
                    boxShadow:
                      "inset 0 0 8px rgba(0,0,0,0.6), 0 0 10px rgba(0,0,0,0.4)",
                  }}
                />

                {/* =============================================================
                    RIGHT PAGE SPREAD
                    ============================================================= */}
                <div
                  onClick={handleNextPage}
                  className={`storybook-page-content relative w-full md:w-1/2 p-4 md:p-6 flex flex-col justify-between cursor-pointer group book-pages-stack-right`}
                >
                  {/* Subtle Spine shadow along the left edge */}
                  <div className="absolute top-0 bottom-0 left-0 w-12 storybook-spine-shadow-right pointer-events-none hidden md:block z-10" />

                  {/* Corner Curl Invitation on hover */}
                  {pageIndex < 8 && <div className="page-corner-curl hidden md:block" />}

                  {/* Right Page Header */}
                  <div className="flex items-center justify-between text-[11px] tracking-wider text-stone-500 uppercase border-b border-stone-300/60 pb-2 mb-3">
                    <span>
                      {pageIndex <= 7
                        ? `PAGE 0${rightPageData?.id}`
                        : "CONCLUSION"}
                    </span>
                    <span className="font-serif font-bold text-emerald-950">
                      Y DAILY
                    </span>
                  </div>

                  {/* Right Page Body */}
                  <div className="relative flex-1 flex items-center justify-center overflow-hidden rounded bg-[#f7f4ec] border border-stone-200/80 shadow-inner p-1.5 md:p-2.5">
                    {pageIndex <= 7 && rightPageData ? (
                      /* Active Story Page Image */
                      <div className="relative w-full h-full min-h-[300px] md:min-h-[420px] flex items-center justify-center">
                        <Image
                          src={rightPageData.image}
                          alt={rightPageData.alt}
                          fill
                          priority={pageIndex <= 2}
                          sizes="(max-width: 768px) 100vw, 500px"
                          className="object-contain rounded"
                        />
                      </div>
                    ) : (
                      /* =========================================================
                         STAGE 8: FINAL BRAND PAGE (After Page 07)
                         ========================================================= */
                      <div className="text-center p-6 md:p-10 max-w-md flex flex-col items-center justify-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-semibold uppercase tracking-wider mb-4">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                          Our Daily Promise
                        </div>

                        <h3 className="text-2xl md:text-4xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
                          FROM OUR FARMS TO YOUR FAMILY
                        </h3>

                        <p className="mt-3 text-sm md:text-base text-stone-600 font-serif italic">
                          &ldquo;Pure Today. Healthier Tomorrows.&rdquo;
                        </p>

                        <div className="w-16 h-0.5 bg-amber-500/40 my-5" />

                        <p className="text-xs md:text-sm text-stone-600 font-sans leading-relaxed mb-6">
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
                          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-emerald-800 hover:bg-emerald-700 text-white font-serif font-semibold text-base shadow-xl shadow-emerald-900/30 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-emerald-600/30"
                        >
                          <ShoppingBag className="w-4 h-4 text-amber-300" />
                          <span>SHOP FRESH →</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Right Page Footer */}
                  <div className="mt-3 flex items-center justify-between text-[11px] text-stone-500 font-sans pt-2 border-t border-stone-300/60">
                    <span className="text-emerald-900 font-serif font-semibold">
                      {pageIndex < 8 ? `Click to turn next →` : ""}
                    </span>
                    <span>
                      {pageIndex <= 7 ? rightPageData?.title : "Y Daily Family"}
                    </span>
                  </div>
                </div>

                {/* Animated 3D Flipping Page Overlay */}
                {flipDirection && turningPageData && (
                  <div
                    className={`absolute top-0 bottom-0 ${
                      flipDirection === "next"
                        ? "left-1/2 w-1/2 origin-left"
                        : "left-0 w-1/2 origin-right"
                    } z-30 pointer-events-none flip-page-container`}
                    style={{
                      transform:
                        flipDirection === "next"
                          ? "rotateY(-180deg)"
                          : "rotateY(180deg)",
                    }}
                  >
                    <div className="w-full h-full p-4 md:p-6 storybook-paper border border-stone-300 shadow-2xl relative">
                      <div className="relative w-full h-full flex items-center justify-center">
                        <Image
                          src={turningPageData.image}
                          alt={turningPageData.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 500px"
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Navigation & Pagination Controls */}
            <div className="mt-6 flex items-center justify-between w-full max-w-xl px-4">
              {/* Previous Button */}
              <button
                onClick={handlePrevPage}
                disabled={pageIndex <= 1}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs md:text-sm font-serif font-semibold transition-all ${
                  pageIndex <= 1
                    ? "opacity-30 border-stone-800 text-stone-600 cursor-not-allowed"
                    : "border-stone-700 bg-stone-900/90 hover:bg-stone-800 text-stone-200 hover:text-white cursor-pointer hover:border-emerald-500/40 shadow-lg"
                }`}
              >
                <ChevronLeft className="w-4 h-4 text-emerald-400" />
                <span>PREVIOUS</span>
              </button>

              {/* Progress Indicator Dots / Numerical */}
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1.5 mb-1.5">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
                    <button
                      key={idx}
                      onClick={() => setPageIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        pageIndex === idx
                          ? "w-6 bg-emerald-400"
                          : "w-1.5 bg-stone-700 hover:bg-stone-500"
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
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs md:text-sm font-serif font-semibold transition-all ${
                  pageIndex >= 8
                    ? "opacity-30 border-stone-800 text-stone-600 cursor-not-allowed"
                    : "border-emerald-600/40 bg-emerald-900/70 hover:bg-emerald-800 text-emerald-200 hover:text-white cursor-pointer shadow-lg shadow-emerald-950/50"
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
