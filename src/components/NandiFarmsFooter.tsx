"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./NandiFarmsFooter.css";

interface NandiFarmsFooterProps {
  onOpenContact?: () => void;
  onOpenSubscription?: () => void;
}

export default function NandiFarmsFooter({
  onOpenContact,
  onOpenSubscription,
}: NandiFarmsFooterProps) {
  const [activeModal, setActiveModal] = useState<{
    title: string;
    content: string;
  } | null>(null);

  const openInfoModal = (title: string, content: string) => {
    setActiveModal({ title, content });
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="nandi-footer-container" id="top" aria-label="Nandi Farms Footer">
      {/* 1. Restored Responsive Vintage Gowshala Etching Background Layer */}
      <div className="nandi-footer-bg-wrapper" aria-hidden="true">
        <picture>
          <source
            type="image/avif"
            srcSet="
              /images/footer/nandi-farms-footer-vintage-etching-2560.avif 2560w,
              /images/footer/nandi-farms-footer-vintage-etching-1920.avif 1920w,
              /images/footer/nandi-farms-footer-vintage-etching-1440.avif 1440w,
              /images/footer/nandi-farms-footer-vintage-etching-1024.avif 1024w
            "
            sizes="100vw"
          />
          <source
            type="image/webp"
            srcSet="
              /images/footer/nandi-farms-footer-vintage-etching-2560.webp 2560w,
              /images/footer/nandi-farms-footer-vintage-etching-1920.webp 1920w,
              /images/footer/nandi-farms-footer-vintage-etching-1440.webp 1440w,
              /images/footer/nandi-farms-footer-vintage-etching-1024.webp 1024w
            "
            sizes="100vw"
          />
          <img
            src="/images/footer/nandi-farms-footer-vintage-etching-1920.png"
            srcSet="
              /images/footer/nandi-farms-footer-vintage-etching-2560.png 2560w,
              /images/footer/nandi-farms-footer-vintage-etching-1920.png 1920w,
              /images/footer/nandi-farms-footer-vintage-etching-1440.png 1440w,
              /images/footer/nandi-farms-footer-vintage-etching-1024.png 1024w
            "
            sizes="100vw"
            alt="Nandi Farms vintage farm gowshala etching"
            className="nandi-footer-bg-img"
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>

      {/* 2. User Provided Code Format as Live Text */}
      <div className="nandi-footer">
        <div className="footer-top">
          <Link className="shop-link" href="/shop">
            VIEW FARM SHOP <span>&rarr;</span>
          </Link>
        </div>

        <div className="footer-grid">
          {/* Brand Column with Calf Mascot Logo */}
          <section className="brand-column">
            <div className="footer-brand-logo-wrap">
              <img
                src="/images/footer/nandi-farms-calf-logo-v3.png"
                alt="Nandi Farms"
                className="footer-brand-logo-img"
                width={185}
                height={180}
                loading="eager"
                decoding="async"
              />
            </div>

            <h2>It started at home.</h2>
            <p>One cow, one buffalo, and a simple promise to our family.</p>
            <Link className="story-link" href="/about">
              Read our story &rarr;
            </Link>
          </section>

          {/* Farm Shop Column */}
          <section>
            <h3>FARM SHOP</h3>
            <Link href="/shop/milk">Milk &amp; Dairy</Link>
            <Link href="/shop/vegetables">Vegetables &amp; Fruit</Link>
            <Link href="/shop/eggs">Eggs &amp; Pantry</Link>
          </section>

          {/* Milk Plans Column */}
          <section>
            <h3>MILK PLANS</h3>
            <a
              href="https://eveggie.in/subscriptions"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore Milk Plans
            </a>
            <button
              type="button"
              className="footer-link-btn"
              onClick={onOpenSubscription}
            >
              Manage Deliveries
            </button>
          </section>

          {/* Customer Care Column */}
          <section>
            <h3>CUSTOMER CARE</h3>
            <Link href="/shop">Delivery Areas</Link>
            <button
              type="button"
              className="footer-link-btn"
              onClick={onOpenContact}
            >
              Contact Us
            </button>
            <button
              type="button"
              className="footer-link-btn"
              onClick={() =>
                openInfoModal(
                  "Privacy Policy",
                  "At Nandi Farms, we uphold rigorous customer data security. We protect all user details, payment interactions, and delivery records with end-to-end encryption."
                )
              }
            >
              Privacy Policy
            </button>
            <button
              type="button"
              className="footer-link-btn"
              onClick={() =>
                openInfoModal(
                  "Terms & Conditions",
                  "Subscription memberships may be paused or customized with zero penalty anytime through your daily dashboard or customer care line."
                )
              }
            >
              Terms &amp; Conditions
            </button>
          </section>
        </div>

        <div className="footer-bottom">
          <span>&copy; Nandi Farms</span>
          <a href="#top" onClick={scrollToTop}>
            Back to top &uarr;
          </a>
        </div>
      </div>

      {activeModal && (
        <div
          className="nandi-footer-modal-backdrop"
          onClick={() => setActiveModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="nandi-footer-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="nandi-footer-modal-head">
              <h3>{activeModal.title}</h3>
              <button
                type="button"
                className="nandi-footer-modal-close"
                onClick={() => setActiveModal(null)}
                aria-label="Close dialog"
              >
                &times;
              </button>
            </div>
            <div className="nandi-footer-modal-body">
              <p>{activeModal.content}</p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
