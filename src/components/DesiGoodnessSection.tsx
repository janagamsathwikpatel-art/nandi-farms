"use client";

import React from "react";
import "./DesiGoodnessSection.css";

export default function DesiGoodnessSection() {
  return (
    <section className="desi-goodness-section" aria-label="Desi Goodness - The True Indian Milk">
      {/* 4K Ultra-HD Master Panoramic Banner Container */}
      <div className="desi-goodness-canvas">
        {/* Pure, Clean 4K Ultra-HD Master Artwork (Zero Overlays) */}
        <img
          src="/images/desi-goodness-banner-4k.png"
          alt="Desi Goodness - The True Indian Milk with Indigenous Gir Cow and 8 Purity Standards"
          className="desi-goodness-base-img"
          loading="eager"
        />
      </div>
    </section>
  );
}
