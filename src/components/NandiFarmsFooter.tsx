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
    <footer className="nandi-footer-container" id="nandi-footer" aria-label="Nandi Farms Footer">
      {/* High-Resolution Left Produce Still Life (Direct Image 2 Transparent Cutout) */}
      <div className="footer-left-produce-wrapper" aria-hidden="true">
        <picture>
          <source srcSet="/images/footer/nandi-farms-footer-produce-cutout.webp?v=5" type="image/webp" />
          <img
            src="/images/footer/nandi-farms-footer-produce-cutout.png?v=5"
            alt="Nandi Farms Fresh Produce"
            className="footer-left-produce-img"
            width={682}
            height={1024}
            loading="eager"
            decoding="async"
          />
        </picture>
      </div>

      <div className="nandi-footer-content">
        {/* Brand Column with Calf Mascot Logo */}
        <section className="footer-brand-section">
          <div className="footer-brand-logo-wrap">
            <img
              src="/images/footer/nandi-farms-calf-logo-v3.png"
              alt="Nandi Farms"
              className="footer-brand-logo-img"
              width={140}
              height={135}
              loading="eager"
            />
          </div>
          <h2>It started at home.</h2>
          <p>One cow, one buffalo, and a simple promise to our family.</p>
          <Link className="story-link" href="/about">
            Read our story &rarr;
          </Link>
        </section>

        {/* Farm Shop Column */}
        <section className="footer-nav-col">
          <h3>FARM SHOP</h3>
          <Link href="/shop/milk" className="footer-nav-link">Milk &amp; Dairy</Link>
          <Link href="/shop/vegetables" className="footer-nav-link">Vegetables &amp; Fruit</Link>
          <Link href="/shop/eggs" className="footer-nav-link">Eggs &amp; Pantry</Link>
        </section>

        {/* Milk Plans Column */}
        <section className="footer-nav-col">
          <h3>MILK PLANS</h3>
          <a
            href="https://eveggie.in/subscriptions"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-nav-link solid-underline"
          >
            Explore Milk Plans
          </a>
          <button
            type="button"
            className="footer-link-btn solid-underline"
            onClick={onOpenSubscription}
          >
            Manage Deliveries
          </button>
        </section>

        {/* Customer Care Column */}
        <section className="footer-nav-col customer-care-col">
          <h3>CUSTOMER CARE</h3>
          <Link href="/shop" className="footer-nav-link">Delivery Areas</Link>
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

      {/* Subtle Bottom Copyright Bar */}
      <div className="footer-bottom-bar">
        <span>&copy; Nandi Farms</span>
        <a href="#nandi-footer" onClick={scrollToTop}>
          Back to top &uarr;
        </a>
      </div>

      {/* Modal Dialog */}
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
