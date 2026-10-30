"use client";

import React, { useState, useEffect, useRef } from "react";
import "./Hero.css";
import MilkSubscriptionModal from "./MilkSubscriptionModal";
import { Sprout, MapPin, ChevronDown, Menu, ArrowRight } from "lucide-react";

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

export default function Hero() {
  const [isMilkModalOpen, setIsMilkModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Hyderabad");
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
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

  const scrollToCategories = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("categories");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToExperience = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("experience");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentStage = JOURNEY_STAGES[activeStageIndex];

  return (
    <div id="home" ref={trackRef} className="hero-scroll-track">
      {/* 100vh Sticky Viewport: Remains pinned as user scrolls through the 3 stages */}
      <section className="hero-sticky-frame" aria-label="Y DAILY Milk Journey">
        {/* Crossfade Background Layers (3 Stages stacked in 4K Ultra-HD) */}
        <div className="hero-background-stack" aria-hidden="true">
          {JOURNEY_STAGES.map((stage, idx) => (
            <img
              key={stage.id}
              src={stage.image}
              alt={stage.title}
              className={`hero-journey-bg ${idx === activeStageIndex ? "is-active" : ""}`}
              loading={idx === 0 ? "eager" : "lazy"}
            />
          ))}
          {/* Subtle gradient vignette for text legibility */}
          <div className="hero-vignette-overlay" />
        </div>

        {/* Integrated Header Navigation */}
        <header className="hero-header">
          <div className="hero-brand">
            <a href="#home" className="brand-link">
              <Sprout className="w-5 h-5 text-emerald-400" />
              <span>Y DAILY</span>
            </a>
          </div>

          <nav className="hero-nav">
            <a href="#categories" onClick={scrollToCategories}>
              OUR FOOD
            </a>
            <a href="#experience" onClick={scrollToExperience}>
              OUR FARMS
            </a>
            <button
              type="button"
              onClick={() => setIsMilkModalOpen(true)}
              className="nav-btn"
            >
              SUBSCRIPTIONS
            </button>
            <a href="#experience" onClick={scrollToExperience}>
              OUR STORY
            </a>
          </nav>

          <div className="hero-header-right">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                className="location-picker"
                aria-label="Select City"
              >
                <MapPin className="w-3.5 h-3.5 text-white" />
                <span>{selectedCity}</span>
                <ChevronDown className="w-3 h-3 text-white/80" />
              </button>

              {isCityDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-36 bg-[#003628] rounded-xl shadow-2xl border border-emerald-500/30 overflow-hidden py-1 z-30">
                  {["Hyderabad", "Bengaluru", "Mumbai", "Delhi NCR"].map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setIsCityDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-1.5 text-xs text-white/90 hover:bg-[#004e3a] hover:text-white cursor-pointer"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={scrollToCategories}
              className="menu-toggle"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5 text-white" />
            </button>
          </div>
        </header>

        {/* Left Editorial Layer (Giant Time + Headline + Subhead + Button) */}
        <div className="hero-content-layer">
          <div className="hero-text-container">
            {/* Giant Time Display with smooth transition */}
            <div className="hero-time-display" aria-label={`Current stage time: ${currentStage.time}`}>
              <span>{currentStage.time}</span>
            </div>

            {/* Headline */}
            <h1 className="hero-headline">{currentStage.title}</h1>

            {/* Description Subtitle */}
            <p className="hero-subtitle">{currentStage.subtitle}</p>

            {/* CTA Button: Set my milk rhythm */}
            <div className="hero-cta-wrapper">
              <button
                type="button"
                onClick={() => setIsMilkModalOpen(true)}
                className="hero-rhythm-btn"
              >
                <span>Set my milk rhythm</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Vertical Timeline Navigation */}
        <aside className="hero-timeline-nav" aria-label="Milk Journey Stages Timeline">
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
        <footer className="hero-bottom-bar">
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
