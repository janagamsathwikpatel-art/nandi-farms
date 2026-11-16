"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check, CheckCircle2 } from "lucide-react";
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

          // Milk Substep: 0.00 - 0.14 (Cards 01/02), 0.16 - 0.30 (Cards 03/04)
          if (p < 0.14) {
            gsap.set(".milk-sub-1", { opacity: 1, y: 0, pointerEvents: "auto" });
            gsap.set(".milk-sub-2", { opacity: 0, y: 30, pointerEvents: "none" });
          } else if (p < 0.18) {
            const t = (p - 0.14) / 0.04;
            gsap.set(".milk-sub-1", { opacity: 1 - t, y: -t * 30, pointerEvents: "none" });
            gsap.set(".milk-sub-2", { opacity: t, y: 30 * (1 - t), pointerEvents: "auto" });
          } else {
            gsap.set(".milk-sub-1", { opacity: 0, y: -30, pointerEvents: "none" });
            gsap.set(".milk-sub-2", { opacity: 1, y: 0, pointerEvents: "auto" });
          }

          // Milk Bottle vertical glide
          const milkTravel = Math.min(1, Math.max(0, p / 0.30));
          gsap.set(".milk-moving-asset", { y: (milkTravel - 0.5) * 60 });

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

          // Fruit Substep: 0.33 - 0.47 (Cards 01/02), 0.51 - 0.64 (Cards 03/04)
          if (p >= 0.33 && p < 0.47) {
            gsap.set(".fruit-sub-1", { opacity: 1, y: 0, pointerEvents: "auto" });
            gsap.set(".fruit-sub-2", { opacity: 0, y: 30, pointerEvents: "none" });
          } else if (p >= 0.47 && p < 0.51) {
            const t = (p - 0.47) / 0.04;
            gsap.set(".fruit-sub-1", { opacity: 1 - t, y: -t * 30, pointerEvents: "none" });
            gsap.set(".fruit-sub-2", { opacity: t, y: 30 * (1 - t), pointerEvents: "auto" });
          } else if (p >= 0.51) {
            gsap.set(".fruit-sub-1", { opacity: 0, y: -30, pointerEvents: "none" });
            gsap.set(".fruit-sub-2", { opacity: 1, y: 0, pointerEvents: "auto" });
          }

          // Fruit Basket vertical glide
          const fruitTravel = Math.min(1, Math.max(0, (p - 0.33) / 0.30));
          gsap.set(".fruit-moving-asset", { y: (fruitTravel - 0.5) * 60 });

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

          // Veg Substep: 0.66 - 0.81 (Cards 01/02), 0.85 - 0.98 (Cards 03/04)
          if (p >= 0.66 && p < 0.81) {
            gsap.set(".veg-sub-1", { opacity: 1, y: 0, pointerEvents: "auto" });
            gsap.set(".veg-sub-2", { opacity: 0, y: 30, pointerEvents: "none" });
          } else if (p >= 0.81 && p < 0.85) {
            const t = (p - 0.81) / 0.04;
            gsap.set(".veg-sub-1", { opacity: 1 - t, y: -t * 30, pointerEvents: "none" });
            gsap.set(".veg-sub-2", { opacity: t, y: 30 * (1 - t), pointerEvents: "auto" });
          } else if (p >= 0.85) {
            gsap.set(".veg-sub-1", { opacity: 0, y: -30, pointerEvents: "none" });
            gsap.set(".veg-sub-2", { opacity: 1, y: 0, pointerEvents: "auto" });
          }

          // Veg Basket vertical glide
          const vegTravel = Math.min(1, Math.max(0, (p - 0.66) / 0.32));
          gsap.set(".veg-moving-asset", { y: (vegTravel - 0.5) * 60 });
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

  const scrollToPhase = (targetProgress: number) => {
    if (outerTrackRef.current) {
      const top = outerTrackRef.current.offsetTop;
      const height = outerTrackRef.current.offsetHeight;
      const targetY = top + targetProgress * height;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

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
        <div className="relative w-full h-full max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col justify-between py-6 sm:py-8 lg:py-10">

          {/* =========================================================== */}
          {/* LAYER 1: PURE A2 MILK JOURNEY                               */}
          {/* =========================================================== */}
          <div className="phase-layer-milk absolute inset-0 px-4 sm:px-8 lg:px-12 py-6 sm:py-8 lg:py-10 flex flex-col justify-between will-change-transform z-30">
            {/* Header */}
            <div className="text-center pt-2 select-text">
              <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-[#193E2D]/5 border border-[#193E2D]/10 mb-3 shadow-xs">
                <button
                  type="button"
                  onClick={() => scrollToPhase(0.05)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#193E2D] text-white shadow-md shadow-[#193E2D]/20 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  <span>1. Farm Milk</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollToPhase(0.38)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#193E2D]/70 hover:text-[#193E2D] cursor-pointer"
                >
                  <span>2. Orchard Fruits</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollToPhase(0.72)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#193E2D]/70 hover:text-[#193E2D] cursor-pointer"
                >
                  <span>3. Living Soil Veggies</span>
                </button>
              </div>

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

            {/* Stage Grid */}
            <div className="relative w-full flex-1 flex items-center justify-center my-2">
              <div className="grid grid-cols-12 gap-6 lg:gap-8 items-center w-full max-w-[1300px]">
                {/* Left Cards */}
                <div className="col-span-12 lg:col-span-4 relative min-h-[260px] lg:min-h-[300px] flex items-center">
                  <div className="milk-sub-1 absolute inset-0 flex items-center will-change-transform">
                    <div className="w-full">
                      {renderMilestoneCard(milkJourney.steps[0], "milk-01", copiedKey, handleCopyStep)}
                    </div>
                  </div>
                  <div className="milk-sub-2 absolute inset-0 flex items-center opacity-0 will-change-transform">
                    <div className="w-full">
                      {renderMilestoneCard(milkJourney.steps[2], "milk-03", copiedKey, handleCopyStep)}
                    </div>
                  </div>
                </div>

                {/* Center Milk Bottle Asset */}
                <div className="col-span-12 lg:col-span-4 flex flex-col items-center justify-center pointer-events-none select-none relative min-h-[280px] lg:min-h-[360px]">
                  <div className="milk-moving-asset relative w-full flex flex-col items-center justify-center will-change-transform">
                    <div className="absolute -bottom-2 w-64 h-6 rounded-[100%] bg-black/15 blur-lg pointer-events-none" />
                    <div className="relative w-full aspect-[4/5] max-w-[320px] lg:max-w-[340px] flex items-center justify-center">
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

                {/* Right Cards */}
                <div className="col-span-12 lg:col-span-4 relative min-h-[260px] lg:min-h-[300px] flex items-center">
                  <div className="milk-sub-1 absolute inset-0 flex items-center will-change-transform">
                    <div className="w-full">
                      {renderMilestoneCard(milkJourney.steps[1], "milk-02", copiedKey, handleCopyStep)}
                    </div>
                  </div>
                  <div className="milk-sub-2 absolute inset-0 flex items-center opacity-0 will-change-transform">
                    <div className="w-full">
                      {renderMilestoneCard(milkJourney.steps[3], "milk-04", copiedKey, handleCopyStep)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="text-center pb-2 flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={() => onShopFresh?.("milk")}
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#193E2D] hover:bg-[#23533d] active:scale-95 text-white font-medium text-xs sm:text-sm shadow-md shadow-[#193E2D]/20 transition-all cursor-pointer"
              >
                <span>Shop Fresh A2 Milk</span>
                <span>→</span>
              </button>
              <p className="text-[11px] text-[#193E2D]/50">Scroll to explore Milk Journey & Fruits</p>
            </div>
          </div>

          {/* =========================================================== */}
          {/* LAYER 2: TREE-RIPENED FRUIT HARVEST                         */}
          {/* =========================================================== */}
          <div className="phase-layer-fruits absolute inset-0 px-4 sm:px-8 lg:px-12 py-6 sm:py-8 lg:py-10 flex flex-col justify-between will-change-transform opacity-0 pointer-events-none z-20">
            {/* Header */}
            <div className="text-center pt-2 select-text">
              <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-[#193E2D]/5 border border-[#193E2D]/10 mb-3 shadow-xs">
                <button
                  type="button"
                  onClick={() => scrollToPhase(0.05)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#193E2D]/70 hover:text-[#193E2D] cursor-pointer"
                >
                  <span>1. Farm Milk</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollToPhase(0.38)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#193E2D] text-white shadow-md shadow-[#193E2D]/20 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
                  <span>2. Orchard Fruits</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollToPhase(0.72)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#193E2D]/70 hover:text-[#193E2D] cursor-pointer"
                >
                  <span>3. Living Soil Veggies</span>
                </button>
              </div>

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

            {/* Stage Grid */}
            <div className="relative w-full flex-1 flex items-center justify-center my-2">
              <div className="grid grid-cols-12 gap-6 lg:gap-8 items-center w-full max-w-[1300px]">
                {/* Left Cards */}
                <div className="col-span-12 lg:col-span-4 relative min-h-[260px] lg:min-h-[300px] flex items-center">
                  <div className="fruit-sub-1 absolute inset-0 flex items-center will-change-transform">
                    <div className="w-full">
                      {renderMilestoneCard(fruitHarvestJourney.steps[0], "fruit-01", copiedKey, handleCopyStep)}
                    </div>
                  </div>
                  <div className="fruit-sub-2 absolute inset-0 flex items-center opacity-0 will-change-transform">
                    <div className="w-full">
                      {renderMilestoneCard(fruitHarvestJourney.steps[2], "fruit-03", copiedKey, handleCopyStep)}
                    </div>
                  </div>
                </div>

                {/* Center Fruit Basket Asset */}
                <div className="col-span-12 lg:col-span-4 flex flex-col items-center justify-center pointer-events-none select-none relative min-h-[280px] lg:min-h-[360px]">
                  <div className="fruit-moving-asset relative w-full flex flex-col items-center justify-center will-change-transform">
                    <div className="absolute -bottom-2 w-72 h-6 rounded-[100%] bg-black/15 blur-lg pointer-events-none" />
                    <div className="relative w-full aspect-[16/12] max-w-[360px] lg:max-w-[380px] flex items-center justify-center">
                      <img
                        src="/images/fruit-basket-full-hd.png"
                        alt="Nandi Heritage Fruit Basket"
                        className="w-full h-full object-contain drop-shadow-[0_16px_28px_rgba(25,62,45,0.15)] pointer-events-none select-none"
                        loading="eager"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Cards */}
                <div className="col-span-12 lg:col-span-4 relative min-h-[260px] lg:min-h-[300px] flex items-center">
                  <div className="fruit-sub-1 absolute inset-0 flex items-center will-change-transform">
                    <div className="w-full">
                      {renderMilestoneCard(fruitHarvestJourney.steps[1], "fruit-02", copiedKey, handleCopyStep)}
                    </div>
                  </div>
                  <div className="fruit-sub-2 absolute inset-0 flex items-center opacity-0 will-change-transform">
                    <div className="w-full">
                      {renderMilestoneCard(fruitHarvestJourney.steps[3], "fruit-04", copiedKey, handleCopyStep)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="text-center pb-2 flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={() => onShopFresh?.("fruits")}
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#193E2D] hover:bg-[#23533d] active:scale-95 text-white font-medium text-xs sm:text-sm shadow-md shadow-[#193E2D]/20 transition-all cursor-pointer"
              >
                <span>Shop Farm Fresh Fruits</span>
                <span>→</span>
              </button>
              <p className="text-[11px] text-[#193E2D]/50">Scroll to explore Fruit Harvest & Vegetables</p>
            </div>
          </div>

          {/* =========================================================== */}
          {/* LAYER 3: LIVING SOIL VEGETABLE JOURNEY                      */}
          {/* =========================================================== */}
          <div className="phase-layer-vegetables absolute inset-0 px-4 sm:px-8 lg:px-12 py-6 sm:py-8 lg:py-10 flex flex-col justify-between will-change-transform opacity-0 pointer-events-none z-10">
            {/* Header */}
            <div className="text-center pt-2 select-text">
              <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-[#193E2D]/5 border border-[#193E2D]/10 mb-3 shadow-xs">
                <button
                  type="button"
                  onClick={() => scrollToPhase(0.05)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#193E2D]/70 hover:text-[#193E2D] cursor-pointer"
                >
                  <span>1. Farm Milk</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollToPhase(0.38)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#193E2D]/70 hover:text-[#193E2D] cursor-pointer"
                >
                  <span>2. Orchard Fruits</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollToPhase(0.72)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#193E2D] text-white shadow-md shadow-[#193E2D]/20 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  <span>3. Living Soil Veggies</span>
                </button>
              </div>

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

            {/* Stage Grid */}
            <div className="relative w-full flex-1 flex items-center justify-center my-2">
              <div className="grid grid-cols-12 gap-6 lg:gap-8 items-center w-full max-w-[1300px]">
                {/* Left Cards */}
                <div className="col-span-12 lg:col-span-4 relative min-h-[260px] lg:min-h-[300px] flex items-center">
                  <div className="veg-sub-1 absolute inset-0 flex items-center will-change-transform">
                    <div className="w-full">
                      {renderMilestoneCard(livingSoilJourney.steps[0], "veg-01", copiedKey, handleCopyStep)}
                    </div>
                  </div>
                  <div className="veg-sub-2 absolute inset-0 flex items-center opacity-0 will-change-transform">
                    <div className="w-full">
                      {renderMilestoneCard(livingSoilJourney.steps[2], "veg-03", copiedKey, handleCopyStep)}
                    </div>
                  </div>
                </div>

                {/* Center Vegetable Basket Asset */}
                <div className="col-span-12 lg:col-span-4 flex flex-col items-center justify-center pointer-events-none select-none relative min-h-[280px] lg:min-h-[360px]">
                  <div className="veg-moving-asset relative w-full flex flex-col items-center justify-center will-change-transform">
                    <div className="absolute -bottom-2 w-72 h-6 rounded-[100%] bg-black/15 blur-lg pointer-events-none" />
                    <div className="relative w-full aspect-[16/10] max-w-[380px] lg:max-w-[400px] flex items-center justify-center">
                      <img
                        src="/images/user-vegetable-basket-transparent.png"
                        alt="Nandi Living Soil Vegetable Basket"
                        className="w-full h-full object-contain drop-shadow-[0_16px_28px_rgba(25,62,45,0.15)] pointer-events-none select-none"
                        loading="eager"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Cards */}
                <div className="col-span-12 lg:col-span-4 relative min-h-[260px] lg:min-h-[300px] flex items-center">
                  <div className="veg-sub-1 absolute inset-0 flex items-center will-change-transform">
                    <div className="w-full">
                      {renderMilestoneCard(livingSoilJourney.steps[1], "veg-02", copiedKey, handleCopyStep)}
                    </div>
                  </div>
                  <div className="veg-sub-2 absolute inset-0 flex items-center opacity-0 will-change-transform">
                    <div className="w-full">
                      {renderMilestoneCard(livingSoilJourney.steps[3], "veg-04", copiedKey, handleCopyStep)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="text-center pb-2 flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={() => onShopFresh?.("vegetables")}
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#193E2D] hover:bg-[#23533d] active:scale-95 text-white font-medium text-xs sm:text-sm shadow-md shadow-[#193E2D]/20 transition-all cursor-pointer"
              >
                <span>Shop Fresh Organic Vegetables</span>
                <span>→</span>
              </button>
              <p className="text-[11px] text-[#193E2D]/50">Scroll to finish journey & explore harvest catalog</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Reusable Milestone Card Render Helper with 100% full text display
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
      className={`group relative text-left p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-md border transition-all duration-300 cursor-pointer select-text
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

      {/* Header: Number, Title & Copy Icon */}
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2.5">
          <span className="inline-block text-[11px] font-bold text-[#193E2D] px-2.5 py-0.5 rounded-full bg-[#193E2D]/10 tracking-wide select-text">
            {step.number}
          </span>
          <h3 className="font-playfair text-lg sm:text-xl font-normal text-[#193E2D] tracking-tight select-text">
            {step.title}
          </h3>
        </div>
        <div className="text-[#193E2D]/40 group-hover:text-[#193E2D] transition-colors p-1 rounded-md hover:bg-[#193E2D]/5">
          {isCopied ? <Check className="w-4 h-4 text-[#193E2D]" /> : <span className="text-[11px] font-medium text-[#193E2D]/50 group-hover:text-[#193E2D]">Copy</span>}
        </div>
      </div>

      {/* Subtitle Badge */}
      <p className="text-[10px] sm:text-[11px] font-semibold text-[#193E2D]/90 uppercase tracking-wider mb-2 select-text">
        {step.subtitle}
      </p>

      {/* Description Text */}
      <p className="text-xs sm:text-[13px] text-[#193E2D]/80 leading-relaxed font-normal mb-3 select-text line-clamp-3 sm:line-clamp-none">
        {step.text}
      </p>

      {/* Tags & Time Indicators */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#193E2D]/5">
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
        <span className="text-[10px] text-[#193E2D]/60 italic select-text">
          {step.time}
        </span>
      </div>
    </div>
  );
}
