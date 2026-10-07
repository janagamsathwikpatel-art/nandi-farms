'use client';

import React, { useState } from 'react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="w-full bg-transparent relative overflow-hidden font-sans">
      {/* Exact 1:1 Graphic Footer Banner Image — Without Any Changes */}
      <div className="relative max-w-[1440px] mx-auto overflow-hidden select-none">
        <img
          src="/footer-banner-exact.jpg"
          alt="Nandi Farms Footer Banner — Nourishing lives, Naturally."
          className="w-full h-auto object-cover block select-none"
        />

        {/* Interactive Click Hotspots & Precision Aligned Form Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-auto">
          {/* Quick Links Hotspots */}
          <a
            href="https://eveggie.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-[35%] left-[29%] w-[12%] h-[40%] cursor-pointer rounded-lg hover:bg-white/5 transition-all"
            title="Click to view Quick Links"
          />

          {/* Contact Phone Hotspot (+91 9949777844) */}
          <a
            href="tel:9949777844"
            className="absolute top-[52%] left-[53%] w-[20%] h-[8%] cursor-pointer rounded-lg hover:bg-white/5 transition-all"
            title="Call +91 9949777844"
          />

          {/* Contact Email Hotspot (support@nandifarms.com) */}
          <a
            href="mailto:support@nandifarms.com"
            className="absolute top-[62%] left-[53%] w-[20%] h-[8%] cursor-pointer rounded-lg hover:bg-white/5 transition-all"
            title="Email support@nandifarms.com"
          />

          {/* Newsletter Form Overlay — Precision aligned to graphic input box and Subscribe button */}
          <form onSubmit={handleSubscribe}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address..."
              className="absolute top-[53.5%] right-[5.4%] w-[20.5%] h-[8.5%] px-4 text-xs font-medium text-white bg-transparent border-none outline-none focus:outline-none focus:ring-0 placeholder:text-emerald-100/40 cursor-text"
              title="Enter your email address for newsletter"
            />
            <button
              type="submit"
              className="absolute top-[64%] right-[5.4%] w-[20.5%] h-[8.5%] rounded-lg cursor-pointer bg-transparent hover:bg-black/5 active:bg-black/10 transition-all flex items-center justify-center"
              title="Click to Subscribe"
            >
              {subscribed && (
                <span className="bg-[#0a4233] text-amber-200 border border-amber-300/40 px-3 py-1.5 rounded-md text-xs font-bold shadow-lg">
                  ✓ Subscribed!
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

