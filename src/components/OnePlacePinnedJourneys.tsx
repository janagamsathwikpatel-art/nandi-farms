"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check, CheckCircle2, Copy } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { milkJourney } from "@/data/milkJourney";
import { fruitHarvestJourney } from "@/data/fruitHarvest";
import { livingSoilJourney } from "@/data/livingSoilJourney";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface OnePlacePinnedJourneysProps {
  onShopFresh?: (category: string) => void;
}

export default function OnePlacePinnedJourneys({ onShopFresh }: OnePlacePinnedJourneysProps) {
  const outerTrackRef = useRef<HTMLDivElement>(null);
  const pinnedStageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopyStep = (key: string, step: any) => {
    const formatted = `${step.number} ${step.title}\n${step.subtitle}\n\n${step.text}\n\nTags: ${step.tags.join(", ")}\nTimeline: ${step.time} • ${step.timeline}`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(formatted).then(() => {
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2200);
      }).catch(() => {});
    }
  };

  useEffect(() => {
    if (!outerTrackRef.current || !pinnedStageRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: outerTrackRef.current,
        pin: pinnedStageRef.current, // Hardware-locks stage in place via fixed positioning
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress; // 0.0 to 1.0

          // =========================================================
          // 1. PHASE 1: MILK JOURNEY (Progress 0.00 to 0.33)
          // =========================================================
          if (p < 0.30) {
            gsap.set(".phase-layer-milk", { opacity: 1, pointerEvents: "auto", display: "flex" });
          } else if (p < 0.33) {
            const fade = (0.33 - p) / 0.03;
            gsap.set(".phase-layer-milk", { opacity: fade, pointerEvents: "none", display: "flex" });
          } else {
            gsap.set(".phase-layer-milk", { opacity: 0, pointerEvents: "none", display: "none" });
          }

          // Milk Substep: 0.00 - 0.14 (Cards 01/02), 0.17 - 0.30 (Cards 03/04)
          if (p < 0.14) {
            gsap.set(".milk-sub-1", { opacity: 1, y: 0, pointerEvents: "auto", display: "flex" });
            gsap.set(".milk-sub-2", { opacity: 0, y: 20, pointerEvents: "none", display: "none" });
          } else if (p < 0.17) {
            const t = (p - 0.14) / 0.03;
            gsap.set(".milk-sub-1", { opacity: 1 - t, y: -t * 20, pointerEvents: "none", display: "flex" });
            gsap.set(".milk-sub-2", { opacity: t, y: 20 * (1 - t), pointerEvents: "auto", display: "flex" });
          } else {
            gsap.set(".milk-sub-1", { opacity: 0, y: -20, pointerEvents: "none", display: "none" });
            gsap.set(".milk-sub-2", { opacity: 1, y: 0, pointerEvents: "auto", display: "flex" });
          }

          // Milk Bottle vertical glide
          const milkTravel = Math.min(1, Math.max(0, p / 0.30));
          gsap.set(".milk-moving-asset", { y: (milkTravel - 0.5) * 50 });

          // =========================================================
          // 2. PHASE 2: FRUIT HARVEST (Progress 0.33 to 0.66)
          // =========================================================
          if (p < 0.33) {
            gsap.set(".phase-layer-fruits", { opacity: 0, pointerEvents: "none", display: "none" });
          } else if (p < 0.36) {
            const fade = (p - 0.33) / 0.03;
            gsap.set(".phase-layer-fruits", { opacity: fade, pointerEvents: "auto", display: "flex" });
          } else if (p < 0.63) {
            gsap.set(".phase-layer-fruits", { opacity: 1, pointerEvents: "auto", display: "flex" });
          } else if (p < 0.66) {
            const fade = (0.66 - p) / 0.03;
            gsap.set(".phase-layer-fruits", { opacity: fade, pointerEvents: "none", display: "flex" });
          } else {
            gsap.set(".phase-layer-fruits", { opacity: 0, pointerEvents: "none", display: "none" });
          }

          // Fruit Substep: 0.33 - 0.47 (Cards 01/02), 0.50 - 0.64 (Cards 03/04)
          if (p >= 0.33 && p < 0.47) {
            gsap.set(".fruit-sub-1", { opacity: 1, y: 0, pointerEvents: "auto", display: "flex" });
            gsap.set(".fruit-sub-2", { opacity: 0, y: 20, pointerEvents: "none", display: "none" });
          } else if (p >= 0.47 && p < 0.50) {
            const t = (p - 0.47) / 0.03;
            gsap.set(".fruit-sub-1", { opacity: 1 - t, y: -t * 20, pointerEvents: "none", display: "flex" });
            gsap.set(".fruit-sub-2", { opacity: t, y: 20 * (1 - t), pointerEvents: "auto", display: "flex" });
          } else if (p >= 0.50) {
            gsap.set(".fruit-sub-1", { opacity: 0, y: -20, pointerEvents: "none", display: "none" });
            gsap.set(".fruit-sub-2", { opacity: 1, y: 0, pointerEvents: "auto", display: "flex" });
          } else {
            gsap.set(".fruit-sub-1", { opacity: 1, y: 0, pointerEvents: "none", display: "none" });
            gsap.set(".fruit-sub-2", { opacity: 0, y: 20, pointerEvents: "none", display: "none" });
          }

          // Fruit Basket vertical glide
          const fruitTravel = Math.min(1, Math.max(0, (p - 0.33) / 0.30));
          gsap.set(".fruit-moving-asset", { y: (fruitTravel - 0.5) * 50 });

          // =========================================================
          // 3. PHASE 3: LIVING VEGETABLES (Progress 0.66 to 1.00)
          // =========================================================
          if (p < 0.66) {
            gsap.set(".phase-layer-vegetables", { opacity: 0, pointerEvents: "none", display: "none" });
          } else if (p < 0.69) {
            const fade = (p - 0.66) / 0.03;
            gsap.set(".phase-layer-vegetables", { opacity: fade, pointerEvents: "auto", display: "flex" });
          } else {
            gsap.set(".phase-layer-vegetables", { opacity: 1, pointerEvents: "auto", display: "flex" });
          }

          // Veg Substep: 0.66 - 0.81 (Cards 01/02), 0.84 - 0.98 (Cards 03/04)
          if (p >= 0.66 && p < 0.81) {
            gsap.set(".veg-sub-1", { opacity: 1, y: 0, pointerEvents: "auto", display: "flex" });
            gsap.set(".veg-sub-2", { opacity: 0, y: 20, pointerEvents: "none", display: "none" });
          } else if (p >= 0.81 && p < 0.84) {
            const t = (p - 0.81) / 0.03;
            gsap.set(".veg-sub-1", { opacity: 1 - t, y: -t * 20, pointerEvents: "none", display: "flex" });
            gsap.set(".veg-sub-2", { opacity: t, y: 20 * (1 - t), pointerEvents: "auto", display: "flex" });
          } else if (p >= 0.84) {
            gsap.set(".veg-sub-1", { opacity: 0, y: -20, pointerEvents: "none", display: "none" });
            gsap.set(".veg-sub-2", { opacity: 1, y: 0, pointerEvents: "auto", display: "flex" });
          } else {
            gsap.set(".veg-sub-1", { opacity: 1, y: 0, pointerEvents: "none", display: "none" });
            gsap.set(".veg-sub-2", { opacity: 0, y: 20, pointerEvents: "none", display: "none" });
          }

          // Veg Basket vertical glide
          const vegTravel = Math.min(1, Math.max(0, (p - 0.66) / 0.32));
          gsap.set(".veg-moving-asset", { y: (vegTravel - 0.5) * 50 });
        },
      });
    }, outerTrackRef);

    return () => ctx.revert();
  }, []);

  // Ensure looping playback for milk video
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const handleEnded = () => {
      vid.currentTime = 0;
      vid.play().catch(() => {});
    };
    vid.addEventListener("ended", handleEnded);
    return () => vid.removeEventListener("ended", handleEnded);
  }, []);

  return (
    <div
      ref={outerTrackRef}
      id="one-place-pinned-journeys"
      className="relative w-full h-[360vh] bg-[#FAF6ED]"
    >
      {/* ============================================================= */}
      {/* GSAP-PINNED STATIONARY VIEWPORT (Locks on screen at top-0)    */}
      {/* ============================================================= */}
      <div
        ref={pinnedStageRef}
        className="w-full h-screen relative overflow-hidden bg-[#FAF6ED] select-text"
      >
        <div className="relative w-full h-full max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col justify-between py-4 sm:py-6 lg:py-8">

          {/* =========================================================== */}
          {/* LAYER 1: PURE A2 MILK JOURNEY                               */}
          {/* =========================================================== */}
          <div className="phase-layer-milk absolute inset-0 px-4 sm:px-8 lg:px-12 py-4 sm:py-6 lg:py-8 flex flex-col justify-between will-change-transform z-30">
            {/* Header */}
            <div className="text-center pt-1 select-text">
              <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-[#193E2D] mb-1">
                {milkJourney.badge}
              </p>
              <h2 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-[#193E2D] mb-1 leading-tight select-text">
                {milkJourney.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#193E2D]/75 font-normal max-w-xl mx-auto select-text">
                {milkJourney.description}
              </p>
            </div>

            {/* Stage Grid: Exact Staggered Alternating Layout from User Screenshots */}
            <div className="relative w-full flex-1 flex items-center justify-center my-1">
              
              {/* Central Milk Bottle Asset (Stationary in Center, Spanning Height) */}
              <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none select-none z-10 flex flex-col items-center justify-center w-[300px] sm:w-[340px] lg:w-[380px]">
                <div className="milk-moving-asset relative w-full flex flex-col items-center justify-center will-change-transform">
                  <div className="absolute -bottom-2 w-56 h-6 rounded-[100%] bg-black/15 blur-lg pointer-events-none" />
                  <div className="relative w-full aspect-[4/5] flex items-center justify-center">
                    <video
                      ref={videoRef}
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

              {/* Substep 1: Cards 01 & 02 with Staggered Timeline Indicators (Matching Screenshot 1) */}
              <div className="milk-sub-1 absolute inset-0 flex flex-col justify-between py-2 sm:py-4 z-20 will-change-transform">
                {/* Row 1: Left = Card 01 | Right = Timeline 01 */}
                <div className="grid grid-cols-12 gap-4 lg:gap-8 items-center w-full">
                  <div className="col-span-12 lg:col-span-5 flex justify-start">
                    <div className="w-full max-w-[390px]">
                      {renderMilestoneCard(milkJourney.steps[0], "milk-01", copiedKey, handleCopyStep)}
                    </div>
                  </div>
                  <div className="hidden lg:block lg:col-span-2" />
                  <div className="hidden lg:flex lg:col-span-5 items-center justify-start pl-8 text-[#193E2D]/50 text-xs italic select-text">
                    <span className="w-2 h-2 rounded-full bg-[#193E2D]/30 mr-2.5" />
                    <span>{milkJourney.steps[0].time} • {milkJourney.steps[0].timeline}</span>
                  </div>
                </div>

                {/* Row 2: Left = Timeline 02 | Right = Card 02 */}
                <div className="grid grid-cols-12 gap-4 lg:gap-8 items-center w-full">
                  <div className="hidden lg:flex lg:col-span-5 items-center justify-end pr-8 text-[#193E2D]/50 text-xs italic select-text">
                    <span>{milkJourney.steps[1].time} • {milkJourney.steps[1].timeline}</span>
                    <span className="w-2 h-2 rounded-full bg-[#193E2D]/30 ml-2.5" />
                  </div>
                  <div className="hidden lg:block lg:col-span-2" />
                  <div className="col-span-12 lg:col-span-5 flex justify-end">
                    <div className="w-full max-w-[390px]">
                      {renderMilestoneCard(milkJourney.steps[1], "milk-02", copiedKey, handleCopyStep)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Substep 2: Cards 03 & 04 with Staggered Timeline Indicators (Matching Screenshot 2) */}
              <div className="milk-sub-2 absolute inset-0 flex flex-col justify-between py-2 sm:py-4 z-20 opacity-0 will-change-transform">
                {/* Row 1: Left = Card 03 | Right = Timeline 03 */}
                <div className="grid grid-cols-12 gap-4 lg:gap-8 items-center w-full">
                  <div className="col-span-12 lg:col-span-5 flex justify-start">
                    <div className="w-full max-w-[390px]">
                      {renderMilestoneCard(milkJourney.steps[2], "milk-03", copiedKey, handleCopyStep)}
                    </div>
                  </div>
                  <div className="hidden lg:block lg:col-span-2" />
                  <div className="hidden lg:flex lg:col-span-5 items-center justify-start pl-8 text-[#193E2D]/50 text-xs italic select-text">
                    <span className="w-2 h-2 rounded-full bg-[#193E2D]/30 mr-2.5" />
                    <span>{milkJourney.steps[2].time} • {milkJourney.steps[2].timeline}</span>
                  </div>
                </div>

                {/* Row 2: Left = Timeline 04 | Right = Card 04 */}
                <div className="grid grid-cols-12 gap-4 lg:gap-8 items-center w-full">
                  <div className="hidden lg:flex lg:col-span-5 items-center justify-end pr-8 text-[#193E2D]/50 text-xs italic select-text">
                    <span>{milkJourney.steps[3].time} • {milkJourney.steps[3].timeline}</span>
                    <span className="w-2 h-2 rounded-full bg-[#193E2D]/30 ml-2.5" />
                  </div>
                  <div className="hidden lg:block lg:col-span-2" />
                  <div className="col-span-12 lg:col-span-5 flex justify-end">
                    <div className="w-full max-w-[390px]">
                      {renderMilestoneCard(milkJourney.steps[3], "milk-04", copiedKey, handleCopyStep)}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom CTA */}
            <div className="text-center pb-1 flex flex-col items-center gap-1.5">
              <button
                type="button"
                onClick={() => onShopFresh?.("milk")}
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-2 rounded-full bg-[#193E2D] hover:bg-[#23533d] active:scale-95 text-white font-medium text-xs sm:text-sm shadow-md shadow-[#193E2D]/20 transition-all cursor-pointer"
              >
                <span>Shop Fresh A2 Milk</span>
                <span>→</span>
              </button>
              <p className="text-[10px] sm:text-[11px] text-[#193E2D]/50">Scroll to explore Milk Journey & Fruits</p>
            </div>
          </div>

          {/* =========================================================== */}
          {/* LAYER 2: TREE-RIPENED FRUIT HARVEST                         */}
          {/* =========================================================== */}
          <div className="phase-layer-fruits absolute inset-0 px-4 sm:px-8 lg:px-12 py-4 sm:py-6 lg:py-8 flex flex-col justify-between will-change-transform opacity-0 pointer-events-none z-20">
            {/* Header */}
            <div className="text-center pt-1 select-text">
              <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-[#193E2D] mb-1">
                {fruitHarvestJourney.badge}
              </p>
              <h2 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-[#193E2D] mb-1 leading-tight select-text">
                {fruitHarvestJourney.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#193E2D]/75 font-normal max-w-xl mx-auto select-text">
                {fruitHarvestJourney.description}
              </p>
            </div>

            {/* Stage Grid: Staggered Alternating Layout for Fruits */}
            <div className="relative w-full flex-1 flex items-center justify-center my-1">
              
              {/* Central Handcrafted Fruit Basket Asset */}
              <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none select-none z-10 flex flex-col items-center justify-center w-[320px] sm:w-[380px] lg:w-[420px]">
                <div className="fruit-moving-asset relative w-full flex flex-col items-center justify-center will-change-transform">
                  <div className="absolute -bottom-2 w-64 h-6 rounded-[100%] bg-black/15 blur-lg pointer-events-none" />
                  <div className="relative w-full aspect-[16/12] flex items-center justify-center">
                    <img
                      src="/images/fruit-basket-full-hd.png"
                      alt="Nandi Heritage Fruit Basket"
                      className="w-full h-full object-contain drop-shadow-[0_16px_28px_rgba(25,62,45,0.15)] pointer-events-none select-none"
                      loading="eager"
                    />
                  </div>
                </div>
              </div>

              {/* Substep 1: Cards 01 & 02 with Staggered Timeline Indicators */}
              <div className="fruit-sub-1 absolute inset-0 flex flex-col justify-between py-2 sm:py-4 z-20 will-change-transform">
                {/* Row 1: Left = Card 01 | Right = Timeline 01 */}
                <div className="grid grid-cols-12 gap-4 lg:gap-8 items-center w-full">
                  <div className="col-span-12 lg:col-span-5 flex justify-start">
                    <div className="w-full max-w-[390px]">
                      {renderMilestoneCard(fruitHarvestJourney.steps[0], "fruit-01", copiedKey, handleCopyStep)}
                    </div>
                  </div>
                  <div className="hidden lg:block lg:col-span-2" />
                  <div className="hidden lg:flex lg:col-span-5 items-center justify-start pl-8 text-[#193E2D]/50 text-xs italic select-text">
                    <span className="w-2 h-2 rounded-full bg-[#193E2D]/30 mr-2.5" />
                    <span>{fruitHarvestJourney.steps[0].time} • {fruitHarvestJourney.steps[0].timeline}</span>
                  </div>
                </div>

                {/* Row 2: Left = Timeline 02 | Right = Card 02 */}
                <div className="grid grid-cols-12 gap-4 lg:gap-8 items-center w-full">
                  <div className="hidden lg:flex lg:col-span-5 items-center justify-end pr-8 text-[#193E2D]/50 text-xs italic select-text">
                    <span>{fruitHarvestJourney.steps[1].time} • {fruitHarvestJourney.steps[1].timeline}</span>
                    <span className="w-2 h-2 rounded-full bg-[#193E2D]/30 ml-2.5" />
                  </div>
                  <div className="hidden lg:block lg:col-span-2" />
                  <div className="col-span-12 lg:col-span-5 flex justify-end">
                    <div className="w-full max-w-[390px]">
                      {renderMilestoneCard(fruitHarvestJourney.steps[1], "fruit-02", copiedKey, handleCopyStep)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Substep 2: Cards 03 & 04 with Staggered Timeline Indicators */}
              <div className="fruit-sub-2 absolute inset-0 flex flex-col justify-between py-2 sm:py-4 z-20 opacity-0 will-change-transform">
                {/* Row 1: Left = Card 03 | Right = Timeline 03 */}
                <div className="grid grid-cols-12 gap-4 lg:gap-8 items-center w-full">
                  <div className="col-span-12 lg:col-span-5 flex justify-start">
                    <div className="w-full max-w-[390px]">
                      {renderMilestoneCard(fruitHarvestJourney.steps[2], "fruit-03", copiedKey, handleCopyStep)}
                    </div>
                  </div>
                  <div className="hidden lg:block lg:col-span-2" />
                  <div className="hidden lg:flex lg:col-span-5 items-center justify-start pl-8 text-[#193E2D]/50 text-xs italic select-text">
                    <span className="w-2 h-2 rounded-full bg-[#193E2D]/30 mr-2.5" />
                    <span>{fruitHarvestJourney.steps[2].time} • {fruitHarvestJourney.steps[2].timeline}</span>
                  </div>
                </div>

                {/* Row 2: Left = Timeline 04 | Right = Card 04 */}
                <div className="grid grid-cols-12 gap-4 lg:gap-8 items-center w-full">
                  <div className="hidden lg:flex lg:col-span-5 items-center justify-end pr-8 text-[#193E2D]/50 text-xs italic select-text">
                    <span>{fruitHarvestJourney.steps[3].time} • {fruitHarvestJourney.steps[3].timeline}</span>
                    <span className="w-2 h-2 rounded-full bg-[#193E2D]/30 ml-2.5" />
                  </div>
                  <div className="hidden lg:block lg:col-span-2" />
                  <div className="col-span-12 lg:col-span-5 flex justify-end">
                    <div className="w-full max-w-[390px]">
                      {renderMilestoneCard(fruitHarvestJourney.steps[3], "fruit-04", copiedKey, handleCopyStep)}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom CTA */}
            <div className="text-center pb-1 flex flex-col items-center gap-1.5">
              <button
                type="button"
                onClick={() => onShopFresh?.("fruits")}
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-2 rounded-full bg-[#193E2D] hover:bg-[#23533d] active:scale-95 text-white font-medium text-xs sm:text-sm shadow-md shadow-[#193E2D]/20 transition-all cursor-pointer"
              >
                <span>Shop Farm Fresh Fruits</span>
                <span>→</span>
              </button>
              <p className="text-[10px] sm:text-[11px] text-[#193E2D]/50">Scroll to explore Fruit Harvest & Vegetables</p>
            </div>
          </div>

          {/* =========================================================== */}
          {/* LAYER 3: LIVING SOIL VEGETABLE JOURNEY                      */}
          {/* =========================================================== */}
          <div className="phase-layer-vegetables absolute inset-0 px-4 sm:px-8 lg:px-12 py-4 sm:py-6 lg:py-8 flex flex-col justify-between will-change-transform opacity-0 pointer-events-none z-10">
            {/* Header */}
            <div className="text-center pt-1 select-text">
              <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-[#193E2D] mb-1">
                {livingSoilJourney.badge}
              </p>
              <h2 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-[#193E2D] mb-1 leading-tight select-text">
                {livingSoilJourney.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#193E2D]/75 font-normal max-w-xl mx-auto select-text">
                {livingSoilJourney.description}
              </p>
            </div>

            {/* Stage Grid: Staggered Alternating Layout for Vegetables */}
            <div className="relative w-full flex-1 flex items-center justify-center my-1">
              
              {/* Central Organic Vegetable Basket Asset */}
              <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none select-none z-10 flex flex-col items-center justify-center w-[320px] sm:w-[380px] lg:w-[420px]">
                <div className="veg-moving-asset relative w-full flex flex-col items-center justify-center will-change-transform">
                  <div className="absolute -bottom-2 w-64 h-6 rounded-[100%] bg-black/15 blur-lg pointer-events-none" />
                  <div className="relative w-full aspect-[16/10] flex items-center justify-center">
                    <img
                      src="/images/user-vegetable-basket-transparent.png"
                      alt="Nandi Living Soil Vegetable Basket"
                      className="w-full h-full object-contain drop-shadow-[0_16px_28px_rgba(25,62,45,0.15)] pointer-events-none select-none"
                      loading="eager"
                    />
                  </div>
                </div>
              </div>

              {/* Substep 1: Cards 01 & 02 with Staggered Timeline Indicators */}
              <div className="veg-sub-1 absolute inset-0 flex flex-col justify-between py-2 sm:py-4 z-20 will-change-transform">
                {/* Row 1: Left = Card 01 | Right = Timeline 01 */}
                <div className="grid grid-cols-12 gap-4 lg:gap-8 items-center w-full">
                  <div className="col-span-12 lg:col-span-5 flex justify-start">
                    <div className="w-full max-w-[390px]">
                      {renderMilestoneCard(livingSoilJourney.steps[0], "veg-01", copiedKey, handleCopyStep)}
                    </div>
                  </div>
                  <div className="hidden lg:block lg:col-span-2" />
                  <div className="hidden lg:flex lg:col-span-5 items-center justify-start pl-8 text-[#193E2D]/50 text-xs italic select-text">
                    <span className="w-2 h-2 rounded-full bg-[#193E2D]/30 mr-2.5" />
                    <span>{livingSoilJourney.steps[0].time} • {livingSoilJourney.steps[0].timeline}</span>
                  </div>
                </div>

                {/* Row 2: Left = Timeline 02 | Right = Card 02 */}
                <div className="grid grid-cols-12 gap-4 lg:gap-8 items-center w-full">
                  <div className="hidden lg:flex lg:col-span-5 items-center justify-end pr-8 text-[#193E2D]/50 text-xs italic select-text">
                    <span>{livingSoilJourney.steps[1].time} • {livingSoilJourney.steps[1].timeline}</span>
                    <span className="w-2 h-2 rounded-full bg-[#193E2D]/30 ml-2.5" />
                  </div>
                  <div className="hidden lg:block lg:col-span-2" />
                  <div className="col-span-12 lg:col-span-5 flex justify-end">
                    <div className="w-full max-w-[390px]">
                      {renderMilestoneCard(livingSoilJourney.steps[1], "veg-02", copiedKey, handleCopyStep)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Substep 2: Cards 03 & 04 with Staggered Timeline Indicators */}
              <div className="veg-sub-2 absolute inset-0 flex flex-col justify-between py-2 sm:py-4 z-20 opacity-0 will-change-transform">
                {/* Row 1: Left = Card 03 | Right = Timeline 03 */}
                <div className="grid grid-cols-12 gap-4 lg:gap-8 items-center w-full">
                  <div className="col-span-12 lg:col-span-5 flex justify-start">
                    <div className="w-full max-w-[390px]">
                      {renderMilestoneCard(livingSoilJourney.steps[2], "veg-03", copiedKey, handleCopyStep)}
                    </div>
                  </div>
                  <div className="hidden lg:block lg:col-span-2" />
                  <div className="hidden lg:flex lg:col-span-5 items-center justify-start pl-8 text-[#193E2D]/50 text-xs italic select-text">
                    <span className="w-2 h-2 rounded-full bg-[#193E2D]/30 mr-2.5" />
                    <span>{livingSoilJourney.steps[2].time} • {livingSoilJourney.steps[2].timeline}</span>
                  </div>
                </div>

                {/* Row 2: Left = Timeline 04 | Right = Card 04 */}
                <div className="grid grid-cols-12 gap-4 lg:gap-8 items-center w-full">
                  <div className="hidden lg:flex lg:col-span-5 items-center justify-end pr-8 text-[#193E2D]/50 text-xs italic select-text">
                    <span>{livingSoilJourney.steps[3].time} • {livingSoilJourney.steps[3].timeline}</span>
                    <span className="w-2 h-2 rounded-full bg-[#193E2D]/30 ml-2.5" />
                  </div>
                  <div className="hidden lg:block lg:col-span-2" />
                  <div className="col-span-12 lg:col-span-5 flex justify-end">
                    <div className="w-full max-w-[390px]">
                      {renderMilestoneCard(livingSoilJourney.steps[3], "veg-04", copiedKey, handleCopyStep)}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom CTA */}
            <div className="text-center pb-1 flex flex-col items-center gap-1.5">
              <button
                type="button"
                onClick={() => onShopFresh?.("vegetables")}
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-2 rounded-full bg-[#193E2D] hover:bg-[#23533d] active:scale-95 text-white font-medium text-xs sm:text-sm shadow-md shadow-[#193E2D]/20 transition-all cursor-pointer"
              >
                <span>Shop Fresh Organic Vegetables</span>
                <span>→</span>
              </button>
              <p className="text-[10px] sm:text-[11px] text-[#193E2D]/50">Scroll to explore harvest catalog</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Reusable Milestone Card Render Helper matching the user's exact uploaded screenshots
function renderMilestoneCard(
  step: any,
  cardKey: string,
  copiedKey: string | null,
  onCopy: (key: string, step: any) => void
) {
  if (!step) return null;
  const isCopied = copiedKey === cardKey;

  return (
    <div
      onClick={() => onCopy(cardKey, step)}
      title="Click to copy milestone text"
      className={`group relative text-left p-3.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md border transition-all duration-300 cursor-pointer select-text
        transform hover:-translate-y-1 active:scale-[0.99]
        ${isCopied
          ? "border-[#193E2D] shadow-[0_12px_28px_-6px_rgba(25,62,45,0.22)] ring-2 ring-[#193E2D]/20"
          : "border-[#193E2D]/10 shadow-[0_4px_20px_-4px_rgba(25,62,45,0.06)] hover:bg-white hover:shadow-[0_10px_28px_-6px_rgba(25,62,45,0.12)]"
        }`}
    >
      {/* Copied Pill Notification */}
      {isCopied && (
        <div className="absolute -top-3.5 right-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#193E2D] text-white text-[11px] font-semibold shadow-lg animate-bounce">
          <Check className="w-3.5 h-3.5 text-emerald-300" />
          <span>Copied!</span>
        </div>
      )}

      {/* Header: Number Badge, Title & Copy Icon */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="inline-block text-[11px] font-bold text-[#193E2D] px-2 py-0.5 rounded-full bg-[#193E2D]/10 tracking-wide select-text">
            {step.number}
          </span>
          <h3 className="font-playfair text-base sm:text-lg lg:text-xl font-normal text-[#193E2D] tracking-tight select-text">
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

      {/* Subtitle Badge */}
      <p className="text-[10px] sm:text-[10.5px] font-semibold text-[#193E2D]/90 uppercase tracking-wider mb-1.5 select-text">
        {step.subtitle}
      </p>

      {/* Description Text */}
      <p className="text-[11.5px] sm:text-xs text-[#193E2D]/80 leading-relaxed font-normal mb-2.5 select-text">
        {step.text}
      </p>

      {/* Tags Indicator Badges */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1.5 border-t border-[#193E2D]/5">
        <div className="flex flex-wrap gap-1.5">
          {step.tags.map((tag: string, tIdx: number) => (
            <span
              key={tIdx}
              className="inline-flex items-center gap-1 text-[10px] font-medium text-[#193E2D] bg-[#193E2D]/5 px-2 py-0.5 rounded-full select-text"
            >
              <CheckCircle2 className="w-2.5 h-2.5 text-[#193E2D]" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
