'use client';

import React, { useState } from 'react';
import { Check, Copy, X, Gift, Sparkles, ArrowRight, Truck } from 'lucide-react';

interface PromoBannersProps {
  onClaimOffer?: (offerTitle: string, offerCode?: string) => void;
  onOpenCart?: () => void;
}

export const PromoBanners: React.FC<PromoBannersProps> = ({ onClaimOffer, onOpenCart }) => {
  const [activeOfferModal, setActiveOfferModal] = useState<{
    title: string;
    code: string;
    discount: string;
    description: string;
  } | null>(null);

  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [claimedCodes, setClaimedCodes] = useState<Record<string, boolean>>({});

  const cards = [
    {
      id: 'promo-1',
      title: '10% OFF FIRST ORDER',
      subtitle: 'LIMITED TIME',
      code: 'NANDI10',
      discount: '10% INSTANT OFF',
      description: 'Join today and get an exclusive 10% discount on your entire first order of farm-fresh groceries.',
      image: '/promo-card-1.jpg',
      theme: 'emerald',
    },
    {
      id: 'promo-2',
      title: 'FREE EXPRESS DELIVERY',
      subtitle: 'On orders over ₹499',
      code: 'FREESHIP',
      discount: 'FREE DELIVERY',
      description: 'Shop and get your fresh produce delivered straight to your doorstep quickly with our express service.',
      image: '/promo-card-2.jpg',
      theme: 'rose',
    },
    {
      id: 'promo-3',
      title: '100% FARM FRESH',
      subtitle: 'DIRECT FROM LOCAL FARMS',
      code: 'ORGANIC50',
      discount: 'FRESH HARVEST DEAL',
      description: 'Enjoy the finest quality produce, harvested daily from local sustainable farms for maximum flavor and nutrition.',
      image: '/promo-card-3.jpg',
      theme: 'amber',
    },
  ];

  const handleClaimOffer = (card: typeof cards[0], e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    
    // Mark as claimed
    setClaimedCodes((prev) => ({ ...prev, [card.code]: true }));
    
    // Copy code to clipboard
    navigator.clipboard.writeText(card.code);
    setCopiedCode(true);

    // Trigger parent callback (shows toast)
    if (onClaimOffer) {
      onClaimOffer(card.title, card.code);
    }

    // Open detail modal
    setActiveOfferModal({
      title: card.title,
      code: card.code,
      discount: card.discount,
      description: card.description,
    });
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  return (
    <section className="w-full max-w-none bg-transparent py-4 sm:py-6 px-3 sm:px-6 lg:px-8 my-2 relative select-none">
      
      {/* Full-Length Seamless Banner Container with ZERO GAP between cards */}
      <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-emerald-950/10 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 items-stretch divide-y md:divide-y-0 md:divide-x divide-gray-100">
          
          {/* ========================================================================= */}
          {/* CARD 1: 10% OFF FIRST ORDER — 3D Falling & Floating Produce Animation   */}
          {/* ========================================================================= */}
          <div
            key={cards[0].id}
            onClick={() => handleClaimOffer(cards[0])}
            className="group relative overflow-hidden cursor-pointer bg-white transition-all duration-300 hover:brightness-105"
            title="Click to claim 10% OFF FIRST ORDER"
          >
            {/* Base Card Graphic */}
            <img
              src={cards[0].image}
              alt={cards[0].title}
              className="w-full h-auto object-cover block leading-none select-none"
              loading="eager"
            />

            {/* 3D Falling Produce Layer: Fruits drop down smoothly from the top */}
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
              {/* Falling 3D Avocado and Apple with spring bounce */}
              <div className="absolute top-[28%] left-[18%] animate-drop-fruit">
                <div className="animate-float-3d">
                  <span className="text-4xl sm:text-5xl drop-shadow-[0_12px_16px_rgba(0,0,0,0.35)] filter inline-block transform -rotate-12 hover:scale-110 transition-transform">
                    🥑
                  </span>
                </div>
              </div>

              {/* Crisp 3D Red Apple */}
              <div 
                className="absolute top-[35%] right-[22%] animate-drop-fruit"
                style={{ animationDelay: '0.15s' }}
              >
                <div className="animate-float-3d" style={{ animationDelay: '0.4s' }}>
                  <span className="text-3xl sm:text-4xl drop-shadow-[0_10px_14px_rgba(0,0,0,0.3)] filter inline-block transform rotate-12">
                    🍎
                  </span>
                </div>
              </div>

              {/* Fluttering Green Leaves */}
              <div 
                className="absolute top-[22%] left-[45%] animate-drop-fruit"
                style={{ animationDelay: '0.28s' }}
              >
                <div className="animate-float-3d" style={{ animationDelay: '0.8s' }}>
                  <span className="text-2xl sm:text-3xl drop-shadow-md inline-block transform rotate-45">
                    🍃
                  </span>
                </div>
              </div>
            </div>

            {/* Native Code-Designed Interactive Claim Offer Button */}
            <div className="absolute bottom-[4.5%] sm:bottom-[5.5%] left-0 right-0 px-4 sm:px-6 flex items-center justify-center z-20 pointer-events-auto">
              <button
                type="button"
                onClick={(e) => handleClaimOffer(cards[0], e)}
                className={`w-full max-w-[210px] sm:max-w-[230px] py-2.5 sm:py-3 px-4 rounded-full font-black text-xs sm:text-sm tracking-wide shadow-lg hover:shadow-2xl transition-all duration-300 transform active:scale-95 flex items-center justify-center space-x-1.5 cursor-pointer ${
                  claimedCodes[cards[0].code]
                    ? 'bg-[#063321] text-amber-300 ring-2 ring-amber-400 scale-[1.02]'
                    : 'bg-gradient-to-r from-[#178544] via-[#1a934b] to-[#147a3e] hover:from-[#116e37] hover:to-[#0f6130] text-white hover:scale-105'
                }`}
              >
                {claimedCodes[cards[0].code] ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400 stroke-[3] animate-bounce" />
                    <span>Claimed! ({cards[0].code})</span>
                  </>
                ) : (
                  <>
                    <span>Claim Offer</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 group-hover:rotate-12 transition-transform" />
                  </>
                )}
              </button>
            </div>

            {/* Active Ribbon Badge */}
            {claimedCodes[cards[0].code] && (
              <div className="absolute top-4 right-4 bg-emerald-900/90 text-amber-300 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs shadow-md border border-amber-300/40 z-20">
                ✓ Active Deal
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* CARD 2: FREE EXPRESS DELIVERY — Moving 3D Delivery Truck Animation        */}
          {/* ========================================================================= */}
          <div
            key={cards[1].id}
            onClick={() => handleClaimOffer(cards[1])}
            className="group relative overflow-hidden cursor-pointer bg-white transition-all duration-300 hover:brightness-105"
            title="Click to claim FREE EXPRESS DELIVERY"
          >
            {/* Base Card Graphic */}
            <img
              src={cards[1].image}
              alt={cards[1].title}
              className="w-full h-auto object-cover block leading-none select-none"
              loading="eager"
            />

            {/* 3D Moving Delivery Truck Layer: Truck drives smoothly across the road */}
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
              {/* Animated 3D Express Delivery Truck */}
              <div className="absolute top-[42%] left-[48%] animate-drive-truck">
                <div className="animate-truck-idle flex items-center space-x-1">
                  <span className="text-4xl sm:text-5xl drop-shadow-[0_14px_18px_rgba(0,0,0,0.4)] filter inline-block transform -scale-x-100">
                    🚚
                  </span>
                  {/* Motion Dust & Speed Streaks */}
                  <div className="flex flex-col space-y-0.5 opacity-80 -ml-1">
                    <span className="text-xs text-rose-500 font-black animate-pulse">💨</span>
                    <span className="text-[10px] text-amber-400 font-bold">⚡</span>
                  </div>
                </div>
              </div>

              {/* Delivery Speed Badge */}
              <div className="absolute top-[28%] right-[16%] animate-drop-fruit" style={{ animationDelay: '0.4s' }}>
                <span className="bg-rose-600/90 text-white font-extrabold text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full shadow-md tracking-wider uppercase border border-white/40">
                  ⚡ 2-Hr Fast Express
                </span>
              </div>
            </div>

            {/* Native Code-Designed Interactive Claim Offer Button */}
            <div className="absolute bottom-[4.5%] sm:bottom-[5.5%] left-0 right-0 px-4 sm:px-6 flex items-center justify-center z-20 pointer-events-auto">
              <button
                type="button"
                onClick={(e) => handleClaimOffer(cards[1], e)}
                className={`w-full max-w-[210px] sm:max-w-[230px] py-2.5 sm:py-3 px-4 rounded-full font-black text-xs sm:text-sm tracking-wide shadow-lg hover:shadow-2xl transition-all duration-300 transform active:scale-95 flex items-center justify-center space-x-1.5 cursor-pointer ${
                  claimedCodes[cards[1].code]
                    ? 'bg-[#063321] text-amber-300 ring-2 ring-amber-400 scale-[1.02]'
                    : 'bg-gradient-to-r from-[#178544] via-[#1a934b] to-[#147a3e] hover:from-[#116e37] hover:to-[#0f6130] text-white hover:scale-105'
                }`}
              >
                {claimedCodes[cards[1].code] ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400 stroke-[3] animate-bounce" />
                    <span>Claimed! ({cards[1].code})</span>
                  </>
                ) : (
                  <>
                    <span>Claim Offer</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 group-hover:rotate-12 transition-transform" />
                  </>
                )}
              </button>
            </div>

            {/* Active Ribbon Badge */}
            {claimedCodes[cards[1].code] && (
              <div className="absolute top-4 right-4 bg-emerald-900/90 text-amber-300 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs shadow-md border border-amber-300/40 z-20">
                ✓ Active Deal
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* CARD 3: 100% FARM FRESH — Basket Drops 1st, Then Produce Fills Into It    */}
          {/* ========================================================================= */}
          <div
            key={cards[2].id}
            onClick={() => handleClaimOffer(cards[2])}
            className="group relative overflow-hidden cursor-pointer bg-white transition-all duration-300 hover:brightness-105"
            title="Click to claim 100% FARM FRESH"
          >
            {/* Base Card Graphic */}
            <img
              src={cards[2].image}
              alt={cards[2].title}
              className="w-full h-auto object-cover block leading-none select-none"
              loading="eager"
            />

            {/* 3D Two-Stage Animation: Stage 1 Basket Lands, Stage 2 Fruits Fill Inside */}
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
              
              {/* STAGE 1: Wicker Farm Basket Drops Down from Upside First */}
              <div className="absolute top-[36%] left-[32%] animate-drop-basket">
                <span className="text-5xl sm:text-6xl drop-shadow-[0_16px_22px_rgba(0,0,0,0.45)] filter inline-block">
                  🧺
                </span>
              </div>

              {/* STAGE 2: Fresh Farm Produce Falls Into the Basket sequentially */}
              <div className="absolute top-[32%] left-[44%] animate-fill-produce">
                <div className="flex items-center -space-x-1">
                  <span className="text-2xl sm:text-3xl drop-shadow-md inline-block transform -rotate-12">
                    🍅
                  </span>
                  <span className="text-2xl sm:text-3xl drop-shadow-md inline-block transform rotate-12 -mt-2">
                    🥕
                  </span>
                  <span className="text-xl sm:text-2xl drop-shadow-md inline-block transform rotate-6">
                    🥛
                  </span>
                </div>
              </div>

              {/* Floating Fresh Leaves Canopy */}
              <div className="absolute top-[18%] right-[20%] animate-drop-fruit" style={{ animationDelay: '0.35s' }}>
                <span className="text-2xl text-emerald-600 drop-shadow-xs inline-block animate-pulse">
                  🌿
                </span>
              </div>
            </div>

            {/* Native Code-Designed Interactive Claim Offer Button */}
            <div className="absolute bottom-[4.5%] sm:bottom-[5.5%] left-0 right-0 px-4 sm:px-6 flex items-center justify-center z-20 pointer-events-auto">
              <button
                type="button"
                onClick={(e) => handleClaimOffer(cards[2], e)}
                className={`w-full max-w-[210px] sm:max-w-[230px] py-2.5 sm:py-3 px-4 rounded-full font-black text-xs sm:text-sm tracking-wide shadow-lg hover:shadow-2xl transition-all duration-300 transform active:scale-95 flex items-center justify-center space-x-1.5 cursor-pointer ${
                  claimedCodes[cards[2].code]
                    ? 'bg-[#063321] text-amber-300 ring-2 ring-amber-400 scale-[1.02]'
                    : 'bg-gradient-to-r from-[#178544] via-[#1a934b] to-[#147a3e] hover:from-[#116e37] hover:to-[#0f6130] text-white hover:scale-105'
                }`}
              >
                {claimedCodes[cards[2].code] ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400 stroke-[3] animate-bounce" />
                    <span>Claimed! ({cards[2].code})</span>
                  </>
                ) : (
                  <>
                    <span>Claim Offer</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 group-hover:rotate-12 transition-transform" />
                  </>
                )}
              </button>
            </div>

            {/* Active Ribbon Badge */}
            {claimedCodes[cards[2].code] && (
              <div className="absolute top-4 right-4 bg-emerald-900/90 text-amber-300 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs shadow-md border border-amber-300/40 z-20">
                ✓ Active Deal
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Interactive Offer Claim Confirmation Modal */}
      {activeOfferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative border border-emerald-100 animate-scale-up text-left">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveOfferModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Icon & Header */}
            <div className="text-center space-y-2 mb-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
                <Gift className="w-8 h-8 text-emerald-800 animate-bounce" />
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 tracking-tight font-sans">
                {activeOfferModal.title}
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                {activeOfferModal.description}
              </p>
            </div>

            {/* Coupon Code Box with Instant Copy */}
            <div className="bg-emerald-50 border-2 border-dashed border-emerald-400 rounded-2xl p-4 mb-6 flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase font-bold text-emerald-700 block">Promo Code</span>
                <span className="text-xl font-mono font-black text-emerald-950 tracking-wider">
                  {activeOfferModal.code}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleCopyCode(activeOfferModal.code)}
                className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center space-x-1.5 transition-all cursor-pointer ${
                  copiedCode
                    ? 'bg-emerald-800 text-white shadow-md'
                    : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs'
                }`}
              >
                {copiedCode ? (
                  <>
                    <Check className="w-4 h-4 text-amber-400" />
                    <span>Copied! 🎉</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              {onOpenCart && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveOfferModal(null);
                    onOpenCart();
                  }}
                  className="w-full bg-[#07362a] hover:bg-emerald-900 text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <span>Go to Cart with Code Applied</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setActiveOfferModal(null)}
                className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs py-2.5 px-4 rounded-xl transition-colors cursor-pointer"
              >
                Continue Shopping 🛒
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
