'use client';

import React, { useState } from 'react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [paymentNotice, setPaymentNotice] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const handlePaymentClick = (methodName: string, deepLink: string) => {
    setPaymentNotice(`Opening ${methodName}... Complete payment securely!`);
    setTimeout(() => setPaymentNotice(null), 4000);
    
    // Attempt to launch payment app via deep link
    window.location.href = deepLink;
  };

  return (
    <footer className="w-full bg-transparent relative overflow-hidden font-sans">
      {/* Exact 1:1 High-Definition Graphic Footer Banner Image */}
      <div className="relative max-w-[1440px] mx-auto overflow-hidden select-none">
        <img
          src="/footer-banner-exact.jpg"
          alt="Nandi Farms Footer Banner — Nourishing lives, Naturally."
          className="w-full h-auto object-cover block select-none"
        />

        {/* Interactive Click Hotspots & Precision Aligned Form Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-auto">
          {/* Social Media Hotspots */}
          <a
            href="https://facebook.com/nandifarms"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-[64%] left-[6.8%] w-[2.2%] h-[6.5%] cursor-pointer rounded-full hover:bg-white/10 transition-all"
            title="Follow Nandi Farms on Facebook"
          />
          <a
            href="https://instagram.com/nandifarms"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-[64%] left-[9.3%] w-[2.2%] h-[6.5%] cursor-pointer rounded-full hover:bg-white/10 transition-all"
            title="Follow Nandi Farms on Instagram"
          />
          <a
            href="https://youtube.com/@nandifarms"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-[64%] left-[11.8%] w-[2.2%] h-[6.5%] cursor-pointer rounded-full hover:bg-white/10 transition-all"
            title="Subscribe on YouTube"
          />
          <a
            href="https://linkedin.com/company/nandifarms"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-[64%] left-[14.3%] w-[2.2%] h-[6.5%] cursor-pointer rounded-full hover:bg-white/10 transition-all"
            title="Connect on LinkedIn"
          />

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

          {/* Direct App Payment Option Hotspots */}
          {/* VISA */}
          <div
            onClick={() => handlePaymentClick('VISA Payment Gateway', 'https://eveggie.in/checkout')}
            className="absolute top-[82%] left-[17.8%] w-[3.8%] h-[8%] cursor-pointer rounded-md hover:bg-white/10 transition-all"
            title="Pay with VISA Card"
          />
          {/* Mastercard */}
          <div
            onClick={() => handlePaymentClick('Mastercard Payment Gateway', 'https://eveggie.in/checkout')}
            className="absolute top-[82%] left-[22.0%] w-[3.8%] h-[8%] cursor-pointer rounded-md hover:bg-white/10 transition-all"
            title="Pay with Mastercard"
          />
          {/* UPI Direct App */}
          <div
            onClick={() => handlePaymentClick('UPI App', 'upi://pay?pa=9949777844@ybl&pn=NandiFarms&cu=INR')}
            className="absolute top-[82%] left-[26.0%] w-[3.8%] h-[8%] cursor-pointer rounded-md hover:bg-white/10 transition-all"
            title="Open UPI App to Pay"
          />
          {/* RuPay Direct App */}
          <div
            onClick={() => handlePaymentClick('RuPay UPI App', 'upi://pay?pa=9949777844@ybl&pn=NandiFarms&cu=INR')}
            className="absolute top-[82%] left-[30.2%] w-[3.8%] h-[8%] cursor-pointer rounded-md hover:bg-white/10 transition-all"
            title="Pay with RuPay"
          />
          {/* Google Pay (GPay) Direct App */}
          <div
            onClick={() => handlePaymentClick('Google Pay App', 'tez://upi/pay?pa=9949777844@ybl&pn=NandiFarms&cu=INR')}
            className="absolute top-[82%] left-[34.4%] w-[3.8%] h-[8%] cursor-pointer rounded-md hover:bg-white/10 transition-all"
            title="Open Google Pay to Complete Payment"
          />

          {/* Newsletter Form Overlay — Precision aligned with 0 double placeholder text */}
          <form onSubmit={handleSubscribe}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=""
              className="absolute top-[53.5%] right-[5.4%] w-[20.5%] h-[8.5%] px-4 text-xs font-medium text-white bg-transparent border-none outline-none focus:outline-none focus:ring-0 cursor-text"
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

          {/* Payment App Launch Notice Alert */}
          {paymentNotice && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#0a4233] text-amber-200 border border-emerald-500/40 px-4 py-2 rounded-xl text-xs font-bold shadow-2xl animate-fade-in z-20 flex items-center space-x-2">
              <span className="animate-pulse">💳</span>
              <span>{paymentNotice}</span>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};


