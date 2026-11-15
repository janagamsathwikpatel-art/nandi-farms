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
    <footer className="nandi-footer" id="top">
      <div className="footer-top">
        <Link className="shop-link" href="/shop">
          VIEW FARM SHOP <span>&rarr;</span>
        </Link>
      </div>

      <div className="footer-grid">
        <section className="brand-column">
          <div className="logo-text">
            <strong>Nandi</strong>
            <span>FARMS</span>
          </div>

          <h2>It started at home.</h2>
          <p>One cow, one buffalo, and a simple promise to our family.</p>
          <Link className="story-link" href="/about">
            Read our story &rarr;
          </Link>
        </section>

        <section>
          <h3>FARM SHOP</h3>
          <Link href="/shop/milk">Milk &amp; Dairy</Link>
          <Link href="/shop/vegetables">Vegetables &amp; Fruit</Link>
          <Link href="/shop/eggs">Eggs &amp; Pantry</Link>
        </section>

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
