"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Copy, Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  milkJourney,
  milkJourneySteps,
  MilkJourneyStep,
} from "@/data/milkJourney";

// Re-export the data for consumers
export { milkJourney, milkJourneySteps };

// Register ScrollTrigger plugin on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollMilkJourneyProps {
  onShopFresh?: () => void;
}

export default function ScrollMilkJourney({ onShopFresh }: ScrollMilkJourneyProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const journeyContainerRef = useRef<HTMLDivElement>(null);
  const bottleDesktopRef = useRef<HTMLDivElement>(null);
  const bottleMobileRef = useRef<HTMLDivElement>(null);
  const videoDesktopRef = useRef<HTMLVideoElement>(null);
  const videoMobileRef = useRef<HTMLVideoElement>(null);

  // Active state for click-to-copy tactile feedback
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const [copiedHeader, setCopiedHeader] = useState<boolean>(false);

  // Click-to-copy handler for individual steps
  const handleCopyStep = (step: MilkJourneyStep) => {
    const formattedText = `${step.number} ${step.title}\n${step.subtitle}\n\n${step.text}\n\nTags: ${step.tags.join(", ")}\nTimeline: ${step.time} • ${step.timeline}`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(formattedText).then(() => {
        setCopiedNumber(step.number);
        setTimeout(() => setCopiedNumber(null), 2400);
      }).catch(() => {
        // Fallback
      });
    }
  };

  // Click-to-copy handler for header
  const handleCopyHeader = () => {
    const headerText = `${milkJourney.badge}\n${milkJourney.title}\n\n${milkJourney.description}`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(headerText).then(() => {
        setCopiedHeader(true);
        setTimeout(() => setCopiedHeader(false), 2400);
      }).catch(() => {
        // Fallback
      });
    }
  };

  // GSAP ScrollTrigger Animation for Alternating Journey & Moving Bottle
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Desktop Central Bottle Scroll Translation (Travels vertically with scroll)
      if (bottleDesktopRef.current && journeyContainerRef.current) {
        gsap.fromTo(
          bottleDesktopRef.current,
          { y: 0 },
          {
            y: () => {
              if (!journeyContainerRef.current || !bottleDesktopRef.current) return 700;
              const containerHeight = journeyContainerRef.current.offsetHeight;
              const bottleHeight = bottleDesktopRef.current.offsetHeight;
              return Math.max(containerHeight - bottleHeight - 40, 200);
            },
            ease: "none",
            scrollTrigger: {
              trigger: journeyContainerRef.current,
              start: "top 22%",
              end: "bottom 82%",
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // Ensure all steps are visibly presented with zero cut-off
      milkJourney.steps.forEach((step, idx) => {
        const isLeft = idx % 2 === 0;
        const target = `.milk-step-card-${step.number}-${isLeft ? "left" : "right"}`;
        gsap.set(target, { opacity: 1, x: 0 });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Ensure continuous looping video playback without interruption on both desktop and mobile
  useEffect(() => {
    const handleLoop = (vid: HTMLVideoElement | null) => {
      if (!vid) return () => {};
      const onEnded = () => {
        vid.currentTime = 0;
        vid.play().catch(() => {});
      };
      vid.addEventListener("ended", onEnded);
      return () => vid.removeEventListener("ended", onEnded);
    };

    const cleanDesktop = handleLoop(videoDesktopRef.current);
    const cleanMobile = handleLoop(videoMobileRef.current);

    return () => {
      cleanDesktop();
      cleanMobile();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="scroll-milk-journey"
      className="relative w-full bg-[#FAF6ED] pt-16 sm:pt-20 lg:pt-28 pb-24 sm:pb-32 lg:pb-36 px-4 sm:px-8 lg:px-12 select-text overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto">
        
        {/* ========================================================= */}
        {/* 1. SECTION HEADING (Click-to-Copy with Tactile Motion)     */}
        {/* ========================================================= */}
        <div
          onClick={handleCopyHeader}
          title="Click to copy header text"
          className="group relative text-center max-w-2xl mx-auto mb-14 sm:mb-20 lg:mb-24 cursor-pointer select-text transition-transform duration-300 transform hover:-translate-y-1 active:translate-y-0"
        >
          {/* Floating Copied Motion Notification Pill */}
          {copiedHeader && (
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#193E2D] text-white text-[11px] font-semibold shadow-lg animate-bounce">
              <Check className="w-3.5 h-3.5 text-emerald-300" />
              <span>Copied to Clipboard!</span>
            </div>
          )}

          <p className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#193E2D] mb-3">
            {milkJourney.badge}
          </p>
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#193E2D] mb-4 leading-tight select-text">
            {milkJourney.title}
          </h2>
          <p className="text-sm sm:text-base text-[#193E2D]/75 font-normal select-text">
            {milkJourney.description}
          </p>
        </div>

        {/* ========================================================= */}
        {/* 2. ALTERNATING SCROLL JOURNEY CONTAINER                   */}
        {/* ========================================================= */}
        <div ref={journeyContainerRef} className="relative w-full">

          {/* ------------------------------------------------------- */}
          {/* DESKTOP CENTRAL MOVING BOTTLE TRACK (Sticky/GSAP Scrub) */}
          {/* Scale locked permanently at 1.0 (zero zoom in/out)      */}
          {/* ------------------------------------------------------- */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none z-20 w-[420px] will-change-transform">
            <div
              ref={bottleDesktopRef}
              className="milk-central-bottle-inner relative w-full flex flex-col items-center justify-center will-change-transform"
            >
              {/* Diffused Floor Shadow Under Bottle Base */}
              <div className="absolute bottom-6 w-56 h-7 rounded-[100%] bg-black/15 blur-lg pointer-events-none" />

              {/* Seamless Video: 100% Background Removed on #FAF6ED */}
              <div className="relative w-full aspect-[4/5] flex items-center justify-center pointer-events-none select-none overflow-hidden">
                <video
                  ref={videoDesktopRef}
                  src="/videos/milk-pouring-bottle-pure-v3.mp4"
                  poster="/images/milk-video-poster-pure-v3.jpg"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-contain pointer-events-none select-none"
                />
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------- */}
          {/* MOBILE BOTTLE DISPLAY (Top of Mobile Flow)              */}
          {/* ------------------------------------------------------- */}
          <div ref={bottleMobileRef} className="lg:hidden flex flex-col items-center justify-center mb-10">
            <div className="relative w-full max-w-[340px] aspect-[4/5] flex items-center justify-center pointer-events-none select-none overflow-hidden">
              <video
                ref={videoMobileRef}
                src="/videos/milk-pouring-bottle-pure-v3.mp4"
                poster="/images/milk-video-poster-pure-v3.jpg"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-contain pointer-events-none select-none"
              />
            </div>
          </div>

          {/* ------------------------------------------------------- */}
          {/* DYNAMIC ALTERNATING MILESTONE ROWS                      */}
          {/* ------------------------------------------------------- */}
          <div className="space-y-12 sm:space-y-16 lg:space-y-24">
            {milkJourney.steps.map((step, idx) => {
              const isLeft = idx % 2 === 0;
              const cardAnimClass = `milk-step-card-${step.number}-${isLeft ? "left" : "right"}`;
              const isCopied = copiedNumber === step.number;

              const cardContent = (
                <div
                  onClick={() => handleCopyStep(step)}
                  title="Click to copy milestone text"
                  className={`group relative text-left p-4 sm:p-7 rounded-2xl bg-white/90 backdrop-blur-xs border transition-all duration-300 cursor-pointer select-text
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

                      {/* CENTER: Spacer for central bottle track */}
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

                      {/* CENTER: Spacer for central bottle track */}
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

          {/* Optional CTA if provided in milkJourney */}
          {milkJourney.cta && (
            <div className="mt-16 sm:mt-20 text-center">
              {onShopFresh ? (
                <button
                  onClick={onShopFresh}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#193E2D] text-[#FAF6ED] text-sm font-medium hover:bg-[#2D5A43] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>{milkJourney.cta.label}</span>
                  <span className="text-xs">→</span>
                </button>
              ) : (
                <Link
                  href={milkJourney.cta.href}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#193E2D] text-[#FAF6ED] text-sm font-medium hover:bg-[#2D5A43] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>{milkJourney.cta.label}</span>
                  <span className="text-xs">→</span>
                </Link>
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
