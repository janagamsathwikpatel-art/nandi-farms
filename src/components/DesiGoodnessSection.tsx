"use client";

import React, { useRef, useState, useEffect } from "react";
import "./DesiGoodnessSection.css";

export default function DesiGoodnessSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    // Ensure smooth autoplay across all modern browsers
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay waiting for user gesture:", err);
      });
    }
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section className="desi-goodness-section" aria-label="Desi Goodness - The true Indian Milk">
      {/* 16:9 Landscape Clean Cow Cinematic Video Player */}
      <div className="desi-goodness-banner-container">
        <video
          ref={videoRef}
          src="/videos/desi-cow-cinematic.mp4"
          className="cow-image"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/desi-cow-landscape-1920x1080.jpg"
        >
          <source src="/videos/desi-cow-cinematic.mp4" type="video/mp4" />
          <img
            src="/images/desi-cow-landscape-1920x1080.jpg"
            alt="Pure Indian Desi Gir Cow in 16:9 Landscape"
            className="cow-image"
            loading="eager"
          />
        </video>

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

          {/* Sound Toggle Button (Birdsong, breeze & cow sounds) */}
          <button
            type="button"
            onClick={toggleSound}
            className="desi-audio-toggle-btn"
            aria-label={isMuted ? "Unmute farm sounds" : "Mute farm sounds"}
            title="Toggle peaceful farm ambiance"
          >
            <span>{isMuted ? "🔈" : "🔊"}</span>
            <span>{isMuted ? "Farm Sound" : "Sound On"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
