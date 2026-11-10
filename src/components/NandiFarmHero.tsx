"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { farmAssets } from "@/data/nandi-shop";
import { nandiFarmFonts } from "./nandiFarmFonts";
import "./NandiFarmHero.css";

export default function NandiFarmHero({
  onOpenSubscription,
}: {
  onOpenSubscription: () => void;
}) {
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const crateRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuRef.current?.focus();
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  useEffect(() => {
    const video = videoRef.current;
    const hero = heroRef.current;
    const header = headerRef.current;
    const crate = crateRef.current;
    if (!video || !hero || !header || !crate) return;

    video.muted = true;
    video.defaultPlaybackRate = 0.65;
    video.playbackRate = 0.65;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pauseOnReducedMotion = () => {
      if (reducedMotion.matches) video.pause();
    };
    if (!reducedMotion.matches) void video.play().catch(() => {});
    reducedMotion.addEventListener("change", pauseOnReducedMotion);

    gsap.registerPlugin(ScrollTrigger);
    const motion = gsap.matchMedia();
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      const revealDistance = () =>
        Math.round(gsap.utils.clamp(140, 480, hero.clientHeight * 0.55));

      gsap.set(crate, { visibility: "visible" });
      const reveal = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: () => `+=${revealDistance()}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      reveal.fromTo(
        crate,
        {
          y: () => (hero.clientHeight + crate.offsetHeight) / 2 + 16,
        },
        { y: 0, duration: 1 },
        0,
      );
      // Counteract scroll while the scene is pinned so the header stays visible.
      reveal.fromTo(
        header,
        { y: 0 },
        { y: revealDistance, duration: 1.12 },
        0,
      );
    });

    return () => {
      motion.revert();
      reducedMotion.removeEventListener("change", pauseOnReducedMotion);
      video.pause();
    };
  }, []);

  function toggleVideo() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => {});
    else video.pause();
  }

  function openSubscription() {
    setMenuOpen(false);
    onOpenSubscription();
  }

  return (
    <div className={`nandi-hero ${nandiFarmFonts}`}>
      <header className="farm-header" ref={headerRef}>
        <a className="farm-brand" href="#home">
          <Image
            src={`${farmAssets}/nandi-farms-logo.png`}
            width={260}
            height={260}
            alt="Nandi Farms home"
            loading="eager"
          />
        </a>
        <button
          ref={menuRef}
          className="farm-menu"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="farm-nav"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          Menu
        </button>
        <nav
          className={`farm-nav${menuOpen ? " open" : ""}`}
          id="farm-nav"
          aria-label="Primary navigation"
        >
          <Link href="/shop" onClick={() => setMenuOpen(false)}>
            Shop
          </Link>
          <button type="button" onClick={openSubscription}>
            Milk plans
          </button>
          <a href="#explore-harvest" onClick={() => setMenuOpen(false)}>
            Our farm
          </a>
        </nav>
        <Link className="farm-store-link" href="/shop">
          Shop online
        </Link>
      </header>
      <section
        className="living-farm"
        id="home"
        aria-labelledby="farm-headline"
      >
        <h1 className="visually-hidden" id="farm-headline">
          Nandi Farms
        </h1>
        <div className="living-farm-media" ref={heroRef}>
          <video
            ref={videoRef}
            src={`${farmAssets}/living-farm-hero.mp4`}
            poster={`${farmAssets}/living-farm-poster.jpg`}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onError={() => setVideoFailed(true)}
          />
          <div className="farm-crate-stage">
            <Image
              ref={crateRef}
              className="farm-crate"
              src={`${farmAssets}/nandi-farms-harvest-crate.webp`}
              width={1080}
              height={656}
              alt=""
              loading="eager"
            />
          </div>
        </div>
        <div className="living-farm-actions">
          <Link className="farm-primary" href="/shop">
            Shop the farm
          </Link>
          <button
            className="farm-secondary"
            type="button"
            onClick={openSubscription}
          >
            Explore milk plans
          </button>
          {!videoFailed && (
            <button className="farm-motion" type="button" onClick={toggleVideo}>
              {playing ? "Pause motion" : "Play motion"}
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
