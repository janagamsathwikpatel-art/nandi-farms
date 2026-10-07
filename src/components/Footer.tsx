'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Leaf, 
  Mail, 
  Share2, 
  Globe, 
  CheckCircle2, 
  ShieldCheck, 
  Send 
} from 'lucide-react';

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
    <footer className="relative bg-[#064e3b] text-white font-sans overflow-hidden">
      {/* Organic Top Wave Curve Divider */}
      <div className="w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-12 sm:h-16 text-[#faf9f4] fill-current"
        >
          <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,40 L1200,0 L0,0 Z"></path>
        </svg>
      </div>

      {/* Background Decorative Watermarks */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          
          {/* Column 1: Brand & Slogan */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shadow-md">
                <Leaf className="w-5 h-5 fill-current" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white font-sans">
                Nandi<span className="text-amber-400">Farms</span>
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal max-w-xs">
              Skip the long lines and heavy bags — we harvest & deliver 100% farm-fresh organic produce straight to your doorstep.
            </p>

            {/* Social Links */}
            <div className="pt-2 flex items-center space-x-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-amber-400 hover:text-gray-950 text-white flex items-center justify-center transition-all duration-200 border border-white/10"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="https://eveggie.in"
                target="_blank"
                rel="noreferrer"
                aria-label="Website"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-amber-400 hover:text-gray-950 text-white flex items-center justify-center transition-all duration-200 border border-white/10"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-amber-300 font-sans">
              QUICK LINKS
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-emerald-100">
              <li>
                <a href="https://eveggie.in/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors inline-block">
                  Home
                </a>
              </li>
              <li>
                <a href="https://eveggie.in/products" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors inline-block">
                  All Organic Products
                </a>
              </li>
              <li>
                <a href="https://eveggie.in/shops" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors inline-block">
                  Partner Farms & Shops
                </a>
              </li>
              <li>
                <a href="https://eveggie.in/order-history" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors inline-block">
                  Track Order
                </a>
              </li>
              <li>
                <a href="https://eveggie.in/contact-us" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors inline-block">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-amber-300 font-sans">
              CONTACT INFO
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm font-medium text-emerald-100">
              <li className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-white/10 text-amber-300 flex items-center justify-center shrink-0 border border-white/10">
                  <Phone className="w-4 h-4" />
                </div>
                <a href="tel:9949777844" className="hover:text-amber-300 transition-colors font-extrabold text-white">
                  +91 9949777844
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-white/10 text-amber-300 flex items-center justify-center shrink-0 border border-white/10 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-emerald-100 leading-snug">
                  📍 Farm to Fork, Hyderabad, Telangana 500033
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-white/10 text-amber-300 flex items-center justify-center shrink-0 border border-white/10">
                  <Mail className="w-4 h-4" />
                </div>
                <a href="mailto:support@nandifarms.com" className="hover:text-amber-300 transition-colors">
                  support@nandifarms.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Signup */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-amber-300 font-sans">
              NEWSLETTER SIGNUP
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 font-medium">
              Subscribe for <span className="text-amber-300 font-bold">10% OFF</span> your first order & weekly harvest alerts.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-full py-2.5 px-4 pr-10 text-xs text-white placeholder-emerald-200/60 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-amber-400 hover:bg-amber-300 text-gray-950 rounded-full text-xs font-black transition-colors flex items-center justify-center cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {subscribed && (
                <div className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs rounded-xl p-2 flex items-center space-x-1.5 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Subscribed! Check your email for 10% OFF code. 🎉</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Indian Payment Icons & Certification Badges */}
        <div className="mt-10 pt-6 border-t border-emerald-700/60 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Indian Payment Logos */}
          <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto no-scrollbar py-1">
            <span className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider mr-1">Accepted Payments:</span>
            <span className="px-2.5 py-1 bg-white text-emerald-950 font-black text-xs rounded-lg shadow-xs">UPI</span>
            <span className="px-2.5 py-1 bg-white text-emerald-950 font-black text-xs rounded-lg shadow-xs">GPay</span>
            <span className="px-2.5 py-1 bg-white text-emerald-950 font-black text-xs rounded-lg shadow-xs">RuPay</span>
            <span className="px-2.5 py-1 bg-white text-emerald-950 font-black text-xs rounded-lg shadow-xs">PhonePe</span>
            <span className="px-2.5 py-1 bg-white text-emerald-950 font-black text-xs rounded-lg shadow-xs">Paytm</span>
            <span className="px-2.5 py-1 bg-white text-emerald-950 font-black text-xs rounded-lg shadow-xs">VISA</span>
          </div>

          {/* Organic & FSSAI Certifications */}
          <div className="flex items-center space-x-3 text-xs text-emerald-200 font-bold">
            <span className="flex items-center space-x-1 bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-500/40">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>FSSAI Certified</span>
            </span>
            <span className="flex items-center space-x-1 bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-500/40">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Organic</span>
            </span>
          </div>
        </div>

        {/* Copyright & Legal Bar */}
        <div className="mt-6 pt-4 border-t border-emerald-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-200/80 gap-3">
          <p>© 2026 Nandi Farms. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <a href="#privacy" className="hover:text-amber-300 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-amber-300 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
