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
      description: 'Get an exclusive 10% discount on pure Nandi Farms fresh milk & organic farm harvest.',
      image: '/promo-nandi-milk.jpg',
    },
    {
      id: 'promo-2',
      title: 'FREE EXPRESS DELIVERY',
      subtitle: 'ON ORDERS OVER ₹499',
      code: 'FREESHIP',
      discount: 'FREE DELIVERY',
      description: 'Farm-fresh harvest vegetables box delivered straight to your door with zero delivery charges.',
      image: '/promo-nandi-vegetables.jpg',
    },
    {
      id: 'promo-3',
      title: '100% FARM FRESH',
      subtitle: 'DIRECT FROM LOCAL FARMS',
      code: 'ORGANIC50',
      discount: 'FRESH HARVEST DEAL',
      description: 'Handpicked chemical-free organic fruits harvested daily from sustainable local farms.',
      image: '/promo-nandi-fruits.jpg',
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

          return (
            <div
              key={card.id}
              onClick={() => handleClaimOffer(card)}
              className="group relative rounded-t-[50px] sm:rounded-t-[60px] rounded-b-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-[#faf6eb] border border-amber-900/10 select-none flex flex-col justify-between h-full"
              title={`Click to claim ${card.title}`}
            >
              {/* Authentic Nandi Farms Photo Box */}
              <div className="w-full aspect-square overflow-hidden relative bg-[#faf5e4]">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />
                <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#faf6eb] to-transparent pointer-events-none" />

                {/* Subtitle Pill Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-amber-400 text-gray-950 font-black text-[10px] sm:text-[11px] px-3 py-1 rounded-full shadow-sm tracking-wide">
                    {card.subtitle}
                  </span>
                </div>

                {/* Top Claimed Ribbon Badge (when claimed) */}
                {isClaimed && (
                  <div className="absolute top-4 right-4 bg-emerald-900/90 text-amber-300 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs shadow-md border border-amber-300/40 z-20">
                    ✓ Active Deal
                  </div>
                )}
              </div>

              {/* Offer Content & Code-Designed Interactive Button */}
              <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-[#faf6eb] relative z-10">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-black text-emerald-800 tracking-wider">
                      {card.discount}
                    </span>
                    <span className="text-[11px] font-bold text-amber-800 bg-amber-100/90 px-2 py-0.5 rounded-full font-mono">
                      {card.code}
                    </span>
                  </div>

                  <h3 className="font-black text-base sm:text-lg text-emerald-950 tracking-tight leading-tight mb-1">
                    {card.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Interactive Claim Offer Button */}
                <div className="mt-4 pt-1">
                  <button
                    type="button"
                    onClick={(e) => handleClaimOffer(card, e)}
                    className={`w-full py-2.5 px-4 rounded-full font-black text-xs sm:text-sm tracking-wide shadow-md hover:shadow-xl transition-all duration-300 transform active:scale-95 flex items-center justify-center space-x-1.5 cursor-pointer ${
                      isClaimed
                        ? 'bg-[#063321] text-amber-300 ring-2 ring-amber-400 scale-[1.02]'
                        : 'bg-gradient-to-r from-[#178544] via-[#1a934b] to-[#147a3e] hover:from-[#116e37] hover:to-[#0f6130] text-white hover:scale-102 hover:shadow-emerald-600/30'
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
              </div>
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
