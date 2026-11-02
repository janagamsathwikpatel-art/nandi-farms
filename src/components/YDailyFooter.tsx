"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import "./YDailyFooter.css";

interface YDailyFooterProps {
  onOpenContact?: () => void;
  onOpenSubscription?: () => void;
}

export default function YDailyFooter({
  onOpenContact,
  onOpenSubscription,
}: YDailyFooterProps) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="yd-footer-section" aria-label="Y Daily Footer">
      {/* 1. 4K Ultra-HD Text-Free Master Background Plate */}
      <div className="yd-footer-bg" aria-hidden="true">
        <Image
          src="/images/y-daily-footer-4k.png"
          alt="Y Daily Farm Scenic Footer Background"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-bottom select-none pointer-events-none"
        />
        {/* Soft mobile gradient overlay for readability on small devices */}
        <div className="yd-footer-mobile-overlay" />
      </div>

      {/* 2. Live Interactive React/HTML UI Layer OUTSIDE the image */}
      <div className="yd-footer-container max-w-[1920px] 2xl:max-w-[2400px] 4k:max-w-[3400px] mx-auto">
        <div className="yd-footer-main-grid">
          {/* Column 1: Brand Logo & Subtitle */}
          <div className="yd-footer-brand-col">
            <div className="yd-footer-logo-wrap">
              {/* Botanical Leaf Mark */}
              <div className="yd-footer-logo-leaf" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-9 h-9 text-[#1c642e]"
                >
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66l.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
                </svg>
              </div>
              <h2 className="yd-footer-brand-title">Y Daily</h2>
            </div>
            <p className="yd-footer-brand-sub">Farm Fresh Dairy & Groceries</p>
            {/* Organic flourish curve */}
            <div className="yd-footer-flourish" aria-hidden="true">
              <svg viewBox="0 0 120 16" fill="none" className="w-28 h-4">
                <path
                  d="M2 12C35 4 85 4 118 12"
                  stroke="#4f9b2d"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Navigation Columns (Shop, About, Support) */}
          <div className="yd-footer-nav-grid">
            {/* Shop Column */}
            <div className="yd-footer-col">
              <h3 className="yd-footer-col-heading">Shop</h3>
              <ul className="yd-footer-col-list">
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection("category-fresh-page")}
                    className="yd-footer-link"
                  >
                    Milk &amp; Dairy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection("category-fresh-page")}
                    className="yd-footer-link"
                  >
                    Groceries
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenSubscription}
                    className="yd-footer-link"
                  >
                    Subscriptions
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection("category-fresh-page")}
                    className="yd-footer-link"
                  >
                    Offers
                  </button>
                </li>
              </ul>
            </div>

            {/* About Column */}
            <div className="yd-footer-col">
              <h3 className="yd-footer-col-heading">About</h3>
              <ul className="yd-footer-col-list">
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection("explore-harvest")}
                    className="yd-footer-link"
                  >
                    Our Story
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection("explore-harvest")}
                    className="yd-footer-link"
                  >
                    Our Farms
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection("explore-harvest")}
                    className="yd-footer-link"
                  >
                    Quality &amp; Safety
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection("explore-harvest")}
                    className="yd-footer-link"
                  >
                    Sustainability
                  </button>
                </li>
              </ul>
            </div>

            {/* Support Column */}
            <div className="yd-footer-col">
              <h3 className="yd-footer-col-heading">Support</h3>
              <ul className="yd-footer-col-list">
                <li>
                  <button
                    type="button"
                    onClick={onOpenContact}
                    className="yd-footer-link"
                  >
                    Help Center
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenContact}
                    className="yd-footer-link"
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenContact}
                    className="yd-footer-link font-semibold text-[#185326]"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenContact}
                    className="yd-footer-link"
                  >
                    Track Order
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: Stay Updated & Social Buttons */}
          <div className="yd-footer-stay-updated-col">
            <div className="yd-footer-stay-box">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-5 h-5 text-[#185326]" />
                <h3 className="yd-footer-stay-title">Stay Updated</h3>
              </div>
              <p className="yd-footer-stay-desc">
                Get fresh offers and updates from Y Daily.
              </p>

              {/* Working Email Subscription Form */}
              <form onSubmit={handleSubscribe} className="yd-footer-subscribe-form">
                <div className="yd-footer-input-pill">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    aria-label="Email address for subscription"
                    className="yd-footer-input"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="yd-footer-submit-btn"
                  >
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>
                {errorMsg && (
                  <p className="text-xs text-red-600 mt-1 pl-3 font-medium">{errorMsg}</p>
                )}
                {isSubscribed && (
                  <div className="flex items-center gap-1.5 text-xs text-[#1c642e] font-semibold mt-1.5 pl-3">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1c642e]" />
                    <span>Thank you! You are subscribed to Y Daily fresh updates.</span>
                  </div>
                )}
              </form>

              {/* Interactive Social Media Icons */}
              <div className="yd-footer-social-row">
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Y Daily on Instagram"
                  className="yd-footer-social-btn"
                >
                  <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Y Daily on Facebook"
                  className="yd-footer-social-btn"
                >
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Y Daily on YouTube"
                  className="yd-footer-social-btn"
                >
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z"/>
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/919999999999?text=Hello%20Y%20Daily%2C%20I%20would%20like%20to%20know%20more%20about%20your%20dairy%20subscriptions."
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with Y Daily on WhatsApp"
                  className="yd-footer-social-btn hover:text-[#25D366] hover:border-[#25D366]"
                >
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Bottom Copyright & Legal Links Bar */}
        <div className="yd-footer-bottom-bar">
          <p className="yd-footer-copyright">
            © 2026 Y Daily. All Rights Reserved.
          </p>

          <div className="yd-footer-legal-links">
            <button
              type="button"
              onClick={onOpenContact}
              className="yd-footer-legal-link"
            >
              Privacy Policy
            </button>
            <span className="yd-footer-legal-divider">|</span>
            <button
              type="button"
              onClick={onOpenContact}
              className="yd-footer-legal-link"
            >
              Terms &amp; Conditions
            </button>
            <span className="yd-footer-legal-divider">|</span>
            <button
              type="button"
              onClick={onOpenContact}
              className="yd-footer-legal-link"
            >
              Refund &amp; Cancellation
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
