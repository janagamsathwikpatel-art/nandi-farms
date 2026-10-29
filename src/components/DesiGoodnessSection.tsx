"use client";

import React, { useState } from "react";
import "./DesiGoodnessSection.css";

export default function DesiGoodnessSection() {
  const [isMilkingModalOpen, setIsMilkingModalOpen] = useState(false);
  const [grazingStatus, setGrazingStatus] = useState<string>("Grazing on Fresh Clover");

  const toggleGrazingAction = () => {
    setGrazingStatus((prev) =>
      prev.includes("Clover") ? "Chewing Grass Contentedly" : "Grazing on Fresh Clover"
    );
  };

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

        {/* Interactive Overlay & Animation Layer */}
        <div className="desi-goodness-interactive-overlay">
          {/* ANIMATION 1: Cow Pasture Grazing & Living Nuances */}
          <div className="desi-cow-pasture-mound" aria-hidden="true">
            <div className="desi-grass-tuft" />
            <div className="desi-grass-tuft" />
            <div className="desi-grass-tuft" />
            <div className="desi-grass-tuft" />
            <div className="desi-grass-tuft" />
          </div>

          {/* Cow Head Grazing / Chewing Motion */}
          <div
            className="desi-cow-head-motion"
            onClick={toggleGrazingAction}
            title="Click to watch Desi Cow graze"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") toggleGrazingAction();
            }}
          >
            <div className="desi-cow-head-indicator">
              <span>🌱</span>
              <span>{grazingStatus}</span>
            </div>
            <div className="desi-chew-ripple" aria-hidden="true" />
          </div>

          {/* Gentle Cow Tail Swish */}
          <div className="desi-cow-tail-swish" aria-hidden="true" />

          {/* ANIMATION 2: Traditional Vedic Hand-Milking Showcase Hotspot */}
          <div className="desi-hand-milking-hotspot">
            <button
              type="button"
              className="desi-milking-pulse-btn"
              onClick={() => setIsMilkingModalOpen(true)}
              aria-label="View Traditional Hand-Milking Experience"
              title="Click to view Ahimsa Hand-Milking demonstration"
            >
              <span>✋</span>
              <span>Hand-Milked Daily</span>
            </button>
          </div>

          {/* Animated Milk Pot Droplets (Bottom Right Pot) */}
          <div className="desi-milk-pot-splash" aria-hidden="true">
            <div className="desi-splash-ring" />
            <div className="desi-splash-ring" />
          </div>
        </div>
      </div>

      {/* Hand-Milking Animated Showcase Modal */}
      {isMilkingModalOpen && (
        <div
          className="desi-milking-modal-backdrop"
          onClick={() => setIsMilkingModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="desi-milking-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="desi-milking-modal-close"
              onClick={() => setIsMilkingModalOpen(false)}
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Hand-Milking SVG Animation */}
            <div className="desi-milking-anim-box" aria-label="Animated demonstration of gentle hand milking">
              <svg width="240" height="150" viewBox="0 0 240 150" fill="none">
                {/* Traditional Cow Udder */}
                <path
                  d="M70 20 C90 15 150 15 170 20 C180 40 170 65 150 70 C130 75 110 75 90 70 C70 65 60 40 70 20 Z"
                  fill="#c88b63"
                  stroke="#a36b46"
                  strokeWidth="2"
                />

                {/* Left Teat */}
                <path
                  d="M95 65 L93 90 C93 94 99 94 99 90 L101 65 Z"
                  fill="#b97c55"
                  stroke="#98603c"
                  strokeWidth="1.5"
                />

                {/* Right Teat */}
                <path
                  d="M141 65 L139 90 C139 94 145 94 145 90 L147 65 Z"
                  fill="#b97c55"
                  stroke="#98603c"
                  strokeWidth="1.5"
                />

                {/* Flowing Milk Stream (Left) */}
                <line
                  x1="96"
                  y1="92"
                  x2="96"
                  y2="135"
                  stroke="#ffffff"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="desi-milk-stream"
                />

                {/* Flowing Milk Stream (Right) */}
                <line
                  x1="142"
                  y1="92"
                  x2="142"
                  y2="135"
                  stroke="#ffffff"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="desi-milk-stream"
                />

                {/* Caring Milking Hands (Left) */}
                <g className="desi-hand-left">
                  <path
                    d="M60 78 C70 74 85 75 92 82 C98 86 98 94 92 98 C82 104 65 96 60 78 Z"
                    fill="#dfb38d"
                    stroke="#b38763"
                    strokeWidth="1.5"
                  />
                  {/* Fingers */}
                  <path d="M85 82 C89 83 91 86 91 89" stroke="#b38763" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M84 89 C88 90 90 93 90 96" stroke="#b38763" strokeWidth="1.2" strokeLinecap="round" />
                </g>

                {/* Caring Milking Hands (Right) */}
                <g className="desi-hand-right">
                  <path
                    d="M180 78 C170 74 155 75 148 82 C142 86 142 94 148 98 C158 104 175 96 180 78 Z"
                    fill="#dfb38d"
                    stroke="#b38763"
                    strokeWidth="1.5"
                  />
                  {/* Fingers */}
                  <path d="M155 82 C151 83 149 86 149 89" stroke="#b38763" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M156 89 C152 90 150 93 150 96" stroke="#b38763" strokeWidth="1.2" strokeLinecap="round" />
                </g>

                {/* Traditional Brass / Clay Milk Vessel */}
                <path
                  d="M80 125 C80 120 160 120 160 125 L155 148 C155 150 85 150 85 148 Z"
                  fill="#cda558"
                  stroke="#a47d33"
                  strokeWidth="2"
                />
                {/* Frothy White Milk Top */}
                <ellipse cx="120" cy="125" rx="38" ry="6" fill="#ffffff" />
                <circle cx="112" cy="123" r="2.5" fill="#f2efe9" />
                <circle cx="126" cy="124" r="3" fill="#f2efe9" />
              </svg>
            </div>

            <p className="desi-milking-modal-tag">Vedic Dairy Tradition</p>
            <h3 className="desi-milking-modal-title">100% Gentle Hand-Milking</h3>
            <p className="desi-milking-modal-text">
              At Nandi Farms, every drop of Desi Gir Cow Milk is harvested entirely by experienced, caring human hands using ancient Vedic Ahimsa practices. We never subject our cows to painful industrial vacuum machines.
            </p>

            <ul className="desi-milking-features-list">
              <li className="desi-milking-feature-item">
                <span>❤️</span>
                <span>Calf Drinks First Always</span>
              </li>
              <li className="desi-milking-feature-item">
                <span>✋</span>
                <span>Gentle Human Milking Touch</span>
              </li>
              <li className="desi-milking-feature-item">
                <span>🚫</span>
                <span>Zero Vacuum Suction Machines</span>
              </li>
              <li className="desi-milking-feature-item">
                <span>🌿</span>
                <span>Zero Hormone Injections</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
