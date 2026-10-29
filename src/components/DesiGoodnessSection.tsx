"use client";

import React, { useRef, useState } from "react";
import "./DesiGoodnessSection.css";

export default function DesiGoodnessSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section className="desi-goodness-section" aria-label="Desi Goodness - The true Indian Milk">
      {/* 4K Ultra HD Panoramic Banner / Cinematic Video Player */}
      <div className="desi-goodness-banner-container">
        <video
          ref={videoRef}
          className="desi-goodness-video-player"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/desi-goodness-banner-4k.png"
        >
          <source src="/videos/desi-cow-cinematic.webm" type="video/webm" />
          <source src="/videos/desi-cow-cinematic.mp4" type="video/mp4" />
          <img
            src="/images/desi-goodness-banner-4k.png"
            alt="Desi Goodness - The true Indian Milk featuring Desi Gir Cow in lush organic pasture"
            className="desi-goodness-banner-img"
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
