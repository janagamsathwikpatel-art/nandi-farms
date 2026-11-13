"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  const videoDesktopRef = useRef<HTMLVideoElement>(null);
  const videoMobileRef = useRef<HTMLVideoElement>(null);

  // GSAP ScrollTrigger Animation for Alternating Journey & Moving Vegetable Basket
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Desktop Central Basket Scroll Translation (Travels vertically with scroll)
      // Strictly fixed scale: 1.0 permanently (NO zoom in, NO zoom out)
      if (basketDesktopRef.current && journeyContainerRef.current) {
        gsap.fromTo(
          basketDesktopRef.current,
          { y: 0 },
          {
            y: () => {
              if (!journeyContainerRef.current || !basketDesktopRef.current) return 700;
              const containerHeight = journeyContainerRef.current.offsetHeight;
              const basketHeight = basketDesktopRef.current.offsetHeight;
              return Math.max(containerHeight - basketHeight - 40, 200);
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

      // 2. Play-Once ScrollTrigger for Vegetable Falling Video
      // Starts when section is 70% in view, plays once, then holds final filled composition
      const playVideoOnce = (vid: HTMLVideoElement | null) => {
        if (!vid || !sectionRef.current) return;
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
          onEnter: () => {
            vid.currentTime = 0;
            vid.play().catch(() => {
              // Browser autoplay policy graceful fallback
            });
          },
        });
      };

      playVideoOnce(videoDesktopRef.current);
      playVideoOnce(videoMobileRef.current);

      // 3. Step 01 Reveal on LEFT SIDE
      gsap.fromTo(
        ".veg-step-card-01-left",
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".veg-step-card-01-left",
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 4. Step 02 Reveal on RIGHT SIDE
      gsap.fromTo(
        ".veg-step-card-02-right",
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".veg-step-card-02-right",
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 5. Step 03 Reveal on LEFT SIDE
      gsap.fromTo(
        ".veg-step-card-03-left",
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".veg-step-card-03-left",
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 6. Step 04 Reveal on RIGHT SIDE
      gsap.fromTo(
        ".veg-step-card-04-right",
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".veg-step-card-04-right",
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 7. Ambient Timeline Line drawing animation down the central track
      gsap.fromTo(
        ".veg-journey-spine-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: journeyContainerRef.current,
            start: "top 25%",
            end: "bottom 85%",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Ensure video pauses on the final frame when completed (permanently holds filled basket)
  useEffect(() => {
    const attachHoldOnEnd = (vid: HTMLVideoElement | null) => {
      if (!vid) return () => {};
      const onEnded = () => {
        vid.pause();
      };
      vid.addEventListener("ended", onEnded);
      return () => vid.removeEventListener("ended", onEnded);
    };

    const cleanDesktop = attachHoldOnEnd(videoDesktopRef.current);
    const cleanMobile = attachHoldOnEnd(videoMobileRef.current);

    return () => {
      cleanDesktop();
      cleanMobile();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="scroll-vegetable-journey"
      className="relative w-full bg-[#FAF6ED] py-16 sm:py-20 lg:py-28 px-4 sm:px-8 lg:px-12 select-none overflow-hidden border-t border-[#193E2D]/5"
    >
      <div className="max-w-[1280px] mx-auto">
        
        {/* ========================================================= */}
        {/* 1. SECTION HEADER                                         */}
        {/* ========================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 lg:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#193E2D]/5 text-[#193E2D] text-xs font-semibold uppercase tracking-wider mb-4 border border-[#193E2D]/10">
            <span className="w-2 h-2 rounded-full bg-[#2D5A43] animate-pulse" />
            The Living Soil Journey
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-normal text-[#193E2D] tracking-tight mb-4">
            From Living Soil to Kitchen in 12 Hours
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[#193E2D]/80 leading-relaxed font-light">
            Follow our certified bio-organic vegetable journey. Rooted in microbial living soil, protected with neem decoctions, and hand-harvested at dawn to preserve living enzymes.
          </p>
        </div>

        {/* ========================================================= */}
        {/* 2. THREE-COLUMN ALTERNATING TIMELINE CONTAINER            */}
        {/* Left Column (Cards 01 & 03)                               */}
        {/* Center Spine Column (Stationary/Falling Basket Video)     */}
        {/* Right Column (Cards 02 & 04)                              */}
        {/* ========================================================= */}
        <div ref={journeyContainerRef} className="relative">

          {/* Vertical Central Subtle Spine Track */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-[#193E2D]/10 pointer-events-none">
            <div className="veg-journey-spine-line w-full h-full bg-gradient-to-b from-[#193E2D]/40 via-[#2D5A43]/60 to-[#193E2D]/20 origin-top" />
          </div>

          {/* ------------------------------------------------------- */}
          {/* DESKTOP BASKET VIDEO TRACK (Floating Central Column)   */}
          {/* ------------------------------------------------------- */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-0 z-20 w-[480px] pointer-events-none items-center justify-center">
            <div
              ref={basketDesktopRef}
              className="relative w-full flex flex-col items-center justify-center will-change-transform"
            >
              {/* Diffused Floor Shadow Under Full Basket Base */}
              <div className="absolute bottom-4 w-72 h-8 rounded-[100%] bg-black/15 blur-lg pointer-events-none" />

              {/* Solid Cream Backing Shield to prevent the vertical spine line from slicing through the basket */}
              <div className="absolute inset-x-8 top-10 bottom-4 bg-[#FAF6ED] rounded-[45%] pointer-events-none" />

              {/* Seamless Video: Dual-Source WebM True Alpha + MP4 Fallback on #FAF6ED */}
              <div className="relative w-full aspect-[16/11] flex items-center justify-center pointer-events-none select-none">
                <video
                  ref={videoDesktopRef}
                  poster="/images/vegetable-harvest-poster.jpg"
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-contain"
                >
                  <source src="/videos/vegetable-harvest-basket-alpha.webm" type="video/webm" />
                  <source src="/videos/vegetable-harvest-basket-pure.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------- */}
          {/* MOBILE BASKET VIDEO DISPLAY (Top of Mobile Flow)        */}
          {/* ------------------------------------------------------- */}
          <div ref={basketMobileRef} className="lg:hidden flex flex-col items-center justify-center mb-10">
            <div className="relative w-full max-w-[380px] aspect-[16/11] flex items-center justify-center pointer-events-none select-none">
              <video
                ref={videoMobileRef}
                poster="/images/vegetable-harvest-poster.jpg"
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-contain"
              >
                <source src="/videos/vegetable-harvest-basket-alpha.webm" type="video/webm" />
                <source src="/videos/vegetable-harvest-basket-pure.mp4" type="video/mp4" />
              </video>
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
              <div className="lg:col-span-4 veg-step-card-01-left">
                <div className="group text-left p-6 sm:p-7 rounded-2xl bg-white/80 backdrop-blur-xs border border-[#193E2D]/[0.08] shadow-[0_4px_20px_-4px_rgba(25,62,45,0.04)] hover:bg-white hover:shadow-[0_10px_28px_-6px_rgba(25,62,45,0.08)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2.5">
                    <span className="inline-block text-[11px] font-bold text-[#193E2D] px-2.5 py-1 rounded-full bg-[#193E2D]/10 tracking-wide">
                      01
                    </span>
                    <h3 className="font-playfair text-xl sm:text-2xl font-normal text-[#193E2D] tracking-tight">
                      Heritage Living Soil
                    </h3>
                  </div>
                  <p className="text-[11px] font-semibold text-[#193E2D]/90 uppercase tracking-wider mb-2">
                    Regenerative Farming • Microbial Rich
                  </p>
                  <p className="text-xs sm:text-sm text-[#193E2D]/80 leading-relaxed font-normal mb-4">
                    Nurtured with ancient bio-fertilizers and pure Jeevamrutha compost. Root crops and vines draw dense micro-nutrients naturally without synthetic stimulants.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1 border-t border-[#193E2D]/5">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#193E2D] bg-[#193E2D]/5 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-[#193E2D]" />
                      100% Bio-Organic
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#193E2D] bg-[#193E2D]/5 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-[#193E2D]" />
                      Microbe-Rich Beds
                    </span>
                  </div>
                </div>
              </div>

              {/* CENTER COLUMN: Spacer for moving basket track */}
              <div className="hidden lg:block lg:col-span-4" />

              {/* RIGHT SIDE: Ambient subtle milestone indicator */}
              <div className="hidden lg:flex lg:col-span-4 items-center justify-start pl-8 text-[#193E2D]/40 text-xs italic">
                <span className="w-2.5 h-2.5 rounded-full bg-[#193E2D]/20 mr-3" />
                <span>04:30 AM • Awakening Karnataka's living farm beds</span>
              </div>
            </div>

            {/* ===================================================== */}
            {/* MILESTONE ROW 02: STEP 02 ON RIGHT                    */}
            {/* ===================================================== */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[220px]">
              {/* LEFT SIDE: Ambient subtle milestone indicator */}
              <div className="hidden lg:flex lg:col-span-4 items-center justify-end pr-8 text-[#193E2D]/40 text-xs italic">
                <span>05:30 AM • Solar-powered organic inspection</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#193E2D]/20 ml-3" />
              </div>

              {/* CENTER COLUMN: Spacer for moving basket track */}
              <div className="hidden lg:block lg:col-span-4" />

              {/* RIGHT SIDE: Card 02 */}
              <div className="lg:col-span-4 veg-step-card-02-right">
                <div className="group text-left p-6 sm:p-7 rounded-2xl bg-white/80 backdrop-blur-xs border border-[#193E2D]/[0.08] shadow-[0_4px_20px_-4px_rgba(25,62,45,0.04)] hover:bg-white hover:shadow-[0_10px_28px_-6px_rgba(25,62,45,0.08)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2.5">
                    <span className="inline-block text-[11px] font-bold text-[#193E2D] px-2.5 py-1 rounded-full bg-[#193E2D]/10 tracking-wide">
                      02
                    </span>
                    <h3 className="font-playfair text-xl sm:text-2xl font-normal text-[#193E2D] tracking-tight">
                      Zero Synthetic Sprays
                    </h3>
                  </div>
                  <p className="text-[11px] font-semibold text-[#193E2D]/90 uppercase tracking-wider mb-2">
                    100% Bio-Organic • Safe for Babies
                  </p>
                  <p className="text-xs sm:text-sm text-[#193E2D]/80 leading-relaxed font-normal mb-4">
                    Protected using neem oil decoctions, companion marigolds, and beneficial birds. Zero chemical or pesticide residues, verified by weekly third-party lab assays.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1 border-t border-[#193E2D]/5">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#193E2D] bg-[#193E2D]/5 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-[#193E2D]" />
                      Zero Pesticide Residue
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#193E2D] bg-[#193E2D]/5 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-[#193E2D]" />
                      Lab-Tested Clean
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
              <div className="lg:col-span-4 veg-step-card-03-left">
                <div className="group text-left p-6 sm:p-7 rounded-2xl bg-white/80 backdrop-blur-xs border border-[#193E2D]/[0.08] shadow-[0_4px_20px_-4px_rgba(25,62,45,0.04)] hover:bg-white hover:shadow-[0_10px_28px_-6px_rgba(25,62,45,0.08)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2.5">
                    <span className="inline-block text-[11px] font-bold text-[#193E2D] px-2.5 py-1 rounded-full bg-[#193E2D]/10 tracking-wide">
                      03
                    </span>
                    <h3 className="font-playfair text-xl sm:text-2xl font-normal text-[#193E2D] tracking-tight">
                      Dawn Dew Harvest
                    </h3>
                  </div>
                  <p className="text-[11px] font-semibold text-[#193E2D]/90 uppercase tracking-wider mb-2">
                    Peak Hydration • Hand-Harvested
                  </p>
                  <p className="text-xs sm:text-sm text-[#193E2D]/80 leading-relaxed font-normal mb-4">
                    Plucked at first light when soil moisture and plant turgor pressure are highest. Every bell pepper, cucumber, and leafy spinach bundle retains its crisp cellular crunch.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1 border-t border-[#193E2D]/5">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#193E2D] bg-[#193E2D]/5 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-[#193E2D]" />
                      Peak Dew Crunch
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#193E2D] bg-[#193E2D]/5 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-[#193E2D]" />
                      Breathable Hampers
                    </span>
                  </div>
                </div>
              </div>

              {/* CENTER COLUMN: Spacer for moving basket track */}
              <div className="hidden lg:block lg:col-span-4" />

              {/* RIGHT SIDE: Ambient subtle milestone indicator */}
              <div className="hidden lg:flex lg:col-span-4 items-center justify-start pl-8 text-[#193E2D]/40 text-xs italic">
                <span className="w-2.5 h-2.5 rounded-full bg-[#193E2D]/20 mr-3" />
                <span>06:30 AM • Gentle sorting into breathable baskets</span>
              </div>
            </div>

            {/* ===================================================== */}
            {/* MILESTONE ROW 04: STEP 04 ON RIGHT                    */}
            {/* ===================================================== */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[220px]">
              {/* LEFT SIDE: Ambient subtle milestone indicator */}
              <div className="hidden lg:flex lg:col-span-4 items-center justify-end pr-8 text-[#193E2D]/40 text-xs italic">
                <span>07:00 AM • Chilled dispatch to your doorstep</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#193E2D]/20 ml-3" />
              </div>

              {/* CENTER COLUMN: Spacer for moving basket track */}
              <div className="hidden lg:block lg:col-span-4" />

              {/* RIGHT SIDE: Card 04 */}
              <div className="lg:col-span-4 veg-step-card-04-right">
                <div className="group text-left p-6 sm:p-7 rounded-2xl bg-white/80 backdrop-blur-xs border border-[#193E2D]/[0.08] shadow-[0_4px_20px_-4px_rgba(25,62,45,0.04)] hover:bg-white hover:shadow-[0_10px_28px_-6px_rgba(25,62,45,0.08)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2.5">
                    <span className="inline-block text-[11px] font-bold text-[#193E2D] px-2.5 py-1 rounded-full bg-[#193E2D]/10 tracking-wide">
                      04
                    </span>
                    <h3 className="font-playfair text-xl sm:text-2xl font-normal text-[#193E2D] tracking-tight">
                      Field-to-Wok in 12h
                    </h3>
                  </div>
                  <p className="text-[11px] font-semibold text-[#193E2D]/90 uppercase tracking-wider mb-2">
                    Doorstep Fresh • Delivered by 7 AM
                  </p>
                  <p className="text-xs sm:text-sm text-[#193E2D]/80 leading-relaxed font-normal mb-4">
                    Harvested at dawn and delivered straight to your door by 7 AM the very next morning. Experience the undeniable crunch, sweet vitality, and living enzymes of true farm-to-table produce.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1 border-t border-[#193E2D]/5">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#193E2D] bg-[#193E2D]/5 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-[#193E2D]" />
                      Doorstep Delivery by 7 AM
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#193E2D] bg-[#193E2D]/5 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-[#193E2D]" />
                      Living Enzymes Intact
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ======================================================= */}
          {/* 3. CALL TO ACTION FOOTER BUTTON                         */}
          {/* ======================================================= */}
          {onShopFresh && (
            <div className="mt-16 sm:mt-20 text-center">
              <button
                onClick={onShopFresh}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#193E2D] text-[#FAF6ED] text-sm font-medium hover:bg-[#2D5A43] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Shop Fresh Organic Vegetables</span>
                <span className="text-xs">→</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
