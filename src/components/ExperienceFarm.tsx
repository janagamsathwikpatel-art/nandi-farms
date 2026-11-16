"use client";

import React from "react";
import Link from "next/link";
import "./ExperienceFarm.css";

interface ExperienceFarmProps {
  onExploreVegetables?: () => void;
  isVegetablesOpen?: boolean;
}

export default function ExperienceFarm({
  onExploreVegetables,
  isVegetablesOpen = false,
}: ExperienceFarmProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onExploreVegetables) {
      onExploreVegetables();
      if (!isVegetablesOpen) {
        setTimeout(() => {
          const target = document.getElementById("farm-vegetables-shelf");
          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      }
    }
  };

  return (
    <section id="explore-harvest" className="harvest-card" aria-label="Explore the Harvest">
      {/* Clean Photographic Background Layer (Text-Free) */}
      <div className="harvest-card-bg">
        <picture>
          <source
            type="image/webp"
            srcSet="
              /images/explore-harvest/explore-harvest-2172.webp 2172w,
              /images/explore-harvest/explore-harvest-1920.webp 1920w,
              /images/explore-harvest/explore-harvest-1440.webp 1440w,
              /images/explore-harvest/explore-harvest-1024.webp 1024w,
              /images/explore-harvest/explore-harvest-640.webp 640w
            "
            sizes="100vw"
          />
          <img
            src="/explore-harvest.png"
            alt="Nandi Farms Organic Vegetables on Natural Linen"
            width={2172}
            height={791}
            loading="eager"
            className="harvest-bg-img"
          />
        </picture>
      </div>

      {/* User's Exact HTML Structure */}
      <div className="harvest-card-content">
        <h1>
          Explore the<br />Harvest
        </h1>

        <Link href="/shop" className="harvest-button" onClick={handleClick}>
          Shop the Harvest <span>→</span>
        </Link>
      </div>
    </section>
  );
}
