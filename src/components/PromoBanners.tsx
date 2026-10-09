'use client';

import React, { useState } from 'react';
import { Tag, Check, Copy, Sparkles, X, Gift } from 'lucide-react';

interface PromoBannersProps {
  onClaimOffer?: (offerTitle: string) => void;
}

export const PromoBanners: React.FC<PromoBannersProps> = ({ onClaimOffer }) => {
  const [activeOfferModal, setActiveOfferModal] = useState<{
    title: string;
    code: string;
    discount: string;
    description: string;
  } | null>(null);

  const [copiedCode, setCopiedCode] = useState<boolean>(false);

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
      code: 'FREEDEL',
      discount: 'FREE DELIVERY',
      description: 'Shop fresh produce over ₹499 and get zero delivery charges delivered straight to your door.',
      image: '/promo-card-2.jpg',
    },
    {
      id: 'promo-3',
      title: '100% FARM FRESH',
      subtitle: 'DIRECT FROM LOCAL FARMS',
      code: 'FARMFRESH',
      discount: 'FRESH HARVEST DEAL',
      description: 'Enjoy handpicked, chemical-free organic produce harvested daily from local sustainable farms.',
      image: '/promo-card-3.jpg',
    },
  ];

  const handleOpenModal = (card: typeof cards[0]) => {
    setActiveOfferModal({
      title: card.title,
      code: card.code,
      discount: card.discount,
      description: card.description,
    });
    setCopiedCode(false);
    if (onClaimOffer) {
      onClaimOffer(card.title);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-4 my-2">
      {/* 3 Standalone Full-Length Graphic Offer Cards with Claim Offer Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-stretch">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl group border border-emerald-100 flex flex-col justify-between transform hover:-translate-y-1.5 transition-all duration-300 max-w-[360px] mx-auto w-full"
          >
            {/* Full Length Uncropped Image (100% complete top to bottom) */}
            <div
              onClick={() => handleOpenModal(card)}
              className="w-full bg-amber-50/40 cursor-pointer overflow-hidden relative"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-auto block object-contain group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>

            {/* Down of Image: Claim Offer Action Bar */}
            <div className="p-4 bg-gradient-to-b from-white to-emerald-50/50 border-t border-emerald-100/60 flex flex-col space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-500 font-semibold px-1">
                <span className="flex items-center gap-1 text-emerald-800 font-bold">
                  <Tag className="w-3.5 h-3.5 text-amber-600" />
                  <span>Use Code: <strong className="text-emerald-950 font-mono">{card.code}</strong></span>
                </span>
                <span className="text-[11px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold">
                  {card.subtitle}
                </span>
              </div>

              {/* Working Claim Offer Button */}
              <button
                onClick={() => handleOpenModal(card)}
                className="w-full bg-emerald-800 hover:bg-emerald-900 active:scale-95 text-white font-bold text-sm py-2.5 px-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer group/btn"
              >
                <Sparkles className="w-4 h-4 text-amber-400 group-hover/btn:rotate-12 transition-transform" />
                <span>Claim Offer</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Claim Offer Modal */}
      {activeOfferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-emerald-100 animate-scale-up">
            {/* Close Button */}
            <button
              onClick={() => setActiveOfferModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Icon & Header */}
            <div className="text-center space-y-2 mb-6">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto shadow-inner">
                <Gift className="w-8 h-8 text-emerald-800" />
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
            <div className="space-y-2">
              <button
                onClick={() => {
                  handleCopyCode(activeOfferModal.code);
                  setTimeout(() => setActiveOfferModal(null), 800);
                }}
                className="w-full bg-emerald-900 hover:bg-emerald-950 text-white font-extrabold text-sm py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer"
              >
                Apply Coupon & Continue Shopping 🛒
              </button>
              <button
                onClick={() => setActiveOfferModal(null)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs py-2.5 px-4 rounded-xl transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
