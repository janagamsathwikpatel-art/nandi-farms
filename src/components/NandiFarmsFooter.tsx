"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, ArrowRight, CheckCircle2, Sprout, X } from "lucide-react";
import "./NandiFarmsFooter.css";

interface NandiFarmsFooterProps {
  onOpenContact?: () => void;
  onOpenSubscription?: () => void;
}

export default function NandiFarmsFooter({
  onOpenContact,
  onOpenSubscription,
}: NandiFarmsFooterProps) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [activeModal, setActiveModal] = useState<{
    title: string;
    content: string;
  } | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    setErrorMsg("");
    setIsSubscribed(true);
    setEmail("");
    setTimeout(() => {
      setIsSubscribed(false);
    }, 6000);
  };

  const scrollToSection = (id: string) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const openInfoModal = (title: string, content: string) => {
    setActiveModal({ title, content });
  };

  return (
    <footer className="nandi-footer-section" aria-label="Nandi Farms Footer">
      {/* 1. 4K Panoramic Scenic Background Plate (Zero Baked-in Text) */}
      <div className="nandi-footer-bg" aria-hidden="true">
        <Image
          src="/images/nandi-farms-footer-ultra-hd-4k.png"
          alt="Nandi Farms Panoramic Scenic Background"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-bottom select-none pointer-events-none"
        />
        {/* Mobile/tablet readability overlay */}
        <div className="nandi-footer-mobile-overlay" />
      </div>

      {/* 2. Live Interactive React/HTML UI Layer (Outside Image) */}
      <div className="nandi-footer-container max-w-[1920px] 2xl:max-w-[2400px] mx-auto">
        <div className="nandi-footer-content-row">
          {/* Left Column Spacer: Reserves clearance for the left Nandi Mascot Badge */}
          <div className="nandi-footer-mascot-spacer" aria-hidden="true" />

          {/* Right 4 Interactive Content Columns */}
          <div className="nandi-footer-columns-grid">
            {/* Column 1: Quick Links */}
            <div className="nandi-footer-col">
              <div className="nandi-footer-col-header">
                <h3 className="nandi-footer-heading">Quick Links</h3>
                <div className="nandi-footer-heading-line" aria-hidden="true" />
              </div>
              <ul className="nandi-footer-list">
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection("top")}
                    className="nandi-footer-btn-link"
                    aria-label="Scroll to home page top"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection("category-fresh-page")}
                    className="nandi-footer-btn-link"
                    aria-label="View shop fresh categories"
                  >
                    Shop
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenSubscription}
                    className="nandi-footer-btn-link font-medium"
                    aria-label="Manage Milk Subscriptions"
                  >
                    Milk Subscriptions
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection("explore-harvest")}
                    className="nandi-footer-btn-link"
                    aria-label="Explore our farm harvest journey"
                  >
                    Our Farms
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection("why-nandi")}
                    className="nandi-footer-btn-link"
                    aria-label="Learn about Nandi Farms"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenContact}
                    className="nandi-footer-btn-link"
                    aria-label="Open contact form"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Support */}
            <div className="nandi-footer-col">
              <div className="nandi-footer-col-header">
                <h3 className="nandi-footer-heading">Support</h3>
                <div className="nandi-footer-heading-line" aria-hidden="true" />
              </div>
              <ul className="nandi-footer-list">
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      openInfoModal(
                        "Frequently Asked Questions (FAQs)",
                        "1. When is daily milk delivered?\nMilk is delivered farm-fresh daily between 5:30 AM and 7:00 AM.\n\n2. Are vegetables harvested daily?\nYes, our organic produce is harvested early each morning and delivered directly from farm to table.\n\n3. Can I pause or modify my subscription?\nYes, you can pause, resume, or adjust quantities anytime through your account or by contacting customer support."
                      )
                    }
                    className="nandi-footer-btn-link"
                    aria-label="Read frequently asked questions"
                  >
                    FAQs
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      openInfoModal(
                        "Delivery & Coverage Zones",
                        "Nandi Farms currently delivers across major sectors in Hyderabad, Telangana including Gachibowli, Hitec City, Jubilee Hills, Banjara Hills, Madhapur, and surrounding farm delivery corridors. Deliveries occur daily in temperature-controlled electric vehicles."
                      )
                    }
                    className="nandi-footer-btn-link"
                    aria-label="Check delivery zones and coverage"
                  >
                    Delivery &amp; Coverage
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      openInfoModal(
                        "Returns & Refunds Policy",
                        "We guarantee 100% farm freshness. If any milk, fruit, or vegetable batch does not meet your quality expectations upon delivery, simply report it via contact or phone within 12 hours for an immediate free replacement or full refund credited to your account."
                      )
                    }
                    className="nandi-footer-btn-link"
                    aria-label="View returns and refunds policy"
                  >
                    Returns &amp; Refunds
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      openInfoModal(
                        "Terms & Conditions",
                        "Welcome to Nandi Farms. By accessing or using our subscription service, you agree to our terms of fresh farm deliveries, billing cycles, doorstep drops, and respectful service policies. All products are 100% lab-tested and certified organic."
                      )
                    }
                    className="nandi-footer-btn-link"
                    aria-label="Read terms and conditions"
                  >
                    Terms &amp; Conditions
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      openInfoModal(
                        "Privacy Policy",
                        "Your privacy is deeply respected at Nandi Farms. We do not sell or share your contact info with third parties. Your delivery address and preferences are strictly used for scheduling doorstep farm orders and delivering timely delivery notifications."
                      )
                    }
                    className="nandi-footer-btn-link"
                    aria-label="Read privacy policy"
                  >
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Get in Touch */}
            <div className="nandi-footer-col">
              <div className="nandi-footer-col-header">
                <h3 className="nandi-footer-heading">Get in Touch</h3>
                <div className="nandi-footer-heading-line" aria-hidden="true" />
              </div>

              {/* Phone */}
              <a
                href="tel:+919876543210"
                className="nandi-footer-contact-item"
                aria-label="Call Nandi Farms customer support at +91 98765 43210"
              >
                <Phone className="nandi-footer-contact-icon" />
                <span>+91 98765 43210</span>
              </a>

              {/* Email */}
              <a
                href="mailto:support@nandifarms.in"
                className="nandi-footer-contact-item"
                aria-label="Email Nandi Farms support at support@nandifarms.in"
              >
                <Mail className="nandi-footer-contact-icon" />
                <span>support@nandifarms.in</span>
              </a>

              {/* Location */}
              <div className="nandi-footer-contact-item">
                <MapPin className="nandi-footer-contact-icon" />
                <span>Hyderabad, Telangana</span>
              </div>

              {/* 4 Interactive Circular Social Buttons */}
              <div className="nandi-footer-social-row" aria-label="Social media links">
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Nandi Farms on Instagram"
                  className="nandi-footer-social-btn"
                >
                  <svg className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Nandi Farms on Facebook"
                  className="nandi-footer-social-btn"
                >
                  <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Nandi Farms on YouTube"
                  className="nandi-footer-social-btn"
                >
                  <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Nandi Farms on LinkedIn"
                  className="nandi-footer-social-btn"
                >
                  <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 4: Stay Fresh with Nandi */}
            <div className="nandi-footer-col">
              <div className="nandi-footer-col-header">
                <h3 className="nandi-footer-heading">
                  <span>Stay Fresh with Nandi</span>
                  <Sprout className="w-4 h-4 text-[#4f9b2d]" />
                </h3>
                <div className="nandi-footer-heading-line" aria-hidden="true" />
              </div>
              <p className="nandi-footer-stay-desc">
                Get farm updates, new products &amp; exclusive offers.
              </p>

              {/* Working Email Subscription Form */}
              <form onSubmit={handleSubscribe} className="relative">
                <div className="nandi-footer-input-pill">
                  <Mail className="nandi-footer-input-icon" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    aria-label="Email address for Nandi Farms updates"
                    className="nandi-footer-input"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to Nandi newsletter"
                    className="nandi-footer-submit-btn"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                {errorMsg && (
                  <p className="text-xs text-red-600 mt-1 pl-3 font-medium">
                    {errorMsg}
                  </p>
                )}
                {isSubscribed && (
                  <div className="flex items-center gap-1.5 text-xs text-[#133821] font-semibold mt-2 pl-3">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#255d38]" />
                    <span>Thank you! You are subscribed to Nandi Farms updates.</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* 3. Bottom Bar Inside Dark Green Wave */}
        <div className="nandi-footer-bottom-bar">
          <p className="nandi-footer-copyright">
            &copy; 2026 Nandi Farms. All Rights Reserved.
          </p>

          <div className="nandi-footer-legal-links">
            <button
              type="button"
              onClick={() =>
                openInfoModal(
                  "Privacy Policy",
                  "At Nandi Farms, we uphold rigorous customer data security. We protect all user details, payment interactions, and delivery records with end-to-end encryption."
                )
              }
              className="nandi-footer-legal-btn"
            >
              Privacy Policy
            </button>
            <span className="nandi-footer-legal-divider" aria-hidden="true">|</span>
            <button
              type="button"
              onClick={() =>
                openInfoModal(
                  "Terms & Conditions",
                  "Subscription memberships may be paused or customized with zero penalty anytime through your daily dashboard or customer care line."
                )
              }
              className="nandi-footer-legal-btn"
            >
              Terms &amp; Conditions
            </button>
            <span className="nandi-footer-legal-divider" aria-hidden="true">|</span>
            <button
              type="button"
              onClick={() =>
                openInfoModal(
                  "Refund & Return Policy",
                  "If any delivery batch arrives unsealed, damaged, or fails our freshness test, we issue a prompt replacement or 100% refund without question."
                )
              }
              className="nandi-footer-legal-btn"
            >
              Refund &amp; Return
            </button>
          </div>
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
