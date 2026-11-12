"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

interface ScrollMilkJourneyProps {
  onShopFresh?: () => void;
}

export default function ScrollMilkJourney({ onShopFresh }: ScrollMilkJourneyProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // IntersectionObserver to trigger smooth entrance when section approaches
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Parallax scroll effect for 3D depth as user scrolls through the section
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress between 0 and 1 while section is in viewport
      const totalDist = windowHeight + rect.height;
      const currentDist = windowHeight - rect.top;
      const progress = Math.min(Math.max(currentDist / totalDist, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Parallax offsets
  const bottleTranslateY = isVisible ? (scrollProgress - 0.5) * -30 : 50;
  const bottleScale = isVisible ? 1 : 0.94;
  const bottleOpacity = isVisible ? 1 : 0;

  return (
    <section
      ref={sectionRef}
      id="scroll-milk-journey"
      className="relative w-full bg-[#FAF6ED] py-16 sm:py-20 lg:py-28 px-4 sm:px-8 lg:px-12 select-none overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto">
        
        {/* ========================================================= */}
        {/* 2. SECTION HEADING (Centred with strong visual hierarchy) */}
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
        {/* 3. MAIN 3-COLUMN DESKTOP / BALANCED LAYOUT                */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-10 items-center">
          
          {/* ------------------------------------------------------- */}
          {/* A. LEFT CONTENT BLOCKS (Desktop: Col 1-3)               */}
          {/* Mobile Order: After central bottle                      */}
          {/* ------------------------------------------------------- */}
          <div className="order-2 lg:order-1 lg:col-span-3 flex flex-col justify-around gap-8 sm:gap-10 lg:gap-14 h-full py-2">
            
            {/* Block 01 */}
            <div className="group text-left p-6 sm:p-7 rounded-2xl bg-white/70 backdrop-blur-xs border border-[#193E2D]/[0.08] shadow-[0_4px_20px_-4px_rgba(25,62,45,0.04)] hover:bg-white hover:shadow-[0_10px_28px_-6px_rgba(25,62,45,0.08)] transition-all duration-300">
              <span className="inline-block text-[11px] font-bold text-[#193E2D] px-2.5 py-1 rounded-full bg-[#193E2D]/10 mb-3 tracking-wide">
                01
              </span>
              <h3 className="font-playfair text-xl sm:text-2xl font-normal text-[#193E2D] mb-2 tracking-tight">
                At the Farm
              </h3>
              <p className="text-xs sm:text-sm text-[#193E2D]/80 leading-relaxed font-normal">
                Know where your daily milk comes from.
              </p>
            </div>

            {/* Block 02 */}
            <div className="group text-left p-6 sm:p-7 rounded-2xl bg-white/70 backdrop-blur-xs border border-[#193E2D]/[0.08] shadow-[0_4px_20px_-4px_rgba(25,62,45,0.04)] hover:bg-white hover:shadow-[0_10px_28px_-6px_rgba(25,62,45,0.08)] transition-all duration-300">
              <span className="inline-block text-[11px] font-bold text-[#193E2D] px-2.5 py-1 rounded-full bg-[#193E2D]/10 mb-3 tracking-wide">
                02
              </span>
              <h3 className="font-playfair text-xl sm:text-2xl font-normal text-[#193E2D] mb-2 tracking-tight">
                Careful Handling
              </h3>
              <p className="text-xs sm:text-sm text-[#193E2D]/80 leading-relaxed font-normal">
                See how your milk is handled before bottling.
              </p>
            </div>
          </div>

          {/* ------------------------------------------------------- */}
          {/* B. CENTRAL SEAMLESS 3D BOTTLE (Desktop: Col 4-9, 50%)   */}
          {/* Seamless #FAF6ED canvas blend with soft ambient shadow   */}
          {/* ------------------------------------------------------- */}
          <div className="order-1 lg:order-2 md:col-span-2 lg:col-span-6 flex flex-col items-center justify-center relative">
            
            <div
              className="relative w-full max-w-[480px] aspect-square flex items-center justify-center transition-all duration-700 ease-out"
              style={{
                transform: `translateY(${bottleTranslateY}px) scale(${bottleScale})`,
                opacity: bottleOpacity,
              }}
            >
              {/* Soft Ambient Contact Shadow Under Bottle Base */}
              <div
                className="absolute bottom-6 sm:bottom-8 w-44 sm:w-56 h-8 sm:h-10 rounded-[100%] bg-black/15 blur-lg pointer-events-none"
                style={{
                  transform: `scale(${0.9 + scrollProgress * 0.15})`,
                }}
              />

              {/* Seamless 3D Bottle Image matching #FAF6ED background */}
              <div className="relative w-full h-full flex items-center justify-center pointer-events-none select-none">
                <Image
                  src="/images/milk-bottle-3d-cream.png"
                  alt="Fresh farm milk pouring into glass bottle"
                  width={640}
                  height={640}
                  priority
                  className="w-full h-full object-contain drop-shadow-sm transition-transform duration-500"
                />
              </div>

              {/* Purity Badge Pill */}
              <div className="absolute bottom-2 sm:bottom-4 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#193E2D]/10 shadow-sm flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#193E2D]" />
                <span className="text-[11px] sm:text-xs font-medium text-[#193E2D] tracking-wide">
                  Single-Origin Pure A2 Milk
                </span>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------- */}
          {/* C. RIGHT CONTENT BLOCKS (Desktop: Col 10-12)            */}
          {/* Mobile Order: Follows blocks 01 & 02                     */}
          {/* ------------------------------------------------------- */}
          <div className="order-3 lg:order-3 lg:col-span-3 flex flex-col justify-around gap-8 sm:gap-10 lg:gap-14 h-full py-2">
            
            {/* Block 03 */}
            <div className="group text-left p-6 sm:p-7 rounded-2xl bg-white/70 backdrop-blur-xs border border-[#193E2D]/[0.08] shadow-[0_4px_20px_-4px_rgba(25,62,45,0.04)] hover:bg-white hover:shadow-[0_10px_28px_-6px_rgba(25,62,45,0.08)] transition-all duration-300">
              <span className="inline-block text-[11px] font-bold text-[#193E2D] px-2.5 py-1 rounded-full bg-[#193E2D]/10 mb-3 tracking-wide">
                03
              </span>
              <h3 className="font-playfair text-xl sm:text-2xl font-normal text-[#193E2D] mb-2 tracking-tight">
                Glass Bottles
              </h3>
              <p className="text-xs sm:text-sm text-[#193E2D]/80 leading-relaxed font-normal">
                Explore our glass-bottled milk options.
              </p>
            </div>

            {/* Block 04 */}
            <div className="group text-left p-6 sm:p-7 rounded-2xl bg-white/70 backdrop-blur-xs border border-[#193E2D]/[0.08] shadow-[0_4px_20px_-4px_rgba(25,62,45,0.04)] hover:bg-white hover:shadow-[0_10px_28px_-6px_rgba(25,62,45,0.08)] transition-all duration-300">
              <span className="inline-block text-[11px] font-bold text-[#193E2D] px-2.5 py-1 rounded-full bg-[#193E2D]/10 mb-3 tracking-wide">
                04
              </span>
              <h3 className="font-playfair text-xl sm:text-2xl font-normal text-[#193E2D] mb-2 tracking-tight">
                To Your Doorstep
              </h3>
              <p className="text-xs sm:text-sm text-[#193E2D]/80 leading-relaxed font-normal">
                Find a delivery plan that suits your home.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 6. MAIN BUTTON (Centred dark green button below layout)   */}
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
