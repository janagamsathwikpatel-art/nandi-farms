'use client';

import React, { useState } from 'react';
import { Check, Copy, X, Gift, Sparkles, Tag, ArrowRight } from 'lucide-react';

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
      tag: 'LIMITED TIME',
      code: 'NANDI10',
      discount: '10% INSTANT OFF',
      description: 'Join today and get an exclusive 10% discount on your entire first order of farm-fresh groceries.',
      headerBg: 'bg-gradient-to-b from-emerald-600 via-emerald-600 to-emerald-700',
      tagBg: 'bg-amber-100 text-amber-950 border-amber-300',
      icon: '🥑🍎',
    },
    {
      id: 'promo-2',
      title: 'FREE EXPRESS DELIVERY',
      tag: 'On orders over ₹499',
      code: 'FREEDEL',
      discount: 'FREE DELIVERY',
      description: 'Shop and get your fresh produce delivered straight to your doorstep quickly with our express service.',
      headerBg: 'bg-gradient-to-b from-rose-500 via-rose-600 to-red-600',
      tagBg: 'bg-rose-100 text-rose-950 border-rose-300',
      icon: '📦🚚',
    },
    {
      id: 'promo-3',
      title: '100% FARM FRESH',
      tag: 'DIRECT FROM LOCAL FARMS',
      code: 'FARMFRESH',
      discount: 'FRESH HARVEST DEAL',
      description: 'Enjoy the finest quality produce, harvested daily from local sustainable farms for maximum flavor and nutrition.',
      headerBg: 'bg-gradient-to-b from-amber-500 via-amber-500 to-yellow-600',
      tagBg: 'bg-amber-100 text-amber-950 border-amber-300',
      icon: '🧺🥛',
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
    <section className="w-full max-w-none px-4 sm:px-8 lg:px-12 py-6 my-2">
      {/* 3 Arched Grid Offer Cards (Matching Reference Screenshot 1 & 2 Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch max-w-7xl mx-auto">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleOpenModal(card)}
            className="group relative bg-[#fbfaf5] rounded-t-[75px] sm:rounded-t-[95px] rounded-b-3xl border border-gray-200/80 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col justify-between overflow-hidden"
          >
            {/* Top Arched Graphic Header Container */}
            <div className={`relative ${card.headerBg} pt-10 pb-8 px-6 text-center text-white rounded-t-[75px] sm:rounded-t-[95px] flex flex-col items-center justify-center overflow-hidden`}>
              {/* Background Wave Accents */}
              <div className="absolute top-0 inset-x-0 h-16 bg-white/10 rounded-b-full pointer-events-none"></div>
              
              {/* Main Bold Offer Title */}
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight uppercase text-white drop-shadow-xs max-w-[220px]">
                {card.title}
              </h3>

              {/* 3D Visual Illustration Box */}
              <div className="my-4 relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-5xl sm:text-6xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                <span className="filter drop-shadow-md">{card.icon}</span>
              </div>
            </div>

            {/* Bottom Card Content */}
            <div className="p-6 text-center flex flex-col items-center justify-between flex-1 space-y-4">
              {/* Offer Pill Tag */}
              <div className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${card.tagBg} shadow-xs`}>
                {card.tag}
              </div>

              {/* Offer Description */}
              <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed max-w-[280px]">
                {card.description}
              </p>

              {/* Working Claim Offer CTA Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenModal(card);
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base py-3 px-6 rounded-full shadow-lg hover:shadow-emerald-600/30 transition-all duration-200 flex items-center justify-center space-x-2 group/btn cursor-pointer active:scale-95"
              >
                <span>Claim Offer</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Offer Claim Modal */}
      {activeOfferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-emerald-100 animate-scale-up">
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
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  handleCopyCode(activeOfferModal.code);
                  setTimeout(() => setActiveOfferModal(null), 800);
                }}
                className="w-full bg-emerald-900 hover:bg-emerald-950 text-white font-extrabold text-sm py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer"
              >
                Apply Coupon & Continue Shopping 🛒
              </button>
              <button
                type="button"
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
