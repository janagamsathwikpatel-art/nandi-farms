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
  onShopFresh?: () => void;
}

export default function ContinuousStackedJourneys({ onShopFresh }: ContinuousStackedJourneysProps) {
  const masterTrackRef = useRef<HTMLDivElement>(null);
  const milkStageRef = useRef<HTMLDivElement>(null);
  const milkContentRef = useRef<HTMLDivElement>(null);
  const fruitStageRef = useRef<HTMLDivElement>(null);
  const fruitContentRef = useRef<HTMLDivElement>(null);
  const vegStageRef = useRef<HTMLDivElement>(null);
  const vegContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!masterTrackRef.current) return;

    // Helper to calculate max scroll delta for each section
    const getDeltas = () => {
      const vh = window.innerHeight;
      const milkH = milkContentRef.current?.offsetHeight || 0;
      const fruitH = fruitContentRef.current?.offsetHeight || 0;
      const vegH = vegContentRef.current?.offsetHeight || 0;

      return {
        maxMilk: Math.max(0, milkH - vh + 60),
        maxFruit: Math.max(0, fruitH - vh + 60),
        maxVeg: Math.max(0, vegH - vh + 60),
      };
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: masterTrackRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress; // 0.0 to 1.0
          const { maxMilk, maxFruit, maxVeg } = getDeltas();

          // -----------------------------------------------------------------
          // STAGE 1: Milk Journey (0.00 -> 0.33)
          // -----------------------------------------------------------------
          if (p < 0.33) {
            // Scroll Milk through all 4 milestones
            const subP = Math.min(1, Math.max(0, p / 0.29));
            if (milkContentRef.current) {
              gsap.set(milkContentRef.current, { y: -subP * maxMilk });
            }
            gsap.set(".milk-central-bottle-inner", { y: subP * Math.min(maxMilk, 650) });
            if (milkStageRef.current) {
              // Fade out Milk in the final 0.04 (from 0.29 to 0.33)
              const fade = p > 0.29 ? Math.max(0, 1 - (p - 0.29) / 0.04) : 1;
              gsap.set(milkStageRef.current, { opacity: fade, pointerEvents: fade > 0.1 ? "auto" : "none" });
            }
            // Fruits rests in place right behind Milk
            if (fruitStageRef.current) {
              gsap.set(fruitStageRef.current, { opacity: 1, pointerEvents: "none" });
              if (fruitContentRef.current) {
                gsap.set(fruitContentRef.current, { y: 0 });
              }
            }
            if (vegStageRef.current) {
              gsap.set(vegStageRef.current, { opacity: 0, pointerEvents: "none" });
            }
          }
          // -----------------------------------------------------------------
          // STAGE 2: Fruits Harvest (0.33 -> 0.66)
          // -----------------------------------------------------------------
          else if (p < 0.66) {
            if (milkStageRef.current) {
              gsap.set(milkStageRef.current, { opacity: 0, pointerEvents: "none" });
            }
            // Scroll Fruits through all 4 milestones
            const subP = Math.min(1, Math.max(0, (p - 0.33) / 0.29));
            if (fruitContentRef.current) {
              gsap.set(fruitContentRef.current, { y: -subP * maxFruit });
            }
            gsap.set(".fruit-central-basket-inner", { y: subP * Math.min(maxFruit, 650) });
            if (fruitStageRef.current) {
              // Fade out Fruits in the final 0.04 (from 0.62 to 0.66)
              const fade = p > 0.62 ? Math.max(0, 1 - (p - 0.62) / 0.04) : 1;
              gsap.set(fruitStageRef.current, { opacity: fade, pointerEvents: fade > 0.1 ? "auto" : "none" });
            }
            // Vegetables rests in place right behind Fruits
            if (vegStageRef.current) {
              gsap.set(vegStageRef.current, { opacity: 1, pointerEvents: "none" });
              if (vegContentRef.current) {
                gsap.set(vegContentRef.current, { y: 0 });
              }
            }
          }
          // -----------------------------------------------------------------
          // STAGE 3: Vegetables Journey (0.66 -> 1.00)
          // -----------------------------------------------------------------
          else {
            if (milkStageRef.current) {
              gsap.set(milkStageRef.current, { opacity: 0, pointerEvents: "none" });
            }
            if (fruitStageRef.current) {
              gsap.set(fruitStageRef.current, { opacity: 0, pointerEvents: "none" });
            }
            // Scroll Vegetables through all 4 milestones
            const subP = Math.min(1, Math.max(0, (p - 0.66) / 0.30));
            if (vegContentRef.current) {
              gsap.set(vegContentRef.current, { y: -subP * maxVeg });
            }
            gsap.set(".veg-central-basket-inner", { y: subP * Math.min(maxVeg, 650) });
            if (vegStageRef.current) {
              gsap.set(vegStageRef.current, { opacity: 1, pointerEvents: "auto" });
            }
          }
        },
      });
    }, masterTrackRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={masterTrackRef}
      id="farm-journeys-continuous-stack"
      className="relative w-full overflow-visible"
      style={{ height: "360vh" }}
    >
      {/* Pinned Viewport Stage - Pure 100vh window */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#FAF6ED]">
        {/* Layer 3 (Back): Vegetables Journey */}
        <div
          ref={vegStageRef}
          className="absolute inset-0 w-full h-full will-change-transform z-10 pointer-events-none opacity-0"
        >
          <div ref={vegContentRef} className="w-full will-change-transform">
            <ScrollVegetableJourney onShopFresh={onShopFresh} />
          </div>
        </div>

        {/* Layer 2 (Middle): Fruits Harvest - Resting right behind Milk */}
        <div
          ref={fruitStageRef}
          className="absolute inset-0 w-full h-full will-change-transform z-20 pointer-events-none opacity-0"
        >
          <div ref={fruitContentRef} className="w-full will-change-transform">
            <ScrollFruitJourney onShopFresh={onShopFresh} />
          </div>
        </div>

        {/* Layer 1 (Front): Milk Journey */}
        <div
          ref={milkStageRef}
          className="absolute inset-0 w-full h-full will-change-transform z-30 pointer-events-auto"
        >
          <div ref={milkContentRef} className="w-full will-change-transform">
            <ScrollMilkJourney onShopFresh={onShopFresh} />
          </div>
        </div>
      </div>
    </div>
  );
}
