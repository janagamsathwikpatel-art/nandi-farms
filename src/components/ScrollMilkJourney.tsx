"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

interface ScrollMilkJourneyProps {
  onShopFresh?: () => void;
}

export default function ScrollMilkJourney({ onShopFresh }: ScrollMilkJourneyProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Entrance trigger when section approaches viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (videoRef.current && videoRef.current.paused) {
            videoRef.current.play().catch(() => {});
          }
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Smooth scroll parallax for bottle movement as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const totalDist = windowHeight + rect.height;
      const currentDist = windowHeight - rect.top;
      const progress = Math.min(Math.max(currentDist / totalDist, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ensure continuous looping video playback without interruption
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, []);

  // Parallax calculations
  const bottleTranslateY = isVisible ? (scrollProgress - 0.5) * -35 : 40;
  const bottleScale = isVisible ? 1 : 0.96;
  const bottleOpacity = isVisible ? 1 : 0;
  const shadowScale = 0.9 + scrollProgress * 0.18;

  return (
    <section
      ref={sectionRef}
      id="scroll-milk-journey"
      className="relative w-full bg-[#FAF6ED] py-16 sm:py-20 lg:py-28 px-4 sm:px-8 lg:px-12 select-none overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto">
        
        {/* ========================================================= */}
        {/* 1. SECTION HEADING (Centred with strong visual hierarchy) */}
        {/* ========================================================= */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          <p className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#193E2D] mb-3">
            THE MILK JOURNEY
          </p>
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#193E2D] mb-4 leading-tight">
            From Farm to Your Door
          </h2>
          <p className="text-sm sm:text-base text-[#193E2D]/75 font-normal">
            Discover the story behind your daily bottle.
          </p>
        </div>

        {/* ========================================================= */}
        {/* 2. MAIN 3-COLUMN DESKTOP / BALANCED LAYOUT                */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 items-center">
          
          {/* ------------------------------------------------------- */}
          {/* A. LEFT CONTENT BLOCKS (Desktop: Col 1-3)               */}
          {/* Mobile Order: After central video                       */}
          {/* ------------------------------------------------------- */}
          <div className="order-2 lg:order-1 lg:col-span-3 flex flex-col justify-around gap-6 sm:gap-8 lg:gap-10 h-full py-2">
            
            {/* Block 01 */}
            <div className="group text-left p-6 sm:p-7 rounded-2xl bg-white/75 backdrop-blur-xs border border-[#193E2D]/[0.08] shadow-[0_4px_20px_-4px_rgba(25,62,45,0.04)] hover:bg-white hover:shadow-[0_10px_28px_-6px_rgba(25,62,45,0.08)] transition-all duration-300">
              <div className="flex items-center gap-3 mb-2.5">
                <span className="inline-block text-[11px] font-bold text-[#193E2D] px-2.5 py-1 rounded-full bg-[#193E2D]/10 tracking-wide">
                  01
                </span>
                <h3 className="font-playfair text-xl sm:text-2xl font-normal text-[#193E2D] tracking-tight">
                  At the Farm
                </h3>
              </div>
              <p className="text-[11px] font-semibold text-[#193E2D]/90 uppercase tracking-wider mb-2">
                Ethical Cattle Care • 100% Grass-Fed
              </p>
              <p className="text-xs sm:text-sm text-[#193E2D]/80 leading-relaxed font-normal mb-4">
                Gently collected before sunrise from free-grazing indigenous Hallikar, Desi Gir &amp; Murrah cattle nourished on organic green fodder. Zero synthetic hormones, zero antibiotics, and zero commercial feed.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 border-t border-[#193E2D]/5">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#193E2D] bg-[#193E2D]/5 px-2.5 py-1 rounded-full">
                  <CheckCircle2 className="w-3 h-3 text-[#193E2D]" />
                  100% Grass-Fed
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#193E2D] bg-[#193E2D]/5 px-2.5 py-1 rounded-full">
                  <CheckCircle2 className="w-3 h-3 text-[#193E2D]" />
                  Desi A2 Purity
                </span>
              </div>
            </div>

            {/* Block 02 */}
            <div className="group text-left p-6 sm:p-7 rounded-2xl bg-white/75 backdrop-blur-xs border border-[#193E2D]/[0.08] shadow-[0_4px_20px_-4px_rgba(25,62,45,0.04)] hover:bg-white hover:shadow-[0_10px_28px_-6px_rgba(25,62,45,0.08)] transition-all duration-300">
              <div className="flex items-center gap-3 mb-2.5">
                <span className="inline-block text-[11px] font-bold text-[#193E2D] px-2.5 py-1 rounded-full bg-[#193E2D]/10 tracking-wide">
                  02
                </span>
                <h3 className="font-playfair text-xl sm:text-2xl font-normal text-[#193E2D] tracking-tight">
                  Careful Handling
                </h3>
              </div>
              <p className="text-[11px] font-semibold text-[#193E2D]/90 uppercase tracking-wider mb-2">
                4°C Cold Chain • Untouched Raw Goodness
              </p>
              <p className="text-xs sm:text-sm text-[#193E2D]/80 leading-relaxed font-normal mb-4">
                Drawn through automated, sanitized stainless lines directly into sealed tanks. Flash-chilled to 4°C within 45 mins to preserve vital living enzymes, vitamins, and the natural intact cream-top layer.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 border-t border-[#193E2D]/5">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#193E2D] bg-[#193E2D]/5 px-2.5 py-1 rounded-full">
                  <CheckCircle2 className="w-3 h-3 text-[#193E2D]" />
                  Chilled to 4°C
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#193E2D] bg-[#193E2D]/5 px-2.5 py-1 rounded-full">
                  <CheckCircle2 className="w-3 h-3 text-[#193E2D]" />
                  Whole Cream Top
                </span>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------- */}
          {/* B. CENTRAL SEAMLESS VIDEO (Desktop: Col 4-9, 50%)       */}
          {/* Seamless #FAF6ED background, NO box, continuous loop    */}
          {/* ------------------------------------------------------- */}
          <div className="order-1 lg:order-2 md:col-span-2 lg:col-span-6 flex flex-col items-center justify-center relative">
            <div
              className="relative w-full max-w-[540px] flex flex-col items-center justify-center transition-all duration-700 ease-out"
              style={{
                transform: `translateY(${bottleTranslateY}px) scale(${bottleScale})`,
                opacity: bottleOpacity,
              }}
            >
              {/* Diffused Floor Shadow Under Bottle Base */}
              <div
                className="absolute bottom-6 sm:bottom-8 w-52 sm:w-68 h-7 sm:h-9 rounded-[100%] bg-black/15 blur-lg pointer-events-none transition-transform duration-300"
                style={{
                  transform: `scale(${shadowScale})`,
                }}
              />

              {/* Seamless Video Element: Continuous Milk Pouring with Cream Background */}
              <div className="relative w-full aspect-video flex items-center justify-center pointer-events-none select-none overflow-hidden">
                <video
                  ref={videoRef}
                  src="/videos/milk-pouring-cream-seamless.mp4"
                  poster="/images/milk-video-poster-seamless.jpg"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Subtle Quality Status Badge */}
              <div className="mt-3 px-4 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-[#193E2D]/10 shadow-[0_4px_16px_rgba(25,62,45,0.06)] flex items-center gap-2 pointer-events-none">
                <Sparkles className="w-3.5 h-3.5 text-[#193E2D]" />
                <span className="text-[11px] sm:text-xs font-medium text-[#193E2D] tracking-wide">
                  Single-Origin Pure A2 Farm Milk • Bottled Daily
                </span>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------- */}
          {/* C. RIGHT CONTENT BLOCKS (Desktop: Col 10-12)            */}
          {/* Mobile Order: Follows blocks 01 & 02                     */}
          {/* ------------------------------------------------------- */}
          <div className="order-3 lg:order-3 lg:col-span-3 flex flex-col justify-around gap-6 sm:gap-8 lg:gap-10 h-full py-2">
            
            {/* Block 03 */}
            <div className="group text-left p-6 sm:p-7 rounded-2xl bg-white/75 backdrop-blur-xs border border-[#193E2D]/[0.08] shadow-[0_4px_20px_-4px_rgba(25,62,45,0.04)] hover:bg-white hover:shadow-[0_10px_28px_-6px_rgba(25,62,45,0.08)] transition-all duration-300">
              <div className="flex items-center gap-3 mb-2.5">
                <span className="inline-block text-[11px] font-bold text-[#193E2D] px-2.5 py-1 rounded-full bg-[#193E2D]/10 tracking-wide">
                  03
                </span>
                <h3 className="font-playfair text-xl sm:text-2xl font-normal text-[#193E2D] tracking-tight">
                  Glass Bottles
                </h3>
              </div>
              <p className="text-[11px] font-semibold text-[#193E2D]/90 uppercase tracking-wider mb-2">
                Zero Microplastics • Pure Morning Taste
              </p>
              <p className="text-xs sm:text-sm text-[#193E2D]/80 leading-relaxed font-normal mb-4">
                Bottled in clinical-grade, sterilized 500ml glass jars that eliminate microplastic leaching and preserve dawn taste. Hermetically sealed with a gold-foil crown cap for uncompromised freshness.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 border-t border-[#193E2D]/5">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#193E2D] bg-[#193E2D]/5 px-2.5 py-1 rounded-full">
                  <CheckCircle2 className="w-3 h-3 text-[#193E2D]" />
                  Sterilized Glass
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#193E2D] bg-[#193E2D]/5 px-2.5 py-1 rounded-full">
                  <CheckCircle2 className="w-3 h-3 text-[#193E2D]" />
                  Zero Plastic
                </span>
              </div>
            </div>

            {/* Block 04 */}
            <div className="group text-left p-6 sm:p-7 rounded-2xl bg-white/75 backdrop-blur-xs border border-[#193E2D]/[0.08] shadow-[0_4px_20px_-4px_rgba(25,62,45,0.04)] hover:bg-white hover:shadow-[0_10px_28px_-6px_rgba(25,62,45,0.08)] transition-all duration-300">
              <div className="flex items-center gap-3 mb-2.5">
                <span className="inline-block text-[11px] font-bold text-[#193E2D] px-2.5 py-1 rounded-full bg-[#193E2D]/10 tracking-wide">
                  04
                </span>
                <h3 className="font-playfair text-xl sm:text-2xl font-normal text-[#193E2D] tracking-tight">
                  To Your Doorstep
                </h3>
              </div>
              <p className="text-[11px] font-semibold text-[#193E2D]/90 uppercase tracking-wider mb-2">
                Morning 06:30 AM • Flexible Subscription
              </p>
              <p className="text-xs sm:text-sm text-[#193E2D]/80 leading-relaxed font-normal mb-4">
                Delivered cold to your doorstep before 6:30 AM every morning. Enjoy effortless control with flexible one-tap pause, vacation holds, and quantity updates via your mobile account.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 border-t border-[#193E2D]/5">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#193E2D] bg-[#193E2D]/5 px-2.5 py-1 rounded-full">
                  <CheckCircle2 className="w-3 h-3 text-[#193E2D]" />
                  By 06:30 AM
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#193E2D] bg-[#193E2D]/5 px-2.5 py-1 rounded-full">
                  <CheckCircle2 className="w-3 h-3 text-[#193E2D]" />
                  Easy Pause &amp; Play
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. MAIN BUTTON (Centred dark green button below layout)   */}
        {/* ========================================================= */}
        <div className="mt-14 sm:mt-18 lg:mt-22 flex justify-center">
          {onShopFresh ? (
            <button
              type="button"
              onClick={onShopFresh}
              className="inline-flex items-center gap-3 bg-[#193E2D] text-white px-8 py-4 rounded-full text-base font-medium shadow-md hover:bg-[#122e21] hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              <span>Explore Milk Plans</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          ) : (
            <Link
              href="/shop/milk"
              className="inline-flex items-center gap-3 bg-[#193E2D] text-white px-8 py-4 rounded-full text-base font-medium shadow-md hover:bg-[#122e21] hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              <span>Explore Milk Plans</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
