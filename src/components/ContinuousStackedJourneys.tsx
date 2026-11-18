"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollMilkJourney from "./ScrollMilkJourney";
import ScrollFruitJourney from "./ScrollFruitJourney";
import ScrollVegetableJourney from "./ScrollVegetableJourney";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ContinuousStackedJourneysProps {
  onShopFresh?: (category: string, subFilter?: string) => void;
}

export default function ContinuousStackedJourneys({ onShopFresh }: ContinuousStackedJourneysProps) {
  const masterTrackRef = useRef<HTMLDivElement>(null);
  const pinnedStageRef = useRef<HTMLDivElement>(null);
  const milkStageRef = useRef<HTMLDivElement>(null);
  const milkContentRef = useRef<HTMLDivElement>(null);
  const fruitStageRef = useRef<HTMLDivElement>(null);
  const fruitContentRef = useRef<HTMLDivElement>(null);
  const vegStageRef = useRef<HTMLDivElement>(null);
  const vegContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!masterTrackRef.current || !pinnedStageRef.current) return;

    // Cache measurements outside onUpdate loop to prevent layout thrashing
    let maxMilk = 0;
    let maxFruit = 0;
    let maxVeg = 0;
    let milkTravel = 960;
    let fruitTravel = 960;
    let vegTravel = 960;

    const getTravelDistance = (containerEl: HTMLElement | null) => {
      if (!containerEl) return 960;
      const rows = containerEl.querySelectorAll<HTMLElement>(".journey-milestone-row");
      if (rows.length >= 4) {
        const firstRow = rows[0];
        const lastRow = rows[rows.length - 1];
        const firstCenter = firstRow.offsetTop + firstRow.offsetHeight / 2;
        const lastCenter = lastRow.offsetTop + lastRow.offsetHeight / 2;
        return Math.max(lastCenter - firstCenter, 500);
      }
      return 960;
    };

    const updateMeasurements = () => {
      const vh = window.innerHeight;
      const milkH = milkContentRef.current?.offsetHeight || 0;
      const fruitH = fruitContentRef.current?.offsetHeight || 0;
      const vegH = vegContentRef.current?.offsetHeight || 0;

      // Add small safety buffer so milestone 04 + CTA button scroll fully into view
      maxMilk = Math.max(0, milkH - vh + 80);
      maxFruit = Math.max(0, fruitH - vh + 80);
      maxVeg = Math.max(0, vegH - vh + 80);

      milkTravel = getTravelDistance(milkContentRef.current);
      fruitTravel = getTravelDistance(fruitContentRef.current);
      vegTravel = getTravelDistance(vegContentRef.current);
    };

    updateMeasurements();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: masterTrackRef.current,
        pin: pinnedStageRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefresh: updateMeasurements,
        onUpdate: (self) => {
          const p = self.progress; // 0.0 to 1.0

          // =================================================================
          // 1. PHASE 1: THE MILK JOURNEY (Progress 0.00 -> 0.33)
          // =================================================================
          if (p < 0.33) {
            // Active scroll through all 4 milestones (0.00 -> 0.28)
            const subP = Math.min(1, Math.max(0, p / 0.28));
            if (milkContentRef.current) {
              gsap.set(milkContentRef.current, { y: -subP * maxMilk, force3D: true });
            }
            gsap.set(".milk-central-bottle-inner", { y: subP * milkTravel, force3D: true });

            // Smooth cross-fade to Fruits in final buffer (0.28 -> 0.33)
            if (milkStageRef.current) {
              const fade = p > 0.28 ? Math.max(0, (0.33 - p) / 0.05) : 1;
              gsap.set(milkStageRef.current, {
                opacity: fade,
                pointerEvents: fade > 0.1 ? "auto" : "none",
                display: "block",
              });
            }

            // Layer 2 (Fruits) rests directly behind Milk ready at Milestone 01
            if (fruitStageRef.current) {
              gsap.set(fruitStageRef.current, { opacity: 1, pointerEvents: "none", display: "block" });
              if (fruitContentRef.current) {
                gsap.set(fruitContentRef.current, { y: 0, force3D: true });
              }
              gsap.set(".fruit-central-basket-inner", { y: 0, force3D: true });
            }

            // Layer 3 (Vegetables) remains hidden
            if (vegStageRef.current) {
              gsap.set(vegStageRef.current, { opacity: 0, pointerEvents: "none", display: "none" });
              if (vegContentRef.current) {
                gsap.set(vegContentRef.current, { y: 0, force3D: true });
              }
              gsap.set(".veg-central-basket-inner", { y: 0, force3D: true });
            }
          }

          // =================================================================
          // 2. PHASE 2: THE FRUIT HARVEST (Progress 0.33 -> 0.66)
          // =================================================================
          else if (p < 0.66) {
            // Milk is fully completed & hidden
            if (milkStageRef.current) {
              gsap.set(milkStageRef.current, { opacity: 0, pointerEvents: "none", display: "none" });
            }

            // Active scroll through all 4 milestones (0.33 -> 0.61)
            const subP = Math.min(1, Math.max(0, (p - 0.33) / 0.28));
            if (fruitContentRef.current) {
              gsap.set(fruitContentRef.current, { y: -subP * maxFruit, force3D: true });
            }
            gsap.set(".fruit-central-basket-inner", { y: subP * fruitTravel, force3D: true });

            // Smooth cross-fade to Vegetables in final buffer (0.61 -> 0.66)
            if (fruitStageRef.current) {
              const fade = p > 0.61 ? Math.max(0, (0.66 - p) / 0.05) : 1;
              gsap.set(fruitStageRef.current, {
                opacity: fade,
                pointerEvents: fade > 0.1 ? "auto" : "none",
                display: "block",
              });
            }

            // Layer 3 (Vegetables) rests directly behind Fruits ready at Milestone 01
            if (vegStageRef.current) {
              gsap.set(vegStageRef.current, { opacity: 1, pointerEvents: "none", display: "block" });
              if (vegContentRef.current) {
                gsap.set(vegContentRef.current, { y: 0, force3D: true });
              }
              gsap.set(".veg-central-basket-inner", { y: 0, force3D: true });
            }
          }

          // =================================================================
          // 3. PHASE 3: THE LIVING SOIL JOURNEY (Progress 0.66 -> 1.00)
          // =================================================================
          else {
            // Milk & Fruits are fully completed & hidden
            if (milkStageRef.current) {
              gsap.set(milkStageRef.current, { opacity: 0, pointerEvents: "none", display: "none" });
            }
            if (fruitStageRef.current) {
              gsap.set(fruitStageRef.current, { opacity: 0, pointerEvents: "none", display: "none" });
            }

            // Active scroll through all 4 milestones (0.66 -> 0.95)
            const subP = Math.min(1, Math.max(0, (p - 0.66) / 0.29));
            if (vegContentRef.current) {
              gsap.set(vegContentRef.current, { y: -subP * maxVeg, force3D: true });
            }
            gsap.set(".veg-central-basket-inner", { y: subP * vegTravel, force3D: true });

            if (vegStageRef.current) {
              gsap.set(vegStageRef.current, { opacity: 1, pointerEvents: "auto", display: "block" });
            }
          }
        },
      });
    }, masterTrackRef);

    window.addEventListener("resize", updateMeasurements);

    return () => {
      window.removeEventListener("resize", updateMeasurements);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={masterTrackRef}
      id="farm-journeys-continuous-stack"
      className="relative w-full overflow-visible"
      style={{ height: "390vh" }}
    >
      {/* Pinned Stationary Viewport Stage - 100vh window pinned in exact place */}
      <div
        ref={pinnedStageRef}
        className="w-full h-screen overflow-hidden bg-[#FAF6ED] relative select-text"
        style={{ transform: "translate3d(0, 0, 0)" }}
      >
        {/* Layer 3 (Back): Vegetables Journey */}
        <div
          ref={vegStageRef}
          className="absolute inset-0 w-full h-full will-change-transform z-10 pointer-events-none opacity-0"
        >
          <div ref={vegContentRef} className="w-full will-change-transform">
            <ScrollVegetableJourney onShopFresh={() => onShopFresh?.("vegetables")} />
          </div>
        </div>

        {/* Layer 2 (Middle): Fruits Harvest - Resting in place directly behind Milk */}
        <div
          ref={fruitStageRef}
          className="absolute inset-0 w-full h-full will-change-transform z-20 pointer-events-none opacity-0"
        >
          <div ref={fruitContentRef} className="w-full will-change-transform">
            <ScrollFruitJourney onShopFresh={() => onShopFresh?.("fruits")} />
          </div>
        </div>

        {/* Layer 1 (Front): Milk Journey */}
        <div
          ref={milkStageRef}
          className="absolute inset-0 w-full h-full will-change-transform z-30 pointer-events-auto"
        >
          <div ref={milkContentRef} className="w-full will-change-transform">
            <ScrollMilkJourney onShopFresh={() => onShopFresh?.("milk")} />
          </div>
        </div>
      </div>
    </div>
  );
}
