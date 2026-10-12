'use client';

import React, { useState } from 'react';
import { Check, Copy, X, Gift, Sparkles, ArrowRight } from 'lucide-react';

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
      subtitle: 'LIMITED TIME OFFER',
      code: 'NANDI10',
      discount: '10% INSTANT OFF',
      description: 'Get an exclusive 10% discount on your entire first order of farm-fresh groceries.',
      image: '/promo-card-1.jpg',
    },
    {
      id: 'promo-2',
      title: 'FREE EXPRESS DELIVERY',
      subtitle: 'ON ORDERS OVER ₹499',
      code: 'FREESHIP',
      discount: 'FREE DELIVERY',
      description: 'Shop fresh produce over ₹499 and get zero delivery charges delivered straight to your door.',
      image: '/promo-card-2.jpg',
    },
    {
      id: 'promo-3',
      title: '100% FARM FRESH',
      subtitle: 'DIRECT FROM LOCAL FARMS',
      code: 'ORGANIC50',
      discount: 'FRESH HARVEST DEAL',
      description: 'Enjoy handpicked, chemical-free organic produce harvested daily from local sustainable farms.',
      image: '/promo-card-3.jpg',
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
    <section className="w-full max-w-none bg-transparent py-6 sm:py-8 px-4 sm:px-8 lg:px-12 my-2 relative">
      {/* 3 Arched Compact Grid Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-stretch max-w-5xl mx-auto relative z-10">
        {cards.map((card) => {
          const isClaimed = !!claimedCodes[card.code];

          if (card.id === 'promo-1') {
            return (
              <div
                key={card.id}
                onClick={() => handleClaimOffer(card)}
                className="group relative rounded-t-[60px] sm:rounded-t-[80px] rounded-b-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-[#FAF5E4] border border-emerald-950/5 select-none"
                title={`Click to claim ${card.title}`}
              >
                {/* LAYER 1: Option 1 Lush Morning Harvest Background Template (Scaled to fill card bounds completely) */}
                <div className="w-full h-auto overflow-hidden">
                  <img
                    src="/promo-card-1-morning-harvest.jpg"
                    alt={card.title}
                    className="w-full h-auto object-cover block leading-none select-none scale-[1.08] transform origin-center transition-transform duration-500"
                    loading="eager"
                  />
                </div>

                {/* LAYER 2: 3D Produce Centerpiece (Drops In from Upside + Infinite 3D Float) */}
                <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden flex flex-col items-center justify-center">
                  {/* Produce Drops from Upside into Place */}
                  <div className="absolute top-[23%] left-[13%] right-[13%] animate-fruit-drop-and-float transition-transform duration-500 group-hover:scale-105">
                    <img
                      src="/card1-fruits-3d.png"
                      alt="3D Farm Fresh Fruits"
                      className="w-full h-auto object-contain filter select-none drop-shadow-[0_16px_20px_rgba(0,0,0,0.25)]"
                      loading="eager"
                    />
                  </div>

                  {/* Dynamic Ground Contact Shadow */}
                  <div className="absolute top-[59%] left-[25%] right-[25%] h-3 bg-black/30 rounded-full blur-md animate-fruit-shadow" />
                </div>

                {/* LAYER 3: 100% Native Code-Designed Interactive Claim Offer Button */}
                <div className="absolute bottom-[4.5%] sm:bottom-[5.5%] left-0 right-0 px-4 sm:px-6 flex items-center justify-center z-20 pointer-events-auto">
                  <button
                    type="button"
                    onClick={(e) => handleClaimOffer(card, e)}
                    className={`w-full max-w-[210px] sm:max-w-[230px] py-2.5 sm:py-3 px-4 rounded-full font-black text-xs sm:text-sm tracking-wide shadow-lg hover:shadow-2xl transition-all duration-300 transform active:scale-95 flex items-center justify-center space-x-1.5 cursor-pointer ${
                      isClaimed
                        ? 'bg-[#063321] text-amber-300 ring-2 ring-amber-400 scale-[1.02]'
                        : 'bg-gradient-to-r from-[#178544] via-[#1a934b] to-[#147a3e] hover:from-[#116e37] hover:to-[#0f6130] text-white hover:scale-105 hover:shadow-emerald-600/30'
                    }`}
                  >
                    {isClaimed ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400 stroke-[3] animate-bounce" />
                        <span>Claimed! ({card.code})</span>
                      </>
                    ) : (
                      <>
                        <span>Claim Offer</span>
                        <Sparkles className="w-3.5 h-3.5 text-amber-300 group-hover:rotate-12 transition-transform" />
                      </>
                    )}
                  </button>
                </div>

                {/* Top Claimed Ribbon Badge (when claimed) */}
                {isClaimed && (
                  <div className="absolute top-4 right-4 bg-emerald-900/90 text-amber-300 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs shadow-md border border-amber-300/40 z-20">
                    ✓ Active Deal
                  </div>
                )}
              </div>
            );
          }

          if (card.id === 'promo-2') {
            return (
              <div
                key={card.id}
                onClick={() => handleClaimOffer(card)}
                className="group relative rounded-t-[60px] sm:rounded-t-[80px] rounded-b-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-[#FAF5E4] border border-emerald-950/5 select-none"
                title={`Click to claim ${card.title}`}
              >
                {/* LAYER 1: Full-Length Sunrise Speed Template (Zero gaps, zero baked-in buttons) */}
                <div className="w-full h-auto overflow-hidden">
                  <img
                    src="/promo-card-2-sunrise-speed.jpg"
                    alt={card.title}
                    className="w-full h-auto object-cover block leading-none select-none scale-[1.04] transform origin-center transition-transform duration-500"
                    loading="eager"
                  />
                </div>

                {/* LAYER 2: 3D Stage with Grand Basket and Left-to-Right Golden Trail Delivery Van */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ perspective: '1000px' }}>
                  {/* CENTERPIECE: Grand Hero 3D Nandi Farms Grocery Bag & Produce (Enlarged w-[94%] sm:w-[90%]) */}
                  <div className="absolute top-[16%] sm:top-[14%] left-1/2 -translate-x-1/2 w-[94%] sm:w-[90%] z-15 transition-transform duration-500 group-hover:scale-105">
                    <img
                      src="/card2-groceries-nandi-v2.png"
                      alt="3D Nandi Farms Fresh Produce"
                      className="w-full h-auto object-contain filter select-none drop-shadow-[0_22px_24px_rgba(0,0,0,0.28)]"
                      loading="eager"
                    />
                  </div>

                  {/* Dynamic Ground Contact Shadow beneath Central Produce */}
                  <div className="absolute top-[64%] sm:top-[63%] left-1/2 -translate-x-1/2 w-[90%] h-4.5 bg-black/25 rounded-full blur-md animate-fruit-shadow z-10" />

                  {/* DELIVERY VAN: Cruising Left-to-Right Along Background Golden Trail (Enlarged w-[54%] sm:w-[50%]) */}
                  <div className="absolute w-[54%] sm:w-[50%] animate-truck-gold-trail z-20 pointer-events-none">
                    <img
                      src="/card2-truck-right-3d.png"
                      alt="3D Express Delivery Truck"
                      className="w-full h-auto object-contain filter select-none drop-shadow-[0_18px_20px_rgba(0,0,0,0.35)]"
                      loading="eager"
                    />
                    {/* Golden speed sparkles trailing behind truck on the left */}
                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 flex items-center space-x-0.5 opacity-80 pointer-events-none">
                      <span className="text-xs text-amber-400 font-black animate-pulse">✨</span>
                      <span className="text-sm text-amber-300 font-bold">💨</span>
                    </div>
                  </div>
                </div>

                {/* LAYER 4: 100% Native Code-Designed Interactive Claim Offer Button */}
                <div className="absolute bottom-[4.5%] sm:bottom-[5.5%] left-0 right-0 px-4 sm:px-6 flex items-center justify-center z-20 pointer-events-auto">
                  <button
                    type="button"
                    onClick={(e) => handleClaimOffer(card, e)}
                    className={`w-full max-w-[210px] sm:max-w-[230px] py-2.5 sm:py-3 px-4 rounded-full font-black text-xs sm:text-sm tracking-wide shadow-lg hover:shadow-2xl transition-all duration-300 transform active:scale-95 flex items-center justify-center space-x-1.5 cursor-pointer ${
                      isClaimed
                        ? 'bg-[#063321] text-amber-300 ring-2 ring-amber-400 scale-[1.02]'
                        : 'bg-gradient-to-r from-[#178544] via-[#1a934b] to-[#147a3e] hover:from-[#116e37] hover:to-[#0f6130] text-white hover:scale-105 hover:shadow-emerald-600/30'
                    }`}
                  >
                    {isClaimed ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400 stroke-[3] animate-bounce" />
                        <span>Claimed! ({card.code})</span>
                      </>
                    ) : (
                      <>
                        <span>Claim Offer</span>
                        <Sparkles className="w-3.5 h-3.5 text-amber-300 group-hover:rotate-12 transition-transform" />
                      </>
                    )}
                  </button>
                </div>

                {/* Top Claimed Ribbon Badge (when claimed) */}
                {isClaimed && (
                  <div className="absolute top-4 right-4 bg-emerald-900/90 text-amber-300 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs shadow-md border border-amber-300/40 z-20">
                    ✓ Active Deal
                  </div>
                )}
              </div>
            );
          }

          return (
            <div
              key={card.id}
              onClick={() => handleClaimOffer(card)}
              className="group relative rounded-t-[60px] sm:rounded-t-[80px] rounded-b-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-white leading-none border border-emerald-950/5"
              title={`Click to claim ${card.title}`}
            >
              {/* Preserved Authentic High-Definition Image Asset (100% Flush Card Fit) */}
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-auto object-cover block leading-none group-hover:scale-[1.015] transition-transform duration-500 rounded-t-[60px] sm:rounded-t-[80px] rounded-b-3xl select-none"
                loading="eager"
              />

              {/* Native Code-Designed Interactive Claim Offer Button at the bottom of the image */}
              <div className="absolute bottom-[4.5%] sm:bottom-[5.5%] left-0 right-0 px-4 sm:px-6 flex items-center justify-center z-20 pointer-events-auto">
                <button
                  type="button"
                  onClick={(e) => handleClaimOffer(card, e)}
                  className={`w-full max-w-[210px] sm:max-w-[230px] py-2.5 sm:py-3 px-4 rounded-full font-black text-xs sm:text-sm tracking-wide shadow-lg hover:shadow-2xl transition-all duration-300 transform active:scale-95 flex items-center justify-center space-x-1.5 cursor-pointer ${
                    isClaimed
                      ? 'bg-[#063321] text-amber-300 ring-2 ring-amber-400 scale-[1.02]'
                      : 'bg-gradient-to-r from-[#178544] via-[#1a934b] to-[#147a3e] hover:from-[#116e37] hover:to-[#0f6130] text-white hover:scale-105'
                  }`}
                >
                  {isClaimed ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400 stroke-[3] animate-bounce" />
                      <span>Claimed! ({card.code})</span>
                    </>
                  ) : (
                    <>
                      <span>Claim Offer</span>
                      <Sparkles className="w-3.5 h-3.5 text-amber-300 group-hover:rotate-12 transition-transform" />
                    </>
                  )}
                </button>
              </div>

              {/* Top Claimed Ribbon Badge (when claimed) */}
              {isClaimed && (
                <div className="absolute top-4 right-4 bg-emerald-900/90 text-amber-300 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs shadow-md border border-amber-300/40 z-20">
                  ✓ Active Deal
                </div>
              )}
            </div>
          );
        })}
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
