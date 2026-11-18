"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { farmAssets } from "@/data/nandi-shop";
import { nandiFarmFonts } from "./nandiFarmFonts";
import "./NandiFarmHero.css";

interface NandiFarmHeroProps {
  onOpenSubscription: () => void;
  cartCount?: number;
  onOpenCart?: () => void;
}

export default function NandiFarmHero({
  onOpenSubscription,
  cartCount = 0,
  onOpenCart,
}: NandiFarmHeroProps) {
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const crateRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

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

    // ── Desktop: pin + crate slide-up ──────────────────────────────────────
    motion.add(
      "(min-width: 821px) and (prefers-reduced-motion: no-preference)",
      () => {
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
          { y: () => (hero.clientHeight + crate.offsetHeight) / 2 + 16 },
          { y: 0, duration: 1 },
          0,
        );
        // Counteract scroll while pinned so the header stays visible.
        reveal.fromTo(
          header,
          { y: 0 },
          { y: revealDistance, duration: 1.12 },
          0,
        );
      },
    );

    // ── Mobile: NO pin — just fade crate in on load (zero spacer gap) ──────
    motion.add(
      "(max-width: 820px) and (prefers-reduced-motion: no-preference)",
      () => {
        gsap.set(crate, { visibility: "visible", y: 0 });
        gsap.fromTo(
          crate,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.7, ease: "power2.out", delay: 0.15 },
        );
      },
    );

    return () => {
      motion.revert();
      reducedMotion.removeEventListener("change", pauseOnReducedMotion);
      video.pause();
    };
  }, []);

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
          <button
            type="button"
            className="farm-nav-cart-link"
            onClick={() => {
              setMenuOpen(false);
              onOpenCart?.();
            }}
          >
            Cart {cartCount > 0 ? `(${cartCount})` : ""}
          </button>
        </nav>
        <div className="farm-header-actions">
          <button
            type="button"
            className="farm-cart-btn"
            onClick={onOpenCart}
            aria-label={`View Farm Basket (${cartCount} items)`}
          >
            <ShoppingBag className="farm-cart-icon" aria-hidden="true" />
            <span className="farm-cart-label">Cart</span>
            {cartCount > 0 && (
              <span className="farm-cart-badge">{cartCount}</span>
            )}
          </button>
          <Link className="farm-store-link" href="/shop">
            Shop online
          </Link>
        </div>
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
      </section>
    </div>
  );
}
