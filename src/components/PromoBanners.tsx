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
      priceOverlay: 'On orders over ₹499',
    },
    {
      id: 'promo-3',
      title: '100% FARM FRESH',
      image: '/promo-card-3.jpg',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-1 pb-0 my-0 mb-0">
      {/* 3 Standalone Graphic Offer Cards — Using Exact User Uploaded Image Artwork */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 items-stretch">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => onClaimOffer && onClaimOffer(card.title)}
            className="rounded-3xl overflow-hidden shadow-md hover:shadow-xl group transform hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-gray-100/90 bg-white relative max-w-[360px] mx-auto w-full"
          >
            {/* Exact Graphic Card Image Artwork */}
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-auto object-cover rounded-3xl group-hover:scale-[1.01] transition-transform duration-500"
            />

            {/* Indian Rupee Price Overlay Covering $75 completely */}
            {card.priceOverlay && (
              <div className="absolute top-[66.5%] left-1/2 -translate-x-1/2 bg-[#f7f5ed] px-8 py-0.5 pointer-events-none z-10 text-center font-extrabold text-[15px] sm:text-[16px] text-gray-900 tracking-tight whitespace-nowrap">
                {card.priceOverlay}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};



