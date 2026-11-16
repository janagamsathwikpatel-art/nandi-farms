"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check, CheckCircle2, ArrowRight } from "lucide-react";
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
  const videoRef = useRef<HTMLVideoElement>(null);

  // Active state derived from scrub progress for stateful UI (headers, badges, CTAs)
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0); // 0: Milk, 1: Fruits, 2: Veggies
  const [subStepIndex, setSubStepIndex] = useState<number>(0); // 0: Steps 01 & 02, 1: Steps 03 & 04
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const phases = [
    {
      id: "milk",
      badge: "THE MILK JOURNEY",
      title: "From Farm to Your Door",
      desc: "Pure single-source A2 farm milk chilled to 4°C within 15 minutes of dawn milking.",
      steps: milkJourney.steps,
      ctaLabel: "Shop Fresh A2 Milk",
    },
    {
      id: "fruits",
      badge: "THE FRUIT HARVEST",
      title: "From Orchards to Your Table",
      desc: "Tree-ripened orchard harvest delivered without carbide ripening or wax coating.",
      steps: fruitHarvestJourney.steps,
      ctaLabel: "Shop Farm Fresh Fruits",
    },
    {
      id: "vegetables",
      badge: "THE LIVING SOIL JOURNEY",
      title: "Farm-To-Table in 12 Hours",
      desc: "Harvested daily from certified bio-organic living soil nourished by natural Jeevamrutha compost.",
      steps: livingSoilJourney.steps,
      ctaLabel: "Shop Fresh Organic Vegetables",
    },
  ];

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
    if (!outerTrackRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: outerTrackRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
        onUpdate: (self) => {
          const p = self.progress; // 0.0 to 1.0

          // Calculate Phase Index (0: Milk, 1: Fruits, 2: Veggies)
          let currentPhase = 0;
          let phaseP = 0;

          if (p < 0.33) {
            currentPhase = 0;
            phaseP = p / 0.33;
          } else if (p < 0.66) {
            currentPhase = 1;
            phaseP = (p - 0.33) / 0.33;
          } else {
            currentPhase = 2;
            phaseP = Math.min(1, (p - 0.66) / 0.34);
          }

          setActivePhaseIndex(currentPhase);
          setSubStepIndex(phaseP < 0.5 ? 0 : 1);

          // -------------------------------------------------------------
          // 1. PHASE CROSSFADES (Milk -> Fruits -> Vegetables in-place)
          // -------------------------------------------------------------
          // Milk Layer (Phase 0)
          if (p < 0.30) {
            gsap.set(".phase-layer-milk", { opacity: 1, pointerEvents: "auto", display: "block" });
          } else if (p < 0.33) {
            const fade = (0.33 - p) / 0.03;
            gsap.set(".phase-layer-milk", { opacity: fade, pointerEvents: "none", display: "block" });
          } else {
            gsap.set(".phase-layer-milk", { opacity: 0, pointerEvents: "none", display: "none" });
          }

          // Fruits Layer (Phase 1)
          if (p < 0.33) {
            gsap.set(".phase-layer-fruits", { opacity: 0, pointerEvents: "none", display: "none" });
          } else if (p < 0.36) {
            const fade = (p - 0.33) / 0.03;
            gsap.set(".phase-layer-fruits", { opacity: fade, pointerEvents: "auto", display: "block" });
          } else if (p < 0.63) {
            gsap.set(".phase-layer-fruits", { opacity: 1, pointerEvents: "auto", display: "block" });
          } else if (p < 0.66) {
            const fade = (0.66 - p) / 0.03;
            gsap.set(".phase-layer-fruits", { opacity: fade, pointerEvents: "none", display: "block" });
          } else {
            gsap.set(".phase-layer-fruits", { opacity: 0, pointerEvents: "none", display: "none" });
          }

          // Vegetables Layer (Phase 2)
          if (p < 0.66) {
            gsap.set(".phase-layer-vegetables", { opacity: 0, pointerEvents: "none", display: "none" });
          } else if (p < 0.69) {
            const fade = (p - 0.66) / 0.03;
            gsap.set(".phase-layer-vegetables", { opacity: fade, pointerEvents: "auto", display: "block" });
          } else {
            gsap.set(".phase-layer-vegetables", { opacity: 1, pointerEvents: "auto", display: "block" });
          }

          // -------------------------------------------------------------
          // 2. CENTRAL ASSET VERTICAL TRAVEL
          // -------------------------------------------------------------
          // Sub-progress within each phase moves the central item smoothly from y: -20 to y: 60
          const assetY = (phaseP - 0.5) * 80;
          gsap.set(".pinned-central-moving-asset", { y: assetY });

          // -------------------------------------------------------------
          // 3. TWO-STAGE MILESTONE GLIDE (Steps 01 & 02 -> Steps 03 & 04)
          // -------------------------------------------------------------
          // In each phase, phaseP 0.0 to 0.45 shows Steps 01 & 02
          // phaseP 0.45 to 0.55 crossfades
          // phaseP 0.55 to 1.00 shows Steps 03 & 04
          const targetSub1 = `.substep-group-1`;
          const targetSub2 = `.substep-group-2`;

          if (phaseP < 0.44) {
            gsap.set(targetSub1, { opacity: 1, y: 0, pointerEvents: "auto" });
            gsap.set(targetSub2, { opacity: 0, y: 30, pointerEvents: "none" });
          } else if (phaseP < 0.54) {
            const t = (phaseP - 0.44) / 0.10;
            gsap.set(targetSub1, { opacity: 1 - t, y: -t * 30, pointerEvents: "none" });
            gsap.set(targetSub2, { opacity: t, y: 30 * (1 - t), pointerEvents: "auto" });
          } else {
            gsap.set(targetSub1, { opacity: 0, y: -30, pointerEvents: "none" });
            gsap.set(targetSub2, { opacity: 1, y: 0, pointerEvents: "auto" });
          }
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

  const activePhase = phases[activePhaseIndex] || phases[0];

  return (
    <div
      ref={outerTrackRef}
      id="one-place-pinned-journeys"
      className="relative w-full h-[360vh] bg-[#FAF6ED]"
    >
      {/* ============================================================= */}
      {/* PINNED STATIONARY VIEWPORT STAGE (Locks on screen at top-0)   */}
      {/* ============================================================= */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-6 sm:py-8 lg:py-10 px-4 sm:px-8 lg:px-12 overflow-hidden select-text">
        <div className="max-w-[1360px] mx-auto w-full h-full flex flex-col justify-between">

          {/* ----------------------------------------------------------- */}
          {/* 1. TOP HEADER & INTERACTIVE PHASE PILL SELECTOR             */}
          {/* ----------------------------------------------------------- */}
          <div className="text-center pt-2 select-text">
            {/* Phase Tabs */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-full bg-[#193E2D]/5 border border-[#193E2D]/10 mb-3 shadow-xs">
              {phases.map((p, idx) => {
                const isActive = activePhaseIndex === idx;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      if (outerTrackRef.current) {
                        const top = outerTrackRef.current.offsetTop;
                        const height = outerTrackRef.current.offsetHeight;
                        const targetY = top + (idx * 0.33 + 0.05) * height;
                        window.scrollTo({ top: targetY, behavior: "smooth" });
                      }
                    }}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-[#193E2D] text-white shadow-md shadow-[#193E2D]/20 scale-105"
                        : "text-[#193E2D]/70 hover:text-[#193E2D] hover:bg-white/50"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isActive ? "bg-emerald-300 animate-pulse" : "bg-[#193E2D]/30"
                      }`}
                    />
                    <span>{idx + 1}. {p.id === "milk" ? "Farm Milk" : p.id === "fruits" ? "Orchard Fruits" : "Living Vegetables"}</span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Headline */}
            <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-[#193E2D] mb-1">
              {activePhase.badge}
            </p>
            <h2 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-[#193E2D] mb-1 leading-tight select-text">
              {activePhase.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#193E2D]/75 font-normal max-w-xl mx-auto line-clamp-1 sm:line-clamp-none select-text">
              {activePhase.desc}
            </p>
          </div>

          {/* ----------------------------------------------------------- */}
          {/* 2. MAIN 3-COLUMN STAGE: LEFT CARDS | CENTER ASSET | RIGHT CARDS */}
          {/* ----------------------------------------------------------- */}
          <div className="relative w-full flex-1 flex items-center justify-center my-3 sm:my-4">

            {/* A. DESKTOP 3-COLUMN GRID */}
            <div className="hidden lg:grid grid-cols-12 gap-8 items-center w-full max-w-[1300px]">

              {/* LEFT COLUMN: Steps 01 (Substep 1) & Step 03 (Substep 2) */}
              <div className="col-span-4 relative min-h-[300px] flex items-center">
                {/* Substep 1: Step 01 */}
                <div className="substep-group-1 absolute inset-0 flex items-center will-change-transform">
                  <div className="w-full">
                    {renderMilestoneCard(activePhase.steps[0], `${activePhase.id}-01`, copiedKey, handleCopyStep)}
                  </div>
                </div>
                {/* Substep 2: Step 03 */}
                <div className="substep-group-2 absolute inset-0 flex items-center opacity-0 will-change-transform">
                  <div className="w-full">
                    {renderMilestoneCard(activePhase.steps[2], `${activePhase.id}-03`, copiedKey, handleCopyStep)}
                  </div>
                </div>
              </div>

              {/* CENTER COLUMN: Central Moving Asset (Milk Bottle / Fruit Basket / Veg Basket) */}
              <div className="col-span-4 flex flex-col items-center justify-center pointer-events-none select-none relative min-h-[360px]">
                <div className="pinned-central-moving-asset relative w-full flex flex-col items-center justify-center will-change-transform">

                  {/* Floor Shadow Under Asset */}
                  <div className="absolute -bottom-2 w-64 h-6 rounded-[100%] bg-black/15 blur-lg pointer-events-none" />

                  {/* 1. MILK ASSET (Phase 0) */}
                  <div className="phase-layer-milk relative w-full aspect-[4/5] max-w-[340px] flex items-center justify-center will-change-transform">
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

                  {/* 2. FRUITS ASSET (Phase 1) */}
                  <div className="phase-layer-fruits absolute inset-0 flex items-center justify-center opacity-0 will-change-transform">
                    <div className="relative w-full aspect-[16/12] max-w-[380px] flex items-center justify-center">
                      <img
                        src="/images/fruit-basket-full-hd.png"
                        alt="Nandi Heritage Fruit Basket"
                        className="w-full h-full object-contain drop-shadow-[0_16px_28px_rgba(25,62,45,0.15)] pointer-events-none select-none"
                        loading="eager"
                      />
                    </div>
                  </div>

                  {/* 3. VEGETABLES ASSET (Phase 2) */}
                  <div className="phase-layer-vegetables absolute inset-0 flex items-center justify-center opacity-0 will-change-transform">
                    <div className="relative w-full aspect-[16/10] max-w-[400px] flex items-center justify-center">
                      <img
                        src="/images/user-vegetable-basket-transparent.png"
                        alt="Nandi Living Soil Vegetable Basket"
                        className="w-full h-full object-contain drop-shadow-[0_16px_28px_rgba(25,62,45,0.15)] pointer-events-none select-none"
                        loading="eager"
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* RIGHT COLUMN: Steps 02 (Substep 1) & Step 04 (Substep 2) */}
              <div className="col-span-4 relative min-h-[300px] flex items-center">
                {/* Substep 1: Step 02 */}
                <div className="substep-group-1 absolute inset-0 flex items-center will-change-transform">
                  <div className="w-full">
                    {renderMilestoneCard(activePhase.steps[1], `${activePhase.id}-02`, copiedKey, handleCopyStep)}
                  </div>
                </div>
                {/* Substep 2: Step 04 */}
                <div className="substep-group-2 absolute inset-0 flex items-center opacity-0 will-change-transform">
                  <div className="w-full">
                    {renderMilestoneCard(activePhase.steps[3], `${activePhase.id}-04`, copiedKey, handleCopyStep)}
                  </div>
                </div>
              </div>

            </div>

            {/* B. MOBILE COMPACT VIEW (<1024px) */}
            <div className="lg:hidden w-full flex flex-col items-center justify-center">
              {/* Compact Central Asset */}
              <div className="relative w-full max-w-[260px] aspect-[4/3] flex items-center justify-center mb-3 pointer-events-none">
                {activePhaseIndex === 0 && (
                  <video
                    src="/videos/milk-pouring-bottle-pure-v3.mp4"
                    poster="/images/milk-video-poster-pure-v3.jpg"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-contain pointer-events-none"
                  />
                )}
                {activePhaseIndex === 1 && (
                  <img
                    src="/images/fruit-basket-full-hd.png"
                    alt="Fruit Basket"
                    className="w-full h-full object-contain drop-shadow-md"
                  />
                )}
                {activePhaseIndex === 2 && (
                  <img
                    src="/images/user-vegetable-basket-transparent.png"
                    alt="Vegetable Basket"
                    className="w-full h-full object-contain drop-shadow-md"
                  />
                )}
              </div>

              {/* Active Mobile Card */}
              <div className="w-full max-w-[360px]">
                {subStepIndex === 0
                  ? renderMilestoneCard(activePhase.steps[0], `mob-${activePhase.id}-01`, copiedKey, handleCopyStep)
                  : renderMilestoneCard(activePhase.steps[3], `mob-${activePhase.id}-04`, copiedKey, handleCopyStep)}
              </div>
            </div>

          </div>

          {/* ----------------------------------------------------------- */}
          {/* 3. BOTTOM CTA BUTTON & SCROLL PROGRESS BAR                  */}
          {/* ----------------------------------------------------------- */}
          <div className="text-center pb-2 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={() => onShopFresh?.(activePhase.id)}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full bg-[#193E2D] hover:bg-[#23533d] active:scale-95 text-white font-medium text-xs sm:text-sm shadow-md shadow-[#193E2D]/20 transition-all duration-300 group cursor-pointer"
            >
              <span>{activePhase.ctaLabel}</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </button>

            {/* Scroll Indicator Prompt */}
            <p className="text-[11px] text-[#193E2D]/50 flex items-center gap-1.5">
              <span>Scroll to explore</span>
              <span className="font-semibold text-[#193E2D]">{activePhase.id === "milk" ? "Farm Milk" : activePhase.id === "fruits" ? "Fruits" : "Vegetables"}</span>
              <span>• Step {subStepIndex === 0 ? "1 & 2" : "3 & 4"} of 4</span>
            </p>
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
      className={`group relative text-left p-4 sm:p-6 rounded-2xl bg-white/95 backdrop-blur-md border transition-all duration-300 cursor-pointer select-text
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
      <div className="flex items-center justify-between mb-2">
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
