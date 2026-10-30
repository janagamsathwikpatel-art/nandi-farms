"use client";

import React, { useState, useEffect, useRef } from "react";
import "./Hero.css";
import MilkSubscriptionModal from "./MilkSubscriptionModal";
import { Sprout, MapPin, ChevronDown, Menu, ArrowRight } from "lucide-react";

export interface JourneyStage {
  id: "collected" | "chilled" | "delivered";
  label: string;
  time: string;
  headline: string;
  subtitle: string;
  image: string;
}

export const JOURNEY_STAGES: JourneyStage[] = [
  {
    id: "collected",
    label: "Collected",
    time: "05:30",
    headline: "Milk, before the city wakes.",
    subtitle: "Collected nearby. Chilled immediately. Delivered on your rhythm.",
    image: "/images/y-daily-journey-stage1-collected-4k.png",
  },
  {
    id: "chilled",
    label: "Chilled",
    time: "06:00",
    headline: "Chilled to 4°C in 15 mins.",
    subtitle: "Rapid thermal drop locks in bio-active enzymes, nutrients, and pure taste.",
    image: "/images/y-daily-journey-stage2-chilled-4k.png",
  },
  {
    id: "delivered",
    label: "Delivered",
    time: "06:45",
    headline: "Fresh on your doorstep.",
    subtitle: "Eco-friendly sanitized glass bottles placed quietly before the sun rises.",
    image: "/images/y-daily-journey-stage3-delivered-4k.png",
  },
];

export default function Hero() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isMilkModalOpen, setIsMilkModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Hyderabad");
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // Synchronize active stage with sticky scroll progression
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
      } else if (progress < 0.66) {
        setActiveStageIndex(1);
      } else {
        setActiveStageIndex(2);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const jumpToStage = (index: number) => {
    setActiveStageIndex(index);
    if (!trackRef.current) return;
    const trackTop = trackRef.current.offsetTop;
    const trackHeight = trackRef.current.offsetHeight - window.innerHeight;
    const targetScroll = trackTop + (index / (JOURNEY_STAGES.length - 1)) * trackHeight;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
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
    <section id="home" className="hero-scroll-track" ref={trackRef}>
      {/* Pinned 100vh Sticky Viewport maintaining exact section dimensions */}
      <div className="hero-sticky-viewport">
        {/* Layered 4K Ultra-HD Background Images with Smooth Crossfade */}
        <div className="hero-bg-stack" aria-hidden="true">
          {JOURNEY_STAGES.map((stage, idx) => (
            <div
              key={stage.id}
              className={`hero-stage-bg ${idx === activeStageIndex ? "is-active" : ""}`}
              style={{ backgroundImage: `url(${stage.image})` }}
            />
          ))}
        </div>

        {/* Integrated Top Header Navigation */}
        <header className="hero-header">
          <div className="hero-brand">
            <a href="#home" className="brand-link">
              <Sprout className="w-5 h-5 text-emerald-600" />
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
              >
                <MapPin className="w-3.5 h-3.5 text-[#1b3425]" />
                <span>{selectedCity}</span>
                <ChevronDown className="w-3 h-3 text-[#1b3425]/70" />
              </button>

              {isCityDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-36 bg-[#16301d] rounded-xl shadow-2xl border border-emerald-500/30 overflow-hidden py-1 z-30">
                  {["Hyderabad", "Bengaluru", "Mumbai", "Delhi NCR"].map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setIsCityDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-1.5 text-xs text-white/90 hover:bg-[#20472b] hover:text-white cursor-pointer"
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
              <Menu className="w-5 h-5 text-[#1b3425]" />
            </button>
          </div>
        </header>

        {/* Main Sticky Hero Content Area */}
        <div className="hero-content-grid">
          {/* Left Column: Dynamic Time Display, Headline, Subtitle, and CTA Button */}
          <div className="hero-editorial-left">
            {/* Serif Time Display */}
            <div className="hero-time-wrapper">
              <span className="hero-time-digits" key={currentStage.time}>
                {currentStage.time}
              </span>
            </div>

            {/* Headline */}
            <h1 className="hero-headline" key={currentStage.headline}>
              {currentStage.headline}
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle" key={currentStage.subtitle}>
              {currentStage.subtitle}
            </p>

            {/* CTA Button */}
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

          {/* Right Column: Scrollytelling Timeline Indicator */}
          <div className="hero-timeline-right" aria-label="Milk Journey Stages">
            <div className="timeline-track-spine" />
            {JOURNEY_STAGES.map((stage, idx) => {
              const isActive = idx === activeStageIndex;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => jumpToStage(idx)}
                  className={`timeline-step-btn ${isActive ? "is-active" : ""}`}
                  aria-label={`Jump to stage: ${stage.label}`}
                >
                  <span className="timeline-pip">
                    {isActive && <span className="timeline-pip-glow" />}
                  </span>
                  <span className="timeline-label">{stage.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Editorial Bar with Divider Line */}
        <div className="hero-bottom-bar">
          <div className="bottom-bar-line" />
          <div className="bottom-bar-content">
            <span className="bottom-location-tag">HYDERABAD</span>
            <span className="bottom-motto-tag">
              A HEALTHIER TOMORROW DELIVERED DAILY
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Milk Subscription Modal */}
      <MilkSubscriptionModal
        isOpen={isMilkModalOpen}
        onClose={() => setIsMilkModalOpen(false)}
      />
    </section>
  );
}
