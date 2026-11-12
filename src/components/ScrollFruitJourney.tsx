"use client";

import React, { useEffect, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollFruitJourneyProps {
  onShopFresh?: () => void;
}

export default function ScrollFruitJourney({ onShopFresh }: ScrollFruitJourneyProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const journeyContainerRef = useRef<HTMLDivElement>(null);
  const basketDesktopRef = useRef<HTMLDivElement>(null);
  const basketMobileRef = useRef<HTMLDivElement>(null);
  const videoDesktopRef = useRef<HTMLVideoElement>(null);
  const videoMobileRef = useRef<HTMLVideoElement>(null);

  // GSAP ScrollTrigger Animation for Alternating Journey & Moving Fruit Basket
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

      // 2. Step 01 Reveal on LEFT SIDE
      gsap.fromTo(
        ".fruit-step-card-01-left",
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".fruit-step-card-01-left",
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 3. Step 02 Reveal on RIGHT SIDE
      gsap.fromTo(
        ".fruit-step-card-02-right",
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".fruit-step-card-02-right",
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 4. Step 03 Reveal on LEFT SIDE
      gsap.fromTo(
        ".fruit-step-card-03-left",
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".fruit-step-card-03-left",
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 5. Step 04 Reveal on RIGHT SIDE
      gsap.fromTo(
        ".fruit-step-card-04-right",
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".fruit-step-card-04-right",
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 6. Mobile Basket Initial Entry
      if (basketMobileRef.current) {
        gsap.fromTo(
          basketMobileRef.current,
          { opacity: 0, y: -40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: basketMobileRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Play once when Fruit Harvest section becomes visible, and hold the filled-basket frame
  useEffect(() => {
    if (!sectionRef.current) return;

    let hasPlayed = false;
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 70%",
      onEnter: () => {
        if (!hasPlayed) {
          hasPlayed = true;
          const vD = videoDesktopRef.current;
          if (vD) {
            vD.currentTime = 0;
            vD.play().catch(() => {});
          }
          const vM = videoMobileRef.current;
          if (vM) {
            vM.currentTime = 0;
            vM.play().catch(() => {});
          }
        }
      },
    });

    const handleHold = (vid: HTMLVideoElement | null) => {
      if (!vid) return () => {};
      const onEnded = () => {
        vid.pause(); // Hold final filled-basket frame permanently
      };
      vid.addEventListener("ended", onEnded);
      return () => vid.removeEventListener("ended", onEnded);
    };

    const cleanDesktop = handleHold(videoDesktopRef.current);
    const cleanMobile = handleHold(videoMobileRef.current);

    return () => {
      trigger.kill();
      cleanDesktop();
      cleanMobile();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="scroll-fruit-journey"
      className="relative w-full bg-[#FAF6ED] py-16 sm:py-20 lg:py-28 px-4 sm:px-8 lg:px-12 select-none overflow-hidden border-t border-[#193E2D]/5"
    >
      <div className="max-w-[1280px] mx-auto">
        
        {/* ========================================================= */}
        {/* 1. SECTION HEADING (Centred with strong visual hierarchy) */}
        {/* ========================================================= */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20 lg:mb-24">
          <p className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#193E2D] mb-3">
            THE FRUIT HARVEST
          </p>
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#193E2D] mb-4 leading-tight">
            From Orchards to Your Table
          </h2>
          <p className="text-sm sm:text-base text-[#193E2D]/75 font-normal">
            Hand-picked at peak natural ripeness with zero chemicals and zero carbide.
          </p>
        </div>

        {/* ========================================================= */}
        {/* 2. ALTERNATING SCROLL JOURNEY CONTAINER                   */}
        {/* ========================================================= */}
        <div ref={journeyContainerRef} className="relative w-full">
          
          {/* Central Vertical Spine Guideline (Desktop Only) */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-[#193E2D]/10 pointer-events-none" />

          {/* ------------------------------------------------------- */}
          {/* DESKTOP CENTRAL MOVING BASKET TRACK (Sticky/GSAP Scrub) */}
          {/* Scale locked permanently at 1.0 (zero zoom in/out)      */}
          {/* Full-width uncropped basket (aspect 16/11, w-[480px])   */}
          {/* ------------------------------------------------------- */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none z-20 w-[480px] will-change-transform">
            <div
              ref={basketDesktopRef}
              className="relative w-full flex flex-col items-center justify-center will-change-transform"
            >
              {/* Diffused Floor Shadow Under Full Basket Base */}
              <div className="absolute bottom-4 w-72 h-8 rounded-[100%] bg-black/15 blur-lg pointer-events-none" />

              {/* Option 2: Dedicated True Alpha WebM Video (VP9 yuva420p) */}
              <div className="relative w-full aspect-[16/11] flex items-center justify-center pointer-events-none select-none overflow-hidden">
                <video
                  ref={videoDesktopRef}
                  src="/videos/fruit-harvest-basket-alpha.webm"
                  poster="/images/fruit-harvest-poster-v5.jpg"
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------- */}
          {/* MOBILE BASKET DISPLAY (Top of Mobile Flow)              */}
          {/* ------------------------------------------------------- */}
          <div ref={basketMobileRef} className="lg:hidden flex flex-col items-center justify-center mb-10">
            <div className="relative w-full max-w-[380px] aspect-[16/11] flex items-center justify-center pointer-events-none select-none overflow-hidden">
              <video
                ref={videoMobileRef}
                src="/videos/fruit-harvest-basket-alpha.webm"
                poster="/images/fruit-harvest-poster-v5.jpg"
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
              <div className="lg:col-span-4 fruit-step-card-01-left">
                <div className="group text-left p-6 sm:p-7 rounded-2xl bg-white/80 backdrop-blur-xs border border-[#193E2D]/[0.08] shadow-[0_4px_20px_-4px_rgba(25,62,45,0.04)] hover:bg-white hover:shadow-[0_10px_28px_-6px_rgba(25,62,45,0.08)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2.5">
                    <span className="inline-block text-[11px] font-bold text-[#193E2D] px-2.5 py-1 rounded-full bg-[#193E2D]/10 tracking-wide">
                      01
                    </span>
                    <h3 className="font-playfair text-xl sm:text-2xl font-normal text-[#193E2D] tracking-tight">
                      Sun-Kissed Orchards
                    </h3>
                  </div>
                  <p className="text-[11px] font-semibold text-[#193E2D]/90 uppercase tracking-wider mb-2">
                    Ethical Growing • 100% Tree-Ripened
                  </p>
                  <p className="text-xs sm:text-sm text-[#193E2D]/80 leading-relaxed font-normal mb-4">
                    Nurtured across chemical-free heritage orchards in Karnataka. Allowed to mature fully on the branch under natural sunlight, achieving rich natural sweetness and peak nutritional density.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1 border-t border-[#193E2D]/5">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#193E2D] bg-[#193E2D]/5 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-[#193E2D]" />
                      100% Tree-Ripened
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#193E2D] bg-[#193E2D]/5 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-[#193E2D]" />
                      Zero Carbide
                    </span>
                  </div>
                </div>
              </div>

              {/* CENTER COLUMN: Spacer for moving basket track */}
              <div className="hidden lg:block lg:col-span-4" />

              {/* RIGHT SIDE: Ambient subtle milestone indicator */}
              <div className="hidden lg:flex lg:col-span-4 items-center justify-start pl-8 text-[#193E2D]/40 text-xs italic">
                <span className="w-2.5 h-2.5 rounded-full bg-[#193E2D]/20 mr-3" />
                <span>05:00 AM • Dawn harvesting in mist-covered orchards</span>
              </div>
            </div>

            {/* ===================================================== */}
            {/* MILESTONE ROW 02: STEP 02 ON RIGHT                    */}
            {/* ===================================================== */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[220px]">
              {/* LEFT SIDE: Ambient subtle milestone indicator */}
              <div className="hidden lg:flex lg:col-span-4 items-center justify-end pr-8 text-[#193E2D]/40 text-xs italic">
                <span>06:00 AM • Organic pest shield inspection</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#193E2D]/20 ml-3" />
              </div>

              {/* CENTER COLUMN: Spacer for moving basket track */}
              <div className="hidden lg:block lg:col-span-4" />

              {/* RIGHT SIDE: Card 02 */}
              <div className="lg:col-span-4 fruit-step-card-02-right">
                <div className="group text-left p-6 sm:p-7 rounded-2xl bg-white/80 backdrop-blur-xs border border-[#193E2D]/[0.08] shadow-[0_4px_20px_-4px_rgba(25,62,45,0.04)] hover:bg-white hover:shadow-[0_10px_28px_-6px_rgba(25,62,45,0.08)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2.5">
                    <span className="inline-block text-[11px] font-bold text-[#193E2D] px-2.5 py-1 rounded-full bg-[#193E2D]/10 tracking-wide">
                      02
                    </span>
                    <h3 className="font-playfair text-xl sm:text-2xl font-normal text-[#193E2D] tracking-tight">
                      Zero Chemicals
                    </h3>
                  </div>
                  <p className="text-[11px] font-semibold text-[#193E2D]/90 uppercase tracking-wider mb-2">
                    Bio-Organic Care • Safe for Children
                  </p>
                  <p className="text-xs sm:text-sm text-[#193E2D]/80 leading-relaxed font-normal mb-4">
                    Protected using traditional neem decoctions, friendly bio-controls, and pure cow dung vermicompost. Every single harvest batch is rigorously lab-tested for zero synthetic chemical or carbide residues.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1 border-t border-[#193E2D]/5">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#193E2D] bg-[#193E2D]/5 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-[#193E2D]" />
                      Lab-Tested Clean
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#193E2D] bg-[#193E2D]/5 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-[#193E2D]" />
                      Zero Ethylene Gas
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
              <div className="lg:col-span-4 fruit-step-card-03-left">
                <div className="group text-left p-6 sm:p-7 rounded-2xl bg-white/80 backdrop-blur-xs border border-[#193E2D]/[0.08] shadow-[0_4px_20px_-4px_rgba(25,62,45,0.04)] hover:bg-white hover:shadow-[0_10px_28px_-6px_rgba(25,62,45,0.08)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2.5">
                    <span className="inline-block text-[11px] font-bold text-[#193E2D] px-2.5 py-1 rounded-full bg-[#193E2D]/10 tracking-wide">
                      03
                    </span>
                    <h3 className="font-playfair text-xl sm:text-2xl font-normal text-[#193E2D] tracking-tight">
                      Hand-Sorted Grade-A
                    </h3>
                  </div>
                  <p className="text-[11px] font-semibold text-[#193E2D]/90 uppercase tracking-wider mb-2">
                    Gentle Sorting • Peak Brix Index
                  </p>
                  <p className="text-xs sm:text-sm text-[#193E2D]/80 leading-relaxed font-normal mb-4">
                    Carefully hand-graded at dawn by skilled farming artisans. Only pristine, unblemished, and peak-brix fruits make it into your morning harvest basket, ensuring supreme sweetness and aroma.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1 border-t border-[#193E2D]/5">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#193E2D] bg-[#193E2D]/5 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-[#193E2D]" />
                      Hand-Graded
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#193E2D] bg-[#193E2D]/5 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-[#193E2D]" />
                      Peak Brix Sugar
                    </span>
                  </div>
                </div>
              </div>

              {/* CENTER COLUMN: Spacer for moving basket track */}
              <div className="hidden lg:block lg:col-span-4" />

              {/* RIGHT SIDE: Ambient subtle milestone indicator */}
              <div className="hidden lg:flex lg:col-span-4 items-center justify-start pl-8 text-[#193E2D]/40 text-xs italic">
                <span className="w-2.5 h-2.5 rounded-full bg-[#193E2D]/20 mr-3" />
                <span>06:45 AM • Artisanal grading for uncompromised brix</span>
              </div>
            </div>

            {/* ===================================================== */}
            {/* MILESTONE ROW 04: STEP 04 ON RIGHT                    */}
            {/* ===================================================== */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[220px]">
              {/* LEFT SIDE: Ambient subtle milestone indicator */}
              <div className="hidden lg:flex lg:col-span-4 items-center justify-end pr-8 text-[#193E2D]/40 text-xs italic">
                <span>07:15 AM • Packed fresh and dispatched</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#193E2D]/20 ml-3" />
              </div>

              {/* CENTER COLUMN: Spacer for moving basket track */}
              <div className="hidden lg:block lg:col-span-4" />

              {/* RIGHT SIDE: Card 04 */}
              <div className="lg:col-span-4 fruit-step-card-04-right">
                <div className="group text-left p-6 sm:p-7 rounded-2xl bg-white/80 backdrop-blur-xs border border-[#193E2D]/[0.08] shadow-[0_4px_20px_-4px_rgba(25,62,45,0.04)] hover:bg-white hover:shadow-[0_10px_28px_-6px_rgba(25,62,45,0.08)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2.5">
                    <span className="inline-block text-[11px] font-bold text-[#193E2D] px-2.5 py-1 rounded-full bg-[#193E2D]/10 tracking-wide">
                      04
                    </span>
                    <h3 className="font-playfair text-xl sm:text-2xl font-normal text-[#193E2D] tracking-tight">
                      Tree-to-Door in 12h
                    </h3>
                  </div>
                  <p className="text-[11px] font-semibold text-[#193E2D]/90 uppercase tracking-wider mb-2">
                    Morning 06:30 AM • Doorstep Fresh
                  </p>
                  <p className="text-xs sm:text-sm text-[#193E2D]/80 leading-relaxed font-normal mb-4">
                    Harvested at dawn and delivered to your doorstep the very next morning. Experience the unbeatable crunch, fragrant orchard perfume, and vital living enzymes of true farm freshness.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1 border-t border-[#193E2D]/5">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#193E2D] bg-[#193E2D]/5 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-[#193E2D]" />
                      Delivered by 7 AM
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#193E2D] bg-[#193E2D]/5 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-[#193E2D]" />
                      Peak Morning Crunch
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
