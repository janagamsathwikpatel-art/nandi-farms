"use client";

import React, { useState } from "react";
import "./DesiGoodnessSection.css";

interface PurityFeature {
  id: string;
  title: string;
  description: string;
  side: "left" | "right";
  topPercent: number;
  leftPercent: number;
}

const PURITY_FEATURES: PurityFeature[] = [
  // Left 4 callouts
  {
    id: "no-hormones",
    title: "No Growth Hormones or Antibiotics",
    description:
      "Zero oxytocin, zero synthetic hormone injections, zero routine antibiotics, and zero GMO feed. Pure natural milk as nature intended.",
    side: "left",
    topPercent: 17,
    leftPercent: 26.5,
  },
  {
    id: "managed-pastures",
    title: "Managed Pastures & Free-Ranging",
    description:
      "Our indigenous Gir cows roam freely in lush open pastures under natural sunlight, grazing on pesticide-free native grasses.",
    side: "left",
    topPercent: 37,
    leftPercent: 24.5,
  },
  {
    id: "glass-bottles",
    title: "Eco-Friendly Glass Milk Bottles",
    description:
      "Sealed in sanitised, returnable food-grade glass bottles to prevent microplastic contamination and keep milk fresh at 4°C.",
    side: "left",
    topPercent: 57,
    leftPercent: 24.5,
  },
  {
    id: "zero-adulteration",
    title: "Zero Adulteration Guarantee",
    description:
      "100% single-origin raw milk with zero dilution, zero milk powder reconstitution, and zero chemical preservatives.",
    side: "left",
    topPercent: 77,
    leftPercent: 26.5,
  },

  // Right 4 callouts
  {
    id: "organic-fodder",
    title: "Organically Grown Chemical-Free Fodder",
    description:
      "Nutritious green fodder, sorghum, alfalfa, and medicinal herbs grown organically on our own farm without synthetic fertilizers.",
    side: "right",
    topPercent: 17,
    leftPercent: 73.5,
  },
  {
    id: "pure-raw-milk",
    title: "Pure RAW Milk with No Added Water",
    description:
      "Unprocessed, naturally creamy full-fat A2 milk chilled within 15 minutes of dawn milking to preserve living enzymes and vitamins.",
    side: "right",
    topPercent: 37,
    leftPercent: 75.5,
  },
  {
    id: "indigenous-breed",
    title: "Promoting Indian Gir Cow Breed",
    description:
      "Championing pure indigenous Gir, Sahiwal, and Rathi heritage cows known worldwide for natural A2 beta-casein protein.",
    side: "right",
    topPercent: 57,
    leftPercent: 75.5,
  },
  {
    id: "calf-first-care",
    title: "Well-Fed & Cared Cows and Calves",
    description:
      "Ahimsa-inspired compassionate dairying. The newborn calf drinks its full share first before any milk is collected for distribution.",
    side: "right",
    topPercent: 77,
    leftPercent: 73.5,
  },
];

