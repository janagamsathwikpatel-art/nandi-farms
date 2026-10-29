"use client";

import React, { useState } from "react";
import "./Hero.css";
import MilkSubscriptionModal from "./MilkSubscriptionModal";
import { Sprout, MapPin, ChevronDown, Menu } from "lucide-react";

export default function Hero() {
  const [isMilkModalOpen, setIsMilkModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Hyderabad");
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);

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

  return (
    <section id="home" className="hero-section">
      {/* Background image only - continuous from top to bottom */}
      <div className="hero-background" />

      {/* Integrated Header Bar matching reference image */}
      <header className="hero-header">
        <div className="hero-brand">
          <a href="#home" className="brand-link">
            <Sprout className="w-5 h-5 text-emerald-400" />
            <span>Y DAILY</span>
          </a>
        </div>

        <nav className="hero-nav">
          <a href="#categories" onClick={scrollToCategories}>OUR FOOD</a>
          <a href="#experience" onClick={scrollToExperience}>OUR FARMS</a>
          <button
            type="button"
            onClick={() => setIsMilkModalOpen(true)}
            className="nav-btn"
          >
            SUBSCRIPTIONS
          </button>
          <a href="#experience" onClick={scrollToExperience}>OUR STORY</a>
        </nav>

        <div className="hero-header-right">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
              className="location-picker"
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

      {/* Separate HTML text layer on left */}
      <div className="hero-text">
        <h1>
          Every day
          <br />
          begins in
          <br />
          the soil.
        </h1>

        <p>
          Fresh food, moving at
          <br />
          the rhythm of your home.
        </p>
      </div>

      {/* Separate right-side options */}
      <div className="hero-options">
        <a href="#categories" onClick={scrollToCategories} className="shop-button">
          Shop harvest <span>→</span>
        </a>

        <button
          type="button"
          onClick={() => setIsMilkModalOpen(true)}
          className="milk-link"
        >
          Milk subscription <span>→</span>
        </button>
      </div>

      {/* Interactive Milk Subscription Modal */}
      <MilkSubscriptionModal
        isOpen={isMilkModalOpen}
        onClose={() => setIsMilkModalOpen(false)}
      />
    </section>
  );
}
