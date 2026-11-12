"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollFruitJourneyProps {
  onShopFresh?: () => void;
}

export default function ScrollFruitJourney({ onShopFresh }: ScrollFruitJourneyProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const basketRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // GSAP ScrollTrigger Timeline for Upside Entrance Animation
  useEffect(() => {
    if (!sectionRef.current || !basketRef.current || !shadowRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // 1. Basket descends smoothly from upside (y: -220px -> 0px)
      // STRICTLY FIXED SCALE: scale is 1.0 permanently (NO zoom in, NO zoom out)
      tl.fromTo(
        basketRef.current,
        { y: -220, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.35,
          ease: "power3.out",
          onComplete: () => {
            if (videoRef.current && videoRef.current.paused) {
              videoRef.current.play().catch(() => {});
            }
          },
        }
      );

      // 2. Floor contact shadow expands in sync under basket base
      tl.fromTo(
        shadowRef.current,
        { opacity: 0, scale: 0.4 },
        { opacity: 1, scale: 1, duration: 1.35, ease: "power3.out" },
        "<"
      );

      // 3. Stagger Left Cards in from the left
      tl.fromTo(
        ".fruit-card-left",
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.85, stagger: 0.15, ease: "power2.out" },
        "-=0.75"
      );

      // 4. Stagger Right Cards in from the right
      tl.fromTo(
        ".fruit-card-right",
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.85, stagger: 0.15, ease: "power2.out" },
        "<"
      );
    }, sectionRef);

    return () => ctx.revert();
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
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 lg:mb-20">
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
        {/* 2. MAIN 3-COLUMN DESKTOP / BALANCED LAYOUT                */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 items-center">
          
          {/* ------------------------------------------------------- */}
          {/* A. LEFT CONTENT BLOCKS (Desktop: Col 1-3)               */}
          {/* Mobile Order: After central video                       */}
          {/* ------------------------------------------------------- */}
          <div className="order-2 lg:order-1 lg:col-span-3 flex flex-col justify-around gap-6 sm:gap-8 lg:gap-10 h-full py-2">
            
            {/* Block 01 */}
            <div className="fruit-card-left group text-left p-6 sm:p-7 rounded-2xl bg-white/75 backdrop-blur-xs border border-[#193E2D]/[0.08] shadow-[0_4px_20px_-4px_rgba(25,62,45,0.04)] hover:bg-white hover:shadow-[0_10px_28px_-6px_rgba(25,62,45,0.08)] transition-all duration-300">
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

            {/* Block 02 */}
            <div className="fruit-card-left group text-left p-6 sm:p-7 rounded-2xl bg-white/75 backdrop-blur-xs border border-[#193E2D]/[0.08] shadow-[0_4px_20px_-4px_rgba(25,62,45,0.04)] hover:bg-white hover:shadow-[0_10px_28px_-6px_rgba(25,62,45,0.08)] transition-all duration-300">
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

          {/* ------------------------------------------------------- */}
          {/* B. CENTRAL FRUIT HARVEST BASKET VIDEO (Col 4-9, 50%)    */}
          {/* Powered by GSAP upside entrance animation, FIXED 1.0   */}
          {/* ------------------------------------------------------- */}
          <div className="order-1 lg:order-2 md:col-span-2 lg:col-span-6 flex flex-col items-center justify-center relative">
            <div
              ref={basketRef}
              className="relative w-full max-w-[460px] flex flex-col items-center justify-center will-change-transform"
            >
              {/* Diffused Floor Shadow Under Basket Base (Animated in sync by GSAP) */}
              <div
                ref={shadowRef}
                className="absolute bottom-6 sm:bottom-8 w-56 sm:w-72 h-7 sm:h-9 rounded-[100%] bg-black/15 blur-lg pointer-events-none will-change-transform"
              />

              {/* Seamless Video Element: 4:5 Vertical Focus */}
              <div className="relative w-full aspect-[4/5] flex items-center justify-center pointer-events-none select-none overflow-hidden">
                <video
                  ref={videoRef}
                  src="/videos/fruit-harvest-basket-pure.mp4"
                  poster="/images/fruit-harvest-poster.jpg"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Subtle Quality Status Badge */}
              <div className="mt-2 px-4 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-[#193E2D]/10 shadow-[0_4px_16px_rgba(25,62,45,0.06)] flex items-center gap-2 pointer-events-none">
                <Sparkles className="w-3.5 h-3.5 text-[#193E2D]" />
                <span className="text-[11px] sm:text-xs font-medium text-[#193E2D] tracking-wide">
                  100% Naturally Ripened • Grade-A Harvest • Picked Daily
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
            <div className="fruit-card-right group text-left p-6 sm:p-7 rounded-2xl bg-white/75 backdrop-blur-xs border border-[#193E2D]/[0.08] shadow-[0_4px_20px_-4px_rgba(25,62,45,0.04)] hover:bg-white hover:shadow-[0_10px_28px_-6px_rgba(25,62,45,0.08)] transition-all duration-300">
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

            {/* Block 04 */}
            <div className="fruit-card-right group text-left p-6 sm:p-7 rounded-2xl bg-white/75 backdrop-blur-xs border border-[#193E2D]/[0.08] shadow-[0_4px_20px_-4px_rgba(25,62,45,0.04)] hover:bg-white hover:shadow-[0_10px_28px_-6px_rgba(25,62,45,0.08)] transition-all duration-300">
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

        {/* ========================================================= */}
        {/* 3. MAIN BUTTON (Centred dark green button below layout)   */}
        {/* ========================================================= */}
        <div className="mt-14 sm:mt-18 lg:mt-22 flex justify-center">
          {onShopFresh ? (
            <button
              type="button"
              onClick={onShopFresh}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#193E2D] text-white font-medium text-sm sm:text-base shadow-[0_10px_30px_-5px_rgba(25,62,45,0.3)] hover:bg-[#122e21] hover:shadow-[0_15px_35px_-5px_rgba(25,62,45,0.4)] active:scale-[0.98] transition-all duration-300 group cursor-pointer"
            >
              <span>Explore Orchard Harvest</span>
              <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          ) : (
            <Link
              href="/shop/fruits"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#193E2D] text-white font-medium text-sm sm:text-base shadow-[0_10px_30px_-5px_rgba(25,62,45,0.3)] hover:bg-[#122e21] hover:shadow-[0_15px_35px_-5px_rgba(25,62,45,0.4)] active:scale-[0.98] transition-all duration-300 group"
            >
              <span>Explore Orchard Harvest</span>
              <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          )}
        </div>

      </div>
    </section>
  );
}
