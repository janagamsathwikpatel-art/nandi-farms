'use client';

import React from 'react';

interface PromoBannersProps {
  onClaimOffer?: (offerTitle: string) => void;
}

export const PromoBanners: React.FC<PromoBannersProps> = ({ onClaimOffer }) => {
  const cards = [
    {
      id: 'promo-1',
      title: '10% OFF FIRST ORDER',
      image: '/promo-card-1.jpg',
    },
    {
      id: 'promo-2',
      title: 'FREE EXPRESS DELIVERY',
      image: '/promo-card-2.jpg',
    },
    {
      id: 'promo-3',
      title: '100% FARM FRESH',
      image: '/promo-card-3.jpg',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-2 my-2">
      {/* 3 Standalone Offer Cards — Claim Offer Button Added Down of Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-stretch">
        {cards.map((card) => (
          <div
            key={card.id}
            className="rounded-3xl overflow-hidden shadow-md hover:shadow-xl group transform hover:-translate-y-1 transition-all duration-300 border border-emerald-900/10 bg-[#fffefc] flex flex-col justify-between max-w-[360px] mx-auto w-full p-3 sm:p-4"
          >
            {/* Cropped Graphic Card Image Artwork (No button inside grid image) */}
            <div className="rounded-2xl overflow-hidden mb-3 bg-[#fffefc]">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-auto object-cover rounded-2xl group-hover:scale-[1.015] transition-transform duration-500"
              />
            </div>

            {/* Interactive "Claim Offer" Button Added at the Bottom (Down) of Grid Card */}
            <button
              onClick={() => onClaimOffer && onClaimOffer(card.title)}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all transform active:scale-95 cursor-pointer flex items-center justify-center space-x-2 border border-emerald-400/20"
              title={`Click to claim ${card.title}`}
            >
              <span>Claim Offer</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};




