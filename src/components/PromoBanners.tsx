'use client';

import React, { useState } from 'react';
import { Copy, Check, Truck, Sparkles, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';

interface PromoBannersProps {
  onClaimOffer?: (offerTitle: string) => void;
}

export const PromoBanners: React.FC<PromoBannersProps> = ({ onClaimOffer }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (e: React.MouseEvent, code: string, offerTitle: string) => {
    e.stopPropagation();
    setCopiedCode(code);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code).catch(() => {});
    }
    if (onClaimOffer) {
      onClaimOffer(`Coupon "${code}" applied for ${offerTitle}! 🎉`);
    }
    setTimeout(() => {
      setCopiedCode(null);
    }, 3000);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        
        {/* Left Hero Bento Card: 10% OFF First Order (Emerald Green #00875a) */}
        <div
          onClick={() => onClaimOffer && onClaimOffer('NEW HERE? ENJOY 10% OFF YOUR FIRST ORDER')}
          className="lg:col-span-6 bg-[#00875a] text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between min-h-[360px] sm:min-h-[400px] shadow-lg border border-emerald-800/30 group hover:-translate-y-1 transition-all duration-300 cursor-pointer"
        >
          {/* Subtle Ambient Pattern Background */}
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>

          {/* Top Tag & Title */}
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-extrabold uppercase tracking-wider text-emerald-100 border border-white/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>NEW CUSTOMER SPECIAL</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-tight uppercase font-sans">
              NEW HERE? ENJOY 10% OFF YOUR FIRST ORDER
            </h3>
            <p className="text-xs sm:text-sm font-medium text-emerald-100 max-w-md leading-relaxed">
              Sign up today and get instant savings on your first farm-fresh organic grocery purchase.
            </p>
          </div>

          {/* Center Cutout Produce Image */}
          <div className="my-4 flex justify-center items-center relative z-10">
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border-4 border-white/40 shadow-2xl bg-white/15 backdrop-blur-xs p-2 group-hover:scale-105 transition-transform duration-300">
              <img
                src="/public/real-ingredients-banner.png"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80';
                }}
                alt="10% OFF First Order"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>

          {/* Bottom Action: Copy Code Button */}
          <div className="relative z-10 flex items-center justify-between gap-3 pt-2">
            <button
              onClick={(e) => handleCopyCode(e, 'WELCOME10', '10% OFF First Order')}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white hover:bg-emerald-50 text-emerald-900 font-black text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-md transition-all hover:scale-105 cursor-pointer border border-white/80"
            >
              {copiedCode === 'WELCOME10' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Code Applied! (WELCOME10)</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-emerald-700" />
                  <span>Copy Code: WELCOME10</span>
                </>
              )}
            </button>

            <div className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white shrink-0 group-hover:bg-black transition-colors shadow-md">
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>

        {/* Right Stacked Bento Cards: 2 Cards (Pink & Yellow) */}
        <div className="lg:col-span-6 flex flex-col gap-5 sm:gap-6 justify-between">
          
          {/* Top Card: Free Delivery (Hot Pink #ff007f) */}
          <div
            onClick={() => onClaimOffer && onClaimOffer('FREE DELIVERY WITH NO MINIMUM COST')}
            className="bg-[#ff007f] text-white rounded-3xl p-6 sm:p-7 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4 flex-1 shadow-lg border border-pink-700/30 group hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <div className="relative z-10 space-y-2 max-w-xs">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-extrabold uppercase tracking-wider text-pink-100 border border-white/20">
                <Truck className="w-3 h-3" />
                <span>EXPRESS DELIVERY</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black leading-tight tracking-tight uppercase font-sans">
                FREE DELIVERY WITH NO MINIMUM COST
              </h3>
              <p className="text-xs font-medium text-pink-100 opacity-90 leading-relaxed">
                Order your daily essentials anywhere in India with zero delivery charges!
              </p>
              
              <div className="pt-1">
                <button
                  onClick={(e) => handleCopyCode(e, 'FREEDELIVERY', 'Free Delivery')}
                  className="inline-flex items-center space-x-2 bg-white hover:bg-pink-50 text-pink-900 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all hover:scale-105 cursor-pointer border border-white/80"
                >
                  {copiedCode === 'FREEDELIVERY' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-pink-600" />
                      <span>Code Applied! (FREEDELIVERY)</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-pink-700" />
                      <span>Copy Code: FREEDELIVERY</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Circular Photo Frame */}
            <div className="relative z-10 shrink-0">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-3 border-white/50 shadow-xl bg-white/20 backdrop-blur-xs p-1 group-hover:scale-105 transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=400&q=80"
                  alt="Free Delivery"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Bottom Card: Fresh Groceries Family (Sunburst Yellow #ffc700) */}
          <div
            onClick={() => onClaimOffer && onClaimOffer('FRESH GROCERIES FOR YOUR FAMILY')}
            className="bg-[#ffc700] text-gray-950 rounded-3xl p-6 sm:p-7 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4 flex-1 shadow-lg border border-yellow-500/30 group hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <div className="relative z-10 space-y-2 max-w-xs">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-black/10 text-[10px] font-black uppercase tracking-wider text-gray-900 border border-black/10">
                <ShieldCheck className="w-3 h-3 text-emerald-800" />
                <span>FARM HARVESTED</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black leading-tight tracking-tight uppercase font-sans text-gray-950">
                FRESH GROCERIES FOR YOUR FAMILY, WITHOUT HASSLE.
              </h3>
              <p className="text-xs font-semibold text-gray-800 leading-relaxed">
                We deliver everything you need straight to your door daily.
              </p>
              
              <div className="pt-1">
                <button
                  onClick={(e) => handleCopyCode(e, 'FARMFRESH', 'Fresh Family Groceries')}
                  className="inline-flex items-center space-x-2 bg-gray-950 hover:bg-gray-800 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all hover:scale-105 cursor-pointer"
                >
                  {copiedCode === 'FARMFRESH' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Code Applied! (FARMFRESH)</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-amber-300" />
                      <span>Copy Code: FARMFRESH</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Circular Photo Frame */}
            <div className="relative z-10 shrink-0">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-3 border-black/20 shadow-xl bg-white/40 backdrop-blur-xs p-1 group-hover:scale-105 transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80"
                  alt="Fresh Family Groceries"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

