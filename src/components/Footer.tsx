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
    <footer className="w-full bg-transparent relative overflow-hidden font-sans -mt-4 sm:-mt-6 lg:-mt-8">
      {/* Exact 1:1 Graphic Footer Banner Image — Without Any Changes */}
      <div className="relative max-w-[1440px] mx-auto overflow-hidden">
        <img
          src="/footer-banner-exact.jpg"
          alt="Nandi Farms Footer Banner — Nourishing lives, Naturally."
          className="w-full h-auto object-cover block select-none"
        />

        {/* Interactive Click Hotspots & Functional Newsletter Form Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-auto">
          {/* Quick Links Hotspot */}
          <a
            href="https://eveggie.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-[35%] left-[29%] w-[12%] h-[40%] cursor-pointer"
            title="Click to view Quick Links"
          />

          {/* Contact Phone Hotspot (+91 9949777844) */}
          <a
            href="tel:9949777844"
            className="absolute top-[52%] left-[53%] w-[20%] h-[8%] cursor-pointer"
            title="Call +91 9949777844"
          />

          {/* Contact Email Hotspot (support@nandifarms.com) */}
          <a
            href="mailto:support@nandifarms.com"
            className="absolute top-[62%] left-[53%] w-[20%] h-[8%] cursor-pointer"
            title="Email support@nandifarms.com"
          />

          {/* Interactive Newsletter Form Overlay */}
          <div className="absolute top-[55%] right-[5.5%] w-[20.5%] h-[24%] flex flex-col justify-between">
            <form onSubmit={handleSubscribe} className="space-y-1.5 h-full flex flex-col justify-between">
              <input
                type="email"
                required
                placeholder="Your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0a4233] border border-emerald-500/40 rounded-lg py-1.5 px-3 text-xs text-white placeholder-emerald-200/50 focus:outline-none focus:ring-1 focus:ring-amber-300"
              />
              <button
                type="submit"
                className="w-full py-2 bg-[#f7ebcf] hover:bg-[#f3e2b8] text-gray-950 font-bold text-xs rounded-lg transition-all cursor-pointer shadow-md"
              >
                {subscribed ? '✓ Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};
