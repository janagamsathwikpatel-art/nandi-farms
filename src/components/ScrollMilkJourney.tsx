"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

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

  // Smooth scroll parallax: move the bottle as the user scrolls through the section
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

  // Ensure continuous looping video playback
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

  // Scroll-driven parallax offsets
  const bottleTranslateY = isVisible ? (scrollProgress - 0.5) * -50 : 45;
  const bottleScale = isVisible ? 1 : 0.95;
  const bottleOpacity = isVisible ? 1 : 0;
  const shadowScale = 0.9 + scrollProgress * 0.2;

  return (
    <section
      ref={sectionRef}
      id="scroll-milk-journey"
      className="relative w-full bg-[#FAF6ED] py-16 sm:py-20 lg:py-24 px-4 sm:px-8 select-none overflow-hidden"
    >
      {/* SVG Definitions for Seamless Bottle Silhouette Clipping */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <clipPath id="seamless-bottle-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.47 0.0 L 0.53 0.0 L 0.53 0.22 C 0.55 0.22 0.57 0.24 0.57 0.26 L 0.57 0.35 C 0.57 0.42 0.69 0.46 0.69 0.52 L 0.69 0.90 C 0.69 0.94 0.65 0.96 0.50 0.96 C 0.35 0.96 0.31 0.94 0.31 0.90 L 0.31 0.52 C 0.31 0.46 0.43 0.42 0.43 0.35 L 0.43 0.26 C 0.43 0.24 0.45 0.22 0.47 0.22 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="max-w-[1280px] mx-auto flex flex-col items-center">
        
        {/* ========================================================= */}
        {/* 1. SECTION HEADING (Centred with strong visual hierarchy) */}
        {/* ========================================================= */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <p className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#193E2D] mb-3">
            THE MILK JOURNEY
          </p>
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#193E2D] mb-3 leading-tight">
            From Farm to Your Door
          </h2>
          <p className="text-sm sm:text-base text-[#193E2D]/75 font-normal">
            Discover the story behind your daily bottle.
          </p>
        </div>

        {/* ========================================================= */}
        {/* 2. CENTERED HERO BOTTLE WITH CONTINUOUS VIDEO FILLING     */}
        {/* (No side cards - pure focus on moving 3D bottle)          */}
        {/* ========================================================= */}
        <div className="relative w-full flex flex-col items-center justify-center my-4 sm:my-6">
          
          <div
            className="relative w-full max-w-[420px] sm:max-w-[460px] aspect-[4/5] flex items-center justify-center transition-all duration-700 ease-out"
            style={{
              transform: `translateY(${bottleTranslateY}px) scale(${bottleScale})`,
              opacity: bottleOpacity,
            }}
          >
            {/* Diffused Oval Floor Shadow Under Bottle Base (No Box Shadows!) */}
            <div
              className="absolute bottom-6 sm:bottom-8 w-48 sm:w-60 h-7 sm:h-9 rounded-[100%] bg-black/15 blur-lg pointer-events-none transition-transform duration-300"
              style={{
                transform: `scale(${shadowScale})`,
              }}
            />

            {/* Seamless Masked Video: Continuous Milk Pouring & Filling */}
            <div
              className="relative w-full h-full flex items-center justify-center pointer-events-none select-none"
              style={{
                clipPath: "url(#seamless-bottle-clip)",
                WebkitClipPath: "url(#seamless-bottle-clip)",
              }}
            >
              <video
                ref={videoRef}
                src="/videos/milk-pouring-bottle.mp4"
                poster="/images/milk-video-poster.jpg"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover scale-110"
              />
            </div>

            {/* Crystal Glass Reflection & Rim Highlight Overlay */}
            <div
              className="absolute inset-0 pointer-events-none rounded-full"
              style={{
                background:
                  "radial-gradient(ellipse at 48% 40%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 65%)",
              }}
            />

            {/* Floating Quality Status Badge */}
            <div className="absolute bottom-2 sm:bottom-4 px-4 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-[#193E2D]/10 shadow-[0_4px_16px_rgba(25,62,45,0.06)] flex items-center gap-2 pointer-events-none">
              <Sparkles className="w-3.5 h-3.5 text-[#193E2D]" />
              <span className="text-[11px] sm:text-xs font-medium text-[#193E2D] tracking-wide">
                Fresh Pure A2 Farm Milk • Bottled Daily
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. MAIN BUTTON (Centred dark green button below layout)   */}
        {/* ========================================================= */}
        <div className="mt-8 sm:mt-12 flex justify-center">
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
