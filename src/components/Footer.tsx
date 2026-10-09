'use client';

import React, { useState } from 'react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [paymentNotice, setPaymentNotice] = useState<string | null>(null);
  const [activePaymentMethod, setActivePaymentMethod] = useState<{
    name: string;
    icon: string;
    vpa: string;
    deepLink: string;
  } | null>(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [copiedVPA, setCopiedVPA] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const handlePaymentClick = (methodName: string, icon: string, deepLink: string) => {
    setPaymentNotice(`Connecting to ${methodName}... Opening payment app!`);
    setActivePaymentMethod({
      name: methodName,
      icon,
      vpa: '9949777844@ybl',
      deepLink,
    });
    setPaymentCompleted(false);

    setTimeout(() => setPaymentNotice(null), 3500);

    // Attempt mobile app launch via deep link scheme
    try {
      if (typeof window !== 'undefined' && deepLink.startsWith('upi://') || deepLink.startsWith('tez://')) {
        window.location.href = deepLink;
      }
    } catch (err) {
      console.log('App deep link fallback to modal');
    }
  };

  const handleCopyVPA = (vpa: string) => {
    navigator.clipboard.writeText(vpa);
    setCopiedVPA(true);
    setTimeout(() => setCopiedVPA(false), 3000);
  };

  const handleConfirmPayment = () => {
    setPaymentCompleted(true);
    setTimeout(() => {
      setActivePaymentMethod(null);
      setPaymentCompleted(false);
    }, 3500);
  };

  return (
    <footer className="w-full bg-transparent relative overflow-hidden font-sans">
      {/* Exact 1:1 High-Definition Full Length Graphic Footer Banner Image */}
      <div className="relative w-full max-w-none mx-auto overflow-hidden select-none">
        <img
          src="/footer-banner-exact.jpg"
          alt="Nandi Farms Footer Banner — Nourishing lives, Naturally."
          className="w-full h-auto object-cover block select-none min-w-full"
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
            onClick={() => handlePaymentClick('VISA Gateway', '💳', 'https://eveggie.in/checkout')}
            className="absolute top-[82%] left-[17.8%] w-[3.8%] h-[8%] cursor-pointer rounded-md hover:bg-white/10 transition-all"
            title="Pay with VISA Card"
          />
          {/* Mastercard */}
          <div
            onClick={() => handlePaymentClick('Mastercard Gateway', '💳', 'https://eveggie.in/checkout')}
            className="absolute top-[82%] left-[22.0%] w-[3.8%] h-[8%] cursor-pointer rounded-md hover:bg-white/10 transition-all"
            title="Pay with Mastercard"
          />
          {/* UPI Direct App */}
          <div
            onClick={() => handlePaymentClick('UPI Direct App', '📱', 'upi://pay?pa=9949777844@ybl&pn=NandiFarms&cu=INR')}
            className="absolute top-[82%] left-[26.0%] w-[3.8%] h-[8%] cursor-pointer rounded-md hover:bg-white/10 transition-all"
            title="Open UPI App to Pay"
          />
          {/* RuPay Direct App */}
          <div
            onClick={() => handlePaymentClick('RuPay UPI App', '🇮🇳', 'upi://pay?pa=9949777844@ybl&pn=NandiFarms&cu=INR')}
            className="absolute top-[82%] left-[30.2%] w-[3.8%] h-[8%] cursor-pointer rounded-md hover:bg-white/10 transition-all"
            title="Pay with RuPay"
          />
          {/* Google Pay (GPay) Direct App */}
          <div
            onClick={() => handlePaymentClick('Google Pay (GPay)', '🟢', 'tez://upi/pay?pa=9949777844@ybl&pn=NandiFarms&cu=INR')}
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

          {/* Payment App Launch Notice Toast */}
          {paymentNotice && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#0a4233] text-amber-200 border border-emerald-500/40 px-4 py-2 rounded-xl text-xs font-bold shadow-2xl animate-fade-in z-20 flex items-center space-x-2">
              <span className="animate-pulse">💳</span>
              <span>{paymentNotice}</span>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Nandi Farms Payment Gateway & App Connector Modal */}
      {activePaymentMethod && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#0a4233] border border-emerald-500/40 rounded-3xl p-6 max-w-md w-full text-white shadow-2xl relative overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setActivePaymentMethod(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-emerald-900/60 text-emerald-200 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            >
              ✕
            </button>

            {/* Header */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-800/80 flex items-center justify-center text-xl shadow-inner">
                {activePaymentMethod.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg text-amber-200">
                  {activePaymentMethod.name} Connected
                </h3>
                <p className="text-xs text-emerald-200/80">
                  Nandi Farms Secure Direct Checkout
                </p>
              </div>
            </div>

            {paymentCompleted ? (
              <div className="py-8 text-center space-y-3 animate-fade-in">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-3xl text-amber-300">
                  ✓
                </div>
                <h4 className="font-bold text-xl text-amber-200">Payment Completed!</h4>
                <p className="text-xs text-emerald-100">
                  Order #NF-84920 Confirmed. Your farm-fresh groceries are on the way! 🎉
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Official VPA Box */}
                <div className="bg-emerald-950/80 border border-emerald-600/30 rounded-2xl p-3 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-emerald-300 uppercase tracking-wider font-semibold">
                      Official UPI Merchant VPA
                    </p>
                    <p className="font-mono text-sm font-bold text-amber-300">
                      {activePaymentMethod.vpa}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopyVPA(activePaymentMethod.vpa)}
                    className="px-3 py-1.5 bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    {copiedVPA ? '✓ Copied!' : 'Copy ID'}
                  </button>
                </div>

                {/* QR Code Scan Container */}
                <div className="bg-white/5 border border-emerald-500/20 rounded-2xl p-4 text-center space-y-2">
                  <p className="text-xs text-emerald-100 font-medium">
                    Scan with GPay, PhonePe, Paytm, or any UPI App
                  </p>
                  <div className="w-40 h-40 bg-white rounded-2xl mx-auto p-2 flex items-center justify-center shadow-lg">
                    {/* High Precision QR Artwork */}
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(activePaymentMethod.deepLink)}`}
                      alt="UPI Payment QR Code"
                      className="w-full h-full object-contain rounded-xl"
                    />
                  </div>
                  <p className="text-[11px] text-emerald-300 font-bold">
                    Amount: ₹499 • Nandi Farms Direct Pay
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2">
                  <a
                    href={activePaymentMethod.deepLink}
                    className="w-full py-3 bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 hover:from-amber-200 hover:to-amber-300 text-emerald-950 font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Launch {activePaymentMethod.name} App</span>
                    <span>➔</span>
                  </a>

                  <button
                    onClick={handleConfirmPayment}
                    className="w-full py-2.5 bg-emerald-800/80 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl transition-all cursor-pointer border border-emerald-500/30"
                  >
                    Done Payment / Confirm Order
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </footer>
  );
};



