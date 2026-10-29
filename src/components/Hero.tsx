"use client";

import React, { useState } from "react";
import "./Hero.css";
import MilkSubscriptionModal from "./MilkSubscriptionModal";

export default function Hero() {
  const [isMilkModalOpen, setIsMilkModalOpen] = useState(false);

  const scrollToCategories = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("categories");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero-section">
      {/* Background image only */}
      <div className="hero-background" />

      {/* Separate HTML text layer */}
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
