'use client';

import React, { useState } from 'react';
import { 
  Home, 
  Phone, 
  Mail, 
  CheckCircle2
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
    <footer className="relative bg-[#08382c] text-white font-sans overflow-hidden">
      {/* 1:1 Double Organic Wave Curve Top Divider */}
      <div className="w-full overflow-hidden leading-none relative z-20">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-16 sm:h-20 lg:h-24 text-[#faf9f4] fill-current"
        >
          <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,40 L1200,0 L0,0 Z"></path>
        </svg>
      </div>

      {/* Decorative Organic Leaf Watermark Overlays */}
      <div className="absolute top-10 -left-12 w-72 h-72 opacity-15 pointer-events-none select-none">
        <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-300 fill-current">
          <path d="M10,30 Q30,10 50,30 T90,30 Q70,70 50,50 T10,30 Z" />
          <path d="M20,60 Q40,40 60,60 T100,60 Q80,90 60,80 T20,60 Z" />
        </svg>
      </div>

      <div className="absolute top-10 -right-12 w-72 h-72 opacity-15 pointer-events-none select-none transform rotate-45">
        <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-300 fill-current">
          <path d="M10,30 Q30,10 50,30 T90,30 Q70,70 50,50 T10,30 Z" />
          <path d="M20,60 Q40,40 60,60 T100,60 Q80,90 60,80 T20,60 Z" />
        </svg>
      </div>

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          
          {/* Column 1: Brand Logo & Social Links (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center space-x-3">
              {/* Green & Gold Nandi Farms Cow Emblem Logo */}
              <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-400/30 flex items-center justify-center p-2 shadow-lg">
                <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-300 fill-current">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6" />
                  <path d="M30 40 C30 25, 70 25, 70 40 C70 65, 30 65, 30 40 Z" />
                  <circle cx="50" cy="45" r="8" fill="#fbbf24" />
                </svg>
              </div>

              <div>
                <span className="text-2xl font-extrabold tracking-tight text-white block font-sans leading-none">
                  Nandi
                </span>
                <span className="text-xl font-bold text-emerald-300 block font-sans leading-none mt-0.5">
                  Farms
                </span>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-emerald-100/90 font-medium leading-relaxed pt-1">
              Nourishing lives, Naturally.
            </p>

            {/* Social Icons (Facebook, Instagram, YouTube, LinkedIn) */}
            <div className="pt-2 flex items-center space-x-3">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500 hover:text-white text-emerald-100 flex items-center justify-center transition-colors border border-white/10 cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500 hover:text-white text-emerald-100 flex items-center justify-center transition-colors border border-white/10 cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500 hover:text-white text-emerald-100 flex items-center justify-center transition-colors border border-white/10 cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 1.96A29 29 0 001 12a29 29 0 00.46 5.58a2.78 2.78 0 001.94 1.96c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500 hover:text-white text-emerald-100 flex items-center justify-center transition-colors border border-white/10 cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-base font-extrabold text-amber-200 font-sans tracking-tight">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm font-medium text-emerald-100">
              <li>
                <a href="https://eveggie.in/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-200 transition-colors inline-block">
                  About Us
                </a>
              </li>
              <li>
                <a href="#todays-picks" className="hover:text-amber-200 transition-colors inline-block font-semibold text-white">
                  Shop Now 👆
                </a>
              </li>
              <li>
                <a href="https://eveggie.in/products" target="_blank" rel="noopener noreferrer" className="hover:text-amber-200 transition-colors inline-block">
                  Delivery Info
                </a>
              </li>
              <li>
                <a href="https://eveggie.in/shops" target="_blank" rel="noopener noreferrer" className="hover:text-amber-200 transition-colors inline-block">
                  FAQ
                </a>
              </li>
              <li>
                <a href="https://eveggie.in/order-history" target="_blank" rel="noopener noreferrer" className="hover:text-amber-200 transition-colors inline-block">
                  Blog
                </a>
              </li>
              <li>
                <a href="https://eveggie.in/recipes" target="_blank" rel="noopener noreferrer" className="hover:text-amber-200 transition-colors inline-block">
                  Recipes
                </a>
              </li>
              <li>
                <a href="https://eveggie.in/contact-us" target="_blank" rel="noopener noreferrer" className="hover:text-amber-200 transition-colors inline-block">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-base font-extrabold text-amber-200 font-sans tracking-tight">
              Contact Info
            </h3>
            <ul className="space-y-3.5 text-xs sm:text-sm font-medium text-emerald-100">
              <li className="flex items-start space-x-3">
                <div className="w-7 h-7 rounded-lg bg-white/10 text-amber-300 flex items-center justify-center shrink-0 border border-white/10 mt-0.5">
                  <Home className="w-3.5 h-3.5" />
                </div>
                <span className="text-emerald-100 leading-relaxed">
                  Farm to Fork, <br />
                  Hyderabad, Telangana 500033
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-7 h-7 rounded-lg bg-white/10 text-amber-300 flex items-center justify-center shrink-0 border border-white/10">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <a href="tel:9949777844" className="hover:text-amber-200 transition-colors font-extrabold text-white">
                  Phone: +91 9949777844
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-7 h-7 rounded-lg bg-white/10 text-amber-300 flex items-center justify-center shrink-0 border border-white/10">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="block text-[10px] text-emerald-300">Email:</span>
                  <a href="mailto:support@nandifarms.com" className="hover:text-amber-200 transition-colors text-xs font-semibold">
                    support@nandifarms.com
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Signup (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-base font-extrabold text-amber-200 font-sans tracking-tight">
              Newsletter Signup
            </h3>
            <p className="text-base font-extrabold text-white pt-0.5">
              Subscribe for 10% OFF
            </p>
            <p className="text-xs text-emerald-100/90 font-medium leading-relaxed">
              Get our freshest updates and exclusive offers.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2.5 pt-1">
              <input
                type="email"
                required
                placeholder="Your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0c4a3b] border border-emerald-500/30 rounded-xl py-3 px-4 text-xs text-white placeholder-emerald-200/60 focus:outline-none focus:border-amber-300 focus:ring-1 focus:ring-amber-300 transition-all shadow-inner"
              />
              <button
                type="submit"
                className="w-full bg-[#f7ebcf] hover:bg-[#f3e2b8] text-gray-950 font-extrabold text-xs py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Subscribe</span>
              </button>

              {subscribed && (
                <div className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs rounded-xl p-2.5 flex items-center space-x-1.5 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Subscribed! 10% OFF code sent to your email. 🎉</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* 1:1 Indian Payment Logos & Certification Badges Container */}
        <div className="mt-10 bg-[#0c4a3b]/90 border border-emerald-500/20 rounded-2xl py-3.5 px-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Payment Logos */}
          <div className="flex items-center space-x-3 overflow-x-auto no-scrollbar py-1">
            <span className="px-3 py-1 bg-white text-[#1a1f71] font-black text-xs rounded-md shadow-xs border border-gray-200">VISA</span>
            <span className="px-3 py-1 bg-white text-[#eb001b] font-black text-xs rounded-md shadow-xs border border-gray-200">Mastercard</span>
            <span className="px-3 py-1 bg-white text-[#0f7938] font-black text-xs rounded-md shadow-xs border border-gray-200">UPI</span>
            <span className="px-3 py-1 bg-white text-[#00875a] font-black text-xs rounded-md shadow-xs border border-gray-200">RuPay</span>
            <span className="px-3 py-1 bg-white text-[#4285f4] font-black text-xs rounded-md shadow-xs border border-gray-200">GPay</span>
          </div>

          {/* Organic & FSSAI Certification Badges */}
          <div className="flex items-center space-x-3 text-[11px] text-emerald-200 font-bold uppercase tracking-wider">
            <span className="flex items-center space-x-1 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/40 text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
              <span>100% ORGANIC</span>
            </span>
            <span className="flex items-center space-x-1 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/40 text-amber-300">
              <span>CERTIFIED ORGANIC</span>
            </span>
            <span className="flex items-center space-x-1 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/40 text-emerald-300 italic font-black">
              <span>fssai</span>
            </span>
            <span className="flex items-center space-x-1 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/40 text-emerald-300">
              <span>NON-GMO</span>
            </span>
          </div>
        </div>

        {/* 1:1 Copyright Bar */}
        <div className="mt-6 pt-4 border-t border-emerald-900/80 flex items-center justify-center text-xs text-emerald-200/80">
          <p>© 2026 Nandi Farms. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};
