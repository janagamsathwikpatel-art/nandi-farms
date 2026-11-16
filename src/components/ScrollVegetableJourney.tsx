"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Copy, Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { livingSoilJourney, JourneyStep } from "@/data/livingSoilJourney";

// Re-export the data for consumers
export { livingSoilJourney };

// Register ScrollTrigger plugin on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollVegetableJourneyProps {
  onShopFresh?: () => void;
}

export default function ScrollVegetableJourney({ onShopFresh }: ScrollVegetableJourneyProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const journeyContainerRef = useRef<HTMLDivElement>(null);
  const basketDesktopRef = useRef<HTMLDivElement>(null);
  const basketMobileRef = useRef<HTMLDivElement>(null);

  // Active state for click-to-copy tactile feedback
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const [copiedHeader, setCopiedHeader] = useState<boolean>(false);

  // Click-to-copy handler for individual steps
  const handleCopyStep = (step: JourneyStep) => {
    const formattedText = `${step.number} ${step.title}\n${step.subtitle}\n\n${step.text}\n\nTags: ${step.tags.join(", ")}\nTimeline: ${step.time} • ${step.timeline}`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(formattedText).then(() => {
        setCopiedNumber(step.number);
        setTimeout(() => setCopiedNumber(null), 2400);
      }).catch(() => {
        // Fallback for clipboard permissions if any
      });
    }
  };

  // Click-to-copy handler for header
  const handleCopyHeader = () => {
    const headerText = `${livingSoilJourney.badge}\n${livingSoilJourney.title}\n\n${livingSoilJourney.description}`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(headerText).then(() => {
        setCopiedHeader(true);
        setTimeout(() => setCopiedHeader(false), 2400);
      }).catch(() => {
        // Fallback
      });
    }
  };

  // Ensure all steps are visibly presented with zero cut-off
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      livingSoilJourney.steps.forEach((step, idx) => {
        const isLeft = idx % 2 === 0;
        const target = `.veg-step-card-${step.number}-${isLeft ? "left" : "right"}`;
        gsap.set(target, { opacity: 1, x: 0 });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="scroll-vegetable-journey"
      className="relative w-full bg-[#FAF6ED] pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-28 px-4 sm:px-8 lg:px-12 select-text overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto">
        
        {/* ========================================================= */}
        {/* 1. SECTION HEADER (Click-to-Copy with Motion)            */}
        {/* ========================================================= */}
        <div
          onClick={handleCopyHeader}
          title="Click to copy header text"
          className="group relative text-center max-w-3xl mx-auto mb-16 sm:mb-20 lg:mb-24 cursor-pointer select-text transition-transform duration-300 transform hover:-translate-y-1 active:translate-y-0"
        >
          {/* Floating Copied Motion Notification Pill */}
          {copiedHeader && (
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#193E2D] text-white text-[11px] font-semibold shadow-lg animate-bounce">
              <Check className="w-3.5 h-3.5 text-emerald-300" />
              <span>Copied to Clipboard!</span>
            </div>
          )}

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#193E2D]/5 text-[#193E2D] text-xs font-semibold uppercase tracking-wider mb-4 border border-[#193E2D]/10">
            <span className="w-2 h-2 rounded-full bg-[#2D5A43] animate-pulse" />
            {livingSoilJourney.badge}
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-normal text-[#193E2D] tracking-tight mb-4 select-text">
            {livingSoilJourney.title}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[#193E2D]/80 leading-relaxed font-light select-text">
            {livingSoilJourney.description}
          </p>
        </div>

        {/* ========================================================= */}
        {/* 2. THREE-COLUMN ALTERNATING TIMELINE CONTAINER            */}
        {/* Left Column (Cards 01 & 03)                               */}
        {/* Center Spine Column (Stationary/Falling Basket Video)     */}
        {/* Right Column (Cards 02 & 04)                              */}
        {/* ========================================================= */}
        <div ref={journeyContainerRef} className="relative">

          {/* ------------------------------------------------------- */}
          {/* DESKTOP BASKET TRACK (Floating Central Column)         */}
          {/* ------------------------------------------------------- */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-0 z-20 w-[480px] pointer-events-none items-center justify-center">
            <div
              ref={basketDesktopRef}
              className="veg-central-basket-inner relative w-full flex flex-col items-center justify-center will-change-transform"
            >
              {/* Diffused Floor Shadow Under Full Basket Base */}
              <div className="absolute bottom-2 w-72 h-6 rounded-[100%] bg-black/15 blur-lg pointer-events-none" />

              {/* Handcrafted Woven Harvest Basket with Authentic Farm-Fresh Vegetables */}
              <div className="relative w-full aspect-[16/10] flex items-center justify-center pointer-events-none select-none">
                <img
                  src="/images/vegetable-basket-full-hd.png"
                  alt="Nandi Living Soil Vegetable Basket - Farm-fresh organic vegetables"
                  className="w-full h-full object-contain drop-shadow-[0_16px_28px_rgba(25,62,45,0.12)] pointer-events-none select-none"
                  loading="eager"
                />
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------- */}
          {/* MOBILE BASKET DISPLAY (Top of Mobile Flow)              */}
          {/* ------------------------------------------------------- */}
          <div ref={basketMobileRef} className="lg:hidden flex flex-col items-center justify-center mb-10">
            <div className="relative w-full max-w-[340px] aspect-[16/10] flex items-center justify-center pointer-events-none select-none">
              <div className="absolute bottom-2 w-64 h-5 rounded-[100%] bg-black/15 blur-md pointer-events-none" />
              <img
                src="/images/vegetable-basket-full-hd.png"
                alt="Nandi Living Soil Vegetable Basket"
                className="w-full h-full object-contain drop-shadow-[0_12px_20px_rgba(25,62,45,0.12)] pointer-events-none select-none"
                loading="eager"
              />
            </div>
          </div>

          {/* ------------------------------------------------------- */}
          {/* DYNAMIC ALTERNATING MILESTONE ROWS                      */}
          {/* ------------------------------------------------------- */}
          <div className="space-y-12 sm:space-y-16 lg:space-y-24">
            {livingSoilJourney.steps.map((step, idx) => {
              const isLeft = idx % 2 === 0;
              const cardAnimClass = `veg-step-card-${step.number}-${isLeft ? "left" : "right"}`;
              const isCopied = copiedNumber === step.number;

              const cardContent = (
                <div
                  onClick={() => handleCopyStep(step)}
                  title="Click to copy milestone text"
                  className={`group relative text-left p-6 sm:p-7 rounded-2xl bg-white/90 backdrop-blur-xs border transition-all duration-300 cursor-pointer select-text
                    transform hover:-translate-y-1.5 active:scale-[0.98] active:translate-y-0.5
                    ${isCopied 
                      ? "border-[#193E2D] shadow-[0_12px_28px_-6px_rgba(25,62,45,0.20)] ring-2 ring-[#193E2D]/20" 
                      : "border-[#193E2D]/[0.08] shadow-[0_4px_20px_-4px_rgba(25,62,45,0.04)] hover:bg-white hover:shadow-[0_12px_28px_-6px_rgba(25,62,45,0.12)]"
                    }`}
                >
                  {/* Floating Copied Motion Pill */}
                  {isCopied && (
                    <div className="absolute -top-3.5 right-5 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#193E2D] text-white text-[11px] font-semibold shadow-lg animate-bounce">
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Copied to Clipboard!</span>
                    </div>
                  )}

                  {/* Step Number, Title & Copy Icon */}
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-3">
                      <span className="inline-block text-[11px] font-bold text-[#193E2D] px-2.5 py-1 rounded-full bg-[#193E2D]/10 tracking-wide select-text">
                        {step.number}
                      </span>
                      <h3 className="font-playfair text-xl sm:text-2xl font-normal text-[#193E2D] tracking-tight select-text">
                        {step.title}
                      </h3>
                    </div>
                    <div className="text-[#193E2D]/40 group-hover:text-[#193E2D] transition-colors p-1 rounded-md hover:bg-[#193E2D]/5">
                      {isCopied ? (
                        <Check className="w-4 h-4 text-[#193E2D]" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] font-semibold text-[#193E2D]/90 uppercase tracking-wider mb-2 select-text">
                    {step.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-[#193E2D]/80 leading-relaxed font-normal mb-4 select-text">
                    {step.text}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1 border-t border-[#193E2D]/5">
                    {step.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#193E2D] bg-[#193E2D]/5 px-2.5 py-1 rounded-full select-text"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#193E2D]" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );

              return (
                <div
                  key={step.number}
                  className="journey-milestone-row grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[220px]"
                >
                  {isLeft ? (
                    <>
                      {/* LEFT: Card */}
                      <div className={`lg:col-span-4 ${cardAnimClass}`}>
                        {cardContent}
                      </div>

                      {/* CENTER: Spacer for central basket track */}
                      <div className="hidden lg:block lg:col-span-4" />

                      {/* RIGHT: Milestone indicator */}
                      <div className="hidden lg:flex lg:col-span-4 items-center justify-start pl-8 text-[#193E2D]/40 text-xs italic select-text">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#193E2D]/20 mr-3" />
                        <span>{step.time} • {step.timeline}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* LEFT: Milestone indicator */}
                      <div className="hidden lg:flex lg:col-span-4 items-center justify-end pr-8 text-[#193E2D]/40 text-xs italic select-text">
                        <span>{step.time} • {step.timeline}</span>
                        <span className="w-2.5 h-2.5 rounded-full bg-[#193E2D]/20 ml-3" />
                      </div>

                      {/* CENTER: Spacer for central basket track */}
                      <div className="hidden lg:block lg:col-span-4" />

                      {/* RIGHT: Card */}
                      <div className={`lg:col-span-4 ${cardAnimClass}`}>
                        {cardContent}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* ======================================================= */}
          {/* 3. CALL TO ACTION FOOTER BUTTON                         */}
          {/* ======================================================= */}
          <div className="mt-16 sm:mt-20 text-center">
            {onShopFresh ? (
              <button
                onClick={onShopFresh}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#193E2D] text-[#FAF6ED] text-sm font-medium hover:bg-[#2D5A43] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>{livingSoilJourney.cta.label}</span>
                <span className="text-xs">→</span>
              </button>
            ) : (
              <Link
                href={livingSoilJourney.cta.href}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#193E2D] text-[#FAF6ED] text-sm font-medium hover:bg-[#2D5A43] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>{livingSoilJourney.cta.label}</span>
                <span className="text-xs">→</span>
              </Link>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
