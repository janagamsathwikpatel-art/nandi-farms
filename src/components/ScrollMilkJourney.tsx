"use client";

import React, { useEffect, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

  // GSAP ScrollTrigger Animation for Alternating Journey & Moving Bottle
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Desktop Central Bottle Scroll Translation (Travels vertically with scroll)
      // Strictly fixed scale: 1.0 permanently (NO zoom in, NO zoom out)
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
              scrub: 1.2, // Buttery-smooth physics scrub
            },
          }
        );
      }

      // 2. Step 01 Reveal on LEFT SIDE
      gsap.fromTo(
        ".step-card-01-left",
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".step-card-01-left",
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 3. Step 02 Reveal on RIGHT SIDE
      gsap.fromTo(
        ".step-card-02-right",
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".step-card-02-right",
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 4. Step 03 Reveal on LEFT SIDE
      gsap.fromTo(
        ".step-card-03-left",
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".step-card-03-left",
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 5. Step 04 Reveal on RIGHT SIDE
      gsap.fromTo(
        ".step-card-04-right",
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".step-card-04-right",
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 6. Mobile Bottle Initial Entry
      if (bottleMobileRef.current) {
        gsap.fromTo(
          bottleMobileRef.current,
          { opacity: 0, y: -40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bottleMobileRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
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
      className="relative w-full bg-[#FAF6ED] py-16 sm:py-20 lg:py-28 px-4 sm:px-8 lg:px-12 select-none overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto">
        
        {/* ========================================================= */}
        {/* 1. SECTION HEADING (Centred with strong visual hierarchy) */}
        {/* ========================================================= */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20 lg:mb-24">
          <p className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#193E2D] mb-3">
            THE MILK JOURNEY
          </p>
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#193E2D] mb-4 leading-tight">
            From Farm to Your Door
          </h2>
          <p className="text-sm sm:text-base text-[#193E2D]/75 font-normal">
            Discover the pure dawn story behind your daily bottle.
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
              className="relative w-full flex flex-col items-center justify-center will-change-transform"
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
                  className="w-full h-full object-contain"
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
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* ------------------------------------------------------- */}
          {/* 4 ALTERNATING MILESTONE ROWS                            */}
          {/* Row 1: Left 01  | Center Track | Right Trail            */}
          {/* Row 2: Left Trail| Center Track | Right 02               */}
          {/* Row 3: Left 03  | Center Track | Right Trail            */}
          {/* Row 4: Left Trail| Center Track | Right 04               */}
          {/* ------------------------------------------------------- */}
          <div className="space-y-12 sm:space-y-16 lg:space-y-24">
            
            {/* ===================================================== */}
            {/* MILESTONE ROW 01: STEP 01 ON LEFT                     */}
            {/* ===================================================== */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[220px]">
              {/* LEFT SIDE: Card 01 */}
              <div className="lg:col-span-4 step-card-01-left">
                <div className="group text-left p-6 sm:p-7 rounded-2xl bg-white/80 backdrop-blur-xs border border-[#193E2D]/[0.08] shadow-[0_4px_20px_-4px_rgba(25,62,45,0.04)] hover:bg-white hover:shadow-[0_10px_28px_-6px_rgba(25,62,45,0.08)] transition-all duration-300">
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
              </div>

              {/* CENTER COLUMN: Spacer for moving bottle track */}
              <div className="hidden lg:block lg:col-span-4" />

              {/* RIGHT SIDE: Ambient subtle milestone indicator */}
              <div className="hidden lg:flex lg:col-span-4 items-center justify-start pl-8 text-[#193E2D]/40 text-xs italic">
                <span className="w-2.5 h-2.5 rounded-full bg-[#193E2D]/20 mr-3" />
                <span>04:30 AM • Pre-dawn milking in open pastures</span>
              </div>
            </div>

            {/* ===================================================== */}
            {/* MILESTONE ROW 02: STEP 02 ON RIGHT                    */}
            {/* ===================================================== */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[220px]">
              {/* LEFT SIDE: Ambient subtle milestone indicator */}
              <div className="hidden lg:flex lg:col-span-4 items-center justify-end pr-8 text-[#193E2D]/40 text-xs italic">
                <span>05:15 AM • Instant chill preservation</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#193E2D]/20 ml-3" />
              </div>

              {/* CENTER COLUMN: Spacer for moving bottle track */}
              <div className="hidden lg:block lg:col-span-4" />

              {/* RIGHT SIDE: Card 02 */}
              <div className="lg:col-span-4 step-card-02-right">
                <div className="group text-left p-6 sm:p-7 rounded-2xl bg-white/80 backdrop-blur-xs border border-[#193E2D]/[0.08] shadow-[0_4px_20px_-4px_rgba(25,62,45,0.04)] hover:bg-white hover:shadow-[0_10px_28px_-6px_rgba(25,62,45,0.08)] transition-all duration-300">
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
            </div>

            {/* ===================================================== */}
            {/* MILESTONE ROW 03: STEP 03 ON LEFT                     */}
            {/* ===================================================== */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[220px]">
              {/* LEFT SIDE: Card 03 */}
              <div className="lg:col-span-4 step-card-03-left">
                <div className="group text-left p-6 sm:p-7 rounded-2xl bg-white/80 backdrop-blur-xs border border-[#193E2D]/[0.08] shadow-[0_4px_20px_-4px_rgba(25,62,45,0.04)] hover:bg-white hover:shadow-[0_10px_28px_-6px_rgba(25,62,45,0.08)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2.5">
                    <span className="inline-block text-[11px] font-bold text-[#193E2D] px-2.5 py-1 rounded-full bg-[#193E2D]/10 tracking-wide">
                      03
                    </span>
                    <h3 className="font-playfair text-xl sm:text-2xl font-normal text-[#193E2D] tracking-tight">
                      Glass Bottles
                    </h3>
                  </div>
                  <p className="text-[11px] font-semibold text-[#193E2D]/90 uppercase tracking-wider mb-2">
                    Zero Microplastics • Pure Dawn Taste
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
              </div>

              {/* CENTER COLUMN: Spacer for moving bottle track */}
              <div className="hidden lg:block lg:col-span-4" />

              {/* RIGHT SIDE: Ambient subtle milestone indicator */}
              <div className="hidden lg:flex lg:col-span-4 items-center justify-start pl-8 text-[#193E2D]/40 text-xs italic">
                <span className="w-2.5 h-2.5 rounded-full bg-[#193E2D]/20 mr-3" />
                <span>05:45 AM • Sealed in sterilized glass jars</span>
              </div>
            </div>

            {/* ===================================================== */}
            {/* MILESTONE ROW 04: STEP 04 ON RIGHT                    */}
            {/* ===================================================== */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[220px]">
              {/* LEFT SIDE: Ambient subtle milestone indicator */}
              <div className="hidden lg:flex lg:col-span-4 items-center justify-end pr-8 text-[#193E2D]/40 text-xs italic">
                <span>06:30 AM • Delivered fresh to your porch</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#193E2D]/20 ml-3" />
              </div>

              {/* CENTER COLUMN: Spacer for moving bottle track */}
              <div className="hidden lg:block lg:col-span-4" />

              {/* RIGHT SIDE: Card 04 */}
              <div className="lg:col-span-4 step-card-04-right">
                <div className="group text-left p-6 sm:p-7 rounded-2xl bg-white/80 backdrop-blur-xs border border-[#193E2D]/[0.08] shadow-[0_4px_20px_-4px_rgba(25,62,45,0.04)] hover:bg-white hover:shadow-[0_10px_28px_-6px_rgba(25,62,45,0.08)] transition-all duration-300">
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

          </div>
        </div>
      </div>
    </section>
  );
}