export default function DesiGoodnessSection() {
  const [activeFeature, setActiveFeature] = useState<PurityFeature | null>(null);
  const [isPlayingMilking, setIsPlayingMilking] = useState(true);
  const [isCowGrazing, setIsCowGrazing] = useState(true);

  return (
    <section className="desi-goodness-section" aria-label="Desi Goodness - The True Indian Milk">
      {/* 4K Ultra-HD Master Panoramic Banner Container */}
      <div className="desi-goodness-canvas">
        {/* Base 4K Ultra-HD Master Artwork (Zero changes) */}
        <img
          src="/images/desi-goodness-banner-4k.png"
          alt="Desi Goodness - The True Indian Milk with Indigenous Gir Cow and Purity Standards"
          className="desi-goodness-base-img"
          loading="eager"
        />

        {/* ===================================================================
            ANIMATION 1: COW GRAZING & EATING GRASSES (Centered over Cow)
            =================================================================== */}
        <div
          className={`cow-grazing-container ${isCowGrazing ? "is-grazing" : ""}`}
          title="Indigenous Desi Gir Cow grazing on organic meadow grasses"
          onClick={() => setIsCowGrazing((prev) => !prev)}
        >
          {/* Animated Cow Head Layer that tilts down to graze */}
          <div className="cow-head-pivot">
            <img
              src="/images/cow-head-animated-layer.png"
              alt="Desi Gir Cow head grazing"
              className="cow-head-img"
            />

            {/* Subtle chewing jaw animation element */}
            <span className="cow-chew-ripple" aria-hidden="true" />
          </div>

          {/* Swaying lush grass blades at the cow's hooves */}
          <div className="cow-pasture-grass" aria-hidden="true">
            <span className="grass-blade blade-1" />
            <span className="grass-blade blade-2" />
            <span className="grass-blade blade-3" />
            <span className="grass-blade blade-4" />
            <span className="grass-blade blade-5" />
          </div>

          {/* Interactive Floating Meadow Badge */}
          <div className="cow-grazing-badge">
            <span className="badge-pulse-dot" />
            <span className="badge-text">100% Grass-Fed Desi Gir</span>
          </div>
        </div>

        {/* ===================================================================
            ANIMATION 2: TRADITIONAL HAND-MILKING SHOWCASE
            (Positioned near the bottom-right foaming earthenware milk pot)
            =================================================================== */}
        <aside
          className={`hand-milking-widget ${isPlayingMilking ? "is-milking" : "is-paused"}`}
          aria-label="Traditional Hand Milking Demonstration"
        >
          <div className="milking-card">
            {/* Header with Live Status & Toggle */}
            <div className="milking-card-header">
              <div className="milking-status">
                <span className="milking-live-dot" />
                <span className="milking-status-label">Traditional Hand-Milking</span>
              </div>
              <button
                type="button"
                className="milking-toggle-btn"
                onClick={() => setIsPlayingMilking((prev) => !prev)}
                title={isPlayingMilking ? "Pause animation" : "Play animation"}
                aria-label={isPlayingMilking ? "Pause milking animation" : "Play milking animation"}
              >
                {isPlayingMilking ? "❚❚ Pause" : "▶ Play"}
              </button>
            </div>

            {/* Animated SVG Hand-Milking Scene */}
            <div className="milking-stage">
              <svg
                viewBox="0 0 200 120"
                className="milking-svg"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Milk Stream Gradient */}
                  <linearGradient id="milkStreamGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#fdfbf4" stopOpacity="1" />
                  </linearGradient>

                  {/* Brass/Clay Pot Gradient */}
                  <linearGradient id="potGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#a3582a" />
                    <stop offset="50%" stopColor="#c9773b" />
                    <stop offset="100%" stopColor="#87431c" />
                  </linearGradient>
                </defs>

                {/* Udder Teats (Top) */}
                <path
                  d="M 75 10 C 75 22, 85 24, 85 32 C 85 35, 78 35, 77 32 C 75 24, 70 20, 68 10 Z"
                  fill="#d49b74"
                  stroke="#a86d49"
                  strokeWidth="1.2"
                />
                <path
                  d="M 125 10 C 125 22, 115 24, 115 32 C 115 35, 122 35, 123 32 C 125 24, 130 20, 132 10 Z"
                  fill="#d49b74"
                  stroke="#a86d49"
                  strokeWidth="1.2"
                />

                {/* Left Milking Hand */}
                <g className="milking-hand left-hand">
                  <path
                    d="M 50 20 C 60 16, 82 20, 84 28 C 84 34, 68 38, 56 34 C 48 31, 46 23, 50 20 Z"
                    fill="#c88358"
                    stroke="#8c5029"
                    strokeWidth="1.2"
                  />
                  {/* Fingers */}
                  <path
                    d="M 72 24 C 76 25, 82 28, 80 32 C 77 34, 70 33, 68 30"
                    fill="none"
                    stroke="#8c5029"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </g>

                {/* Right Milking Hand */}
                <g className="milking-hand right-hand">
                  <path
                    d="M 150 20 C 140 16, 118 20, 116 28 C 116 34, 132 38, 144 34 C 152 31, 154 23, 150 20 Z"
                    fill="#c88358"
                    stroke="#8c5029"
                    strokeWidth="1.2"
                  />
                  {/* Fingers */}
                  <path
                    d="M 128 24 C 124 25, 118 28, 120 32 C 123 34, 130 33, 132 30"
                    fill="none"
                    stroke="#8c5029"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </g>

                {/* Milk Stream 1 (From Left Hand) */}
                <path
                  d="M 80 32 L 95 95"
                  className="milk-stream left-stream"
                  stroke="url(#milkStreamGrad)"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />

                {/* Milk Stream 2 (From Right Hand) */}
                <path
                  d="M 120 32 L 105 95"
                  className="milk-stream right-stream"
                  stroke="url(#milkStreamGrad)"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />

                {/* Milk Splash Droplets */}
                <circle cx="94" cy="88" r="2.5" className="milk-droplet droplet-1" fill="#ffffff" />
                <circle cx="106" cy="86" r="2" className="milk-droplet droplet-2" fill="#ffffff" />
                <circle cx="100" cy="82" r="2.8" className="milk-droplet droplet-3" fill="#ffffff" />

                {/* Earthen Milking Pot (Bottom) */}
                <path
                  d="M 75 92 C 72 82, 128 82, 125 92 C 132 104, 122 118, 100 118 C 78 118, 68 104, 75 92 Z"
                  fill="url(#potGrad)"
                  stroke="#572910"
                  strokeWidth="1.5"
                />

                {/* Creamy Froth & Surface Ripples */}
                <ellipse cx="100" cy="92" rx="22" ry="5.5" fill="#fdfcf7" stroke="#e0d6be" strokeWidth="0.8" />
                <ellipse cx="100" cy="92" rx="14" ry="3.5" className="pot-ripple ripple-1" fill="none" stroke="#ffffff" strokeWidth="1.2" />
                <ellipse cx="100" cy="92" rx="8" ry="2" className="pot-ripple ripple-2" fill="none" stroke="#ffffff" strokeWidth="1" />
              </svg>
            </div>

            {/* Subtitle / Dharma Tag */}
            <div className="milking-card-footer">
              <p className="milking-desc">
                <strong>Calf Nurtured First:</strong> Compassionate morning hand-milking with zero mechanized stress.
              </p>
            </div>
          </div>
        </aside>

        {/* ===================================================================
            INTERACTIVE HOTSPOTS FOR THE 8 PURITY STANDARDS
            =================================================================== */}
        <div className="purity-hotspots-layer" aria-hidden="false">
          {PURITY_FEATURES.map((feat) => {
            const isSelected = activeFeature?.id === feat.id;
            return (
              <div
                key={feat.id}
                className={`purity-pin ${feat.side} ${isSelected ? "is-active" : ""}`}
                style={{
                  top: `${feat.topPercent}%`,
                  left: `${feat.leftPercent}%`,
                }}
              >
                {/* Clickable Pulse Ring */}
                <button
                  type="button"
                  className="pin-pulse-button"
                  onClick={() => setActiveFeature(isSelected ? null : feat)}
                  aria-label={`View details: ${feat.title}`}
                  title={feat.title}
                >
                  <span className="pin-dot" />
                  <span className="pin-ring" />
                </button>

                {/* Tooltip Card */}
                {isSelected && (
                  <div className={`purity-tooltip ${feat.side}`}>
                    <div className="tooltip-header">
                      <h4>{feat.title}</h4>
                      <button
                        type="button"
                        className="tooltip-close"
                        onClick={() => setActiveFeature(null)}
                        aria-label="Close tooltip"
                      >
                        ✕
                      </button>
                    </div>
                    <p>{feat.description}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
