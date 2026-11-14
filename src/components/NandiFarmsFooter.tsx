"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
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

  return (
    <footer className="nandi-footer-section-clean" aria-label="Nandi Farms Scenic Footer">
      {/* 1. Pure Scenic Vintage Farm Etching Background (Zero Text Overlay) */}
      <div className="nandi-footer-art-wrapper">
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
            alt="Nandi Farms vintage farm shelter illustration with cow, buffalo, and milk churn"
            className="nandi-footer-art-img"
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>

      {/* 2. Sleek Legal & Copyright Under-Bar */}
      <div className="nandi-footer-underbar">
        <p className="nandi-footer-underbar-copy">
          &copy; 2026 Nandi Farms. All Rights Reserved.
        </p>

        <div className="nandi-footer-underbar-links">
          <button
            type="button"
            onClick={() =>
              openInfoModal(
                "Privacy Policy",
                "At Nandi Farms, we uphold rigorous customer data security. We protect all user details, payment interactions, and delivery records with end-to-end encryption."
              )
            }
            className="nandi-footer-underbar-btn"
          >
            Privacy Policy
          </button>
          <span className="nandi-footer-underbar-divider" aria-hidden="true">|</span>
          <button
            type="button"
            onClick={() =>
              openInfoModal(
                "Terms & Conditions",
                "Subscription memberships may be paused or customized with zero penalty anytime through your daily dashboard or customer care line."
              )
            }
            className="nandi-footer-underbar-btn"
          >
            Terms &amp; Conditions
          </button>
          <span className="nandi-footer-underbar-divider" aria-hidden="true">|</span>
          <button
            type="button"
            onClick={() =>
              openInfoModal(
                "Refund & Return Policy",
                "If any delivery batch arrives unsealed, damaged, or fails our freshness test, we issue a prompt replacement or 100% refund without question."
              )
            }
            className="nandi-footer-underbar-btn"
          >
            Refund &amp; Return
          </button>
        </div>
      </div>

      {/* Accessible Interactive Modal Dialog */}
      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="nandi-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="relative w-full max-w-lg bg-[#faf6ed] border border-[#133821]/20 rounded-2xl p-6 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#133821]/15 mb-4">
              <h4 id="nandi-modal-title" className="font-playfair text-xl font-bold text-[#133821]">
                {activeModal.title}
              </h4>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-[#133821]/10 hover:bg-[#133821]/20 flex items-center justify-center text-[#133821] transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="text-sm text-[#1a3e26] whitespace-pre-line leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
              {activeModal.content}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 bg-[#133821] hover:bg-[#255d38] text-white text-xs font-semibold rounded-full shadow transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
