"use client";

import React, { useState, useEffect, useRef } from "react";
import "./MilkJourneyStickySection.css";
import MilkSubscriptionModal from "./MilkSubscriptionModal";
import { ArrowRight } from "lucide-react";

export interface JourneyStage {
  id: string;
  time: string;
  title: string;
  subtitle: string;
  timelineLabel: string;
  image: string;
}

export const JOURNEY_STAGES: JourneyStage[] = [
  {
    id: "collected",
    time: "05:30",
    title: "Milk, before the city wakes.",
    subtitle: "Collected nearby. Chilled immediately. Delivered on your rhythm.",
    timelineLabel: "Collected",
    image: "/images/y-daily-journey-stage1-collected-4k.png",
  },
  {
    id: "chilled",
    time: "06:00",
    title: "Chilled within 15 minutes.",
    subtitle: "Rapidly cooled to 4°C to lock in living nutrients and natural farm creaminess.",
    timelineLabel: "Chilled",
    image: "/images/y-daily-journey-stage2-chilled-4k.png",
  },
  {
    id: "delivered",
    time: "06:45",
    title: "At your doorstep before dawn.",
    subtitle: "Delivered cold in eco-friendly glass bottles before your morning alarm.",
    timelineLabel: "Delivered",
    image: "/images/y-daily-journey-stage3-delivered-4k.png",
  },
];

export default function MilkJourneyStickySection() {
  const [isMilkModalOpen, setIsMilkModalOpen] = useState(false);
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);

  // Monitor scroll progress within the 300vh sticky scroll runway
  useEffect(() => {
    const handleScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const trackHeight = rect.height - window.innerHeight;
      if (trackHeight <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / trackHeight, 0), 1);

      if (progress < 0.33) {
        setActiveStageIndex(0);
      } else if (progress < 0.67) {
        setActiveStageIndex(1);
      } else {
        setActiveStageIndex(2);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToStage = (stageIdx: number) => {
    if (!trackRef.current) return;
    const trackTop = trackRef.current.offsetTop;
    const trackHeight = trackRef.current.offsetHeight - window.innerHeight;
    const targetY = trackTop + trackHeight * (stageIdx / 2);
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  const currentStage = JOURNEY_STAGES[activeStageIndex];

  return (
    <div ref={trackRef} className="milk-journey-scroll-track" id="milk-journey">
      {/* 100vh Sticky Viewport: Remains pinned as user scrolls through the 3 stages */}
      <section className="milk-journey-sticky-frame" aria-label="Y DAILY Milk Journey">
        {/* Crossfade Background Layers (3 Stages stacked in 4K Ultra-HD) */}
        <div className="milk-journey-background-stack" aria-hidden="true">
          {JOURNEY_STAGES.map((stage, idx) => (
            <img
              key={stage.id}
              src={stage.image}
              alt={stage.title}
              className={`milk-journey-bg ${idx === activeStageIndex ? "is-active" : ""}`}
              loading={idx === 0 ? "eager" : "lazy"}
            />
          ))}
          {/* Subtle gradient vignette for text legibility */}
          <div className="milk-journey-vignette-overlay" />
        </div>

        {/* Left Editorial Layer (Giant Time + Headline + Subhead + Button) */}
        <div className="milk-journey-content-layer">
          <div className="milk-journey-text-container">
            {/* Giant Time Display with smooth transition */}
            <div
              className="milk-journey-time-display"
              aria-label={`Current stage time: ${currentStage.time}`}
            >
              <span>{currentStage.time}</span>
            </div>

            {/* Headline */}
            <h2 className="milk-journey-headline">{currentStage.title}</h2>

            {/* Description Subtitle */}
            <p className="milk-journey-subtitle">{currentStage.subtitle}</p>

            {/* CTA Button: Set my milk rhythm */}
            <div className="milk-journey-cta-wrapper">
              <button
                type="button"
                onClick={() => setIsMilkModalOpen(true)}
                className="milk-journey-rhythm-btn"
              >
                <span>Set my milk rhythm</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Vertical Timeline Navigation */}
        <aside className="milk-journey-timeline-nav" aria-label="Milk Journey Stages Timeline">
          <div className="timeline-track-line" />
          {JOURNEY_STAGES.map((stage, idx) => {
            const isActive = idx === activeStageIndex;
            const isCompleted = idx < activeStageIndex;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => scrollToStage(idx)}
                className={`timeline-stage-btn ${isActive ? "is-active" : ""} ${
                  isCompleted ? "is-completed" : ""
                }`}
                title={`Go to Stage ${idx + 1}: ${stage.timelineLabel}`}
              >
                <span className="timeline-node">
                  <span className="timeline-dot" />
                  {isActive && <span className="timeline-ring" />}
                </span>
                <span className="timeline-label">{stage.timelineLabel}</span>
              </button>
            );
          })}
        </aside>

        {/* Bottom Bar: Hyderabad & Brand Manifesto */}
        <footer className="milk-journey-bottom-bar">
          <div className="bottom-location">HYDERABAD</div>
          <div className="bottom-divider" />
          <div className="bottom-manifesto">
            A HEALTHIER TOMORROW DELIVERED DAILY
          </div>
        </footer>
      </section>

      {/* Interactive Milk Subscription Modal */}
      <MilkSubscriptionModal
        isOpen={isMilkModalOpen}
        onClose={() => setIsMilkModalOpen(false)}
      />
    </div>
  );
}
