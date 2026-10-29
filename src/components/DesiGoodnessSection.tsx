"use client";

import React from "react";
import "./DesiGoodnessSection.css";

export default function DesiGoodnessSection() {
  return (
    <section className="desi-goodness-section" aria-label="Desi Goodness - The true Indian Milk">
      {/* 4K Ultra HD Panoramic Banner */}
      <div className="desi-goodness-banner-container">
        <img
          src="/images/desi-goodness-banner-4k.png"
          alt="Desi Goodness - The true Indian Milk featuring Desi Gir Cow in lush organic pasture"
          className="desi-goodness-banner-img"
          loading="eager"
        />

        {/* Ambient Nuances Layer */}
        <div className="desi-goodness-interactive-overlay">
          {/* Cow Pasture Gentle Grass Sway at Hooves */}
          <div className="desi-cow-pasture-mound" aria-hidden="true">
            <div className="desi-grass-tuft" />
            <div className="desi-grass-tuft" />
            <div className="desi-grass-tuft" />
            <div className="desi-grass-tuft" />
            <div className="desi-grass-tuft" />
          </div>

          {/* Gentle Cow Tail Swish */}
          <div className="desi-cow-tail-swish" aria-hidden="true" />

          {/* Animated Milk Pot Droplets (Bottom Right Pot) */}
          <div className="desi-milk-pot-splash" aria-hidden="true">
            <div className="desi-splash-ring" />
            <div className="desi-splash-ring" />
          </div>
        </div>
      </div>
    </section>
  );
}
