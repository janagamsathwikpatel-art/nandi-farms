"use client";

import React, { useState } from "react";
import "./WhyYDailyA2Section.css";

interface BrandPillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  side: "left" | "right";
  topPercent: number;
  leftPercent: number;
}

const BRAND_PILLARS: BrandPillar[] = [
  // Left 3 Pillars
  {
    id: "easy-digest",
    title: "A2 is Easier to Digest",
    subtitle: "Naturally gentle on the stomach",
    description:
      "Unlike conventional A1 milk which releases BCM-7 during digestion causing discomfort, pure A2 beta-casein from indigenous cows digests smoothly and naturally.",
    side: "left",
    topPercent: 21.5,
    leftPercent: 22.2,
  },
  {
    id: "health-first",
    title: "Health Comes First",
    subtitle: "Supports better digestion, immunity & well-being",
    description:
      "Packed with natural calcium, bio-available vitamin D, healthy omega fats, and intact living proteins to nourish growing children and active adults.",
    side: "left",
    topPercent: 38.5,
    leftPercent: 22.2,
  },
  {
    id: "pure-by-choice",
    title: "Pure by Choice",
    subtitle: "No shortcuts. No processing. Just purity",
    description:
      "Zero synthetic hormone injections, zero antibiotics, zero adulteration, and zero preservatives. 100% farm-fresh single-origin A2 goodness.",
    side: "left",
    topPercent: 55.5,
    leftPercent: 22.2,
  },

  // Right 3 Pillars
  {
    id: "ethical-sustainable",
    title: "Ethical & Sustainable",
    subtitle: "Happy cows, ethical farming, sustainable future",
    description:
      "Our indigenous heritage cows roam freely in open sunlit pastures. Calves are nurtured first, and farming follows natural regenerative cycles.",
    side: "right",
    topPercent: 21.5,
    leftPercent: 73.5,
  },
  {
    id: "transparency",
    title: "100% Transparency",
    subtitle: "From our farms to your home – complete traceability",
    description:
      "We own every step from fodder cultivation to dawn milking and glass bottling, ensuring total farm-to-table traceability you can trust.",
    side: "right",
    topPercent: 38.5,
    leftPercent: 73.5,
  },
  {
    id: "family-future",
    title: "Better for Your Family",
    subtitle: "Better for Our Future",
    description:
      "Preserving India's sacred native cattle breeds while delivering pure, unadulterated nourishment for healthier generations to come.",
    side: "right",
    topPercent: 55.5,
    leftPercent: 73.5,
  },
];

export default function WhyYDailyA2Section() {
  const [activePillar, setActivePillar] = useState<BrandPillar | null>(null);

  return (
    <section
      className="why-ydaily-section"
      aria-label="Why Y Daily Focuses Only on A2 Dairy - Milk, Ghee, Paneer"
    >
      <div className="why-ydaily-canvas">
        {/* 4K Ultra-HD Master Artwork (3840 × 1623 px) */}
        <img
          src="/images/why-y-daily-a2-banner-4k.png"
          alt="Why Y Daily Focuses Only on A2 Dairy - Milk, Ghee, Paneer. Nothing Else."
          className="why-ydaily-base-img"
          loading="eager"
        />

        {/* Interactive Pulse Pins & Information Tooltips */}
        <div className="why-ydaily-pins-layer" aria-hidden="false">
          {BRAND_PILLARS.map((pillar) => {
            const isSelected = activePillar?.id === pillar.id;
            return (
              <div
                key={pillar.id}
                className={`pillar-pin-wrapper ${pillar.side} ${isSelected ? "is-active" : ""}`}
                style={{
                  top: `${pillar.topPercent}%`,
                  left: `${pillar.leftPercent}%`,
                }}
              >
                {/* Clickable Pulse Hotspot */}
                <button
                  type="button"
                  className="pillar-pulse-btn"
                  onClick={() => setActivePillar(isSelected ? null : pillar)}
                  aria-label={`Learn more: ${pillar.title}`}
                  title={`${pillar.title} - ${pillar.subtitle}`}
                >
                  <span className="pillar-pulse-dot" />
                  <span className="pillar-pulse-ring" />
                </button>

                {/* Tooltip Card */}
                {isSelected && (
                  <div className={`pillar-tooltip-card ${pillar.side}`}>
                    <div className="pillar-tooltip-header">
                      <div>
                        <h4>{pillar.title}</h4>
                        <p className="pillar-tooltip-sub">{pillar.subtitle}</p>
                      </div>
                      <button
                        type="button"
                        className="pillar-tooltip-close"
                        onClick={() => setActivePillar(null)}
                        aria-label="Close tooltip"
                      >
                        ✕
                      </button>
                    </div>
                    <p className="pillar-tooltip-body">{pillar.description}</p>
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
